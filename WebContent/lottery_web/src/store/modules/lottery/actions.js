import * as types from "./mutationsTypes";
import * as lottsApi from "api/lottery/lotteryApi";
import { getLotteryBetList, lotteryAppendList } from "api/member/memberApi";
import { ERR_OK } from "api/config";
import { OPEN_RESULT_DEFAULT_COUNT, DEFAULT_FAVORITE } from "common/js/config";
import {
  saveAllLotteryList,
  saveWebSiteName,
  saveInformation,
  loadFavoriteList,
  saveAllLotteryList_custom
} from "common/js/cache";
import { MessageBox, Notification } from "element-ui";
import router from "../../../router";

let isAgain = false;
let timeFunc, timeFuncRes, timeFuncAllTime;

// 获取所有彩票种类
export const l_getAllLottery = ({ commit, state }) => {
  lottsApi.getLotteryAll().then(res => {
    if (res && res.errorCode == ERR_OK) {
      if (
        loadFavoriteList().length > 0 &&
        loadFavoriteList()[0].lotteryCode == "default"
      ) {
        commit(types.L_SET_DEL_FAVORITE_LOTTERY_LIST, "default");
        res.datas.lotteryList.forEach((item, index) => {
          DEFAULT_FAVORITE.forEach(obj => {
            if (item.lotteryCode == obj) {
              state.l_favoriteLotteryList.push(item);
            }
          });
        });
      }
      commit(
        types.L_SET_ALL_LOTTERY,
        saveAllLotteryList(res.datas.lotteryList)
      );
    } else {
      // todo
      console.log(res);
    }
  });
};
export const l_getAllLottery_custom = ({ commit, state }) => {
  lottsApi.getLotteryAllCustom().then(res => {
    if (res && res.errorCode == ERR_OK) {
      commit(
        types.L_SET_ALL_LOTTERY_CUSTOM,
        saveAllLotteryList_custom(res.datas)
      );
    } else {
      console.log(res);
    }
  });
};

// 获取彩种号码
export const l_actGetLotteryNumbers = (
  { commit, state, dispatch },
  lottsCode
) => {
  lottsApi.getLotteryNumbers(lottsCode).then(res => {
    if (res && res.errorCode == ERR_OK) {
      commit(types.L_SET_LOTTERY_NUMBERS, res.datas);
      if (res.datas.game.length > 0) {
        commit(types.L_SET_CUR_PLAY_MODE_LIST, res.datas.game[0]);
        if (res.datas.game[0].group) {
          commit(types.L_SET_CUR_PLAY_MODE, res.datas.game[0].group[0]);
          commit(
            types.L_SET_CUR_NUMBER_LIST,
            res.datas.game[0].group[0].game[0]
          );
        }
      }
    } else {
      MessageBox.alert(res.msg, "温馨提示", {
        confirmButtonText: "确定",
        dangerouslyUseHTMLString: true,
        type: "error",
        center: true,
        lockScroll: false
      });
    }
  });
  dispatch("l_lotteryNextqs", lottsCode);
  dispatch("l_lotteryWinNotice", lottsCode);
};

// 切换标题玩法
export const l_changeTitlePlayMode = ({ commit, state }, code) => {
  console.log(state.l_lotteryNumbers);
  state.l_lotteryNumbers.game.forEach(item => {
    console.log(item.code, code);
    if (item.code == code) {
      commit(types.L_SET_CUR_PLAY_MODE, item.group[0]);
      commit(types.L_SET_CUR_NUMBER_LIST, item.group[0].game[0]);
      commit(types.L_SET_CUR_PLAY_MODE_LIST, item);
    }
  });
};

// 切换子玩法
export const l_changeChildPlayMode = ({ commit, state }, code) => {
  state.l_curPlayModeList.group.forEach(item => {
    item.game.forEach(obj => {
      if (obj.code == code) {
        commit(types.L_SET_CUR_NUMBER_LIST, obj);
      }
    });
  });
};

// 所有彩种倒计时
export const l_getAllCountDown = ({ commit, state, dispatch }, lottsCode) => {
  let time = 200;
  clearTimeout(timeFuncAllTime);
  let _run = () => {
    timeFuncAllTime = setTimeout(() => {
      time = 20000;
      lottsApi.getAllCountDown(lottsCode).then(res => {
        if (res && res.errorCode == ERR_OK) {
          if (res.datas && res.datas.allResult) {
            commit(types.L_SET_ALL_LOTTS_COUNT_DOWN_LIST, res.datas.allResult);
          }
          if (res.datas && res.datas.gameResult) {
            commit(types.L_SET_CUR_LOTTS_COUNT_DOWN, res.datas.gameResult);
          }
          if (res.datas && res.datas.hotResult) {
            commit(types.L_SET_HOT_NUMBER_LIST, res.datas.hotResult);
          }
        } else {
          time = 2000;
          clearTimeout(timeFuncAllTime);
          _run();
        }
      });
      clearTimeout(timeFuncAllTime);
      _run();
    }, time);
  };
  _run();
};

