import { defineStore } from 'pinia';
 
export const searchStore = defineStore('searchStoreTemp', {
	state(){
		return { 
			searchInfo: {},
		};
	},
	unistorage: true, // 开启后对 state 的数据读写都将持久化
	actions: {
		setSearchInfo(searchInfo){
			this.searchInfo = searchInfo;
		},

	},
});