"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      chartData1: {},
      chartData2: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
        padding: [15, 10, 0, 15],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          gridType: "dash",
          dashLength: 2
        },
        extra: {
          line: {
            type: "curve",
            width: 2,
            activeType: "hollow"
          }
        }
      }
    };
  },
  onReady() {
    this.getServerData();
  },
  methods: {
    getServerData() {
      setTimeout(() => {
        let res = {
          chart1: {
            categories: ["2020", "2021", "2022", "2023"],
            series: [
              {
                name: "vas",
                lineType: "dash",
                data: [2, 7, 4, 10]
              },
              {
                name: "检测结果",
                data: [6, 10, 4, 6]
              }
            ]
          },
          chart2: {
            categories: ["2020", "2021", "2022", "2023"],
            series: [
              {
                name: "vas",
                lineType: "dash",
                data: [7, 2, 4, 10]
              },
              {
                name: "检测结果",
                data: [4, 10, 2, 6]
              }
            ]
          }
        };
        this.chartData1 = JSON.parse(JSON.stringify(res.chart1));
        this.chartData2 = JSON.parse(JSON.stringify(res.chart2));
      }, 500);
    }
  }
};
if (!Array) {
  const _easycom_qiun_data_charts2 = common_vendor.resolveComponent("qiun-data-charts");
  _easycom_qiun_data_charts2();
}
const _easycom_qiun_data_charts = () => "../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js";
if (!Math) {
  _easycom_qiun_data_charts();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "line",
      opts: $data.opts,
      chartData: $data.chartData1
    }),
    b: common_vendor.p({
      type: "line",
      opts: $data.opts,
      chartData: $data.chartData2
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6801e029"], ["__file", "D:/uni_app playground/pain_detect/pages/chart/chart.vue"]]);
wx.createPage(MiniProgramPage);
