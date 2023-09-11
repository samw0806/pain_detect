
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
import * as Pinia from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'
import App from './App.vue'
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