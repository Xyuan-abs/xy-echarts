<template>
  <div id="app">
    <div class="box">
      <xy-chart-line :list="list"></xy-chart-line>
    </div>
    <div class="box">
      <xy-chart-base :options="options" :has-data="true"></xy-chart-base>
    </div>
    <div class="box">
      <xy-chart-single-y :list="list">
        <template v-slot:empty>
          11111
        </template>
      </xy-chart-single-y>
    </div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      list: [
        {
          name: '平均',
          data: [
            { name: '1月', value: 10 },
            { name: '2月', value: 14 },
            { name: '3月', value: 9 },
            { name: '4月', value: 14 },
          ],
          type: 'line',
        },
      ],
      options: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {},
          },
        ],
      },
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .box {
    height: 300px;
    width: 400px;
  }
}
</style>
