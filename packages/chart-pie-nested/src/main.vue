<!--
名称：xy-chart-pie-nested
版本：1.0.0
作者：谢元将
时间：2020年8月31日10:24:34

-->
<template>
  <div class="xy-chart-pie-nested">
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
  name: 'XyChartPieNested',
  components: {
    XyChartBase,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [
          // {
          //   name: 'listNested',
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
          //     {
          //       name: '2月iner',
          //       value: 10,
          //       children: [
          //         { name: '2月outer1', value: 3 },
          //         { name: '2月outer2', value: 3 },
          //         { name: '2月outer3', value: 4 },
          //       ],
          //     },
          //     {
          //       name: '3月iner',
          //       value: 13,
          //       children: [
          //         { name: '3月outer1', value: 5 },
          //         { name: '3月outer2', value: 5 },
          //         { name: '3月outer3', value: 3 },
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
        'hsl(210, 100%, 51.6%)',
        'hsl(3, 100.0%, 68.4%)',
        'hsl(32, 92.2%, 54.7%)',
        'hsl(126, 75.4%, 46.3%)',
        'hsl(168, 100.0%, 37.1%)',
        'hsl(187, 100.0%, 41.6%)',
      ],
    }, //颜色表  link模式只支持hsl格式
    isLink: { type: Boolean, default: true }, //内外颜色是否同一色系
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
          orient: 'vertical',
          left: this.legendPosition,
          data: this.getLegendData(),
        },
        series: [
          {
            name: this.listResult[0].name,
            type: 'pie',
            radius: [0, '40%'],
            label: {
              position: 'inner',
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2,
            },
            data: this.getSeriesData('inner'),
          },
          {
            name: '',
            type: 'pie',
            radius: ['50%', '68%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: true,
            label: {
              show: true,
              fontWeight: 'bold',
              lineHeight: 14,
              formatter(val) {
                return val.data.label || val.name + '\n' + val.percent + '%'
              },
            },
            labelLine: {
              normal: {
                show: true,
                lineStyle: {
                  width: 2,
                },
              },
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2,
            },
            data: this.getSeriesData('outer'),
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
        let inner = this.list[0].data.map(d => d.name)
        let outer = this.list[0].data.reduce((prev, cur) => {
          return prev.concat(cur.children.map(d => d.name))
        }, [])
        result = inner.concat(outer)
      }
      return result
    },
    getSeriesData(type) {
      let result = []
      if (type === 'outer') {
        if (this.isLink) {
          let index = 0
          result = this.listResult[0].data.reduce((prev, cur) => {
            let colors = this.setGradientColor(this.colors[index], cur.children.length)
            let arr = cur.children.map((d, i) =>
              Object.assign({}, d, {
                itemStyle: {
                  color: colors[i],
                },
                emphasis: {
                  itemStyle: {
                    color: colors[i],
                  },
                  labelLine: {
                    lineStyle: {
                      color: colors[i],
                    },
                  },
                },
              })
            )
            index++
            return prev.concat(arr)
          }, [])
        } else {
          result = this.listResult[0].data.reduce((prev, cur) => {
            let arr = cur.children.map(d => d)
            return prev.concat(arr)
          }, [])
        }
      } else if (type === 'inner') {
        result = this.listResult[0].data
      }
      return result
    },
    setGradientColor(color, length) {
      if (!color.startsWith('hsl(')) {
        console.error('PieNested link模型的colors目前只支持hsl格式')
        return new Array(length).fill(color)
      }
      let [h, s, l] = color.split(',')
      let lnum = Number(l.split('%)')[0])

      let step = ((100 - lnum) / length).toFixed(2)
      let result = []
      for (let i = 0; i < length; i++) {
        let hsl = `${h},${s},${(lnum + step * i).toFixed(2)}%)`
        result.push(hsl)
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
.xy-chart-pie-nested {
  font-size: inherit;
  width: 100%;
  height: 100%;
}
</style>
