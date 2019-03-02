import storage from "good-storage";

const ALL_LOTTERY_LIST = "__all_lottery_list__";
const ALL_LOTTERY_LIST_CUSTOM = "__all_lottery_list__custom__";
const USER_NAME = "__user_name__";
const WEB_NAME = "__WEB_SITE_NAME__";
const INFORMATION = "__INFORMATION__";
const FAVORITE_LIST = "__FAVORITE_LIST__";
const homeMenuList = "homeMenuList";
const RY_TOKEN = "__RY_TOKEN__";
const CHATROOM_ID = "__CHATROOM_ID__";

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare);
  if (index === 0) {
    return;
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

// 缓存首页数据
export function saveAllLotteryList(list) {
  storage.set(ALL_LOTTERY_LIST, list);
  return list;
}

// 读取首页缓存数据
export function loadAllLotteryList() {
  return storage.get(ALL_LOTTERY_LIST, []);
}

// 读取首页缓存数据
export function saveAllLotteryList_custom(list) {
  return storage.set(ALL_LOTTERY_LIST_CUSTOM, list);
}

export function loadAllLotteryList_custom() {
  return storage.get(ALL_LOTTERY_LIST_CUSTOM, []);
}
// 缓存用户名数据
export function saveUserName(str) {
  storage.session.set(USER_NAME, str);
  return str;
}

// 读取用户名缓存数据
export function loadUserName() {
  return storage.session.get(USER_NAME, "");
}

// 缓存融云token
export function saveRytoken(str) {
  storage.session.set(RY_TOKEN, str);
  return str;
}
// 读取融云token
export function loadRytoken() {
  return storage.session.get(RY_TOKEN, "");
}
// 网站title
export function saveWebSiteName(str) {
  storage.set(WEB_NAME, str);
}

// 网站title
export function loadWebSiteName() {
  return storage.get(WEB_NAME, "首页");
}

// 缓存网站提示信息
export function saveInformation(obj) {
  storage.set(INFORMATION, obj);
}

// 读取网站提示信息缓存
export function loadInformation() {
  return storage.get(INFORMATION, {});
}

// 缓存收藏采种
export function saveFavoriteList(arr) {
  storage.set(FAVORITE_LIST, arr);
}

// 读取收藏采种
export function loadFavoriteList() {
  return storage.get(FAVORITE_LIST, [{ lotteryCode: "default" }]);
}

export function saveHomeMenuList(arr) {
  storage.set(homeMenuList, arr);
  return arr;
}
export function loadHomeMenuList() {
  return storage.get(homeMenuList, []);
}
// 缓存聊天室Id
export function saveCahtroomID(str) {
  storage.session.set(CHATROOM_ID, str);
  return str;
}
// 读取聊天室Id
export function loadCahtroomID() {
  return storage.session.get(CHATROOM_ID, "");
}
