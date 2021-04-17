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
