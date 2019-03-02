<template>
  <div class="selectBet">
    <div class="lottNavBox">
      <ul class="lottNav" ref="lottNav">
        <li
          class="lottNavDetail"
          @click="_changeTitlePlayMode($event,item.code)"
          :class="{'active': index == 0}"
          v-for="(item,index) in curLotteryModeList"
          :key="index"
          :ref="'navDom_' + item.code"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="playModeBox">
      <div class="curPlayName">
        <span>
          <i class="el-icon-circle-check"></i> 当前玩法：
        </span>
        {{curNumberList.currentGameName}}
      </div>
      <ul class="row" ref="playModeBoxRow">
        <li class="row-item" v-for="(item,index) in curChoseModeList.group" :key="index">
          <div class="title">{{item.name}}</div>
          <div class="list">
            <ul class="cloumn" ref="defaultPlayMode">
              <li
                class="cloumn-item"
                @click="_changeChildPlayMode($event,obj.code)"
                :class="{'active': j == 0 && index == 0}"
                v-for="(obj,j) in item.game"
                :key="j"
              >{{obj.name}}</li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="swichBtn" v-if="curNumberList.sfyl == 1">
        <div class="boxBtn">
          <div
            class="btn"
            @click="selectMissOrHot(1)"
            :class="{'active': l_lotteryMissHotType == 1}"
          >遗漏</div>
          <div
            class="btn"
            @click="selectMissOrHot(2)"
            :class="{'active': l_lotteryMissHotType == 2}"
          >冷热</div>
        </div>
        <!-- <div class="txtBtn" v-show="l_lotteryMissHotType == 1">当前遗漏</div> -->
        <div class="hotColdBox" v-show="l_lotteryMissHotType == 2">
          <div
            class="btn"
            :class="{'active':curHotColdCount == 30}"
            @click="getLottsHotCold(30)"
          >30期</div>
          <div
            class="btn"
            :class="{'active':curHotColdCount == 60}"
            @click="getLottsHotCold(60)"
          >60期</div>
          <div
            class="btn"
            :class="{'active':curHotColdCount == 100}"
            @click="getLottsHotCold(100)"
          >100期</div>
        </div>
      </div>
      <!-- <span class="singleMaxBonus">{{l_curNumberList.singleMaxBonus}}</span> -->
      <span class="singleMaxBonus">{{bonusText}}</span>
      <Tooltip class="explain icon" effect="dark" :content="curNumberList.wfsm" placement="top">
        <span>
          <img src="./icon-explain.png" alt>
          说明
        </span>
      </Tooltip>
      <Tooltip class="sample icon" effect="dark" :content="curNumberList.xhsl" placement="top">
        <span>
          <img src="./icon-sample.png" alt>示例
        </span>
      </Tooltip>
    </div>
    <div class="selectBox" ref="selectBox">
      <div class="rx_wqbsg" v-show="curNumberList.rxBtn == 1 && curNumberList.textBox != 1">
        <span
          class="checkbox btn"
          @click="selectAnyRX(item)"
          :class="{'active':item.isChecked}"
          v-for="(item,index) in anySelectList"
          :key="index"
        >
          <i class="el-icon-circle-check"></i>
          {{item.value}}
        </span>
      </div>
      <ul class="row">
        <li
          class="row-item numList"
          ref="numList"
          v-show="curNumberList.balls.length>0"
          v-for="(item,index) in curNumberList.balls"
          :key="index"
        >
          <div class="number">
            <div class="box">
              <div class="title" v-show="item.ws">{{item.ws}}</div>
              <ul
                class="cloumn"
                v-if="curNumberList.code.indexOf('k3_ds') != -1 || curNumberList.code.indexOf('k3_es') != -1 || curNumberList.code.indexOf('k3_ss') != -1"
              >
                <li
                  v-if="curNumberList.code.indexOf('k3_ds') != -1 || curNumberList.code.indexOf('k3_es') != -1 || curNumberList.code.indexOf('k3_ss') != -1"
                  class="dice btn"
                  @click="selectNum(index,obj.hm,$event)"
                  :data-num="obj.hm"
                  :class="{'dbfs': item.ball.length>1,'jsk3_ds': curNumberList.code.indexOf('k3_ds') != -1,'jsk3_es': curNumberList.code.indexOf('k3_es') != -1,'jsk3_ss': curNumberList.code.indexOf('k3_ss') != -1}"
                  v-for="(obj,j) in item.ball"
                  :key="j"
                >
                  <img
                    :src="convertImgPath(num)"
                    v-for=" (num,numIndex) in obj.hm"
                    :key="numIndex"
                    alt
                  >
                </li>
              </ul>
              <ul class="cloumn" v-else>
                <li
                  class="ball btn"
                  @click="selectNum(index,obj.hm,$event)"
                  :data-num="obj.hm"
                  :class="{'dbfs': item.ball.length>1}"
                  v-for="(obj,j) in item.ball"
                  :key="j"
                ></li>
              </ul>
            </div>
            <!-- 大小奇清偶 -->
            <div class="dxqqo" v-show="item.fastButton == 1">
              <ul ref="dxqqo">
                <li class="btn" @click="numBtnBig(item,index,$event)">大</li>
                <li class="btn" @click="numBtnSmall(item,index,$event)">小</li>
                <li class="btn" @click="numBtnOdd(curNumberList,item,index,$event)">单</li>
                <li class="btn" @click="numBtnEven(curNumberList,item,index,$event)">双</li>
                <li class="btn" @click="numBtnAll(item,index,$event)">全</li>
                <li class="btn" @click="numBtnClear(index,$event)">清</li>
              </ul>
            </div>
          </div>
          <div
            class="missListBox"
            v-show="curNumberList.sfyl == 1 && (l_lotteryMissHotType == 1 || l_lotteryMissHotType == 2)"
          >
            <div class="missTitle title" v-show="l_lotteryMissHotType == 1">遗漏</div>
            <div class="missTitle title" v-show="l_lotteryMissHotType == 2">冷热</div>
            <ul class="cloumn missCloumn">
              <li
                class
                v-for="(missObj,index) in l_lotteryMissObj[item.code]"
                v-if="l_lotteryMissHotType == 1"
                :key="index"
              >{{missObj}}</li>
              <li
                class
                v-for="(missObj,index) in l_lotteryHotCold[item.code]"
                v-if="l_lotteryMissHotType == 2"
                :key="index"
              >{{missObj}}</li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="noNum" v-show="curNumberList.textBox == 1">
        <div class="btn addBetFile" @click="_uploadTxt">
          <i class="el-icon-upload"></i>
          <span>导入注单</span>
          <input
            type="file"
            accept=".txt"
            @change="getTxtFileInfo"
            class="btn"
            ref="uploadTxt"
            name="uploadTxt"
            id
          >
        </div>
        <div class="rx_wqbsg" v-show="curNumberList.rxBtn == 1">
          <span
            class="checkbox btn"
            @click="selectAnyRX(item)"
            :class="{'active':item.isChecked}"
            v-for="(item,index) in anySelectList"
            :key="index"
          >
            <i class="el-icon-circle-check"></i>
            {{item.value}}
          </span>
        </div>
        <div class="txtContent">
          <textarea
            name
            @input="_textareaInput"
            v-model="fileTextVal"
            @blur="betTextBlur"
            ref="betText"
            id
          ></textarea>
          <div class="tips" @click="closeBetTips" v-show=" fileTextVal ? false : tipsMsg">
            <p>说明：</p>
            <p
              v-show=" getLottsCode() != 'bjsc' && getLottsCode() != 'ft'&& getLottsCode() != 'sfbjscpk10'&& getLottsCode() != 'yfbjscpk10'"
            >1.号码无需分割。</p>
            <p
              v-show=" getLottsCode() == 'bjsc' || getLottsCode() == 'ft' || getLottsCode() == 'sfbjscpk10'|| getLottsCode() == 'yfbjscpk10'"
            >1.号码用空格分隔。</p>
            <p
              v-show=" getLottsCode() != 'bjsc' && getLottsCode() != 'ft'&& getLottsCode() != 'sfbjscpk10'&& getLottsCode() != 'yfbjscpk10'"
            >2.每一注号码之间的间隔符支持回车 空格[ ] 逗号[ , ] 分号[ ; ]</p>
            <p
              v-show=" getLottsCode() == 'bjsc' || getLottsCode() == 'ft' || getLottsCode() == 'sfbjscpk10'|| getLottsCode() == 'yfbjscpk10'"
            >2.每一注号码之间的间隔符支持回车 逗号[ , ] 分号[ ; ]</p>
            <p>3.文件格式必须是.txt格式</p>
            <p>4. 文件较大时会导致上传时间较长，请耐心等待！</p>
            <p>5.导入文本内容后将覆盖文本框中现有的内容。</p>
          </div>
        </div>
        <div class="singleBtns">
          <div class="btn" @click="delErrBtn">删除错误项</div>
          <div class="btn" @click="delCfBtn">删除重复项</div>
          <div class="btn" @click="clearTxtBtn">清空文本框</div>
        </div>
      </div>
    </div>
    <div class="confirmBetsBox">
      <div class="box">
        <div class="select">
          <Select :size="'mini'" v-model="bonusType">
            <Option
              v-for="(item,index) in curNumberList.bonus"
              :key="index"
              :value="item.bonusType"
              :label="item.bonusName"
            ></Option>
          </Select>
        </div>
        <div class="priceUnit">
          <div
            class="btn"
            :class="{'active': unitPriceType == item.type}"
            @click="selectUnitPrice(item.type)"
            v-for="(item,index) in l_lotteryNumbers.unit"
            :key="index"
          >{{item.name}}</div>
        </div>
        <div class="inputNumber">
          <InputNumber v-model="multiple" :min="1" :size="'mini'"/>
          <span>倍</span>
        </div>
        <div class="selectResult">
          已选择
          <span>{{betNumAndMoneyInfo.count}}</span> 注 &nbsp;&nbsp; 共
          <span>{{betNumAndMoneyInfo.money}}</span> 元
        </div>
      </div>
      <div class="box">
        <div class="addBetBtn btns btn" @click="addSelectNum">
          添加注单
          <img src="./icon-add.png" alt>
        </div>
        <div class="suerBetBtn btn btns" @click="promptlyBet">
          确认投注
          <img src="./icon-sure.png" alt>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="popTimeDown" v-show="isShowPopTimeDown">
        <p>{{l_curLottsCountDown.gameName}}</p>
        <p>
          距离
          <span>{{l_curLottsCountDown.qs}}</span>期截至
        </p>
        <p>
          <TimeDown :time="l_curLottsCountDown.times"/>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Select, Option, InputNumber, Tooltip } from "element-ui";
