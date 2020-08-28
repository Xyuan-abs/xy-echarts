import ChartBase from './src/main'

ChartBase.install = function(Vue) {
  Vue.component(ChartBase.name, ChartBase)
}

export default ChartBase
