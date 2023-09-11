"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_upload = require("../../stores/upload.js");
const _sfc_main = {
  __name: "result",
  setup(__props) {
    const uploadStoreTemp = stores_upload.uploadStore();
    const image = common_vendor.ref("");
    common_vendor.onMounted(() => {
      image.value = uploadStoreTemp.uploadImage;
    });
    const user = common_vendor.reactive({
      name: "病患1231"
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(user.name),
        b: image.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni_app playground/pain_detect/pages/result/result.vue"]]);
wx.createPage(MiniProgramPage);
