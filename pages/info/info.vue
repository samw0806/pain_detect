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
	import {ref,reactive,onMounted} from 'vue'
	import {searchStore} from '@/stores/search.js'
	

	
	const searchStoreTemp = searchStore()

	const form = ref(null)
	const styles = reactive({
		borderColor:'black'
	})
	const validRules = {
		user_name:{
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
		doctor_id:{
			rules:[
				{
					required:true,
					errorMessage:'此为必填项'
				},
				{
					format:'number',
					errorMessage:'医生姓名必须为数字'
				}
			]
		},
		hospital_id:{
			rules:[
				{
					required:true,
					errorMessage:'此为必填项'
				},
				{
					format:'number',
					errorMessage:'医院ID必须为数字'
				}
			]
		},
	}
	
	const list = reactive([
		{title:'姓名',text:'请输入姓名',name:'user_name'},
		{title:'年龄',text:'请输入年龄',name:'age'},
		{title:'看诊医师ID',text:'请输入看诊医师ID',name:'doctor_id'},
		{title:'就诊医院ID',text:'请输入就诊医院ID',name:'hospital_id'},
		{title:'微信ID(测试用)',text:'请输入测试微信ID',name:'wechat_id'},
	])
	
	const inputValues = reactive({
	  "user_name": "",
	  "hospital_id": null,
	  "user_type": "",
	  "wechat_id": "",
	  "doctor_id": null,
	  "age": null
	})
	
	onMounted(()=>{
		inputValues.user_name = searchStoreTemp.searchInfo.user_name
		inputValues.hospital_id = searchStoreTemp.searchInfo.hospital_id
		inputValues.user_type = searchStoreTemp.searchInfo.user_type
		inputValues.wechat_id = searchStoreTemp.searchInfo.wechat_id
		inputValues.doctor_id = searchStoreTemp.searchInfo.doctor_id
		inputValues.age = searchStoreTemp.searchInfo.age
	})
	
	
	function handleFocus(){
		
	}
	
	function handleClick(){
		form.value.validate().then(async (r)=>{
				console.log('表单数据信息：', r);
				console.log('待传输数据信息：', inputValues);
				if(searchStoreTemp.login === false){
					const { data: res } = await uni.$http.post('/v1/user',inputValues)
					console.log(res);
					searchStoreTemp.setLogin(true)
					if(res.code === "10000101"){
						console.log(1111);
						uni.showToast({
							title:res.msg,
							icon:'error',
							duration:2000
						})
					}
				}
				else{
					const { data: res } = await uni.$http.put('/v1/user',inputValues)
					console.log(res);
				}
				searchStoreTemp.setSearchInfo(inputValues)

				uni.navigateTo({
					url: '/pages/function/function'
				})
				console.log(searchStoreTemp.searchInfo);
			}).catch(err =>{
				console.log('表单错误信息：', err);
			})
			// const{data:res} = await uni.$http.post('/upload',value.value)
			// if(red.code == 200){
			// 	console.log('请求成功');
			// 	searchStoreTemp.setSearchInfo(res.data)
			// 	uni.navigateTo({
			// 		url:'/pages/function/function'
			// 	})
			// 	console.log(searchStoreTemp.searchInfo);
			// }
			// else{
			// 	uni.showToast({
			// 		title:'请检查网络',
			// 		icon:'error',
			// 		duration:2000
			// 	})
			// }

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

