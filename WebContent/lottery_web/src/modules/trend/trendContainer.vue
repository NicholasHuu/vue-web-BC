<template>
  <div class="trendContainer">
      <div class="head">
          <div class="title" style="display: none">
              彩种：<span>{{lotteryName}}</span>
          </div>
          <div class="navBox pageWidth">
            <ul>
              <li v-for="(items,index) in l_allLotteryList_custom" :key="index">
                <div class="new_title">{{items.groupCodeName}}</div>
                <div class="new_subItem">
                  <div class="" v-for="(item,index) in items.list" :key="index">
                    <router-link  :to="'/lotts/'+item.lotteryCode+'/trend'">
                      {{item.lotteryName}}
                    </router-link>
                  </div>
                </div>
              </li>
              <!-- <li :class="{'active': getLottsCode() == item.lotteryCode}" v-for="(item,index) in l_allLotteryList" :key="index">
                <router-link  :to="'/lotts/'+item.lotteryCode+'/trend'">
                  {{item.lotteryName}}
                </router-link>
              </li> -->
            </ul>
          </div>
          <div class="bannerBox">
            <div class="pageWidth" style="background: #fff;">
              <div class="banner" >
                <div class="leftBox">
                    <div class="lotteryImg">
                    <img :src="l_curLottsCountDown.smallPicUrl" alt="">
                </div>
                <div class="timeDown">
                    <div class="qc" v-if="l_curLottsCountDown.qs">
                        <h2>{{l_curLottsCountDown.gameName}}</h2>
                        <strong>第 <i>{{l_curLottsCountDown.qs}}</i> 期</strong>
                        <p>第 <i>{{l_curLottsCountDown.qsNow}}</i> 期 &nbsp; 共 <i>{{l_curLottsCountDown.qsCount}}</i> 期</p>
                    </div>
                    <div class="time" >
                        <div>
                            <span class="timeTips" v-show="l_curLottsCountDown.isClose==0">投注剩余时间</span>
                        </div>
                        <div id="timeBox" v-show="l_curLottsCountDown.isClose==0"></div>
                        <div class="close" v-show="l_curLottsCountDown.isClose==1">
                            <span class="">已</span>
                            <span class="">封</span>
                            <span class="">盘</span>
                        </div>
                    </div>
                </div>
                <div class="openResult">
                    <div class="qs">第{{l_curLottsCountDown.lastQs}}期</div>
                    <div class="ballBox">
                        <div class="num" v-if="l_curLottsCountDown.type == 2 && l_curLottsCountDown.isOpen == 1">
                              <i class="bjsc" :class="'bjsc'+obj" v-for="(obj,key) in l_curLottsCountDown.lastResult" :key="key">{{obj}}</i>
                          </div>
                          <div class="num" v-else-if="l_curLottsCountDown.type == 3 && l_curLottsCountDown.isOpen == 1">
                              <div v-for=" (num,numIndex) in l_curLottsCountDown.lastResult" :key="numIndex">
                                  <img  :src="convertImgPath(num)"  alt="">
                              </div>
                          </div>
                          <div class="num" v-else-if="l_curLottsCountDown.type == 6 && l_curLottsCountDown.isOpen == 1">
                              <div v-for=" (num,numIndex) in l_curLottsCountDown.lastResult" :key="numIndex">
                                  <span class="ball">{{num}}</span>
                                  <i class="push" v-if="numIndex < l_curLottsCountDown.lastResult.length -1">+</i>
                              </div>
                              <div class="hz">={{caleHZ(l_curLottsCountDown.lastResult)}}</div>
                          </div>
                          <div class="num" v-else>
                              <span class="ball" :class="{'smallBall': l_curLottsCountDown.lastResult.length>6}" v-show="l_curLottsCountDown.isOpen == 1" v-for="(obj,key) in l_curLottsCountDown.lastResult" :key="key">{{obj}}</span>
                              <div class="waitOpen" v-show="l_curLottsCountDown.isOpen == 0">正在开奖</div>
                          </div>
                    </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div class="func" >
              <div> <el-checkbox v-model="checkList.fzx">辅助线</el-checkbox></div>
              <div v-if="getLottsCode() != 'hk6'"><el-checkbox v-model="checkList.yl">遗漏</el-checkbox></div>
              <div v-if="getLottsCode() != 'hk6'"><el-checkbox v-model="checkList.ylt">遗漏条</el-checkbox></div>
              <div v-if="getLottsCode() != 'hk6'"><el-checkbox v-model="checkList.zs">走势</el-checkbox></div>
              <div v-if="getLottsCode() != 'hk6'"><el-checkbox v-model="checkList.hw">号温</el-checkbox></div>
              <div class="btn" :class="{'active': currentCount == 100}" @click="_getTrendChart(100)">100期</div>
              <div class="btn" :class="{'active': currentCount == 50}" @click="_getTrendChart(50)">50期</div>
              <div class="btn" :class="{'active': currentCount == 30}" @click="_getTrendChart(30)">30期</div>
          </div>
      </div>
      <div class="content">
          <ul class="header" ref="header">
              <li class="titleItem">
                  <div class="qs titleLH">期号</div>
                  <div class="titleBox titleLH">开奖号码</div>
                  <div class="titleBox" v-for="(item,index) in headerList" :key="index">
                      <div class="title">{{item.title}}</div>
                      <div class="num">
                        <span v-for="(obj,k) in item.ball" :key="k">{{obj}}</span>
                      </div>
                  </div>
              </li>
              <li class="elItem" v-for="(item,index) in dataList" :key="index" :class="{'line':(index+1) % 5 == 0 && index != 0 && checkList.fzx}">
                  <div class="qs">{{item.qs}}</div>
                  <div class="titleBox titleLH" v-if="item.isOpen != 0">{{item.openResult}}</div>
                  <div class="titleBox waitOpen" v-if="item.isOpen == 0">待开奖</div>
                  <div class="titleBox" :class="'column_'+ k" v-for="(obj,k) in item.yilou" v-if="item.isOpen == 1" :key="k">
                      <div class="num" :class="{'hide': !checkList.yl}">
                          <span :class="{'winNum': isWinNum(item,k,j)}" :data-val="temp" v-for="(temp,j) in obj" :key="j">
                              {{temp}}
                          </span>
                      </div>
                  </div>
              </li>
              <li class="elItem total" v-if="getLottsCode() != 'hk6'" v-for="(item,index) in totalList" :key="'_'+index" >
                  <div class="qs">{{item.title}}</div>
                  <div class="titleBox"></div>
                  <div class="titleBox" v-for="(obj,k) in item.data" :key="k">
                      <div class="num">
                          <span v-for="(temp,j) in obj" :key="j">{{temp}}</span>
                      </div>
                  </div>
              </li>
              <li class="titleItem" v-if="getLottsCode() != 'hk6'">
                  <div class="qs titleLH">期号</div>
                  <div class="titleBox">开奖号码</div>
                  <div class="titleBox" v-for="(item,index) in headerList" :key="index">
                      <div class="title">{{item.title}}</div>
                      <div class="num">
                        <span v-for="(obj,k) in item.ball" :key="k">{{obj}}</span>
                      </div>
                  </div>
              </li>
          </ul>
          <div class="canvasBox" v-show="checkList.zs">
            <canvas ref="canvas"></canvas>
        </div>
      </div>
      
  </div>
