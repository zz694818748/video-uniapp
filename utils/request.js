var util = require('@/utils/util.js');
var md5x = require('@/utils/md5x.js');
// var host = 'http://cxxcd.hudee.vip/pcms/v1/';
var host = 'http://54tv3u.natappfree.cc/api/v1/';
var interfacelist = {
    // 邮箱注册
    mailRegister: {url:'member/mailRegister',noCheckLogin:true},
    // 密码登录
    pwdLogin:{url:'member/pwdLogin',noCheckLogin:true},
    // 退出登录
    exitLogin:{url:'member/exitLogin'},
    // 创建房间
    createRoom:{url:'room/create'},
    // 关闭房间
    colseRoom:{url:'room/colse'},
    // 修改
    setRoom:{url:'room/set'},
    // 获取手机号
    // pwdLogin:{url:'member/pwdLogin',noCheckLogin:true},
    // 密码登录
    // pwdLogin:{url:'member/pwdLogin',noCheckLogin:true},
    
}
// 接口请求成功后,先执行的方法
var callback = {
    agentlogin: function(data) {
        uni.setStorageSync('Opid', data.Data.Opid)
        uni.setStorageSync('Appkey', data.Data.Token)
        uni.setStorageSync('Time', data.Data.Time)
        uni.setStorageSync('Acl', data.Data.Acl)
    }
}
/**
 *  数据处理，sgin添加，json处理
 */




function Req() {
    this.handleData = (postData,url) => {
        postData.timestamp = Math.floor(new Date().getTime()/1000)
        if(url.noCheckLogin){
            var token = md5x.md5(postData.timestamp+'')
            postData.opid = 1
        }else{
            var token = uni.getStorageSync('Token')
            var user = uni.getStorageSync('User')
            if(token =='' || !token || !user || !user.id){
                return false
            }
            postData.opid = user.id
        }
        // token = token.toUpperCase()
        let str = util.jsonSort(postData) + '&' + token;
        console.log(str)
        postData.sign = md5x.md5(str).toUpperCase()
        return JSON.stringify(postData);
    }
    this.http = (url, data, dosuccess, dofail, option = {}, load = true, paging = false) => {
        var iscall = interfacelist.hasOwnProperty(url) ? url : false
        var url = interfacelist.hasOwnProperty(url) ? interfacelist[url] : url
        var a = this
        if (load != false) {
            msg = load === true ? '加载中...' : load
            uni.showLoading({
                title: msg,
                mask: true
            })
        }
        var postData = JSON.parse(JSON.stringify(data))
        if (paging !== false) {
            postData.Pagenum = paging.pagenum
            postData.Pagecount = paging.pagecount
        }
        postData = this.handleData(postData,url);
        if (postData === false) {
            uni.hideLoading();
            return Promise.reject('reason').catch((e)=>{})
        }
        let promise = new Promise(function(resolve, reject) {
            console.log('url：'+host + url.url)
            var o = {
                url: host + url.url,
                header: {
                    "Accept": "application/json;charset=UTF-8",
                },
                method: 'POST',
                data: postData,
                success: function(res) {
                    console.log(res);
                    var data = a.rsuccess(res, dofail)
                    if (data != undefined) {
                        if (iscall !== false && callback.hasOwnProperty(iscall)) {
                            data = callback[iscall](data)
                        }
                        if (paging !== false) {
                            a.dopage(paging, data)
                        }

                        // try{
                        console.log(data)
                        uni.hideLoading()
                        if(typeof dosuccess == 'function'){dosuccess(data)}
                        // }catch(res){
                        //     a.layer.msg('未知BUG')
                        // }
                        resolve(data)
                    }
                    if (load) {
                        uni.hideLoading();
                    }
                },
                fail: function(res) {
                    console.log(res)
                    a.rerror(dofail, res)
                    if (load) {
                        uni.hideLoading();
                    }
                }
            }
            var ob = Object.assign({}, o, option)
            uni.request(ob)
        })
        return promise
    };
    /** 成功操作
     */
    this.rsuccess = function(res, dofail) {
        var a = this
        if (res.statusCode !== 200) {
            a.layer.msg('请求错误')
            return;
        }
        if (res.data.code == 1) {
            return res.data
        } else {
            this.rerror(dofail, res, res.data.msg, );
        }
    };
    /** 失败操作
     */
    this.rerror = function(doFail, res, msg = '出错了') {
        this.layer.msg(msg)
        if (typeof doFail == "function") {
            doFail(res)
        }
    };
    /** 分页
     */
    this.dopage = function(paging, data) {
        paging.list = data.Data[paging.field]
        paging.pagenum = data.Data.Pagenum + 1
        paging.resultcount = data.Data.Resultcount
    };
    /** 文件上传请求，
     * URL：接口
     * postData：参数，json类型
     * doSuccess：成功的回调函数
     * doFail：失败的回调函数
     */
    this.uploadfile = function(url, name, filepath, data, doSuccess, doFail) {
        var postData = this.handleData(data);
        if (postData === false) {
            return
        }
        console.log(JSON.parse(postData))
        var url = interfacelist.hasOwnProperty(url) ? interfacelist[url] : url
        return uni.uploadFile({
            url: host + url,
            filePath: filepath,
            name: name,
            formData: JSON.parse(postData),
            success(res) {
                console.log(res)
                let d = JSON.parse(res.data)
                if (d.Code == 0) {
                    doSuccess(d);
                } else {
                    typeof doFail == "function" && doFail(d);
                }
            },
            fail(res) {
                if (typeof doFail == "function") {
                    doFail(res)
                } else {
                    uni.showModal({
                        title: '上传错误',
                        content: res.errMsg
                    })
                }
            }
        })
    }
    this.fastreq = function(interfacename, data, doSuccess, doFail, paging, method = 'POST', load = true) {
            return this.http(interfacename, data, doSuccess, doFail, {}, load, paging)
        },
        /** 快捷弹出层
         * */
        this.layer = {
            msg: (msg, option = {}, fun) => {
                var o = {
                    title: msg
                }
                var defaul = {
                    time: 3000,
                    icon: 'none'
                }
                var obj = Object.assign({}, o, defaul, option)
                uni.showToast(obj);
                if (option.time && fun != undefined) {
                    setTimeout(function() {
                        fun();
                    }, obj.time)
                }
            },
            confirm: (title, content, option = {}, doconfirm, docancel) => {
                let obj = {
                    title: title,
                    content: content,
                    success: (res) => {
                        if (res.confirm && doconfirm) {
                            doconfirm()
                        } else if (docancel) {
                            docancel()
                        }
                    }
                }
                let newoption = Object.assign(option, obj)
                uni.showModal(newoption)
            }
        }
}
module.exports = {
    Req: Req
}