// 获取开奖结果
export const l_getAwardResults = ({ commit, state }, params) => {
  let time = 0;
  clearTimeout(timeFuncRes);
  let _run = () => {
    timeFuncRes = setTimeout(() => {
      time = 20000;
      lottsApi.getResult(params.lottsCode, params.count).then(res => {
        if (res && res.errorCode == ERR_OK) {
          if (res.datas && res.datas.openResult.length > 0) {
            commit(types.L_SET_AWAED_RESULTS, res.datas.openResult);
            commit(types.L_SET_CUR_NEW_AWAED_RESULT, res.datas.openResult[0]);
          }
        } else {
          // todo
          console.log(res);
        }
      });
      clearTimeout(timeFuncRes);
      _run();
    }, time);
  };
  _run();
};

// 获取历史开奖结果
export const l_getHistoryOPenResult = ({ commit, state }, params) => {
  return lottsApi.getResult(params.lottsCode, params.count);
};

// 获取投注记录
export const l_getLotteryBetList = ({ commit, state }, params) => {
  getLotteryBetList(params).then(res => {
    if (res && res.errorCode == "000005") {
      return;
    }
    if (res && res.errorCode == ERR_OK) {
      if (res.datas && res.datas.resultList) {
        commit(types.L_SET_LOTTERY_BET_LIST, res.datas.resultList);
      }
    } else {
      // todo
      console.log(res);
    }
  });
};

// 获取追号记录
export const l_getLotteryAppendList = ({ commit, state }, params) => {
  lotteryAppendList(params).then(res => {
    if (res && res.errorCode == ERR_OK) {
      if (res.datas && res.datas.resultList) {
        commit(types.L_SET_LOTTERY_APPEND_LIST, res.datas.resultList);
      }
    } else {
      MessageBox.alert(res.msg, "温馨提示", {
        confirmButtonText: "确定",
        dangerouslyUseHTMLString: true,
        type: "error",
        center: true,
        lockScroll: false
      });
    }
  });
};

// 添加到购彩
export const l_addlotteryShoppingList = ({ commit, state }, list) => {
  commit(types.L_SET_LOTTERY_SHOPPING_LIST, list);
};

// 删除购彩列表指定列
export const l_lotteryDeleteShoppingItem = ({ commit, state }, index) => {
  commit(types.L_SET_LOTTERY_DELETE_SHOPPING_ITEM, index);
};

// 删除购彩列表
export const l_lotteryDeleteShoppingAll = ({ commit, state }, list) => {
  commit(types.L_SET_LOTTERY_DELETE_SHOPPING_ALL, list);
};

// 下注
export const l_lotteryOrderBet = ({ commit, state, dispatch }, params) => {
  lottsApi.setOrderBet(params).then(res => {
    if (res && res.errorCode == ERR_OK) {
      if (state.l_isShoppingBetting) {
        //删除购物车
        commit(types.L_SET_LOTTERY_DELETE_SHOPPING_ALL, []);
      }
      commit(types.L_SET_LOTTERY_BET_ORDER_LIST, []);
      commit(types.L_SET_IS_SHOW_BETTING_POPUP, false);
      commit(types.L_SET_IS_BETTING_SUCCESS, true);
      MessageBox.alert("恭喜您，下注成功", "提示", {
        confirmButtonText: "确定",
        center: true,
        lockScroll: false
      });
      let tempPatams = {
        lotteryCode: "",
        startTime: "",
        finishTime: "",
        account: "",
        flag: "",
        currentPage: "1",
        pageLimit: "10",
        gameCode: "",
        status: ""
      };
      if (params.isTrace == 1) {
        dispatch("l_getLotteryAppendList", tempPatams);
        dispatch("l_getLotteryBetList", tempPatams);
      } else {
        dispatch("l_getLotteryBetList", tempPatams);
      }
    } else {
      commit(types.L_SET_IS_SHOW_BETTING_POPUP, false);
      commit(types.L_SET_IS_BETTING_SUCCESS, false);
      MessageBox.alert(res.msg, "温馨提示", {
        confirmButtonText: "确定",
        dangerouslyUseHTMLString: true,
        type: "error",
        center: true,
        lockScroll: false
      });
    }
  });
};

