<!--
名称：xy-chart-pie-rose
版本：1.0.0
作者：谢元将
时间：2020年8月31日10:24:34

-->
<template>
  <div class="xy-chart-pie-rose">
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

/* lodash 按需引入 */
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'XyChartPieRose',
  components: {
    XyChartBase,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [
          // {
          //   name: 'listrose',
          //   data: [
          //     {
          //       name: '1月iner',
          //       value: 10,
          //       children: [
          //         { name: '1月outer1', value: 2 },
          //         { name: '1月outer2', value: 2 },
          //         { name: '1月outer3', value: 2 },
          //         { name: '1月outer4', value: 2 },
          //         { name: '1月outer5', value: 2 },
          //       ],
          //     },
          //   ],
          // },
        ]
      },
    }, //data
    options: { type: Object, default: () => ({}) }, //自定义options
    colors: {
      type: Array,
      default: () => [
        '#ff4343',
        '#f69846',
        '#f6d54a',
        '#45dbf7',
        '#44aff0',
        '#4777f5',
        '#5045f6',
        '#ad46f3',
        '#f845f1',
      ],
    }, //颜色表
    showLegend: { type: Boolean, default: true }, //是否显示legend
    legendPosition: { type: String, default: 'left' }, //legend位置
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
      return Boolean(this.list.length && this.list.filter(item => item.data.length).length)
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
      this.listResult = cloneDeep(this.list) //深度拷贝list
      this.listResult[0].data.sort((a, b) => b.value - a.value)
      this.render() //配置echarts图表
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
        legend: {
          show: this.showLegend,
          data: this.getLegendData(),
        },
        series: [
          {
            name: this.listResult[0].name,
            type: 'pie',
            radius: ['20%', '80%'],
            center: this.showLegend ? ['50%', '33%'] : ['50%', '28%'],
            avoidLabelOverlap: false,
            roseType: 'area',
            startAngle: -180,
            clockwise: false,
            label: {
              show: true,
              fontWeight: 'bold',
              lineHeight: 14,
              formatter(val) {
                return val.data.label || val.name + '\n' + val.percent + '%'
              },
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: ' rgba(120, 36, 50, 0.3)',
              shadowOffsetY: 1,
            },
            data: this.getSeriesData(),
          },
        ],
      }
      this.optionsResult = merge(
        {},
        optionsBase, //基本options
        options, //生成的options
        this.options //外部传入的options
      )
    },
    /* 设置图表信息 */
    /* 获取所有图例data */
    getLegendData() {
      let result = null
      if (this.list.length) {
        result = this.list[0].data.map(d => d.name)
      }
      return result
    },
    getSeriesData() {
      let result = []
      let pieArr = this.listResult[0].data
      let hidden = this.listResult[0].data.map(() => ({
        value: 0,
        name: '',
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      }))
      result = pieArr.concat(hidden)

      return result
    },
    /* 事件 */
    legendselectchanged(val) {
      /* 最后一个禁止取消选中 */
      let flag = true
      for (let key in val.selected) {
        if (val.selected[key]) {
          flag = false
        }
      }
      if (flag) {
        this.$refs.ChartBase.dispatchAction({
          type: 'legendSelect',
          // 图例名称
          name: val.name,
        })
      }
      this.$emit('legendselectchanged', val)
    },
    click(val) {
      this.$emit('click', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.xy-chart-pie-rose {
  font-size: inherit;
  width: 100%;
  height: 100%;
}
</style>