</template>


<script>
import { getTrendChart } from "api/lottery/lotteryApi";
import { ERR_OK } from "api/config";
import { addClass, removeClass, hasClass } from "common/js/dom";
import {mapGetters,mapActions} from 'vuex'
import "flipclock/dist/flipclock.css";
import Flipclock from "flipclock/dist/flipclock";

export default {
  name: "trendContainer",
  data() {
    return {
      checkList: {
        fzx: true,
        yl: true,
        ylt: false,
        zs: true,
        hw: false
      },
      headerList: [],
      dataList: [],
      totalList: [],
      currentCount: 30,
      lotteryName: "",
      _timeFunc:{},
      lotteryType: 0,

      curTimeNum: 0,
      setTimeFunc: {},
      timeFunc:{}
    };
  },
  created() {
    this._getTrendChart(30);
    if(this.l_allLotteryList.length<=0){
      this.l_getAllLottery();
    }
    this.l_getAllCountDown(this.getLottsCode());
    console.log(this.l_allLotteryList_custom);
  },
  mounted() {},
  methods: {
    ...mapActions(["l_getAllCountDown", "l_getAllLottery"]),

    //   获取彩种code
    getLottsCode() {
      return this.$route.params.lottsCode;
    },

    openNewTrend(code){
        window.open("#/lotts/"+code+"/trend","trend");   
    },
    
    timeUIFunc(item){
        if(item.isClose == 1) return;
        let _self = this;
        let clock = $("#timeBox").FlipClock(item.times, {
          clockFace: "HourlyCounter",
          clockFaceOptions: {
            countdautoStart: !0,
            autoStart: true,
            countdown: !0
          },
          onStop: function() {
            clearTimeout(_self.timeFunc);
            let _run = ()=>{
                _self.timeFunc = setTimeout(()=>{
                    _self.l_getAllCountDown(_self.getLottsCode());
                    _self._getTrendChart(_self.currentCount);
                },50)
            }
            _run();
          }
        });
    },


    _getDegaultTrendChart(){
      this.l_getAllCountDown(this.getLottsCode());
      this._getTrendChart(this.currentCount);
      // let _time = 0;
      // clearTimeout(this._timeFunc);
      // let _run = ()=>{
      //   this._timeFunc = setTimeout(()=>{
      //     _time = 60000;
      //     this._getTrendChart(this.currentCount);
      //     _run();
      //   },_time);
      // };
      // _run();
    },

    //   获取走势图
    _getTrendChart(count) {
      this.currentCount = count;
      if(this.checkList.ylt){
        this.checkList.ylt = !this.checkList.ylt;
      }
      getTrendChart({
        lotteryCode: this.getLottsCode(),
        rows: count
      }).then(res => {
        if (res && res.errorCode == ERR_OK) {
          this.headerList = res.datas.head;
          this.dataList = res.datas.list;
          this.totalList = res.datas.total;
          this.lotteryName = res.datas.lotteryName;
          this.lotteryType = res.datas.lotteryType;
          this.$nextTick(() => {
            this.drawTrend();
            this.hwFunc();
            this.yltFunc();
            if(this.checkList.ylt){
              this.checkList.ylt = !this.checkList.ylt;
            }
          });
        } else {
          this.$message.error(res.msg);
          console.log(res);
        }
      });
    },

    //   获取彩种code
    getLottsCode() {
      return this.$route.params.lottsCode;
    },

    // 是否加1
    isPushOne(item){
      let flag = false;
      if(this.lotteryType== 3 || this.lotteryType== 4 || this.lotteryType== 2){
        flag = true;
      }
      return flag;
    },

    // 是否是中奖号码
    isWinNum(item, k, j) {
      let flag = false;
      if(this.isPushOne()){
        j = parseInt(j+1);
      }
      if (item.openCode[k] == j) {
        flag = true;
      }
      return flag;
    },
    // 绘制走势
    drawTrend() {
      let x1 = 0,
        y1 = 0,
        x2 = 0,
        y2 = 0;
      let canvas = this.createCanvas(this.$refs.canvas);
      //获取位数
      let trendLineNum = this.headerList.length - 1;
      for (var a = 0; a <= trendLineNum; a++) {
        //获取显示期数总条数
        var trendBallList = document.querySelectorAll(
          ".elItem .column_" + a + " .winNum"
        );
        for (var i = 0; i < trendBallList.length; i++) {
          //计算坐标的起始位置，并处于元素中心
          var w1 = trendBallList[i].clientWidth;
          var h1 = trendBallList[i].clientHeight;
          x1 = trendBallList[i].offsetLeft + w1 / 2;
          y1 = trendBallList[i].offsetTop + h1 / 2;
          if (i + 1 < trendBallList.length) {
            var w2 = trendBallList[i + 1].clientWidth;
            var h2 = trendBallList[i + 1].clientHeight;
            x2 = trendBallList[i + 1].offsetLeft + w2 / 2;
            y2 = trendBallList[i + 1].offsetTop + h2 / 2;
          }

          //开始绘制走势
          this.commonLine(x1, y1, x2, y2, canvas);

          x1 = x2;
          y1 = y2;
        }
      }
    },

    //创建canvas区域
    createCanvas(canvas) {
      canvas.width = this.$refs.header.clientWidth;
      canvas.height = this.$refs.header.clientHeight;
      let commonTrendLine = canvas.getContext("2d");
      commonTrendLine.strokeStyle = "#C12727";
      commonTrendLine.lineWidth = 2;
      return commonTrendLine;
    },

    //常用浏览器走势图-非IE
    commonLine(x1, y1, x2, y2, commonTrendLine) {
      commonTrendLine.beginPath();
      commonTrendLine.moveTo(x1, y1);
      commonTrendLine.lineTo(x2, y2);
      commonTrendLine.closePath();
      commonTrendLine.stroke();
      commonTrendLine.restore();
    },
    // 遗漏条操作
    yltFunc() {
      let trendLineNum = this.headerList.length - 1;
      this.headerList.forEach((item, index) => {
        item.ball.forEach((obj, k) => {
          let trendBallList = document.querySelectorAll(
            ".elItem .column_" +
              index +
              " .num span:nth-of-type(" +
              (k + 1) +
              ")"
          );
          for (let i = trendBallList.length -1 ; i >= 0; i--) {
            if (this.checkList.ylt) {
              if (trendBallList[i].className.indexOf("winNum") == -1) {
                addClass(trendBallList[i], "bar");
              } else {
                break;
              }
            } else {
              removeClass(trendBallList[i], "bar");
            }
          }
        });
      });
    },
    // 号温操作
    hwFunc() {
      let trendLineNum = this.headerList.length - 1;
      this.headerList.forEach((item, index) => {
        item.ball.forEach((obj, k) => {
          let trendBallList = document.querySelectorAll(
            ".elItem .column_" +
              index +
              " .num .winNum:nth-of-type(" +
              (k + 1) +
              ")"
          );
          //判断是否为中奖号码，并加载号温状态
          [].forEach.call(trendBallList, item => {
            if (this.checkList.hw) {
              if (trendBallList.length >= 1 && trendBallList.length <= 2) {
                //1-2次为冷号
                addClass(item, "numBallCold"); //加载号温球状态
              } else if (trendBallList.length == 3) {
                //3次为温号
                addClass(item, "numBallWarm"); //加载号温球状态
              } else if (trendBallList.length >= 4) {
                //4次及以上为热号
                addClass(item, "numBallHot"); //加载号温球状态
              }
            } else {
              removeClass(item, "numBallCold");
              removeClass(item, "numBallWarm");
              removeClass(item, "numBallHot");
            }
          });
        });
      });
    }
  },
  computed:{
    ...mapGetters(["l_allLotteryList_custom","l_allLotteryList","l_curLottsCountDown", "l_curNewAwardResults"])
  },
  watch: {
    "checkList.ylt": function(val, oval) {
      this.yltFunc();
    },
    "checkList.hw": function(val, oval) {
      this.hwFunc();
    },
    l_curLottsCountDown: function() {
      this.$nextTick(() => {
        this.timeUIFunc(this.l_curLottsCountDown);
      });
    },
    '$route':'_getDegaultTrendChart',
  },
};
</script>


