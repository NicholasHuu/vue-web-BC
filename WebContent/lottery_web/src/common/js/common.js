import store from "../../store/index";
export default {
  RONGIMBreak() {
    // 融云断开连接
    RongIMClient.getInstance().disconnect();
  },
  RongIMInit(token) {
    console.log(token);
    // 融云初始化
    RongIMClient.init("z3v5yqkbz1oe0"); // 注册一个账号然后就有这个APPkey啦
    // 这个token呢，一般是登录之后后台返给你的
    RongIMClient.connect(
      token,
      {
        onSuccess: function(userId) {
          console.log("Login successfully." + userId);
          store.commit("SET_CONNECTSTATUS", true);
        },
        onTokenIncorrect: function() {
          console.log("token无效");
        },
        onError: function(errorCode) {
          var info = "";
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = "超时";
              break;
            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
              info = "未知错误";
              break;
            case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
              info = "不可接受的协议版本";
              break;
            case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
              info = "appkey不正确";
              break;
            case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
              info = "服务器不可用";
              break;
          }
          console.log(info);
        }
      }
    );
    // 连接状态监听器
    RongIMClient.setConnectionStatusListener({
      onChanged: function(status) {
        switch (status) {
          // 连接成功
          case RongIMLib.ConnectionStatus.CONNECTED:
            console.log("连接成功");
            break;
          // 正在连接
          case RongIMLib.ConnectionStatus.CONNECTING:
            console.log("正在连接");
            break;
          // 重新连接
          case RongIMLib.ConnectionStatus.DISCONNECTED:
            console.log("断开连接");
            break;
          // 其他设备登陆
          case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
            console.log("其他设备登陆");
            alert("该用户在其它浏览器登录,聊天功能暂不可用");
            break;
          // 网络不可用
          case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
            console.log("网络不可用");
            break;
        }
      }
    });
    // 消息监听器
    RongIMClient.setOnReceiveMessageListener({
      onReceived: function(message) {
        // 判断消息类型
        let newMsgArr = store.getters.chatroom_mes_list.slice(0);
        switch (message.messageType) {
          case RongIMClient.MessageType.TextMessage:
            // message.content.content => 消息内容

            message.content.content = RongIMLib.RongIMEmoji.symbolToEmoji(
              message.content.content
            );
            newMsgArr.push(message);
            break;
          case RongIMClient.MessageType.VoiceMessage:
            // 对声音进行预加载
            // message.content.content 格式为 AMR 格式的 base64 码
            break;
          case RongIMClient.MessageType.ImageMessage:
            // message.content.content => 图片缩略图 base64。
            // message.content.imageUri => 原图 URL。
            break;
          case RongIMClient.MessageType.DiscussionNotificationMessage:
            // message.content.extension => 讨论组中的人员。
            break;
          case RongIMClient.MessageType.LocationMessage:
            // message.content.latiude => 纬度。
            // message.content.longitude => 经度。
            // message.content.content => 位置图片 base64。
            break;
          case RongIMClient.MessageType.RichContentMessage:
            // message.content.content => 文本消息内容。
            // message.content.imageUri => 图片 base64。
            // message.content.url => 原图 URL。
            break;
          case RongIMClient.MessageType.InformationNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.ContactNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.ProfileNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.CommandNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.CommandMessage:
            // do something...
            break;
          case RongIMClient.MessageType.UnknownMessage:
            // do something...
            break;
          default:
          // do something...
        }
        store.commit("CHATROOM_MES_LIST", newMsgArr);
      }
    });

    var config = {
      size: 24,
      url: "//f2e.cn.ronghub.com/sdk/emoji-48.png",
      lang: "zh", // 扩展表情 // 大小, 默认 24, 建议18 - 58 // Emoji 背景图片 // Emoji 对应名称语言, 默认 zh
      extension: {
        dataSource: {
          u1F914: {
            en: "thinking face",
            zh: "思考",
            tag: "🤔",
            position: "0 0"
          }
        }, // 新增 Emoji 背景图 url // 英文名称 // 中文名称 // 原生 Emoji // 所在背景图位置坐标
        url: "//cdn.ronghub.com/thinking-face.png"
      }
    };
    RongIMLib.RongIMEmoji.init(config);
    // console.log(RongIMLib.RongIMEmoji.list);
  },
  // 表情处理
  RongIMEmojiDeal() {
    return RongIMLib.RongIMEmoji;
  },
  //加入聊天室
  RongIMjoinChatroom(chatRoomId) {
    // chatRoomId 聊天室 Id。
    var count = 10; // 拉取最近聊天最多 50 条。

    RongIMClient.getInstance().joinChatRoom(chatRoomId, count, {
      onSuccess: function() {
        // 加入聊天室成功。

        console.log("加入聊天室成功");
      },
      onError: function(error) {
        // 加入聊天室失败
        console.log("加入聊天室失败");
      }
    });
  },
  // 退出聊天室
  RongIMquitChatroom(chatRoomId) {
    RongIMClient.getInstance().quitChatRoom(chatRoomId, {
      onSuccess: function() {
        // 退出聊天室成功。
        console.log("退出聊天室成功");
      },
      onError: function(error) {
        // 退出聊天室失败。
        console.log("退出聊天室失败");
      }
    });
  },
  // 获取聊天室信息
  getChatroomInfo(chatRoomId) {
    var countPeople = 10; // 获取聊天室人数 （范围 0-20 ）
    var order = RongIMLib.GetChatRoomType.REVERSE; // 排序方式。
    RongIMClient.getInstance().getChatRoomInfo(chatRoomId, countPeople, order, {
      onSuccess: function(chatRoom) {
        // chatRoom => 聊天室信息。
        // chatRoom.userInfos => 返回聊天室成员。
        // chatRoom.userTotalNums => 当前聊天室总人数。
        console.log(chatRoom.userTotalNums);
        console.log(chatRoom.userInfos);
      },
      onError: function(error) {
        // 获取聊天室信息失败。
      }
    });
  },
  // 发送消息
  sendChatroomMessage(chatMsg, chatRoomId) {
    var msg = new RongIMLib.TextMessage({
      content: chatMsg,
      extra: "附加信息"
    });
    var conversationtype = RongIMLib.ConversationType.CHATROOM; // 单聊,其他会话选择相应的消息类型即可。
    // 目标 Id chatRoomId
    // var chatRoomId = "0001";
    RongIMClient.getInstance().sendMessage(conversationtype, chatRoomId, msg, {
      onSuccess: function(message) {
        //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
        console.log(message);
        console.log("Send successfully");
        let newMsgArr0 = store.getters.chatroom_mes_list.slice(0);
        newMsgArr0.push(message);
        store.commit("CHATROOM_MES_LIST", newMsgArr0);
      },
      onError: function(errorCode, message) {
        var info = "";
        switch (errorCode) {
          case RongIMLib.ErrorCode.TIMEOUT:
            info = "超时";
            break;
          case RongIMLib.ErrorCode.UNKNOWN_ERROR:
            info = "未知错误";
            break;
          case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
            info = "在黑名单中，无法向对方发送消息";
            break;
          case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
            info = "不在讨论组中";
            break;
          case RongIMLib.ErrorCode.NOT_IN_GROUP:
            info = "不在群组中";
            break;
          case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
            info = "不在聊天室中";
            break;
          default:
            info = x;
            break;
        }
        console.log("发送失败:" + info);
      }
    });
  },
  // 将聊天内容换行以及表情进行转换
  TrimContentAndEmoji(str) {
    // str表示要转换的字符串
    let newStr = str || "";
    let content = newStr.replace(/\n|\r\n/g, "<br/>");
    content = RongIMLib.RongIMEmoji.symbolToEmoji(content);
    return content;
  }
};
