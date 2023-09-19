"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "doc_info",
  setup(__props) {
    const form = common_vendor.ref(null);
    const styles = common_vendor.reactive({
      borderColor: "black"
    });
    const validRules = {
      name: {
        rules: [
          {
            required: true,
            errorMessage: "此为必填项"
          },
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            errorMessage: "姓名必须为中文"
          }
        ]
      },
      sex: {
        rules: [
          {
            required: true,
            errorMessage: "此为必填项"
          },
          {
            pattern: /^男|女$/,
            errorMessage: "性别必须为男或女"
          }
        ]
      },
      hos: {
        rules: [
          {
            required: true,
            errorMessage: "此为必填项"
          },
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            errorMessage: "医院必须为中文"
          }
        ]
      },
      key: {
        rules: [
          {
            required: true,
            errorMessage: "此为必填项"
          },
          {
            format: "number",
            errorMessage: "秘钥必须为中文"
          }
        ]
      }
    };
    const list = common_vendor.reactive([
      { title: "姓名", text: "请输入姓名", name: "name" },
      { title: "性别", text: "请输入性别", name: "sex" },
      { title: "医院", text: "请输入医院", name: "hos" },
      { title: "秘钥", text: "请输入秘钥", name: "key" }
    ]);
    const inputValues = common_vendor.reactive({
      name: "",
      sex: "",
      key: "",
      hos: ""
    });
    function handleFocus() {
    }
    function handleClick() {
      form.value.validate().then((res) => {
        console.log("表单数据信息：", res);
        common_vendor.index.navigateTo({
          url: "/pages/function_doc/function_doc"
        });
      }).catch((err) => {
        console.log("表单错误信息：", err);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.o(handleFocus, index),
            c: common_vendor.o(_ctx.input, index),
            d: "6aa4cc94-2-" + i0 + "," + ("6aa4cc94-1-" + i0),
            e: common_vendor.o(($event) => inputValues[item.name] = $event, index),
            f: common_vendor.p({
              focus: true,
              placeholder: item.text,
              styles,
              placeholderStyle: _ctx.placeholderStyle,
              modelValue: inputValues[item.name]
            }),
            g: "6aa4cc94-1-" + i0 + ",6aa4cc94-0",
            h: common_vendor.p({
              name: item.name
            }),
            i: index
          };
        }),
        b: common_vendor.sr(form, "6aa4cc94-0", {
          "k": "form"
        }),
        c: common_vendor.p({
          rules: validRules,
          modelValue: inputValues
        }),
        d: common_vendor.o(handleClick)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni_app playground/pain_detect/pages/doc_info/doc_info.vue"]]);
wx.createPage(MiniProgramPage);
