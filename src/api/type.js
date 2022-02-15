import request from '@/utils/request'

export const getTypeData = (params) => {
  return request({
    method: 'GET',
    url: '/item/list',
    params
  })
}

export const addTypeData = (data) => {
  return request({
    method: 'POST',
    url: '/item/insert',
    data
  })
}
export const editTypeData = (data) => {
  return request({
    method: 'POST',
    url: '/item/update',
    data
  })
}

export const removeTypeData = (id) => {
  return request({
    method: 'GET',
    url: `/item/delete/${id}`
  })
}

export const getRecordData = (params) => {
  return request({
    method: 'GET',
    url: '/nucleicTest/list',
    params
  })
}
