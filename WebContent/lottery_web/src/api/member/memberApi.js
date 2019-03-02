import axios from '../axios'
import * as urls from './apiUrls';
import { Message }  from 'element-ui';

function messageOption(msg){
  return {
    type: "info",
      showClose: false,
      customClass: "g_messageTips",
      message: msg,
      duration: 2500,
      center: true
  }
}
//过滤脚本提交
function examineSubmitContent(text){
  return /<[^<]+>/.test(text)
}

//获取系统配置信息
export function m_systemCode() {
  let param = Object.assign(
    {},
  );
  return axios.post(urls.m_systemCodeAPI(), param);
}

//获取第三方游戏平台
export function otherGameFlat(userName) {
  let param = Object.assign(
    {},{
      userName
    }
  );
  return axios.post(urls.otherGameFlatAPI(), param);
}
//发送验证码
export function smsSend(obj) {
  let param = Object.assign(
    {},{
      phone: obj.phone,
      businessType: obj.businessType,
      account: obj.account
    }
  );
  return axios.post(urls.smsSendAPI(), param);
}
//验证码校验
export function smsCodeVerify(obj) {
  let param = Object.assign(
    {},{
      account: obj.account,
      phone: obj.phone,
      code: obj.code,
    }
  );
  return axios.post(urls.smsCodeVerifyAPI(), param);
}
//绑定手机号
export function m_bindMobile(obj) {
  let param = Object.assign(
    {},{
      mobile: obj.mobile,
      code: obj.code,
    }
  );
  return axios.post(urls.m_bindMobileAPI(), param);
}
//重置密码
export function m_resetPsw(obj) {
  let param = Object.assign(
    {},{
      pwd: obj.pwd,
      key: obj.key,
      account: obj.account,
    }
  );
  return axios.post(urls.m_resetPswAPI(), param);
}
// 充值--支付方式
export function charge_allList() {
  let param = Object.assign(
    {},
  );
  return axios.post(urls.charge_allListAPI(), param);
}
// 在线扫码 在线支付
export function charge_onlineSaoma(obj) {
  let param = Object.assign(
    {},{
      userName: obj.userName,
      money:  obj.money,
      payType: obj.payType,
      client: obj.client,
      bankCode: obj.bankCode,
      module: obj.module,
    }
  );
  return axios.post(urls.charge_onlineSaomaAPI(), param);
}
// 传统扫码
export function charge_chuantongSaoma(obj) {
  let param = Object.assign(
    {},{
      money:  obj.money,
      account: obj.account,
      client: obj.client,
      payType : obj.payType,
      userName: obj.userName,
      userRemark: obj.userRemark,
      payNo: obj.payNo,
      module: obj.module,
    }
  );
  return axios.post(urls.charge_chuantongSaomaAPI(), param);
}
// 公司入款

export function charge_bank(obj) {
  let param = Object.assign(
    {},{
      userName: obj.userName,
      money: obj.money,
      time: obj.time,
      payNo: obj.payNo,
      client: obj.client,
      hkName: obj.hkName,
      hkType: obj.hkType,
      // hkTime: obj.hkTime,
      userRemark: obj.userRemark,
    }
  );
  return axios.post(urls.charge_bankAPI(), param);
}
// 提现
export function withdrawSubmit(obj) {
  let param = Object.assign(
    {},{
      userName: obj.userName,
      balance: obj.balance,
      bankCode: obj.bankCode,
      withdrawPwd: obj.withdrawPwd
    }
  );
  return axios.post(urls.withdrawSubmitAPI(), param);
}

//获取活动列表
export function m_activitiesList(obj) {
  let currentPage = obj.currentPage,
      pageLimit = obj.pageLimit;
  let param = Object.assign(
    {},{
    currentPage,
    pageLimit
  });
  return axios.post(urls.m_activitiesListAPI(), param);
}
//获取活动详情
export function m_activitiesDetail(id) {
  let param = Object.assign(
    {},{
    id,
  });
  return axios.post(urls.m_activitiesDetailAPI(), param);
}
//获取公告列表
export function m_announcementList(obj) {
  let currentPage = obj.currentPage,
      pageLimit = obj.pageLimit;
  let param = Object.assign(
    {},{
    currentPage,
    pageLimit
  });
  return axios.post(urls.m_announcementListAPI(), param);
}
//获取公告详情
export function m_announcementDetail(id) {
  let param = Object.assign(
    {},{
    id,
  });
  return axios.post(urls.m_announcementDetailAPI(), param);
}



