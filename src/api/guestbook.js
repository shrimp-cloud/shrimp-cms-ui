import request from '@/utils/request'

export function guestbookPage(params) {
    return request({url: '/usr/guestbook/page', method: 'get', params})
}
export function guestbookInfo(params) {
    return request({url: '/usr/guestbook/info', method: 'get', params})
}
export function guestbookRemove(data) {
    return request({url: '/usr/guestbook/remove', method: 'post', data})
}

