<!--
名称：xy-chart-treemap
版本：1.0.0
作者：谢元将
时间：2020年8月24日11:41:13 
-->
<template>
  <div class="xy-chart-treemap">
    <xy-chart-base
      ref="ChartBase"
      :has-data="hasData"
      :no-data-message="noDataMessage"
      :options="optionsResult"
      @click="click"
      @legendselectchanged="legendselectchanged"
    >
      <template v-slot:empty>
        <slot name="empty"> </slot>
      </template>
    </xy-chart-base>
  </div>
</template>
<script>
/* echarts图表相关 */
import XyChartBase from '../../chart-base/src/main'

import { optionsBase, getTooltipFmt } from '../../../utils/echartsConfig'
import { colors } from '../../../utils/echartsCommon'
import { fmtUnit } from '../../../utils/common'

/* lodash 按需引入 */
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

/* treemap默认配置 */
const defaultTreemapConfig = {
  showBreadcrumb: false, //是否展示面包屑
  width: '95%', //宽
  height: '95%', //高
  borderWidth: 2, //边宽
  roam: false, //是否开启拖拽漫游（移动和缩放）
  nodeClick: false, //点击节点后的行为
}

export default {
  name: 'XyChartTreemap',
  components: {
    XyChartBase,
  },
  props: {
    title: { type: String, default: null }, //标题
    list: {
      type: Array,
      default() {
        return [
          // {
          //   name: 'ceshi',
          //   data: [
          //     { name: '1月', value: 0 },
          //     { name: '2月', value: 10 },
          //     { name: '3月', value: 13 },
          //     { name: '4月', value: 10 },
          //   ],
          // },
        ]
      },
    }, //data
    options: { type: Object, default: () => ({}) }, //自定义options
    colors: { type: Array, default: () => colors }, //颜色表
    showLegend: { type: Boolean, default: true }, //是否显示legend

    unit: { type: String, default: '单位：万元' }, //单位
    noDataMessage: { type: String, default: '暂无数据' }, //没有数据时显示的提示文字
  },
  data() {
    return {
      optionsResult: {},
      listResult: [],
    }
  },
  computed: {
    hasData() {
      return Boolean(
        this.listResult.length && this.listResult.filter(item => item.data.length).length
      )
    },
  },
  watch: {
    list: {
      handler() {
        this.init()
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.listResult = cloneDeep(this.list).map(d => d) //深度拷贝list
      if (this.listResult.length) {
        this.render() //配置echarts图表
      }
    },
    render() {
      const options = {
        color: this.colors,
        tooltip: Object.assign(
          {
            trigger: 'item', //'axis'
          },
          getTooltipFmt('item')
        ),
        series: this.getSeries(),
      }
      this.optionsResult = merge(
        {},
        optionsBase, //基本options
        options, //生成的options
        this.options //外部传入的options
      )
    },
    /* 设置图表信息 */
    getSeries() {
      let series = {
        name: '',
        type: 'treemap',
        width: defaultTreemapConfig.width,
        height: defaultTreemapConfig.height,
        roam: defaultTreemapConfig.roam,
        nodeClick: defaultTreemapConfig.nodeClick,
        breadcrumb: {
          show: defaultTreemapConfig.showBreadcrumb,
        },
        itemStyle: {
          borderWidth: defaultTreemapConfig.borderWidth,
        },
        label: {
          lineHeight: 16,
          formatter: params => {
            return params.name + '：' + params.value + (this.unit ? fmtUnit(this.unit) : '')
          },
        },
        data: this.getSeriesData(),
      }
      return [series]
    },
    getSeriesData() {
      let result = null
      result = this.listResult[0].data.map(d =>
        Object.assign({}, d, {
          unit: this.unit,
        })
      )

      return result
    },
    /* 事件 */
    legendselectchanged(val) {
      this.$emit('legendselectchanged', val)
    },
    click(val) {
      this.$emit('click', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.xy-chart-treemap {
  font-size: inherit;
  width: 100%;
  height: 100%;
}
</style>
