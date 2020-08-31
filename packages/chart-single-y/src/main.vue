<!--
名称：xy-chart-single-y
版本：1.0.0
作者：谢元将
时间：2020年8月24日11:41:13 
参数：list[{
        // 以下为公共配置
        name: '', // 序列名
        data: [ 
          { name: '', value: ''} // x轴标签名 值
        ],
        color: 'rgb(118,252,254)', // item的颜色
        stack: 'stack', // 堆叠标识,用于标识堆叠数据
        withBg: false, // 是否有背景
        bgColor: 'rgb(5,126,118)', // line面积图/柱状图背景色   渐变则为数组[rgb(5,126,118),rgb(5,126,118)] 不填则为color+透明度
        info:{},//其他信息

        // 以下为line配置
        smooth:false, // 是否为曲线
        isStep: true, //是否成阶梯状
        lineType: 'solid', // line的类型: solid,dashed,dotted
        bgOpacity:1,//背景透明度
        isBgGradient:false,//背景颜色是否渐变 当boColor部位数组时生效

        // 以下为bar配置
        barRadius:0, // 圆角

        // 以下为scatter配置
        symbol: 'circle',//点的形状
        hasShadow:false, // 阴影
      }]
-->
<template>
  <div class="xy-chart-single-y">
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
import ECharts from 'vue-echarts'
import XyChartBase from '../../chart-base/src/main'

import { colors, seriesLine, seriesBar, seriesScatter } from '../../../utils/echartsCommon'
import { optionsSingleYBase, hiddenAxis, getTooltipFmt } from '../../../utils/echartsConfig'
import { setColorOpacity } from '../../../utils/common'

/* lodash 按需引入 */
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

/* options默认配置 */
const defaultConfig = {
  tooltipBgcolor: 'rgba(51,51,51,0.98)', //tooltip背景颜色
  tooltipTrigger: 'axis', //tooltip触发方式
  seriesType: 'line',
}

/* line默认配置 */
const defaultLineConfig = {
  symbolSize: 4, //线节点圆圈大小
  lineType: 'solid', // line的类型（虚线、实线、点线）
  smooth: false, //曲线
  bgOpaticy: 1, //背景透明度
  stack: null, //堆叠分组名
}

/* bar默认配置 */
const defaultBarConfig = {
  labelColor: '#333333',
  labelFontWeight: 'bold',
  labelFonSize: 12,
  bgcolor: 'rgba(220, 220, 220, 0.8)',
  barBorderRadius: 0,
  showBackground: false,
}

