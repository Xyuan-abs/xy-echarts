<template>
  <div class="others flex">
    <card-panel :title="'AngleBar'" :code="AngleBarList">
      <xy-chart-angle-bar :list="AngleBarList"></xy-chart-angle-bar>
    </card-panel>
    <card-panel :title="'Radar'" class="radar" :code="RadarList">
      <xy-chart-radar :list="RadarList"></xy-chart-radar>
    </card-panel>
    <card-panel :title="'Treemap'" class="radar" :code="TreemapList">
      <xy-chart-treemap :list="TreemapList"></xy-chart-treemap>
    </card-panel>
    <card-panel :title="'process'" class="process" :code="ProcessList">
      <xy-chart-process :list="ProcessList"></xy-chart-process>
    </card-panel>
  </div>
</template>

<script>
import CardPanel from '@/components/CardPanel'

let date = Number(new Date().getTime())

export default {
  name: 'Others',
  props: {},
  components: { CardPanel },
  data() {
    return {
      AngleBarList: [
        {
          name: 'ceshi',
          data: [
            { name: '1月', value: 7 },
            { name: '2月', value: 10 },
            { name: '3月', value: 13 },
            { name: '4月', value: 10 },
          ],
        },
      ],
      RadarList: [
        {
          name: 'ceshi',
          data: [
            { name: '1月', value: 7 },
            { name: '2月', value: 11 },
            { name: '3月', value: 3 },
            { name: '4月', value: 10 },
            { name: '5月', value: 10 },
          ],
        },
        {
          name: 'ceshi2',
          data: [
            { name: '1月', value: 1 },
            { name: '2月', value: 10 },
            { name: '3月', value: 15 },
            { name: '4月', value: 1 },
            { name: '6月', value: 15 },
          ],
        },
      ],
      TreemapList: [
        {
          name: '测试',
          data: [
            { name: '1月', value: 7 },
            { name: '2月', value: 11 },
            { name: '3月', value: 3 },
            { name: '4月', value: 10 },
            { name: '5月', value: 10 },
          ],
        },
      ],
      ProcessList: [
        {
          name: '状态1',
          data: [
            { name: 'categoryA', value: [1000, date + 1000, date + 1000 * 2] },
            { name: 'categoryA', value: [1000, date + 1000 * 4, date + 1000 * 5] },
            { name: 'categoryB', value: [1000, date + 1000, date + 1000 * 2] },
            { name: 'categoryC', value: [1000, date + 1000, date + 1000 * 2] },
          ],
        },
        {
          name: '状态2',
          data: [
            { name: 'categoryA', value: [1000, date + 1000 * 7, date + 1000 * 8] },
            { name: 'categoryB', value: [1000, date + 1000 * 4, date + 1000 * 5] },
            { name: 'categoryC', value: [1000, date + 1000 * 3, date + 1000 * 4] },
            { name: 'categoryD', value: [1000, date + 1000 * 3, date + 1000 * 4] },
          ],
        },
      ],
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.others {
  ::v-deep .process {
    .content {
      width: 815px;
    }
  }
}
</style>