//获取彩票种类列表
export function getLotteryAll() {
  let param = Object.assign(
    {},
  );
  return axios.post(urls.lotteryAllAPI(), param);
}

//获取投注记录列表
export function getLotteryBetList(obj) {
  let lotteryCode = obj.lotteryCode,
      startTime = obj.startTime,
      finishTime = obj.finishTime,
      account = obj.account,
      flag = obj.flag,
      currentPage = obj.currentPage,
      gameCode = obj.gameCode,
      status = obj.status,
      pageLimit = obj.pageLimit;
  let param = Object.assign(
    {},
    {
      lotteryCode,
      startTime,
      finishTime,
      account,
      flag,
      currentPage,
      pageLimit,
      gameCode,
      status
    }
  );
  return axios.post(urls.lotteryBetListAPI(), param);
}

//获取投注记录详情
export function getLotteryBetDetail(id) {
  let param = Object.assign(
    {},
    {
    	id
    }
  );
  return axios.post(urls.lotteryBetDetailAPI(), param);
}

//获取追号记录列表
export function lotteryAppendList(obj) {
  let lotteryCode = obj.lotteryCode,
      startTime = obj.startTime,
      finishTime = obj.finishTime,
      account = obj.account,
      flag = obj.flag,
      currentPage = obj.currentPage,
      status = obj.status,
      gameCode = obj.gameCode,
      pageLimit = obj.pageLimit;
  let param = Object.assign(
    {},
    {
      lotteryCode,
      startTime,
      finishTime,
      account,
      flag,
      currentPage,
      pageLimit,
      gameCode,
      status,
    }
  );
  return axios.post(urls.lotteryAppendListAPI(), param);
}
//获取追号记录详情
export function lotteryAppendDetail(orderNumber,orderId) {
  let param = Object.assign(
    {},
    {
      orderNumber,
      orderId
    }
  );
  return axios.post(urls.lotteryAppendDetailAPI(), param);
}
//停止追号
export function lotteryAppendStop(orderNumber) {
  let param = Object.assign(
    {},
    {
      orderNumber
    }
  );
  return axios.post(urls.lotteryAppendStopAPI(), param);
}

//获取其他游戏列表
export function otherGameList() {
  let param = Object.assign(
    {},
  );
  return axios.post(urls.otherGameListAPI(), param);
}

//获取其他游戏记录
export function otherGameRecordList(obj) {
  let startTime = obj.startTime,
      finishTime = obj.finishTime,
      flat = obj.flat,
      currentPage = obj.currentPage,
      pageLimit = obj.pageLimit;
  let param = Object.assign(
    {},
    {
      startTime,
      finishTime,
      flat,
      currentPage,
      pageLimit
    }
  );
  return axios.post(urls.otherGameRecordListAPI(), param);
}

/*
*   资金管理
*   start
*/
//银行提现记录
export function m_account_draw(obj) {
  let startTime = obj.startTime,
      finishTime = obj.finishTime,
      drawType = obj.drawType,
      currentPage = obj.currentPage,
      drawStatus = obj.drawStatus,
      checkStatus = obj.checkStatus,
      account = obj.account,
      flag = obj.flag,
      pageLimit = obj.pageLimit;
  let param = Object.assign(
    {},
    {
      startTime,
      finishTime,
      drawType,
      currentPage,
      pageLimit,
      checkStatus,
      account,
      flag,
      drawStatus
    }
  );
  return axios.post(urls.m_account_draw_API(), param);
}

//银行充值记录
export function m_account_deposit(obj) {
  let startTime = obj.startTime,
      finishTime = obj.finishTime,
      depositType = obj.depositType,
      currentPage = obj.currentPage,
      checkStatus = obj.checkStatus,
      account = obj.account,
      flag = obj.flag,
      depositStatus = obj.depositStatus,
      pageLimit = obj.pageLimit;
  let param = Object.assign(
    {},
    {
      startTime,
      finishTime,
      depositType,
      currentPage,
      pageLimit,
      checkStatus,
      account,
      flag,
      depositStatus
    }
  );
  return axios.post(urls.m_account_deposit_API(), param);
}

