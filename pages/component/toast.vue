<template>
    <view>
        <view class="cu-modal" :class="[{show:show,transparent:type=='msg'}]" @tap="hideModal('mask')">
            <view v-if="type=='msg'" class="toastdialog msg" :class="[msgop.class,msgop.animation]">
                {{msgop.title}}
            </view>
            <template v-else-if="type=='confirm'">
                <view class="cu-dialog">
                    <view class="cu-bar bg-white justify-end">
                        <view class="content">{{confirmop.title}}</view>
                        <view class="action" @tap="hideModal">
                            <text class="cuIcon-close text-red"></text>
                        </view>
                    </view>
                    <view class="padding-xl">
                       {{confirmop.content}}
                    </view>
                    <view class="cu-bar bg-white justify-end">
                        <view class="action">
                            <view class="cu-btn line-green text-green" :class="['line-'+confirmop.btncolor,'text-'+confirmop.btncolor]" @tap.stop="cancel" v-if="confirmop.showCancel">{{confirmop.cancelText}}</view>
                            <view class="cu-btn bg-green margin-left" :class="'bg-'+confirmop.btncolor" @tap.stop="define">{{confirmop.confirmText}}</view>

                        </view>
                    </view>
                </view>
            </template>
        </view>
    </view>
</template>

<script>
    var that
    var timeout
    export default {
        data() {
            return {
                show: false,
                type: '',
                msgde: {
                    title: '',
                    class: 'bg-black',
                    animation: 'shake', //shake,getbig,
                    time: 2000,
                },
                confirmde: {
                    maskclose: false,
                    title: '提示',
                    content: '',
                    showCancel: true,
                    cancelText: '取消',
                    confirmText: '确定',
                    btncolor:'black',
                },
                msgop: {},
                confirmop: {},
                confirmsu:{
                    cancel(){},
                    define(){},
                    complete(){},
                }
            }
        },
        mounted() {
            that = this
            that.option = {}
            that.confirmop = JSON.parse(JSON.stringify(this.confirmde))
        },
        methods: {
            msg(msg, option = {}, fun) {
                uni.hideLoading()
                option.title = msg
                var msgop = {}
                for (let i in that.msgde) {
                    msgop[i] = option[i] ? option[i] : that.msgde[i]
                }
                that.msgop = msgop
                if (that.show == true) {
                    clearTimeout(timeout)
                }
                that.show = true
                that.type = 'msg'
                timeout = setTimeout(function() {
                    that.show = false
                    that.type = ''
                    if (typeof fun == 'function') {
                        fun()
                    }
                }, msgop.time)
            },
            confirm(content,option = {}, fun) {
                that.type = 'confirm'
                clearTimeout(timeout)
                option.content = content 
                that.show = true
                that.type = 'confirm'
                var confirmop = {}
                for (let i in that.confirmde) {
                    confirmop[i] = option[i] ? option[i] : that.confirmde[i]
                }
                that.confirmop = confirmop
                if(typeof option.cancel == 'function'){
                    that.confirmsu.cancel = option.cancel
                }
                if(typeof option.define == 'function'){
                    that.confirmsu.define = option.define
                }
                if(typeof option.complete == 'function'){
                    that.confirmsu.complete = option.complete
                }
                if(typeof fun == 'function'){
                    that.confirmsu.define = fun
                }
            },
            cancel(){
                that.hideModal()
                that.confirmsu.cancel()
                that.confirmsu.complete()
            },
            define(){
                that.hideModal()
                that.confirmsu.define()
                that.confirmsu.complete()
            },
            hideModal(e){
                if(that.type == 'confirm'){
                    if(e=='mask'){
                        if(that.confirmop.maskclose) that.show = false
                    }else{
                        that.show = false
                    }
                }
            }
        }
    }
</script>

<style>
    .show .shake {
        animation: myfirst 0.5s;
    }

    @keyframes myfirst {
        0% {
            margin-left: 50rpx;
        }

        10% {
            margin-left: -50rpx;
        }

        20% {
            margin-left: 40rpx;
        }

        30% {
            margin-left: -40rpx;
        }

        40% {
            margin-left: 30rpx;
        }

        50% {
            margin-left: -30rpx;
        }

        60% {
            margin-left: 20rpx;
        }

        70% {
            margin-left: -20rpx;
        }

        80% {
            margin-left: 10rpx;
        }

        90% {
            margin-left: -10rpx;
        }

        100% {
            margin-left: 0rpx;
        }
    }
    .show .cu-dialog{
        transform: scale(1);
    }
    .cu-dialog{
        transition: all 0.3s ease-in-out 0s;
        transform: scale(1.2);
    }
    .getbig {
        transition: all 0.3s ease-in-out 0s;
        transform: scale(1.2);
    }

    .msg {
        padding: 20rpx 50rpx;
        opacity: 0.8;
    }

    page .transparent {
        background-color: transparent;
        pointer-events: none !important;
    }

    .show .toastdialog {
        transform: scale(1);
    }

    .toastdialog {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-left: auto;
        margin-right: auto;
        max-width: 100%;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        overflow: hidden;
    }

    page .cu-modal {
        pointer-events: none;
        transform: scale(1);
    }
    page .cu-modal.show {
        pointer-events: auto;
    }
</style>
