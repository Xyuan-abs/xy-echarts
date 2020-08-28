<!--
名称：xy-chart-line
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
        bgOpacity:1,//背景透明度
        isBgGradient:false,//背景颜色是否渐变 当boColor部位数组时生效
        info:{},//其他信息

        // 以下为line配置
        smooth:false, // 是否为曲线
        isStep: true, //是否成阶梯状
        lineType: 'solid', // line的类型: solid,dashed,dotted
      }]
-->
<template>
  <div class="xy-chart-line">
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

import { colors, seriesLine } from '../../../utils/echartsCommon'
import {
  optionsLineBase,
  //  getTooltipFmt
} from '../../../utils/echartsConfig'
import { setColorOpacity } from '../../../utils/common'

/* lodash 按需引入 */
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

/* 默认配置 */
const defaultConfig = {
  symbolSize: 4, //线节点圆圈大小
  lineType: 'solid', // line的类型（虚线、实线、点线）
  smooth: false, //曲线
  bgOpaticy: 1, //背景透明度
  stack: null, //堆叠分组名
  tooltipBgcolor: 'rgba(51,51,51,0.98)', //tooltip背景颜色
  tooltipTrigger: 'axis', //tooltip触发方式
}

export default {
  name: 'XyChartLine',
  components: {
    XyChartBase,
  },
  props: {
    title: { type: String, default: null },
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
    },
    options: { type: Object, default: () => ({}) },
    showLegend: { type: Boolean, default: true },
    unit: { type: String, default: '单位：万元' },
    dataType: { type: String, default: null }, //可选值 date
    noDataMessage: { type: String, default: '暂无数据' },
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
        title: {
          show: Boolean(this.title),
          text: this.title,
        },
        legend: {
          show: this.showLegend,
          selected: this.getLegendSelected(),
          data: this.getLegendData(),
        },
        // tooltip: Object.assign({}, getTooltipFmt(defaultConfig.tooltipTrigger), {
        //   trigger: defaultConfig.tooltipTrigger, //'axis
        //   axisPointer: {
        //     type: 'none',
        //   },
        //   backgroundColor: defaultConfig.tooltipBgcolor,
        // }),
        // tooltip:{},
        xAxis: {
          data: this.getXAxisData(),
        },
        series: this.getSeries(),
      }
      this.optionsResult = merge(
        {},
        optionsLineBase(this.unit), //基本options
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
            color = colors[index - hasColorNum]
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
              })
            }
            /* 公共信息 */
            if (item.info) {
              d.info = item.info
            }
          })
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
      let result = cloneDeep(seriesLine)

      /* line相关配置 */
      result.color = color
      result.symbolSize = defaultConfig.symbolSize //4
      result.emphasis = {
        itemStyle: {
          borderWidth: 2,
        },
      }

      /* 是否曲线 */
      result.smooth = item.smooth ?? defaultConfig.smooth //false

      /* 配置线的样式:solid,dashed,dotted */
      result.lineStyle.type = item.lineType ?? defaultConfig.lineType //solid

      /* 是否是阶梯线图 */
      result.step = Boolean(item.isStep)

      /* 配置背景 */
      if (item.withBg) {
        if (!bgcolor) {
          console.error(`${result.name}->缺少背景颜色`)
        } else {
          /* 格式化颜色 */
          let colorArr = []
          if (Array.isArray(bgcolor)) {
            colorArr = bgcolor
          } else {
            if (item.isBgGradient) {
              colorArr = [setColorOpacity(bgcolor, 1), setColorOpacity(bgcolor, 0.1)]
            } else {
              colorArr = [bgcolor, bgcolor]
            }
          }

          /* 背景颜色 */
          result.areaStyle.color = new ECharts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colorArr[0],
            },
            {
              offset: 1,
              color: colorArr[1],
            },
          ])

          /* 背景透明度 */
          result.areaStyle.opacity = item.bgOpaticy ?? defaultConfig.bgOpaticy //1
        }
      } else {
        result.areaStyle = null
      }
      /* 配置堆叠serise */
      result.stack = item.stack || defaultConfig.stack // null

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
.xy-chart-line {
  font-size: inherit;
  width: 100%;
  height: 100%;
}
</style>
