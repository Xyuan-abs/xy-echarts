import Vue from 'vue'
import App from './App.vue'

import router from './router'
import '@/style/index.scss'

Vue.config.productionTip = false

/* echarts vue-echarts按需引入 */
import 'echarts'

/* 按需引入 */
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'

// import XyEcharts from '../packages/index'
// console.log(XyEcharts)
// Vue.use(XyEcharts)

import XyEcharts from '../packages/index'
let { Line, Base, SingleY, AngleBar, Pie, PieNested, PieRose, PieYujue } = XyEcharts
Vue.use(Base)
Vue.use(Line)
Vue.use(SingleY)
Vue.use(AngleBar)
Vue.use(Pie)
Vue.use(PieNested)
Vue.use(PieRose)
Vue.use(PieYujue)

// import { Line } from '../packages/index'
// console.log(Line)
// Vue.use(Line)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
