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



// 修改用户基本信息
export function updateUserInfo(userUpdateVo){
    return request({
        url: '/user/updateUserInfo',
        method: 'post',
        data:userUpdateVo
    });
}

// 修改用户头像信息
export function updateUserHeard(userUpdateVo){
    return request({
        url: '/user/updateUserHeard',
        method: 'post',
        data:userUpdateVo
    });
}

// 注册用户
export function registUser(userRegisterVo){
    return request({
        url: '/user/insertUser',
        method: 'post',
        data:userRegisterVo
    });
}

// 发送手机验证码
export function sendPhoneCode(phone){
    return request({
        url: '/ali/msm/sendCode/'+phone,
        method: 'get'
    });
}
