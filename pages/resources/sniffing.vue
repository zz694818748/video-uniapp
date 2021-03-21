<template>
    <view>
        <custom bgColor='bg-black' :isBack="true">
            <block slot="content">嗅探到的资源</block>
        </custom>
        <toast ref="toast"></toast>
        <loading ref="loading"></loading>

        <view class="cu-bar bg-white">
            <view class="mya">{{title}}</view>
        </view>
        <view class="cu-list">
            <view class="cu-item bg-white" v-for="(item,index) in resources">
                <view class="mybar">
                    <view class="name">
                        资源{{index+1}}：{{item.name}}
                    </view>
                    <view class="status">
                        <view v-if="item.status=='wait'" class="cuIcon-loading2 text-black"></view>
                        <view v-else-if="item.status=='success'" class="">
                            视频时长：{{item.duration}}
                        </view>
                        <view class="text-red" v-else>
                            加载失败
                        </view>
                    </view>
                </view>
                <view v-if="item.status=='success'" class="tool bg-black text-orange" @tap="save(index)">
                    添加
                </view>
            </view>
        </view>
        <view class="hide">
            <video :id="'video'+index" v-for="(item,index) in resources" autoplay="true" :src="item.url" @timeupdate="timeupdate"
                controls="false" :data-index="index" @error="error" muted="true"></video>
            <cover-view class="hidec"></cover-view>
        </view>
        
        <view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end solid-bottom">
                    <view class="content">确认名称</view>
                    <view class="action" @tap="hideModal">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <view class="">
                    <view class="cu-form-group">
                        <view class="title">名称</view>
                        <input v-model="title"></input>
                    </view>
                </view>
                <view class="cu-bar bg-white justify-end solid-top">
                    <view class="action">
                        <button class="cu-btn line-black text-black" @tap="hideModal">取消</button>
                        <button class="cu-btn bg-black margin-left" @tap="addvideo(selectidnex)">确定</button>
                    </view>
                </view>
            </view>
        </view>
        
    </view>
</template>

<script>
    function secondToDate(result) {
        var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
        var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 %
            60));
        var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
        return result = h + ":" + m + ":" + s;
    }
    var that
    import database from '../../utils/db.js'
    var Db
    export default {
        data() {
            return {
                resources: [],
                title: '海贼王 第一集',
                modalName:null,
                selectidnex:null
            }
        },
        onReady() {},
        onLoad() {
            that = this
            var Current = getCurrentPages()
            var page = Current[Current.length - 2]
            page = page.$vm
            let resources = page.resources
            that.title = page.title
            that.initlist(resources)
            // #ifdef APP-PLUS
            Db = new database('video')
            //#endif
        },
        methods: {
            save(index){
                that.modalName='DialogModal1'
                that.selectidnex=index
            },
            hideModal(){
                that.modalName=null
            },
            initlist(resources) {
                var arr = []
                for (let i in resources) {
                    let num = resources[i].lastIndexOf('/')
                    let name = resources[i].substr(num + 1)
                    arr.push({
                        url: resources[i],
                        name: name,
                        status: 'wait'
                    })
                }
                that.resources = arr
            },
            timeupdate(e) {
                var index = e.currentTarget.dataset.index
                if (that.resources[index].status == 'wait' && that.resources[index].duration == undefined && e.detail.currentTime >
                    0) {
                    var dur = Math.ceil(e.detail.duration)
                    var duration = secondToDate(dur)
                    that.resources[index].duration = duration
                    that.resources[index].status = 'success'
                    let player = uni.createVideoContext('video' + index)
                    player.pause()
                }
            },
            error(e) {
                var index = e.currentTarget.dataset.index
                this.resources[index].status = 'error'
                console.log(that.resources[index])
                console.log(e)
            },
            addvideo(index) {
                var player = {
                    network: that.resources[index].url,
                    title: that.title,
                    duration: that.resources[index].duration,
                }
                Db.select('playlist', {network:player.network}, function(res) {
                    that.hideModal()
                    if(res.data.length!=0){
                        that.$refs.toast.msg('已添加')
                    }else{
                        that.$refs.toast.msg('添加成功')
                        Db.insert('playlist', player)
                    }
                })
            }
        }
    }
</script>

<style>
    .mya {
        padding: 0 30rpx;
    }

    view {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }

    .tool {
        padding: 0 30rpx;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .cu-item {
        margin-top: 10rpx;
        height: 120rpx;
        padding-left: 30rpx;
        display: flex;
        align-items: center;
    }

    .mybar {
        flex: 1;
    }

    .status {
        display: flex;
        font-size: 24rpx;
        margin-top: 10rpx;
    }

    .status .cuIcon-loading2 {
        animation: load-progress-spinner 0.5s linear infinite;
        font-size: 34rpx;
    }

    .hide {
        opacity: 0;
        height: 100rpx;
        overflow: hidden;
        position: relative;
    }

    .hidec {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 10rpx;
        background-color: #f1f1f1;
    }

    video {
        height: 1px;
        width: 1px;
    }
</style>
