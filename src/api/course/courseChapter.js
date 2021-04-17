import request from '@/utils/request'

export function findOneCourseAllCapter(courseId) { // 查询某个课程的所有章节
    return request({
        url: '/cou/capter/findCapters/'+courseId,
        method: 'get'
    });
}

