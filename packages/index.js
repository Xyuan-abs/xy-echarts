import Base from './chart-base'
import Line from './chart-line'
import SingleY from './chart-single-y'

/* echarts vue-echarts按需引入 */
import 'echarts'
/* 按需引入 */
import 'echarts/lib/chart/line'

const components = [Base, Line, SingleY]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Base,
  Line,
  SingleY,
}
