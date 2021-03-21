<template>
    <view class="content">
        <view class="statusbar bg-black" :style="'height:'+StatusBar+'px'">
            <view class="fixed"></view>
        </view>
        <view class="bg-white mymargin">
            <view class="info">
                <view class="cu-avatar radius lg" style="background-image:url('https://ossweb-img.qq.com/images/lol/web201310/skin/big81007.jpg');"></view>
                <view class="content">
                    <view class="">
                        <view class="text-cut">伊泽瑞尔</view>
                    </view>
                    <view class="text-gray text-sm flex">
                        <view class="text-cut">等我回来一个打十个</view>
                    </view>
                </view>
            </view>
            <!-- <view class="data cu-list">
                <view class="cu-item">
                    <view>1</view>
                    <text>关注</text>
                </view>
            </view> -->
        </view>
        <view class="cu-list menu bg-white">
            <view class="cu-item">
                <view class="content">
                    <text class="cuIcon-circlefill text-grey"></text>
                    <text class="text-grey">图标 + 标题</text>
                </view>
            </view>
            <view class="cu-item" @tap='exitlogin'>
                <view class="content">
                    <text class="cuIcon-exit text-grey"></text>
                    <text class="text-grey">退出登录</text>
                </view>
            </view>
        </view>
        <loading ref="loading"></loading>
        <toast ref="toast"></toast>
        <tobar select='user'></tobar>

    </view>
</template>

<script>
    var that
    export default {
        data() {
            return {
                StatusBar: this.StatusBar
            }
        },
        onLoad() {
            this.StatusBar
            that = this
            console.log(uni.getStorageSync('Token'))
        },
        onReady() {},
        methods: {
            exitlogin(){
                that.$http.fastreq('exitLogin',{})
                that.$util.myhref('/pages/user/login','reLaunch')
                uni.clearStorageSync();
            }
        }
    }
</script>

<style>
    .mymargin {
        margin: 15rpx 0;
    }

    .info .cu-avatar {
        position: absolute;
        left: 30rpx;
        top: 20rpx;
    }

    .info .content {
        width: 100%;
        padding-left: 120rpx;
        height: 100rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .info {
        display: flex;
        align-items: center;
        padding: 0 30rpx;
        position: relative;
        height: 140rpx;
    }

    .statusbar .fixed {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
    }
</style>
