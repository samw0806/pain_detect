"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_upload = require("../../stores/upload.js");
const stores_search = require("../../stores/search.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "result",
  setup(__props) {
    const searchStoreTemp = stores_search.searchStore();
    const uploadStoreTemp = stores_upload.uploadStore();
    const image = common_vendor.ref("");
    const user = common_vendor.reactive({
      name: ""
    });
    common_vendor.onMounted(() => {
      common_vendor.index.showLoading({
        title: "图片加载中",
        mask: true
      });
      setTimeout(function() {
        common_vendor.index.hideLoading();
      }, 2e3);
      user.name = searchStoreTemp.searchInfo.user_name;
      image.value = uploadStoreTemp.uploadImage;
      console.log(image.value);
    });
    function handleBack() {
      common_vendor.index.navigateBack();
    }
    function handleNextStep() {
      common_vendor.index.navigateTo({
        url: "/pages/vas/vas"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(user.name),
        b: image.value == "" ? true : false,
        c: image.value,
        d: common_vendor.p({
          type: "refresh-filled",
          size: "20",
          color: "#339EE6"
        }),
        e: common_vendor.o(handleBack),
        f: common_vendor.p({
          type: "forward",
          size: "15",
          color: "white"
        }),
        g: common_vendor.o(handleNextStep)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni_app playground/pain_detect/pages/result/result.vue"]]);
wx.createPage(MiniProgramPage);
