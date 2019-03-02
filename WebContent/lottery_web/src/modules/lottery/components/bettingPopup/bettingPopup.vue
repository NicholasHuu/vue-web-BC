<template>
  <div class="bettingPopup" v-show="l_isShowBettingPopup">
      <div class="betBox">
          <div class="titleBox">
              <div class="title">投注确认</div>
              <div class="close">
                  <i class="btn el-icon-close" @click="closePopup"></i>
              </div>
          </div>
          <div class="contentBox">
              <div class="infoBox">
                  <div class="left">
                      <div class="tips">请核准您的投注信息</div>
                      <div class="czName">彩种：{{l_curLottsCountDown.gameName}}</div>
                      <div class="qsNum">期号：{{l_curLottsCountDown.qs}}</div>
                  </div>
                  <div class="right">
                      <div>付款总金额</div>
                      <div class="money">{{money}}元</div>
                  </div>
              </div>
              <div class="betListBox">
                  <span class="tips">投注详情：</span>
                  <div class="box">
                      <ul>
                          <li v-for="(item,index) in l_lotteryBettOrderList" :key="index">
                              [{{item.currentGameName}}]   <span>{{item.content}}</span>
                            </li>
                      </ul>
                  </div>
              </div>
              <div class="btnBox">
                  <div class="okBtn btn" @click="promptlyBet">确认</div>
              </div>
          </div>
      </div>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "bettingPopup",
  data() {
    return {
      money: 0,
      count: 0,
      params: {}
    };
  },
  methods: {
    ...mapActions(["l_lotteryOrderBet"]),
    ...mapMutations({
      setIsShowBettingPopup: "L_SET_IS_SHOW_BETTING_POPUP"
    }),

    // 关闭弹窗
    closePopup() {
      this.setIsShowBettingPopup(false);
    },

    // 立即投注
    promptlyBet() {
      this.l_lotteryOrderBet(this.params);
    },
    // 获取彩种代码
    getLottsCode() {
      return this.$route.params.lottsCode;
    }
  },
  watch: {
    l_isShowBettingPopup: {
      handler: function() {
        let order = [];
        let traceOrder = [];
        let _money = 0;
        let tempTrace = {
          qs: this.l_curLottsCountDown.qs,
          betMultiple: 1
        };

        if (this.l_isShowBettingPopup) {
          this.count = 0;
          this.l_lotteryBettOrderList.forEach(item => {
            _money += item.money * 1000;
            this.count += item.count;
            let temp = {
              lotteryGame: item.lotteryGame,
              content: item.content.replace(/\s+/g,""),
              counts: item.count,
              unit: item.unit.value,
              bounsType: item.bonus.bonusType,
              multiple: item.multiple
            };
            order.push(temp);
          });

          if (this.l_traceData.traceOrder.length > 0) {
            this.l_traceData.traceOrder.forEach(item => {
              let tempItem = {
                qs: item.qs,
                betMultiple: item.multiple
              };
              traceOrder.push(tempItem);
            });
            this.money = this.l_traceData.amount;
          } else {
            traceOrder.push(tempTrace);
            this.money = _money / 1000;
          }

          this.params = {
            lotteryCode: this.getLottsCode(),
            amount: this.money,
            counts: this.l_traceData.isTrace == 1 ? this.l_traceData.counts : this.count,
            isTrace: this.l_traceData.isTrace,
            order: JSON.stringify(order),
            traceOrder: JSON.stringify(traceOrder),
            traceWinStop: this.l_traceData.traceWinStop
          };
        }
      }
    },
    deep: true
  },
  computed: {
    ...mapGetters([
      "l_lotteryBettOrderList",
      "l_isShowBettingPopup",
      "l_traceData",
      "l_curLottsCountDown"
    ])
  }
};
</script>


<style lang="sass" scoped>
@import "~common/sass/variable"

.bettingPopup
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 10
    background-color: rgba(0,0,0,.7)
    .betBox
        width: 435px
        height: 440px
        background-color: $color_text_white
        position: fixed
        left: 0
        top: 0
        right: 0
        bottom: 0
        margin: auto
        .titleBox
            height: 40px
            line-height: 40px
            box-sizing: border-box
            background-color: $color_theme
            padding: 0 15px
            .title
                font-size: $fs18
                font-weight: bold
                color: $color_text_white
            .close
                font-size: 28px
                float: right
                position: relative
                top: -40px
                color: $color_text_white
                i
                    transition: all 300ms
                    transform: rotate(0deg)
                    &:hover
                        transform: rotate(180deg)
        .contentBox
            padding: 22px
            .infoBox
                line-height: 25px
                font-size: $fs14
                color: #666
                .left
                  display: inline-block
                .right
                    margin-top: 5px
                    display: inline-block
                    float: right
                    text-align: right
                    .money
                        font-size: $fs28
                        color: $color_theme
                .tips
                    font-size: $fs14
                    color: #333
                    font-weight: bold
            .betListBox
                margin-top: 15px
                .tips
                    font-size: $fs14
                    color: #333
                .box
                    width: 100%
                    height: 180px
                    background-color: #ebebeb
                    border: 1px solid #999
                    box-sizing: border-box
                    padding: 15px 10px
                    margin-top: 10px
                    font-size: $fs14
                    overflow-y: scroll
                    color: #333
                    li 
                        overflow: hidden
                        word-wrap: break-word
                        line-height: 20px
                        span
                            margin-left: 20px
            .btnBox
                text-align: center
                margin-top: 20px
                .okBtn
                    width: 192px
                    height: 40px
                    margin: 0 auto
                    text-align: center
                    line-height: 40px
                    font-size: $fs18
                    color: $color_text_white
                    background-color: $color_theme
</style>