/* scatter默认配置 */
const defaultScatterConfig = {
  symbol: 'circle',
  shadowColor: 'rgba(120, 36, 50, 0.5)',
  shadowBlur: 4,
  shadowOffsetY: 2,
}
export default {
  name: 'XyChartSingleY',
  components: {
    XyChartBase,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [
          // {
          //   name: '平均',
          //   data: [
          //     { name: '1月', value: 10, max: 12, min: 8 },
          //     { name: '2月', value: 14, max: 16, min: 12 },
          //     { name: '3月', value: 9, max: 11, min: 7 },
          //     { name: '4月', value: 14, max: 16, min: 12 }
          //   ],
          //   type: 'line',
          //   isStep: true,
          //   color: '#0885ff',
          //   bgcolor: '#0885ff'
          // }
        ]
      },
    }, //data
    options: { type: Object, default: () => ({}) }, //自定义options
    colors: { type: Array, default: colors }, //颜色表
    unit: { type: String, default: '单位：万元' }, //单位
    dataType: { type: String, default: null }, //可选值 date
    labelPosition: { type: String, default: null }, //是否显示label，及label位置 作用于柱状图
    isRow: { type: Boolean, default: false }, //是否为横向，一般作用于柱状图
    hiddenAxisLine: { type: Boolean, default: false }, //是否隐藏轴线
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
      this.formatterX() //补全x轴数据
      this.render() //配置echarts图表
    },
    /* 补全x轴数据 */
    formatterX() {
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
          filter.forEach(v => {
            if (!d.data.find(o => o.name === v)) {
              d.data.push({
                name: v,
                value: null,
              })
            }
          })
          /* 若x轴为日期类型 则按先后顺序排序 */
          if (this.dataType === 'date') {
            d.data.sort((a, b) => a.name.localeCompare(b.name))
          }
        }
      })
    },
    render() {
      const options = {
        legend: {
          selected: this.getLegendSelected(),
          data: this.getLegendData(),
        },
        tooltip: Object.assign(
          {
            trigger: defaultConfig.tooltipTrigger, //'axis'
            backgroundColor: defaultConfig.tooltipBgcolor,
          },
          getTooltipFmt(defaultConfig.tooltipTrigger)
        ),
        xAxis: Object.assign(
          {
            type: this.isRow ? 'value' : 'category',
            data: this.isRow ? null : this.getXAxisData(),
          },
          this.hiddenAxisLine ? hiddenAxis : {}
        ),
        yAxis: Object.assign(
          {
            type: this.isRow ? 'category' : 'value',
            data: this.isRow ? this.getXAxisData() : null,
          },
          this.hiddenAxisLine ? hiddenAxis : {}
        ),
        series: this.getSeries(),
      }
      this.optionsResult = merge(
        {},
        optionsSingleYBase(this.unit), //基本options
        options, //生成的options
        this.options //外部传入的options
      )
    },
    /* 设置图表信息 */
    /* 获取所有图例data */
    getLegendData() {
      let result = []
      if (this.listResult) {
        result = this.listResult.filter(d => d.name && d.name !== 'hidden').map(d => d.name)
      }
      return result
    },
    /* 设置图例默认全选 */
    getLegendSelected() {
      let result = []
      if (this.listResult) {
        result = this.listResult
          .filter(d => d.name && d.name !== 'hidden')
          .reduce((prev, cur) => {
            prev[cur.name] = true
            return prev
          }, {})
      }
      return result
    },
    /* 获取x轴data */
    getXAxisData() {
      let result = null
      if (this.listResult.length > 0) {
        result = this.listResult[0].data.map(d => d.name)
      }
      return result
    },
    /* 设置序列 */
    getSeries() {
      const result = []
      if (this.listResult.length > 0) {
        let hasColorNum = 0
        this.listResult.forEach((item, index) => {
          /* color and bgcolor */
          let color = ''
          if (item.color) {
            color = item.color
            hasColorNum++
          } else {
            color = this.colors[index - hasColorNum]
          }
          const bgcolor = item.bgcolor ? item.bgcolor : color
          /* 单个节点配置 */
          item.data.forEach(d => {
            /* 单位 */
            d.unit = this.unit.split(/:|：/g)[1] || ''
            /* 自定义单个节点的颜色 */
            if (d && d.color) {
              Object.assign(d, {
                itemStyle: {
                  color: d.color,
                },
                emphasis: {
                  itemStyle: {
                    color: d.color,
                  },
                },
              })
            }
            /* 公共信息 */
            if (item.info) {
              d.info = item.info
            }
          })
          /* 横向柱状图颜色渐变 */
          if (item.isGradient) {
            let gradientColor = this.setGradientColor(color, item.data.length)
            item.data.forEach((d, i) => {
              Object.assign(d, {
                itemStyle: {
                  color: gradientColor[i],
                },
                emphasis: {
                  itemStyle: {
                    color: gradientColor[i],
                  },
                },
              })
            })
          }

          result.push(
            merge({}, this.getSerieItem(item, color, bgcolor), {
              data: item.data,
              name: item.name,
            })
          )
        })
      }
      return result
    },
    getSerieItem(item, color, bgcolor) {
      let type = item.type || defaultConfig.seriesType
      let result = null
      switch (type) {
        case 'line':
          result = this.setLine(item, color, bgcolor)
          break
        case 'bar':
          result = this.setBar(item, color)
          break
        case 'scatter':
          result = this.setScatter(item, color)
          break
      }
      return result
    },
    setLine(item, color, bgcolor) {
      let result = cloneDeep(seriesLine)

      /* line相关配置 */
      result.color = color
      result.symbolSize = defaultLineConfig.symbolSize //4
      result.emphasis = {
        itemStyle: {
          borderWidth: 2,
        },
      }

      /* 是否曲线 */
      result.smooth = item.smooth ?? defaultLineConfig.smooth //false

      /* 配置线的样式:solid,dashed,dotted */
      result.lineStyle.type = item.lineType ?? defaultLineConfig.lineType //solid

      /* 是否是阶梯线图 */
      result.step = Boolean(item.isStep)

      /* 配置背景 */
      if (item.withBg) {
        if (!bgcolor) {
          console.error(`${result.name}->缺少背景颜色`)
        } else {
          /* 格式化颜色 */
          if (item.isBgGradient) {
            bgcolor = [setColorOpacity(bgcolor, 1), setColorOpacity(bgcolor, 0.1)]
          }
          /* 背景颜色 */
          result.areaStyle.color = this.setColor(bgcolor)
          /* 背景透明度 */
          result.areaStyle.opacity = item.bgOpaticy ?? defaultLineConfig.bgOpaticy //1
        }
      } else {
        result.areaStyle = null
      }
      /* 配置堆叠serise */
      result.stack = item.stack || defaultLineConfig.stack // null

      return result
    },
    setBar(item, color) {
      let result = cloneDeep(seriesBar)
      /* label */
      result.label = {
        show: Boolean(this.labelPosition),
        position: this.labelPosition,
        color: defaultBarConfig.labelColor, //#333
        fontWeight: defaultBarConfig.labelFontWeight, //bold
        fontSize: defaultBarConfig.labelFonSize, //12
        padding: [5, 0, 5, 0],
      }
      /* 柱子圆角 */
      result.itemStyle.barBorderRadius = item.barRadius || defaultBarConfig.barBorderRadius
      /* 柱子颜色 */
      result.itemStyle.color = this.setColor(color)
      /* 柱子背景 */
      result.showBackground = item.withBg || defaultBarConfig.showBackground
      result.backgroundStyle = {
        color: item.bgcolor || defaultBarConfig.bgcolor,
        barBorderRadius: item.barRadius || defaultBarConfig.barBorderRadius,
      }
      /* 配置堆叠serise */
      result.stack = item.stack || defaultLineConfig.stack // null

      return result
    },
    setScatter(item, color) {
      let result = cloneDeep(seriesScatter)
      /* symbol  */
      result.symbol = item.symbol || defaultScatterConfig.symbol
      /* 配置阴影 */
      if (item.hasShadow) {
        Object.assign(result.itemStyle, {
          shadowBlur: item.shadowBlur || defaultScatterConfig.shadowBlur, //4
          shadowColor: defaultScatterConfig.shadowColor, //rgba(120, 36, 50, 0.5)
          shadowOffsetY: item.shadowOffsetY || defaultScatterConfig.shadowOffsetY, //2
        })
      }
      /* 配置颜色 */
      Object.assign(result.itemStyle, {
        color: this.setColor(color, 'Radial'),
      })
      /* 配置堆叠serise */
      result.stack = item.stack || defaultLineConfig.stack // null
      return result
    },
    setColor(color, type = 'Linear') {
      const colorArr = Array.isArray(color) ? color : [color, color]
      if (type === 'Linear') {
        let derection = [0, 0, 0, 1] // 左 上 右 下
        if (this.isRow) {
          derection = [0, 0, 1, 0]
        }
        return new ECharts.graphic.LinearGradient(...derection, [
          {
            offset: 0,
            color: colorArr[0],
          },
          {
            offset: 1,
            color: colorArr[1],
          },
        ])
      } else if (type === 'Radial') {
        return new ECharts.graphic.RadialGradient(0.4, 0.3, 1, [
          {
            offset: 0,
            color: colorArr[0],
          },
          {
            offset: 1,
            color: colorArr[1],
          },
        ])
      } else {
        return Array.isArray(color) ? color[0] : color
      }
    },
    setGradientColor(color, length) {
      let result = []
      for (let i = 0; i < length; i++) {
        result.push(setColorOpacity(color, ((i + 1) / length).toFixed(2)))
      }
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
.xy-chart-single-y {
  font-size: inherit;
  width: 100%;
  height: 100%;
}
</style>
