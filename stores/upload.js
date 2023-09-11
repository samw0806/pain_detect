// stores/user.js
import { defineStore } from 'pinia';
 
export const uploadStore = defineStore('uploadStoreTemp', {
	state(){
		return { 
			uploadImage: '',
		};
	},
	unistorage: true, // 开启后对 state 的数据读写都将持久化
	actions: {
		setUploadImage(uploadImage){
			this.uploadImage = uploadImage;
		},

	},
});