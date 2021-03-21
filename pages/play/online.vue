<template>
    <view>
        <custom bgColor='bg-black' :isBack="true">
            <block slot="content">视频播放</block>
            <block slot="right">
                <view class="action">
                    <view class="cuIcon cuIcon-message" @tap="$util.myhref('/pages/chat/index')">
                        <view class="cu-tag badge">1</view>
                    </view>
                </view>
            </block>
        </custom>

        <view class="video">
            <video class="" src="https://www.zhuticlub.com:65/20190511/1CAQr5Vz/index.m3u8" :style="'top:'+CustomBar+'px'"
                @timeupdate="timeupdate" id="myVideo" controls></video>
            <view class="list">
                <view class="btn bg-white radius" @tap="rate(item)" :class="{select:item==player.rate}" v-for="(item,index) in ratelist">{{item}}</view>
                <view class="btn bg-white radius" @tap="sync">同步</view>
            </view>
        </view>
        <view class="chat" :style="'height:calc(100vh - 480rpx - '+CustomBar+'px)'">
            <scroll-view id="scroll" class="cu-chat" :style="'height:calc(100% - ' + textareaheight +')'" scroll-y="true"
                lower-threshold='10' :scroll-top="999">
                <view class="cu-item self">
                    <view class="main">
                        <view class="content bg-green shadow">
                            <text>喵喵喵！喵喵喵！喵喵喵！喵喵！喵喵！！喵！喵喵喵！{{textareaheight}}</text>
                        </view>
                    </view>
                    <view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
                    <view class="date">2018年3月23日 13:23</view>
                </view>
                <view class="cu-info round">对方撤回一条消息!</view>
                <view class="cu-item">
                    <view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
                    <view class="main">
                        <view class="content shadow">
                            <text>喵喵喵！喵喵喵！</text>
                        </view>
                    </view>
                    <view class="date "> 13:23</view>
                </view>
                <view class="cu-info">
                    <text class="cuIcon-roundclosefill text-red "></text> 对方拒绝了你的消息
                </view>
                <view class="cu-info">
                    对方开启了好友验证，你还不是他(她)的好友。请先发送好友验证请求，对方验证通过后，才能聊天。
                    <text class="text-blue">发送好友验证</text>
                </view>
                <view class="cu-item self">
                    <view class="main">
                        <image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius"
                            mode="widthFix"></image>
                    </view>
                    <view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
                    <view class="date"> 13:23</view>
                </view>
                <view class="cu-item self">
                    <view class="main">
                        <view class="action text-bold text-grey">
                            3"
                        </view>
                        <view class="content shadow">
                            <text class="cuIcon-sound text-xxl padding-right-xl"> </text>
                        </view>
                    </view>
                    <view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
                    <view class="date">13:23</view>
                </view>
                <view class="cu-item self">
                    <view class="main">
                        <view class="action">
                            <text class="cuIcon-locationfill text-orange text-xxl"></text>
                        </view>
                        <view class="content shadow">
                            喵星球，喵喵市
                        </view>
                    </view>
                    <view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
                    <view class="date">13:23</view>
                </view>
                <view class="cu-item">
                    <view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
                    <view class="main">
                        <view class="content shadow">
                            @#$^&**
                        </view>
                        <view class="action text-grey">
                            <text class="cuIcon-warnfill text-red text-xxl"></text> <text class="text-sm margin-left-sm">翻译错误</text>
                        </view>
                    </view>
                    <view class="date">13:23</view>
                </view>
                <!-- <view class="myfixed zan" id="bottom">
                    <view class="input bg-white">
                        <view class="inset ceng">{{input}}</view>
                    </view>
                    <view class="flex">
                        <view class="btn bg-black ">发送</view>
                    </view>
                </view> -->
            </scroll-view>
            <view class="myfixed" id='textarea'>
                <view class="input bg-white">
                    <view class="inset ceng">{{input}}</view>
                    <textarea v-model="input" @linechange='linechange' maxlength="200" class="inset"></textarea>
                </view>
                <view class="flex">
                    <view class="btn bg-black ">发送</view>
                </view>
            </view>
        </view>

        <view class="mymenu bg-black shadow-warp" @tap="modalName='menu'">
            <view class="cuIcon-more"></view>
        </view>

        <view class="cu-modal drawer-modal justify-end" :class="{show:modalName=='menu'}">
            <view class="cu-dialog bg-white" :style="'height:calc(100vh - 480rpx - '+CustomBar+'px)'">
                <view class="close text-red" @tap='modalName=null'>
                    <view class="cuIcon-close"></view>
                </view>
                <view class="nav text-center solid-bottom">
                    <view :class="{'text-orange':index==menuchecked}" v-for="(item,index) in menulist" @tap="menuchecked=index">{{item}}</view>
                </view>
                <view class="navlist" :style="'transform: translateX(-'+menuchecked*80+'vw);'">
                    <scroll-view scroll-y="true" class="navitem cu-list menu">
                        <view class="cu-item">1</view>
                        <view class="cu-item">1</view>
                    </scroll-view>
                    <scroll-view scroll-y="true" class="navitem cu-list menu">
                        <view class="cu-item">2</view>
                    </scroll-view>

                </view>
            </view>
        </view>
    </view>
</template>

