// 1. 基于 axios 封装的请求模块
import axios from 'axios'

// 2. 创建一个 axios 实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
})

// 3 导出请求方法
export default request
// 谁要使用就加载request 模块
