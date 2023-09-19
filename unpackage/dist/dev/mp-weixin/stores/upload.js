"use strict";
const common_vendor = require("../common/vendor.js");
const uploadStore = common_vendor.defineStore("uploadStoreTemp", {
  state() {
    return {
      uploadImage: "",
      uploadImageDoc: ""
    };
  },
  unistorage: true,
  // 开启后对 state 的数据读写都将持久化
  actions: {
    setUploadImage(uploadImage) {
      this.uploadImage = uploadImage;
    },
    setUploadImageDoc(uploadImageDoc) {
      this.uploadImageDoc = uploadImageDoc;
    }
  }
});
exports.uploadStore = uploadStore;
