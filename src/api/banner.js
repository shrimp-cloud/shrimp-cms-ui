import request from '@/utils/request'

// 1. Banner分页
export function bannerPage(params) {
    return request({ url: '/cms/banner/page', method: 'get', params });
}
// 2. Banner详情
export function bannerInfo(params) {
    return request({ url: '/cms/banner/info', method: 'get', params });
}
// 3. Banner保存
export function bannerSave(data) {
    return request({ url: '/cms/banner/save', method: 'post', data });
}
// 4. Banner删除
export function bannerRemove(data) {
    return request({ url: '/cms/banner/remove', method: 'post', data });
}
