/**
 *  用户相关接口连接
 */

//  用户注册
export function signUpAPI() {
  return {
    url: `/lottery/user/register`,
    isShowLoading: true
  };
}

// 通过推广链接注册
export function registByLinkAPI() {
  return {
    url: `/lottery/user/registByLink`,
    isShowLoading: true
  };
}

// 推广链接详情
export function registByLinkDetailAPI() {
  return {
    url: `/lotterymember/user/promotion/link/detail`,
    isShowLoading: true
  };
}

//  登录接口连接
export function loginAPI() {
  return {
    url: `/lottery/user/login`,
    isShowLoading: true
  };
}

//  无验证码登录接口连接
export function loginNoVerifyAPI() {
  return {
    url: `/lottery/user/loginNoVerify`,
    isShowLoading: true
  };
}

//  登出接口连接
export function logoutAPI() {
  return {
    url: `/lottery/user/logout`,
    isShowLoading: false
  };
}

//  用户余额接口
export function userBalanceAPI() {
  return {
    url: `/lotterymember/info/balance`,
    isShowLoading: false
  };
}

// 绑定资金密码
export function withdrawPwdBindAPI() {
  return {
    url: `/lotterymember/info/withdrawPwdBind`,
    isShowLoading: false
  };
}


