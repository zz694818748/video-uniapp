<script>
    import Vue from 'vue';
    //#ifdef APP-PLUS
    import downm3u8 from '@/utils/downm3u8.js'
    import database from '@/utils/db.js'
    var Db = new database('video')
    //#endif
    export default {
        globalData: {
            websocket: null,
            m3u8download: null
        },
        onLaunch: function() {
            uni.setStorageSync('userinfo', {
                id: 1000,
                name: '攀',
                avatar: ''
            })
            let host = ''
            if (process.env.NODE_ENV === 'development') {
                host = ''
            }
            Vue.prototype.$host = host

            uni.getSystemInfo({
                success: function(e) {
                    // #ifndef MP
                    Vue.prototype.StatusBar = e.statusBarHeight;
                    if (e.platform == 'android') {
                        Vue.prototype.CustomBar = e.statusBarHeight + 40;
                    } else {
                        Vue.prototype.CustomBar = e.statusBarHeight + 45;
                    };
                    // #endif

                    // #ifdef MP-WEIXIN || MP-QQ
                    console.log(2)
                    Vue.prototype.StatusBar = e.statusBarHeight;
                    let capsule = wx.getMenuButtonBoundingClientRect();
                    if (capsule) {
                        Vue.prototype.Custom = capsule;
                        // Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
                        Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
                    } else {
                        Vue.prototype.CustomBar = e.statusBarHeight + 50;
                    }
                    // #endif		


                    // #ifdef MP-ALIPAY
                    console.log(3)
                    Vue.prototype.StatusBar = e.statusBarHeight;
                    Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
                    // #endif
                }
            })
            Vue.prototype.ColorList = [{
                    title: '嫣红',
                    name: 'red',
                    color: '#e54d42'
                },
                {
                    title: '桔橙',
                    name: 'orange',
                    color: '#f37b1d'
                },
                {
                    title: '明黄',
                    name: 'yellow',
                    color: '#fbbd08'
                },
                {
                    title: '橄榄',
                    name: 'olive',
                    color: '#8dc63f'
                },
                {
                    title: '森绿',
                    name: 'green',
                    color: '#39b54a'
                },
                {
                    title: '天青',
                    name: 'cyan',
                    color: '#1cbbb4'
                },
                {
                    title: '海蓝',
                    name: 'blue',
                    color: '#0081ff'
                },
                {
                    title: '姹紫',
                    name: 'purple',
                    color: '#6739b6'
                },
                {
                    title: '木槿',
                    name: 'mauve',
                    color: '#9c26b0'
                },
                {
                    title: '桃粉',
                    name: 'pink',
                    color: '#e03997'
                },
                {
                    title: '棕褐',
                    name: 'brown',
                    color: '#a5673f'
                },
                {
                    title: '玄灰',
                    name: 'grey',
                    color: '#8799a3'
                },
                {
                    title: '草灰',
                    name: 'gray',
                    color: '#aaaaaa'
                },
                {
                    title: '墨黑',
                    name: 'black',
                    color: '#333333'
                },
                {
                    title: '雅白',
                    name: 'white',
                    color: '#ffffff'
                },
            ]

            // 全局返回
            uni.$on('backPress', function(that) {
                var bool = false
                if (that.$refs.toast.show == true && that.$refs.toast.type == 'confirm') {
                    that.$refs.toast.hideModal()
                    bool = true;
                }
                that.backbool = bool
            })
            // 全局下载
            uni.$on('addm3u8upload', function(data) {
                var option = {
                    url: data.network, //m3u8地址
                    dirpath: 'video', //保存到目录
                    id: data.id, //下载标识，用于断线续传：开始任务时存在即续传，不存在新建
                    tryTepeat: 3, //下载失败重试次数
                    timeout: 30, //超时时间
                    retryInterval: 30, //重试等待时间
                    meanwhile: 5, //并发下载数
                    initcallback(res) {
                        var page = Object.assign({},data.page)
                        delete data.page
                        console.log(res)
                        if(res.code==0){
                            data.location = res.obj.fullname
                            Db.insert('upload', data,function(){
                                page.$refs.toast.msg('成功添加至下载列表')
                            })
                        }else{
                            uni.hideLoading()
                            data.page.$refs.toast.msg(res.msg)
                        }
                    },
                    tsloadcallback(res) {
                        console.log(res)
                    },
                    finishcallback(res) {
                        //文件保存为 app缓存 / 保存目录 / 下载标识.m3u8
                        that.videourl = res.obj.path
                        that.showload = false
                    }
                }
                downm3u8(option);
            })
        },
        onShow: function() {},
        onHide: function() {}
    }
</script>

<style>
    @import "@/plugin/colorui/main.css";
    @import "@/plugin/colorui/icon.css";

    html,
    page {
        overflow-x: hidden;
    }

    .cu-wait {
        text-align: center;
        margin: 50rpx 0;
    }

    .cu-wait .cu-text:before {
        content: "加载中...";
    }

    .cu-wait .cuIcon {
        -webkit-animation: cuIcon-spin 1s infinite linear;
        animation: cuIcon-spin 1s infinite linear;
        display: inline-block;
        font-size: 60rpx;
    }

    .cu-nodata {
        text-align: center;
        margin: 50rpx 0;
    }

    .cu-nodata .cu-text:before {
        content: "没有数据";
    }

    .cu-nodata .cuIcon {
        font-size: 60rpx;
    }
    .text-ell{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
