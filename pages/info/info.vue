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
		<view class="form-group">
			<uni-forms-item :name="'pw'">
				<text>{{'密码'}}</text>
				<view class="" style="margin-top: 30rpx;">
					<uni-easyinput  @focus="handleFocus" v-model="inputValues['pw']" focus :placeholder="'请输入密码'" @input="input" :styles="styles" :placeholderStyle="placeholderStyle"/>
				</view>
			</uni-forms-item>
		</view>
	</uni-forms>
	
	<view class="form-group">
	    <text>医院名称</text>
		<view class="content">

			<view class="" style="margin-top: 30rpx;">
				<uni-easyinput :styles="inputStyles" style="" v-model="hospitalName" placeholder="请输入医院名称" @focus="focus='hos'"></uni-easyinput>
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
		</view>
	</view>
	
	<view class="form-group">
		<text>医生名称</text>
		<view class="content">
			<view class="" style="margin-top: 30rpx;">
				<uni-easyinput :styles="inputStyles" style="" v-model="doctorName" placeholder="请输入医生名称" @focus="focus='doc'"></uni-easyinput>
			</view>		
			<fuzzysearch
				label-name="name"
				value-name="id"
				align="center"
				no-data="无相关记录"
				:show="show_doc"
				:list="queryParams.list"
				:custom-style="{ fontSize: '30rpx' }"
				@scrolltolower="scrolltolower"
				@select="select"
			></fuzzysearch>
		</view>
	</view>
	
	<view class="button">
			<button @click="handleClick" size="default" type="default" 
			style="color:#ffffff;backgroundColor:#52D4A2;" 
			hover-class="is-hover">保存并获取ID</button>
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
	
	const id = ref('12342553')
	
	const selectClick = ref(false)
	
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
		// {title:'医院ID',text:'请输入就诊医院ID',name:'hospital_id'},
		// {title:'医师ID',text:'请输入看诊医师ID',name:'doctor_id'},
	])
	
	
	const inputValues = reactive({
	  "user_name": "",
	  "hospital_id": "",
	  "user_type": "patient",
	  "doctor_id": "",
	  "age": null,
	  "code":"",
	  "pw":""
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
	
	function handleClick(){
		form.value.validate().then(async (r)=>{
				// const { data: res } = await uni.$http.post('/v1/user',inputValues)
				// console.log(res);
				// console.log('待传输数据信息：', inputValues);
				// searchStoreTemp.setSearchInfo(inputValues)
				// // uni.navigateTo({
				// // 	url: '/pages/function/function'
				// // })	
				uni.showModal({
									title: '请务必记录好您的ID',
									content: id.value,
									confirmText:'复制ID',
									success: function(res) {
									if (res.confirm) {
										uni.setClipboardData({
											data: id.value
										});
										uni.navigateTo({
											url: '/pages/function/function'
										})	
									} else {
										console.log('点击了取消')
									}
								}
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

