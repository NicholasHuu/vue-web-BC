/**
 *  彩票相关接口连接
 */

// 彩种号码接口链接
export function lotteryNumbersAPI() {
  return {
    url: `/lottery/pc/gamedetail/v3`,
    //url: `/lottery/pc/gamedetail`,
    isShowLoading: true
  };
}

// 所有彩种倒计时接口链接
export function countDownAPI() {
  return {
    url: `/lottery/times`,
    isShowLoading: false
  };
}

// 获取开奖结果接口链接
export function resultAPI() {
  return {
    url: `/lottery/result`,
    isShowLoading: false
  };
}

// 获取所有彩种接口链接
export function getLotteryAllAPI() {
  return {
    url: `/lottery/all`,
    isShowLoading: true
  };
}
export function getLotteryAllCostomAPI() {
  return {
    url: `/lottery/home/lotteryGroup/custom`,
    isShowLoading: true
  };
}

// 获取下一期期数接口链接
export function nextqsAPI() {
  return {
    url: `lottery/nextqs`,
    isShowLoading: false
  };
}

// 下注接口链接
export function orderBetAPI() {
  return {
    url: `/lotterymember/order/bet`,
    isShowLoading: true
  };
}

// 撤单接口连接
export function orderStopAPI() {
  return {
    url: `/lotterymember/order/stop`,
    isShowLoading: true
  };
}

// 生成追号方案
export function tracePlanAPI() {
  return {
    url: `/lotterymember/order/trace`,
    isShowLoading: true
  };
}

// 中奖通知
export function winNoticeAPI() {
  return {
    url: `/lottery/notice/user`,
    isShowLoading: false
  };
}

// 冷热
export function lrAPI() {
  return {
    url: `/lottery/lr`,
    isShowLoading: true
  };
}

// 走势图
export function trendChartAPI() {
  return {
    url: `/lottery/trendChart`,
    isShowLoading: false
  };
}

// 首页中奖通知
export function indexWinNoticeAPI() {
  return {
    url: `/lottery/notice/all`,
    isShowLoading: false
  };
}

// 最新彩种开奖结果
export function newLatestResultAPI() {
  return {
    url: `/lottery/latestResult`,
    isShowLoading: true
  };
}

// 彩种玩法规则
export function lotteryRuleAPI() {
  return {
    url: `/lotterymember/lotteryRule`,
    isShowLoading: true
  };
}

// 公告记录
export function gonggaoAPI() {
  return {
    url: `/lotterymember/page/web/gonggao`,
    isShowLoading: false
  };
}

// 网站信息接口
export function webSiteInfoAPI() {
  return {
    url: `/lotterymember/page/web/site`,
    isShowLoading: false
  };
}

// 优惠活动
export function promosActiveAPI() {
  return {
    url: `/lotterymember/page/web/promos`,
    isShowLoading: true
  };
}

// 首页热门，低频，高频采种列表
export function homeHotLotteryAPI() {
  return {
    url: `/lottery/home/lotteryGroup`,
    isShowLoading: false
  };
}

// 帮助记录
export function homeHelpAPI() {
  return {
    url: `/lotterymember/page/web/help`,
    isShowLoading: false
  };
}

// 面板信息
export function panelInfoAPI() {
  return {
    url: `/lottery/panel`,
    isShowLoading: true
  };
}

// 关于我们
export function aboutUsAPI() {
  return {
    url: `/lotterymember/page/web/about`,
    isShowLoading: true
  };
}
