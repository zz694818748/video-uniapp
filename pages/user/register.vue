<template>
    <view>
        <view class="body">
            <view><image class="logo" src="../../static/logo-noback.png"/></view>
            <view>爱播星球</view>
        </view>
        <view class="login">
            <view class="cu-form-group">
            	<view class="cuIcon cuIcon-mail"></view>
            	<input placeholder="邮箱" name="input"></input>
            </view>
            <view class="btn bg-black">注册</view>
            <view class="cu-list text-orange">
                <view class="cu-item" @click="mode=2">手机号快速登录/注册</view>
                <view class="cu-item" @click="$util.myhref('/pages/user/login')">密码账号登录</view>
            </view>
        </view>
        
    </view>
</template>

<script>
    var that
    export default {
        data() {
            return {
                option: [
                ]
            }
        },
        onLoad() {
            that = this
        },
        methods: {
            
        }
    }
</script>

<style>
    .cu-list{
        padding-top: 50rpx;
    }
    .cu-list .cu-item+.cu-item{
        display: flex;
        align-items: center;
        margin-top: 30rpx;
    }
    .btn{
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        font-size: 34rpx;
        border-radius: 10rpx;
        margin-top: 30rpx;
    }
    
    .cuIcon{
        font-size: 34rpx;
        margin-right: 20rpx;
    }
    .login{
        width: 80%;
        margin: 5% 10%;
    }
    .logo{
        margin-top: 200rpx;
        width: 260rpx;
        height: 260rpx;
        display: inline-block;
    }
    page{
        background-color: #fff;
    }
    .body{
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }
</style>
