<template>
  <div class="appNumArea">
      <div class="title">
          <ul class="appNumHeader">
              <li class="wfName noFlex">玩法</li>
              <li class="wf noFlex">投注号码</li>
              <li class="ms">模式</li>
              <li class="zjms">金额类型</li>
              <li class="zs">注数</li>
              <li class="bt">倍数</li>
              <li class="js">金额</li>
              <li class="clearBtn noFlex" @click="delAll">全部清除 
                  <!-- <i class="el-icon-circle-close"></i> -->
              </li>
          </ul>
      </div>
      <div class="appNum">
          <ul class="list" >
              <li class="item" v-for="(item,index) in l_lotteryShoppingList" :key="index">
                <div class="wfName noFlex">【{{item.currentGameName}}】</div>
                <div class="wf noFlex"><span>{{item.content}}</span></div>
                <div class="ms">{{item.bonus.bonusName}}</div>
                <div class="zjms">【{{item.unit.name}}】</div>
                <div class="zs">{{item.count}}</div>
                <div class="bt">{{item.multiple}}</div>
                <div class="js"><span>{{item.money}}</span></div>
                <div class="clearBtn noFlex" @click="delItem(index)">
                    删除
                    <!-- <i class="el-icon-circle-close"></i> -->
                </div>
              </li>
          </ul>
      </div>
      <div class="confirmAppNumBox">
          <div class="appNumInfo">
              <div class="info">
                  <span>已选<i>{{l_lotteryShoppingList.length}}</i>单</span> <span>共计 <i>{{allBetNum}}</i> 注 </span>   <span> 总金额 <i>{{allMoney}}</i> 元</span>
              </div>
          </div>
          <div class="appNumBtns">
              <div class="zh"  @click="afterNo">发起追号 <img src="./icon-add.png" alt=""></div>
              <div class="betConfirm" @click="promptlyBet">确认投注 
                  <img src="./icon-sure.png" alt="">
              </div>
          </div>
      </div>
      <TraceNumberPopup :traceNumberPopupIsShow="tracePopupIsShow" @closePopup="closePopup"/>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import TraceNumberPopup from "../traceNumberPopup/traceNumberPopup";

export default {
  name: "appNumArea",
  data() {
    return {
      allBetNum: 0,
      allMoney: 0,
      isAfterNo: 0,
      tracePopupIsShow: false
    };
  },
  methods: {
    ...mapActions([
      "l_lotteryDeleteShoppingItem",
      "l_lotteryDeleteShoppingAll"
    ]),
    ...mapMutations({
      setIsShowBettingPopup: "L_SET_IS_SHOW_BETTING_POPUP",
      setIsShoppingBetting: "L_SET_IS_SHOPPING_BETTING",
      setTraceData: "L_SET_TRACE_DATA",
      setLotteryBetOrderList: "L_SET_LOTTERY_BET_ORDER_LIST",
    }),
    closePopup(flag) {
      this.tracePopupIsShow = flag;
    },
    //   删除当前列表
    delItem(index) {
      this.l_lotteryDeleteShoppingItem(index);
    },
    //   删除全部
    delAll() {
      this.l_lotteryDeleteShoppingAll([]);
    },
    // 是否追号
    afterNo() {
      if (this.l_lotteryShoppingList.length <= 0) {
        this.$alert("请先选号","温馨提示",{
            confirmButtonText: "确定",
            center: true,
            lockScroll: false
        });
      } else if (this.l_lotteryShoppingList.length > 1) {
        this.$alert("追号只能选择一注","温馨提示",{
            confirmButtonText: "确定",
            center: true,
            lockScroll: false
        });
      } else if (this.l_lotteryShoppingList[0].isTrace==0) {
        this.$alert("当前彩种不能追号","温馨提示",{
            confirmButtonText: "确定",
            center: true,
            lockScroll: false
        });
      }else {
        this.isAfterNo = !this.isAfterNo;
        this.tracePopupIsShow = true;
      }
    },
    // 立即投注
    promptlyBet() {
      if(this.l_curLottsCountDown.isClose == 1){
        this.$alert("已封盘禁止投注", "温馨提示", {
          confirmButtonText: "确定",
          type: 'error',
          center: true,
          lockScroll: false
        });
        return ;
      }
      if (this.l_lotteryShoppingList.length <= 0) {
        this.$alert("请先选号","提示",{
            confirmButtonText: "确定",
            center: true,
            lockScroll: false
        });
      } else {
        this.setTraceData({
          isTrace: 0,
          traceWinStop: 1,
          traceOrder: []
        });
        this.setLotteryBetOrderList(this.l_lotteryShoppingList);
        this.setIsShowBettingPopup(true);
        this.setIsShoppingBetting(true);
      }
    }
  },
  computed: {
    ...mapGetters(["l_lotteryShoppingList", "l_isShoppingBetting","l_curLottsCountDown"])
  },
  watch: {
    l_lotteryShoppingList: function(val, oVal) {
      this.allBetNum = 0;
      this.allMoney = 0;
      let _money = 0;
      if (this.l_isShoppingBetting) {
        val.forEach((item, index) => {
          this.allBetNum += item.count;
          _money += item.money * 1000;
        });
      }
      this.allMoney = _money / 1000;
    }
  },
  components: {
    TraceNumberPopup
  }
};
</script>


