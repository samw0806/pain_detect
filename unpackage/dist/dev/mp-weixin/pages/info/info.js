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
  __name: "info",
  setup(__props) {
    stores_search.searchStore();
    const hospitalName = common_vendor.ref("");
    const doctorName = common_vendor.ref("");
    const inputStyles = {
      borderColor: "black"
    };
    const show = common_vendor.ref(false);
    const show_doc = common_vendor.ref(false);
    const selectData = common_vendor.ref(null);
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
    const id = common_vendor.ref("12342553");
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
      "age": null,
      "code": "",
      "pw": ""
    });
    common_vendor.onMounted(async () => {
    });
    function scrolltolower() {
      queryParams.pageNum++;
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
        common_vendor.index.showModal({
          title: "请务必记录好您的ID",
          content: id.value,
          confirmText: "复制ID",
          success: function(res) {
            if (res.confirm) {
              common_vendor.index.setClipboardData({
                data: id.value
              });
              common_vendor.index.navigateTo({
                url: "/pages/function/function"
              });
            } else {
              console.log("点击了取消");
            }
          }
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
            b: common_vendor.o(_ctx.handleFocus, index),
            c: common_vendor.o(_ctx.input, index),
            d: "5dbb4556-2-" + i0 + "," + ("5dbb4556-1-" + i0),
            e: common_vendor.o(($event) => inputValues[item.name] = $event, index),
            f: common_vendor.p({
              focus: true,
              placeholder: item.text,
              styles,
              placeholderStyle: _ctx.placeholderStyle,
              modelValue: inputValues[item.name]
            }),
            g: "5dbb4556-1-" + i0 + ",5dbb4556-0",
            h: common_vendor.p({
              name: item.name
            }),
            i: index
          };
        }),
        b: common_vendor.t("密码"),
        c: common_vendor.o(_ctx.handleFocus),
        d: common_vendor.o(_ctx.input),
        e: common_vendor.o(($event) => inputValues["pw"] = $event),
        f: common_vendor.p({
          focus: true,
          placeholder: "请输入密码",
          styles,
          placeholderStyle: _ctx.placeholderStyle,
          modelValue: inputValues["pw"]
        }),
        g: common_vendor.p({
          name: "pw"
        }),
        h: common_vendor.sr(form, "5dbb4556-0", {
          "k": "form"
        }),
        i: common_vendor.p({
          rules: validRules,
          modelValue: inputValues
        }),
        j: common_vendor.o(($event) => focus.value = "hos"),
        k: common_vendor.o(($event) => hospitalName.value = $event),
        l: common_vendor.p({
          styles: inputStyles,
          placeholder: "请输入医院名称",
          modelValue: hospitalName.value
        }),
        m: common_vendor.o(scrolltolower),
        n: common_vendor.o(select),
        o: common_vendor.p({
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
        p: common_vendor.o(($event) => focus.value = "doc"),
        q: common_vendor.o(($event) => doctorName.value = $event),
        r: common_vendor.p({
          styles: inputStyles,
          placeholder: "请输入医生名称",
          modelValue: doctorName.value
        }),
        s: common_vendor.o(scrolltolower),
        t: common_vendor.o(select),
        v: common_vendor.p({
          ["label-name"]: "name",
          ["value-name"]: "id",
          align: "center",
          ["no-data"]: "无相关记录",
          show: show_doc.value,
          list: queryParams.list,
          ["custom-style"]: {
            fontSize: "30rpx"
          }
        }),
        w: common_vendor.o(handleClick)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni_app playground/pain_detect/pages/info/info.vue"]]);
wx.createPage(MiniProgramPage);
