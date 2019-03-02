import axios from "../axios";
import * as urls from "./apiUrls";
// 获取融云token
export function getRyToken(username) {
  let param = Object.assign({}, { username });
  return axios.post(urls.RyTokenApi(), param);
}
// 获取聊天室ID
export function getChatroomId() {
  let param = Object.assign({});
  return axios.post(urls.ChatroomIdApi(), param);
}
