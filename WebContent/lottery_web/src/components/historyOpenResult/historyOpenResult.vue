<template>
  <div class="rule pageWidth">
    <div class="left">
      <ul>
        <li class="title item">彩种</li>
        <li
          @click="_selectLotteryRule(item)"
          class="item btn"
          :class="{'avtive': getLottsCode() == item.lotteryCode}"
          v-for="(item,index) in l_allLotteryList"
          :key="index"
        >
          <i class="icon1 icon"></i>
          <i class="icon2 icon"></i>
          {{item.lotteryName}}
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="titleBox">
        <div class="prevQ">
          <div class="imgBox">
            <img class="ce" :src="l_curLottsCountDown.smallPicUrl" alt>
          </div>
          <div class="info">
            <div>
              <span>{{l_curLottsCountDown.gameName}}</span>
              <span>
                第
                <i>{{l_curLottsCountDown.lastQs}}</i> 期
              </span>
            </div>
            <div class="openRes">
              <span>开奖号码：</span>
              <div
                class="num"
                v-if="l_curLottsCountDown.type == 2 && l_curLottsCountDown.isOpen== 1"
              >
                <i
                  class="bjsc"
                  :class="'bjsc'+obj"
                  v-for="(obj,key) in l_curLottsCountDown.lastResult"
                  :key="key"
                >{{obj}}</i>
              </div>
              <div
                class="num"
                v-else-if="l_curLottsCountDown.type == 3 && l_curLottsCountDown.isOpen== 1"
              >
                <div v-for=" (num,numIndex) in l_curLottsCountDown.lastResult" :key="numIndex">
                  <img :src="convertImgPath(num)" alt>
                </div>
              </div>
              <div
                class="num"
                v-else-if="l_curLottsCountDown.type == 6 && l_curLottsCountDown.isOpen== 1"
              >
                <div v-for=" (num,numIndex) in l_curLottsCountDown.lastResult" :key="numIndex">
                  <span>{{num}}</span>
                  <i class="push" v-if="numIndex < l_curLottsCountDown.lastResult.length -1">+</i>
                </div>
                <div class="hz">={{caleHZ(l_curLottsCountDown.lastResult)}}</div>
              </div>
              <div class="num" v-else>
                <span
                  v-show="l_curLottsCountDown.isOpen == 1"
                  v-for="(obj,key) in l_curLottsCountDown.lastResult"
                  :key="key"
                >{{obj}}</span>
                <div class="opening" v-show="l_curLottsCountDown.isOpen == 0">等待开奖</div>
              </div>
            </div>
          </div>
        </div>
        <div class="line mCeTB"></div>
        <div class="curQ">
          <div class="timeBox">
            <span>
              距离
              <i>{{l_curLottsCountDown.qs}}</i> 期投注截至
            </span>
            <div class="time" v-show="l_curLottsCountDown.isClose==1">封盘中</div>
            <TimeDown
              v-show="l_curLottsCountDown.isClose==0"
              class="time"
              @callBackFunc="callBackFunc"
              :typeStr="0"
              :time="l_curLottsCountDown.times"
            />
          </div>
          <div class="btnBox">
            <div>
              <span class="btn" @click="openNewTrend(l_curLottsCountDown.gameCode)">查看走势></span>
            </div>
            <div class="btn betBtn" @click="goLotteryPage(l_curLottsCountDown.gameCode)">立即投注</div>
          </div>
        </div>
      </div>
      <div class="listBox">
        <div class="title">
          <div class="tiitleBox">
            <span class="icon mCeTB"></span>
            <h2>历史开奖结果</h2>
          </div>
          <div class="btnGroup">
            <div class="btn" :class="{'active': curCount == 20}" @click="_selectCount(20)">近20期</div>
            <div class="btn" :class="{'active': curCount == 50}" @click="_selectCount(50)">近50期</div>
            <div class="btn" :class="{'active': curCount == 100}" @click="_selectCount(100)">近100期</div>
          </div>
        </div>
        <ul class="itemBox">
          <li class="item title">
            <div class="flex1">期号</div>
            <div class="flex1">开奖日期</div>
            <div class="content">开奖号码</div>
          </li>
          <li class="item" v-for="(item,index) in resultList" :key="index">
            <div class="flex1">{{item.qs}}</div>
            <div class="flex1">{{item.openTime}}</div>
            <div class="content">
              <div class="num" v-if="item.type == 2 && item.isOpen == 1">
                <i
                  class="bjsc"
                  :class="'bjsc'+obj"
                  v-for="(obj,key) in item.openResult"
                  :key="key"
                >{{obj}}</i>
              </div>
              <div class="num" v-else-if="item.type == 3 && item.isOpen == 1">
                <div v-for=" (num,numIndex) in item.openResult" :key="numIndex">
                  <img :src="convertImgPath(num)" alt>
                </div>
              </div>
              <div class="num" v-else-if="item.type == 6 && item.isOpen == 1">
                <div v-for=" (num,numIndex) in item.openResult" :key="numIndex">
                  <span>{{num}}</span>
                  <i class="push" v-if="numIndex < item.openResult.length -1">+</i>
                </div>
                <div class="hz">={{caleHZ(item.openResult)}}</div>
              </div>
              <div class="num" v-else>
                <span
                  v-show="item.isOpen == 1"
                  v-for="(obj,key) in item.openResult"
                  :key="key"
                >{{obj}}</span>
                <div v-show="item.isOpen != 1">等待开奖</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { ERR_OK } from "api/config";