<style lang="sass" scoped>
@import "~common/sass/variable"

.trendContainer
    background-color: #E6E6E6
    .head
        .title
            height: 80px
            line-height: 80px
            padding-left: 30px
            font-size: 32px
            font-weight: bold
            border-bottom: 1px solid #ccc
            color: $color_theme
            margin-bottom: 20px
        .navBox
          ul
            padding: 10px
            li
              position: relative
              display: inline-block
              .new_title
                z-index: 1
                position: relative
                width: 140px
                height: 40px
                line-height: 40px
                margin-right: 2px
                font-size: 16px
                text-align: center
                color: #fff
                &:after
                  z-index: -1
                  position: absolute
                  top: 0
                  left: 0
                  display: block
                  content: ''
                  width: 100%
                  height: 100%
                  background: #E13434
                  transform: skew(-30deg)
              .new_subItem
                display: none
                z-index: 8
                position: absolute
                top: 40px
                left: -13px
                width: 100%
                box-shadow: 0 5px 7px #13332C
                &>div
                  width: 100%
                  line-height: 24px
                  padding: 4px
                  background: #fff
                  text-align: center
                  box-sizing: border-box
                  a
                    display: inline-block
                    padding: 2px 0
                    width: 90%
                    color: #333
                  &:hover
                    a
                      background: #E13434
                      color: #fff
            li:hover .new_subItem
              display: block
        .func
            margin: 20px 0
            text-align: center
            &>div
                display: inline-block
                margin-left: 25px
                &.active,&:hover
                    color: $color_theme
    .content
        margin-top: 30px
        width: 1350px
        margin: 0 auto
        box-sizing: border-box
        position: relative
        border-right: 1px solid $color_text_gray
        border-bottom: 1px solid $color_text_gray
        .header
            li
                height: 58px
                line-height: 58px
                text-align: center
                box-sizing: border-box
                border-bottom: 1px solid transparent
                margin-top: -1px
                font-size: $fs14
                &>div
                  float: left
                &:first-of-type
                    border-bottom: 1px solid $color_text_gray
                    border-top: 1px solid $color_text_gray
                &.line
                    border-color: $color_text_gray
                &.titleItem
                    height: 60px
                    display: flex
                    background-color: $color_bg_deep_gray
                    border-top: 1px solid $color_text_gray
                    .titleLH
                      line-height: 58px
                .titleBox
                    width: 225px
                    flex: 1
                    line-height: 30px
                    height: 100%
                    &.waitOpen
                      border-bottom: 1px solid $color_text_gray
                      color: $color_theme
                      width: 1170px
                      font-weight: bold
                &.elItem
                    font-size: $fs12
                    height: 30px
                    display: flex
                    background: #eee
                    &>div
                      float: left
                    &.total
                        background-color: $color_bg_deep_gray
                        border-bottom: 1px solid $color_text_gray
                        border-top: 1px solid $color_text_gray
                        .num
                            color: $color_bg_black
                    .num
                        height: 30px
                        color: $color_text_fade_gray
                        .winNum
                            position: relative
                            &:after
                                content: attr(data-val)
                                width: 18px
                                height: 18px
                                line-height: 18px
                                position: absolute
                                left: 0
                                right: 0
                                margin: 0 auto
                                top: 5px
                                z-index: 2
                                background-color: $color_theme
                                color: $color_text_white
                                border-radius: 50%
                            &.numBallCold
                                &:after
                                    background-color: #39f
                            &.numBallWarm
                                &:after
                                    background-color: #93f
                            &.numBallHot
                                &:after
                                    background-color: #f39
                        .bar
                            background-color: $color_bg_deep_gray
                .num
                    align-items: center
                    display: flex
                    justify-content: center
                    width: 100%
                    &.hide
                        color: transparent
                    span
                        height: 28px
                        flex: 1
                        margin: 0 1px
                        box-sizing: border-box
                        max-width: 22px\0
                        min-width: 18px
                        display: inline-block
                        text-align: center
                        line-height: 28px
                &>div
                    box-sizing: border-box
                    height: 29px
                    line-height: 29px
                    text-align: center
                    border-left: 1px solid $color_text_gray
                    border-right: 1px solid $color_text_gray
                    margin-left: -1px
                .qs
                    width: 100px
                    height: 100%
                .kjhm
                    width: 175px
                    height: 100%
    .canvasBox
        position: absolute
        left: 0
        top: 0
        right: 0
        bottom: 0
        pointer-events: none
        canvas
            pointer-events: none
