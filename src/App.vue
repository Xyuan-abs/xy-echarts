<template>
  <div id="app">
    <Head />
    <div class="app-container">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </div>
  </div>
</template>

<script>
import Head from '@/views/Head'
export default {
  name: 'App',
  components: { Head },
  computed: {
    routers() {
      return this.$router.options.routes.filter(d => d.hidden !== true)
    },
    key() {
      return this.$route.path
    },
  },
  data() {
    return {
      active: 0,
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
  mounted() {},
  methods: {
    click(d, i) {
      this.active = i
      this.$router.push({
        path: d.path,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: hidden;
  .app-container {
    margin-top: 40px;
    padding: 12px 8px;
    > .flex {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-flow: row wrap;
    }
  }
}
</style>
