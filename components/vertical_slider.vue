<template>
  <div class="vertical-slider">
    <input
      type="range"
      class="slider"
      :min="min"
      :max="max"
      :step="step"
      v-model="value"
      @input="updateValue"
    />
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:value', parseFloat(event.target.value));
    }
  }
};
</script>

<style scoped>
.vertical-slider {
  transform: rotate(270deg);
  height: 100px; /* 调整高度根据需要 */
}

.slider {
  width: 100%;
  height: 100%;
  writing-mode: bt-lr; /* 设置文本方向为从下到上 */
  appearance: slider-vertical; /* 使滑块垂直显示 */
}
</style>
