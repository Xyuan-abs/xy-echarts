<!--
名称：xy-chart-pie-yujue
版本：1.0.0
作者：谢元将
时间：2020年8月31日10:24:34

-->
<template>
  <div class="xy-chart-pie-yujue">
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
  name: 'XyChartPieYujue',
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
    bgColor: { type: String, default: '#C0C4CC' },
    showLegend: { type: Boolean, default: true }, //是否显示legend
    legendPosition: { type: String, default: 'left' }, //legend位置
    unit: { type: String, default: '单位：万元' }, //单位
    noDataMessage: { type: String, default: '暂无数据' }, //没有数据时显示的提示文字
  },
  data() {
    return {
      optionsResult: {},
      listResult: [],
      max: 0,
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
      if (this.listResult.length) {
        this.max = this.listResult[0].data.reduce((prev, cur) => {
          return prev + cur.value
        }, 0)
      }
      this.render() //配置echarts图表
    },
    render() {
      const options = {
        color: this.colors,
        grid: {
          left: '50%',
          bottom: '45%',
        },
        tooltip: Object.assign(
          {
            show: true,
            trigger: 'item', //'axis'
          },
          getTooltipFmt('item')
        ),
        legend: {
          show: this.showLegend,
          selectedMode: false,
          data: this.getLegendData(),
        },
        xAxis: [
          {
            show: false,
          },
        ],
        yAxis: [
          {
            type: 'category',
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            left: 'center',
            top: 'center',
            axisLabel: {
              show: true,
              interval: 0,
              inside: true,
              verticalAlign: 'center',
              fontSize: 12,
              lineHeight: 14,
              color: '#8996a9',
              formatter: (params, i) => {
                if (params === '') {
                  return ''
                } else {
                  let index = Math.floor(i / 2)
                  let item = this.listResult[0].data[index]
                  return (
                    item.label ||
                    `${item.name} ${item.value + this.unit?.split(/:|：/)[1]} ${(
                      (item.value / this.max) *
                      100
                    ).toFixed(2)}%`
                  )
                }
              },
            },
            data: this.getyAxisData(),
          },
        ],
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
      if (this.list.length) {
        result = this.list[0].data.map(d => d.name)
      }
      return result
    },
    getyAxisData() {
      return this.listResult?.[0].data.reduce((prev, cur) => {
        return prev.concat(['', cur.value])
      }, [])
    },
    getSeries() {
      if (this.listResult.length === 0) return false
      let range = [0, 80]
      let length = this.listResult[0].data.length * 2
      let step = ((range[1] - range[0]) / length).toFixed(2)
      let result = this.listResult[0].data.map((d, i) => {
        return {
          name: this.listResult[0].name,
          type: 'pie',
          hoverAnimation: false, //鼠标移入变大
          radius: [range[0] + step * (2 * i + 1) + '%', range[0] + step * (2 * i + 2) + '%'],
          center: ['50%', '55%'],
          avoidLabelOverlap: false,
          startAngle: 90,
          clockwise: false,
          label: {
            show: false,
          },
          emphasis: {
            itemStyle: {
              color: this.colors[i],
            },
          },
          data: this.getSeriesData(i),
        }
      })

      return result
    },
    getSeriesData(i) {
      let item = this.listResult[0].data[i]
      return [
        item,
        {
          name: '',
          value: this.max - item.value - this.max / 4,
          itemStyle: {
            color: this.bgColor,
          },
          emphasis: {
            itemStyle: {
              color: this.bgColor,
            },
          },
          cursor: 'default',
          tooltip: {
            show: false,
          },
        },
        {
          name: '',
          value: this.max / 4,
          itemStyle: {
            color: 'transparent',
          },
          emphasis: {
            itemStyle: {
              color: 'transparent',
            },
          },
          cursor: 'default',
          tooltip: {
            show: false,
          },
        },
      ]
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
.xy-chart-pie-yujue {
  font-size: inherit;
  width: 100%;
  height: 100%;
}
</style>
