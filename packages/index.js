import Base from './chart-base'
import SingleY from './chart-single-y'
import AngleBar from './chart-angle-bar'
import Pie from './chart-pie'
import PieNested from './chart-pie-nested'
import PieRose from './chart-pie-rose'
import PieYujue from './chart-pie-yujue'
import Radar from './chart-radar'
import Treemap from './chart-treemap'
import Process from './chart-process'

/* echarts vue-echarts引入 */
import 'echarts'
/* 按需引入 */

const components = [
  Base,
  SingleY,
  AngleBar,
  Pie,
  PieNested,
  PieRose,
  PieYujue,
  Radar,
  Treemap,
  Process,
]

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
  SingleY,
  AngleBar,
  Pie,
  PieNested,
  PieRose,
  PieYujue,
  Radar,
  Treemap,
  Process,
}
