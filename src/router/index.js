import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '../views/home/index.vue'
import Layout from '../views/layout/index.vue'
import Article from '@/views/article/index.vue'
import Image from '@/views/image/index.vue'
import Publish from '@/views/publish/index.vue'
import Comment from '@/views/comment/index.vue'
import Settings from '@/views/settings/index.vue'
import Fans from '@/views/fans/index.vue'
import Service from '@/views/service/index.vue'
import Company from '@/views/company/index.vue'
import Echarts from '@/views/echarts/index.vue'
import TestBox from '@/views/testbox/index.vue'

Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/',
    component: Layout,
    // path 为空时 会默认渲染为子路由 有子路由时就不要给父路由起名字了
    children: [
      { path: '', name: 'home', component: Home },
      { path: '/article', name: 'article', component: Article },
      { path: '/image', name: 'image', component: Image },
      { path: '/publish', name: 'publish', component: Publish },
      { path: '/comment', name: 'comment', component: Comment },
      { path: '/settings', name: 'settings', component: Settings },
      { path: '/fans', name: 'fans', component: Fans },
      { path: '/service', name: 'service', component: Service },
      { path: '/company', name: 'company', component: Company },
      { path: '/echarts', name: 'echarts', component: Echarts },
      { path: '/testbox', name: 'testbox', component: TestBox }
    ]
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, form, next) => {
//   const user = JSON.parse(sessionStorage.getItem('token'))
//   if (to.path !== '/login') {
//     if (user) {
//       next()
//     } else {
//       next('/login')
//     }
//   }
// })
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
