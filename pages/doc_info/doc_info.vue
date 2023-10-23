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
		{title:'姓名',text:'请输入姓名',name:'user_name'},
		{title:'年龄',text:'请输入年龄',name:'age'},
		{title:'医院ID',text:'请输入医院ID',name:'hospital_id'},
		{title:'秘钥',text:'请输入秘钥',name:'doctor_id'},
	])
	
	
	const inputValues = reactive({
	  "user_name": "",
	  "hospital_id": "",
	  "user_type": "doctor",
	  "doctor_id": "",
	  "age": null,
	  "code":""
	})
	
	onMounted(()=>{
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
				console.log('待传输数据信息：', inputValues);
				searchStoreTemp.searchInfo(inputValues)
				uni.navigateTo({
					url: '/pages/function_doc/function_doc'
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


