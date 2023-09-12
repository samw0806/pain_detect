"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = {
  __name: "doc_info",
  setup(__props) {
    const styles = common_vendor.reactive({
      borderColor: "black"
    });
    const list = common_vendor.reactive([
      { title: "姓名", text: "请输入姓名" },
      { title: "性别", text: "请输入性别" },
      { title: "医院", text: "请输入医院" },
      { title: "秘钥", text: "请输入秘钥" }
    ]);
    const value = common_vendor.ref("");
    function handleFocus() {
    }
    function handleClick() {
      common_vendor.index.navigateTo({
        url: "/pages/function_doc/function_doc"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.o(handleFocus, index),
            c: common_vendor.o(_ctx.input, index),
            d: "6aa4cc94-0-" + i0,
            e: common_vendor.o(($event) => value.value = $event, index),
            f: common_vendor.p({
              focus: true,
              placeholder: item.text,
              styles,
              placeholderStyle: _ctx.placeholderStyle,
              modelValue: value.value
            }),
            g: index
          };
        }),
        b: common_vendor.o(handleClick)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni_app playground/pain_detect/pages/doc_info/doc_info.vue"]]);
wx.createPage(MiniProgramPage);
