<template>
	<view class="title">
		输入病患个人资料
	</view>
	
	<view class="main" v-for="(item,index) in list" :key="index">
		<view class="input_box">
			<text>{{item.title}}</text>
			<view class="" style="margin-top: 30rpx;">
				<uni-easyinput  @focus="handleFocus" v-model="value" focus :placeholder="item.text" @input="input" :styles="styles" :placeholderStyle="placeholderStyle"/>
			</view>
		</view>
	</view>
	
	<view class="button">
			<button @click="handleClick" size="default" type="default" 
			style="color:#ffffff;backgroundColor:#52D4A2;" 
			hover-class="is-hover">查看VAS记录</button>
	</view>

</template>

<script setup>
	import {ref,reactive} from 'vue'
	const styles = reactive({
		borderColor:'black'
	})
	const list = reactive([
		{title:'姓名',text:'请输入姓名'},
		{title:'性别',text:'请输入性别'},
		{title:'年龄',text:'请输入年龄'},
		{title:'看诊医师',text:'请输入看诊医师'},
		{title:'就诊医院',text:'请输入就诊医院'},
	])
	
	const value = ref('')
	
	function handleFocus(){
		
	}
	
	function handleClick(){
		uni.navigateTo({
			url: '/pages/chart/chart'
		})
	}
	
	
</script>

<style lang="scss">
	@import '../../static/scss/common.scss';
	 
	 .title{
		 @include medium
	 }
	 
	 .input_box{
		 margin-top: 50rpx;
		 margin-left: 50rpx;
		 width: 650rpx;
		 font-size: 35rpx;
	 }
	 
	 .button{
		margin-left: 30rpx;
		margin-top: 50rpx;
		width: 700rpx;
		height: 200rpx;
		
	 }
</style>
