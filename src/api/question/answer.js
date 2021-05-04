import request from '@/utils/request'

export function getfindAnswers(problemId){ // 查询答案列表
    return request({
        url: '/com/ans/findAnswers/'+problemId,
        method: 'get'
    });
}

export function addAnswer(answer){ // 添加答案
    return request({
        url: '/com/ans/AddAnswer',
        method: 'post',
        data:answer
    });
}

export function updateAnswer(answer){ // 修改答案
    return request({
        url: '/com/ans/updateAnswer',
        method: 'post',
        data:answer
    });
}

export function deleteAnswer(answerId){ // 删除答案
    return request({
        url: '/com/ans/deleteAnswer/'+answerId,
        method: 'get'
    });
}

export function getPersonOfAnswers(currentPage,size){ // 某个人的回答
    return request({
        url: `/com/ans/findPersonOfAnswers/${currentPage}/${size}`,
        method: 'get'
    });
}
