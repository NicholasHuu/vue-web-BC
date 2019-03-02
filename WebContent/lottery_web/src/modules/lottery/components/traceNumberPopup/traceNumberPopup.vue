<template>
  <div class="traceNumberPopup" v-show="traceNumberPopupIsShow">
    <div class="traceNumberBox">
      <div class="titleBox">
        <div class="title">追号设置</div>
        <div class="close">
          <i class="el-icon-close btn" @click="closePopup"></i>
        </div>
      </div>
      <div class="centerBox">
        <div class="tableBox">
          <div class="btn" :class="{'active': tabIndex == 1}" @click="changeTeb(1)">同倍追号</div>
          <div class="btn" :class="{'active': tabIndex == 2}" @click="changeTeb(2)">利润率追号</div>
          <div class="btn" :class="{'active': tabIndex == 3}" @click="changeTeb(3)">翻倍追号</div>
        </div>
        <div class="content">
          <div class="createAppNumBar" v-show="tabIndex == 1">
            <span>连续追：</span>
            <ul class="appendIssue">
              <li class="btn" :class="{'active': nperVal == 5}" @click="cahngeNper(5)">5期</li>
              <li class="btn" :class="{'active': nperVal == 10}" @click="cahngeNper(10)">10期</li>
              <li class="btn" :class="{'active': nperVal == 15}" @click="cahngeNper(15)">15期</li>
              <li class="btn" :class="{'active': nperVal == 20}" @click="cahngeNper(20)">20期</li>
            </ul>
            <span>
              已选：
              <input class="inputQs" v-model.number="nperVal" type="number">期
            </span>
            <span>倍数：</span>
            <div class="select">
              <el-select
                @blur="changeValue"
                v-model="multipleVal"
                filterable
                allow-create
                default-first-option
                clearable
                placeholder="请选择"
              >
                <el-option label="1" value="1"/>
                <el-option label="5" value="5"/>
                <el-option label="10" value="10"/>
                <el-option label="20" value="20"/>
              </el-select>
            </div>
            <div class="traceCreateBtn btn" @click="traceCreate">生成追号计划</div>
          </div>

          <div class="createAppNumBar" v-show="tabIndex == 2">
            <span>最低收益率：</span>
            
            <span>
              已选：
              <input
                class="inputQs"
                v-number-only
                min="1"
                v-model.number="traceBateVal"
                type="number"
              >%
            </span>
            <span>
              追号期数：
              <input
                class="inputQs"
                v-number-only
                min="1"
                v-model.number="nperVal"
                type="number"
              >
            </span>
            <div class="traceCreateBtn btn" @click="traceCreate">生成追号计划</div>
          </div>
          <div class="createAppNumBar" v-show="tabIndex == 3">
            <span>
              起始倍数：
              <input
                class="inputQs"
                v-model.number="startMultipleVal"
                v-number-only
                min="1"
                type="number"
              >
            </span>
            
            <span>
              隔
              <input class="inputQs" v-model.number="everyNperVal" v-number-only type="number">期
            </span>
            <span>
              倍X
              <input
                class="inputQs"
                v-model.number="multipleVal"
                v-number-only
                min="1"
                type="number"
              >
            </span>
            <span>
              追号期数：
              <input class="inputQs" v-model.number="nperVal" v-number-only type="number">
            </span>

            <div class="traceCreateBtn btn" @click="traceCreate">生成追号计划</div>
          </div>
          <div class="listBox">
            <ul>
              <li class="header">
                <div>序号</div>
                <div>
                  <el-checkbox v-model="isCheckedAll" @change="_changeCheckedAll">操作</el-checkbox>
                </div>
                <div>期号</div>
                <div>倍投注数</div>
                <div>累计金额</div>
                <div>中奖盈利</div>
                <div>总盈利率</div>
              </li>
              <li class="item" v-for="(item,index) in traceList" :key="index">
                <div>{{index+1}}</div>
                <div v-show="item.multiple <= l_curNumberList.multipleMax">
                  <el-checkbox v-model="item.isChecked" @change="calcTraceData">操作</el-checkbox>
                </div>
                <div v-show="item.multiple > l_curNumberList.multipleMax">无效</div>
                <div>{{item.qs}}</div>
                <div>
                  <input
                    type="text"
                    disabled
                    v-show="!item.isChecked"
                    v-model.number="item.multiple"
                  >
                  <input
                    type="number"
                    v-show="item.isChecked"
                    @input="debounce(item,index)"
                    v-model.number="item.multiple"
                  >
                </div>
                <div>{{item.totalBet}}</div>
                <div class="txtHide">{{item.winProfit.toFixed(2)}}</div>
                <div class="txtHide">{{item.totalWinProfit}}%</div>
              </li>
            </ul>
          </div>
          <div class="info">
            <div>
              <p>{{selectQs}}</p>
              <p>期数</p>
            </div>
            <div>
              <p>{{selectQs * totalBetNum}}</p>
              <p>注数</p>
            </div>
            <div>
              <p>
                <span>{{totalMoney}}</span>
              </p>
              <p>追号方案总金额(元)</p>
            </div>
            <div>
              <p>{{u_userBalance.balance}}</p>
              <p>账户可用余额(元)</p>
            </div>
            <div>
              <p>
                <TimeDown
                  v-show="l_curLottsCountDown.isClose==0"
                  :time="l_curLottsCountDown.times"
                  @callBackFunc="closePopup"
                />
                <span class="time" v-show="l_curLottsCountDown.isClose==1">封盘中</span>
              </p>
              <p>本期投注截止</p>
            </div>
          </div>
          <div class="bottom">
            <div class="traceSubmit btn" @click="promptlyBet">确认追号投注</div>
            <el-checkbox v-model="traceWinIsStop">中奖后停止追号</el-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeDown from "base/timeDown/timeDown";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { ERR_OK } from "api/config";

