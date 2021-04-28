import request from '@/utils/request'

export function findOneCourseInfo(courseId) { // 查询课程信息
    return request({
        url: '/cou/info/findCourse/'+courseId,
        method: 'get'
    });
}


export function findCourseList(current,limit,orderBy,course){ // 查询课程列表
    return request({
        url: `/cou/info/findPageCourse/${current}/${limit}/${orderBy}`,
        method: 'post',
        data:course
    });
}
