<template>
	<view class="title">
		<view class="title_1">
			欢迎登录暨南大学
		</view>
		<view class="title_2">
			疼痛分级系统
		</view>
		
		<view class="pic">
			<image src="../../static/logo.jpg" mode=""></image>
		</view>
		
		
		<view class="protocol">
			<checkbox-group @change="checkboxChange">
				<label>
					<checkbox :checked="state" />
				</label>
			</checkbox-group>
			<text class="protocol_text">
				我已阅读并同意相关
			</text>
			<navigator url="/pages/protocol/protocol" style="display: inline;color: #62B0CE;" class="protocol_text">《隐私协议》</navigator>
			<text class="protocol_text">
				和
			</text>
			<navigator url="/pages/protocol/protocol" style="display: inline;color: #62B0CE;" class="protocol_text">《用户协议》</navigator>
		</view>
		
		<view class="button">
			<view class="button_left" @click="login('/pages/info/info')">
				患者入口
			</view>
			<view class="button_right" @click="login('/pages/doc_info/doc_info')">
				医护人员入口
			</view>
		</view>
		
	</view>
</template>

<script setup>
	import { ref } from 'vue'  
	import {searchStore} from '@/stores/search.js'
	
	
	const searchStoreTemp = searchStore()
	const state = ref(false)
	
	function checkboxChange(e){
		if(state.value == false){
			state.value = true
		}
		else{
			state.value = false
		}
	}
	
	function login(url){
		if(state.value == false){
			uni.showToast({
				title:'请同意相关协议',
				icon:'error',
				duration:2000
			})
		}
		else{
			if(url == '/pages/info/info'){
				// uni.login({
				//   provider: 'weixin', //使用微信登录
				//   onlyAuthorize:true,
				//   success: async function (loginRes) {
				//     console.log(loginRes);
				// 	const { data: res } = await uni.$http.get(`/v1/login?code=${loginRes.code}`)
				// 	console.log(res);
				// 	if(Object.keys(res.data).length === 0){
				// 		uni.navigateTo({
				// 		    url: url
				// 		});
				// 	}
				// 	else{
				// 		searchStoreTemp.setSearchInfo(res.data)
				// 		uni.navigateTo({
				// 		    url: '/pages/function/function'
				// 		});
				// 	}
					

				//   },
				//   fail() {
				//   	console.log(loginRes.authResult);
				//   }
				// });
				//仅供测试
				searchStoreTemp.setSearchInfo({
					"user_name": "patient B",
					"hospital_id": "cf3fc395-6d58-402b-9487-1e828932a9f2",
					"age": 50,
					"user_type": "patient",
					"doctor_id": "63d5e66a-0280-4923-9530-f331bf8eb065",
					"id": "1a921bcb-7fce-49ba-8050-9ab0e85b6096",
					"doctor_name": "doctor A",
					"hospital_name": "new hospital"
				})
				uni.navigateTo({
					url: '/pages/function/function'
				});
				// uni.navigateTo({
				// 	url:'/pages/info/info'
				// })
			}
			else{
				uni.login({
				  provider: 'weixin', //使用微信登录
				  onlyAuthorize:true,
				  success: async function (loginRes) {
				    console.log(loginRes);
					const { data: res } = await uni.$http.get(`/v1/login?code=${loginRes.code}`)
					console.log(res);
					if(Object.keys(res.data).length === 0){
						uni.navigateTo({
						    url: url
						});
					}
					else{
						searchStoreTemp.setSearchInfo(res.data)
						uni.navigateTo({
						    url: '/pages/function_doc/function_doc'
						});
					}
				  },
				  fail() {
				  	console.log(loginRes.authResult);
				  }
				});
			}
			// uni.navigateTo({
			//     url: url
			// });
		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/common.scss";
	
	
	.title{
		
	}
	
	.title_1{
		font-size: 35px;
		text-align: center;//针对行内元素
	}
	
	.title_2{
		font-size: 25px;
		text-align: center;//针对行内元素
		margin: 10px;
	}
	
	image{
		width: 280px;
		height: 190px;
		margin-top: 200rpx;
	}
	
	.protocol{
		@include medium;
		position: fixed;
		bottom: 260rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 500rpx;
	}
	
	.pic{
		@include medium;
		margin-top: 100rpx;
	}
	
	
	.protocol_text{
		font-size: 10px;
		font-weight: 400;
	}
	
	.wx-radio-input {
	  width: 15rpx !important;
	  height: 15rpx !important;
	}
	
	.radio{
		margin-top: -10rpx;
	}
	
	.button{
		@include medium();
		position: fixed;
		bottom: 120rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	
	.button_left{
		@include medium();
		border: $primary solid 1px;
		border-radius: 10rpx;
		color: $primary;
		font-size: 40rpx;
		height: 112rpx;
		width: 350rpx;
		margin-top: 50rpx;
		margin-right: 20rpx
	}
	
	.button_right{
		@include medium();
		background-color: $primary;
		border-radius: 10rpx;
		color: white;
		font-size: 40rpx;
		height: 112rpx;
		width: 350rpx;
		margin-top: 50rpx;
	}
</style>
