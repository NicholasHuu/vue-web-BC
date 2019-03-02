import { loadUserName, loadRytoken, loadCahtroomID } from "common/js/cache";

const state = {
  u_userBalance: {},

  global_userName: loadUserName(),

  // 是否显示登陆弹窗
  u_isShowLoginPop: false,

  // 是否显示设置资金密码
  u_setMoneyPwStatus: false,

  u_setMoneyPwStatusType: "",

  // 是否刷新余额
  u_setIsRefreshMoney: false,

  // 登陆公告弹窗内容
  l_loginNoticeContent: "",

  // 是否显示登陆公告弹窗
  l_isShowLoginNotice: false,
  // 融云token
  u_ryToken: loadRytoken(),
  // 融云连接状态
  set_connectstatus: "",
  // 聊天室消息列表
  chatroom_mes_list: [],
  // 聊天室chatroomID
  chatroom_id: loadCahtroomID()
};

export default state;
