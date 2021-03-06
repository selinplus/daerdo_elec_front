import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Home from './views/Home.vue'
import Welcome from './views/content/Welcome.vue'
import YsUnreview from './views/content/YsUnreview.vue'
import YaosUnreview from './views/content/YaosUnreview.vue'
import MedicineMgr from './views/content/MedicineMgr.vue'
import CfdPrint from './views/content/CfdPrint.vue'
import Statis from './views/content/Statis.vue'
import MendianMgr from './views/content/MendianMgr.vue'
import Setting from './views/content/Setting.vue'
import MidMedicineMgr from './views/content/MidMedicineMgr.vue'
import MendianGroupMgr from './views/content/MendianGroupMgr.vue'
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
        path: 'ysunreview',
        name: '医师管理',
        component: YsUnreview,
      },     
      {
        path: 'yaosunreview',
        name: '药师管理',
        component: YaosUnreview,
      },
      {
        path: 'medicine',
        name: '药品管理',
        component: MedicineMgr,
      },
      {
        path: 'midmedicine',
        name: '中药材管理',
        component: MidMedicineMgr,
      },
      {
        path: 'cfd',
        name: '处方單',
        component: CfdPrint,
      },
      {
        path: 'mendian',
        name: '药店管理',
        component: MendianMgr,
      },
      {
        path: 'mgroup',
        name: '药店分组',
        component: MendianGroupMgr,
      },
      {
        path: 'statis',
        name: '统计',
        component: Statis,
      },
      {
        path: 'settings',
        name: '设置',
        component: Setting,
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
