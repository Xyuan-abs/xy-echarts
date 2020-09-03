import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  {
    path: '/',
    redirect: '/singleY',
    hidden: true,
  },
  {
    path: '/singleY',
    component: () => import('@/views/single-y'),
    mate: {
      title: 'SingleY',
    },
  },
  {
    path: '/pie',
    component: () => import('@/views/pie'),
    mate: {
      title: 'Pie',
    },
  },
  {
    path: '/others',
    component: () => import('@/views/others'),
    mate: {
      title: 'Others',
    },
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0,
    }),
    routes,
  })

const router = createRouter()
export default router