<style lang="sass" scoped>
@import '~common/sass/variable'

.appNumArea
    margin-top: 5px
    min-height: 150px
    box-shadow: 0 0 8px 0 rgba(0,0,0,.3)
    background-color: $color_text_white
    .title
        height: 26px
        line-height: 26px
        text-align: center
        font-size: $fs12
        color: #666666
        background-color: #f3f3f3
        .appNumHeader
            width: 100%
            &>li
                box-sizing: border-box
                text-align: left
                float: left
            &>li:not(.noFlex)
                width: 96px
            .clearBtn
                width: 100px
                cursor: pointer
                user-select: none
                color: #7f7fe0
                text-decoration: underline
                i
                    font-size: $fs16
                    margin-left: 5px
    .wf
        width: 370px
        overflow: hidden
        text-overflow: ellipsis
        padding: 0 15px
        white-space: nowrap
        box-sizing: border-box
    .wfName
        width: 150px
        overflow: hidden
        text-overflow: ellipsis
        padding: 0 15px
        white-space: nowrap
        box-sizing: border-box
    .appNum
        min-height: 70px
        .list
            width: 100%
            overflow: auto
            box-sizing: border-box
            .item
                height: 35px
                line-height: 35px
                float: left
                border-bottom: 1px solid #d4d4d4
                &>div
                    text-align: left
                    float: left
                    font-size: $fs12
                    color: #969696
                    span
                        color: $color_theme
                &>div:not(.noFlex)
                    width: 96px
                .clearBtn
                    width: 100px
                    cursor: pointer
                    user-select: none
                    color: #7f7fe0
                    text-decoration: underline
                    i
                        font-size: $fs16
                        margin-left: 5px
    .confirmAppNumBox
        height: 55px
        line-height: 55px
        font-size: $fs12
        color: $color_text_fade_gray
        .appNumInfo
            display: inline-block
            .info
                display: inline-block
                span
                    margin: 0 12px
                    i
                        font-size: $fs14
                        color: $color_theme
                        margin: 0 5px
        .appNumBtns
            margin-left: 290px
            display: inline-block
            font-size: $fs14
            .zh
                width: 100px
                height: 35px
                line-height: 35px
                text-align: center
                display: inline-block
                background-color: $color_theme
                border-radius: 8px
                color: $color_text_white
                cursor: pointer
                user-select: none
                img
                    margin-left: 5px
                    font-size: 16px
                    vertical-align: middle
            .betConfirm
                display: inline-block
                width: 100px
                height: 35px
                line-height: 35px
                text-align: center
                background-color: $color_theme
                border-radius: 8px
                color: $color_text_white
                margin-left: 10px
                cursor: pointer
                user-select: none
                img
                    margin-left: 5px
                    vertical-align: middle
                    font-size: 16px
                
        
</style>
