"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_upload = require("../../stores/upload.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "vas",
  setup(__props) {
    stores_upload.uploadStore();
    common_vendor.ref("");
    const vas_number = common_vendor.ref(5);
    common_vendor.onMounted(() => {
    });
    const user = common_vendor.reactive({
      name: "病患1231"
    });
    function handleNextStep() {
      common_vendor.index.navigateTo({
        url: "/pages/vas/vas"
      });
    }
    function handleSlider(e) {
      vas_number.value = e.detail.value;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(user.name),
        b: common_vendor.t(vas_number.value),
        c: common_vendor.o(handleSlider),
        d: vas_number.value,
        e: common_vendor.p({
          type: "compose",
          size: "15",
          color: "white"
        }),
        f: common_vendor.o(handleNextStep)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni_app playground/pain_detect/pages/vas/vas.vue"]]);
wx.createPage(MiniProgramPage);
