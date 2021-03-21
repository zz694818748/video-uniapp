<template>
    <view>
        <custom bgColor='bg-black' :isBack="true">
            <block slot="content">下载列表</block>
        </custom>
        <view class="">
            <view class="cu-bar bg-white solid-bottom">
                <view class="action">
                    <text class="cuIcon-title"></text> 正在下载
                </view>
                <view class="action">
                    <view @click="changeCheckbox('loading')">{{loading==null ? '编辑' : (loading.length==0 ?'完成':'删除')}}</view>
                </view>
            </view>
            <view class="cu-wait text-gray" v-if="list.loading==null">
                <view class="cuIcon-loading2 cuIcon"></view>
                <view class="cu-text"></view>
            </view>
            <view class="cu-nodata text-gray" v-else-if="list.loading.length<=0">
                <view class="cuIcon-searchlist cuIcon"></view>
                <view class="cu-text"></view>
            </view>
            <checkbox-group @change="change" data-type="loading" v-else>
                <view class="cu-list menu" :class="{show:loading!=null}">
                    <view class="cu-item mymenu" v-for="(item,index) in list.loading">
                        <view class="flex1 flex" >
                            <view class="checkbox">
                                <checkbox class='round black' :class="item.checked?'checked':''" :checked="item.checked?true:false"
                                    :value="index" />
                            </view>
                            <view class="flex1" @tap="itemTap('loading',index)" @longpress="openCheckbox('loading',index)">{{item.title}}</view>
                        </view>
                        <view class="icon" @tap="showModal" data-name='edit' data-type="loading" :data-index="index">
                            <view class="cuIcon-edit"></view>
                        </view>
                    </view>
                </view>
            </checkbox-group>
            <view class="cu-bar bg-white solid-bottom margin-top">
                <view class="action">
                    <text class="cuIcon-title"></text> 下载完成
                </view>
            </view>
            <view class="cu-wait text-gray" v-if="list.success==null">
                <view class="cuIcon-loading2 cuIcon"></view>
                <view class="cu-text"></view>
            </view>
            <view class="cu-nodata text-gray" v-else-if="list.success.length<=0">
                <view class="cuIcon-searchlist cuIcon"></view>
                <view class="cu-text"></view>
            </view>
            <view class="cu-list menu">
                <view class="cu-item" v-for="(item,index) in list.success">
                    <view class="content text-cut">
                        <text class="">{{item.title}}</text>
                    </view>
                    <view class="action text-grey">
                        <text>{{item.duration}}</text>
                    </view>
                </view>
            </view>
        </view>
        
        <view class="cu-modal" :class="modalName=='edit'?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">重命名</view>
                    <view class="action" @tap="hideModal">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <form @submit="send">
                    <view class="padding">
                        <view class="cu-form-group">
                            <input v-model="submit.title" placeholder="请输入标题" name="input"></input>
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
        
        
    </view>
</template>

<script>
    var that
    import database from '../../utils/db.js'
    var Db
    export default {
        data() {
            return {
                list: {
                    loading: null,
                    success: null,
                },
                modalName:null,
                loading:null,
                success:null,
                submit:{}
            }
        },
        onLoad() {
            that = this
            Db = new database('video')
            that.getupload()
        },
        methods: {
            send(e){
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
                that.hideModal()
            },
            hideModal(){
                that.modalName = null
                that.submit = {}
            },
            itemTap(type,index){
                if (that.checkbox == null) {
                    that.$util.myhref('/pages/resources/iframe?iframeurl=' + that.list[index].url, 'redirectTo')
                }
            },
            change(e) {
                var checked = e.detail.value
                var type = e.currentTarget.dataset.type
                
                var list = that.list
                for (let i in list[type]) {
                    if (checked.indexOf(parseInt(i)) != -1) {
                        list[type][i].checked = true
                    } else {
                        list[type][i].checked = false
                    }
                }
                that.list = list
                that[type] = checked
            },
            dodel(type){
                var str = ''
                for (let i in that.list) {
                    if (that.list[i].checked) {
                        str += str == '' ? that.list[i].id : ',' + that.list[i].id
                    }
                }
                str = 'id in (' + str + ')'
                            
                Db.del('upload', str, function(res) {
                    that.getlist()
                })
            },
            del(type) {
                if(type=='success'){
                    that.dodel(type)
                }else{
                    that.$refs.toast.confirm('确认删除选中项', {}, function() {
                        that.dodel(type)
                    })
                }
            },
            showModal(e) {
                that.modalName = e.currentTarget.dataset.name
                that.submit = JSON.parse(JSON.stringify(that.list[e.currentTarget.dataset.type][e.currentTarget.dataset.index]))
            },
            getupload() {
                Db.select('upload', '', function(res) {
                    var loading = []
                    var success = []
                    for (let i in res.data) {
                        if (res.data[i].finish == 1) {
                            success.push(res.data[i])
                        } else {
                            loading.push(res.data[i])
                        }
                    }
                    that.list = {
                        loading: loading,
                        success: success
                    }
                })
            },
            openCheckbox(type, index) {
                if (that[type] == null) {
                    that[type] = []
                }
            },
            changeCheckbox(type) {
                if (that[type] == null) {
                    that[type] = []
                } else if (that[type].length == 0) {
                    that[type] = null
                } else {
                    that.del(type)
                }
            },
        },

    }
</script>

<style>
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
