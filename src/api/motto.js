import request from '@/utils/request'

export function mottoPage(params) {
    return request({url: '/auth/motto/page', method: 'get', params})
}
export function mottoInfo(params) {
    return request({url: '/auth/motto/info', method: 'get', params})
}
export function mottoCreate(data) {
    return request({url: '/auth/motto/create', method: 'post', data})
}
export function mottoUpdate(data) {
    return request({url: '/auth/motto/update', method: 'post', data})
}
export function mottoRemove(data) {
    return request({url: '/auth/motto/remove', method: 'post', data})
}

