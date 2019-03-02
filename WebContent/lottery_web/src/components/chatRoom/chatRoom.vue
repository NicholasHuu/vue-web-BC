<template>
  <div class="chatRoom" :class="{'ani':isOpen}" @mouseenter="_clickOpen">
    <div class="chatBoard">
      <div class="chatBoardtitle">
        <div>聊天室</div>
        <div class="quiteChatroom" @click="_clickClose">退出</div>
      </div>
      <div class="chatBoardContain" id="chat-record">
        <div class="mesList" v-for="(item,key) in chatroom_mes_list" :key="key">
          <div class="mesFromOthers" v-if="item.senderUserId!='e0|'+global_userName">
            <div class="mesInfoLeft">
              <img src="./6.png" alt>
            </div>
            <div class="mesInfoRight">
              <p class="mesInfo">
                <span class="mesName">{{item.senderUserId.slice(3)}}</span>
                <span class="mesTime">{{_formatTimer(item.sentTime)}}</span>
              </p>
              <p class="mesContent">
                <span>{{item.content.content}}</span>
              </p>
            </div>
          </div>
          <div class="mesFromMe" v-if="item.senderUserId=='e0|'+global_userName">
            <div class="mesInfoLeft">
              <img src="./6.png" alt>
            </div>
            <div class="mesInfoRight">
              <p class="mesContent">
                <span>{{item.content.content}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chatInput">
      <div class="chatInputUp">
        <div class="MessageForm-tool" id="expressionWrap">
          <div class="expressionWrap" v-show="emojiShow">
            <div
              class="emoji-item"
              v-for="(item,index) in emojiLit"
              :key="index"
              v-html="item.node.outerHTML"
              @click="checkedEmoji(item.symbol)"
            ></div>
          </div>
        </div>
        <!-- <span>发送图片</span> -->
        <span @click="controlEmoji">发送表情</span>
      </div>
      <div class="chatInputContain">
        <textarea class="chatInp" type="text" v-model="contentMsg" @keyup.enter="_sendMessage"/>
        <span @click="_sendMessage">发送(S)</span>
      </div>
    </div>
    <div class="arrow btn mCeTB">
      <img src="./arrow.png" class="ce" :class="{'open':isOpen}" alt>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ryChatroom from "../../common/js/common.js";
import { formatDuring } from "../../common/js/utils.js";
import store from "../../store";
export default {
  name: "chatRoom",
  data() {
    return {
      isOpen: false,
      isjoin: false,
      emojiShow: false,
      emojiLit: [],
      contentMsg: "",
      chatroommeslist: []
    };
  },
  created() {},
  mounted() {
    this.emojiLit = ryChatroom.RongIMEmojiDeal().list;
  },
  methods: {
    ...mapActions(["get_chatroomId"]),
    controlEmoji() {
      this.emojiShow = !this.emojiShow;
    },
    checkedEmoji(symbol) {
      // 选中emoji表情
      this.contentMsg += ryChatroom.TrimContentAndEmoji(symbol);
      this.emojiShow = false;
    },
    _clickOpen() {
      // 当连接了融云后允许打开聊天室
      if (this.set_connectstatus) {
        if (!this.isjoin) {
          console.log(this.isjoin);
          ryChatroom.RongIMjoinChatroom(this.chatroom_id);
        }
        this.isOpen = true;
        this.isjoin = true;
      }
    },
    _clickClose() {
      this.isOpen = false;
      ryChatroom.getChatroomInfo(this.chatroom_id);
    },
    // 发送消息
    _sendMessage() {
      // 当消息为空的时候不发送
      if (this.contentMsg) {
        // 把自己的消息加入到消息列表
        ryChatroom.sendChatroomMessage(this.contentMsg, this.chatroom_id);
      }
      this.contentMsg = "";
      this.scollBottom();
    },
    // 格式化时间
    _formatTimer(time) {
      return formatDuring(time);
    },
    // 使聊天框滑到最底部
    scollBottom() {
      // 像发送图片这些，图片渲染需要一点时间，所以要用setTimeout
      let div = document.getElementById("chat-record");
      setTimeout(function() {
        div.scrollTop = div.scrollHeight;
      }, 100);
    }
  },
  watch: {
    chatroom_mes_list: function(newlist, oldlist) {
      this.scollBottom();
    }
  },
  computed: {
    ...mapGetters([
      "u_ryToken",
      "global_userName",
      "set_connectstatus",
      "chatroom_mes_list",
      "chatroom_id"
    ])
  }
};
</script>

<style lang="sass" scoped>
@import '~common/sass/variable'
.chatRoom
    width: 300px
    height: 100%
    position: fixed
    border: 1px solid black
    box-shadow: 0 0 8px 0 rgba(0,0,0,.3)
    transform: translate3d(-300px,0,0)
    transition: all .5s
    left: 0px
    top: 0px
    z-index: 7
    background-color: $color_text_white
    font-size: 14px
    &.ani
        transform: translate3d(0,0,0)
        left: 0px
    .arrow
        position: absolute
        background-image: url('arrowBg.png')
        background-repeat: no-repeat
        width: 24px
        right: -24px
        height: 88px
        transition: all .5s
        transform: rotate(0deg)
        .open
            transform: rotate(0deg)
    .chatBoard
        height: 70%
        border-bottom: 3px solid black
        .chatBoardtitle
            height: 10%
            background-color: #CCC
            display: flex
            div
                flex: 1
            .quiteChatroom
                cursor: pointer
                text-align: right
        .chatBoardContain
            height: 90%
            overflow-y: scroll
            overflow-x: hidden
            .mesList  
                margin-top: 5px
                display: flex
                // height: 40px
                .mesFromOthers
                    display: flex
                    width: 300px
                    .mesInfoLeft
                        margin-left: 3px
                        width: 40px
                        img
                            width: 40px
                            height: 40px
                            border-radius: 3px
                    .mesInfoRight
                        margin-left: 6px
                        width: 200px
                        .mesInfo
                            .mesName
                                color: green
                            .mesTime
                                background-color: #DDD
                                color: white
                                padding: 1px 5px
                                border-radius: 6px
                        .mesContent
                            width: 100%
                            margin-top: 7px
                            padding: 6px
                            height: auto
                            word-wrap: break-word
                            word-break: break-all
                            overflow: hidden
                            span
                                display: inline-block
                                padding: 4px
                                background-color: #DDD
                                color: black
                                line-height: 150%
                .mesFromMe
                    width: 300px
                    overflow: hidden
                    .mesInfoLeft
                        float: right
                        margin-right: 3px
                        width: 40px
                        img
                            width: 40px
                            height: 40px
                            border-radius: 3px
                    .mesInfoRight
                        float: right
                        margin-right: 16px
                        width: 200px
                        .mesContent
                            width: 100%
                            margin-top: 7px
                            padding: 6px
                            overflow: hidden
                            span
                                background-color: green
                                color: white
                                display: inline-block
                                float: right
                                padding: 4px
                                line-height: 150%

    .chatInput
        height: 30%
        border: 1px solid red
        .chatInputUp
            height: 10%
            display: flex
            position: relative
            span
                flex: 0.3
                cursor: pointer
            span:nth-child(1)
                background-color: red
            span:nth-child(2)
                background-color: #DDD
        .chatInputContain
            height: 90%
            position: relative
            .chatInp
                width: 95%
                height: 80%
                border: 1px solid pink
            span
                display: block
                cursor: pointer
                background-color: yellow
                padding: 5px
                border-radius: 2px
                position: absolute
                bottom: 5px
                right: 5px
.MessageForm-tool
    .expressionWrap
        position: absolute
        top: -270px
        z-index: 66
        background-color: #CCC
        .emoji-item
            display: inline-block


</style>
