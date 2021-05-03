import request from '@/utils/request'

export function getProblemDetail(problemId){ // 查询问题详情
    return request({
        url: '/com/pro/findOneProblem/'+problemId,
        method: 'get'
    });
}

export function deleteOneProblem(problemId){ // 删除问题
    return request({
        url: '/com/pro/deleteOneProblem/'+problemId,
        method: 'get'
    });
}

export function addOneProblem(problem){ // 添加问题
    return request({
        url: '/com/pro/addOneProblem',
        method: 'post',
        data:problem
    });
}

export function updateOneProblem(problem){ // 修改问题
    return request({
        url: '/com/pro/updateOneProblem',
        method: 'post',
        data:problem
    });
}


export function findPageProblems(currentPage,size,problem){ // 分页查询问题
    return request({
        url: `/com/pro/findPageProblem/${currentPage}/${size}`,
        method: 'post',
        data:problem
    });
}


export function findPersonOfQuestions(currentPage,size){ // 查询个人问题
    return request({
        url: `/com/pro/findPersonOfProblem/${currentPage}/${size}`,
        method: 'get'
    });
}
