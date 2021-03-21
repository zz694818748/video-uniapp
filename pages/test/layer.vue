<template>
    <view class="content">
        <custom bgColor='bg-black' :isBack="true">
            <block slot="content">影视大厅</block>>
        </custom>
        <loading ref="loading"></loading>
        <toast ref="toast"></toast>
        <tobar select='index'></tobar>

        <button @tap="showmsg(123)">showmsg</button>
        <button @tap="showmodal(12345)">showmodal</button>
    </view>
</template>

<script>
   
    
    var that
    export default {
        data() {
            return {
                backbool:false,
                title: 'Hello',
            }
        },
        onLoad() {
            that = this
            setTimeout(function() {
                that.$refs.loading.result()
            }, 2000)
        },
        onReady() {
            that.$refs.loading.init({
                type: 'loadProgress'
            })
            that.$refs.loading.showload()
        },
        onBackPress() {
            uni.$emit('backPress',that)
            return that.backbool
        },
        methods: {
            showmsg(e) {
                that.$refs.toast.msg(e)
            },
            showmodal(e) {
                that.$refs.toast.confirm(e, {}, function() {
                    that.showmsg(45)
                })
            }
        }
    }
</script>

<style>

</style>
