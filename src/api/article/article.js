import request from '@/utils/request'

export function addAnswer(article){ // 添加文章
    return request({
        url: '/art/article/AddAnswer',
        method: 'post',
        data:article
    });
}

export function pageFindArticles(current,limit,article){ // 分页查询文章
    return request({
        url: `/art/article/findPageActicle/${current}/${limit}`,
        method: 'post',
        data:article
    });
}
