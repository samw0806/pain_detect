<template>
	<view class="title">
		登录疼痛系统
	</view>
	
	<uni-forms :rules="validRules" :modelValue="inputValues" ref="form">

			<view class="form-group" style="margin-top: 300rpx;">
				<uni-forms-item :name="'id'">
					<text>{{'ID'}}</text>
					<view class="" style="margin-top: 30rpx;">
						<uni-easyinput  @focus="handleFocus" v-model="inputValues['id']" focus :placeholder="'请输入ID'" @input="input" :styles="styles" :placeholderStyle="placeholderStyle"/>
					</view>
				</uni-forms-item>
				<uni-forms-item :name="'pw'">
					<text>{{'密码'}}</text>
					<view class="" style="margin-top: 30rpx;">
						<uni-easyinput type="password"  @focus="handleFocus" v-model="inputValues['pw']" focus :placeholder="'请输入密码'" @input="input" :styles="styles" :placeholderStyle="placeholderStyle"/>
					</view>
				</uni-forms-item>
			</view>

	</uni-forms>
	
	<view style="margin-top: 50rpx;display: flex;justify-content: center;  ">
			<view @click="handleRg" 
			style="color:#52D4A2;font-weight: 300;" 
			>点击此处注册</view>
	</view>
	
	<view class="button">
			<button @click="handleClick" size="default" type="default" 
			style="color:#ffffff;backgroundColor:#52D4A2;" 
			hover-class="is-hover">登录</button>
	</view>
	
</template>

<script setup>
	import {ref,reactive,onMounted,watch} from 'vue'
	import {searchStore} from '@/stores/search.js'
	import debounce from '@/common/js/debounce.js'; 
	import fuzzysearch from '@/components/fuzzy_search.vue'
	
	const searchStoreTemp = searchStore()
	//模糊搜索模块
	const hospitalName = ref("")
	const doctorName = ref("")
	const getRandomNumber = () => Math.random().toString(16).slice(2);
	const inputStyles = {
		borderColor:"black",
	}
	const show = ref(false)
	const show_doc = ref(false)
	const selectData = ref(null)
	const focus = ref("")
	
	const selectId = ref("")
	const queryParams = reactive({
		pageSize:10,
		pageNum:1,
		list:[],
	})
	const queryParams_doc = reactive({
		pageSize:10,
		pageNum:1,
		list:[],
	})
	const hospitalList = ref([])
	const doctorList = ref([])
	watch(() => hospitalName.value, (newVal)=>{
		if(selectClick.value === true){

				selectClick.value = false

		}
		else{
			queryParams.pageNum = 1
			debounce(getList(),500)
		}

	})
	watch(() => doctorName.value, (newVal)=>{
		if(selectClick.value === true){

				selectClick.value = false

		}
		else{
			queryParams.pageNum = 1
			debounce(getList(),500)
		}
	})
	

	
	const selectClick = ref(false)
	
	const form = ref(null)
	const styles = reactive({
		borderColor:'black'
	})

	
	
	const inputValues = reactive({
	  "id": "",
	  "pw": "",
	})
	
	onMounted(async()=>{
		// uni.login({
		//   provider: 'weixin', //使用微信登录
		//   onlyAuthorize:true,
		//   success: async function (loginRes) {
		//     console.log(`创建用户的code:${loginRes.code}`);
		// 	inputValues.code = loginRes.code
		//   },
		//   fail() {
		//   	console.log(loginRes.authResult);
		//   }
		// });
		// const { data: re } = await uni.$http.get('/v1/hospital')
		// if(re.code === "0"){
		// 	hospitalList.value = re.data
		// }
		// else{
		// 	uni.showToast({
		// 		title:"发生错误",
		// 		icon:"error",
		// 		duration:1000
		// 	})
		// }
	})
	
	function scrolltolower() {
			queryParams.pageNum++;
			getList();
		}
	function getList() {

		if(focus.value === 'hos'){
			/** 输入框内有值就进行搜索，没有值就关闭 */
			if (hospitalName.value) {
				httpGetList({ ...queryParams, keyword: hospitalName.value }).then(resp => {
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
		else{
			if (doctorName.value) {
				httpGetList({ ...queryParams, keyword: doctorName.value }).then(resp => {
					if (resp.code === 200) {
						console.log(resp.data);
						queryParams.list = resp.data;
						if (!show_doc.value) show_doc.value = true;
					}
				});
			} else {
				show_doc.value = false;
			}
		}
		}
		
	// function getList_doc() {
	// 		/** 输入框内有值就进行搜索，没有值就关闭 */
	// 		if (hospitalName.value) {
	// 			httpGetList({ ...queryParams, keyword: hospitalName.value }).then(resp => {
	// 				if (resp.code === 200) {
	// 					console.log(resp.data);
	// 					queryParams.list = resp.data;
	// 					if (!show.value) show.value = true;
	// 					console.log(show.value);
	// 				}
	// 			});
	// 		} else {
	// 			show.value = false;
	// 		}
	// 	}
	
	async function select(event) {
			const { data: res } = await uni.$http.get(`/v1/user/doctor?hospital_id=${event.id}`)
			show.value = false;
			show_doc.value = false;
			selectClick.value = true;
			if(focus.value === 'hos'){
				hospitalName.value = event.name;
				selectData.value = JSON.stringify(event.name);
				inputValues.hospital_id = event.id
				console.log(event);


				if(res.code == "0"){

					doctorList.value = res.data
					
					console.log(`被选中医院下医生名单信息${doctorList.value}`);
				}
				else{
							
					uni.showToast({
						title:"网络错误",
						icon:"error",
						duration:1000
					})
				}
			}
			else{
				// 							console.log(32);
				doctorName.value = event.name;
				selectData.value = JSON.stringify(event.name);
				inputValues.doctor_id = event.id
				console.log(`doc的event:${event}`);
				console.log(inputValues);
			}
				console.log("show");
				console.log(show.value);
		}
	function httpGetList(params) {
		const {
			pageNum,
			pageSize,
			keyword
		} = params
		return new Promise((resovle) => {
			let data = []		
			for (let i = 0; i < pageNum; i++) {
				if(focus.value === 'hos'){
					let list = hospitalList.value.map(item => ({
						name: item.name,
						id: item.id
					}))
				data = [...list]
				}
				else{
					let list = doctorList.value.map(item => ({
						name: item.user_name,
						id: item.id
						
					}))
				data = [...list]
				
				}



			}
			if(focus.value === 'hos'){
				data = data.filter(item => item.name.includes(keyword))

			}
			else{

				data = data.filter(item => item.name.includes(keyword))

			}
			resovle({
				code: 200,
				msg: 'success',
				data
			})
		})
	}
	
	function handleRg(){
		uni.navigateTo({
			url:'/pages/info/info'
		})
	}
	
	function handleClick(){
		form.value.validate().then(async (r)=>{
				const { data: res } = await uni.$http.post('/v1/user',inputValues)
				console.log(res);
				console.log('待传输数据信息：', inputValues);
				searchStoreTemp.setSearchInfo(inputValues)
				uni.navigateTo({
					url: '/pages/function/function'
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
		 font-size: 27rpx;
	 }
	 
	 .button{
		position: fixed;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 700rpx;
		height: 200rpx;
		
	 }
	 
	 .content {

	 	margin: 0 auto;
	 	position: relative;
	 
	 }
</style>
