<!--
名称：xy-chart-radar
版本：1.0.0
作者：谢元将
时间：2020年8月24日11:41:13 
-->
<template>
  <div class="xy-chart-radar">
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
/* lodash 按需引入 */
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'XyChartRadar',
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
    legendPosition: { type: String, default: 'left' }, //legend位置
    radarAxisColor: { type: [String, Array], default: '#ccc' }, //雷达轴坐标颜色
    isBgGradient: { type: Boolean, default: true }, //背景是否渐变
    indicator: { type: Array, default: null }, //
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
      this.completion()
      if (this.listResult.length) {
        this.render() //配置echarts图表
      }
    },
    /* 补全数据 */
    completion() {
      /* 获取到所有data里的name */
      let all = this.listResult.reduce((prev, cur) => {
        let names = cur.data.map(d => d.name)
        return prev.concat(names)
      }, [])
      /* 去重 */
      let filter = Array.from(new Set(all))
      /* 补全 */
      this.listResult.forEach(d => {
        if (d.data.length !== filter.length) {
          filter.forEach((v, i) => {
            if (!d.data.find(o => o.name === v)) {
              d.data.splice(i, 0, {
                name: v,
                value: null,
              })
            }
          })
        }
      })
    },
    render() {
      const options = {
        // backgroundColor: '#101736',
        title: {
          show: Boolean(this.title),
          text: this.title,
          left: 'center',
          top: 'center',
          textStyle: {
            fontSize: 15,
            lineHeight: 18,
          },
        },
        color: this.colors,
        tooltip: Object.assign(
          {
            trigger: 'item', //'axis'
          },
          getTooltipFmt('item')
        ),
        legend: {
          show: this.showLegend,
          orient: 'vertical',
          left: this.legendPosition,
          data: this.getLegendData(),
        },
        radar: {
          radius: '70%',
          // shape: 'circle',
          splitLine: {
            lineStyle: {
              color: this.radarAxisColor,
            },
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: Array.isArray(this.radarAxisColor)
                ? this.radarAxisColor[0]
                : this.radarAxisColor,
            },
          },
          name: {
            textStyle: {
              color: Array.isArray(this.radarAxisColor)
                ? this.radarAxisColor[0]
                : this.radarAxisColor,
            },
          },

          indicator: this.indicator || this.getIndicator(),
        },
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
    /* 获取所有图例data */
    getLegendData() {
      let result = null
      result = this.listResult.map(d => d.name)

      return result
    },
    getIndicator() {
      let max = this.listResult.reduce((prev, cur) => {
        let result = []
        if (!prev.length) {
          result = cur.data.map(d => d.value)
        } else {
          result = cur.data.map((d, i) => d.value + prev[i])
        }
        return result
      }, [])
      return this.listResult[0].data.map((d, i) => ({
        name: d.name,
        max: max[i],
      }))
    },
    getSeries() {
      let series = {
        name: '',
        type: 'radar',
        data: this.getSeriesData(),
      }
      return [series]
    },
    getSeriesData() {
      let result = null
      result = this.listResult.map((d, i) => ({
        name: d.name,
        value: d.data.map(v => v.value),
        areaStyle: this.isBgGradient
          ? {
              // 单项区域填充样式
              color: {
                type: 'linear',
                x: 0, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: this.colors[i],
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255,255,255,0)',
                  },
                  {
                    offset: 1,
                    color: this.colors[i],
                  },
                ],
                globalCoord: false,
              },
              opacity: 1, // 区域透明度
            }
          : { opacity: 0.1 },
      }))

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
.xy-chart-radar {
  font-size: inherit;
  width: 100%;
  height: 100%;
}
</style>
