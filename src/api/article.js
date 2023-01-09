import request from '@/utils/request';

// 1. 文章分类列表
export function articleCategoryList(params) {
  return request({ url: '/cms/article/category/list', method: 'get', params });
}
// 2. 文章分类详情
export function articleCategoryInfo(params) {
  return request({ url: '/cms/article/category/info', method: 'get', params });
}
// 3. 文章分类保存
export function articleCategorySave(data) {
  return request({ url: '/cms/article/category/save', method: 'post', data });
}
// 4. 文章分类删除
export function articleCategoryRemove(data) {
  return request({ url: '/cms/article/category/remove', method: 'post', data });
}
// 5. 文章分类选项
export function articleCategoryOptions(params) {
  return request({ url: '/cms/article/category/options', method: 'get', params });
}

// 1. 文章分页
export function articlePage(params) {
  return request({ url: '/cms/article/page', method: 'get', params });
}
// 2. 文章详情
export function articleInfo(params) {
  return request({ url: '/cms/article/info', method: 'get', params });
}
// 3. 文章保存
export function articleSave(data) {
  return request({ url: '/cms/article/save', method: 'post', data });
}
// 4. 文章删除
export function articleRemove(data) {
  return request({ url: '/cms/article/remove', method: 'post', data });
}

