<template name="components">
    <view>
        <view class="cu-bar tabbar foot shadow bg-black">
            <view class="action" :class="select==index ? tobar.selectcolor : tobar.color" v-for="(item,index) in tobarlist"
                @click="nav(index)">
                <view :class="item.icon">
                    <view class="cu-tag badge" v-if="item.badge!=undefined && item.badge!=''"></view>
                </view>
                {{item.title}}
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                tobar: {
                    color: 'text-gray',
                    selectcolor: 'text-orange'
                },
                tobarlist: {
                    index: {
                        title: '影视',
                        url: '/pages/index/home',
                        icon: 'cuIcon-cardboardfill',
                    },
                    chat: {
                        title: '聊天',
                        url: '/pages/chat/index',
                        icon: 'cuIcon-markfill',
                        badge:''
                    },
                    user: {
                        title: '我的',
                        url: '/pages/user/index',
                        icon: 'cuIcon-peoplefill',
                        
                    },
                }
            };
        },
        props: {
            select: {
                type: String,
                default: 'member'
            },
        },
        mounted() { 
            
        },
        methods: {
            nav(index) {
                if (index != this.select) {
                    var n = this.tobarlist[index].navtype
                    var f = n && n != '' ? n : 'reLaunch'
                    this.$util.myhref(this.tobarlist[index].url, f)
                }
            },
        }
    }
</script>


<style>
    .cuIcon-cu-image {
        height: 100rpx;
        width: 100rpx;
    }

    .cu-bar.tabbar {
        height: 100rpx;
        padding-bottom: 10rpx;
    }
</style>
