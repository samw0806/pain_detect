"use strict";
const common_vendor = require("../../common/vendor.js");
const common_js_debounce = require("../../common/js/debounce.js");
const common_js_api = require("../../common/js/api.js");
const stores_search = require("../../stores/search.js");
require("../../stores/upload.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_easyinput2 + _easycom_uni_icons2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_easyinput + fuzzysearch + _easycom_uni_icons)();
}
const fuzzysearch = () => "../../components/fuzzy_search.js";
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const searchStoreTemp = stores_search.searchStore();
    const inputStyles = {
      borderColor: "black"
    };
    const value = common_vendor.ref("");
    const show = common_vendor.ref(false);
    const selectData = common_vendor.ref(null);
    const queryParams = common_vendor.reactive({
      pageSize: 10,
      pageNum: 1,
      list: []
    });
    common_vendor.watch(() => value.value, (newVal) => {
      queryParams.pageNum = 1;
      common_js_debounce.debounce(getList(), 500);
    });
    function handleNext() {
      common_vendor.index.navigateTo({
        url: "/pages/detection_doc/detection_doc"
      });
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
    async function iconClick() {
      const { data: res } = await common_vendor.index.$http.post("/search", value.value);
      if (red.code == 200) {
        console.log("请求成功");
        searchStoreTemp.setSearchInfo(res.data);
        common_vendor.index.navigateTo({
          url: "/pages/detection_doc/detection_doc"
        });
        console.log(searchStoreTemp.searchInfo);
      } else {
        common_vendor.index.showToast({
          title: "请检查网络",
          icon: "error",
          duration: 2e3
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(selectData.value),
        b: common_vendor.o(iconClick),
        c: common_vendor.o(($event) => value.value = $event),
        d: common_vendor.p({
          styles: inputStyles,
          suffixIcon: "search",
          placeholder: "右侧图标",
          modelValue: value.value
        }),
        e: common_vendor.o(scrolltolower),
        f: common_vendor.o(select),
        g: common_vendor.p({
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
        h: common_vendor.p({
          type: "personadd",
          size: "20",
          color: "white"
        }),
        i: common_vendor.o(handleNext)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "D:/uni_app playground/pain_detect/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
