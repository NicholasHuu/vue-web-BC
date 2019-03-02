import axios from "../axios";
import * as urls from "./apiUrls";

// 获取彩种号码接口
export function getLotteryNumbers(lotteryCode) {
  let param = Object.assign({}, {
    lotteryCode
  });
  return axios.post(urls.lotteryNumbersAPI(), param);
}

// 所有彩种倒计时接口
export function getAllCountDown(lotteryCode) {
  let param = Object.assign({}, {
    lotteryCode
  });
  return axios.post(urls.countDownAPI(), param);
}

// 获取开奖结果
export function getResult(lotteryCode, count) {
  let param = Object.assign({}, {
    lotteryCode,
    count
  });
  return axios.post(urls.resultAPI(), param);
}

// 下注接口
export function setOrderBet(params) {
  let param = Object.assign({}, {
    lotteryCode: params.lotteryCode,
    amount: params.amount,
    counts: params.counts,
    isTrace: params.isTrace,
    order: params.order,
    traceOrder: params.traceOrder,
    traceWinStop: params.traceWinStop
  });
  return axios.post(urls.orderBetAPI(), param);
}

// 撤单接口
export function orderStop(id) {
  let param = Object.assign({}, {
    id
  });
  return axios.post(urls.orderStopAPI(), param);
}

// 获取下一期期数接口
export function nextqs(lotteryCode) {
  let param = Object.assign({}, {
    lotteryCode
  });
  return axios.post(urls.nextqsAPI(), param);
}

// 获取所有彩种
export function getLotteryAll() {
  let param = Object.assign({}, {});
  return axios.post(urls.getLotteryAllAPI(), param);
}
export function getLotteryAllCustom() {
  let param = Object.assign({}, {
    client: 1
  });
  return axios.post(urls.getLotteryAllCostomAPI(), param);
}



// 生成追号方案
export function getTracePlan(params) {
  let param = Object.assign({}, params);
  return axios.post(urls.tracePlanAPI(), params);
}

// 中奖通知
export function getWinNotice() {
  return axios.post(urls.winNoticeAPI());
}

// 冷热
export function getLr(params) {
  let param = Object.assign({}, {
    lotteryCode: params.lotteryCode,
    rows: params.rows,
  });
  return axios.post(urls.lrAPI(), param);
}

// 走势图
export function getTrendChart(params) {
  let param = Object.assign({}, {
    lotteryCode: params.lotteryCode,
    rows: params.rows,
  });
  return axios.post(urls.trendChartAPI(), param);
}

// 首页中奖通知
export function indexWinNotice(rows) {
  let param = Object.assign({}, {
    rows,
  });
  return axios.post(urls.indexWinNoticeAPI(), param);
}

// 最新彩种开奖结果
export function newLatestResult() {
  let param = Object.assign({}, {});
  return axios.post(urls.newLatestResultAPI(), param);
}

// 彩种玩法规则
export function lotteryRule(lotteryCode) {
  let param = Object.assign({}, {
    lotteryCode,
    client: 1
  });
  return axios.post(urls.lotteryRuleAPI(), param);
}

// 公告记录
export function gonggao(param) {
  return axios.post(urls.gonggaoAPI(), param);
}

// 网站信息接口
export function webSiteInfo(param) {
  return axios.post(urls.webSiteInfoAPI(), param);
}

// 优惠活动
export function promosActive() {
  return axios.post(urls.promosActiveAPI(), {});
}

// 首页热门，低频，高频采种列表
export function homeHotLottery() {
  return axios.post(urls.homeHotLotteryAPI(), {});
}

// 帮助记录
export function homeHelp() {
  return axios.post(urls.homeHelpAPI(), {});
}

// 面板信息
export function panelInfo(key) {
  let param = Object.assign({}, {
    key
  });
  return axios.post(urls.panelInfoAPI(), param);
}

// 关于我们
export function aboutUs() {
  return axios.post(urls.aboutUsAPI(), {});
}