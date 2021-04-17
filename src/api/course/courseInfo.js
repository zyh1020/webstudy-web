import request from '@/utils/request'

export function findOneCourseInfo(courseId) { // 查询课程信息
    return request({
        url: '/cou/info/findCourse/'+courseId,
        method: 'get'
    });
}
