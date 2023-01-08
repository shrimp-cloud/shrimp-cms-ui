import request from '@/utils/request';

// 1. 文档分类列表
export function docCategoryList(params) {
  return request({ url: '/cms/doc/category/list', method: 'get', params });
}
// 2. 文档分类详情
export function docCategoryInfo(params) {
  return request({ url: '/cms/doc/category/info', method: 'get', params });
}
// 3. 文档分类保存
export function docCategorySave(data) {
  return request({ url: '/cms/doc/category/save', method: 'post', data });
}
// 4. 文档分类删除
export function docCategoryRemove(data) {
  return request({ url: '/cms/doc/category/remove', method: 'post', data });
}
// 5. 文档分类选项
export function docCategoryOptions(params) {
  return request({ url: '/cms/doc/category/options', method: 'get', params });
}


// 1. 文档分页
export function docPage(params) {
  return request({ url: '/cms/doc/page', method: 'get', params });
}
// 2. 文档详情
export function docInfo(params) {
  return request({ url: '/cms/doc/info', method: 'get', params });
}
// 3. 文档保存
export function docSave(data) {
  return request({ url: '/cms/doc/save', method: 'post', data });
}
// 4. 文档删除
export function docRemove(data) {
  return request({ url: '/cms/doc/remove', method: 'post', data });
}

