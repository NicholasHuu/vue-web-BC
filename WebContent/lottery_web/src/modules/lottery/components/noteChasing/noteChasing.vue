<template>
  <div class="noteChasing">
    <div class="tabBox">
      <div class="myBet" :class="{'active': tabIndex == 0}" @click="changeTabIndex(0)">我的投注</div>
      <div class="myNum" :class="{'active': tabIndex == 1}" @click="changeTabIndex(1)">我的追号</div>
      <div class="refreshBtn btn" @click="changeTabIndex(tabIndex)">
        <img src="./refresh.png" :class="{'refreshAni': isRefreshAni}" alt>
        <span>刷新</span>
      </div>
    </div>
    <div class="container">
      <div class="bet" v-show="tabIndex == 0">
        <ul class="title">
          <li>时间</li>
          <li>彩种</li>
          <li>玩法</li>
          <li>期号</li>
          <li class="tznr notFlex">投注内容</li>
          <li class="bs-w notFlex">倍数</li>
          <li class="bs-w notFlex">金额类型</li>
          <li class="sm-w notFlex">金额</li>
          <li class="sm-w notFlex">奖金</li>
          <li class="bs-w notFlex">追号</li>
          <li class="sm-w notFlex">状态</li>
          <li class="bs-w notFlex">操作</li>
        </ul>
        <ul class="listBox">
          <li
            class="item btn"
            @click="showBetDetail(item)"
            v-for="(item,index) in l_lotteryBetList"
            :key="index"
          >
            <div>{{item.betTime}}</div>
            <div>{{item.lotteryName}}</div>
            <div>{{item.gameName}}</div>
            <div>{{item.betQishu}}</div>
            <div class="tznr notFlex">
              <i>{{item.content}}</i>
            </div>
            <div class="bs-w notFlex">{{item.multipe}}</div>
            <div class="bs-w notFlex">{{item.model}}</div>
            <div class="sm-w notFlex">{{item.betMoney}}</div>
            <div class="sm-w notFlex" :class="{'isWin': item.winMoney > 0}">
              <span>{{item.winMoney}}</span>
            </div>
            <div class="bs-w notFlex">{{item.isTrace}}</div>
            <div class="sm-w notFlex" :class="{'isWin': item.winMoney > 0}">
              <span>{{item.status}}</span>
            </div>
            <div
              class="bs-w notFlex btn cdBtn"
              v-show="item.statusValue == 0"
              @click.stop="orderStop(item)"
            >撤单</div>
            <div class="bs-w notFlex btn cdBtn" v-show="item.statusValue != 0"></div>
          </li>
        </ul>
      </div>
      <div class="num" v-show="tabIndex == 1">
        <ul class="title">
          <li>彩种</li>
          <li>玩法</li>
          <li>起始期号</li>
          <li>追号时间</li>
          <li>已追期数/总期数</li>
          <li>已追金额/中奖金额</li>
          <li class="sm-w notFlex">追中即停</li>
          <li class="sm-w notFlex">状态</li>
        </ul>
        <ul class="listBox">
          <li
            class="item btn"
            @click="lookAppendDetail(item)"
            v-for="(item,index) in l_lotteryAppendList"
            :key="index"
          >
            <div>{{item.lotteryName}}</div>
            <div>{{item.gameName}}</div>
            <div>{{item.startTraceQishu}}</div>
            <div>{{item.startTraceTime}}</div>
            <div>{{item.traceCountRate}}</div>
            <div>{{item.traceMoney}}/{{item.betWinMoney}}</div>
            <div class="sm-w notFlex">{{item.traceWinStop}}</div>
            <div class="sm-w notFlex">{{item.status}}</div>
          </li>
        </ul>
      </div>
    </div>
    <BetDetailPopup
      v-show="popupStaus"
      @betClosePopup="betClosePopup"
      :betDetailTable="betDetailTable"
    />
    <AppendDetailPopup
      v-if="appendPopupStaus"
      :m_zhuihaoDetail="appendDetails"
      @closePopup="closePopup"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ERR_OK } from "api/config";
import { getLotteryBetDetail, lotteryAppendDetail } from "api/member/memberApi";
import BetDetailPopup from "modules/member/components/gameRecord/detailPopup/betDetailPopup";
import AppendDetailPopup from "modules/member/components/gameRecord/detailPopup/appendDetailPopup";

