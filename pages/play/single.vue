<template>
    <view>
        <custom bgColor='bg-black' :isBack="true">
            <block slot="content">视频播放</block>
        </custom>
        <view class="bodys">
            <view class="video" v-if="player!=null&&videoUrl!=null">
                <video id="myVideo" :src="videoUrl" @timeupdate="timeupdate">
                </video>
                <view class="list">
                    <view class="btn bg-black" @tap="rate(1.0)">0.5</view>
                    <view class="btn bg-black" @tap="rate(1.0)">1.0</view>
                    <view class="btn bg-black" @tap="rate(1.25)">1.25</view>
                    <view class="btn bg-black" @tap="rate(1.5)">1.5</view>
                </view>
            </view>
            <view class="cu-nodata text-gray" v-else>
                <view class="cuIcon-searchlist cuIcon"></view>
                <view class="cu-text"></view>
            </view>
        </view>
    </view>
</template>

<script>
    var that
    import database from '../../utils/db.js'
    var Db = new database('video')
    export default {
        data() {
            return {
                playtime: 0,
                playwait: 20,
                player: null,
                videoUrl: null,
                playrecord: 0
            }
        },
        onLoad(option) {
            that = this
            var Current = getCurrentPages()
            var page = Current[Current.length - 2]
            page = page.$vm
            that.player = page.playlist[option.index]
            that.getlocation()
        },
        onReady: function(res) {
            this.videoContext = uni.createVideoContext('myVideo')
        },
        onUnload() {
            that.addRecord()
        },
        methods: {
            timeupdate(e) {
                that.player.currentTime = e.detail.currentTime.toFixed(2)
            },
            rate(num) {
                that.player.rate = num
                this.videoContext.playbackRate(num)
            },
            addRecord() {
                Db.select('playrecord', {
                    network: that.player.network
                }, function(res) {
                    var record = JSON.parse(JSON.stringify(that.player))
                    record.timeStamp = parseInt(new Date().getTime() / 1000);
                    delete record.id
                    if (res.data.length != 0) {
                        Db.update('playrecord', {
                            currentTime: that.player.currentTime + '',
                            timeStamp: record.timeStamp
                        }, {
                            id: res.data[0].id
                        })
                    } else {
                        Db.insert('playrecord', record, function(res) {
                            that.playrecord = res.data[0].id
                        })
                    }
                })
            },
            getlocation() {
                Db.select('upload', {
                    network: that.player.network,
                    finish: 1
                }, function(res) {
                    that.videoUrl = res.data.length > 0 ? res.data[0].location : that.player.network;
                })
            }
        }
    }
</script>

<style>
    .list {
        display: flex;
        justify-content: space-between;
        width: 90vw;
        margin: auto;
    }

    .btn {
        height: 80rpx;
        width: 20%;
        text-align: center;
        line-height: 80rpx;
        font-size: 30rpx;
    }

    cover-view {
        position: absolute;
        top: 10rpx;
        width: 100rpx;
        height: 100rpx;
    }

    .bodys {
        margin-top: 10vw;
    }

    .video video {
        width: 90vw;
        height: 60vw;
        margin-left: 5vw;
        position: relative;
    }
</style>
