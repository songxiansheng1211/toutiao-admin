import request from '@/utils/request'

// 检测机构

export const getOrgData = (params) => {
  return request({
    method: 'GET',
    url: '/hospital/list',
    params
  })
}

// 新增检测机构
export const addOrgData = (data) => {
  return request({
    method: 'POST',
    url: '/hospital/insert',
    data
  })
}

export const editOrgData = (data) => {
  return request({
    method: 'POST',
    url: '/hospital/update',
    data
  })
}

export const removeOrgData = (id) => {
  return request({
    method: 'GET',
    url: `/hospital/delete/${id}`
  })
}

export const resultData = (data) => {
  return request({
    method: 'POST',
    url: '/nucleicTest/update ',
    data
  })
}
