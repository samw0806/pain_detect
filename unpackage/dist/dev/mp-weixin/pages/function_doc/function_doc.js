"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_search = require("../../stores/search.js");
const _sfc_main = {
  __name: "function_doc",
  setup(__props) {
    const searchStoreTemp = stores_search.searchStore();
    const user = common_vendor.reactive({
      name: ""
    });
    common_vendor.onMounted(() => {
      user.name = searchStoreTemp.searchInfo.user_name;
      searchStoreTemp.setLogin(true);
    });
    function handleClick(url) {
      common_vendor.index.navigateTo({
        url
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(user.name),
        b: common_vendor.o(($event) => handleClick("/pages/search/search")),
        c: common_vendor.o(($event) => handleClick("/pages/communicate_doc/communicate_doc")),
        d: common_vendor.o(($event) => handleClick("/pages/update_info/update_info"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni_app playground/pain_detect/pages/function_doc/function_doc.vue"]]);
wx.createPage(MiniProgramPage);
