import request from '@/utils/request'

// 登录
export function userLogin(loginVo){
    return request({
        url: '/user/jwtLogin',
        method: 'post',
        data:loginVo
    });
}


// 获取用户信息
export function userInfo(){
    return request({
        url: '/user/jwtInfo',
        method: 'get'
    });
}
