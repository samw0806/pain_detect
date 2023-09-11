<template>
	<view class="main">
		<view class="user">
			<view class="" style="display: inline-block;">
				<image src="../../static/user.png" mode="" style="height: 50rpx;width: 50rpx;"></image>
			</view>
			
			<view class="text" style="display: inline-block;">
				<text style="line-height: 100rpx;">{{user.name}}</text>
			</view>
		</view>
		
		<view class="" style="display: grid;">
			<view class="" style="margin: auto;">
				请上传您的正脸照
			</view>
			<view class="" style="margin: 50rpx auto;">
				<image @click="handleUpload" src="../../static/upload.jpg" mode="" style="height: 550rpx;width: 570rpx;"></image>
			</view>
			<view class="buttom" style="margin: auto;">
				<view @click="handleUpload" class="" style="display: inline-block; margin-right: 80rpx;">
					<view class="" style="display: flex;justify-content: center;">
						<image src="../../static/photo.png" mode="" style="height: 40rpx;width: 40rpx;"></image>
					</view>
					<view class="" style="margin-top: 20rpx;">
						相册选择
					</view>
				</view>
				<view class="divide" style="border-left: 5rpx solid gainsboro;height: 50rpx;display: inline-block;margin-left: -30rpx">
					
				</view>
				<view @click="handleCamera" class="" style="display: inline-block;margin-left: 50rpx;">
					<view class="" style="display: flex;justify-content: center;">
						<image src="../../static/camera.png" mode="" style="height: 40rpx;width: 40rpx;"></image>
					</view>
					<view class="" style="margin-top: 20rpx;">
						直接拍摄
					</view>
				</view>
			</view>
			
			<button @click="handleProcess" size="default" type="default"
			style="color:#ffffff;backgroundColor:#52D4A2;border-radius: 10;margin-top: 50rpx;" 
			hover-class="is-hover">开始检测<uni-icons type="forward" size="20" color="white"></uni-icons></button>
		</view>
		
	</view>
</template>

<script setup>
	import {ref,reactive} from 'vue'
	import {uploadStore} from '@/stores/upload.js'
	
	const uploadStoreTemp = uploadStore()
	
	const upload = ref(false)
	
	const user = reactive({
		name:'病患1231'
	})
	
	function handleUpload(){
		uni.chooseImage({
		  	count: 1,
		    sizeType: ['original', 'compressed'],
		    sourceType: ['album'], //这要注意，camera掉拍照，album是打开手机相册
		    success: (res)=> {
				console.log(res);
				uploadStoreTemp.setUploadImage(res.tempFilePaths) 
				upload.value = true				
		    }
		});
	}
	
	function handleCarmera(){
		uni.chooseImage({
		  	count: 1,
		    sizeType: ['original', 'compressed'],
		    sourceType: ['carmera'], //这要注意，camera掉拍照，album是打开手机相册
		    success: (res)=> {
				console.log(res);
				const tempFilePaths = res.tempFilePaths;
				upload.value = true
		    }
		});
	}
	
	function handleProcess(){
		if(upload.value == false){
			uni.showToast({
				title:'请先上传图片',
				icon:'error',
				duration:2000
			})
		}
		else{
			uni.navigateTo({
			    url: '/pages/result/result'
			});
		}
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
		font-size: 30rpx;
	}
	
	button{
		width: 700rpx;
		height: 120rpx;
	}
</style>
