"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const state = common_vendor.ref(false);
    function checkboxChange(e) {
      if (state.value == false) {
        state.value = true;
      } else {
        state.value = false;
      }
    }
    function login(url) {
      if (state.value == false) {
        common_vendor.index.showToast({
          title: "请同意相关协议",
          icon: "error",
          duration: 2e3
        });
      } else {
        common_vendor.index.navigateTo({
          url
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: state.value,
        b: common_vendor.o(checkboxChange),
        c: common_vendor.o(($event) => login("/pages/info/info")),
        d: common_vendor.o(($event) => login("/pages/doc_info/doc_info"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni_app playground/pain_detect/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
