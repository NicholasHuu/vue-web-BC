import axios from "../axios";
import * as urls from "./apiUrls";

// 用户注册
export function signUp(param) {
  return axios.post(urls.signUpAPI(), param);
}

// 通过推广链接注册
export function registByLink(param) {
  return axios.post(urls.registByLinkAPI(), param);
}

// 推广链接详情
export function registByLinkDetail(code) {
  let param = Object.assign(
    {},
    {
      code
    }
  );
  return axios.post(urls.registByLinkDetailAPI(), param);
}

// 用户登录
export function login(param) {
  return axios.post(urls.loginAPI(), param);
}

// 无验证码登录接口连接
export function loginNoVerify(param) {
  return axios.post(urls.loginNoVerifyAPI(), param);
}

// 用户登出
export function logout() {
  return axios.post(urls.logoutAPI(), {});
}

// 获取用户余额
export function getUserBalance(userName) {
  let param = Object.assign(
    {},
    {
      'user-name': userName
    }
  );
  return axios.post(urls.userBalanceAPI(), param);
}


// 绑定资金密码
export function withdrawPwdBind(obj) {
  let param = Object.assign(
    {},{
      zjPwd: obj.zjPwd,
      realName: obj.realName,
    }
  );
  return axios.post(urls.withdrawPwdBindAPI(), param);
}
