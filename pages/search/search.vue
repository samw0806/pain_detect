<template>
	<view class="title">
		病患记录搜索
	</view>
	<view class="test">
			<view style="text-align: center;">选中值：{{ selectData }}</view>
			<view class="content">
				<view class="" style="">
					<uni-easyinput :styles="inputStyles" style=""  suffixIcon="search" v-model="value" placeholder="请输入病患名称" @iconClick="iconClick"></uni-easyinput>
				</view>		
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
	// import { httpGetList } from '@/common/js/api.js';
	import { reactive , ref , watch , onMounted } from "vue";
	import {searchStore} from '@/stores/search.js'
	import { uploadStore } from '../../stores/upload';
	import {selectStore} from '../../stores/select.js'
	
	const selectStoreTemp = selectStore()
	const searchStoreTemp = searchStore()
	
	//生成随机数--模糊搜索模块
	const getRandomNumber = () => Math.random().toString(16).slice(2);
	
	const inputStyles = {
		borderColor:"black",
	}
	const value = ref('')
	const show = ref(false)
	const selectData = ref(null)
	const queryParams = reactive({
		pageSize:10,
		pageNum:1,
		list:[]
	})
	const universityList = ref([])
	
	watch(() => value.value, (newVal)=>{
		queryParams.pageNum = 1
		debounce(getList(),500)
	})
	
	onMounted(async()=>{
		//测试用
		const { data: res } = await uni.$http.get(`/v1/user/patient?doctor_id=${searchStoreTemp.searchInfo.doctor_id}`)
		//实际
		// const { data: res } = await uni.$http.get(`/v1/user/patient?doctor_id=${searchStoreTemp.searchInfo.id}`)
		universityList.value = res.data
		console.log(11);
		console.log(res.data);
	})
	
	function handleNext(){
		if(Object.keys(selectStoreTemp.selectData).length !== 0){
			selectStoreTemp.setSelectData({})
		}
		uni.navigateTo({
			url:'/pages/edit_info/edit_info'
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
			selectData.value = JSON.stringify(event.name);

		}
	
	async function iconClick(){
		// selectStoreTemp.setSelectData(universityList.value.find(obj => obj.name === value.value))
		// console.log("选择的数据");
		// console.log(selectStoreTemp.selectData);
		const{data:res} = await uni.$http.get(`/v1/user?user_id=${universityList.value.find(obj => obj.name === value.value).id}`)
		if(res.code == 0){
			console.log('请求成功');
			selectStoreTemp.setSelectData(res.data)
			uni.navigateTo({
				url:'/pages/edit_info/edit_info'
			})
			console.log(selectStoreTemp.selectData);
		}
		else{
			console.log(res);
			uni.showToast({
				title:'请检查网络',
				icon:'error',
				duration:2000
			})
		}
	}
	
	function httpGetList(params) {
		const {
			pageNum,
			pageSize,
			keyword
		} = params
		return new Promise((resovle) => {
			let data = []
			let uList = universityList.value
			for (let i = 0; i < pageNum; i++) {
				let list = universityList.value.map(item => ({
					name: item.name,
					id: getRandomNumber()
				}))
				data = [...data, ...list]
			}
			data = data.filter(item => item.name.includes(keyword))
			resovle({
				code: 200,
				msg: 'success',
				data
			})
		})
	}
	
	
</script>

<style lang="scss" scoped>
.title{
	text-align: center;
	font-size: 50rpx;
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

}
.button {
		width: 600rpx;
		border-radius: 23rpx;
		color:#ffffff;
		background-color:#52D4A2;
		position: fixed;
		bottom: 100rpx;
		left: 50%;
		transform: translateX(-50%);
		font-size: 40rpx;
	}
</style>
