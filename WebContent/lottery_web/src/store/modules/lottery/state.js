import {
  loadAllLotteryList,
  loadWebSiteName,
  loadInformation,
  loadFavoriteList,
  loadAllLotteryList_custom
} from "common/js/cache";

const state = {
  // 彩种号码
  l_lotteryNumbers: {},

  // 当前机选号码
  l_curAutoChoseList: [],  

  // 当前玩法列表
  l_curPlayModeList: [],

  // 当前玩法
  l_curPlayMode: [],

  // 当前号码列表
  l_curNumberList: [],

  // 热门号码列表
  l_hotNumberList: [],

  // 所有彩种倒计时
  l_allLottsCountDownList: [],

  // 当前彩种倒计时
  l_curLottsCountDown: {
    lastResult: [],
    isClose: 0
  },

  // 开奖结果
  l_awardResults: [],

  // 当前最新一期开奖结果
  l_curNewAwardResults: {
    isOpen: 0,
    openResult: [],
    qs: "",
    qsFormat: ""
  },

  // 所有彩票种类
  l_allLotteryList: loadAllLotteryList(),

  l_allLotteryList_custom: loadAllLotteryList_custom(),

  // 当前投注记录
  l_lotteryBetList: [],

  // 当前追号记录
  l_lotteryAppendList: [],

  // 购彩篮列表
  l_lotteryShoppingList: [],

  // 投注订单列表
  l_lotteryBettOrderList: [],

  // 是否显示确认下注弹窗
  l_isShowBettingPopup: false,

  // 是否购物车立即下注
  l_isShoppingBetting: false,

  // 是否下注成功
  l_isBettingSuccess: false,

  // 追号数据
  l_traceData: {
    isTrace: 0,
    traceWinStop: 1,
    traceOrder: [],
    amount: 0,
    counts: 0
  },

  // 遗漏数据
  l_lotteryMissObj: {},

  // 冷热数据
  l_lotteryHotCold: {},

  // 遗漏冷热类型
  l_lotteryMissHotType: 0, //  0 不显示遗漏冷热  1显示遗漏  2 显示冷热

  // 网站信息
  l_lotteryWebSiteInfo: {
    siteDescripti: "",
    siteDomain: "",
    information: loadInformation(),
    siteFooter: "",
    siteGundong: "",
    siteKeywords: "",
    siteLine: "",
    siteMail: "",
    siteMobile: "",
    siteName: loadWebSiteName(),
    siteQq: "",
    siteReserveDomain: "",
    siteTel: "",
    siteWeixin: "",
    helpLink: ""
  },

  // 验证码链接
  l_lotteryVCodeImg: '/captcha/captcha.jpg',

  // 是否显示首页通知
  l_isShowIndexNotice: true,

  // 收藏彩种列表
  l_favoriteLotteryList: loadFavoriteList(),

};

export default state;
