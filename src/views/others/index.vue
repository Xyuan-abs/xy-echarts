<template>
  <div class="others flex">
    <card-panel :title="'AngleBar'">
      <xy-chart-angle-bar :list="AngleBarList"></xy-chart-angle-bar>
    </card-panel>
    <card-panel :title="'Radar'" class="radar">
      <xy-chart-radar :list="RadarList"></xy-chart-radar>
    </card-panel>
  </div>
</template>

<script>
import CardPanel from '@/components/CardPanel'
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
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.others {
  ::v-deep .radar {
    .content {
      // width: 600px;
    }
  }
}
</style>
