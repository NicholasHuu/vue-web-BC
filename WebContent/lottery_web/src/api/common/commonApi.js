import axios from "../axios";
import * as urls from "./apiUrls";

//获取开奖结果
export function getLotteryGameList() {
  let param = Object.assign({});
  return axios.post(urls.lotteryGameListAPI(), param);
}

//获取真人返回链接
export function getLiveLink(flatName, gameCode) {
  let param = Object.assign(
    {},
    {
      flat: flatName,
      gameCode: gameCode
    }
  );
  return axios.post(urls.liveLinkAPI(), param);
}

// 各大类游戏列表
export function homeMenuList() {
  let param = Object.assign({}, {});
  return axios.post(urls.homeMenuListAPI(), param);
}

// 电子游戏列表
export function electronicList(obj) {
  let param = Object.assign(
    {},
    {
      flat: obj.flat,
      code: obj.code,
      client: obj.client,
      pageSize: obj.pageSize,
      pageNo: obj.pageNo,
      gameType: obj.gameType,
      gameName: obj.gameName
    }
  );
  return axios.post(urls.electronicListAPI(), param);
}

// 电子游戏 ---收藏
export function electronicCollection(obj) {
  let param = Object.assign(
    {},
    {
      flat: obj.flat,
      userName: obj.userName,
      client: 0,
      gameCode: obj.gameCode
    }
  );
  return axios.post(urls.electronicCollectionAPI(), param);
}

// 电子游戏 ---登录/进入     AG  gameCode : 500
export function gameLogin(obj) {
  let param = Object.assign(
    {},
    {
      userName: obj.userName,
      flat: obj.flat,
      gameCode: obj.gameCode
    }
  );
  return axios.post(urls.gameLoginAPI(), param);
}

export function customLotteryGroup() {
  let param = Object.assign({}, {});
  return axios.post(urls.customLotteryGroupAPI(), param);
}
