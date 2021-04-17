import request from '@/utils/request'

export function getAllCategoryList(){ // 查询所有分类 列表
    return request({
        url: '/sort/category/findAllList',
        method: 'get'
    });
}

