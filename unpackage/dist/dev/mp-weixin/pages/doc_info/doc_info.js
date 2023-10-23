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
  __name: "doc_info",
  setup(__props) {
    const searchStoreTemp = stores_search.searchStore();
    const form = common_vendor.ref(null);
    const styles = common_vendor.reactive({
      borderColor: "black"
    });
    const validRules = {
      // user_name:{
      // 	rules:[
      // 		{
      // 			required:true,
      // 			errorMessage:'此为必填项'
      // 		},
      // 		{
      // 			pattern: /^[\u4e00-\u9fa5]+$/,
      // 			errorMessage:'姓名必须为中文'
      // 		}
      // 	]
      // },
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
      }
      // hospital_id:{
      // 	rules:[
      // 		{
      // 			required:true,
      // 			errorMessage:'此为必填项'
      // 		},
      // 		{
      // 			format:'number',
      // 			errorMessage:'医院id必须为数字'
      // 		}
      // 	]
      // },
    };
    const list = common_vendor.reactive([
      { title: "姓名", text: "请输入姓名", name: "user_name" },
      { title: "年龄", text: "请输入年龄", name: "age" },
      { title: "医院ID", text: "请输入医院ID", name: "hospital_id" },
      { title: "秘钥", text: "请输入秘钥", name: "doctor_id" }
    ]);
    const inputValues = common_vendor.reactive({
      "user_name": "",
      "hospital_id": "",
      "user_type": "doctor",
      "doctor_id": "",
      "age": null,
      "code": ""
    });
    common_vendor.onMounted(() => {
      common_vendor.index.login({
        provider: "weixin",
        //使用微信登录
        onlyAuthorize: true,
        success: async function(loginRes2) {
          console.log(`创建用户的code:${loginRes2.code}`);
          inputValues.code = loginRes2.code;
        },
        fail() {
          console.log(loginRes.authResult);
        }
      });
    });
    function handleFocus() {
    }
    function handleClick() {
      form.value.validate().then(async (r) => {
        const { data: res } = await common_vendor.index.$http.post("/v1/user", inputValues);
        console.log(res);
        console.log("待传输数据信息：", inputValues);
        searchStoreTemp.searchInfo(inputValues);
        common_vendor.index.navigateTo({
          url: "/pages/function_doc/function_doc"
        });
      }).catch((err) => {
        console.log("表单错误：", err);
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
