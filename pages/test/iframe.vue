<template>
    <view class="content">

        
        <!-- <video src="http://localhost:13131/_doc/download/20200921/index.m3u8" controls></video> -->
        <!-- <video src="file://storage/emulated/0/Android/data/uni.UNIDD57DEE/apps/__UNI__DD57DEE/doc/download/20200921/test.m3u8" controls></video> -->
        <video src="file://storage/emulated/0/Android/data/uni.UNIDD57DEE/apps/__UNI__DD57DEE/doc/download/20200921/test.m3u8" controls></video>
        <!-- <video src="file://storage/emulated/0/Android/data/io.dcloud.HBuilder/apps/HBuilder/doc/video/https:__www.fztxylgy.com:65/index.m3u8" controls></video> -->
        <!-- <video src="https://www.nmgxwhz.com:65/20200730/lbnthAk3/index.m3u8" controls></video> -->
        <!-- <video src="https://www.nmgxwhz.com:65/20200730/lbnthAk3/1200kb/hls/index.m3u8" controls></video> -->

        <custom bgColor='bg-black' :isBack="true">
            <block slot="content">影视大厅</block>
            <block slot="right">
                <view class="action">
                    123
                </view>
            </block>
        </custom>
        <tobar select='index'></tobar>
        <toast ref="toast"></toast>
        <loading ref="loading"></loading>
    </view>
</template>

<script>
    var that
    export default {
        data() {
            return {
                wv: new Object,
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        },
        onLoad() {
            that = this
            var currentWebview = this.$scope.$getAppWebview();
            return
            plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fobject) {
                // fs.root是根目录操作对象DirectoryEntry
                
                fobject.root.getFile('download/20200921/index.m3u8', {
                    create: true
                }, function(dirEntry) {
                    console.log(1)
                    var url = dirEntry.fullPath
                    console.log(url)
                    var player = plus.video.createVideoPlayer('videoplayer', {
                        src: url,
                        top: '100px',
                        left: '0px',
                        width: '100%',
                        height: '200px',
                        position: 'static'
                    });
                    player.addEventListener('error', function(e) {
                        console.log(e)
                    })
                    currentWebview.append(player);
                }, function(e) {
                    console.log('getDirectory error')
                    console.log(e)
                });
            });
            return
            var player = plus.video.createVideoPlayer('videoplayer', {
                // src: 'https://www.fztxylgy.com:65/20200921/u8pNbufB/index.m3u8',
                // src: '_doc/download/20200921/ZhijZ5gO.ts',
                src: '_doc/download/20200921/index.m3u8',
                top: '100px',
                left: '0px',
                width: '100%',
                height: '200px',
                position: 'static'
            });
            player.addEventListener('error', function(e) {
                console.log(e)
            })
            currentWebview.append(player);
        },
        onReady() {
            // var currentWebview = this.$scope.$getAppWebview()
            // var wv = currentWebview.children()[0]
            // that.wv = wv
            // wv.listenResourceLoading({
            //     match: '.*\\.(mp4|flv|m3u8|rtmp|hls|rtsp)\\b'
            // }, function(e) {
            //     console.log(e)
            // })
            // var sys = uni.getSystemInfoSync()
            // let height = sys.windowHeight - this.CustomBar
            // wv.setStyle({
            //     top: this.CustomBar + 'px',
            //     height: height + 'px'
            // })
        },
        onBackPress() {
            if (that.$refs.toast.show == true && that.$refs.toast.type == 'confirm') {
                that.$refs.toast.show == false
                return true;
            }
            console.log(this.$scope.$getAppWebview().children())
            that.wv.canBack(function(e) {
                if (e.canBack) {
                    console.log(that.wv)
                    that.wv.back();
                    return true
                }
            });
        },
        methods: {
            error(e) {
                console.log(e.target.errMsg)
            }
        }
    }
</script>

<style>
</style>
