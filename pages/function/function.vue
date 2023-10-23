<template>
	<view class="main">
		<text class="title_1">早上好！{{user.name}}</text>
		<view class="">
			<text class="title_2">欢迎登录疼痛分级系统</text>
		</view>
		<view>
			<image @click="handleClick('/pages/detection/detection')" src="../../static/function1.jpg" mode=""></image>
			<image @click="handleClick('/pages/communicate/communicate')" src="../../static/function2.jpg" mode=""></image>
			<image @click="handleClick('/pages/update_info/update_info')" src="../../static/function3.jpg" mode=""></image>
		</view>
	</view>

</template>

<script setup>
	import {ref , reactive,onMounted} from 'vue'
	import {searchStore} from '@/stores/search.js'
	
	const searchStoreTemp = searchStore()
	onMounted(()=>{
		user.name = searchStoreTemp.searchInfo.user_name
        searchStoreTemp.setLogin(true)
	})
	
	const user = reactive({
		name:''
	})
	
	function handleClick(url){
		uni.navigateTo({
			url:url
		})
	}
</script>

<style lang="scss">
	image{
		height: 230rpx;
		width: 700rpx;
		margin-top: 50rpx;
	}
	
	.main{
		margin: 30rpx;
	}
	
	.title_1{
		font-size: 60rpx;
	}
	
	.title_2{
		font-size: 50rpx;
		font-weight: 400;
	}
</style>
