// 文章相关请求模块
import request from '@/utils/request'

// 获取文章列表

export const getArticle = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

export const getChannel = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels',
    params
  })
}
// body参数用 data设置
// query 参数使用params 设置
// headers 参数使用 headers 设置

// 删除文章
// 接口文档中的路径参数 需要在url中传递
export const deleteEssay = articleId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
