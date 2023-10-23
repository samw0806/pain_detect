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
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + fuzzysearch)();
}
const fuzzysearch = () => "../../components/fuzzy_search.js";
const _sfc_main = {
  __name: "update_info",
  setup(__props) {
    const searchStoreTemp = stores_search.searchStore();
    const hospitalName = common_vendor.ref("");
    const doctorName = common_vendor.ref("");
    const inputStyles = {
      borderColor: "black"
    };
    const show = common_vendor.ref(false);
    const show_doc = common_vendor.ref(false);
    const selectData = common_vendor.ref(null);
    const focus = common_vendor.ref("");
    const show_d = common_vendor.ref(true);
    common_vendor.ref("");
    const queryParams = common_vendor.reactive({
      pageSize: 10,
      pageNum: 1,
      list: []
    });
    const queryParams_doc = common_vendor.reactive({
      pageSize: 10,
      pageNum: 1,
      list: []
    });
    const hospitalList = common_vendor.ref([]);
    const doctorList = common_vendor.ref([]);
    common_vendor.watch(() => hospitalName.value, (newVal) => {
      console.log("watch");
      if (selectClick.value === true) {
        selectClick.value = false;
      } else {
        queryParams.pageNum = 1;
        common_js_debounce.debounce(getList(), 500);
      }
    });
    common_vendor.watch(() => doctorName.value, (newVal) => {
      console.log("watch");
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
      { title: "年龄", text: "请输入年龄", name: "age" }
      // {title:'医院ID',text:'请输入就诊医院ID',name:'hospital_id'},
      // {title:'医师ID',text:'请输入看诊医师ID',name:'doctor_id'},
    ]);
    const inputValues = common_vendor.reactive({
      "user_name": "",
      "hospital_id": "",
      "user_type": "patient",
      "doctor_id": "",
      "age": null
    });
    common_vendor.onMounted(async () => {
      if (searchStoreTemp.searchInfo.user_type === "patient") {
        inputValues.doctor_id = searchStoreTemp.searchInfo.doctor_id;
        const { data: res } = await common_vendor.index.$http.get(`/v1/user/doctor?hospital_id=${searchStoreTemp.searchInfo.hospital_id}`);
        queryParams_doc.list = res.data;
        doctorList.value = res.data;
      } else {
        inputValues.doctor_id = searchStoreTemp.searchInfo.id;
        show_d.value = false;
      }
      const { data: re } = await common_vendor.index.$http.get("/v1/hospital");
      if (re.code === "0") {
        hospitalList.value = re.data;
      } else {
        common_vendor.index.showToast({
          title: "发生错误",
          icon: "error",
          duration: 1e3
        });
      }
      inputValues.user_name = searchStoreTemp.searchInfo.user_name;
      inputValues.hospital_id = searchStoreTemp.searchInfo.hospital_id;
      inputValues.user_type = searchStoreTemp.searchInfo.user_type;
      inputValues.age = searchStoreTemp.searchInfo.age;
      inputValues.id = searchStoreTemp.searchInfo.id;
      hospitalName.value = searchStoreTemp.searchInfo.hospital_name;
      doctorName.value = searchStoreTemp.searchInfo.doctor_name;
    });
    function scrolltolower() {
      queryParams.pageNum++;
      getList();
    }
    function scrolltolower_doc() {
      queryParams_doc.pageNum++;
      getList();
    }
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
        if (doctorName.value && focus.value === "doc") {
          httpGetList({ ...queryParams_doc, keyword: doctorName.value }).then((resp) => {
            if (resp.code === 200) {
              console.log("qp");
              console.log(queryParams_doc.list);
              console.log(resp.data);
              queryParams_doc.list = resp.data;
              if (!show_doc.value)
                show_doc.value = true;
            }
          });
        } else {
          show_doc.value = false;
        }
      }
    }
    async function select(event) {
      const { data: res } = await common_vendor.index.$http.get(`/v1/user/doctor?hospital_id=${event.id}`);
      show.value = false;
      show_doc.value = false;
      selectClick.value = true;
      if (focus.value === "hos") {
        hospitalName.value = event.name;
        selectData.value = JSON.stringify(event.name);
        inputValues.hospital_id = event.id;
        console.log(event);
        if (res.code == "0") {
          doctorList.value = res.data;
          console.log(`被选中医院下医生名单信息${doctorList.value}`);
        } else {
          common_vendor.index.showToast({
            title: "网络错误",
            icon: "error",
            duration: 1e3
          });
        }
      } else {
        doctorName.value = event.name;
        selectData.value = JSON.stringify(event.name);
        inputValues.doctor_id = event.id;
        console.log(`doc的event:${event}`);
        console.log(inputValues);
      }
      console.log("show");
      console.log(show.value);
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
            let list2 = hospitalList.value.map((item) => ({
              name: item.name,
              id: item.id
            }));
            data = [...list2];
          } else {
            let list2 = doctorList.value.map((item) => ({
              name: item.user_name,
              id: item.id
            }));
            data = [...list2];
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
    function handleClick() {
      form.value.validate().then(async (r) => {
        const { data: res } = await common_vendor.index.$http.put("/v1/user", inputValues);
        console.log(res);
        console.log("待传输数据信息：", inputValues);
        searchStoreTemp.setSearchInfo(inputValues);
        if (searchStoreTemp.searchInfo.user_type === "patient") {
          common_vendor.index.navigateTo({
            url: "/pages/function/function"
          });
        } else {
          common_vendor.index.navigateTo({
            url: "/pages/function_doc/function_doc"
          });
        }
      }).catch((err) => {
        console.log("表单错误：", err);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.o(_ctx.handleFocus, index),
            c: common_vendor.o(_ctx.input, index),
            d: "0c9207e0-2-" + i0 + "," + ("0c9207e0-1-" + i0),
            e: common_vendor.o(($event) => inputValues[item.name] = $event, index),
            f: common_vendor.p({
              focus: true,
              placeholder: item.text,
              styles,
              placeholderStyle: _ctx.placeholderStyle,
              modelValue: inputValues[item.name]
            }),
            g: "0c9207e0-1-" + i0 + ",0c9207e0-0",
            h: common_vendor.p({
              name: item.name
            }),
            i: index
          };
        }),
        b: common_vendor.sr(form, "0c9207e0-0", {
          "k": "form"
        }),
        c: common_vendor.p({
          rules: validRules,
          modelValue: inputValues
        }),
        d: common_vendor.o(($event) => focus.value = "hos"),
        e: common_vendor.o(($event) => hospitalName.value = $event),
        f: common_vendor.p({
          styles: inputStyles,
          placeholder: "请输入医院名称",
          modelValue: hospitalName.value
        }),
        g: common_vendor.o(scrolltolower),
        h: common_vendor.o(select),
        i: common_vendor.p({
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
        j: common_vendor.o(($event) => focus.value = "doc"),
        k: common_vendor.o(($event) => doctorName.value = $event),
        l: common_vendor.p({
          styles: inputStyles,
          placeholder: "请输入医生名称",
          modelValue: doctorName.value
        }),
        m: common_vendor.o(scrolltolower_doc),
        n: common_vendor.o(select),
        o: common_vendor.p({
          ["label-name"]: "name",
          ["value-name"]: "id",
          align: "center",
          ["no-data"]: "无相关记录",
          show: show_doc.value,
          list: queryParams_doc.list,
          ["custom-style"]: {
            fontSize: "30rpx"
          }
        }),
        p: show_d.value,
        q: common_vendor.o(handleClick)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni_app playground/pain_detect/pages/update_info/update_info.vue"]]);
wx.createPage(MiniProgramPage);
