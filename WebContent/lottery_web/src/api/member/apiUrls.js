/**
 *  接口连接
 */


//获取系统配置信息
export function m_systemCodeAPI() {
  return {
    url: `/lotterymember/sys/code`,
    isShowLoading: false
  }
}

//获取第三方游戏平台
export function otherGameFlatAPI() {
  return {
    url: `/lotterymember/flat`,
    isShowLoading: false
  }
}
//发送验证码
export function smsSendAPI() {
  return {
    url: `/lotterycommons/sms/send`,
    isShowLoading: false
  }
}
//验证码校验
export function smsCodeVerifyAPI() {
  return {
    url: `/lotterypassword/verify`,
    isShowLoading: false
  }
}
//绑定手机号
export function m_bindMobileAPI() {
  return {
    url: `/lotterymember/info/mobileBind`,
    isShowLoading: false
  }
}
//重置密码
export function m_resetPswAPI() {
  return {
    url: `/lotterypassword/login/reset`,
    isShowLoading: false
  }
}
//充值--支付方式
export function charge_allListAPI() {
  return {
    url: `/lotterypay/allListPC`,
    isShowLoading: true
  };
}
// 在线扫码 在线支付
export function charge_onlineSaomaAPI() {
  return {
    url: `/lotterypay/thirdPay/payPC`,
    isShowLoading: true
  };
}

// 传统扫码
export function charge_chuantongSaomaAPI() {
  return {
    url: `/lotterypay/chuantong/saomaPay`,
    isShowLoading: true
  };
}
// 公司入款
export function charge_bankAPI() {
  return {
    url: `/lotterypay/chuantong/bankPay`,
    isShowLoading: true
  };
}
//提现
export function withdrawSubmitAPI() {
  return {
    url: `/lotteryWithdraw/submit`,
    isShowLoading: true
  };
}


/*
*   公告、活动
*   start
*/
// 活动记录
export function m_activitiesListAPI() {
  return {
    url: `/lotterymember/page/huodong`,
    isShowLoading: false
  }
}
// 活动详情
export function m_activitiesDetailAPI() {
  return {
    url: `/lotterymember/page/huodong/detail`,
    isShowLoading: false
  }
}

// 活动记录
export function m_announcementListAPI() {
  return {
    url: `/lotterymember/page/gonggao`,
    isShowLoading: false
  }
}
// 活动详情
export function m_announcementDetailAPI() {
  return {
    url: `/lotterymember/page/gonggao/detail`,
    isShowLoading: false
  }
}
/*
*   公告、活动
*   end
*/

/*
*   游戏记录
*   start
*/
// 彩票种类列表
export function lotteryAllAPI() {
  return {
    url: `/lottery/all`,
    isShowLoading: false
  }
}

// 投注记录列表
export function lotteryBetListAPI() {
  return {
    url: `/lotterymember/order`,
    isShowLoading: true
  }
}

// 投注记录详情
export function lotteryBetDetailAPI() {
  return {
    url: `/lotterymember/order/detail`,
    isShowLoading: true
  }
}

// 追号记录列表
export function lotteryAppendListAPI() {
  return {
    url: `/lotterymember/order/append`,
    isShowLoading: true
  }
}
// 追号记录详情
export function lotteryAppendDetailAPI() {
  return {
    url: `/lotterymember/order/append/detail`,
    isShowLoading: true
  }
}
// 停止追号
export function lotteryAppendStopAPI() {
  return {
    url: `/lotterymember/order/append/stop`,
    isShowLoading: true
  }
}

// 其他游戏列表
export function otherGameListAPI() {
  return {
    url: `/lotterymember/flat`,
    isShowLoading: true
  }
}

// 其他游戏记录
export function otherGameRecordListAPI() {
  return {
    url: `/lotterymember/flat/game`,
    isShowLoading: true
  }
}
/*
*   游戏记录
*   end
*/

/*
* 	资金相关
* 	start
*/

