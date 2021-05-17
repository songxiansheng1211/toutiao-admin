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

// 将draft 设置一个默认值 不传的时候默认不存草稿 要项设置默认值
// 在传参的时候设置默认值需要 将他放在后面（有多个参数 需要设置默认值的放在最后面）
export const newPublish = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft: draft
    },
    data
  })
}
// 修改提交
export const editPublish = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}
// 获取文章展示数据
export const getPublish = (articleId) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
