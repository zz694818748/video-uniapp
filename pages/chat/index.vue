<template>
    <view class="content">
        <custom bgColor='bg-black' :isBack="false">
            <block slot="content">聊天</block>
            <block slot="right">
                <view class="action">
                    <view class="cuIcon cuIcon-roundadd" @click="$util.myhref('/pages/play/playlist?type=list')"></view>
                </view>
            </block>
        </custom>
        <loading ref="loading"></loading>
        <toast ref="toast"></toast>
        <tobar select='chat'></tobar>
        <view class="mysearch">
            <form @submit="search" @reset="">
                <view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
                    <view class="search-form round">
                        <text class="cuIcon-search"></text>
                        <input type="text" placeholder="搜索" confirm-type="search" v-model="value"></input>
                    </view>
                </view>
            </form>
        </view>
        <view class="body">
            <scroll-view scroll-x class="bg-white nav text-center solid-bottom">
                <view class="cu-item" :class="index==TabNav?'text-orange cur':''" v-for="(item,index) in navlist" :key="index"
                    @tap="tabSelect(index)">
                    {{item}}
                </view>
            </scroll-view>
            <view class="navlist" :style="'transform: translateX(-'+TabNav*100+'vw);'">
                <view class="nav-item">
                    <view class="cu-list menu-avatar">
                        <view class="cu-item ">
                            <view class="cu-avatar radius lg" style="background-image:url('https://ossweb-img.qq.com/images/lol/web201310/skin/big81007.jpg');"></view>
                            <view class="content">
                                <view class="">
                                    <view class="text-cut">伊泽瑞尔</view>
                                </view>
                                <view class="text-gray text-sm flex">
                                    <view class="text-cut">等我回来一个打十个</view>
                                </view>
                            </view>
                            <view class="action">
                                <view class="text-grey text-xs">22:20</view>
                            </view>
                        </view>
                        <view class="cu-item ">
                            <view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
                            <view class="content">
                                <view class="">
                                    <view class="text-cut">莫甘娜</view>
                                </view>
                                <view class="text-gray text-sm flex">
                                    <view class="text-cut">凯尔，你被自己的光芒变的盲目！</view>
                                </view>
                            </view>
                            <view class="action">
                                <view class="text-grey text-xs">22:20</view>
                                <view class="cu-tag round bg-red sm">5</view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="nav-item firend">
                    <view class="cu-list menu-avatar">
                        <view class="cu-item ">
                            <view class="cu-avatar radius lg" style="background-image:url('https://ossweb-img.qq.com/images/lol/web201310/skin/big81007.jpg');"></view>
                            <view class="content">
                                <view class="">
                                    <view class="text-cut">伊泽瑞尔</view>
                                </view>
                                <view class="text-gray text-sm flex">
                                    <view class="text-cut">拉克丝你在哪</view>
                                </view>
                            </view>
                        </view>
                        <view class="cu-item ">
                            <view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
                            <view class="content">
                                <view class="">
                                    <view class="text-cut">莫甘娜</view>
                                </view>
                                <view class="text-gray text-sm flex">
                                    <view class="text-cut">凯尔，你被自己的光芒变的盲目你被自己的光芒变的盲目！</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="nav-item">3</view>
            </view>
        </view>
    </view>
</template>

<script>
    var that
    export default {
        data() {
            return {
                value: '',
                navlist: ['消息', '好友', '群聊'],
                TabNav: 0,
            }
        },
        onLoad() {
            that = this
        },
        onReady() {},
        onBackPress() {
            if (that.$refs.toast.show == true && that.$refs.toast.type == 'confirm') {
                that.$refs.toast.show == false
                return true;
            }
        },
        methods: {
            tabSelect(index) {
                that.TabNav = index
            },
            search(e) {
                console.log(e)
            }
        }
    }
</script>

<style>
    .firend .cu-list.menu-avatar>.cu-item .flex .text-cut {
        max-width: 100%;
    }

    .firend .cu-list.menu-avatar>.cu-item .content {
        line-height: 1.4em;
        width: calc(100% - 80rpx - 100rpx);
    }

    .firend .cu-avatar.lg {
        height: 80rpx;
        width: 80rpx;
    }

    .firend .cu-list.menu-avatar>.cu-item {
        height: 120rpx;
    }

    .navlist .nav-item {
        width: 100vw;
        display: inline-block;
        overflow: hidden;
    }

    .navlist {
        width: 300vw;
        margin-top: 10rpx;
        overflow: hidden;
        transition: all .6s ease-in-out 0s;
        display: flex;
        flex-wrap: nowrap;
    }

    .mysearch {
        height: 100rpx;
    }

    .body {
        padding-bottom: 100rpx;
        width: 100vw;
        overflow: hidden;
    }
</style>
