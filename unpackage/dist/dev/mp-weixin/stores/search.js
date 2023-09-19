"use strict";
const common_vendor = require("../common/vendor.js");
const searchStore = common_vendor.defineStore("searchStoreTemp", {
  state() {
    return {
      searchInfo: {}
    };
  },
  unistorage: true,
  // 开启后对 state 的数据读写都将持久化
  actions: {
    setSearchInfo(searchInfo) {
      this.searchInfo = searchInfo;
    }
  }
});
exports.searchStore = searchStore;
