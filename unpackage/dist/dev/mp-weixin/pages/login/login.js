"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_search = require("../../stores/search.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const searchStoreTemp = stores_search.searchStore();
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
        if (url == "/pages/info/info") {
          common_vendor.index.navigateTo({
            url: "/pages/lg_rg/lg_rg"
          });
        } else {
          common_vendor.index.login({
            provider: "weixin",
            //使用微信登录
            onlyAuthorize: true,
            success: async function(loginRes2) {
              console.log(loginRes2);
              const { data: res } = await common_vendor.index.$http.get(`/v1/login?code=${loginRes2.code}`);
              console.log(res);
              if (Object.keys(res.data).length === 0) {
                common_vendor.index.navigateTo({
                  url
                });
              } else {
                searchStoreTemp.setSearchInfo(res.data);
                common_vendor.index.navigateTo({
                  url: "/pages/function_doc/function_doc"
                });
              }
            },
            fail() {
              console.log(loginRes.authResult);
            }
          });
        }
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
