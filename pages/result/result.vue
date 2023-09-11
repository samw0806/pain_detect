<template>
	<view>
		<view class="user">
			<view class="" style="display: inline-block;">
				<image src="../../static/user.png" mode="" style="height: 50rpx;width: 50rpx;"></image>
			</view>
			
			<view class="text" style="display: inline-block;">
				<text style="line-height: 100rpx;">{{user.name}}</text>
			</view>
		</view>
		
		<image :src="image" mode=""></image>
	</view>
</template>

<script setup>
	import {ref,reactive,onMounted} from 'vue'
	import {uploadStore} from '@/stores/upload.js'
	
	const uploadStoreTemp = uploadStore()
	
	const image = ref('')
	
		
	onMounted(()=>{
		image.value = uploadStoreTemp.uploadImage
	})
	
	const user = reactive({
		name:'病患1231'
	})
</script>

<style lang="scss">
	.user{
		flex:1;
		text-align: right;
	}
</style>
