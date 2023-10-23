"use strict";
const common_vendor = require("../../common/vendor.js");
const common_js_debounce = require("../../common/js/debounce.js");
const stores_search = require("../../stores/search.js");
require("../../stores/upload.js");
const stores_select = require("../../stores/select.js");
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
    const selectStoreTemp = stores_select.selectStore();
    const searchStoreTemp = stores_search.searchStore();
    const getRandomNumber = () => Math.random().toString(16).slice(2);
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
    const universityList = common_vendor.ref([]);
    common_vendor.watch(() => value.value, (newVal) => {
      queryParams.pageNum = 1;
      common_js_debounce.debounce(getList(), 500);
    });
    common_vendor.onMounted(async () => {
      const { data: res } = await common_vendor.index.$http.get(`/v1/user/patient?doctor_id=${searchStoreTemp.searchInfo.doctor_id}`);
      universityList.value = res.data;
      console.log(11);
      console.log(res.data);
    });
    function handleNext() {
      if (Object.keys(selectStoreTemp.selectData).length !== 0) {
        selectStoreTemp.setSelectData({});
      }
      common_vendor.index.navigateTo({
        url: "/pages/edit_info/edit_info"
      });
    }
    function scrolltolower() {
      queryParams.pageNum++;
      getList();
    }
    function getList() {
      if (value.value) {
        httpGetList({ ...queryParams, keyword: value.value }).then((resp) => {
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
      selectData.value = JSON.stringify(event.name);
    }
    async function iconClick() {
      const { data: res } = await common_vendor.index.$http.get(`/v1/user?user_id=${universityList.value.find((obj) => obj.name === value.value).id}`);
      if (res.code == 0) {
        console.log("请求成功");
        selectStoreTemp.setSelectData(res.data);
        common_vendor.index.navigateTo({
          url: "/pages/edit_info/edit_info"
        });
        console.log(selectStoreTemp.selectData);
      } else {
        console.log(res);
        common_vendor.index.showToast({
          title: "请检查网络",
          icon: "error",
          duration: 2e3
        });
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
        universityList.value;
        for (let i = 0; i < pageNum; i++) {
          let list = universityList.value.map((item) => ({
            name: item.name,
            id: getRandomNumber()
          }));
          data = [...data, ...list];
        }
        data = data.filter((item) => item.name.includes(keyword));
        resovle({
          code: 200,
          msg: "success",
          data
        });
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(selectData.value),
        b: common_vendor.o(iconClick),
        c: common_vendor.o(($event) => value.value = $event),
        d: common_vendor.p({
          styles: inputStyles,
          suffixIcon: "search",
          placeholder: "请输入病患名称",
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
