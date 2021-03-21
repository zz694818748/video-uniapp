<template>
    <view>
        <view class="load-progress myload" :class="option.isload!=0 || option.isload==true?'show':'hide'" :style="[{top:CustomBar+'px'}]"
            v-if="option.type=='loadProgress'">
            <view class="load-progress-bar bg-green" :style="[{transform: 'translate3d(-' + (option.isload) + '%, 0px, 0px)'}]" v-if="typeof option.isload == 'number'"></view>
            <view class="load-progress-spinner text-black"></view>
        </view>
        <view v-if="option.type=='text'" v-show="option.isload">
            <view class="cu-load bg-grey load-progress loading myload" :class="option.loading ? 'show' : ''" :style="[{top:CustomBar+'px'}]"></view>
            <view class="cu-load bg-grey load-progress myload" :class="[option.status=='success'?'over':'erro' ,!option.loading ? 'show' : '']"
                :style="[{top:CustomBar+'px'}]"></view>
        </view>

    </view>
</template>

<script>
    var that
    export default {
        data() {
            return {
                StatusBar: this.StatusBar,
                CustomBar: this.CustomBar,
                defaultoption: {
                    type: 'text',
                    isload: false,
                    loading: false,
                    status: false,
                    title: '加载中...'
                },
                option: {}
            }
        },
        mounted() {
            that = this
            that.option = JSON.parse(JSON.stringify(this.defaultoption))
        },
        methods: {
            init(option) {
                for (let i in option) {
                    that.defaultoption[i] = option[i]
                }
            },
            result(status = '', option) {
                let de = {
                    time: 1000,
                    title: '操作成功',
                    icon: '',
                    callback: ''
                }
                that.option.loading = false
                if (status == '') {
                    de.time = 0
                } else {
                    that.option.status = status
                }
                if (option != undefined) {
                    for (let i in de) {
                        de[i] = option[i] ? option[i] : de[i]
                    }
                }
                setTimeout(function() {
                    that.option.loading = false
                    that.option.isload = false
                    if(typeof de.callback == 'function'){
                        de.callback()
                    }
                }, de.time)
            },
            showload(option) {
                var deop = JSON.parse(JSON.stringify(this.defaultoption))
                deop.isload = true
                deop.loading = true
                for (let i in option) {
                    deop[i] = option[i]
                }
                this.option = deop
            }
        }
    }
</script>

<style>
    .myload {
        transition: height 1s;
        height: 0;
        display: none;
    }

    .myload.show {
        height: 80rpx;
        line-height: 80rpx;
        display: block;
    }
</style>
