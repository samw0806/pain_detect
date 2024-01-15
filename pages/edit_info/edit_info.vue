<template>
	<view class="title">
		请输入病患的个人资料
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
	
	<view class="">
			<button @click="handleVas" size="default" type="default" 
			style="color:#ffffff;backgroundColor:#52D4A2;" 
			hover-class="is-hover">查看VAS记录</button>
	</view>
	
	<view class="button">
			<button @click="handleClick" size="default" type="default" 
			style="color:#ffffff;backgroundColor:#52D4A2;" 
			hover-class="is-hover">保存并登录</button>
	</view>
	
</template>

<script setup>
	import {ref,reactive,onMounted} from 'vue'
	import {searchStore} from '@/stores/search.js'
	import { selectStore } from '@/stores/select.js';
	
	const selectStoreTemp = selectStore()
	const searchStoreTemp = searchStore()
	const form = ref(null)
	const styles = reactive({
		borderColor:'black'
	})
	const validRules = {
		// user_name:{
		// 	rules:[
		// 		{
		// 			required:true,
		// 			errorMessage:'此为必填项'
		// 		},
		// 		{
		// 			pattern: /^[\u4e00-\u9fa5]+$/,
		// 			errorMessage:'姓名必须为中文'
		// 		}
		// 	]
		// },
		age:{
			rules:[
				{
					required:true,
					errorMessage:'此为必填项'
				},
				{
					format:'number',
					errorMessage:'年龄必须为数字'
				}
			]
		},
		// hospital_id:{
		// 	rules:[
		// 		{
		// 			required:true,
		// 			errorMessage:'此为必填项'
		// 		},
		// 		{
		// 			format:'number',
		// 			errorMessage:'医院id必须为数字'
		// 		}
		// 	]
		// },
	}
	
	const list = reactive([
		{title:'姓名',text:'请输入病患姓名',name:'user_name'},
		{title:'年龄',text:'请输入病患年龄',name:'age'},
		{title:'备注',text:'请输入病患备注',name:'ps'},
	])
	
	
	const inputValues = reactive({
	  "user_name": "",
	  "hospital_id": "",
	  "user_type": "patient",
	  "doctor_id": "",
	  "age": null,
	  "code":"",
	  "ps":"",
	})
	
	onMounted(()=>{
		inputValues.doctor_id = searchStoreTemp.searchInfo.id
		inputValues.hospital_id = searchStoreTemp.searchInfo.hospital_id
		if(selectStoreTemp.selectData.user_name && selectStoreTemp.selectData.age){
			inputValues.user_name = selectStoreTemp.selectData.user_name
			inputValues.age = selectStoreTemp.selectData.age
		}
		uni.login({
		  provider: 'weixin', //使用微信登录
		  onlyAuthorize:true,
		  success: async function (loginRes) {
		    console.log(`创建用户的code:${loginRes.code}`);
			inputValues.code = loginRes.code
		  },
		  fail() {
		  	console.log(loginRes.authResult);
		  }
		});
	})
	
	function handleFocus(){
		
	}
	
	function handleClick(){
		form.value.validate().then(async (r)=>{
				const { data: res } = await uni.$http.post('/v1/user',inputValues)
				console.log(res);

				selectStoreTemp.setSelectData(inputValues)
				console.log('待传输数据信息：', selectStoreTemp.selectData);
				uni.navigateTo({
					url: '/pages/detection_doc/detection_doc'
				})	
				
				// 	if(res.code === "10000101"){
				// 		console.log(1111);
				// 		uni.showToast({
				// 			title:res.msg,
				// 			icon:'error',
				// 			duration:2000
				// 		})
				// 	}
				// uni.login({
				//   provider: 'weixin', //使用微信登录
				//   onlyAuthorize:true,
				//   success: async function (loginResr) {
				//     console.log(`创建用户的code:${loginResr.code}`);
				// 	searchStoreTemp.setSearchInfo(loginResr.code)
				//   },
				//   fail() {
				//   	console.log(loginResr.authResult);
				//   }
				// });

			}).catch(err =>{
				console.log('表单错误：', err);
			})

		// const dataToSend = { ...inputValues } // 复制pageData对象，避免直接修改原对象
		// delete dataToSend.items // 删除items属性
		// console.log(dataToSend);
		// uni.navigateTo({
		// 	url: '/pages/function/function'
		// })
	}
	function handleVas(){
		uni.navigateTo({
			url:'/pages/chart/chart'
		})
	}
	
	
	
</script>

<style lang="scss">
	@import '../../static/scss/common.scss';
	 
	 .title{
		 @include medium;
		 font-size: 50rpx;
	 }
	 
	 .form-group{
		 margin-top: 50rpx;
		 margin-left: 50rpx;
		 width: 650rpx;
		 font-size: 35rpx;
	 }
	 
	 .button{
		position: fixed;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 700rpx;
		height: 200rpx;
		
	 }
</style>