export default {
  name: "traceNumberPopup",
  props: {
    traceNumberPopupIsShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tabIndex: 1,
      multipleVal: 1, //倍数
      nperVal: 5, //期数
      selectQs: 0,
      startMultipleVal: 1, //开始倍数
      everyNperVal: 1, //隔多少期数
      isCheckedAll: false,
      traceWinIsStop: true, //中奖后是否停止追号
      traceBateVal: 10, //最低收益率,
      traceList: [],
      tempList: [],
      totalBetNum: 0,
      totalMoney: 0, //总金额
      timeOutFunc: null,
      calcTab2falg: false
    };
  },
  directives: {
    numberOnly: {
      bind: function(el) {
        el.handler = function() {
          var formatVal = /\D/g;
          var val = el.value;
          if (!formatVal.test(val)) {
            var reg = new RegExp(val, "g");
            el.value = val.replace(reg, "");
          }
        };
        el.addEventListener("input", el.handler);
      },
      unbind: function(el) {
        el.removeEventListener("input", el.handler);
      }
    }
  },
  methods: {
    ...mapMutations({
      setIsShowBettingPopup: "L_SET_IS_SHOW_BETTING_POPUP",
      setIsShoppingBetting: "L_SET_IS_SHOPPING_BETTING",
      setTraceData: "L_SET_TRACE_DATA",
      setLotteryBetOrderList: "L_SET_LOTTERY_BET_ORDER_LIST"
    }),
    changeValue(e) {
      this.multipleVal = e.target.value;
    },
    // 全选
    _changeCheckedAll() {
      for (let i = 0; i < this.traceList.length; i++) {
        this.traceList[i].isChecked = this.isCheckedAll;
      }
      this.calcTraceData();
    },
    // 立即投注
    promptlyBet() {
      if (this.traceList.length > 0) {
        if (this.selectQs * this.totalBetNum <= 0) {
          this.$alert("请您先选择追号计划！", "温馨提示", {
            confirmButtonText: "确定",
            center: true,
            lockScroll: false
          });
          return false;
        }
        this.setTraceData({
          counts: this.traceList.length * this.totalBetNum,
          isTrace: 1,
          traceWinStop: this.traceWinIsStop ? 1 : 0,
          traceOrder: this.tempList,
          amount: this.totalMoney
        });

        this.setLotteryBetOrderList(this.l_lotteryShoppingList);
        this.setIsShowBettingPopup(true);
        this.setIsShoppingBetting(true);
        this.closePopup();
      } else {
        this.$alert("请您先生成追号计划！", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
      }
    },
    // 关闭弹层
    closePopup() {
      this.$emit("closePopup", false);
    },
    // 切换tab
    changeTeb(index) {
      if (this.tabIndex == index) return;
      this.traceList = [];
      this.tabIndex = index;
    },
    // 切换期数
    cahngeNper(val) {
      this.nperVal = val;
    },
    //   获取彩种code
    getLottsCode() {
      return this.$route.params.lottsCode;
    },
    // 生成追号计划
    traceCreate() {
      let multiple = 1;
      if (this.tabIndex == 3) {
        multiple = this.startMultipleVal;
      } else {
        multiple = this.multipleVal;
      }
      if (this.tabIndex == 2) {
        let winMoney = 0;
        if (this.l_lotteryShoppingList[0].unit.type == 1) {
          winMoney = this.l_lotteryShoppingList[0].bonus.money;
        } else if (this.l_lotteryShoppingList[0].unit.type == 2) {
          winMoney = this.l_lotteryShoppingList[0].bonus.money / 10;
        } else if (this.l_lotteryShoppingList[0].unit.type == 3) {
          winMoney = this.l_lotteryShoppingList[0].bonus.money / 100;
        }
        let betMoney =
          this.l_lotteryShoppingList[0].unit.value *
          1000 *
          this.l_lotteryShoppingList[0].count;
        let totalBet = (multiple * betMoney) / 1000;
        let winProfit =
          (winMoney * 1000 * multiple) / 1000 - parseFloat(totalBet);
        let totalWinProfit =
          ((winProfit.toFixed(4) * 1000) / (totalBet * 1000)) * 100;
        if (totalWinProfit <= 0 && this.tabIndex == 2) {
          this.$alert("您设置的利率无法满足，请重新设置", "温馨提示", {
            confirmButtonText: "确定",
            center: true,
            lockScroll: false
          });
          return false;
        }
      }
      if (multiple > this.l_curNumberList.multipleMax) {
        this.$message.error(
          "最大倍数不超过" + this.l_curNumberList.multipleMax
        );
        return false;
      }
      if (this.nperVal > this.l_curNumberList.appendQsMax) {
        this.$message.error(
          "最大期数不超过" + this.l_curNumberList.appendQsMax
        );
        return false;
      }
      let param = {
        count: this.nperVal,
        lotteryCode: this.getLottsCode(),
        gameCode: this.l_curNumberList.code
      };

      this.l_lotteryTracePlan(param).then(res => {
        if (res && res.errorCode == ERR_OK) {
          res.datas.resultList.forEach(item => {
            this.$set(item, "isChecked", true);
            this.$set(item, "multiple", multiple);
            this.$set(item, "totalBet", 0);
            this.$set(item, "winProfit", 0);
            this.$set(item, "totalWinProfit", 0);
          });
          this.isCheckedAll = true;
          this.traceList = res.datas.resultList;
          this.calcTraceData();
        } else {
          this.$alert(res.msg, "温馨提示", {
            confirmButtonText: "确定",
            center: true,
            lockScroll: false
          });
        }
      });
    },
    // 限制频率
    debounce(item, index) {
      clearTimeout(this.timeOutFunc);
      let _run = () => {
        this.timeOutFunc = setTimeout(() => {
          if (item.multiple <= 0 || !item.multiple) {
            item.multiple = 1;
          }
          this.calcTraceData(index);
        }, 800);
      };
      _run();
    },

    // 是否全选
    _isSelectAll() {
      let count = 0;
      for (let i = 0; i < this.traceList.length; i++) {
        if (this.traceList[i].isChecked) {
          if (!this.traceList[i].multiple) {
            this.traceList[i].multiple = 1;
          }
          if (this.traceList[i].multiple > this.l_curNumberList.multipleMax) {
            this.traceList[i].isChecked = false;
            break;
          }
          this.tempList.push(this.traceList[i]);
          count++;
        }
      }
      if (count == this.traceList.length) {
        this.isCheckedAll = true;
      } else {
        this.isCheckedAll = false;
      }
      this.selectQs = count;
    },

    // 同倍追号
    tongbeizhuihao(item, tempMoney, prevItem) {
      item.totalBet =
        (tempMoney * item.multiple + prevItem.totalBet * 1000) / 1000;
    },
    // 计算中奖盈利
    calcWinPrizell(item, winMoney) {
      item.winProfit =
        (winMoney * 1000 * item.multiple) / 1000 - parseFloat(item.totalBet);
      item.totalWinProfit =
        ((item.winProfit.toFixed(4) * 1000) / (item.totalBet * 1000)) * 100;

      if (this.tabIndex == 2) {
        if (item.totalWinProfit < this.traceBateVal) {
          let pushNum =
            ((this.traceBateVal / 100) * item.totalBet + item.totalBet) /
            winMoney;
          item.multiple = Math.ceil(pushNum);
          this.calcWinPrizell(item, winMoney, winMoney);
          this.calcTab2falg = true;
        }
        item.totalWinProfit = ~~item.totalWinProfit;
      } else {
        item.totalWinProfit = ~~item.totalWinProfit;
      }
    },
    // 计算追号数据
    calcTraceData(teb3Index) {
      let betMoney = 0;
      let winProfit = 0;
      let totalBet = 0;
      let winMoney = 0;
      let everyNper = 0;
      this.l_lotteryShoppingList.forEach(item => {
        betMoney = item.unit.value * 1000 * item.count;
        if (item.unit.type == 1) {
          winMoney = item.bonus.money;
        } else if (item.unit.type == 2) {
          winMoney = item.bonus.money / 10;
        } else if (item.unit.type == 3) {
          winMoney = item.bonus.money / 100;
        }
        this.totalBetNum = item.count;
      });
      this.tempList = [];
      this._isSelectAll();

      this.tempList.forEach((item, index) => {
        let curBetMoneyTemp = item.multiple * betMoney;
        if (index > 0) {
          if (this.tabIndex == 1) {
            this.tongbeizhuihao(item, betMoney, this.tempList[index - 1]);
          } else if (this.tabIndex == 2) {
            this.tongbeizhuihao(item, betMoney, this.tempList[index - 1]);
          } else if (this.tabIndex == 3) {
            everyNper++;
            if (teb3Index == undefined) {
              if (this.everyNperVal == everyNper) {
                item.multiple =
                  this.multipleVal * this.tempList[index - 1].multiple;
                if (item.multiple > this.l_curNumberList.multipleMax) {
                  item.isChecked = false;
                  if (item.qs == this.tempList[index].qs) {
                    this.calcTraceData();
                  }
                }
                everyNper = 0;
              } else {
                item.multiple = this.tempList[index - 1].multiple;
              }
            }
            curBetMoneyTemp = item.multiple * betMoney;
            item.totalBet =
              (curBetMoneyTemp + this.tempList[index - 1].totalBet * 1000) /
              1000;
          }
        } else {
          item.totalBet = curBetMoneyTemp / 1000;
        }
        this.calcWinPrizell(item, winMoney, this.tempList[index - 1]);
      });

      if (this.tempList.length > 0) {
        this.totalMoney = this.tempList[this.tempList.length - 1].totalBet;
      } else {
        this.totalMoney = 0;
      }

      if (this.calcTab2falg) {
        this.calcTab2falg = false;
        this.calcTraceData();
      }
    },
    ...mapActions(["l_lotteryTracePlan"])
  },
  watch: {
    traceNumberPopupIsShow: function() {
      this.traceList = [];
      if (this.traceNumberPopupIsShow) {
        this.l_lotteryShoppingList.forEach(item => {
          this.totalBetNum = item.count;
          this.multipleVal = item.multiple;
        });
      }
    }
  },
  computed: {
    ...mapGetters([
      "l_curLottsCountDown",
      "l_curNumberList",
      "l_lotteryShoppingList",
      "u_userBalance"
    ])
  },
  components: {
    TimeDown
  }
};
</script>


