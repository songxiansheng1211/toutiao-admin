import request from '@/utils/request'

export const login = (params) => {
  return request({
    method: 'GET',
    url: '/login/login',
    params
  })
}

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

export const addUserData = (data) => {
  return request({
    method: 'POST',
    url: '/app/user/insert',
    data
  })
}

export const editUserData = (data) => {
  return request({
    method: 'POST',
    url: '/app/user/update',
    data
  })
}

export const removeUserData = (id) => {
  return request({
    method: 'GET',
    url: `/app/user/delete/${id}`
  })
}