//转账记录
export function m_account_transfers(obj) {
  let startTime = obj.startTime,
      finishTime = obj.finishTime,
      flat = obj.flat,
      eduType = obj.eduType,
      currentPage = obj.currentPage,
      pageLimit = obj.pageLimit;
  let param = Object.assign(
    {},
    {
      startTime,
      finishTime,
      flat,
      eduType,
      currentPage,
      pageLimit
    }
  );
  return axios.post(urls.m_account_transfers_API(), param);
}
//转换记录
export function m_account_exchange(obj) {
  /*let startTime = obj.startTime,
      finishTime = obj.finishTime,
      flat = obj.flat,
      eduType = obj.eduType,
      currentPage = obj.currentPage,
      pageLimit = obj.pageLimit;*/
  let param = Object.assign(
    {},
    {
      /*startTime,
      finishTime,
      flat,
      eduType,
      currentPage,
      pageLimit*/
    }
  );
  return axios.post(urls.m_account_exchange_API(), param);
}
//彩票帐变记录
export function m_account_change(obj) {
  let lotteryCode = obj.lotteryCode,
      startTime = obj.startTime,
      finishTime = obj.finishTime,
      flag = obj.flag,
      account = obj.account,
      currentPage = obj.currentPage,
      changeType = obj.changeType,
      type = obj.type,
      gameCode = obj.gameCode,
      pageLimit = obj.pageLimit;
  let param = Object.assign(
    {},
    {
      lotteryCode,
      startTime,
      finishTime,
      flag,
      account,
      currentPage,
      pageLimit,
      changeType,
      gameCode,
      type
    }
  );
  return axios.post(urls.m_account_change_API(), param);
}
//彩票帐变记录
export function m_account_otherGame_change(obj) {
  let lotteryCode = obj.lotteryCode,
      startTime = obj.startTime,
      finishTime = obj.finishTime,
      flag = obj.flag,
      currentPage = obj.currentPage,
      pageLimit = obj.pageLimit,
      account = obj.account,
      changeType = obj.changeType,
      type = obj.type,
      gameType = obj.gameType;
      
  let param = Object.assign(
    {},
    {
      lotteryCode,
      startTime,
      finishTime,
      flag,
      account,
      currentPage,
      pageLimit,
      changeType,
      gameType,
      type
    }
  );
  return axios.post(urls.m_account_otherGame_change_API(), param);
}
//个人彩票盈利记录
export function m_account_yingkui(obj) {
  let startTime = obj.startTime,
      finishTime = obj.finishTime,
      flag = obj.flag,
      currentPage = obj.currentPage,
      pageLimit = obj.pageLimit,
      account = obj.account;
  let param = Object.assign(
    {},
    {
      startTime,
      finishTime,
      flag,
      currentPage,
      pageLimit,
      account
    }
  );
  return axios.post(urls.m_account_yingkui_API(), param);
}
//个人其他游戏盈利记录
export function m_account_flat_yingkui(obj) {
  let param = Object.assign(
    {},
    {
      flat: obj.flat,
      startTime: obj.startTime,
      finishTime: obj.finishTime,
      flag: obj.flag,
      currentPage: obj.currentPage,
      pageLimit: obj.pageLimit,
      flatType: obj.flatType,
    }
  );
  return axios.post(urls.m_account_flat_yingkui_API(), param);
}



/*
*   资金管理
*   end
*/
/*
*   账户管理
*   start
*/
export function m_info() {
  let param = Object.assign(
    {},
  );
  return axios.post(urls.m_infoAPI(), param);
}

export function m_modifyInfo(obj) {
  let param = Object.assign(
    {},
    {
      nickName: obj.nickName,
      qq: obj.qq,
    }
  );
  return axios.post(urls.m_modifyInfoAPI(), param);
}

//修改账户密码
export function m_modifyLoginPwd(obj) {
  let oldPwd = obj.oldPwd,
      newPwd = obj.newPwd,
      userName = obj.userName;
  let param = Object.assign(
    {},
    {
      userName,
      oldPwd,
      newPwd
    }
  );
  return axios.post(urls.m_modifyLoginPwdAPI(), param);
}
//修改资金密码
export function m_modifyMoneyPwd(obj) {
  let oldPwd = obj.oldPwd,
      newPwd = obj.newPwd,
      userName = obj.userName;
  let param = Object.assign(
    {},
    {
      userName,
      oldPwd,
      newPwd
    }
  );
  return axios.post(urls.m_modifyMoneyPwdAPI(), param);
}


