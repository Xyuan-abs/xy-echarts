import AngleBar from './src/main'

AngleBar.install = function(Vue) {
  Vue.component(AngleBar.name, AngleBar)
}

export default AngleBar
