<template>
  <div class="bar flex">
    <card-panel :title="'AngleBar'">
      <xy-chart-angle-bar :list="list"></xy-chart-angle-bar>
    </card-panel>
  </div>
</template>

<script>
import CardPanel from '@/components/CardPanel'
export default {
  name: 'Bar',
  props: {},
  components: { CardPanel },
  data() {
    return {
      list: [
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
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bar {
}
</style>