.bannerBox
  width: 100%
.banner
    width: 1000px
    margin: 0 auto
    height: 93px
    overflow: hidden
    .leftBox
        display: inline-block
    .lotteryImg
        line-height: 93px
        padding: 0 15px
        float: left
        img
            vertical-align: middle
            width: 80px
            height: 80px
    .timeDown
        margin-left: 15px
        box-sizing: border-box
        overflow: hidden
        display: inline-block
        .qc
            line-height: 24px
            margin-top: 12px
            height: 100%
            float: left
            font-size: $fs12
            display: inline-block
            color: $color_text_black
            h2
                font-size: $fs16
                font-weight: bold
            strong
                font-weight: bold
                white-space: nowrap
            i 
                color: $color_theme
                font-weight: bold
        .time
            margin-left: 20px
            display: inline-block
            box-sizing: border-box
            font-size: 12px
            text-align: center
            float: left
            color: $color_theme
            .timeTips
                line-height: 25px
            .close
                width: 300px
                height: 93px
                line-height: 93px
                span
                    width: 60px
                    height: 60px
                    line-height: 60px
                    margin-top: 20px
                    display: inline-block
                    border: 5px solid $color_theme
                    margin: 15px 10px
                    box-sizing: border-box
                    font-size: 26px
            #timeBox
    .openResult
        margin-left: 50px
        width: 295px
        display: inline-block
        float: right
        text-align: center
        .qs
            font-size: $fs12
            line-height: 35px
            height: 35px
            color: $color_text_black
        .ballBox
            text-align: center
            margin-top: 15px
            .num
                text-align: center
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
                    margin: 0 3px
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
            .waitOpen
                text-align: center
                color: $color_theme
            .ball
                display: inline-block
                height: 37px
                width: 37px
                background-color: $color_theme
                border-radius: 50%
                margin-left: 5px
                line-height: 37px
                text-align: center
                font-size: $fs22
                color: $color_text_white
            .smallBall
                height: 25px
                width: 25px
                line-height: 25px
                font-size: $fs14
    .othe
        font-size: $fs12
        float: right
        color: $color_theme
        line-height: 45px
        margin-right: 20px
        cursor: pointer
        user-select: none
        &>a,&>span
            color: #7f7fe0
            display: block
            img
                margin-right: 5px
                vertical-align: middle
                
</style>