//获取用户银行卡列表
export function m_userBankList() {
  let param = Object.assign(
    {},
  );
  return axios.post(urls.m_userBankListAPI(), param);
}

//获取银行卡列表
export function m_bankList() {
  let param = Object.assign(
    {},
  );
  return axios.post(urls.m_bankListAPI(), param);
}
//添加银行卡
export function m_bankBind(obj) {
  let bankType = obj.bankType,
      bankCard = obj.bankCard,
      bankAddress = obj.bankAddress,
      withdrawPwd = obj.withdrawPwd;
  let param = Object.assign(
    {},{
      bankType,
      bankCard,
      bankAddress,
      withdrawPwd
    }
  );
  return axios.post(urls.m_bankBindAPI(), param);
}
//解绑银行卡
export function m_bankRemoveBind(id,withdrawPwd) {
  let param = Object.assign(
    {},{
      id,
      withdrawPwd
    }
  );
  return axios.post(urls.m_bankRemoveBindAPI(), param);
}
//修改银行卡信息
export function m_bankModifyBind(obj) {
  let bankType = obj.bankType,
      bankCard = obj.bankCard,
      bankAddress = obj.bankAddress,
      id = obj.id,
      withdrawPwd = obj.withdrawPwd;
  let param = Object.assign(
    {},{
      bankType,
      bankCard,
      bankAddress,
      withdrawPwd,
      id,
    }
  );
  return axios.post(urls.m_bankModifyBindAPI(), param);
}

//获取所有彩票种类
export function m_lotteryCategory() {
  let client = 1;
  let param = Object.assign(
    {},
    {
      client
    }
  );
  return axios.post(urls.m_lotteryCategoryAPI(), param);
}
//获取彩票详情
export function m_lotteryCategoryDetail(lotteryCode) {
  let client = 1;
  let param = Object.assign(
    {},
    {
      lotteryCode,
      client
    }
  );
  return axios.post(urls.m_lotteryCategoryDetailAPI(), param);
}

/*
*   账户管理
*   end
*/


/*
*   代理管理
*   start
*/
//团队盈利
export function m_teamProfitLoss(obj) {
  let startTime = obj.startTime,
      finishTime = obj.finishTime,
      flag = obj.flag,
      currentPage = obj.currentPage,
      pageLimit = obj.pageLimit,
      account = obj.account;
  let param = Object.assign(
    {},
    {
      startTime,
      finishTime,
      flag,
      currentPage,
      pageLimit,
      account
    }
  );
  return axios.post(urls.m_teamProfitLossAPI(), param);
}
//团队盈利
export function m_flatTeamProfitLoss(obj) {
  let param = Object.assign(
    {},
    {
      startTime: obj.startTime,
      finishTime: obj.finishTime,
      flag: obj.flag,
      currentPage: obj.currentPage,
      pageLimit: obj.pageLimit,
      account: obj.account,
      flat: obj.flat,
      flatType: obj.flatType
    }
  );
  return axios.post(urls.m_flatTeamProfitLossAPI(), param);
}
//团队管理
export function m_teamManage(obj) {
  let minMoney = obj.minMoney,
      maxMoney = obj.maxMoney,
      flag = obj.flag,
      currentPage = obj.currentPage,
      pageLimit = obj.pageLimit,
      isAgent = obj.isAgent,
      loginStatus = obj.loginStatus,
      account = obj.account;
  let param = Object.assign(
    {},{
      minMoney,
      maxMoney,
      flag,
      currentPage,
      pageLimit,
      isAgent,
      loginStatus,
      account
    }
  );
  return axios.post(urls.m_teamManageAPI(), param);
}

