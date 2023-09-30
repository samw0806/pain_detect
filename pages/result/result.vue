<template>
	<view class="main">
		<view class="user" style="margin-top: -30rpx;">
			<view class="" style="display: inline-block;vertical-align:-16rpx;">
				<image src="../../static/user.png" mode="" style="height: 50rpx;width: 50rpx;"></image>
			</view>
			
			<view class="text" style="display: inline-block;line-height: 60rpx;">
				<text style="line-height: 100rpx;">{{user.name}}</text>
			</view>
		</view>
		
		<view class="buttom">
				
				<view class="medium" style="margin: auto;">
					图片展示
				</view>
				
<!-- 				<view class="medium" style="margin: auto;">
					检测结果
				</view>
				<view class="medium" style="color: white;background-color: red;border-radius:8%;width: 200rpx;height: 60rpx;font-size: 35rpx;text-align: center;margin-top: 20rpx;font-weight: 500;line-height: 60rpx;">
					二级疼痛
				</view> -->
				
				<image :load="image==''? true : false" class="medium" :src="image" mode="" style="height: 700rpx;width: 650rpx;margin-top: 20rpx;"></image>
				
				<view class="medium" style="font-size: 30rpx;margin-top: 20rpx;">
					<uni-icons type="refresh-filled" size="20" color="#339EE6" style="display: inline-block;vertical-align:-8rpx;"></uni-icons>
					<view class="" style="display: inline-block;color: #339EE6;font-weight: 400;">
						重新检测
					</view>	
						

				</view>
				
				<button @click="handleNextStep" size="default" type="default"
					style="color:#ffffff;backgroundColor:#52D4A2;margin-top: 30rpx;width: 600rpx;margin-left: 53rpx;font-size: 35rpx;;" 
					hover-class="is-hover">下一步<uni-icons type="forward" size="15" color="white"></uni-icons></button>
				
			
		</view>
		
	</view>
</template>

<script setup>
	import {ref,reactive,onMounted} from 'vue'
	import {uploadStore} from '@/stores/upload.js'
	import {searchStore} from '@/stores/search.js'
	const searchStoreTemp = searchStore()

	const uploadStoreTemp = uploadStore()
	
	const image = ref('')
	
	const user = reactive({
		name:''
	})
	onMounted(()=>{
		uni.showLoading({
			title:'图片加载中',
			mask:true
		})
		setTimeout(function () {
			uni.hideLoading();
		}, 2000);
		user.name = searchStoreTemp.searchInfo.user_name
		image.value = uploadStoreTemp.uploadImage
	})
	

	
	function handleNextStep(){
		uni.navigateTo({
			url:'/pages/vas/vas'
		})
	}
</script>

<style lang="scss">
	
	
	.main{
		margin: 30rpx;
	}
	
	.user{
		flex:1;
		text-align: right;
	}
	
	.text{
		font-size: 30rpx;
	}
	
	.buttom{
		display: grid;
		margin-top: -20rpx;
	}
	
	.medium{
		margin: auto;
	}
	
	
	
</style>
