<template>
	<view class="main">
		<text class="title_1">早上好！{{user.name}}</text>
		<view class="">
			<text class="title_2">欢迎登录疼痛分级系统</text>
		</view>
		<view>
			<image @click="handleClick('/pages/search/search')" src="../../static/fun1.jpg" mode=""></image>
			<image @click="handleClick('/pages/communicate_doc/communicate_doc')" src="../../static/fun2.jpg" mode=""></image>
			<image @click="handleClick('/pages/doc_info/doc_info')" src="../../static/fun3.jpg" mode=""></image>
		</view>
	</view>

</template>

<script setup>
	import {ref , reactive} from 'vue'
	
	const user = reactive({
		name:'张远'
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
