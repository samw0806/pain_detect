"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_upload = require("../../stores/upload.js");
const stores_select = require("../../stores/select.js");
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
    const selectStoreTemp = stores_select.selectStore();
    const upload = common_vendor.ref(false);
    const img = common_vendor.ref("../../static/upload.jpg");
    const searchStoreTemp = stores_search.searchStore();
    common_vendor.onMounted(() => {
      user.name = searchStoreTemp.searchInfo.user_name;
    });
    const user = common_vendor.reactive({
      name: ""
    });
    function handleUpload() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album"],
        //这要注意，camera掉拍照，album是打开手机相册
        success: async (res) => {
          common_vendor.index.showToast({
            title: "上传中...",
            icon: "loading",
            duration: 2e3
          });
          img.value = "../../static/right.jpg";
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
        common_vendor.index.uploadFile({
          url: "http://43.139.26.201:25800/v1/storage",
          filePath: uploadStoreTemp.uploadImage[0],
          name: "pain_data",
          formData: {
            "patient_id": selectStoreTemp.selectData.id
          },
          success: (res) => {
            console.log(`被上传的用户信息${selectStoreTemp.selectData}`);
            console.log(JSON.parse(res.data).data.path);
            searchStoreTemp.setPaindatapath(JSON.parse(res.data).data.path);
            console.log(res.data);
          }
        });
        console.log(uploadStoreTemp.uploadImage[0]);
        common_vendor.index.navigateTo({
          url: "/pages/result/result"
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(user.name),
        b: common_vendor.o(handleUpload),
        c: img.value,
        d: common_vendor.o(handleUpload),
        e: common_vendor.o((...args) => _ctx.handleCamera && _ctx.handleCamera(...args)),
        f: common_vendor.p({
          type: "forward",
          size: "15",
          color: "white"
        }),
        g: common_vendor.o(handleProcess)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni_app playground/pain_detect/pages/detection_doc/detection_doc.vue"]]);
wx.createPage(MiniProgramPage);
