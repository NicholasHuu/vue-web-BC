/**
 *  接口连接
 */

//获取融云token接口
export function RyTokenApi() {
  return { url: `/lotteryim/get/token`, isShowLoading: false };
}
//获取聊天室ID
export function ChatroomIdApi() {
  return { url: `/lotteryim/rooms`, isShowLoading: false };
}
