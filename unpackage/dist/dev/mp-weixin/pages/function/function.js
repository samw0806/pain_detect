"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_search = require("../../stores/search.js");
const _sfc_main = {
  __name: "function",
  setup(__props) {
    const searchStoreTemp = stores_search.searchStore();
    common_vendor.onMounted(() => {
      user.name = searchStoreTemp.searchInfo.user_name;
      searchStoreTemp.setLogin(true);
    });
    const user = common_vendor.reactive({
      name: ""
    });
    function handleClick(url) {
      common_vendor.index.navigateTo({
        url
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(user.name),
        b: common_vendor.o(($event) => handleClick("/pages/detection/detection")),
        c: common_vendor.o(($event) => handleClick("/pages/communicate/communicate")),
        d: common_vendor.o(($event) => handleClick("/pages/update_info/update_info"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni_app playground/pain_detect/pages/function/function.vue"]]);
wx.createPage(MiniProgramPage);
