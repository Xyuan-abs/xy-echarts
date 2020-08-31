<!--
名称：echarts组件-基本图表
版本：1.0.0
作者：Xyuan
时间：2020年8月21日15:00:42
-->
<template>
  <div class="xy-chart-base">
    <!-- xy-chart-base -->
    <ECharts
      v-if="hasData"
      ref="echarts"
      autoresize
      :options="optionsResult"
      @click="onClick"
      @mouseover="mouseover"
      @mouseout="mouseout"
      @legendselectchanged="legendselectchanged"
    />
    <div v-else class="no-data">
      <span>
        <slot name="empty">
          {{ noDataMessage }}
        </slot>
      </span>
    </div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import merge from 'lodash/merge'

export default {
  name: 'XyChartBase',
  components: { ECharts },
  props: {
    options: { type: Object, default: null }, //自定义options
    hasData: { type: Boolean, default: false }, //有无数据
    noDataMessage: { type: String, default: '暂无数据' }, //没有数据时显示的提示文字
  },
  data() {
    return {
      optionsResult: null,
    }
  },
  computed: {},
  watch: {
    options: {
      handler() {
        this.init()
      },
      deep: true,
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.render()
    },
    render() {
      this.optionsResult = merge({}, this.options)
    },
    onClick(params) {
      params.event.stop()
      this.$emit('click', params)
    },
    mouseout(params) {
      this.$emit('mouseout', params)
    },
    mouseover(params) {
      this.$emit('mouseover', params)
    },
    legendselectchanged(params) {
      this.$emit('legendselectchanged', params)
    },
    dispatchAction(params) {
      this.$refs.echarts.dispatchAction(params)
    },
  },
}
</script>
<style lang="scss" scoped>
.xy-chart-base {
  font-size: inherit;
  width: 100%;
  height: 100%;
  .echarts {
    width: 100%;
    height: 100%;
  }
  .no-data {
    width: 100%;
    height: 100%;
    position: relative;
    color: #606266;
    padding: 0;
    margin: 0;
    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      line-height: 1.5;
    }
  }
}
</style>
