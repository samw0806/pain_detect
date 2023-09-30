import { defineStore } from 'pinia';
 
export const searchStore = defineStore('searchStoreTemp', {
	state(){
		return { 
			searchInfo: {
				user_type : ""
			},
			login: false,
			pain_data_path:''
		};
	},
	unistorage: true, // 开启后对 state 的数据读写都将持久化
	actions: {
		setSearchInfo(searchInfo){
			this.searchInfo = searchInfo;
		},
		setLogin(login){
			this.login = login
		},
		setSearchUsertype(user_type){
			this.searchInfo.user_type = user_type
		},
		setPaindatapath(pain_data_path){
			this.pain_data_path = pain_data_path
		},
	},
});