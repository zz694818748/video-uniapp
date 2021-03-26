<template>
	<view>
        <custom bgColor='bg-black' :isBack="true">
            <block slot="content">账号安全</block>
        </custom>
		<view class="cu-list menu bg-white mymargin">
		    <view class="cu-item" @click="modalName='pwd'">
		        <view class="content">
		            <text class="cuIcon-lock"></text>
		            <text class="">修改密码</text>
		        </view>
		    </view>
            <view class="cu-item"  @click="modalName='mail'">
		        <view class="content">
		            <text class="cuIcon-mail"></text>
		            <text class="">绑定邮箱</text>
		        </view>
                <view class="text-gray">6948****@qq.com</view>
		    </view>
            <view class="cu-item" @click="modalName='phone'">
		        <view class="content">
		            <text class="cuIcon-mobile"></text>
		            <text class="">绑定手机</text>
		        </view>
                <view class="text-gray">151****2291</view>
		    </view>
        </view>
        
        <view class="cu-modal" :class="modalName=='pwd'?'show':''">
        	<view class="cu-dialog">
        		<view class="cu-bar bg-white justify-end">
        			<view class="content" >修改密码</view>
        			<view class="action" @tap="modalName = null">
        				<text class="cuIcon-close text-red"></text>
        			</view>
        		</view>
        		<view class="padding-xl">
        			Modal 内容。
        		</view>
        		<view class="cu-bar bg-white justify-end">
        			<view class="action">
        				<button class="cu-btn line-black text-black" @tap="modalName = null">取消</button>
        				<button class="cu-btn bg-black margin-left" @tap="modalName = null">确定</button>
        			</view>
        		</view>
        	</view>
        </view>
        <view class="cu-modal" :class="modalName=='mail'?'show':''">
        	<view class="cu-dialog">
        		<view class="cu-bar bg-white justify-end">
        			<view class="content" >绑定邮箱</view>
        			<view class="action" @tap="modalName = null">
        				<text class="cuIcon-close text-red"></text>
        			</view>
        		</view>
        		<view class="padding-xl">
        			Modal 内容。
        		</view>
        		<view class="cu-bar bg-white justify-end">
        			<view class="action">
        				<button class="cu-btn line-black text-black" @tap="modalName = null">取消</button>
        				<button class="cu-btn bg-black margin-left" @tap="modalName = null">确定</button>
        
        			</view>
        		</view>
        	</view>
        </view>
        <view class="cu-modal" :class="modalName=='phone'?'show':''">
        	<view class="cu-dialog">
        		<view class="cu-bar bg-white justify-end">
        			<view class="content" >绑定手机</view>
        			<view class="action" @tap="modalName = null">
        				<text class="cuIcon-close text-red"></text>
        			</view>
        		</view>
        		<view class="padding-xl">
        			Modal 内容。
        		</view>
        		<view class="cu-bar bg-white justify-end">
        			<view class="action">
        				<button class="cu-btn line-black text-black" @tap="modalName = null">取消</button>
        				<button class="cu-btn bg-black margin-left" @tap="modalName = null">确定</button>
        
        			</view>
        		</view>
        	</view>
        </view>
	</view>
</template>

<script>
    var that
	export default {
		data() {
			return {
				modalName:null,
			}
		},
        onLoad() {
            that = this
        },
		methods: {
			
		}
	}
</script>

<style>

</style>
