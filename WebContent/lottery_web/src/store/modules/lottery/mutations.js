import * as types from './mutationsTypes'
import {
  saveFavoriteList,
} from 'common/js/cache'
const mutations = {

  // 彩种号码
  [types.L_SET_LOTTERY_NUMBERS](state, obj) {
    state.l_lotteryNumbers = obj;
  },

  // 当前机选号码
  [types.l_curAutoChoseList](state, list) {
    state.l_curAutoChoseList = list;
  },

  // 当前玩法列表
  [types.L_SET_CUR_PLAY_MODE_LIST](state, list) {
    state.l_curPlayModeList = list;
  },

  // 当前玩法
  [types.L_SET_CUR_PLAY_MODE](state, obj) {
    state.l_curPlayMode = obj;
  },

  // 当前号码列表
  [types.L_SET_CUR_NUMBER_LIST](state, list) {
    state.l_curNumberList = list;
  },

  // 热门号码列表
  [types.L_SET_HOT_NUMBER_LIST](state, list) {
    state.l_hotNumberList = list;
  },

  // 所有彩种倒计时
  [types.L_SET_ALL_LOTTS_COUNT_DOWN_LIST](state, list) {
    state.l_allLottsCountDownList = list;
  },

  // 当前彩种倒计时
  [types.L_SET_CUR_LOTTS_COUNT_DOWN](state, obj) {
    state.l_curLottsCountDown = obj;
  },

  // 开奖结果
  [types.L_SET_AWAED_RESULTS](state, list) {
    state.l_awardResults = list;
  },

  // 所有彩票种类
  [types.L_SET_ALL_LOTTERY](state, list) {
    state.l_allLotteryList = list;
  },
  [types.L_SET_ALL_LOTTERY_CUSTOM](state, list) {
    state.l_allLotteryList_custom = list;
  },

  // 当前最新一期开奖结果
  [types.L_SET_CUR_NEW_AWAED_RESULT](state, obj) {
    state.l_curNewAwardResults = obj;
  },

  // 当前投注记录
  [types.L_SET_LOTTERY_BET_LIST](state, list) {
    state.l_lotteryBetList = list;
  },

  // 当前追号记录
  [types.L_SET_LOTTERY_APPEND_LIST](state, list) {
    state.l_lotteryAppendList = list;
  },

  // 购彩篮列表
  [types.L_SET_LOTTERY_SHOPPING_LIST](state, list,flag = false) {
    if(flag){
      state.l_lotteryShoppingList = list; 
      return;
    }
    state.l_lotteryShoppingList.unshift(list);
  },

  // 投注订单列表
  [types.L_SET_LOTTERY_BET_ORDER_LIST](state, list) {
    state.l_lotteryBettOrderList = list;
  },

  // 删除购彩列表指定列
  [types.L_SET_LOTTERY_DELETE_SHOPPING_ITEM](state, index) {
    state.l_lotteryShoppingList.splice(index, 1);
  },

  // 删除购彩列表
  [types.L_SET_LOTTERY_DELETE_SHOPPING_ALL](state, list) {
    state.l_lotteryShoppingList = list;
  },

  // 是否显示确认下注弹窗
  [types.L_SET_IS_SHOW_BETTING_POPUP](state, flag) {
    state.l_isShowBettingPopup = flag;
  },

  // 是否显示确认下注弹窗
  [types.L_SET_IS_SHOPPING_BETTING](state, flag) {
    state.l_isShoppingBetting = flag;
  },

  // 是否下注成功
  [types.L_SET_IS_BETTING_SUCCESS](state, flag) {
    state.l_isBettingSuccess = flag;
  },

  // 追号数据
  [types.L_SET_TRACE_DATA](state, obj) {
    state.l_traceData = obj;
  },

  // 遗漏数据
  [types.L_SET_MISS_OBJ](state, obj) {
    state.l_lotteryMissObj = obj;
  },

  // 冷热数据
  [types.L_SET_HOT_COLD](state, obj) {
    state.l_lotteryHotCold = obj;
  },

  // 遗漏冷热类型
  [types.L_SET_MISS_HOT_TYPE](state, type) {
    state.l_lotteryMissHotType = type;
  },

  // 网站信息
  [types.L_SET_WEB_SITE_INFO](state, obj) {
    state.l_lotteryWebSiteInfo = obj;
  },

  // 登录验证码链接
  [types.L_SET_V_CODE_IMG](state, str) {
    state.l_lotteryVCodeImg = str;
  },

  // 是否显示首页通知
  [types.L_SET_IS_SHOW_INDEX_NOTICE](state, flag) {
    state.l_isShowIndexNotice = flag;
  },

  // 收藏彩种列表
  [types.L_SET_FAVORITE_LOTTERY_LIST](state, obj) {
    state.l_favoriteLotteryList.push(obj);
    saveFavoriteList(state.l_favoriteLotteryList);
  },

  // 删除收藏彩种列表
  [types.L_SET_DEL_FAVORITE_LOTTERY_LIST](state, code) {
    state.l_favoriteLotteryList.forEach((item,index)=>{
      if(item.lotteryCode == code){
        state.l_favoriteLotteryList.splice(index,1);
      }
    });
    saveFavoriteList(state.l_favoriteLotteryList);
  },
  
 

};

export default mutations;
