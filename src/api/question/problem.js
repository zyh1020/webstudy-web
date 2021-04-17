import request from '@/utils/request'

export function getProblemDetail(problemId){ // 查询问题详情
    return request({
        url: '/com/pro/findOneProblem/'+problemId,
        method: 'get'
    });
}

export function addOneProblem(problem){ // 查询问题详情
    return request({
        url: '/com/pro/addOneProblem',
        method: 'post',
        data:problem
    });
}