// 获取下期期号
export const l_lotteryNextqs = ({ commit, state }, lotteryCode) => {
  lottsApi.nextqs(lotteryCode).then(res => {
    if (res && res.errorCode == ERR_OK) {
      commit(types.L_SET_MISS_OBJ, res.datas.yl);
    } else {
      // todo
      console.log(res);
    }
  });
};

// 生成追号方案
export const l_lotteryTracePlan = ({ commit, state }, param) => {
  let params = {
    count: param.count,
    lotteryCode: param.lotteryCode,
    gameCode: param.gameCode
  };
  return lottsApi.getTracePlan(params);
};

// 撤单
export const l_lotteryOrderStop = ({ commit, state }, id) => {
  return lottsApi.orderStop(id);
};

// 中奖通知
export const l_lotteryWinNotice = ({ commit, state, dispatch }, lottsCode) => {
  clearTimeout(timeFunc);
  let _run = () => {
    timeFunc = setTimeout(() => {
      lottsApi.getWinNotice().then(res => {
        if (res && res.errorCode == "000005") {
          return;
        }
        if (res && res.errorCode == ERR_OK) {
          if (res.datas.notices.length > 0) {
            dispatch("l_getAwardResults", {
              lottsCode: lottsCode,
              count: OPEN_RESULT_DEFAULT_COUNT
            });
          }
          res.datas.notices.forEach((item, index) => {
            function loop(obj) {
              setTimeout(() => {
                Notification({
                  title: "中奖通知",
                  message: obj.content,
                  position: "bottom-right",
                  type: "info"
                });
              }, 500 * index);
            }
            loop(item);
          });
        } else {
          // todo
          console.log(res);
        }
        clearTimeout(timeFunc);
        _run();
      });
    }, 10000);
  };
  _run();
};

// 获取冷热
export const l_lotteryLr = ({ commit, state }, params) => {
  lottsApi.getLr(params).then(res => {
    if (res && res.errorCode == ERR_OK) {
      commit(types.L_SET_HOT_COLD, res.datas.lr);
    } else {
      // todo
      console.log(res);
    }
  });
};

// 首页中奖通知
export const l_indexWinNotice = ({ commit, state }, rows) => {
  return lottsApi.indexWinNotice(rows);
};

// 最新彩种开奖结果
export const l_lotteryNewLatestResult = ({ commit, state }, params) => {
  return lottsApi.newLatestResult(params);
};

// 最新彩种开奖结果
export const l_lotteryRule = ({ commit, state }, params) => {
  return lottsApi.lotteryRule(params);
};

// 公告
export const l_lotteryGonggao = ({ commit, state }, params) => {
  return lottsApi.gonggao(params);
};

// 网站信息接口
export const l_lotteryWebSiteInfo = ({ commit, state }) => {
  lottsApi.webSiteInfo().then(res => {
    if (res && res.errorCode == ERR_OK) {
      if (state.l_lotteryWebSiteInfo.siteName == "首页") {
        saveWebSiteName(res.datas.siteName);
        saveInformation(res.datas.information);
        commit(types.L_SET_WEB_SITE_INFO, res.datas);
        window.location.reload();
      }
      saveWebSiteName(res.datas.siteName);
      commit(types.L_SET_WEB_SITE_INFO, res.datas);
    } else {
      // todo
      console.log(res);
    }
  });
};

// 优惠活动
export const l_lotteryPromosActive = ({ commit, state }) => {
  return lottsApi.promosActive();
};

// 首页热门，低频，高频采种列表
export const l_lotteryHomeHotLottery = ({ commit, state }) => {
  return lottsApi.homeHotLottery();
};

// 帮助记录
export const l_lotteryHomeHelp = ({ commit, state }, params) => {
  return lottsApi.homeHelp(params);
};

// 帮助记录
export const l_lotteryAboutUs = ({ commit, state }) => {
  return lottsApi.aboutUs();
};

// 面板信息
export const l_lotteryPanelInfo = ({ commit, state }, key) => {
  return lottsApi.panelInfo(key);
};

// 切换验证码
export const l_lotteryChangVCodeImg = ({ commit, state }) => {
  let random = ~~(Math.random() * ~~new Date());
  commit(types.L_SET_V_CODE_IMG, state.l_lotteryVCodeImg + "?" + random);
};
