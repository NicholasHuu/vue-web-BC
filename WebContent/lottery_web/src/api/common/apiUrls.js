/**
 *  接口连接
 */

// 彩票种类列表
export function lotteryGameListAPI() {
  return {
    url: `/cp/game/list`,
    isShowLoading: true
  };
}

// 彩票盘口列表
export function lotteryitemListAPI() {
  return {
    url: `/cp/item/list`,
    isShowLoading: true
  };
}

// 真人视讯
export function liveLinkAPI() {
  return {
    url: `/lotteryflat/loginH5`,
    isShowLoading: false
  };
}

// 各大类游戏列表
export function homeMenuListAPI() {
  return {
    url: `/lotteryElectronic/menu/bycode`,
    isShowLoading: false
  };
}

// 电子游戏列表
export function electronicListAPI() {
  return {
    url: `/electronic/gamelist`,
    isShowLoading: false
  };
}
// 电子游戏 --- 收藏
export function electronicCollectionAPI(){
  return {
    url: `/electronic/favourite`,
    isShowLoading: true
  };
}

// 电子游戏 --- 登录/进入
export function gameLoginAPI(){
  return {
    url: `/flat/login`,
    isShowLoading: true
  };
}

//首页自定义彩种组倒计时
export function customLotteryGroupAPI(){
  return {
    url: `/lottery/group/times`,
    isShowLoading: false
  };
}
