// 获取当前时间   日期格式
function strTime(myDate) {
    var myDate = myDate == undefined ? new Date() : myDate;
    var time = '';
    var month = (parseInt(myDate.getMonth()) + 1) < 10 ? '0' + (parseInt(myDate.getMonth()) + 1) : (parseInt(myDate.getMonth()) +
        1);
    var date = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
    var hours = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
    var min = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
    var sec = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
    time += myDate.getFullYear();
    time += '-' + month;
    time += '-' + date;
    time += ' ' + hours;
    time += ':' + min;
    time += ':' + sec;
    return time;
}

// 获取两坐标距离
function getDistance(lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;
    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var r = 6378137;
    return (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(
        b / 2), 2)))).toFixed(0);

}


// json排序获取str
function jsonSort(jsonObj) {
    let arr = [];
    for (var key in jsonObj) {
        arr.push(key)
    }
    arr.sort();
    let str = '';
    for (var i in arr) {
        str += arr[i] + "=" + escape(jsonObj[arr[i]]) + "&"
    }
    return str.substr(0, str.length - 1)
}

//获取url中"?"符后的字串  
function getRequest(url) { //获取url中"?"符后的字串  
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(url.indexOf("?") + 1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


// 时间计算
function DateAdd(interval, number, date) {
    switch (interval) {
        case "y ":
            {
                date.setFullYear(date.getFullYear() + number);
                return date;
                break;
            }
        case "q ":
            {
                date.setMonth(date.getMonth() + number * 3);
                return date;
                break;
            }
        case "m ":
            {
                date.setMonth(date.getMonth() + number);
                return date;
                break;
            }
        case "w ":
            {
                date.setDate(date.getDate() + number * 7);
                return date;
                break;
            }
        case "d ":
            {
                date.setDate(date.getDate() + number);
                return date;
                break;
            }
        case "h ":
            {
                date.setHours(date.getHours() + number);
                return date;
                break;
            }
        case "m ":
            {
                date.setMinutes(date.getMinutes() + number);
                return date;
                break;
            }
        case "s ":
            {
                date.setSeconds(date.getSeconds() + number);
                return date;
                break;
            }
        default:
            {
                date.setDate(d.getDate() + number);
                return date;
                break;
            }
    }
}


// 上个月
function lastmonth() {
    var now = new Date();
    var newDate = DateAdd("m ", -1, now);
    return strTime(newDate).slice(0, 10);
}


// 调起支付，传入res对象
function wechatpay(res, that, url) {
    wx.requestPayment({
        timeStamp: res.Data.timeStamp,
        nonceStr: res.Data.nonceStr,
        package: res.Data.package,
        signType: res.Data.signType,
        paySign: res.Data.paySign,
        success(res) {
            if (url != undefined) {
                wx.showModal({
                    title: '支付提示',
                    content: '充值成功',
                    success(res) {
                        if (res.confirm) {
                            wx.switchTab({
                                url: url,
                            })
                        }
                    }
                })
            } else {
                that.onLoad({});
            }
        },
        fail(res) {
            console.log(res);
            wx.showModal({
                title: '支付提示',
                content: '支付失败',
            })
        }
    })
}

function myhref(url, type) {
    uni.showLoading({
        title: '页面跳转中',
        mask: true
    })
    if (type == undefined) {
        uni.navigateTo({
            url: url,
            animationType:'none',
            success() {
                uni.hideLoading()
            },
            fail(e) {
                console.log(e)
                uni.reLaunch({
                    url: url,
                    complete() {
                        uni.hideLoading()
                    }
                })
            }
        })
    } else {
        uni[type]({
            url: url,
            complete() {
                uni.hideLoading()
            },
            fail(e) {
                console.log(e)
            }
        })
    }

}


module.exports = {
    strTime: strTime,
    getDistance: getDistance,
    jsonSort: jsonSort,
    getRequest: getRequest,
    lastmonth: lastmonth,
    wechatpay: wechatpay,
    myhref: myhref,
}
