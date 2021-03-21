<template>
    <view class="content">
        <custom bgColor='bg-black' :isBack="true">
            <block slot="content">我的收藏</block>
            <block slot="right">
                <view class="action">
                    <view @click="changeCheckbox">{{checkbox==null ? '编辑' : (checkbox.length==0 ?'完成':'删除')}}</view>
                </view>
            </block>
        </custom>
        <view class="cu-wait text-gray" v-if="list==null">
            <view class="cuIcon-loading2 cuIcon"></view>
            <view class="cu-text"></view>
        </view>
        <view class="cu-nodata text-gray" v-else-if="list.length<=0">
            <view class="cuIcon-searchlist cuIcon"></view>
            <view class="cu-text"></view>
        </view>
        <view class="cu-list bg-white" :class="{show:checkbox!=null}" v-else>
            <checkbox-group @change="change">
                <view class="cu-item mymenu" v-for="(item,index) in list">
                    <view class="flex1 flex" @tap="itemTap(index)" @longpress="checkbox=[]">
                        <view class="checkbox">
                            <checkbox class='round black' :class="item.checked?'checked':''" :checked="item.checked?true:false"
                                :value="index" />
                        </view>
                        <view class="flex1">{{item.title}}</view>
                    </view>
                    <view class="icon" @tap="showModal" data-name='edit' :data-index="index">
                        <view class="cuIcon-edit"></view>
                    </view>
                </view>
            </checkbox-group>
        </view>

        <view class="cu-modal" :class="modalname=='edit'?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">编辑网址</view>
                    <view class="action" @tap="hideModal">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <form @submit="send">
                    <view class="padding">
                        <view class="cu-form-group">
                            <view class="title">标题</view>
                            <input v-model="submit.title" placeholder="请输入标题" name="input"></input>
                        </view>
                        <view class="cu-form-group">
                            <view class="title">网址</view>
                            <input v-model="submit.url" placeholder="请输入网址" name="input"></input>
                        </view>
                    </view>
                    <view class="cu-bar bg-white justify-end">
                        <view class="action">
                            <button class="cu-btn line-green text-black" @tap="hideModal">取消</button>
                            <button class="cu-btn bg-black margin-left" form-type="submit">确定</button>
                        </view>
                    </view>
                </form>
            </view>
        </view>

        <toast ref="toast"></toast>
    </view>
</template>

<script>
    import database from '../../utils/db.js'
    var Db
    var that
    export default {
        data() {
            return {
                list: null,
                checkbox: null,
                submit: {},
                modalname: null,
            }
        },
        onLoad() {
            that = this

            // #ifdef APP-PLUS
            Db = new database('video')
            that.getlist()
            //#endif
        },
        methods: {
            del() {
                that.$refs.toast.confirm('确认删除选中项', {}, function() {
                    var str = ''
                    for (let i in that.list) {
                        if (that.list[i].checked) {
                            str += str == '' ? that.list[i].id : ',' + that.list[i].id
                        }
                    }
                    str = 'id in (' + str + ')'
                    Db.del('collect', str, function(res) {
                        that.getlist()
                    })
                })
            },
            itemTap(index) {
                if (that.checkbox == null) {
                    that.$util.myhref('/pages/resources/iframe?iframeurl=' + that.list[index].url, 'redirectTo')
                }
            },
            changeCheckbox() {
                if (that.checkbox == null) {
                    that.checkbox = []
                } else if (that.checkbox.length == 0) {
                    that.checkbox = null
                } else {
                    that.del()
                }
            },
            getlist() {
                Db.select('collect', '', function(res) {
                    for (let i in res.data) {
                        res.data[i].checked = false
                    }
                    that.list = res.data
                })
            },
            send() {
                var data = that.submit
                var d = {
                    title: data.title,
                    url: data.url
                }
                Db.update('collect', d, {
                    id: data.id
                }, function() {
                    that.getlist()
                })
                that.modalname = null
            },
            showModal(e) {
                that.modalname = e.currentTarget.dataset.name
                that.submit = JSON.parse(JSON.stringify(that.list[e.currentTarget.dataset.index]))
            },
            hideModal() {
                that.modalname = null
                that.submit = {}
            },
            change(e) {
                var checked = e.detail.value
                var list = that.list
                for (let i in list) {
                    if (checked.indexOf(parseInt(i)) != -1) {
                        list[i].checked = true
                    } else {
                        list[i].checked = false
                    }
                }
                that.list = list
                that.checkbox = checked
            }
        }
    }
</script>

<style>
    .cu-item.cu-item{
        border-top: 1px solid #eee;
    }
    .mymenu {
        padding: 0 30rpx;
        height: 100rpx;
        display: flex;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .checkbox {
        width: 0;
        transition: all .5s;
        opacity: 0;
        position: relative;
        z-index: -11;
    }

    .flex {
        align-items: center;
    }

    .mymenu .flex1 {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .mymenu .icon {
        width: 0;
        font-size: 40rpx;
        transition: all .5s;
        overflow: hidden;
        text-align: right;
        opacity: 0;
    }

    .show .checkbox {
        width: 70rpx;
        opacity: 1;
        z-index: 9;
    }

    .show .mymenu .icon {
        width: 60rpx;
        opacity: 1;
    }
</style>
