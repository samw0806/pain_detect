<template>
	<view class="title">
		<view class="title_1">
			欢迎登录暨南大学
		</view>
		<view class="title_2">
			疼痛分级系统
		</view>
		
		<view class=".protocol">
			<image src="../../static/login.jpg" mode=""></image>
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
			uni.navigateTo({
			    url: url
			});
		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/common.scss";
	
	
	.title{
		
	}
	
	.title_1{
		font-size: 25px;
		text-align: center;//针对行内元素
	}
	
	.title_2{
		font-size: 17px;
		text-align: center;//针对行内元素
		margin: 10px;
	}
	
	image{
		width: 200px;
		height: 150px;
		margin-top: 200rpx;
	}
	
	.protocol{
		@include medium;
		margin-top: 100rpx;
	}
	
	
	.protocol_text{
		font-size: 10px;
		font-weight: 400;
	}
	
	.wx-radio-input {
	  width: 24rpx !important;
	  height: 24rpx !important;
	}
	
	.radio{
		margin-top: -10rpx;
	}
	
	.button{
		@include medium();
	}
	
	.button_left{
		@include medium();
		border: #52D4A2 solid 1px;
		border-radius: 5%;
		color: #52D4A2;
		font-size: 40rpx;
		height: 112rpx;
		width: 350rpx;
		margin-top: 50rpx;
		margin-right: 20rpx
	}
	
	.button_right{
		@include medium();
		border: #52D4A2 solid 1px;
		background-color: #52D4A2;
		border-radius: 5%;
		color: white;
		font-size: 40rpx;
		height: 112rpx;
		width: 350rpx;
		margin-top: 50rpx;
	}
</style>
