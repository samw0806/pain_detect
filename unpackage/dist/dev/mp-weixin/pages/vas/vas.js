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
  __name: "vas",
  setup(__props) {
    stores_upload.uploadStore();
    const searchStoreTemp = stores_search.searchStore();
    common_vendor.ref("");
    const src = common_vendor.ref("");
    const user = common_vendor.reactive({
      name: ""
    });
    common_vendor.onMounted(() => {
      user.name = searchStoreTemp.searchInfo.user_name;
      info.pain_data_path = searchStoreTemp.pain_data_path;
      info.patient_id = searchStoreTemp.searchInfo.id;
    });
    const info = common_vendor.reactive({
      "patient_id": 666,
      "pain_level_custom": 5,
      "pain_data_path": "string"
    });
    async function handleNextStep() {
      console.log(info);
      const { data: res } = await common_vendor.index.$http.post("/v1/pain", info);
      console.log(res.data.covert_image);
      src.value = `data:image/png;base64,${res.data.convert_image}`;
      src.value = src.value.replace(/[\r\n]/g, "");
      common_vendor.index.showToast({
        title: "上传成功",
        icon: "success",
        duration: 1500
      });
    }
    function handleSlider(e) {
      info.pain_level_custom = e.detail.value;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(user.name),
        b: common_vendor.t(info.pain_level_custom),
        c: common_vendor.o(handleSlider),
        d: info.pain_level_custom,
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
