import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '../views/home/index.vue'
import Layout from '../views/layout/index.vue'
import User from '@/views/user/index.vue'
import Org from '@/views/org/index.vue'
import Record from '@/views/record/index.vue'
import Type from '@/views/type/index.vue'
import Register from '@/views/register/index.vue'
import Report from '@/views/report/index.vue'
import Check from '@/views/check/index.vue'
import Registe from '@/views/login/registe.vue'
Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  { path: '/registe', name: 'registe', component: Registe },
  {
    path: '/',
    component: Layout,
    // path 为空时 会默认渲染为子路由 有子路由时就不要给父路由起名字了
    children: [
      { path: '/', name: 'home', component: Home },
      { path: '/user', name: 'user', component: User },
      { path: '/org', name: 'org', component: Org },
      { path: '/record', name: 'record', component: Record },
      { path: '/type', name: 'type', component: Type },
      { path: '/register', name: 'register', component: Register },
      { path: '/report', name: 'report', component: Report },
      { path: '/check', name: 'check', component: Check }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/registe') return next()
  // 获取token
  const tokenStr = sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
