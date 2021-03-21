<template>
    <view class="content">
        <image src="/static/logo-noback.png"></image>
        <view class="tip">正在进入<text class="text-orange">爱播星球</text></view>
    </view>
</template>

<script>
    var that
     export default {
        data(){
            return {
                wait:0,
                maxWait:1,
                islogin:null,
                interval:null
            }
        },
        onLoad() {
            that = this
            var token = uni.getStorageSync('Token')
            this.waitfor()
            if(token){
                this.islogin = true
                return
            }
            this.islogin = false
            
            
        },
        methods:{
            waitfor(){
                that.interval = setInterval(function(){
                    console.log(that.wait)
                    if(that.wait>=that.maxWait){
                        clearInterval(that.interval)
                        that.checkLogin()
                        return
                    }
                    that.wait++
                },1000)
            },
            checkLogin(){
                var url = '/pages/user/login'
                if(this.islogin===true){
                    url = '/pages/index/home'
                }
                console.log(url)
                that.$util.myhref(url,'reLaunch')
            }
        }
     }
</script>

<style>
    page{
        width: 100vw;
        height: 100vh;
        background-color: #fff;
        
    }
    image{
        margin-top: 300rpx;
        margin-left: calc((100vw - 400rpx) / 2);
        height: 400rpx;
        width: 400rpx;
    }
    .tip{
        text-align: center;
        margin-top: 20rpx;
    }
    .text-orange{
        font-size: 40rpx;
    }
</style>