<style lang="sass" scoped>
@import "~common/sass/variable"

.txtHide
  overflow: hidden
  text-overflow: ellipsis

.traceNumberPopup
    background-color: rgba(0,0,0,.7)
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    z-index: 10
    .traceNumberBox
      width: 850px
      height: 580px
      background-color: $color_text_white
      position: fixed
      left: 0
      top: 0
      right: 0
      bottom: 0
      margin: auto
      .titleBox
        height: 45px
        line-height: 45px
        background-color: $color_theme
        padding: 0 25px
        color: $color_text_white
        font-size: $fs16
        font-weight: bold
        .close
          font-size: $fs28
          position: relative
          top: -45px
          float: right
          transform: rotate(0deg)
          transition: all 300ms
          &:hover
            transform: rotate(180deg)
      .centerBox
        padding: 20px
        width: 100%
        box-sizing: border-box
        .tableBox
          padding-left: 6px
          &>div
            display: inline-block
            border: 1px solid $color_theme
            height: 30px
            line-height: 30px
            text-align: center
            font-size: $fs14
            color: #333
            width: 110px
            box-sizing: border-box
            margin-left: -6px
            &:hover,&.active
              background-color: $color_theme
              color: $color_text_white
              border-color: $color_theme
        .content
          margin-top: 20px
          .createAppNumBar
            height: 30px
            line-height: 30px
            font-size: $fs14
            color: #333
            &>span
              margin-right: 10px
              vertical-align: middle
            .appendIssue
              vertical-align: middle
              height: 100%
              display: inline-block
              margin-right: 10px
              &>li
                float: left
                text-align: center
                width: 45px
                line-height: 30px
                box-sizing: border-box
                height: 100%
                margin-left: -1px
                border: 1px solid $color_bg_light_gray
                background-color: $color_bg_fade_gray
                &:hover,&.active
                  background-color: $color_theme
                  color: $color_text_white
                  border-color: $color_theme
            .inputQs
              width: 70px
              height: 25px
              box-sizing: border-box
              color: #333
              text-align: center
              margin: 0 5px
            .select
              &>div
                width: 85px
              width: 85px
              display: inline-block
              margin-right: 10px
            .traceCreateBtn 
              width: 105px
              height: 100%
              display: inline-block
              line-height: 30px
              text-align: center
              color: $color_text_white
              border-radius: 4px
              background-color: #ae2323
              &:hover
                background-color: $color_theme
          .listBox
            height: 250px
            margin-top: 20px
            overflow-y: scroll
            ul> li
              &>div
                width: 114px
                float: left
                text-align: center
                box-sizing: border-box
                border: 1px solid $color_bg_light_gray
                margin-top: -1px
                height: 40px
                margin-left: -1px
                text-align: center
                line-height: 40px
                font-size: $fs14
                input
                  width: 45px
                  text-align: center
            ul .header
              &>div
                background-color: $color_bg_fade_gray
                font-weight: bold
          .info
            height: 60px
            margin-top: 20px
            background-color: $color_bg_fade_gray
            & > div
              border: 1px solid $color_bg_light_gray
              width: 162px
              height: 60px
              box-sizing: border-box
              line-height: 20px
              float: left
              text-align: center
              font-size: $fs14
              span
                color: $color_theme
              p:nth-of-type(1)
                color: $color_text_gray
                margin-top: 10px
          .bottom
            margin-top: 20px
            text-align: center
            .traceSubmit
              width: 160px
              height: 40px
              display: inline-block
              margin-right: 20px
              line-height: 40px
              text-align: center
              border-radius: 4px
              background-color: #ae2323
              font-size: $fs14
              color: $color_text_white
              &:hover
                background-color: $color_theme


    
</style>
