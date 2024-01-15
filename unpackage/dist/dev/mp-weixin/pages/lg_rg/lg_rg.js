"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_search = require("../../stores/search.js");
const common_js_debounce = require("../../common/js/debounce.js");
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
  __name: "lg_rg",
  setup(__props) {
    const searchStoreTemp = stores_search.searchStore();
    const hospitalName = common_vendor.ref("");
    const doctorName = common_vendor.ref("");
    const show = common_vendor.ref(false);
    const show_doc = common_vendor.ref(false);
    common_vendor.ref(null);
    const focus = common_vendor.ref("");
    common_vendor.ref("");
    const queryParams = common_vendor.reactive({
      pageSize: 10,
      pageNum: 1,
      list: []
    });
    common_vendor.reactive({
      pageSize: 10,
      pageNum: 1,
      list: []
    });
    const hospitalList = common_vendor.ref([]);
    const doctorList = common_vendor.ref([]);
    common_vendor.watch(() => hospitalName.value, (newVal) => {
      if (selectClick.value === true) {
        selectClick.value = false;
      } else {
        queryParams.pageNum = 1;
        common_js_debounce.debounce(getList(), 500);
      }
    });
    common_vendor.watch(() => doctorName.value, (newVal) => {
      if (selectClick.value === true) {
        selectClick.value = false;
      } else {
        queryParams.pageNum = 1;
        common_js_debounce.debounce(getList(), 500);
      }
    });
    const selectClick = common_vendor.ref(false);
    const form = common_vendor.ref(null);
    const styles = common_vendor.reactive({
      borderColor: "black"
    });
    const inputValues = common_vendor.reactive({
      "id": "",
      "pw": ""
    });
    common_vendor.onMounted(async () => {
    });
    function getList() {
      if (focus.value === "hos") {
        if (hospitalName.value) {
          httpGetList({ ...queryParams, keyword: hospitalName.value }).then((resp) => {
            if (resp.code === 200) {
              console.log(resp.data);
              queryParams.list = resp.data;
              if (!show.value)
                show.value = true;
            }
          });
        } else {
          show.value = false;
        }
      } else {
        if (doctorName.value) {
          httpGetList({ ...queryParams, keyword: doctorName.value }).then((resp) => {
            if (resp.code === 200) {
              console.log(resp.data);
              queryParams.list = resp.data;
              if (!show_doc.value)
                show_doc.value = true;
            }
          });
        } else {
          show_doc.value = false;
        }
      }
    }
    function httpGetList(params) {
      const {
        pageNum,
        pageSize,
        keyword
      } = params;
      return new Promise((resovle) => {
        let data = [];
        for (let i = 0; i < pageNum; i++) {
          if (focus.value === "hos") {
            let list = hospitalList.value.map((item) => ({
              name: item.name,
              id: item.id
            }));
            data = [...list];
          } else {
            let list = doctorList.value.map((item) => ({
              name: item.user_name,
              id: item.id
            }));
            data = [...list];
          }
        }
        if (focus.value === "hos") {
          data = data.filter((item) => item.name.includes(keyword));
        } else {
          data = data.filter((item) => item.name.includes(keyword));
        }
        resovle({
          code: 200,
          msg: "success",
          data
        });
      });
    }
    function handleRg() {
      common_vendor.index.navigateTo({
        url: "/pages/info/info"
      });
    }
    function handleClick() {
      form.value.validate().then(async (r) => {
        const { data: res } = await common_vendor.index.$http.post("/v1/user", inputValues);
        console.log(res);
        console.log("待传输数据信息：", inputValues);
        searchStoreTemp.setSearchInfo(inputValues);
        common_vendor.index.navigateTo({
          url: "/pages/function/function"
        });
      }).catch((err) => {
        console.log("表单错误：", err);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t("ID"),
        b: common_vendor.o(_ctx.handleFocus),
        c: common_vendor.o(_ctx.input),
        d: common_vendor.o(($event) => inputValues["id"] = $event),
        e: common_vendor.p({
          focus: true,
          placeholder: "请输入ID",
          styles,
          placeholderStyle: _ctx.placeholderStyle,
          modelValue: inputValues["id"]
        }),
        f: common_vendor.p({
          name: "id"
        }),
        g: common_vendor.t("密码"),
        h: common_vendor.o(_ctx.handleFocus),
        i: common_vendor.o(_ctx.input),
        j: common_vendor.o(($event) => inputValues["pw"] = $event),
        k: common_vendor.p({
          type: "password",
          focus: true,
          placeholder: "请输入密码",
          styles,
          placeholderStyle: _ctx.placeholderStyle,
          modelValue: inputValues["pw"]
        }),
        l: common_vendor.p({
          name: "pw"
        }),
        m: common_vendor.sr(form, "2921e8ec-0", {
          "k": "form"
        }),
        n: common_vendor.p({
          rules: _ctx.validRules,
          modelValue: inputValues
        }),
        o: common_vendor.o(handleRg),
        p: common_vendor.o(handleClick)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni_app playground/pain_detect/pages/lg_rg/lg_rg.vue"]]);
wx.createPage(MiniProgramPage);
