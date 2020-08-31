import PieNested from './src/main'

PieNested.install = function(Vue) {
  Vue.component(PieNested.name, PieNested)
}

export default PieNested