// 银行提现记录
export function m_account_draw_API() {
  return {
    url: `/lotterymember/account/draw`,
    isShowLoading: true
  }
}
// 银行充值记录
export function m_account_deposit_API() {
  return {
    url: `/lotterymember/account/deposit`,
    isShowLoading: true
  }
}
// 转账记录
export function m_account_transfers_API() {
  return {
    url: `/lotterymember/flat/account/transfer`,
    isShowLoading: true
  }
}
// 转换记录
export function m_account_exchange_API() {
  return {
    url: `/lotterymember/record/edu`,
    isShowLoading: true
  }
}
// 彩票帐变记录
export function m_account_change_API() {
  return {
    url: `/lotterymember/lottery/account/change`,
    isShowLoading: true
  }
}
// 其他游戏账变记录
export function m_account_otherGame_change_API() {
  return {
    url: `/lotterymember/lottery/account/change/v2`,
    isShowLoading: true
  }
}
// 个人彩票盈利记录
export function m_account_yingkui_API() {
  return {
    url: `/lotterymember/lottery/account/yingkui`,
    isShowLoading: true
  }
}
// 个人其他游戏盈利记录
export function m_account_flat_yingkui_API() {
  return {
    url: `/lotterymember/flat/account/yingkui`,
    isShowLoading: true
  }
}


/*
* 	资金相关
* 	end
*/

/*
* 	账户管理
* 	start
*/
//会员基本信息
export function m_infoAPI() {
  return {
    url: `/lotterymember/info`,
    isShowLoading: false
  }
}
//修改基本信息 （只能修改昵称）
export function m_modifyInfoAPI() {
  return {
    url: `/lotterymember/info/edit`,
    isShowLoading: false
  }
}
//修改账户密码
export function m_modifyLoginPwdAPI() {
  return {
    url: `/lotterymember/info/loginPwdEdit`,
    isShowLoading: false
  }
}
//修改资金密码
export function m_modifyMoneyPwdAPI() {
  return {
    url: `/lotterymember/info/withdrawPwdEdit`,
    isShowLoading: false
  }
}
//查询绑定银行卡
export function m_userBankListAPI() {
  return {
    url: `/lotterymember/info/userBankList`,
    isShowLoading: true
  }
}
//银行列表
export function m_bankListAPI() {
  return {
    url: `/lotterymember/info/bankList`,
    isShowLoading: false
  }
}
//添加银行卡
export function m_bankBindAPI() {
  return {
    url: `/lotterymember/info/bindBank`,
    isShowLoading: true
  }
}
//解绑银行卡
export function m_bankRemoveBindAPI() {
  return {
    url: `/lotterymember/info/removeBank`,
    isShowLoading: true
  }
}
//修改银行卡信息
export function m_bankModifyBindAPI() {
  return {
    url: `/lotterymember/info/updateBank`,
    isShowLoading: true
  }
}
//彩种信息
export function m_lotteryCategoryAPI(){
  return {
    url: `/lotterymember/lotterylist`,
    isShowLoading: false
  }
}
//彩种详情
export function m_lotteryCategoryDetailAPI(){
  return {
    url: `/lotterymember/lotteryDetail`,
    isShowLoading: true
  }
}
/*
* 	账户管理
* 	end
*/

