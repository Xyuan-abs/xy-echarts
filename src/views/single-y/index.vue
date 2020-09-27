<template>
  <div class="single-y flex">
    <card-panel v-for="(d, i) in list" :key="i" :code="d">
      <xy-chart-single-y
        :list="d"
        :is-row="d[0].isRow"
        :unit="unit"
        :hidden-axis-line="d[0].hiddenAxisLine"
      ></xy-chart-single-y>
    </card-panel>
  </div>
</template>

<script>
import CardPanel from '@/components/CardPanel'

export default {
  name: 'SingleY',
  props: {
    msg: String,
  },
  components: { CardPanel },
  data() {
    return {
      unit: '单位：个',
      list: [
        [
          {
            name: 'line',
            data: [
              { name: '1月', value: 7 },
              { name: '2月', value: 10 },
              { name: '3月', value: 13 },
              { name: '4月', value: 10 },
              { name: '5月', value: 13 },
              { name: '6月', value: 10 },
            ],
            type: 'line',
            smooth: false,
          },
          {
            name: 'lineSmooth',
            data: [
              { name: '1月', value: 10 },
              { name: '2月', value: 13 },
              { name: '3月', value: 10 },
              { name: '4月', value: 7 },
            ],
            type: 'line',
            smooth: true,
          },
          {
            name: 'lineStep',
            data: [
              { name: '1月', value: 10 },
              { name: '2月', value: 13 },
              { name: '3月', value: 10 },
              { name: '4月', value: 7 },
            ],
            type: 'line',
            isStep: true,
          },
        ],
        [
          {
            name: 'lineSolid',
            data: [
              { name: '1月', value: 11 },
              { name: '2月', value: 15 },
              { name: '3月', value: 10 },
              { name: '4月', value: 15 },
            ],
            type: 'line',
            lineType: 'solid',
          },
          {
            name: 'lineDashed',
            data: [
              { name: '1月', value: 10 },
              { name: '2月', value: 14 },
              { name: '3月', value: 9 },
              { name: '4月', value: 14 },
            ],
            type: 'line',
            lineType: 'dashed',
          },
          {
            name: 'lineDotted',
            data: [
              { name: '1月', value: 9 },
              { name: '2月', value: 13 },
              { name: '3月', value: 8 },
              { name: '4月', value: 13 },
            ],
            type: 'line',
            lineType: 'dotted',
          },
        ],
        [
          {
            name: 'lineBgGraditent',
            data: [
              { name: '1月', value: 10 },
              { name: '2月', value: 14 },
              { name: '3月', value: 9 },
              { name: '4月', value: 14 },
            ],
            type: 'line',
            withBg: true,
            isBgGradient: true,
          },
        ],
        [
          {
            name: 'bar',
            data: [
              { name: '1月', value: 10 },
              { name: '2月', value: 14 },
              { name: '3月', value: 9 },
              { name: '4月', value: 14 },
            ],
            type: 'bar',
          },
          {
            name: 'barWithBg',
            data: [
              { name: '1月', value: 10 },
              { name: '2月', value: 14 },
              { name: '3月', value: 9 },
              { name: '4月', value: 14 },
            ],
            type: 'bar',
            withBg: true,
          },
          {
            name: 'barWithInsBg',
            data: [
              { name: '1月', value: 10 },
              { name: '2月', value: 14 },
              { name: '3月', value: 9 },
              { name: '4月', value: 14 },
            ],
            type: 'bar',
            withBg: true,
            bgcolor: '#E6A23C99',
          },
        ],
        [
          {
            name: 'barRow',
            data: [
              { name: '1月', value: 10, color: '#0885ff' },
              { name: '2月', value: 14, color: '#ff9c26' },
              { name: '3月', value: 9, color: '#00cea6' },
              { name: '4月', value: 14, color: '#0885ff' },
            ],
            type: 'bar',
            isRow: true,
            hiddenAxisLine: true,
            withBg: true,
            // bgcolor: '#0885ffaf',
          },
        ],
        [
          {
            name: 'barGradient',
            data: [
              { name: '1月', value: 10, color: '#0885ff' },
              { name: '2月', value: 14, color: '#ff9c26' },
              { name: '3月', value: 9, color: '#00cea6' },
              { name: '4月', value: 14, color: '#0885ff' },
            ],
            type: 'bar',
            isRow: true,
            withBg: true,
            isBarsGradient: true,
          },
        ],
        [
          {
            name: 'barRadius',
            data: [
              { name: '1月', value: 10 },
              { name: '2月', value: 14 },
              { name: '3月', value: 9 },
              { name: '4月', value: 14 },
            ],
            type: 'bar',
            barRadius: 20,
          },
          {
            name: 'barGradient',
            data: [
              { name: '1月', value: 10 },
              { name: '2月', value: 14 },
              { name: '3月', value: 9 },
              { name: '4月', value: 14 },
            ],
            type: 'bar',
            color: ['#ff9c26', '#00e2b6'],
          },
        ],
        [
          {
            name: 'scatter',
            data: [
              { name: '1月', value: 10 },
              { name: '2月', value: 14 },
              { name: '3月', value: 9 },
              { name: '4月', value: 14 },
            ],
            type: 'scatter',
          },
          {
            name: 'scatterHasShadow',
            data: [
              { name: '1月', value: 8 },
              { name: '2月', value: 12 },
              { name: '3月', value: 7 },
              { name: '4月', value: 13 },
            ],
            type: 'scatter',
            color: '#0adfb0',
            hasShadow: true,
          },
        ],
        [
          {
            name: 'scatterSymbolSize',
            data: [
              { name: '1月', value: 8, symbolSize: 8 },
              { name: '2月', value: 12, symbolSize: 12 },
              { name: '3月', value: 7, symbolSize: 7 },
              { name: '4月', value: 13, symbolSize: 13 },
            ],
            type: 'scatter',
            hasShadow: true,
          },
        ],
        [
          {
            name: 'pictorialBar',
            data: [
              { name: '1月', value: 8 },
              { name: '2月', value: 12 },
              { name: '3月', value: 7 },
              { name: '4月', value: 13 },
            ],
            type: 'pictorialBar',
            color: ['#ff9c26', '#00e2b6'],
            isGradient: true,
          },
        ],
      ],
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.single-y {
}
</style>
