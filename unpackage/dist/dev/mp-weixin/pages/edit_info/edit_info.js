"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_search = require("../../stores/search.js");
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
  __name: "edit_info",
  setup(__props) {
    stores_search.searchStore();
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
      age: {
        rules: [
          {
            required: true,
            errorMessage: "此为必填项"
          },
          {
            format: "number",
            errorMessage: "年龄必须为数字"
          }
        ]
      },
      doc: {
        rules: [
          {
            required: true,
            errorMessage: "此为必填项"
          },
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            errorMessage: "医生姓名必须为中文"
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
      }
    };
    const list = common_vendor.reactive([
      { title: "姓名", text: "请输入姓名", name: "user_name" },
      { title: "年龄", text: "请输入年龄", name: "age" },
      { title: "看诊医师ID", text: "请输入看诊医师ID", name: "doctor_id" },
      { title: "就诊医院ID", text: "请输入就诊医院ID", name: "hospital_id" },
      { title: "微信ID(测试用)", text: "请输入测试微信ID", name: "wechat_id" }
    ]);
    const inputValues = common_vendor.reactive({
      "user_name": "",
      "hospital_id": null,
      "user_type": "",
      "wechat_id": "",
      "doctor_id": null,
      "age": null
    });
    common_vendor.onMounted(() => {
    });
    function handleVas() {
      common_vendor.index.navigateTo({
        url: "/pages/chart/chart"
      });
    }
    function handleClick() {
      form.value.validate().then(async (re) => {
        console.log("表单数据信息：", re);
        console.log("待传输数据信息：", inputValues);
        const { data: res } = await common_vendor.index.$http.post("/v1/user", inputValues);
        console.log(res);
        common_vendor.index.navigateTo({
          url: "/pages/function/function"
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
            b: common_vendor.o(_ctx.handleFocus, index),
            c: common_vendor.o(_ctx.input, index),
            d: "6fe914c4-2-" + i0 + "," + ("6fe914c4-1-" + i0),
            e: common_vendor.o(($event) => inputValues[item.name] = $event, index),
            f: common_vendor.p({
              focus: true,
              placeholder: item.text,
              styles,
              placeholderStyle: _ctx.placeholderStyle,
              modelValue: inputValues[item.name]
            }),
            g: "6fe914c4-1-" + i0 + ",6fe914c4-0",
            h: common_vendor.p({
              name: item.name
            }),
            i: index
          };
        }),
        b: common_vendor.sr(form, "6fe914c4-0", {
          "k": "form"
        }),
        c: common_vendor.p({
          rules: validRules,
          modelValue: inputValues
        }),
        d: common_vendor.o(handleVas),
        e: common_vendor.o(handleClick)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni_app playground/pain_detect/pages/edit_info/edit_info.vue"]]);
wx.createPage(MiniProgramPage);