/*
*   团队管理
*   start
*/
//团队盈亏
export function m_teamProfitLossAPI(){
  return {
    url: `/lotterymember/team/account/yingkui`,
    isShowLoading: true
  }
}
//其他游戏团队盈亏
export function m_flatTeamProfitLossAPI(){
  return {
    url: `/lotterymember/team/account/flat/yingkui`,
    isShowLoading: true
  }
}
//团队管理列表
export function m_teamManageAPI(){
  return {
    url: `/lotterymember/team/account/manage`,
    isShowLoading: true
  }
}
//添加备注
export function m_teamAddRemarkAPI(){
  return {
    url: `/lotterymember/team/remark/add`,
    isShowLoading: true
  }
}
//设置返水额度
export function m_teamSetBackAPI(){
  return {
    url: `/lotterymember/team/back/update`,
    isShowLoading: true
  }
}
//日薪列表（个人日薪"flag=1" 和 下级日薪"flag=0" ）
export function m_teamSalaryListAPI(){
  return {
    url: `/lotterymember/user/salary`,
    isShowLoading: true
  }
}
//日薪领取明细
export function m_teamSalaryDetailAPI(){
  return {
    url: `/lotterymember/user/salary/detail`,
    isShowLoading: false
  }
}
//新增下级日薪
export function m_teamSalaryAddAPI(){
  return {
    url: `/lotterymember/user/salary/add`,
    isShowLoading: true
  }
}
//修改下级日薪
export function m_teamSalaryUpdateAPI(){
  return {
    url: `/lotterymember/user/salary/update`,
    isShowLoading: true
  }
}
//获取推广链接列表
export function m_teamPromotionLinkListAPI(){
  return {
    url: `/lotterymember/user/promotion/link`,
    isShowLoading: false
  }
}
//生成推广链接
export function m_teamPromotionLinkAddAPI(){
  return {
    url: `/lotterymember/user/promotion/link/add`,
    isShowLoading: true
  }
}
//删除推广链接
export function m_teamPromotionLinkDeleteAPI(){
  return {
    url: `/lotterymember/user/promotion/link/delete`,
    isShowLoading: true
  }
}

//注册下级用户
export function m_agentRegisterAPI(){
  return {
    url: `/lotterymember/agent/register`,
    isShowLoading: true
  }
}
//转账给下级
export function m_transferAgentAPI(){
  return {
    url: `/lotterymember/transfer/agent`,
    isShowLoading: true
  }
}
//派送日薪给下级
export function m_payAgentAPI(){
  return {
    url: `/lotterymember/pay/agent`,
    isShowLoading: true
  }
}
/*
*   团队管理
*   end
*/


//   站内信获取未读信息数
export function m_messageCountAPI() {
  return {
    url: `/lotterymember/message/count`,
    isShowLoading: false
  };
}
//  站内信获取信息列表
export function m_messageListAPI(loadingStatus) {
  return {
    url: `/lotterymember/message/list`,
    isShowLoading: loadingStatus
  };
}
//  站内信获取聊天记录
export function m_messageContentAPI() {
  return {
    url: `/lotterymember/message/content`,
    isShowLoading: false
  };
}
//  站内信发送
export function m_messageUpdateGroupAPI() {
  return {
    url: `/lotterymember/update/message/group`,
    isShowLoading: false
  };
}
//  站内信联系上下级
export function m_messageAddGroupAPI() {
  return {
    url: `/lotterymember/add/message/group`,
    isShowLoading: false
  };
}
//  站内信联系上下级
export function m_messageDeleteGroupAPI() {
  return {
    url: `/lotterymember/delete/message/group`,
    isShowLoading: false
  };
}



/*
*   转换
*   start
*/
// 额度转换平台列表
export function m_exchangeFlagListAPI() {
  return {
    url: `/lotteryElectronic/flat`,
    isShowLoading: false
  };
}

// 额度转换记录
export function m_exchangeRecordAPI() {
  return {
    url: `/lotterymember/record/edu`,
    isShowLoading: false
  };
}

// 显示用户平台余额
export function m_exchangeShowBalanceAPI() {
  return {
    url: `/lotteryflat/balance`,
    isShowLoading: true
  };
}

// 转换--入款
export function m_exchangeDepositAPI() {
  return {
    url: `/lotteryflat/deposit`,
    isShowLoading: true
  };
}
// 转换--出款
export function m_exchangeWithdrawAPI() {
  return {
    url: `/lotteryflat/withdraw`,
    isShowLoading: true
  };
}

/*
*   转换
*   end
*/



/*
*   营销管理
*   start
*/
export function m_marketing_onlineListAPI() {
  return {
    url: `/lotterymember/market/user/online`,
    isShowLoading: true
  };
}
export function m_marketing_nobetListAPI() {
  return {
    url: `/lotterymember/market/user/notbet`,
    isShowLoading: true
  };
}
export function m_marketing_validMemberListAPI() {
  return {
    url: `/lotterymember/market/user/bet`,
    isShowLoading: true
  };
}


/*
*   营销管理
*   end
*/