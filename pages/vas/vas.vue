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

				<view class="medium" style="margin: auto;font-size: 60rpx;font-weight: 400;">
					Vas评分
				</view>
				<view class="medium" style="width: 350rpx;height: 60rpx;font-size: 35rpx;text-align: center;margin-top: 20rpx;font-weight: 500;line-height: 60rpx;">
					请滑动下方滚动条评分
				</view>
				
				<view class="medium" style="font-size: 50rpx;border-bottom: #52D4A2 8rpx solid;margin-top: 150rpx;">
					{{vas_number}}
				</view>
				
				
				<slider style="-webkit-appearance:slider-vertical;" @change="handleSlider" :value="vas_number" max= "10" activeColor="#52D4A2"/>

				
				<button @click="handleNextStep" size="default" type="default"
					style="color:#ffffff;backgroundColor:#52D4A2;margin-top: 440rpx;width: 600rpx;margin-left: 53rpx;font-size: 35rpx;;" 
					hover-class="is-hover">提交报告<uni-icons type="compose" size="15" color="white" style="margin-left: 15rpx;"></uni-icons></button>
				
			
		</view>
		
	</view>
</template>

<script setup>
	import {ref,reactive,onMounted} from 'vue'
	import {uploadStore} from '@/stores/upload.js'
	
	const uploadStoreTemp = uploadStore()
	
	const image = ref('')
	const vas_number = ref(5)
	
	
		
	onMounted(()=>{

	})
	
	const user = reactive({
		name:'病患1231'
	})
	
	function handleNextStep(){
		uni.navigateTo({
			url:'/pages/vas/vas'
		})
	}
	
	function handleSlider(e){
		vas_number.value = e.detail.value
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
		margin-top: 20rpx;
	}
	
	.medium{
		margin: auto;
	}
	
	
	
</style>
