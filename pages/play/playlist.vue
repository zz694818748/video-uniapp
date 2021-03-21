<template>
    <view>
        <custom bgColor='bg-black' :isBack="true">
            <block slot="content">播放列表</block>
            <block slot="right">
                <view class="action">
                    <view class="cuIcon cuIcon-roundadd" @click="modalName='addplay'"></view>
                </view>
            </block>
        </custom>


        <view class="cu-load loading" v-if="playlist ==null">
        </view>
        <view class="cu-list" :class="{mypadding:isdel}" v-else-if="playlist.length>0">
            <view class="cu-item bg-white" :class="{'movecur':selectedindex==index}" v-for="(item,index) in playlist"
                @tap="showmore(index)" @longpress="longpress(index)">
                <view class="content">
                    <view class="title">
                        {{item.title}}
                    </view>
                    <view class="time">
                        时长：{{item.duration}}
                    </view>
                </view>
                <view v-if="isdel" class="text-yellow morebtn">
                    <text :class="item.checked ? 'cuIcon-roundcheck' : 'cuIcon-round'"></text>
                </view>
                <view class="more bg-black">
                    <view class="text-orange" @tap.stop="showselect(index)">
                        播放
                    </view>
                    <view class="text-orange" @tap.stop="showmodal(index)">
                        编辑
                    </view>
                    <view class="text-orange" @tap.stop="upload(index)" v-if="type=='list'">
                        缓存
                    </view>
                </view>
            </view>
        </view>
        <view class="cu-load over" v-else></view>

        <view class="cu-modal" :class="modalName=='play'?'show':''">
            <view class="mydialog">
                <view class="bg-white" @tap.stop="$util.myhref('/pages/play/single?index=' + selectedindex)">个人观看</view>
                <view class="bg-white" @tap.stop="modalName='createroom'">创建房间</view>
                <view class="bg-white text-red" @tap.stop="hideModal">取消</view>
            </view>
        </view>

        <view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end solid-bottom">
                    <view class="content">修改名称</view>
                    <view class="action" @tap="hideModal">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <view class="">
                    <view class="cu-form-group">
                        <view class="title">名称</view>
                        <input v-model="value"></input>
                    </view>
                </view>
                <view class="cu-bar bg-white justify-end solid-top">
                    <view class="action">
                        <button class="cu-btn line-black text-black" @tap="hideModal">取消</button>
                        <button class="cu-btn bg-black margin-left" @tap="save">确定</button>
                    </view>
                </view>
            </view>
        </view>

        <view class="cu-modal bottom-modal" :class="modalName=='createroom'?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white">
                    <view class="action text-green" @tap="send">创建</view>
                    <view class="action text-blue" @tap="hideModal">取消</view>
                </view>
                <view class="padding">
                    <view class="cu-form-group">
                        <view class="title">房间类型</view>
                        <radio-group class="block" @change="RadioChange" data-name='status'>
                            <radio class='cyan radio' :class="createdata.status=='1'?'checked':''" :checked="createdata.status=='1'?true:false"
                                value="1">公开</radio>
                            <radio class='cyan radio margin-left-sm' :class="createdata.status=='2'?'checked':''"
                                :checked="createdata.status=='2'?true:false" value="2">
                                <view v-if="createdata.status!='2'">加密</view>
                            </radio>
                            <input maxlength="10"  v-if="createdata.status=='2'" placeholder="请输入密令" v-model="createdata.password" />
                        </radio-group>
                    </view>
                    <view class="cu-form-group">
                        <view class="title">加入性别</view>
                        <radio-group class="sex" @change="RadioChange" data-name='cansex'>
                            <radio class='cyan radio' :class="createdata.cansex=='0'?'checked':''" :checked="createdata.cansex=='0'?true:false"
                                value="0">全部</radio>
                            <radio class='cyan radio' :class="createdata.cansex=='1'?'checked':''" :checked="createdata.cansex=='1'?true:false"
                                value="1">男</radio>
                            <radio class='cyan radio' :class="createdata.cansex=='2'?'checked':''" :checked="createdata.cansex=='2'?true:false"
                                value="2">女</radio>
                        </radio-group>
                    </view>
                    <view class="cu-form-group">
                        <view class="title">允许人数</view>
                        <input class="canpeople" type="number" maxlength="2" v-model="createdata.canpeople" />人；
                        <view class="tip text-gray">最多20人</view>
                    </view>
                </view>
            </view>
        </view>

        <view class="cu-modal" :class="modalName=='addplay'?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end solid-bottom">
                    <view class="content">添加视频</view>
                    <view class="action" @tap="hideModal">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <view class="padding">
                    <view class="cu-form-group">
                        <view class="title">视频名称</view>
                        <input v-model="add.title" placeholder="视频名称" />
                    </view>
                    <view class="cu-form-group">
                        <view class="title">url地址</view>
                        <view class="textarea">
                            <textarea v-model="add.network" placeholder="m3u8地址"></textarea>
                        </view>

                    </view>
                </view>
                <view class="cu-bar bg-white justify-end solid-top">
                    <view class="action">
                        <button class="cu-btn line-black text-black" @tap="hideModal">取消</button>
                        <button class="cu-btn bg-black margin-left" @tap="addplay">确定</button>
                    </view>
                </view>
            </view>
        </view>

        <view class="menu bg-white" :class="{show:isdel}">
            <view class="list">
                <view class="text-cyan" @tap="selectall">
                    <text class="cuIcon cuIcon-rounddown"></text>
                    全选
                </view>
                <view class="text-red" @tap="del">
                    <text class="cuIcon cuIcon-delete"></text>
                    删除
                </view>
            </view>
            <view class="clear" @click="closedel">
                取消
            </view>
        </view>

        <view class="hide">
            <video id="video" v-if="analysis" autoplay="true" :src="analysis" controls="false" muted="true" @timeupdate="timeupdate"
                @error="error"></video>
            <cover-view class="hidec"></cover-view>
        </view>
        <toast ref="toast"></toast>
    </view>
