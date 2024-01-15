"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/protocol/protocol.js";
  "./pages/info/info.js";
  "./pages/doc_info/doc_info.js";
  "./pages/function/function.js";
  "./pages/detection/detection.js";
  "./pages/communicate/communicate.js";
  "./pages/result/result.js";
  "./pages/vas/vas.js";
  "./pages/function_doc/function_doc.js";
  "./pages/detection_doc/detection_doc.js";
  "./pages/communicate_doc/communicate_doc.js";
  "./pages/search/search.js";
  "./pages/chart/chart.js";
  "./pages/edit_info/edit_info.js";
  "./pages/update_info/update_info.js";
  "./pages/lg_rg/lg_rg.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni_app playground/pain_detect/App.vue"]]);
common_vendor.index.$http = common_vendor.$http;
common_vendor.$http.baseUrl = "http://43.139.26.201:25800";
common_vendor.$http.beforeRequest = function(options) {
  common_vendor.index.showLoading({
    title: "数据加载中..."
  });
};
common_vendor.$http.afterRequest = function() {
  common_vendor.index.hideLoading();
};
function createApp() {
  const app = common_vendor.createSSRApp(App);
  const store = common_vendor.createPinia();
  app.use(store);
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
