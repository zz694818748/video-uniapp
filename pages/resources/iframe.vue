<template>
    <view class="content">
        
        <web-view :src="iframeurl" :webview-styles="webviewStyles"></web-view>
        <!-- <web-view src="https://www.15yc.cc/" :webview-styles="webviewStyles"></web-view> -->
        
        <custom bgColor='bg-black' :isBack="true">
            <view slot="left" class="cuIcon cuIcon-home" @tap.stop="gohome"></view>
            <block slot="content">{{title}}</block>
            <block slot="right">
                <view class="action">
                    <view class="cuIcon cuIcon-discoverfill" @tap="gosniffing">
                         <view class="cu-tag badge" v-if="resources.length>0">{{resources.length}}</view>
                    </view>
                    <view class="cuIcon cuIcon-circlefill" @tap="$util.myhref('/pages/resources/menu')"></view>
                </view>
            </block>
        </custom>
        <tobar select='index'></tobar>
        <toast ref="toast"></toast>
    </view>
</template>

<script>
    var that
    var gettitle
    export default {
        data() {
            return {
                title:'',
                iframeurl:'',
                wv: new Object,
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
                resources:[]
            }
        },
        onLoad(option) {
            that = this
            that.iframeurl = option.iframeurl
            if(option.title){
                that.title = option.title
            }
        },
        onReady() {
            var currentWebview = this.$scope.$getAppWebview()
            var wv = currentWebview.children()[0]
            that.wv = wv
            var frequency = 0
            
            wv.addEventListener('loading',function(){
                that.resources = []
                clearInterval(gettitle)
                gettitle = setInterval(function(){
                    let title = wv.getTitle()
                    if((title!='' && title != 'null' && title != 'undefined') || frequency>=10){
                        that.title = title
                        console.log(title)
                        clearInterval(gettitle)
                        frequency = 0
                    }else{
                        frequency++
                    }
                },300)
            })
            wv.listenResourceLoading({
                match: '.*'
            }, function(e) {
                var reg = /\.(?:mp4|flv|m3u8|rtmp|hls|rtsp)/i
                if(reg.test(e.url)){
                    let index = e.url.lastIndexOf('http')
                    let url =  e.url.substr(index)
                    if(that.resources.indexOf(url)==-1){
                        console.log(url)
                        that.resources.push(url)
                    }
                }
            })
            wv.addEventListener('loaded',function(){
                that.title = wv.getTitle()
                clearInterval(gettitle)
                frequency = 0
            })
            var sys = uni.getSystemInfoSync()
            let height = sys.windowHeight - this.CustomBar
            wv.setStyle({
                top: this.CustomBar + 'px',
                height: height + 'px'
            })
        },
        onBackPress() {
            that.wv.canBack(function(e) {
                if (e.canBack) {
                    that.wv.back();
                    return true
                }
            });
        },
        
        methods: {
            gohome(){
                that.$util.myhref('/pages/index/index','reLaunch')
            },
            gosniffing(){
                if(that.resources.length>0){
                    that.$util.myhref('/pages/resources/sniffing')
                }
            },
        }
    }
</script>

<style>
    .cuIcon{
        font-size: 36rpx;
        margin-left: 10rpx;
        position: relative;
    }
</style>
