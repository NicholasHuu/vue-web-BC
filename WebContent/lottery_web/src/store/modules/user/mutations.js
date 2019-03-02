import * as types from "./mutationsTypes";

const mutations = {
  // 用户信息
  [types.U_SET_USER_INFO](state, obj) {
    state.u_userInfo = obj;
  },

  // 用户余额
  [types.U_SET_USER_BALANCE](state, obj) {
    state.u_userBalance = obj.memberBalance;
  },

  // 用户名称
  [types.U_SET_USER_NAME](state, str) {
    state.global_userName = str;
  },

  // 是否显示登陆弹窗
  [types.U_SET_IS_SHOW_LOGIN_POP](state, flag) {
    state.u_isShowLoginPop = flag;
  },

  [types.u_setMoneyPwStatus](state, flag) {
    state.u_setMoneyPwStatus = flag;
  },

  [types.u_setMoneyPwStatusType](state, type) {
    state.u_setMoneyPwStatusType = type;
  },

  // 是否刷新余额
  [types.U_SET_IS_REFRESH_MONEY](state, flag) {
    state.u_setIsRefreshMoney = flag;
  },

  // 登陆公告弹窗内容
  [types.L_SET_LOGIN_NOTICE_CONTENT](state, str) {
    state.l_loginNoticeContent = str;
  },

  // 是否显示登陆弹窗
  [types.L_SET_IS_SHOW_NOTICE](state, flag) {
    state.l_isShowLoginNotice = flag;
  },
  // 融云token
  [types.GET_RY_TOKEN](state, token) {
    state.u_ryToken = token;
  },
  // 融云连接成功
  [types.SET_CONNECTSTATUS](state, str) {
    state.set_connectstatus = str;
  },
  // 聊天室chatroomID
  [types.CHATROOM_ID](state, str) {
    state.chatroom_id = str;
  },
  // 聊天室消息列表
  [types.CHATROOM_MES_LIST](state, arr) {
    state.chatroom_mes_list = arr;
  }
};

export default mutations;
