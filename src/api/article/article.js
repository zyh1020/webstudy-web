import request from '@/utils/request'

export function addArticle(article){ // 添加文章
    return request({
        url: '/art/article/AddArticle',
        method: 'post',
        data:article
    });
}


export function updateArticle(article){ // 修改文章
    return request({
        url: '/art/article/updateArticle',
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

export function getArticleById(articleId){ // 查询文章
    return request({
        url: `/art/article/findOneActicle/${articleId}`,
        method: 'get',
    });
}

export function deleteArticleById(articleId){ // 删除文章
    return request({
        url: `/art/article/deleteArticle/${articleId}`,
        method: 'get',
    });
}

export function getPersonOfActicles(current,limit){ // 个人文章信息查询
    return request({
        url: `/art/article/findPersonOfActicle/${current}/${limit}`,
        method: 'get'
    });
}
