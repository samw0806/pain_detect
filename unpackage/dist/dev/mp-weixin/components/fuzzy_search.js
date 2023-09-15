"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    /** 展示整体组件 */
    show: {
      type: Boolean,
      default: false
    },
    /** 需要展示的列表 */
    list: {
      type: Array,
      default: () => []
    },
    /** 自定义label */
    labelName: {
      type: String,
      default: "label"
    },
    /** 自定义value */
    valueName: {
      type: String,
      default: "value"
    },
    /** 无内容时显示的内容  */
    noData: {
      type: String,
      default: "暂无匹配内容..."
    },
    /** item的对齐样式 */
    align: {
      type: String,
      default: "left",
      validator: (value) => {
        return ["left", "center", "right"].includes(value);
      }
    },
    /** 自定义item展示样式 */
    customStyle: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    /** 设置item的样式 */
    setItemStyle() {
      const { align, customStyle } = this;
      return {
        textAlign: align,
        ...customStyle
      };
    }
  },
  methods: {
    /** item点击事件 */
    click(item) {
      this.$emit("select", { ...item });
    },
    /** 触底加载下一页 */
    scrolltolower() {
      this.$emit("scrolltolower");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.show
  }, $props.show ? common_vendor.e({
    b: $props.list.length > 0
  }, $props.list.length > 0 ? {
    c: common_vendor.f($props.list, (item, k0, i0) => {
      return {
        a: common_vendor.t(item[$props.labelName]),
        b: item[$props.valueName],
        c: common_vendor.o(($event) => $options.click(item), item[$props.valueName])
      };
    }),
    d: common_vendor.s($options.setItemStyle),
    e: common_vendor.o((...args) => $options.scrolltolower && $options.scrolltolower(...args))
  } : {
    f: common_vendor.t($props.noData)
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7fa62808"], ["__file", "D:/uni_app playground/pain_detect/components/fuzzy_search.vue"]]);
wx.createComponent(Component);