<script>
    //#ifdef APP-PLUS
    import database from '../../utils/db.js'
    var Db = new database('video')
    //#endif
    var that
    export default {
        data() {
            return {
                roominfo:null,
                menulist: ['播放列表', '房间人员'],
                menuchecked: 0,
                modalName: null,
                ratelist: [1.0, 1.25, 1.5],
                textareaheight: '100rpx',
                input: '',
                CustomBar: this.CustomBar,
                option: [],
                player: {
                    rate: 1.0,
                    currentTime: 0
                }
            }
        },
        onLoad(option) {
            that = this
            that.roomid = option.roomid
            if (option.type == 'create') {
                var Current = getCurrentPages()
                var page = Current[Current.length - 2]
                page = page.$vm
                var player = page.playlist[option.index]
                player.rate = 1.0
                that.player = player
            } else if (option.type == 'join') {
                that.getRoomInfo()
            }
        },
        onReady: function(res) {
            this.videoContext = uni.createVideoContext('myVideo')
        },
        onUnload() {
            console.log(1)
        },
        methods: {
            timeupdate(e) {
                that.player.currentTime = e.detail.currentTime.toFixed(2)
                console.log(e.detail.currentTime)
            },
            getRoomInfo() {
                console.log('getRoomInfo')
            },
            sync() {
                console.log('sync')
            },
            rate(num) {
                that.player.rate = num
                this.videoContext.playbackRate(num)
            },
            chatinput(e) {
                var value = e.detail.value
                that.input = value
            },
            linechange(e) {
                setTimeout(function() {
                    const query = uni.createSelectorQuery().in(this);
                    query.select('#textarea').boundingClientRect(data => {
                        var newheight = data.height + 'px'
                        if (that.textareaheight != newheight) {
                            that.textareaheight = newheight
                        }
                    }).exec();
                }.bind(this), 100)
            },
            getsync() {

            },
            sendsync() {

            }
        }
    }
</script>

<style>
    .navlist .navitem+.navitem{
        margin: 0;
    }
    .cuIcon-message{
        font-size: 36rpx;
        margin-left: 10rpx;
        position: relative;
    }
    .close {
        position: absolute;
        top: 0;
        padding: 0 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        font-weight: 600;
        font-size: 32rpx;
        z-index: 999;
    }

    scroll-view.cu-list.menu .cu-item+.cu-item {
        border-top: 1px solid #eee;
    }

    .cu-list.menu .cu-item {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        padding: 0 15px;
        min-height: 50px;
        background-color: #ffffff;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

    .navitem {
        width: 80vw;
        display: inline-block;
        overflow: hidden;
        flex-wrap: nowrap;
        margin: 0;
    }

    .navlist {
        width: 160vw;
        transition: all .4s ease-in-out 0s;
        display: flex;
        text-align: left;
        max-height: calc(100% - 80rpx);
        overflow: scroll;
        flex-wrap: nowrap;
    }

    .nav .text-orange {
        border-bottom: 2px solid;
    }

    .nav view {
        height: 100%;
        padding: 0 20rpx;
        margin: 0 10rpx;
        display: flex;
        line-height: 80rpx;
        /* align-items: center; */
    }

    .nav {
        height: 80rpx;
        display: flex;
        justify-content: center;
    }

    .mymenu {
        z-index: 99;
        position: fixed;
        bottom: 130rpx;
        right: 30rpx;
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36rpx;
    }

    .cu-dialog {
        bottom: 0;
        position: absolute;
        width: 80vw;
    }

    .list .btn {
        width: 20%;
        height: 60rpx;
        line-height: 60rpx;
    }

    .list {
        border-top: 1rpx solid #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        height: 80rpx;
        justify-content: space-between;
        padding: 0 30rpx;
        width: 100%;
        text-align: center;
        align-items: center;
    }

    .myfixed.zan {
        opacity: 0;
        position: relative;
    }

    page {
        height: 100vh;
        overflow: hidden;
    }

    .chat {
        overflow: hidden;
    }

    .cu-chat .cu-info {
        display: block;
        text-align: center;
        margin: 10px auto;
        font-size: 12px;
        padding: 4px 6px;
        background-color: rgba(0, 0, 0, 0.2);
        -webkit-border-radius: 3px;
        border-radius: 3px;
        color: #ffffff;
        max-width: 200px;
        line-height: 1.4;
    }

    .cu-chat {
        position: relative;
        z-index: 1;
        height: 100%
    }

    .input .ceng {
        opacity: 0;
        overflow: hidden;
    }

    .myfixed textarea {
        position: absolute;
        bottom: 0;
        left: 0;
    }

    .myfixed .btn {
        padding: 0 20rpx;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        height: 60rpx;
        line-height: 60rpx;
        border-radius: 40rpx;
        margin: 5rpx 0;
    }

    .myfixed .inset {
        min-height: 70rpx;
        padding: 20rpx 30rpx;
        font-size: 30rpx;
        width: 100%;
        height: 100%;
        max-height: 180rpx;
        word-break: break-all;
        overflow: hidden;
    }

    .myfixed .input {
        min-height: 70rpx;
        flex: 1;
        border-radius: 30rpx;
        position: relative;
    }

    .myfixed .flex>* {
        margin-left: 20rpx;
    }

    .myfixed {
        background-color: #dcdcdc;
        width: 100vw;
        left: 0;
        bottom: 0;
        position: absolute;
        padding: 15rpx 30rpx;
        align-items: flex-end;
        display: flex;
        min-height: 100rpx;
        z-index: 99;

    }

    .video {
        position: relative;
        z-index: 99;
        background-color: #000;
        width: 100vw;
        height: 480rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: calc();
    }

    .video video {
        position: fixed;
        top: 0;
        left: 0;
        width: calc(100vw - 60rpx);
        margin-left: 30rpx;
        height: 400rpx;
        top: 0;
    }
</style>
