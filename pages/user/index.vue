<template>
    <view class="content">
        <view class="statusbar bg-black" :style="'height:'+StatusBar+'px'">
            <view class="fixed"></view>
        </view>
        <view class="bg-black head">
            <view class="info text-ell">
                <img class="cu-avatar radius lg" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big81007.jpg" alt="">
                <view class="content text-ell">
                    <view class="">
                        <view class="text-cut">{{user.userName}}</view>
                    </view>
                    <view class="text-gray text-sm flex">
                        <view class="text-cut">{{user.sign}}</view>
                    </view>
                </view>
            </view>
            <view class="cuIcon-settings">
            </view>
        </view>
        <view class="mybar bg-black">
            <view class="action">
                <view class="text-orange">会员特权</view>
                <view class="text-xs">到期时间：2020-01-12</view>
            </view>
            <view class="action btn bg-white">续费</view>
        </view>
        
        <view class="cu-list menu bg-white mymargin">
            <view class="cu-item" @click="$util.myhref('/pages/user/security')">
                <view class="content">
                    <text class="cuIcon-my"></text>
                    <text class="">账号安全</text>
                </view>
            </view>
            <view class="cu-item">
                <view class="content">
                    <text class="cuIcon-present"></text>
                    <text class="">我要推广</text>
                </view>
                <view class="action text-grey">
                    奖励会员特权
                </view>
            </view>
            <view class="cu-item">
                <view class="content">
                    <text class="cuIcon-selection"></text>
                    <text class="">关于我们</text>
                </view>
            </view>
            <view class="cu-item" @tap='exitlogin'>
                <view class="content">
                    <text class="cuIcon-exit"></text>
                    <text class="">退出登录</text>
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
            const stateiser = this.$store.state.userinfo
            return {
                StatusBar: this.StatusBar,
                user:stateiser ? stateiser : uni.getStorageSync('User')
            }
        },
        onLoad() {
            that = this
            console.log(that.$store.state.userinfo)
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
    .cuIcon-settings{
        font-size: 34rpx;
        margin-left: 10rpx;
    }
    .head{
        padding: 0 30rpx;
        height: 140rpx;
        display: flex;
        align-items: center;
    }
    .info {
        display: flex;
        align-items: center;
        position: relative;
        flex: 1;
    }
    .info .cu-avatar{
        margin-right: 10rpx;
        
    }
    .info .content{
        flex: 1;
        height: 80rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .content .mybar .btn{
        padding: 10rpx 30rpx;
        border-radius: 30rpx;
        font-size: 28rpx;
    }
    .mybar{
         display: flex;
         justify-content: space-between;
         align-items: center;
         padding: 20rpx 20rpx;
         border-top: #F37B1D solid 1px;
    }
    .mybar .action{
        font-size: 32rpx;
    }
    .mybar .action .text-xs{
        padding-top: 10rpx;
        font-size: 24rpx;
    }
    .mymargin {
        margin: 15rpx 0;
    }

    .statusbar .fixed {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
    }
</style>
