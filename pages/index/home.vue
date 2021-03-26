<template>
    <view class="content">
        <custom bgColor='bg-black' :isBack="false">
            <block slot="content">影视大厅</block>
        </custom>
        <loading ref="loading"></loading>
        <toast ref="toast"></toast>
        <tobar select='index'></tobar>
        <view class="mysearch">
            <form @submit="search" @reset="">
                <view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
                    <view class="search-form round">
                        <text class="cuIcon-search"></text>
                        <!--  #ifdef  H5 -->
                        <input type="text" placeholder="请输入名称" confirm-type="search" v-model="value"></input>
                        <!--  #endif -->
                        <!--  #ifndef  H5 -->
                        <input type="text" placeholder="请输入名称或网址(网址开头为http)" confirm-type="search" v-model="value"></input>
                        <!--  #endif -->
                    </view>
                    <button class="action bg-black btn" form-type="submit">前往</button>
                </view>
            </form>
        </view>
        <view class="body ">
            <!-- <view class="cu-bar bg-white text-black solid-bottom">
                <view class="action">
                    <text class="cuIcon-barcode"></text>
                    我的收藏
                </view>
                <view class="action text-orange">
                    推荐网址
                </view>
            </view> -->
            <view class="cu-list mymenu">
                <view class="cu-item" v-for="(item,index) in menu" @tap="$util.myhref(item.url)">
                    <view class="cuIcon" :class="'cuIcon-'+item.icon + ' text-'+ColorList[index].name"></view>
                    <view class="text-grey">{{item.title}}</view>
                </view>
            </view>
            <view class="cu-bar bg-white text-black solid-bottom">
                <view class="action">
                    <text class="cuIcon-group"></text>
                    推荐房间
                </view>
                <view class="action">
                    <text class="cuIcon-filter"></text>
                </view>
            </view>
            <view class="room cu-list bg-white" @tap='$util.myhref("/pages/play/online")'>
                <view class="cu-item">
                    <image></image>
                    <view class="synopsis">
                        <view>犬夜叉 第一集</view>
                        <view>多人房（1/3）</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- <video src="file:///storage/emulated/0/Android/data/io.dcloud.HBuilder/downloads/197511113-1-16.mp4" controls></video> -->
    </view>
</template>

<script>
    var that
    //#ifdef APP-PLUS
    import database from '../../utils/db.js'
    // import socket from '@/store/unisocket'
    //#endif

    export default {
        data() {
            return {
                ColorList: this.ColorList,
                iframeurl: '',
                // value: 'https://www.69wanwan.com/',
                value: 'http://movie.pandaye.top:90/play/num/0/id/1-104503.html',
                isshow: true,
                CustomBar: this.CustomBar,
                menu: [{
                    icon: 'favor',
                    title: '我的收藏',
                    url: '/pages/menu/collect'
                }, {
                    icon: 'list',
                    title: '播放列表',
                    url: '/pages/play/playlist?type=list'
                }, {
                    icon: 'pulldown',
                    title: '我的下载',
                    url: '/pages/play/upload'
                }, {
                    icon: 'record',
                    title: '播放记录',
                    url: '/pages/play/record'
                }, ]
            }
        },
        
        computed: {
            //监听接收到的消息
        	socketMsgs() {
        		return this.$store.getters.socketMsgs
            }
        },
        
        watch: {
        	'socketMsgs': {
                //处理接收到的消息
        		handler: function() {
        		    let _that = this
        			let sMsg = _that.socketMsgs
        			console.log("接收到:" + sMsg)
        			console.log(_that)
                  }
        	}
        },
        onLoad() {
            that = this
            //#ifdef APP-PLUS
            var Db = new database('video')
            that.$store.dispatch('WEBSOCKET_INIT')
            setTimeout(function(){
                
            },2000)
            // plus.downloader.enumerate(function(a){
            //     console.log(a)
            // })
            // var load = plus.downloader.createDownload('https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/13/11/197511113/197511113-1-16.mp4?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1612327282&gen=playurl&os=cosbv&oi=3084754254&trid=bfe098fdc39043d8a21049e74fcbfdbdh&platform=html5&upsig=68097f34d8cee5bdb76ad2743bb00b14&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=0&logo=80000000')
            // load.start()
            // setInterval(function(){
            //     console.log((load.downloadedSize/load.totalSize).toFixed(2))
            // },1000)
            // const socket = new UniSocket({
            //     url: "ws://127.0.0.1:8282"
            // });
            // Db.select('playrecord',{},function(res){
            //     console.log(res)
            // })

            //#endif
        },
        onReady() {
            // #ifdef H5
            // if(!IsPC()){
            //     that.$refs.toast.confirm('系统不支持手机网页版，手机请使用app', {}, function() {

            //     })
            // }
            // #endif
        },
        onBackPress() {
            if (that.$refs.toast.show == true && that.$refs.toast.type == 'confirm') {
                that.$refs.toast.show == false
                return true;
            }
        },
        methods: {
            search() {
                if (that.value.length > 100) {
                    that.$refs.toast.msg('输入信息过长');
                    return
                }
                if (that.value.indexOf('http') === 0) {
                    // #ifdef H5
                    // window.open(that.value);
                    // return
                    // #endif
                    that.$util.myhref('/pages/resources/iframe?iframeurl=' + that.value)
                } else {
                    console.log(456)
                }
            }
        }
    }

    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"
        ];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
</script>

<style>
    .mymenu .cuIcon {
        font-size: 45rpx;
        margin-bottom: 10rpx;
    }

    .mymenu .cu-item {
        height: 150rpx;
        width: 25%;
        text-align: center;
        font-size: 28rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-right: 1px solid #eee;
    }

    .mymenu>.cu-item:last-child {
        border-right: 0;
    }

    .mymenu {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        margin-bottom: 20rpx;
    }

    .room .synopsis {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .room image {
        width: 100rpx;
        height: 100rpx;
        margin-right: 15rpx;
        background-color: #fff;
    }

    .room .cu-item {
        padding: 20rpx 30rpx;
        display: flex;
    }

    .website .cu-item image {
        width: 80rpx;
        height: 80rpx;
    }

    .website.col-5 .cu-item {
        width: 20%;
        display: flex;
        justify-content: center;
    }



    .btn {
        padding: 10rpx 20rpx;
        border-radius: 10rpx;
        font-size: 30rpx;
        line-height: inherit;
    }

    .body {
        padding-bottom: 100rpx;
    }

    .a {
        height: 200rpx;
    }

    .mysearch {
        height: 100rpx;
        width: 100%;
    }

    .cuIcon+.cuIcon {
        margin-left: 15rpx;
    }
</style>
