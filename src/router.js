import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Home from './views/Home.vue'
import Welcome from './views/content/Welcome.vue'
import Yishi from './views/content/Yishi.vue'
import db from './utils/localstorage'
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
          path: 'yishi',
          name: '审核',
          component: Yishi,
        },
        {
          path: 'query',
          name: '查询',
          component: Yishi,
        },
        {
          path: 'statis',
          name: '统计',
          component: Yishi,
        },
        {
          path: 'settings',
          name: '设置',
          component: Yishi,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
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
  let token = db.get('token')
  // let user = db.get('USER')
  // let userRouter = get('USER_ROUTER')
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
