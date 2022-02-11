import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '../views/home/index.vue'
import Layout from '../views/layout/index.vue'
import User from '@/views/user/index.vue'
import Org from '@/views/org/index.vue'
import Personnel from '@/views/personnel/index.vue'
import Settings from '@/views/settings/index.vue'
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
      { path: '/user', name: 'user', component: User },
      { path: '/org', name: 'org', component: Org },
      { path: '/personnel', name: 'personnel', component: Personnel },
      { path: '/settings', name: 'settings', component: Settings }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