import TimeDown from "base/timeDown/timeDown";

export default {
  name: "rule",
  data() {
    return {
      resultList: [],
      curCount: 20
    };
  },
  created() {
    this._getRuleList(this.getLottsCode(), this.curCount);
    this.l_getAllCountDown(this.getLottsCode());
    this.loopTime();
  },
  methods: {
    ...mapActions(["l_getHistoryOPenResult", "l_getAllCountDown"]),

    ...mapMutations({
      setLoginPopIsShow: "U_SET_IS_SHOW_LOGIN_POP"
    }),

    openNewTrend(code) {
      window.open("#/lotts/" + code + "/trend", "trend");
    },

    // 获取彩种代码
    getLottsCode() {
      return this.$route.params.lottsCode;
    },

    callBackFunc() {
      this.l_getAllCountDown(this.getLottsCode());
      this._getRuleList(this.getLottsCode(), this.curCount);
    },

    // 选择请求条数
    _selectCount(count) {
      this.curCount = count;
      this._getRuleList(this.getLottsCode(), this.curCount);
    },

    // 去彩票大厅
    goLotteryPage(code) {
      if (!this.global_userName) {
        this.setLoginPopIsShow(true);
      } else {
        this.$router.push({ path: "/lotts/" + code + "/index" });
      }
    },

    _selectLotteryRule(item) {
      this.$router.push({
        path: "/lotts/" + item.lotteryCode + "/historyOpenResult"
      });
    },

    loopTime() {
      let _run = () => {
        this.timeFunc = setTimeout(() => {
          this._getRuleList(this.getLottsCode(), this.curCount);
          if (this.$route.path.indexOf("historyOpenResult") != -1) {
            _run();
          }
        }, 30000);
      };
      _run();
    },

    _getRuleList(lottsCode, count) {
      this.l_getAllCountDown(lottsCode);
      this.l_getHistoryOPenResult({
        lottsCode: lottsCode,
        count: count
      }).then(res => {
        if (res && res.errorCode == ERR_OK) {
          if (res.datas && res.datas.openResult.length > 0) {
            this.resultList = res.datas.openResult;
          }
        } else {
          this.$alert(res.msg, "温馨提示", {
            confirmButtonText: "确定",
            center: true,
            lockScroll: false
          });
        }
      });
    }
  },
  computed: {
    ...mapGetters([
      "l_allLotteryList",
      "l_curLottsCountDown",
      "global_userName"
    ])
  },
  components: {
    TimeDown
  },
  watch: {
    $route: function() {
      this._getRuleList(this.getLottsCode(), this.curCount);
    }
  }
};
</script>


<style lang="sass" scoped>
@import "~common/sass/variable"

