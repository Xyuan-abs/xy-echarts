import Base from './chart-base'
import SingleY from './chart-single-y'
import AngleBar from './chart-angle-bar'
import Pie from './chart-pie'
import PieNested from './chart-pie-nested'
import PieRose from './chart-pie-rose'
import PieYujue from './chart-pie-yujue'

/* echarts vue-echarts按需引入 */
import 'echarts'
/* 按需引入 */
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/pie'

const components = [Base, SingleY, AngleBar, Pie, PieNested, PieRose, PieYujue]

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
}
