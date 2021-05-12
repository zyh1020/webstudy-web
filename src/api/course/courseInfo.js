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


export function findCourses(type,limit) { // 查询课程信息
    return request({
        url: `/cou/info/findCourses/${type}/${limit}`,
        method: 'get'
    });
}

export function getFollowCourses(currentPage,size) { // 获取关注课程列表
    return request({
        url: `/cou/info/followCourses/${currentPage}/${size}`,
        method: 'get'
    });
}

export function cancelFollowCourses(courseId) { // 取消关注
    return request({
        url: `/cou/info/cancelFollowCourses/${courseId}`,
        method: 'get'
    });
}

export function isFollowCourses(courseId) { // 判断关注
    return request({
        url: `/cou/info/isFollowCourses/${courseId}`,
        method: 'get'
    });
}

export function followCourse(courseId) { // 关注课程
    return request({
        url: `/cou/info/followCourse/${courseId}`,
        method: 'get'
    });
}

