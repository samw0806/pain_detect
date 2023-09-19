<template>
	<view class="title">
		个人资料
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
			<button @click="handleVas" size="default" type="default" 
			style="color:#ffffff;backgroundColor:#52D4A2;" 
			hover-class="is-hover">查看VAS记录</button>
	</view>
	<view class="button">
			<button @click="handleClick" size="default" type="default" 
			style="color:#ffffff;backgroundColor:#52D4A2;" 
			hover-class="is-hover">保存</button>
	</view>
	
</template>

<script setup>
	import {ref,reactive,onMounted} from 'vue'
	import {searchStore} from '@/stores/search.js'
	const searchStoreTemp = searchStore()
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
		age:{
			rules:[
				{
					required:true,
					errorMessage:'此为必填项'
				},
				{
					format:'number',
					errorMessage:'年龄必须为数字'
				},
			]
		},
		doc:{
			rules:[
				{
					required:true,
					errorMessage:'此为必填项'
				},
				{
					pattern: /^[\u4e00-\u9fa5]+$/,
					errorMessage:'医生姓名必须为中文'
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
	}
	
	const list = reactive([
		{title:'姓名',text:'请输入姓名',name:'name'},
		{title:'性别',text:'请输入性别',name:'sex'},
		{title:'年龄',text:'请输入年龄',name:'age'},
		{title:'看诊医师',text:'请输入看诊医师',name:'doc'},
		{title:'就诊医院',text:'请输入就诊医院',name:'hos'},
	])
	
	const inputValues = reactive({
		name:'',
		sex:'',
		age:'',
		doc:'',
		hos:'',
	})
	
	onMounted(()=>{
		inputValues.name = searchStoreTemp.searchInfo.name
		inputValues.age = searchStoreTemp.searchInfo.age
		inputValues.sex = searchStoreTemp.searchInfo.sex
		inputValues.doc = searchStoreTemp.searchInfo.doc
		inputValues.hos = searchStoreTemp.searchInfo.hos
	})
	
	function handleVas(){
		uni.navigateTo({
			url:'/pages/chart/chart'
		})
	}
	
	function handleClick(){
		form.value.validate().then(res=>{
				console.log('表单数据信息：', res);
				uni.navigateTo({
					url: '/pages/function/function'
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
