<template>
	<view class="content">
        <custom bgColor='bg-black' :isBack="true">
            <block slot="content">菜单</block>
        </custom>
		<view class="cu-modal drawer-modal justify-end show" :style="'margin-top:'+CustomBar+'px;height:calc(100vh - '+CustomBar+'px)'" @tap="hide">
			<view class="cu-dialog basis-lg" >
				<view class="cu-list menu text-left">
					<view class="cu-item " v-for="(item,index) in menu" @tap.stop="tap(index)">
						<view class="content">
							<view><text class="cuIcon" :class="'cuIcon-'+item.icon"></text>{{item.title}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
        
        <toast ref="toast"></toast>
	</view>
</template>

<script>
    import detabase from'../../utils/db.js'
    var that
	export default {
		data() {
			return {
                CustomBar:this.CustomBar,
				menu:[
                    {
                        title:'添加收藏',
                        icon:'favorfill',
                        url:'addcollect'
                    },{
                        title:'我的收藏',
                        icon:'favor',
                        url:'/pages/menu/collect'
                    },{
                        title:'播放列表',
                        icon:'list',
                        url:'/pages/play/playlist?type=list'
                    },
                ]
			}
		},
        onLoad() {
            that = this
        },
		methods: {
			tap(index){
                if(that.menu[index].url.indexOf('/pages')==-1){
                    that[that.menu[index].url]()
                }else{
                    that.$util.myhref(that.menu[index].url,'redirectTo')
                }
            },
            addcollect(){
                var Db = new detabase('video')
                var Current = getCurrentPages()
                var page = Current[Current.length - 2]
                page = page.$vm
                var data = {
                    title:page.wv.getTitle(),
                    url:page.wv.getURL(),
                }
                Db.select('collect', {url:data.url}, function(res) {
                    if(res.data.length!=0){
                        that.$refs.toast.msg('已收藏')
                    }else{
                        that.$refs.toast.msg('收藏成功')
                        
                        Db.insert('collect',data)
                    }
                })
                
               
            },
            hide(){
                uni.navigateBack({})
            }
		}
	}
</script>

<style>
    .cuIcon{
        margin-right: 10rpx;
    }
</style>