.rule
  padding: 10px 0
  overflow: auto
  .left
    width: 230px
    float: left
    border: 1px solid #cdcdcd
    background-color: $color_text_white
    padding: 8px
    ul
      border: 1px solid #ebebeb
      li.item
        height: 38px
        line-height: 38px
        text-align: left
        padding-left: 60px
        font-size: 14px
        color: #666666
        background-color: #fafafa
        .icon
          width: 18px
          height: 18px
          margin-right: 10px
          display: inline-block
          background-size: 100% 100%
          &.icon1
            display: inline-block
            background-image: url('./icon1.png')
          &.icon2
            display: none
            background-image: url('./icon2.png')
        &:nth-of-type(2n-1)
          background-color: #f3f3f3
        &:hover,&.avtive
          background-color: $color_theme
          color: $color_text_white
          .icon1
            display: none
          .icon2
            display: inline-block
        &.title
          background-color: #575757
          color: $color_text_white
          padding: 0
          text-align: center
  .right
    width: 842px
    margin-left: 10px
    float: right
    .titleBox
        background-color: $color_text_white
        padding: 15px 0
        height: 110px
        box-sizing: border-box
        position: relative
        .prevQ
            display: inline-block
            font-size: 14px
            float: left
            width: 380px
            position: relative
            color: #666
            .imgBox
                width: 75px
                height: 80px
                float: left
                display: inline-block
                position: relative
                img
                    width: 70px
                    height: 70px
            .info
                line-height: 40px
                display: inline-block
                .openRes
                    height: 40px
                    line-height: 40px
                    .num
                        display: inline-block
                        .opening
                            color: $color_theme
                        &>div
                            display: inline-block
                            img
                                width: 20px
                                height: 20px
                                margin: 0 5px
                                vertical-align: middle
                        .bjsc
                            background-image: url('./ball-pk.png') 
                            width: 20px
                            height: 20px
                            margin: 0 1px
                            vertical-align: middle
                            display: inline-block
                            color: transparent
                            &.bjsc01
                                background-position: 0 0
                            &.bjsc02
                                background-position: 0 -20px
                            &.bjsc03
                                background-position: 0 -42px
                            &.bjsc04
                                background-position: 0 -63px
                            &.bjsc05
                                background-position: 0 -83px
                            &.bjsc06
                                background-position: 0 -105px
                            &.bjsc07
                                background-position: 0 -125px
                            &.bjsc08
                                background-position: 0 -147px
                            &.bjsc09
                                background-position: 0 -168px
                            &.bjsc10
                                background-position: 0 -188px
                        span
                            width: 25px
                            height: 25px
                            display: inline-block
                            border-radius: 50%
                            background-color: $color_theme
                            color: #fff
                            text-align: center
                            line-height: 25px
                            margin: 0 1px
                i
                    color: $color_theme
        .line
            width: 2px
            display: inline-block
            background-color: #e5e5e5
            height: 65px
        .curQ
            display: inline-block
            font-size: 14px
            margin-left: 25px
            color: #666
            i
                 color: $color_theme
            .timeBox
                line-height: 40px
                display: inline-block
                .time
                    color: $color_theme
            .btnBox
                width: 130px
                text-align: center
                display: inline-block
                line-height: 40px
                span
                    color: #3f7ee7
                    text-decoration: underline
                .betBtn
                    width: 108px
                    height: 30px
                    background-color: $color_theme
                    line-height: 30px
                    color: $color_text_white
                    text-align: center
                    border-radius: 20px
    .listBox
        margin-top: 10px
        background-color: $color_text_white
        .title
            height: 40px
            line-height: 40px
            background-color: #f8f8f8
            position: relative
            .tiitleBox
                display: inline-block
                position: relative
                span
                    display: inline-block
                    left: 0
                    width: 6px
                    height: 40px
                    background-color: $color_theme
                h2
                    font-size: 16px
                    color: #666
                    margin-left: 20px
            .btnGroup
                display: inline-block
                float: right
                &>div
                    width: 83px
                    height: 26px
                    line-height: 26px
                    text-align: center
                    display: inline-block
                    border: 2px solid #999999
                    font-size: 14px
                    color: #999999
                    margin: 0 5px
                    &:hover,&.active
                        color: $color_text_white
                        background-color: $color_theme
                        border-color: transparent
        .itemBox
            padding: 8px
            li.item
                height: 30px
                line-height: 30px
                background-color: #f5f5f5
                overflow: hidden
                color: #666
                &:nth-of-type(2n-1)
                    background-color: #edecec
                &>div
                    border: 1px solid $color_text_white
                    text-align: center
                    line-height: 30px
                    box-sizing: border-box
                    font-size: 14px
                    float: left
                    &.flex1
                        width: 183px
                        margin-left: -1px
                        text-align: center
                    &.content
                        width: 462px
                        .num
                            &>div
                                display: inline-block
                                text-align: center
                                &.hz
                                    width: 30px
                                img
                                    width: 20px
                                    height: 20px
                                    margin: 0 5px
                                    vertical-align: middle
                            .bjsc
                                background-image: url('./ball-pk.png') 
                                width: 20px
                                height: 20px
                                margin: 0 3px
                                display: inline-block
                                vertical-align: middle
                                color: transparent
                                &.bjsc01
                                    background-position: 0 0
                                &.bjsc02
                                    background-position: 0 -20px
                                &.bjsc03
                                    background-position: 0 -42px
                                &.bjsc04
                                    background-position: 0 -63px
                                &.bjsc05
                                    background-position: 0 -83px
                                &.bjsc06
                                    background-position: 0 -105px
                                &.bjsc07
                                    background-position: 0 -125px
                                &.bjsc08
                                    background-position: 0 -147px
                                &.bjsc09
                                    background-position: 0 -168px
                                &.bjsc10
                                    background-position: 0 -188px
                        span
                            width: 25px
                            height: 25px
                            display: inline-block
                            border-radius: 50%
                            color: $color_text_white
                            background-color: $color_theme
                            line-height: 25px
                            text-align: center
                            margin: 0 5px
                &.title
                    background-color: $color_theme
                    color: $color_text_white
                    height: 25px
                    &>div
                        line-height: 25px

</style>
