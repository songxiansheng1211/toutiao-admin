// 1. 基于 axios 封装的请求模块
import axios from 'axios'

// 2. 创建一个 axios 实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
})

// 请求拦截器
// 所有请求会经过这里
request.interceptors.request.use(config => {
  // 我们可以再请求发出去之前 定制统一的业务功能处理
  // 例如： 统一设置token  我们在点击登录的时候保存token这里使用
  // 最后必须 return config
  const user = JSON.parse(sessionStorage.getItem('token'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

// 3 导出请求方法
export default request
// 谁要使用就加载request 模块
