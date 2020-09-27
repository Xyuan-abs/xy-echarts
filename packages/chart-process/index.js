import Process from './src/main'

Process.install = function(Vue) {
  Vue.component(Process.name, Process)
}

export default Process
