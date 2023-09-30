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
  __name: "detection_doc",
  setup(__props) {
    const uploadStoreTemp = stores_upload.uploadStore();
    const searchStoreTemp = stores_search.searchStore();
    const upload = common_vendor.ref(false);
    const user = common_vendor.reactive({
      name: ""
    });
    common_vendor.onMounted(() => {
      user.name = searchStoreTemp.searchInfo.user_name;
    });
    function handleUpload() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album"],
        //这要注意，camera掉拍照，album是打开手机相册
        success: (res) => {
          console.log(res);
          uploadStoreTemp.setUploadImageDoc(res.tempFilePaths);
          upload.value = true;
        },
        fail: (err) => {
          console.log(err);
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
        common_vendor.index.uploadFile({
          url: "http://43.139.26.201:25800/v1/storage",
          filePath: uploadStoreTemp.uploadImageDoc[0],
          name: "pain_data",
          formData: {
            "patient_id": 123456
          },
          success: (res) => {
            console.log(JSON.parse(res.data).data.path);
            searchStoreTemp.setPaindatapath(JSON.parse(res.data).data.path);
          }
        });
        console.log(uploadStoreTemp.uploadImageDoc[0]);
        common_vendor.index.navigateTo({
          url: "/pages/edit_info/edit_info"
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