</template>

<script>
    function secondToDate(result) {
        var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
        var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 %
            60));
        var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
        return result = h + ":" + m + ":" + s;
    }
    var that
    import database from '../../utils/db.js'
    var Db
    export default {
        data() {
            return {
                createdata: {
                    password:'',
                    cansex: 0,
                    status: 1,
                    canpeople: 2,
                },
                add: {
                    title: 'test',
                    network: 'https://www.zhuticlub.com:65/20190511/1CAQr5Vz/index.m3u8',
                    duration: 0
                },
                type: 'list',
                playlist: null,
                selectedindex: null,
                playindex: null,
                checknum: 0,
                // modalName: 'addplay',
                modalName: null,
                value: '',
                isdel: false,
                analysis: ''
            }
        },
        onLoad(option) {
            that = this
            that.type = option.type
            // #ifdef APP-PLUS
            Db = new database('video')
            // Db.executeSql('drop table upload')
            that.getstorage()
            //#endif


        },
        onBackPress() {
            uni.hideLoading()
        },
        onReady() {

        },
        methods: {
            send(){
                that.$util.myhref('/pages/play/online?type=create&index=' + that.selectedindex)
            },
            upload(index) {
                uni.showLoading({
                    mask: true,
                    title: '解析中.'
                })
                var player = that.playlist[index]
                Db.select('upload', {
                    network: player.network
                }, function(res) {
                    if (res.data.length != 0) {
                        that.$refs.toast.msg('已在下载列表')
                    } else {
                        that.selectedindex = null
                        var data = {
                            id: '' + new Date().getTime(),
                            network: player.network,
                            location: '',
                            title: player.title,
                            duration: player.duration,
                            finish: 0
                        }
                        data.page = that
                        uni.$emit('addm3u8upload', data)
                    }
                })
            },
            timeupdate(e) {
                if (that.add.duration == 0 && e.detail.currentTime > 0) {
                    uni.hideLoading()
                    var dur = Math.ceil(e.detail.duration)
                    var duration = secondToDate(dur)
                    that.add.duration = duration
                    let player = uni.createVideoContext('video')
                    player.pause()
                    that.doadd();

                }
            },
            error(e) {
                uni.hideLoading()
                that.$refs.toast.msg('解析失败', {})
            },
            doadd() {
                Db.select('playlist', {
                    network: that.add.network
                }, function(res) {
                    if (res.data.length != 0) {
                        that.$refs.toast.msg('已添加')
                    } else {
                        that.$refs.toast.msg('添加成功')
                        Db.insert('playlist', that.add, function() {
                            that.getstorage()
                        })
                        that.hideModal()
                    }
                })
            },
            addplay() {
                if (that.add.title.length > 15) {
                    that.$refs.toast.msg('视频名称过长')
                    return
                }
                if (that.add.network.length > 100) {
                    that.$refs.toast.msg('视频地址过长')
                    return
                }
                uni.showLoading({
                    mask: true,
                    title: '解析中'
                })
                that.analysis = that.add.network
            },
            RadioChange(e) {
                var name = e.currentTarget.dataset.name
                that.createdata[name] = e.detail.value
            },
            showselect(index) {
                if (that.type == 'list') {
                    that.modalName = 'play';
                }
            },
            closedel() {
                that.checknum = 0
                for (let i in that.playlist) {
                    that.playlist[i].checked = false
                }
                that.isdel = false
            },
            selectall() {
                var bool = true
                if (that.checknum >= that.playlist.length) {
                    bool = false
                    that.checknum = 0
                } else {
                    that.checknum = that.playlist.length
                }

                for (let i in that.playlist) {
                    that.playlist[i].checked = bool
                }
            },
            longpress(index) {
                that.isdel = true
                that.selectedindex = null
                var bool = that.playlist[index].checked ? false : true
                that.playlist[index].checked = bool
                if (bool) {
                    that.checknum++
                } else {
                    that.checknum--
                }
            },
            showmore(index) {
                if (that.isdel) {
                    var bool = that.playlist[index].checked ? false : true
                    var playlist = JSON.parse(JSON.stringify(that.playlist))
                    playlist[index].checked = bool
                    if (bool) {
                        that.checknum++
                    } else {
                        that.checknum--
                    }
                    that.playlist = playlist
                } else {
                    that.selectedindex = that.selectedindex == index ? null : index
                }
            },
            getstorage() {
                Db.select('playlist', '', function(res) {
                    that.playlist = res.data
                })
            },
            save() {
                that.playlist[that.selectedindex].title = that.value
                Db.update('playlist', {
                    title: that.value
                }, {
                    id: that.playlist[that.selectedindex].id
                }, function() {
                    that.hideModal()
                    that.selectedindex = null
                })
            },
            del(index) {
                that.$refs.toast.confirm('确认删除' + that.checknum + '条数据', {}, function() {
                    var playlist = JSON.parse(JSON.stringify(that.playlist))
                    var ids = []
                    for (let i in playlist) {
                        if (playlist[i].checked) {
                            ids.push(playlist[i].id)
                        }
                    }
                    Db.del('playlist', {
                        id: ['IN', ids]
                    }, function() {
                        that.$refs.toast.msg('删除成功')
                        that.checknum = 0
                        that.isdel = false
                        that.getstorage()
                    })
                })
            },
            showmodal(index) {
                that.modalName = 'DialogModal1'
                that.value = that.playlist[index].title
            },
            hideModal() {
                that.modalName = null
                that.add = {
                    title: '',
                    network: '',
                    duration: 0
                }
            }
        }
    }
