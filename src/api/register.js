import request from '@/utils/request'

export const registerData = (data) => {
  return request({
    method: 'POST',
    url: '/nucleicTest/insert',
    data
  })
}