export default {
  name: "noteChasing",
  data() {
    return {
      tabIndex: 0,
      popupStaus: false,
      appendPopupStaus: false,
      betDetailTable: {},
      appendDetails: {},
      isRefreshAni: false,
      timer: null
    };
  },
  created() {
    this.l_getLotteryBetList({
      lotteryCode: "",
      startTime: "",
      finishTime: "",
      account: "",
      flag: "",
      currentPage: "1",
      pageLimit: "10",
      gameCode: "",
      status: ""
    });
  },
  methods: {
    // 关闭追号详情弹窗
    betClosePopup() {
      this.popupStaus = false;
    },
    // 关闭追号详情弹窗
    closePopup() {
      this.appendPopupStaus = false;
    },
    lookAppendDetail(item) {
      lotteryAppendDetail(item.orderNumber, item.ordreId).then(res => {
        if (res.errorCode == ERR_OK) {
          this.appendDetails = res.datas;
          this.appendPopupStaus = !this.appendPopupStaus;
        } else {
          console.log(res.msg);
        }
      });
    },
    //  显示注单详情
    showBetDetail(item) {
      getLotteryBetDetail(item.id).then(res => {
        if (res.errorCode == ERR_OK) {
          this.betDetailTable = res.datas;
          this.popupStaus = !this.popupStaus;
        } else {
          this.$alert(res.msg, "温馨提示", {
            confirmButtonText: "确定",
            type: "error",
            center: true,
            lockScroll: false
          });
        }
      });
    },
    //  撤单
    orderStop(item) {
      this.l_lotteryOrderStop(item.id).then(res => {
        if (res && res.errorCode == ERR_OK) {
          this.changeTabIndex(this.tabIndex);
          this.$alert("撤单成功！", "提示", {
            confirmButtonText: "确定",
            type: "success",
            center: true,
            lockScroll: false
          });
        } else {
          this.$alert("撤单失败请重试<br>" + res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error",
            dangerouslyUseHTMLString: true,
            center: true,
            lockScroll: false
          });
        }
      });
    },
    getLottsCode() {
      return this.$route.params.lottsCode;
    },

    changeTabIndex(index) {
      clearInterval(this.timer);
      this.isRefreshAni = true;
      this.timer = setInterval(() => {
        this.isRefreshAni = !this.isRefreshAni;
        if (index == 0) {
          this.l_getLotteryBetList({
            lotteryCode: "",
            startTime: "",
            finishTime: "",
            account: "",
            flag: "",
            currentPage: "1",
            pageLimit: "10",
            gameCode: "",
            status: ""
          });
        } else {
          this.l_getLotteryAppendList({
            lotteryCode: "",
            startTime: "",
            finishTime: "",
            account: "",
            flag: "",
            currentPage: "1",
            pageLimit: "10",
            gameCode: "",
            status: ""
          });
        }
      }, 2000);

      this.tabIndex = index;
    },

    ...mapActions([
      "l_getLotteryBetList",
      "l_getLotteryAppendList",
      "l_lotteryOrderStop"
    ])
  },
  computed: {
    ...mapGetters([
      "l_lotteryBetList",
      "l_isBettingSuccess",
      "l_lotteryAppendList"
    ])
  },
  watch: {
    l_isBettingSuccess: function(val, oval) {
      if (val) {
        this.changeTabIndex(this.tabIndex);
      }
    }
  },
  components: {
    BetDetailPopup,
    AppendDetailPopup
  },
  mounted() {
    this.changeTabIndex(0);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="sass" scoped>
@import "~common/sass/variable"

.noteChasing
    margin-top: 10px
    box-shadow: 0 0 8px 0 rgba(0,0,0,.3)
    background-color: $color_text_white
    .tabBox
        height: 40px
        line-height: 40px
        background-color: #f3f3f3
        position: relative
        &>div
            padding: 0 35px
            cursor: pointer
            display: inline-block
            float: left
            font-size: $fs14
            color: #666
            user-select: none
            border-right: 1px solid #dedede
            &.refreshBtn
              position: absolute
              right: 0
              border: 0
              height: 100%
              img
                vertical-align: middle
              span
                color: $color_theme
                margin-left: 5px
            &.active
                background-color: $color_text_white
                color: $color_theme
                position: relative
                &:after
                  position: absolute
                  right: -12px
                  content: ''
                  bottom: 0
                  border-left: 12px solid #dadada
                  border-top: 40px solid transparent
    .container
        padding: 9px 8px
        .bet
          .title
            li:not(.notFlex)
              width: 121px
          .listBox
            .item
              div:not(.notFlex)
                width: 121px
        .num
          .title
            li:not(.notFlex)
              width: 147px
          .listBox
            .item
              div:not(.notFlex)
                width: 147px
        .bet,.num
            .title
                background-color: #b7b4b4
                height: 24px
                font-size: $fs12
                color: $color_text_white
                li
                    text-align: center
                    float: left
                    line-height: 24px
                .tznr
                    width: 100px
                .sm-w
                    width: 100px  
                .bs-w
                    width: 50px
            .listBox
                overflow: auto
                .item
                    font-size: $fs12
                    color: $color_text_fade_gray
                    height: 35px
                    line-height: 35px
                    &:not(:last-of-type)
                        border-bottom: 1px solid $color_bg_light_gray
                    div
                        float: left
                        text-align: center
                        i
                          color: #2e68c0
                          white-space: nowrap
                        &.isWin
                          span
                            color: $color_theme
                        &.cdBtn
                          color: #2e68c0
                          text-decoration: underline
                          &:hover
                            color: $color_theme
                    .tznr
                        width: 100px
                        overflow: hidden
                        text-overflow: ellipsis
                    .sm-w
                        width: 100px
                    .bs-w
                        width: 50px
.refreshAni
    animation: refreshAni linear 1s both infinite
@keyframes refreshAni
    0%
        transform: rotate(0deg)
    100%
        transform: rotate(360deg)

</style>
