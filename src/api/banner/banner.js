import request from '@/utils/request'

// 查询所有的banner图
export function getAllBanners(){
    return request({
        url: '/ban/getAllBanners',
        method: 'get'
    });
}
