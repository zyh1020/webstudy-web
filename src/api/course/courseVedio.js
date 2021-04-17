import request from '@/utils/request'

export function getPlayauth(vedioId) { // 获取视频播放凭证
    return request({
        url: '/ali/vedio/getVedio/'+vedioId,
        method: 'get',
    });
}