//添加备注
export function m_teamAddRemark(obj) {
  let id = obj.id,
      account = obj.account,
      remark = obj.remark;
  if( examineSubmitContent(remark) ){
    Message(messageOption('包含非法字符或脚本'));return;
  }
  let param = Object.assign(
    {},{
      id,
      account,
      remark
    }
  );
  return axios.post(urls.m_teamAddRemarkAPI(), param);
}
//团队管理返点调配
export function m_teamSetBack(obj) {

  let param = Object.assign(
    {},{
      id: obj.id,
      account: obj.account,
      back: obj.back,
      liveBack: obj.liveBack,
      electronicBack: obj.electronicBack,
      sportBack: obj.sportBack,
      fishBack: obj.fishBack,
    }
  );
  return axios.post(urls.m_teamSetBackAPI(), param);
}
//日薪管理日薪信息
export function m_teamSalaryList(obj) {
  let flag = obj.flag,
      account = obj.account,
      currentPage = obj.currentPage,
      pageLimit = obj.pageLimit;
  let param = Object.assign(
    {},{
      flag,
      account,
      currentPage,
      pageLimit
    }
  );
  return axios.post(urls.m_teamSalaryListAPI(), param);
}
//日薪管理日薪领取明细
export function m_teamSalaryDetail(obj) {
  let startTime = obj.startTime,
      finishTime = obj.finishTime,
      account = obj.account,
      currentPage = obj.currentPage,
      pageLimit = obj.pageLimit;
  let param = Object.assign(
    {},{
      startTime,
      finishTime,
      account,
      currentPage,
      pageLimit
    }
  );
  return axios.post(urls.m_teamSalaryDetailAPI(), param);
}
//新增下级日薪
export function m_teamSalaryAdd(obj) {
  let account = obj.account,
      fangshi = obj.fangshi,
      loss = obj.loss,
      maxMoney = obj.maxMoney,
      personCount = obj.personCount,
      salaryMoney = obj.salaryMoney,
      startMoney = obj.startMoney;
  let param = Object.assign(
    {},
    {
      account,
      fangshi,
      loss,
      maxMoney,
      personCount,
      salaryMoney,
      startMoney,
    }
  );
  return axios.post(urls.m_teamSalaryAddAPI(), param);
}
//修改下级日薪
export function m_teamSalaryUpdate(obj) {
  console.log(obj);
  let account = obj.userName,
      fangshi = 0,
      id = obj.id,
      loss = obj.lossCountValue,
      maxMoney = obj.moneyCountValue,
      personCount = obj.personCount,
      salaryMoney = obj.salaryMoney,
      startMoney = obj.startMoney;
  let param = Object.assign(
    {},
    {
      account,
      fangshi,
      loss,
      maxMoney,
      personCount,
      salaryMoney,
      startMoney,
      id
    }
  );
  return axios.post(urls.m_teamSalaryUpdateAPI(), param);
}

//推广链接列表
export function m_teamPromotionLinkList(obj) {
  let param = Object.assign(
    {},{
      currentPage: obj.currentPage,
      pageLimit: obj.pageLimit,
    }
  );
  return axios.post(urls.m_teamPromotionLinkListAPI(), param);
}
//生成推广链接
export function m_teamPromotionLinkAdd(obj) {
  let param = Object.assign(
    {},{
      qudao: obj.qudao,
      back: obj.back,
      liveBack: obj.liveBack,
      electronicBack: obj.electronicBack,
      sportBack: obj.sportBack,
      fishBack: obj.fishBack,
      valadateTime : obj.valadateTime,
      userType: obj.userType,
      wx: obj.wx,
      skype: obj.skype,
      qq: obj.qq
    }
  );
  return axios.post(urls.m_teamPromotionLinkAddAPI(), param);
}
//删除推广链接
export function m_teamPromotionLinkDelete(id) {
  let param = Object.assign(
    {},{
      id
    }
  );
  return axios.post(urls.m_teamPromotionLinkDeleteAPI(), param);
}
//注册下级用户
export function m_agentRegister(obj) {
  
  let param = Object.assign(
    {},{
      userType: obj.userType,
      back: obj.back,
      liveBack: obj.liveBack,
      electronicBack: obj.electronicBack,
      sportBack: obj.sportBack,
      fishBack: obj.fishBack,
      account: obj.account,
      password: obj.password
    }
  );
  return axios.post(urls.m_agentRegisterAPI(), param);
}

