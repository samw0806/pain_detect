<template>
	<view class="title">
		请输入您的个人资料
	</view>
	
	<uni-forms :rules="validRules" :modelValue="inputValues" ref="form">
		<view class="main" v-for="(item,index) in list" :key="index">
			<view class="form-group">
				<uni-forms-item :name="item.name">
					<text>{{item.title}}</text>
					<view class="" style="margin-top: 30rpx;">
						<uni-easyinput  @focus="handleFocus" v-model="inputValues[item.name]" focus :placeholder="item.text" @input="input" :styles="styles" :placeholderStyle="placeholderStyle"/>
					</view>
				</uni-forms-item>
			</view>
		</view>
	</uni-forms>
	
	<view class="button">
			<button @click="handleClick" size="default" type="default" 
			style="color:#ffffff;backgroundColor:#52D4A2;" 
			hover-class="is-hover">保存并登录</button>
	</view>
	
</template>

<script setup>
	import {ref,reactive} from 'vue'
	const form = ref(null)
	const styles = reactive({
		borderColor:'black'
	})
	const validRules = {
		name:{
			rules:[
				{
					required:true,
					errorMessage:'此为必填项'
				},
				{
					pattern: /^[\u4e00-\u9fa5]+$/,
					errorMessage:'姓名必须为中文'
				}
			]
		},
		sex:{
			rules:[
				{
					required:true,
					errorMessage:'此为必填项'
				},
				{
					pattern: /^男|女$/,
					errorMessage:'性别必须为男或女'
				}
			]
		},
		hos:{
			rules:[
				{
					required:true,
					errorMessage:'此为必填项'
				},
				{
					pattern: /^[\u4e00-\u9fa5]+$/,
					errorMessage:'医院必须为中文'
				}
			]
		},
		key:{
			rules:[
				{
					required:true,
					errorMessage:'此为必填项'
				},
				{
					format:'number',
					errorMessage:'秘钥必须为中文'
				}
			]
		},
	}
	
	const list = reactive([
		{title:'姓名',text:'请输入姓名',name:'name'},
		{title:'性别',text:'请输入性别',name:'sex'},
		{title:'医院',text:'请输入医院',name:'hos'},
		{title:'秘钥',text:'请输入秘钥',name:'key'},
	])
	
	const inputValues = reactive({
		name:'',
		sex:'',
		key:'',
		hos:'',
	})
	
	
	function handleFocus(){
		
	}
	
	function handleClick(){
		form.value.validate().then(res=>{
				console.log('表单数据信息：', res);
				uni.navigateTo({
					url: '/pages/function_doc/function_doc'
				})
			}).catch(err =>{
				console.log('表单错误信息：', err);
			})

		// const dataToSend = { ...inputValues } // 复制pageData对象，避免直接修改原对象
		// delete dataToSend.items // 删除items属性
		// console.log(dataToSend);
		// uni.navigateTo({
		// 	url: '/pages/function/function'
		// })
	}
	
	
	
</script>

<style lang="scss">
	@import '../../static/scss/common.scss';
	 
	 .title{
		 @include medium
	 }
	 
	 .form-group{
		 margin-top: 50rpx;
		 margin-left: 50rpx;
		 width: 650rpx;
		 font-size: 35rpx;
	 }
	 
	 .button{
		margin-left: 27rpx;
		margin-top: 50rpx;
		width: 700rpx;
		height: 200rpx;
		
	 }
</style>


