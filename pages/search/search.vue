<template>
	<view class="title">
		病患记录搜索
	</view>
	<view class="test">
			<view style="text-align: center;">选中值：{{ selectData }}</view>
			<view class="content">
				<input class="input" type="text" :value="value" placeholder="请输入内容" @input="input" />
				<fuzzysearch
					label-name="name"
					value-name="id"
					align="center"
					no-data="无相关记录"
					:show="show"
					:list="queryParams.list"
					:custom-style="{ fontSize: '30rpx' }"
					@scrolltolower="scrolltolower"
					@select="select"
				></fuzzysearch>
				<button @click="handleNext" class="button" size="default" type="default"
					style="" 
					hover-class="is-hover">新建病患档案<uni-icons type="personadd" size="20" color="white" style="margin-left: 20rpx;"></uni-icons></button>
			</view>

	</view>
	
</template>

<script setup>
	import fuzzysearch from '@/components/fuzzy_search.vue'
	import debounce from '@/common/js/debounce.js'; //防抖函数
	import { httpGetList } from '@/common/js/api.js';
	import { reactive, ref } from "vue";
	
	const value = ref('')
	const show = ref(false)
	const selectData = ref(null)
	const queryParams = reactive({
		pageSize:10,
		pageNum:1,
		list:[]
	})
	
	
	function handleNext(){
		uni.navigateTo({
			url:'/pages/detection_doc/detection_doc'
		})
	}
	
	function input(event){
		value.value = event.target.value
		queryParams.pageNum = 1
		debounce(getList(),500)
	}
	
	function scrolltolower() {
			queryParams.pageNum++;
			getList();
		}
	
	function getList() {
			/** 输入框内有值就进行搜索，没有值就关闭 */
			if (value.value) {
				httpGetList({ ...queryParams, keyword: value.value }).then(resp => {
					if (resp.code === 200) {
						console.log(resp.data);
						queryParams.list = resp.data;
						if (!show.value) show.value = true;
					}
				});
			} else {
				show.value = false;
			}
		}
	
	function select(event) {
			show.value = false;
			value.value = event.name;
			selectData.value = JSON.stringify(event);
		}
	
	
</script>

<style lang="scss" scoped>
.title{
	text-align: center;
}
.test {
	width: 100vw;
	min-height: 100vh;
	height: 100%;
	padding-top: 200rpx;
}
.content {
	width: 600rpx;
	margin: 0 auto;
	position: relative;

	.input {
		padding: 25rpx;
		background-color: #f5f5f5;
		border: black solid 6rpx;
		border-radius: 20rpx;
	}
	.button {
		border-radius: 23rpx;
		color:#ffffff;
		background-color:#52D4A2;
		margin-top: 580rpx;
		font-size: 40rpx;
	}
}
</style>
