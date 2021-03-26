<template>
    <view>
        <view class="body">
            <view><image class="logo" src="../../static/logo-noback.png"/></view>
            <view>爱播星球</view>
        </view>
        <view class="login" v-if="mode==1">
            <view class="cu-form-group">
            	<view class="cuIcon cuIcon-my"></view>
            	<input v-model="submit.user" placeholder="邮箱/手机号" name="input"></input>
            </view>
            <view class="cu-form-group solid-bottom">
            	<view class="cuIcon cuIcon-lock"></view>
            	<input v-model="submit.password" type="password" placeholder="密码" name="input"></input>
                <view class="tip" @click="mode=3">忘记密码</view>
            </view>
            <view class="btn bg-black" @click="chack">登录</view>
            <view class="cu-list text-orange">
                <view class="cu-item" @click="mode=2">手机号快速登录/注册</view>
                <view class="cu-item" @click="mode=4">邮箱注册</view>
            </view>
        </view>
        <view class="login" v-if="mode==2">
            <view class="cu-form-group solid-bottom">
                <view class="flex quest">
                    <view class="cuIcon cuIcon-mobile"></view>
                </view>
                <view class="tip" @click="mode=3">更换手机号</view>
            </view>
            <view class="btn bg-black" @click="chack">快速登录</view>
            <view class="cu-list text-orange">
                <view class="cu-item" @click="mode=1">密码账号登录</view>
                <view class="cu-item" @click="mode=4">邮箱注册</view>
            </view>
        </view>
        <view class="login" v-if="mode==3">
            <view class="cu-form-group">
            	<view class="cuIcon cuIcon-mobile"></view>
            	<input v-model="submit.phone" placeholder="手机号" name="input"></input>
                <view class="tip" @click="mode=2">获取手机号</view>
            </view>
            <view class="cu-form-group solid-bottom">
            	<view class="cuIcon cuIcon-lock"></view>
            	<input v-model="submit.code" type="password" placeholder="验证码" name="input"></input>
                <view class="tip">获取验证码</view>
            </view>
            <view class="btn bg-black" @click="chack">登录</view>
            <view class="cu-list text-orange">
                <view class="cu-item" @click="mode=1">密码账号登录</view>
                <view class="cu-item" @click="mode=4">邮箱注册</view>
            </view>
        </view>
        <view class="login" v-if="mode==4">
            <view class="cu-form-group">
            	<view class="cuIcon cuIcon-mail"></view>
            	<input v-model="submit.mail" placeholder="邮箱" name="input"></input>
            </view>
            <view class="btn bg-black" @click="register">
                注册
                <view class="cu-load load-cuIcon loading" :class="submitwait ? 'show' : 'hide'"></view>
            </view>
            <view class="cu-list text-orange">
                <view class="cu-item" @click="mode=2">手机号快速登录/注册</view>
                <view class="cu-item" @click="mode=1">密码账号登录</view>
            </view>
        </view>
        
        <toast ref="toast"></toast>
        <loading ref="loading"></loading>
    </view>
</template>

<script>
    var that
    import validate from '@/utils/validate'
    export default {
        data() {
            return {
                submitwait:false,
                mode:1,
                option: [
                ],
                submit:{
                    user:'694818748@qq.com',
                    password:'123456',
                    phone:'',
                    code:'',
                    mail:''
                }
            }
        },
        onLoad() {
            that = this
            uni.hideLoading()
            setTimeout(function() {
                that.$refs.loading.result()
            }, 2000)
        },
        methods: {
            initSubmit(){
                that.submit = {
                    user:'',
                    password:'',
                    phone:'',
                    code:'',
                    mail:''
                }
            },
            register(){
                if(that.submitwait) return
                that.submitwait = true
                
                that.$http.fastreq('mailRegister',{mail:that.submit.mail},function(res){
                    that.submitwait = false
                    that.$refs.toast.confirm('注册邮件已发送，请前往邮箱完成注册。（注：QQ邮箱可能会在垃圾箱）', {}, function() {
                        
                    })
                })
                
            },
            chack(){
                switch (this.mode){
                    case 1 :
                    var data = {
                        user:that.submit.user,
                        pwd:that.submit.password,
                    }
                    var rule = {}
                    rule.user = [data.user.length==11 ? 'mobile' : 'email' , '请输入正确的手机号或邮箱'];
                    rule.pwd = ['password','密码为6-15位数字、字母或_.']
                    var bool = validate.chack(data,rule)
                    if (bool === false) return
                    
                   
                    that.$http.fastreq('pwdLogin',data,function(res){
                        uni.setStorageSync('Token',res.data.token);
                        uni.setStorageSync('User',res.data);
                        
                        that.$util.myhref('../index/home','reLaunch')
                    })
                    break;
                }
                
                
            }
        }
    }
</script>

<style>
    .hide{
        display: none;
    }
    .show{
        display: block;
    }
    .tip{
        color: #f37b1d;
        border-left: 1px solid #eee;
        padding-left: 20rpx;
    }
    .quest {
        display: flex;
        align-items: center;
    }
    .btn{
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 34rpx;
        border-radius: 10rpx;
        margin-top: 30rpx;
    }
    .cu-list{
        padding-top: 50rpx;
    }
    .cu-list .cu-item+.cu-item{
        display: flex;
        align-items: center;
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
