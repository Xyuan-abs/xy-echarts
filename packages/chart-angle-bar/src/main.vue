<!--
名称：xy-chart-angle-bar
版本：1.0.0
作者：谢元将
时间：2020年8月28日14:48:23
-->
<template>
  <div class="xy-chart-angle-bar">
    <xy-chart-base
      ref="ChartBase"
      :has-data="hasData"
      :no-data-message="noDataMessage"
      :options="optionsResult"
      @click="click"
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
import { setColorOpacity } from '../../../utils/common'

/* lodash 按需引入 */
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'XyChartAngleBar',
  components: { XyChartBase },
  props: {
    list: {
      type: Array,
      default() {
        return [
          {
            name: 'ceshi',
            data: [
              // { name: '1月', value: 10, max: 12, min: 8 },
              // { name: '2月', value: 14, max: 16, min: 12 },
              // { name: '3月', value: 9, max: 11, min: 7 },
              // { name: '4月', value: 14, max: 16, min: 12 },
            ],
          },
        ]
      },
    }, //data
    options: { type: Object, default: () => ({}) }, //自定义options
    unit: { type: String, default: '单位：万元' }, //单位
    color: { type: String, default: '#67C23A' }, //柱状图颜色
    angleAxisColor: { type: String, default: '#8996a9' }, //极轴坐标颜色
    radiusAxisColor: { type: String, default: '#DCDFE6' }, //环形轴坐标颜色
    isBgGradient: { type: Boolean, default: false }, //背景是否渐变
    noDataMessage: { type: String, default: '暂无数据' }, //没有数据时显示的提示文字
  },
  data() {
    return {
      optionsResult: {},
      listResult: [],
      max: [],
    }
  },
  computed: {
    hasData() {
      return Boolean(this.list?.length)
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
      this.listResult = cloneDeep(this.list[0].data)
      let maxNum = 0
      this.listResult.forEach(d => {
        maxNum = d.value > maxNum ? d.value : maxNum
      })
      maxNum *= 1.1
      this.max = maxNum
      this.render()
    },
    async fetchData() {},
    render() {
      let options = {
        tooltip: Object.assign(
          {
            trigger: 'item', //'axis'
          },
          getTooltipFmt('item')
        ),
        angleAxis: {
          type: 'category',
          axisLabel: {
            show: true,
            fontSize: 12,
            color: this.angleAxisColor,
            margin: 15,
            formatter(val) {
              let str = ''
              const arr = val.split('')
              /* 超过5个字显示省略号 */
              if (arr.length > 5) {
                arr.forEach((d, i) => {
                  if (i < 2) {
                    str += d
                  }
                })
                str += '...'
              } else {
                arr.forEach(d => {
                  str += d
                })
              }

              return str
            },
          },
          axisTick: {
            length: 5,
            lineStyle: {
              color: this.angleAxisColor,
              width: 1,
            },
          },
          axisLine: {
            lineStyle: {
              color: this.angleAxisColor,
              width: 1,
            },
          },
          splitNumber: 10,
          // interval: 1,
          data: this.getAngleAxisData(),
        },
        radiusAxis: {
          max: this.max,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: this.angleAxisColor,
              width: 1,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: this.radiusAxisColor,
              width: 1,
            },
          },
          splitArea: {
            areaStyle: {
              color: 'transparent',
            },
          },
          zlevel: -1,
        },
        polar: {},
        series: [
          {
            name: this.list[0].name,
            type: 'bar',
            barWidth: '80%',
            roundCap: true,
            coordinateSystem: 'polar',
            label: {
              show: false,
            },
            itemStyle: {
              color: this.isBgGradient
                ? {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.7,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(255,255,255,0)',
                      },
                      {
                        offset: 1,
                        color: this.color,
                      },
                    ],
                    globalCoord: false,
                  }
                : setColorOpacity(this.color, 0.2),
              borderColor: this.color,
              borderWidth: 1,
            },
            emphasis: {
              itemStyle: {
                color: setColorOpacity(this.color, 0.2),
                borderColor: this.color,
                borderWidth: 1,
              },
            },
            data: this.getSeriseData(this.listResult),
            // zlevel: 11,
          },
        ],
      }
      this.optionsResult = merge(
        {},
        optionsBase,
        options, //生成的options
        this.options //外部传入的options
      )
    },
    getAngleAxisData() {
      return this.listResult.map(d => d.name)
    },
    getSeriseData(arr) {
      let result = null
      result = arr.map(item => {
        return {
          name: item.name,
          value: item.value,
          label: item.label,
          unit: this.unit,
        }
      })
      return result
    },
    click(val) {
      this.$emit('click', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.xy-chart-angle-bar {
  font-size: inherit;
  width: 100%;
  height: 100%;
}
</style>