//转账给下级
export function m_transferAgent(obj) {
  let money = obj.money,
      account = obj.account,
      zjPassword = obj.zjPassword,
      remark = obj.remark;
  if( examineSubmitContent(remark) ){
    Message(messageOption('包含非法字符或脚本'));return;
  }
  let param = Object.assign(
    {},{
      money,
      zjPassword,
      account,
      remark
    }
  );
  return axios.post(urls.m_transferAgentAPI(), param);
}

//派送日薪给下级
export function m_payAgent(id,zjPassword) {
  let param = Object.assign(
    {},{
      id,
      zjPassword,
    }
  );
  return axios.post(urls.m_payAgentAPI(), param);
}



/*
*   代理管理
*   end
*/




// 站内信获取未读信息数
export function m_messageCount() {
  let param = Object.assign(
    {},
  );
  return axios.post(urls.m_messageCountAPI(), param);
}

// 站内信获取信息列表
export function m_messageList(obj,loading) {
  let status = obj.status,
      pageLimit = obj.pageLimit,
      currentPage = obj.currentPage;
  let param = Object.assign(
    {},{
      status,
      pageLimit,
      currentPage
    }
  );
  return axios.post(urls.m_messageListAPI(loading), param);
}

// 站内信获取聊天记录
export function m_messageContent(id) {
  let param = Object.assign(
    {},{
      id
    }
  );
  return axios.post(urls.m_messageContentAPI(), param);
}
// 站内信发送
export function m_messageUpdateGroup(obj) {
  let groupKey = obj.groupKey,
      content = obj.content;
  if( examineSubmitContent(content) ){
    Message(messageOption('包含非法字符或脚本'));return;
  }
  let param = Object.assign(
    {},{
      groupKey,
      content
    }
  );
  return axios.post(urls.m_messageUpdateGroupAPI(), param);
}
//  站内信联系上下级
export function m_messageAddGroup(obj) {
  let type = obj.type,
      title = obj.title,
      receiver = obj.receiver,
      content = obj.content;
  if( examineSubmitContent(content) ){
    Message(messageOption('包含非法字符或脚本'));return;
  }
  let param = Object.assign(
    {},{
      type,
      title,
      receiver,
      content
    }
  );
  return axios.post(urls.m_messageAddGroupAPI(), param);
}
//  删除消息
export function m_messageDeleteGroup(id) {
  let param = Object.assign(
    {},{
      id
    }
  );
  return axios.post(urls.m_messageDeleteGroupAPI(), param);
}





//  额度转换平台列表
export function m_exchangeFlagList(userName) {
  let param = Object.assign(
    {},{
      userName
    }
  );
  return axios.post(urls.m_exchangeFlagListAPI(), param);
}

//  显示用户平台余额
export function m_exchangeShowBalance(userName,flat) {
  let param = Object.assign(
    {},{
      userName,
      flat
    }
  );
  return axios.post(urls.m_exchangeShowBalanceAPI(), param);
}

//  转换--入款
export function m_exchangeDeposit(userName,flat,money) {
  let param = Object.assign(
    {},{
      userName,
      flat,
      money
    }
  );
  return axios.post(urls.m_exchangeDepositAPI(), param);
}

//  转换--出款
export function m_exchangeWithdraw(userName,flat,money) {
  let param = Object.assign(
    {},{
      userName,
      flat,
      money
    }
  );
  return axios.post(urls.m_exchangeWithdrawAPI(), param);
}


//在线会员列表
export function m_marketing_onlineList(obj) {
  let param = Object.assign(
    {},{
      pageLimit: obj.pageLimit,
      currentPage: obj.currentPage
    }
  );
  return axios.post(urls.m_marketing_onlineListAPI(), param);
}
//未投注会员列表
export function m_marketing_nobetList(obj) {
  let param = Object.assign(
    {},{
      pageLimit: obj.pageLimit,
      currentPage: obj.currentPage,
      startTime: obj.startTime,
    }
  );
  return axios.post(urls.m_marketing_nobetListAPI(), param);
}
//有效会员列表
export function m_marketing_validMemberList(obj) {
  let param = Object.assign(
    {},{
      pageLimit: obj.pageLimit,
      currentPage: obj.currentPage,
      startTime: obj.startTime,
      finishTime: obj.finishTime
    }
  );
  return axios.post(urls.m_marketing_validMemberListAPI(), param);
}