import { addClass, removeClass, hasClass } from "common/js/dom";
import TimeDown from "base/timeDown/timeDown";
import calcBetMoney from "common/js/calcBetMoney";
import { unique } from "common/js/utils";
import { isReturn } from "common/js/play";
import { generateRandomNumber, resetBonus } from "./selectUtil";

export default {
  name: "selectBet",
  data() {
    return {
      bonusType: 0,
      multiple: 1, // 当前倍数
      selectNumArr: [],
      unitPriceType: "1",
      tipsMsg: true,
      fileTextVal: "",
      fileTextList: [],
      textareaTimeOutFunc: {},
      curHotColdCount: 30,
      isShowPopTimeDown: false,
      betNumAndMoneyInfo: {
        content: "",
        count: 0,
        money: 0,
        isTrace: 1,
        currentGameName: "",
        multiple: this.multiple,
        unit: {}
      },
      anySelectList: [
        {
          isChecked: true,
          value: "万"
        },
        {
          isChecked: true,
          value: "千"
        },
        {
          isChecked: false,
          value: "百"
        },
        {
          isChecked: false,
          value: "十"
        },
        {
          isChecked: false,
          value: "个"
        }
      ],

      bonusText: "",

      curLotteryModeList: {},
      curChoseModeList: [],
      curNumberList: []
    };
  },
  created() {
    this.l_actGetLotteryNumbers(this.getLottsCode()).then(res => {
      if (res && res.errorCode == ERR_OK) {
        this.init();
      }
    });
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  methods: {
    ...mapActions([
      "l_actGetLotteryNumbers",
      "l_changeTitlePlayMode",
      "l_changeChildPlayMode",
      "l_addlotteryShoppingList",
      "l_lotteryOrderBet",
      "l_lotteryDeleteShoppingAll",
      "l_lotteryNextqs",
      "l_lotteryLr"
    ]),
    ...mapMutations({
      setIsShowBettingPopup: "L_SET_IS_SHOW_BETTING_POPUP",
      setTraceData: "L_SET_TRACE_DATA",
      setIsShoppingBetting: "L_SET_IS_SHOPPING_BETTING",
      setMissOrHotType: "L_SET_MISS_HOT_TYPE",
      setIsBetTingSuccess: "L_SET_IS_BETTING_SUCCESS",
      setLotteryBetOrderList: "L_SET_LOTTERY_BET_ORDER_LIST"
    }),
    init() {
      this.curLotteryModeList = this.l_lotteryNumbers.game;
      if (!this.$route.query.type || !this.l_curAutoChoseList.length) {
        this.curChoseModeList = this.curLotteryModeList[0];
        this.curNumberList = this.curChoseModeList.group[0].game[0];
        this.bonusText = resetBonus(
          this.curNumberList,
          this.bonusType,
          this.selectNumArr
        );
        return;
      }
      this.l_lotteryDeleteShoppingAll([]);
      for (let i = 0; i < this.curLotteryModeList.length; i++) {
        if (
          this.$route.query.type == 1 &&
          this.curLotteryModeList[i].code == "cqssc_5x"
        ) {
          this.curChoseModeList = this.curLotteryModeList[i];
          this.curNumberList = this.curChoseModeList.group[0].game[0];
        }
        if (
          this.$route.query.type == 1 &&
          this.curLotteryModeList[i].code == "txffc_dwd"
        ) {
          this.curChoseModeList = this.curLotteryModeList[i];
          this.curNumberList = this.curChoseModeList.group[0].game[0];
        }
        if (
          this.$route.query.type == 2 &&
          this.curLotteryModeList[i].code == "bjsc_lmp"
        ) {
          this.curChoseModeList = this.curLotteryModeList[i];
          this.curNumberList = this.curChoseModeList.group[0].game[0];
        }
        if (
          this.$route.query.type == 3 &&
          this.curLotteryModeList[i].code == "jsk3_dxds"
        ) {
          this.curChoseModeList = this.curLotteryModeList[i];
          this.curNumberList = this.curChoseModeList.group[0].game[0];
        }
        if (
          this.$route.query.type == 6 &&
          this.curLotteryModeList[i].code == "xy28_sx"
        ) {
          this.curChoseModeList = this.curLotteryModeList[i];
          this.curChoseModeList.group[0].game.forEach(item => {
            if (item.code == "xy28_sx_sx_fs") {
              this.curNumberList = item;
            }
          });
        }
      }

      this.multiple = this.$route.query.multipleNum;
      this.betNumAndMoneyInfo.multiple = this.multiple;
      this.$nextTick(function() {
        this.setDefaultNum(this.$route.query.type);
      });
    },
    setDefaultNum(type = 0) {
      if (type == 0) return;
      let list = this.l_curAutoChoseList;
      if (!list.length) return;
      if (type == 1) {
        console.log(list);
        if (this.$route.params.lottsCode == "txffc") {
          for (
            let k = 0;
            k < this.$refs.lottNav.querySelectorAll(".lottNavDetail").length;
            k++
          ) {
            let str = this.$refs.lottNav.childNodes[k].innerHTML.replace(
              /(^\s*)|(\s*$)/g,
              ""
            );
            if (str == "定位胆") {
              removeClass(this.$refs.lottNav.childNodes[0], "active");
              addClass(this.$refs.lottNav.childNodes[k], "active");
            }
          }
          for (let i = 0; i < list.length; i++) {
            this.$refs.numList[i].querySelectorAll(".ball")[list[i]].click();
          }
        } else {
          for (let i = 0; i < list.length; i++) {
            this.$refs.numList[i].querySelectorAll(".ball")[list[i]].click();
          }
        }
      } else if (type == 2) {
        for (let i = 0; i < list.length; i++) {
          this.$refs.numList[i].querySelectorAll(".ball")[list[i]].click();
        }
      } else if (type == 3) {
        for (let i = 0; i < list.length; i++) {
          this.$refs.numList[0].querySelectorAll(".ball")[list[i]].click();
        }
      } else if (type == 6) {
        for (
          let k = 0;
          k < this.$refs.lottNav.querySelectorAll(".lottNavDetail").length;
          k++
        ) {
          let str = this.$refs.lottNav.childNodes[k].innerHTML.replace(
            /(^\s*)|(\s*$)/g,
            ""
          );
          if (str == "三星玩法") {
            removeClass(this.$refs.lottNav.childNodes[0], "active");
            addClass(this.$refs.lottNav.childNodes[k], "active");
          }
        }
        removeClass(
          this.$refs.defaultPlayMode[0].querySelectorAll(".cloumn-item")[0],
          "active"
        );
        addClass(
          this.$refs.defaultPlayMode[0].querySelectorAll(".cloumn-item")[1],
          "active"
        );
        console.log(list);
        for (let i = 0; i < list.length; i++) {
          this.$refs.numList[i].querySelectorAll(".ball")[list[i]].click();
        }
      }
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop <= 250) {
        this.isShowPopTimeDown = false;
      } else {
        this.isShowPopTimeDown = true;
      }
    },

    // 金额注数等恢复默认值
    _defaultBetNumAndMoneyInfo() {
      this.betNumAndMoneyInfo = {
        content: "",
        count: 0,
        money: 0,
        isTrace: 1,
        currentGameName: "",
        multiple: this.multiple,
        unit: {}
      };
    },

    // 选择遗漏或冷热
    selectMissOrHot(type) {
      if (this.l_lotteryMissHotType == type) {
        type = 0;
      }
      this.setMissOrHotType(type);
      if (type == 0) {
        return false;
      }
      if (type == 1) {
        this.l_lotteryNextqs(this.getLottsCode());
      } else {
        this.curHotColdCount = 30;
        this.l_lotteryLr({
          lotteryCode: this.getLottsCode(),
          rows: 30
        });
      }
    },

    // 选择冷热期数
    getLottsHotCold(count) {
      this.curHotColdCount = count;
      this.l_lotteryLr({
        lotteryCode: this.getLottsCode(),
        rows: count
      });
    },

    // 任选万千百十个
    selectAnyRX(item) {
      item.isChecked = !item.isChecked;
    },

    // 选择单价
    selectUnitPrice(type) {
      this.unitPriceType = type;
      this._getbetNumAndMoneyInfo();
    },

    // 初始化选中号码列表
    _initSelectNumArr(num) {
      if (
        !Array.isArray(this.selectNumArr[num]) ||
        this.curNumberList.balls.length != this.selectNumArr.length
      ) {
        console.log(this.curNumberList.balls);
        this.curNumberList.balls.forEach((item, index) => {
          this.selectNumArr[index] = [];
        });
      }
    },

    // 获取当前单价
    _getCurUnitPrice() {
      let unit = {};
      this.l_lotteryNumbers.unit.forEach(item => {
        if (item.type == this.unitPriceType) {
          unit = item;
        }
      });
      return unit;
    },

    // 获取计算后的注数及价格
    _getbetNumAndMoneyInfo() {
      let bonus = {};
      this.curNumberList.bonus.forEach(item => {
        if (item.bonusType == this.bonusType) {
          bonus = item;
        }
      });
      this.betNumAndMoneyInfo = calcBetMoney(
        this.curChoseModeList.code,
        this.curNumberList,
        this.selectNumArr,
        this._getCurUnitPrice(),
        this.multiple,
        this.anySelectList
      );
      console.log(this.betNumAndMoneyInfo);
      this.betNumAndMoneyInfo.bonus = bonus;
      this.betNumAndMoneyInfo.isTrace = this.curNumberList.isTrace;
    },

    // 选中号码
    selectNum(index, obj, e) {
      let rowDom = this.$refs.selectBox.querySelectorAll(".row-item")[index];
      let allLiDom = rowDom.querySelectorAll(".cloumn li");
      let code = this.convertCode(this.curNumberList.code);
      if (
        code == "_q3_zux_bd" ||
        code == "_z3_zux_bd" ||
        code == "_h3_zux_bd" ||
        code == "_q2_zux_bd" ||
        code == "_h2_zux_bd" ||
        code == "_3x_zux_bd" ||
        code == "_h2_zux_bd" ||
        code == "_q2_zux_bd"
      ) {
        this.selectNumArr = [];
        for (let i = 0; i < allLiDom.length; i++) {
          removeClass(allLiDom[i], "active");
        }
      }

      this._initSelectNumArr(index);
      if (
        code == "_tm_tm_bs" &&
        this.selectNumArr[index].length >= 3 &&
        this.selectNumArr[index].indexOf(obj) == -1
      ) {
        let removeEl = this.selectNumArr[index].shift();
        for (let i = 0; i < allLiDom.length; i++) {
          if (allLiDom[i].getAttribute("data-num") == removeEl) {
            removeClass(allLiDom[i], "active");
          }
        }
      }

      if (
        (code == "_x2_rx2z2_dt" ||
          code == "_x2_zux_dt" ||
          code == "_x3_rx3z3_dt" ||
          code == "_x3_zux_dt" ||
          code == "_x4_rx4z4_dt" ||
          code == "_x5_rx5z5_dt" ||
          code == "_x6_rx6z5_dt" ||
          code == "_x7_rx7z5_dt" ||
          code == "_x8_rx8z5_dt") &&
        index == 0
      ) {
        rowDom = this.$refs.selectBox.querySelectorAll(".row-item")[0];
        this.selectNumArr[index] = [];
        for (let i = 0; i < allLiDom.length; i++) {
          removeClass(allLiDom[i], "active");
        }
      }
      if (this.selectNumArr[index].indexOf(obj) != -1) {
        this.selectNumArr[index].splice(
          this.selectNumArr[index].indexOf(obj),
          1
        );
      } else {
        this.selectNumArr[index].push(obj);
      }
      // 添加或移除选中号码样式
      if (hasClass(e.currentTarget, "active")) {
        removeClass(e.currentTarget, "active");
      } else {
        addClass(e.currentTarget, "active");
      }
      this.bonusText = resetBonus(
        this.curNumberList,
        this.bonusType,
        this.selectNumArr
      );
      this._getbetNumAndMoneyInfo();
    },

    // 立即投注
    promptlyBet() {
      if (this.l_curLottsCountDown.isClose == 1) {
        this.$alert("已封盘禁止投注", "温馨提示", {
          confirmButtonText: "确定",
          type: "error",
          center: true,
          lockScroll: false
        });
        return;
      }
      if (this.betNumAndMoneyInfo.count > 0) {
        this.setTraceData({
          isTrace: 0,
          traceWinStop: 0,
          traceOrder: []
        });
        this.setLotteryBetOrderList([this.betNumAndMoneyInfo]);
        this.setIsShowBettingPopup(true);
        this.setIsShoppingBetting(false);
      } else {
        this.$alert("您尚未选定一个完整的投注", "温馨提示", {
          confirmButtonText: "确定",
          type: "warning",
          center: true,
          lockScroll: false
        });
      }
    },

    // 添加注单
    addSelectNum() {
      if (this.betNumAndMoneyInfo.count > 0) {
        if (!this.l_isShoppingBetting) {
          this.l_lotteryDeleteShoppingAll([]);
        }
        this.setIsShoppingBetting(true);
        this.l_addlotteryShoppingList(this.betNumAndMoneyInfo);
        this.selectNumArr = [];
        this.removeAllSelectActive();
      } else {
        this.$alert("您尚未选定一个完整的投注", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
      }
    },

    // 获取彩种代码
    getLottsCode() {
      return this.$route.params.lottsCode;
    },

    // 切换标题玩法
    _changeTitlePlayMode(e, code) {
      for (let i = 0; i < this.$refs.lottNav.childNodes.length; i++) {
        removeClass(this.$refs.lottNav.childNodes[i], "active");
      }
      addClass(e.currentTarget, "active");
      this.removeAllChildActive();
      addClass(
        this.$refs.playModeBoxRow.querySelectorAll(".cloumn-item")[0],
        "active"
      );
      this.selectNumArr = [];
      this.removeAllSelectActive();
      this.l_changeTitlePlayMode(code);
      for (let i = 0; i < this.curLotteryModeList.length; i++) {
        if (this.curLotteryModeList[i].code == code) {
          this.curChoseModeList = this.curLotteryModeList[i];
          this.curNumberList = this.curChoseModeList.group[0].game[0];
        }
      }
    },

    // 切换子玩法
    _changeChildPlayMode(e, code) {
      this.anySelectDefaultSelected(code);
      this.removeAllChildActive();
      addClass(e.currentTarget, "active");
      this.selectNumArr = [];
      this.removeAllSelectActive();
      this.curChoseModeList.group.forEach(item => {
        item.game.forEach(obj => {
          if (obj.code == code) {
            this.curNumberList = obj;
          }
        });
      });
      this.l_changeChildPlayMode(code);
    },

    // 判断任选默认选中个数
    anySelectDefaultSelected(code) {
      let num = 2;
      if (code.indexOf("_rx_rx2") != -1) {
        num = 2;
      } else if (code.indexOf("_rx_rx3") != -1) {
        num = 3;
      } else if (code.indexOf("_rx_rx4") != -1) {
        num = 4;
      }
      this.anySelectList.forEach((item, index) => {
        if (index < num) {
          item.isChecked = true;
        } else {
          item.isChecked = false;
        }
      });
    },

    // 移除所有号码Active
    removeAllSelectActive() {
      let allDom = this.$refs.selectBox.querySelectorAll(".cloumn .btn");
      let allDXDSDom = this.$refs.selectBox.querySelectorAll(".dxqqo li");

      for (let j = 0; j < allDom.length; j++) {
        removeClass(allDom[j], "active");
      }

      for (let i = 0; i < allDXDSDom.length; i++) {
        removeClass(allDXDSDom[i], "active");
      }
      this._defaultBetNumAndMoneyInfo();
      this.fileTextVal = "";
    },

    // 移除所有子玩法 active
    removeAllChildActive() {
      for (let i = 0; i < this.$refs.playModeBoxRow.childNodes.length; i++) {
        let curItem = this.$refs.playModeBoxRow.childNodes[i].childNodes[
          this.$refs.playModeBoxRow.childNodes[i].childNodes.length - 1
        ].childNodes[0].childNodes;
        for (let j = 0; j < curItem.length; j++) {
          removeClass(curItem[j], "active");
        }
      }
    },

    // 移除已选择号码列表指定列数据
    removeSelectArrRow(index) {
      this.selectNumArr[index] = [];
    },

    // 清空选择号码按钮样式
    clearActives(index) {
      for (
        let i = 0;
        i < this.$refs.dxqqo[index].querySelectorAll("li").length;
        i++
      ) {
        removeClass(
          this.$refs.dxqqo[index].querySelectorAll("li")[i],
          "active"
        );
      }
    },

    // 选择大号
    numBtnBig(item, index, e) {
      const FLAG = 5;
      let rowDom = this.$refs.selectBox.querySelectorAll(".row-item")[index];
      let allLiDom = rowDom.querySelectorAll(".cloumn li");
      this._allNumBtnBase(index, e);

      item.ball.forEach((obj, j) => {
        if (j >= FLAG) {
          this.selectNumArr[index].push(obj.hm);
        }
      });

      for (let i = 0; i < allLiDom.length; i++) {
        if (i < FLAG) {
          removeClass(allLiDom[i], "active");
        } else {
          addClass(allLiDom[i], "active");
        }
      }

      this._getbetNumAndMoneyInfo();
    },

    // 选择小号
    numBtnSmall(item, index, e) {
      const FLAG = 5;
      let rowDom = this.$refs.selectBox.querySelectorAll(".row-item")[index];
      let allLiDom = rowDom.querySelectorAll(".cloumn li");
      this._allNumBtnBase(index, e);

      item.ball.forEach((obj, j) => {
        if (j < FLAG) {
          this.selectNumArr[index].push(obj.hm);
        }
      });

      for (let i = 0; i < allLiDom.length; i++) {
        if (i >= FLAG) {
          removeClass(allLiDom[i], "active");
        } else {
          addClass(allLiDom[i], "active");
        }
      }
      this._getbetNumAndMoneyInfo();
    },

    // 计算奇偶数
    calcEven(item, allLiDom, index) {
      item.ball.forEach((obj, j) => {
        if (j % 2 != 1) {
          this.selectNumArr[index].push(obj.hm);
        }
      });

      for (let i = 0; i < allLiDom.length; i++) {
        if (i % 2 != 0) {
          removeClass(allLiDom[i], "active");
        } else {
          addClass(allLiDom[i], "active");
        }
      }
    },

    // 计算偶数
    calcOdd(item, allLiDom, index) {
      item.ball.forEach((obj, j) => {
        if (j % 2 == 1) {
          this.selectNumArr[index].push(obj.hm);
        }
      });

      for (let i = 0; i < allLiDom.length; i++) {
        if (i % 2 != 1) {
          removeClass(allLiDom[i], "active");
        } else {
          addClass(allLiDom[i], "active");
        }
      }
    },

    // 选择奇数
    numBtnOdd(parentItem, item, index, e) {
      let rowDom = this.$refs.selectBox.querySelectorAll(".row-item")[index];
      let allLiDom = rowDom.querySelectorAll(".cloumn li");
      this._allNumBtnBase(index, e);
      if (parentItem.type == 4 || parentItem.type == 2) {
        this.calcEven(item, allLiDom, index);
      } else {
        this.calcOdd(item, allLiDom, index);
      }
      this._getbetNumAndMoneyInfo();
    },

    // 选择偶数
    numBtnEven(parentItem, item, index, e) {
      let rowDom = this.$refs.selectBox.querySelectorAll(".row-item")[index];
      let allLiDom = rowDom.querySelectorAll(".cloumn li");
      this._allNumBtnBase(index, e);
      if (parentItem.type == 4 || parentItem.type == 2) {
        this.calcOdd(item, allLiDom, index);
      } else {
        this.calcEven(item, allLiDom, index);
      }
      this._getbetNumAndMoneyInfo();
    },

    // 全部选择
    numBtnAll(item, index, e) {
      let rowDom = this.$refs.selectBox.querySelectorAll(".row-item")[index];
      let allLiDom = rowDom.querySelectorAll(".cloumn li");
      this._allNumBtnBase(index, e);

      item.ball.forEach((obj, j) => {
        this.selectNumArr[index].push(obj.hm);
      });

      for (let i = 0; i < allLiDom.length; i++) {
        addClass(allLiDom[i], "active");
      }
      this._getbetNumAndMoneyInfo();
    },

    // 清除选择
    numBtnClear(index, e) {
      let rowDom = this.$refs.selectBox.querySelectorAll(".row-item")[index];
      let allLiDom = rowDom.querySelectorAll(".cloumn li");
      this._allNumBtnBase(index, e);

      for (let i = 0; i < allLiDom.length; i++) {
        removeClass(allLiDom[i], "active");
      }
      this._getbetNumAndMoneyInfo();
    },

    // 所有选择奇偶数按钮基础方法
    _allNumBtnBase(index, e) {
      this._initSelectNumArr(index);
      this.removeSelectArrRow(index);
      this.clearActives(index);
      if (e.currentTarget.innerText == "清") return;
      addClass(e.currentTarget, "active");
    },

    // 上传注单
    _uploadTxt() {
      this.$refs.uploadTxt.click();
    },
    //  关闭提示获取焦点
    closeBetTips() {
      this.tipsMsg = false;
      this.$refs.betText.focus();
    },
    // txt框失去焦点
    betTextBlur() {
      this.tipsMsg = true;
    },
    // 获取上传文件信息
    getTxtFileInfo($event) {
      let reader = new FileReader();
      reader.readAsText($event.target.files[0], "gb2312");
      reader.onload = e => {
        if (this.getLottsCode() == "bjsc" || this.getLottsCode() == "ft") {
          this.fileTextList = e.target.result.split("\r\n");
          this.fileTextVal = this.fileTextList.join(",");
          this.fileTextList = [];
        } else {
          this.fileTextList = e.target.result.split("\r\n");
        }
        this.formatTxt();
        $event.target.value = "";
      };
    },
    // 监控输入内容
    _textareaInput() {
      clearTimeout(this.textareaTimeOutFunc);
      let _self = this;
      let _run = function() {
        _self.textareaTimeOutFunc = setTimeout(() => {
          _self.fileTextList = [];
          _self.formatTxt();
        }, 1000);
      };
      _run();
    },
    // 格式化文本
    formatTxt() {
      this.fileTextList.forEach(item => {
        this.fileTextVal += " " + item;
      });
      let split = /\s+|,|，|；|\n|;/g;
      if (
        this.getLottsCode() == "bjsc" ||
        this.getLottsCode() == "ft" ||
        this.getLottsCode() == "sfbjscpk10" ||
        this.getLottsCode() == "yfbjscpk10"
      ) {
        split = /,|，|；|\n|;/g;
      }
      this.selectNumArr = this.fileTextVal.trim().split(split);

      this.closeBetTips();
      this._getbetNumAndMoneyInfo();
      this.fileTextList = [];
    },
    // 删除错误项
    delErrBtn() {
      if (this.fileTextVal == "") return false;
      this.fileTextVal = this.betNumAndMoneyInfo.content;
    },
    // 删除重复项
    delCfBtn() {
      if (this.fileTextVal == "") return false;
      this.fileTextVal = this.betNumAndMoneyInfo.ncf;
      this.betNumAndMoneyInfo.content = this.betNumAndMoneyInfo.ncf;
    },
    // 清空
    clearTxtBtn() {
      if (this.fileTextVal == "") return false;
      this.fileTextList = [];
      this.fileTextVal = "";
      this.formatTxt();
      this.betTextBlur();
    },
    // 转换code
    convertCode(code) {
      let tempCode = code.split("_");
      tempCode.shift();
      if (Array.isArray(tempCode)) {
        tempCode = "_" + tempCode.join("_");
      } else {
        tempCode = "_" + tempCode;
      }
      return tempCode;
    }
  },
  computed: {
    ...mapGetters([
      "l_lotteryNumbers",
      "l_curPlayModeList",
      "l_curPlayMode",
      "l_curNumberList",
      "l_allLottsCountDownList",
      "l_isShoppingBetting",
      "l_isBettingSuccess",
      "l_lotteryMissObj",
      "l_lotteryMissHotType",
      "l_lotteryHotCold",
      "l_curLottsCountDown",
      "l_curAutoChoseList",
      "l_lotteryShoppingList"
    ])
  },
  components: {
    Select,
    Option,
    InputNumber,
    Tooltip,
    TimeDown
  },
  watch: {
    $route(to, from) {
      this.selectNumArr = [];
      this.fileTextVal = "";
      this.l_lotteryDeleteShoppingAll([]);
      this.removeAllSelectActive();
      for (let i = 0; i < this.$refs.lottNav.childNodes.length; i++) {
        removeClass(this.$refs.lottNav.childNodes[i], "active");
      }
      this.removeAllChildActive();

      this.l_actGetLotteryNumbers(to.params.lottsCode);
      if (!this.$route.query.type) {
        addClass(this.$refs.lottNav.childNodes[0], "active");
        addClass(
          this.$refs.playModeBoxRow.querySelectorAll(".cloumn-item")[0],
          "active"
        );
        this.curNumberList = this.curChoseModeList.group[0].game[0];
      }
      this.setMissOrHotType(0);
    },
    multiple: function(val, oval) {
      if (!val) {
        this.multiple = 1;
      }
      this._getbetNumAndMoneyInfo();
    },
    anySelectList: {
      handler: function() {
        this._getbetNumAndMoneyInfo();
      },
      deep: true
    },
    l_isBettingSuccess: function(val, oval) {
      if (val) {
        this.selectNumArr = [];
        this.removeAllSelectActive();
        this.setIsBetTingSuccess(false);
      }
    },
    /*l_curNumberList: function(val){
      console.log(this.l_curNumberList);
      this.bonusText = resetBonus(this.curNumberList,this.bonusType,this.selectNumArr);
    },*/
    bonusType: function(val) {
      console.log(this.curNumberList);
      this.bonusText = resetBonus(
        this.curNumberList,
        this.bonusType,
        this.selectNumArr
      );
    },
    selectNumArr: function(val) {
      this.bonusText = resetBonus(
        this.curNumberList,
        this.bonusType,
        this.selectNumArr
      );
    },
    l_lotteryNumbers: function() {
      this.init();
    }
  }
};
</script>


<style lang="sass" scoped>
@import '~common/sass/variable'

.selectBet
    overflow: hidden
    width: 875px
    box-shadow: 0 0 8px 0 rgba(0,0,0,.3)
    background-color: $color_text_white
    .popTimeDown
      position: fixed
      z-index: 5
      width: 160px
      height: 90px
      top: 50px
      background-color: $color_text_white
      right: 10px
      border-right: 5px solid $color_theme
      box-shadow: 0 0 8px 0 rgba(0,0,0,.3)
      p
        text-align: center
        line-height: 28px
        color: #666666
        span
          color: $color_theme
        &:nth-of-type(1)
          font-size: 14px
        &:nth-of-type(2)
          font-size: 12px
        &:nth-of-type(3)
          font-size: 25px
          color: $color_theme
          font-weight: bold
    .lottNavBox
        height: 45px
        line-height: 45px
        border-bottom: 1px solid $color_bg_light_gray
        box-sizing: border-box
        ul.lottNav
            height: 100%
            .lottNavDetail
                float: left
                line-height: 20px
                margin: 5px 0
                padding: 5px 15px
                box-sizing: border-box
                border-right: 1px solid #d4d4d4
                font-size: $fs14
                transition: all 300ms
                cursor: pointer
                color: $color_text_fade_gray
                &.active,&:hover
                    color: $color_theme
                    position: relative
                    &:after
                        content: ''
                        position: absolute
                        bottom: -10px
                        left: 0
                        right: 0
                        margin: auto
                        display: block
                        width: 80%
                        height: 5px
                        background-color: $color_theme
    .playModeBox
        padding: 10px 15px 40px 15px
        position: relative
        .curPlayName
            font-size: $fs14
            color: $color_text_fade_gray
            i
                color: $color_theme
        .icon
            position: absolute
            top: 20px
            padding: 5px
            font-size: $fs14
            color: #7070dd
            cursor: pointer
            img
                margin-right: 5px
                vertical-align: middle
        .singleMaxBonus
          right: 150px
          position: absolute
          top: 28px
          font-size: $fs14
          color: #666666
        .explain
            right: 85px
        .sample
            right: 25px
        .row
            min-height: 30px
            margin-top: 25px
            .row-item
                margin-top: 15px
                align-items: center
                .title
                    padding: 5px 5px
                    display: inline-block
                    box-sizing: border-box
                    position: relative
                    font-size: $fs14
                    color: #666666
                    min-width: 80px
                    text-align: right
                .list
                    margin-left: 10px
                    display: inline-block
                    .cloumn
                        .cloumn-item
                            padding: 5px 10px
                            margin-left: 10px
                            display: inline-block
                            cursor: pointer
                            border: 1px solid #d9d9d9
                            box-sizing: border-box
                            user-select: none
                            border-radius: 4px
                            color: #666
                            font-size: $fs14
                            &:hover,&.active
                                border: 1px solid $color_theme
                                background-color: $color_theme
                                color: $color_text_white
        .swichBtn
            margin-top: 
            bottom: 0
            position: absolute
            right: 15px
            .boxBtn
                width: 140px
                height: 24px
                line-height: 24px
                text-align: center
                display: inline-block
                font-size: $fs14
                margin: 5px 0
                >div
                    display: inline-block
                    cursor: pointer
                    height: 100%
                    width: 48px
                    height: 24px
                    font-size: $fs14
                    color: #999999
                    border: 1px solid #cfcfcf
                    border-radius: 20px
                    margin: 0 2px
                    &:hover
                      color: $color_text_white
                      background-color: $color_theme
                .active
                    color: $color_text_white
                    background-color: $color_theme
            .hotColdBox
              margin-left: 15px
              &>div
                height: 25px
                display: inline-block
                margin: 0 8px
                padding: 0 5px
                text-align: center
                line-height: 25px
                border-bottom: 2px solid transparent
                font-size: $fs14
                color: #969696
                margin-left: -1px
                &:hover,&.active
                  border-bottom: 2px solid $color_theme
                  color: $color_theme
            .txtBtn
                margin-left: 15px
                padding: 5px 2px
                font-size: $fs12
                cursor: pointer
                color: $color_theme
                position: relative
                &:after
                    content: ''
                    display: block
                    width: 90%
                    height: 2px
                    background-color: $color_theme
                    position: absolute
                    bottom: 0
                    left: 0
                    right: 0
                    margin: 0 auto
                &:before
                    content: ''
                    display: block
                    width: 0
                    height: 0
                    border: 
                    border-top: 3px solid $color_theme
                    border-left: 3px solid transparent
                    border-right: 3px solid transparent
                    position: absolute
                    bottom: -3px
                    left: 0
                    right: 0
                    margin: 0 auto
    .selectBox
        padding: 10px 15px
        border-top: 1px solid $color_bg_light_gray
        border-bottom: 1px solid $color_bg_light_gray
        background-color: $color_text_white
        min-height: 120px
        .rx_wqbsg
            margin: 10px 0
            span
                font-size: $fs12
                color: $color_bg_deep_gray
                margin-left: 15px
                &.active
                    color: $color_theme
        .row
            .row-item
                .number
                  margin-top: 5px
                .missListBox
                  .missCloumn > li
                    width: 38px
                    float: left
                    text-align: center
                    height: 15px
                    margin-top: 10px
                    font-size: $fs12
                    color: #999
                    margin-left: 5px
                  .missTitle
                    font-size: $fs12
                    margin-top: 5px
                    min-width: 45px
                    color: #999
                .box
                    display: inline-block
                .title
                    box-sizing: border-box
                    position: relative
                    vertical-align: middle
                    font-size: $fs14
                    color: #666
                    display: inline-block
                    min-width: 45px
                    text-align: right
                .cloumn
                    margin-left: 5px
                    max-width: 690px
                    vertical-align: middle
                    display: inline-block
                    .dice
                        margin-left: 10px
                        padding: 3px 5px
                        &.active,&:hover
                          background-color: #ccc
                          border-radius: 4px
                        &.jsk3_ds
                          width: 30px
                          float: left
                          height: 30px
                          &>img
                            width: 100%
                            height: 100%
                        &.jsk3_es
                          height: 30px
                          float: left
                          &>img
                            width: 20px
                            height: 20px
                            margin-top: 5px
                            margin-left: 2px
                        &.jsk3_ss
                          float: left
                          width: 66px
                          height: 30px
                          &>img
                            width: 20px
                            height: 20px
                            margin-top: 5px
                            margin-left: 2px
                    .ball
                        width: 38px
                        height: 38px
                        float: left
                        text-align: center
                        line-height: 38px
                        margin-top: 5px
                        border-radius: 50%
                        cursor: pointer
                        background-position: bottom
                        box-sizing: border-box
                        border: 2px solid #b4b4b4
                        margin-left: 5px
                        font-size: $fs16
                        color: $color_text_black
                        &.dbfs
                            font-size: 16px
                        &:after
                            content: attr(data-num)
                        &:not(.active):hover
                            border-color: $color_theme
                        &.active
                            color: $color_text_white
                            background-color: $color_theme
                            border-color: transparent
                .dxqqo
                    margin-left: 15px
                    height: 45px
                    line-height: 45px
                    float: right
                    ul
                        li
                            cursor: pointer
                            display: inline-block
                            color: $color_text_black
                            font-size: $fs12
                            width: 25px
                            height: 25px
                            text-align: center
                            line-height: 25px
                            border-radius: 50%
                            margin-left: 5px
                            &:hover
                                color: $color_theme
                            &.active
                                background-color: $color_theme
                                border-color: $color_theme
                                color: $color_text_white
        .noNum
            .addBetFile
                width: 100px
                height: 30px
                line-height: 30px
                background-color: $color_text_gray
                border-radius: 8px
                text-align: center
                color: $color_text_white
                margin-bottom: 10px
                position: relative
                &:hover
                    background-color: $color_theme
                input[type='file']
                    display: none
                    opacity: 0
                    width: 100%
                    height: 100%
                    position: absolute
                    top: 0
                    right: 0
            .txtContent
                width: 100%
                position: relative
                overflow: hidden
                textarea
                    width: 100%
                    box-sizing: border-box
                    resize: none
                    height: 200px
                    background-color: $color_text_fade_gray
                    padding: 10px
                    font-size: $fs14
                    color: $color_text_white
                .tips
                    position: absolute
                    top: 0
                    left: 0
                    width: 100%
                    height: 200px
                    padding: 20px
                    line-height: 30px
                    color: $color_bg_deep_gray
                    font-size: $fs12
            .singleBtns
                margin-top: 15px
                &>div
                    display: inline-block
                    width: 87px
                    height: 32px
                    font-size: $fs12
                    line-height: 32px
                    text-align: center
                    background-color: $color_text_fade_gray
                    color: $color_text_white
                    &:not(:first-of-type)
                        margin-left: 10px
                    &:hover
                        background-color: $color_theme

    .confirmBetsBox
        padding: 12px 10px
        font-size: $fs12
        color: $color_text_fade_gray
        .box
            display: inline-block
            &>div
              display: inline-block
        .select
            width: 110px
            height: 24px
        .priceUnit
            margin-left: 12px
            & >div
                display: inline-block
                width: 24px
                height: 24px
                line-height: 24px
                text-align: center
                border: 1px solid #c1c1c1
                margin-left: 2px
                border-radius: 5px
                cursor: pointer
                &:hover
                    border-color: $color_theme
                &.active
                    border-color: $color_theme
                    background-color: $color_theme
                    color: $color_text_white
        .inputNumber
            margin-left: 10px
            width: 120px
            &>div
              width: 90px
            span
                margin-left: 10px
                line-height: 28px
        .selectResult
            margin-left: 10px
            span
                color: $color_theme
                margin: 0 5px
        .btns
            width: 100px
            height: 35px
            line-height: 35px
            background-color: $color_theme
            color: $color_text_white
            border-radius: 10px
            margin-left: 10px
            text-align: center
            &.addBetBtn
              background-color: #fe9c3c
            img
                margin-left: 5px
                vertical-align: middle
.fade-enter-active,.fade-leave-active
  transition: all .3s
.fade-enter, .fade-leave-to
  transform: translate3d(0,-50px,0)
  opacity: 0

</style>