</script>

<style>
    .hide {
        opacity: 0;
        height: 100rpx;
        overflow: hidden;
        position: relative;
    }

    .hidec {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 10rpx;
        background-color: #f1f1f1;
    }

    video {
        height: 1px;
        width: 1px;
    }

    .cu-form-group uni-textarea {
        margin: 20rpx 0;
    }

    .textarea {
        text-align: left;
        border: 1px solid #eee;
        padding: 0 30rpx;
        border-radius: 10rpx;
        flex: 1;
        margin: 15rpx 0;
    }

    .cu-form-group .canpeople {
        width: 100rpx;
        text-align: right;
    }

    .sex {
        flex: 1;
        display: flex;
        justify-content: space-between;
    }

    .block {
        flex: 1;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .mydialog>view {
        text-align: center;
        height: 100rpx;
        line-height: 100rpx;
        border-radius: 10rpx;
        margin-top: 30rpx;
        font-size: 34rpx;
    }

    .mydialog {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 30rpx;
        padding-bottom: 100rpx;
    }

    .mypadding {
        padding-bottom: 100rpx;
    }

    .time {
        margin-top: 10rpx;
    }

    .menu .clear {
        position: absolute;
        height: 100%;
        right: 30rpx;
        top: 0;
        display: flex;
        align-items: center;
    }

    .menu .cuIcon {
        margin-right: 5rpx;
        font-size: 34rpx;
    }

    .menu .list>view+view {
        margin-left: 50rpx;
    }

    .menu .list {
        display: flex;
        height: 100%;
        align-items: center;
    }

    .menu.show {
        height: 100rpx;
    }

    .menu {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 0rpx;
        width: 100vw;
        box-shadow: 0 0 10px #333;
        display: flex;
        justify-content: center;
        transition: all .6s ease-in-out 0s;
        overflow: hidden;
    }

    .cu-form-group input {
        text-align: left;
    }

    .content>view {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .content {
        flex: 1;
        align-items: center;
        width: calc(100% - 65rpx);
    }

    .cu-item .morebtn {
        font-size: 40rpx;
        margin-left: 15rpx;
        width: 50rpx;
        height: 50rpx;
        border-radius: 25rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cu-item .more view+view {
        border-left: 1px solid #fff;
    }

    .cu-item .more view {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cu-item .more {
        transform: translateX(100%);
        position: absolute;
        right: 0;
        height: 100%;
        width: 320rpx;
        display: flex;
    }

    .cu-item.movecur {
        transform: translateX(-320rpx);
    }

    .cu-item {
        padding: 0 30rpx;
        position: relative;
        height: 130rpx;
        transition: all .6s ease-in-out 0s;
        transform: translateX(0px);
        align-items: center;
        display: flex;
    }

    .cu-item+.cu-item {
        margin-top: 10rpx;
    }
</style>
