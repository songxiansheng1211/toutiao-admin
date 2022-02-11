import request from '@/utils/request'

// export const login = data => {
//   return request({
//     method: 'POST',
//     url: '/mp/v1_0/authorizations',
//     data
//   })
// }
export const login = (params) => {
  return request({
    method: 'GET',
    url: '/login/login',
    params
  })
}

// export const getUserInfo = () => {
// 此时我们需要拿到里面的token 再把数据转为数据对象 点 出token
// const user = JSON.parse(sessionStorage.getItem('token'))
// return request({
// method: 'GET',
// url: '/mp/v1_0/user/profile'
// 后端要求把需要授权的用户身份放到请求头中
// axios 可以通过 headers  选项设置请求头 为了不是每次需要获取token 我们在请求封装模块中统一设置token
// headers: {
//   Authorization: `Bearer ${user.token}`
// }
// })
// }

export const statisticalData = () => {
  return request({
    method: 'GET',
    url: '/login/big'
  })
}

// 用户管理

export const getUserData = (params) => {
  return request({
    method: 'GET',
    url: '/app/user/list',
    params
  })
}
