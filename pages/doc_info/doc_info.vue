<template>
	<view class="title">
		请输入您的个人资料
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
			hover-class="is-hover">保存并登录</button>
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
		{title:'医院',text:'请输入医院'},
		{title:'秘钥',text:'请输入秘钥'},
	])
	
	const value = ref('')
	
	function handleFocus(){
		
	}
	
	function handleClick(){
		uni.navigateTo({
			url: '/pages/function_doc/function_doc'
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

