<template>
	<view class="main">
		<view class="user" style="margin-top: -30rpx;">
			<view class="" style="display: inline-block;vertical-align:-16rpx;">
				<image src="../../static/user.png" mode="" style="height: 50rpx;width: 50rpx;"></image>
			</view>
			
			<view class="text" style="display: inline-block;">
				<text style="line-height: 100rpx;">{{user.name}}</text>
			</view>
		</view>
		
		<view class="" style="display: grid;margin-top: 30rpx;">
			<view class="" style="margin: auto;font-size: 50rpx;">
				请上传您的正脸照
			</view>
			<view class="" style="margin: 50rpx auto;">
				<image @click="handleUpload" :src="img" mode="" style="height: 550rpx;width: 570rpx;"></image>
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
			style="color:#ffffff;font-size:35rpx;height: 90rpx;;backgroundColor:#52D4A2;border-radius: 10;margin-top: 50rpx;" 
			hover-class="is-hover">开始检测<uni-icons type="forward" size="15" color="white"></uni-icons></button>
		</view>
		
	</view>
</template>

<script setup>
	import {ref,reactive,onMounted} from 'vue'
	import {uploadStore} from '@/stores/upload.js'

	import {searchStore} from '@/stores/search.js'
	const uploadStoreTemp = uploadStore()
	
	const upload = ref(false)
	
	const img = ref('../../static/upload.jpg')
		
	const searchStoreTemp = searchStore()
	onMounted(()=>{
		user.name = searchStoreTemp.searchInfo.user_name
	})
	
	const user = reactive({
		name:''
	})
	
	function handleUpload(){
		// uni.chooseImage({
		//   	count: 1,
		//     sizeType: ['original', 'compressed'],
		//     sourceType: ['album'], //这要注意，camera掉拍照，album是打开手机相册
		//     success: async (res)=> {
		// 		uni.showToast({
		// 			title:'上传中...',
		// 			icon:'loading',
		// 			duration:2000
		// 		})
		// 		img.value = '../../static/right.jpg'
		// 		uploadStoreTemp.setUploadImage(res.tempFilePaths) 
		// 		// const { data: res } = await uni.$http.post(`http://43.139.26.201:25800/v1/storage`)
		// 		// console.log(res);
		// 		upload.value = true		

		//     }
		// });
		uni.chooseMedia({
		  count: 1,
		  mediaType: ['image','video'],
		  sourceType: ['album'],
		  maxDuration: 30,
		    success: async (res)=> {
				console.log(res);
				uni.showToast({
					title:'上传中...',
					icon:'loading',
					duration:2000
				})
				img.value = '../../static/right.jpg'
				uploadStoreTemp.setUploadImage(res.tempFiles[0].tempFilePath) 
				uploadStoreTemp.setUploaduploadType(res.type)
				// const { data: res } = await uni.$http.post(`http://43.139.26.201:25800/v1/storage`)
				// console.log(res);
				upload.value = true	}
		})
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
			// const formData = new FormData();
			// formData.append('pain_data',res.tempFilePaths)
			// formData.append('patient_id',123456)
			// const { data: r } = await uni.$http.post('/v1/storage',formData)
			// console.log(r);
			
			uni.uploadFile({
				url: 'http://43.139.26.201:25800/v1/storage',
				filePath:uploadStoreTemp.uploadImage,
				name:'pain_data',
				formData:{
					'patient_id':searchStoreTemp.searchInfo.id
				},
				success:(res)=>{
					console.log(JSON.parse(res.data).data.path);
					searchStoreTemp.setPaindatapath(JSON.parse(res.data).data.path)		
					console.log(res.data);
				}
			})
			console.log(uploadStoreTemp.uploadImage[0]);
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
