import * as types from "./mutationsTypes";
import * as userApi from "api/user/userApi";
import * as memberApi from "api/user/userApi";
import * as ryApi from "api/ryim/ryApi";
import router from "../../../router";
import { ERR_OK } from "api/config";
import { MessageBox } from "element-ui";
import { saveUserName, saveRytoken, saveCahtroomID } from "common/js/cache";
import comJS from "../../../common/js/common";
// 用户注册
export const u_signUp = ({ commit, state }, param) => {
  return userApi.signUp(param);
};

// 通过推广链接注册
export const u_registByLink = ({ commit, state }, param) => {
  return userApi.registByLink(param);
};

// 推广链接详情
export const u_registByLinkDetail = ({ commit, state }, code) => {
  return userApi.registByLinkDetail(code);
};

// 用户登陆
export const u_login = ({ commit, state, dispatch }, param) => {
  userApi.login(param).then(res => {
    if (res && res.errorCode == ERR_OK) {
      commit(types.U_SET_IS_SHOW_LOGIN_POP, false);
      commit(types.U_SET_USER_NAME, saveUserName(res.datas.userName));
      dispatch("m_memberInfo");
      dispatch("u_getUserBalance", res.datas.userName);
      dispatch("re_m_messageCount");
      // dispatch("get_rytoken", res.datas.userName);
      // dispatch("get_chatroomId");
      router.push({ path: "/loginNotice" });
      if (res.datas.msg.status == 1) {
        commit(types.L_SET_LOGIN_NOTICE_CONTENT, res.datas.msg.panelContent);
        commit(types.L_SET_IS_SHOW_NOTICE, true);
      } else {
        commit(types.L_SET_IS_SHOW_NOTICE, false);
      }
    } else {
      MessageBox.alert(res.msg, "温馨提示", {
        confirmButtonText: "确定",
        type: "error",
        center: true,
        lockScroll: false
      });
    }
  });
};
// 获取融云token
export const get_rytoken = ({ commit, state, dispatch }, username) => {
  ryApi.getRyToken(username).then(res => {
    if (res && res.errorCode == ERR_OK) {
      commit(types.GET_RY_TOKEN, saveRytoken(res.datas.token));
      dispatch("connect_RY", res.datas.token);
    } else {
      console.log(res);
    }
  });
};
// 获取到融云token后连接融云
export const connect_RY = ({ commit, state }, token) => {
  comJS.RongIMInit(token);
};
// 获取聊天室Id
export const get_chatroomId = ({ commit, state }) => {
  ryApi.getChatroomId().then(res => {
    if (res && res.errorCode == ERR_OK) {
      commit(types.CHATROOM_ID, saveCahtroomID(res.datas[0].roomCode));
    } else {
      console.log(res);
    }
  });
};
// 无验证码登录接口连接
export const u_loginNoVerify = ({ commit, state, dispatch }, param) => {
  return userApi.loginNoVerify(param);
};

// 用户登出
export const u_logout = ({ commit, state }) => {
  userApi.logout().then(res => {
    if (res && res.errorCode == ERR_OK) {
      commit(types.U_SET_USER_NAME, saveUserName(""));
      // commit(types.GET_RY_TOKEN, saveRytoken(""));
      // commit(types.CHATROOM_ID, saveCahtroomID(""));
      window.location.href = window.location.origin;
    } else {
      MessageBox.alert(res.msg, "温馨提示", {
        confirmButtonText: "确定",
        center: true,
        lockScroll: false
      });
    }
  });
};
let balance = null;
// 获取用户余额
export const u_getUserBalance = ({ commit, state }, userName) => {
  clearTimeout(balance);
  let balanceTime = 0;
  let _run = () => {
    balance = setTimeout(function() {
      balanceTime = 30000;
      commit(types.U_SET_IS_REFRESH_MONEY, true);
      userApi.getUserBalance(userName).then(res => {
        setTimeout(() => {
          commit(types.U_SET_IS_REFRESH_MONEY, false);
        }, 1000);
        if (res && res.errorCode == ERR_OK) {
          commit(types.U_SET_USER_BALANCE, res.datas);
        } else {
          console.log(res);
        }
        _run();
      });
    }, balanceTime);
  };
  _run();
};
