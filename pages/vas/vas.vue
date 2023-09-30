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
					{{info.pain_level_custom}}
				</view>
				
				
				<slider style="-webkit-appearance:slider-vertical;" @change="handleSlider" :value="info.pain_level_custom" max= "10" activeColor="#52D4A2"/>
				
				
				
				<button @click="handleNextStep" size="default" type="default"
					style="color:#ffffff;backgroundColor:#52D4A2;margin-top: 440rpx;width: 600rpx;margin-left: 53rpx;font-size: 35rpx;;" 
					hover-class="is-hover">提交报告<uni-icons type="compose" size="15" color="white" style="margin-left: 15rpx;"></uni-icons></button>
				
				
		</view>
		
	</view>
</template>

<script setup>
	import {ref,reactive,onMounted} from 'vue'
	import {uploadStore} from '@/stores/upload.js'
	import {searchStore} from '@/stores/search.js'
	
	const uploadStoreTemp = uploadStore()
	const searchStoreTemp = searchStore()
	const image = ref('')

	
	const user = reactive({
		name:''
	})
		
	onMounted(()=>{
		user.name = searchStoreTemp.searchInfo.user_name
		info.pain_data_path = searchStoreTemp.pain_data_path
	})
	
	const info = reactive({
	  "patient_id": 666,
	  "pain_level_custom": 5,
	  "pain_data_path": "string"
	})

	
	async function handleNextStep(){
		console.log(info);
		const { data: res } = await uni.$http.post('/v1/pain',info)
		console.log(res);
		uni.navigateTo({
			url:'/pages/vas/vas'
		})
	}
	
	function handleSlider(e){
		info.pain_level_custom = e.detail.value
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
		position: fixed;
		bottom: 100rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	
	.medium{
		margin: auto;
	}
	
	
	
</style>
