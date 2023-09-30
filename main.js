
// #ifndef VUE3
import Vue from 'vue'
import App from './App'


//网络请求
import { $http } from '@escook/request-miniprogram'
uni.$http = $http

//请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中~'
	})
}
//响应拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'

//状态存储管理
import * as Pinia from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'

//网络请求管理
import { $http } from '@escook/request-miniprogram'
//从网络请求包中引入$http请求对象
uni.$http = $http
//配置请求根路径
$http.baseUrl = 'http://43.139.26.201:25800'

//请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...'
	})
	// if(options.url === '/login'){
	// 	return options
	// }
	// if(!uni.getStorageSync('token')){
	// 	uni.redirectTo({
	// 		url:'/pages/login/login'
	// 	})
	// 	return false
	// }
	
}

//响应拦截器
$http.afterRequest = function (){
	uni.hideLoading()
}



export function createApp() {
  const app = createSSRApp(App)
  const store = Pinia.createPinia()
  app.use(store)
  return {
    app,
	Pinia
  }
}
// #endif