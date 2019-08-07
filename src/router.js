import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Home from './views/Home.vue'
import Welcome from './views/content/Welcome.vue'
import YsReview from './views/content/YsReview.vue'
import YsUnreview from './views/content/YsUnreview.vue'
import YaosReview from './views/content/YaosReview.vue'
import YaosUnreview from './views/content/YaosUnreview.vue'
import AddMedicine from './views/content/AddMedicine.vue'
import CfdPrint from './views/content/CfdPrint.vue'
import Statis from './views/content/Statis.vue'

import store from './store'
Vue.use(Router)

// export default new Router({
//   routes: 
// })

let constRouter = [
  {
    path: '/',
    name: '登录页',
    component: Index
  },
  {
    path: '/home',
    name: '首页',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'index',
        component: Welcome,
      },
      {
        path: 'ysreview',
        name: '已审核医师',
        component: YsReview,
      },
      {
        path: 'ysunreview',
        name: '未审核医师',
        component: YsUnreview,
      },
      {
        path: 'yaosreview',
        name: '已审核医师',
        component: YaosReview,
      },
      {
        path: 'yaosunreview',
        name: '未审核医师',
        component: YaosUnreview,
      },
      {
        path: 'medicine',
        name: '增加药品',
        component: AddMedicine,
      },
      {
        path: 'cfd',
        name: '处方單',
        component: CfdPrint,
      },
      {
        path: 'statis',
        name: '统计',
        component: Statis,
      },
      {
        path: 'settings',
        name: '设置',
        component: Welcome,
      },
    ],
  }
]

let router = new Router({
  routes: constRouter
})

const whiteList = '/'

//let asyncRouter

// 导航守卫，渲染动态路由
router.beforeEach((to, from, next) => {
  if (whiteList === to.path) {
    next()
  }
  let token = store.state.token
  if (token.length) {
    next(true)
  } else {
    next('/')
  }
});

// function go (to, next) {
//   asyncRouter = filterAsyncRouter(asyncRouter)
//   router.addRoutes(asyncRouter)
//   next({...to, replace: true})
// }

// function save (name, data) {
//   localStorage.setItem(name, JSON.stringify(data))
// }

// function get (name) {
//   return JSON.parse(localStorage.getItem(name))
// }

// function filterAsyncRouter (routes) {
//   return routes.filter((route) => {
//     let component = route.component
//     if (component) {
//       switch (route.component) {
//         case 'MenuView':
//           route.component = MenuView
//           break
//         case 'PageView':
//           route.component = PageView
//           break
//         case 'EmptyPageView':
//           route.component = EmptyPageView
//           break
//         case 'HomePageView':
//           route.component = HomePageView
//           break
//         default:
//           route.component = view(component)
//       }
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children)
//       }
//       return true
//     }
//   })
// }

// function view (path) {
//   return function (resolve) {
//     import(`@/views/${path}.vue`).then(mod => {
//       resolve(mod)
//     })
//   }
// }

export default router
