import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/base/List'
import WaterDetail from '@/components/water/WaterDetail'
import waterOriginDetail from '@/components/waterOrigin/waterOriginDetail'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '水资源'
      }
    },
    {
      path: '/water',
      name: 'water',
      component: List,
      meta: {
        title: '取水户取水信息'
      }
    },
    {
      path: '/water/:id',
      name: 'waterDetail',
      props: (route) => {
        return {
          id: route.params.id,
          name: route.name
        }
      },
      component: WaterDetail,
      meta: {
        title: '水位信息'
      }
    },
    {
      path: '/waterOrigin',
      name: 'waterOrigin',
      component: List,
      meta: {
        title: '水源地'
      }
    },
    {
      path: '/waterOrigin/:id',
      name: 'rainDetail',
      props: (route) => {
        return {
          id: route.params.id,
          name: route.name
        }
      },
      component: waterOriginDetail,
      meta: {
        title: '雨位信息'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let title
  if (to.meta && to.meta.title) {
    title = to.meta.title
    if (to.query && to.query.title) {
      title = to.query.title + title
    }
    document.title = title
  }
  next()
})

export default router
