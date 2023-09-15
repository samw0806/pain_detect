"use strict";
const common_vendor = require("../../common/vendor.js");
const common_js_debounce = require("../../common/js/debounce.js");
const common_js_api = require("../../common/js/api.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (fuzzysearch + _easycom_uni_icons)();
}
const fuzzysearch = () => "../../components/fuzzy_search.js";
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const value = common_vendor.ref("");
    const show = common_vendor.ref(false);
    const selectData = common_vendor.ref(null);
    const queryParams = common_vendor.reactive({
      pageSize: 10,
      pageNum: 1,
      list: []
    });
    function handleNext() {
      common_vendor.index.navigateTo({
        url: "/pages/detection_doc/detection_doc"
      });
    }
    function input(event) {
      value.value = event.target.value;
      queryParams.pageNum = 1;
      common_js_debounce.debounce(getList(), 500);
    }
    function scrolltolower() {
      queryParams.pageNum++;
      getList();
    }
    function getList() {
      if (value.value) {
        common_js_api.httpGetList({ ...queryParams, keyword: value.value }).then((resp) => {
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
    }
    function select(event) {
      show.value = false;
      value.value = event.name;
      selectData.value = JSON.stringify(event);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(selectData.value),
        b: value.value,
        c: common_vendor.o(input),
        d: common_vendor.o(scrolltolower),
        e: common_vendor.o(select),
        f: common_vendor.p({
          ["label-name"]: "name",
          ["value-name"]: "id",
          align: "center",
          ["no-data"]: "无相关记录",
          show: show.value,
          list: queryParams.list,
          ["custom-style"]: {
            fontSize: "30rpx"
          }
        }),
        g: common_vendor.p({
          type: "personadd",
          size: "20",
          color: "white"
        }),
        h: common_vendor.o(handleNext)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "D:/uni_app playground/pain_detect/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
