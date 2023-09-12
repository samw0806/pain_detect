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
  __name: "detection_doc",
  setup(__props) {
    const uploadStoreTemp = stores_upload.uploadStore();
    const upload = common_vendor.ref(false);
    const user = common_vendor.reactive({
      name: "病患1231"
    });
    function handleUpload() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album"],
        //这要注意，camera掉拍照，album是打开手机相册
        success: (res) => {
          console.log(res);
          uploadStoreTemp.setUploadImage(res.tempFilePaths);
          upload.value = true;
        }
      });
    }
    function handleProcess() {
      if (upload.value == false) {
        common_vendor.index.showToast({
          title: "请先上传图片",
          icon: "error",
          duration: 2e3
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/result_doc/result_doc"
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(user.name),
        b: common_vendor.o(handleUpload),
        c: common_vendor.o(handleUpload),
        d: common_vendor.o((...args) => _ctx.handleCamera && _ctx.handleCamera(...args)),
        e: common_vendor.p({
          type: "forward",
          size: "15",
          color: "white"
        }),
        f: common_vendor.o(handleProcess)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni_app playground/pain_detect/pages/detection_doc/detection_doc.vue"]]);
wx.createPage(MiniProgramPage);
