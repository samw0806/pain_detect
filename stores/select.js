import { defineStore } from 'pinia';
 
export const selectStore = defineStore('selectStoreTemp', {
	state(){
		return { 
			selectData:{}
		};
	},
	unistorage: true, // 开启后对 state 的数据读写都将持久化
	actions: {
		setSelectData(selectData){
			this.selectData = selectData;
		},
	},
});