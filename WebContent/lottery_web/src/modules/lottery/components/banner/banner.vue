<template>
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
          <div class="qs">第{{l_curNewAwardResults.qs}}期</div>
          <div class="ballBox">
              <div class="num" v-if="l_curNewAwardResults.type == 2 && l_curNewAwardResults.isOpen == 1">
                    <i class="bjsc" :class="'bjsc'+obj" v-for="(obj,key) in l_curNewAwardResults.openResult" :key="key">{{obj}}</i>
                </div>
                <div class="num" v-else-if="l_curNewAwardResults.type == 3 && l_curNewAwardResults.isOpen == 1">
                    <div v-for=" (num,numIndex) in l_curNewAwardResults.openResult" :key="numIndex">
                        <img  :src="convertImgPath(num)"  alt="">
                    </div>
                </div>
                <div class="num" v-else-if="l_curNewAwardResults.type == 6 && l_curNewAwardResults.isOpen == 1">
                    <div v-for=" (num,numIndex) in l_curNewAwardResults.openResult" :key="numIndex">
                        <span class="ball">{{num}}</span>
                        <i class="push" v-if="numIndex < l_curNewAwardResults.openResult.length -1">+</i>
                    </div>
                    <div class="hz">={{caleHZ(l_curNewAwardResults.openResult)}}</div>
                </div>
                <div class="num" v-else>
                    <span class="ball" :class="{'smallBall': l_curNewAwardResults.openResult.length>6}" v-show="l_curNewAwardResults.isOpen == 1" v-for="(obj,key) in l_curNewAwardResults.openResult" :key="key">{{obj}}</span>
                    <div class="waitOpen" v-show="l_curNewAwardResults.isOpen == 0">正在开奖</div>
                </div>
          </div>

          <!-- <div class="qs">第{{l_curLottsCountDown.lastQs}}期</div>
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
          </div> -->
      </div>
      </div>
      <div class="othe">
          <!-- <span class="btn" @click="favoriteLottery(getLottsCode())" >
              <img src="./favorite2.png" v-show="!curIsFavorite" alt=""><img src="./favorite1.png" v-show="curIsFavorite" alt="">收藏彩种
          </span> -->
          <span class="btn" @click="openNewTrend(getLottsCode())" >
              <img src="./trend-icon.png" alt="">完整走势
          </span>
          <router-link  to="/rule?type=1">
              <img src="./play-icon.png" alt="">玩法说明
          </router-link>
      </div>
  </div>
</template>

<script>
import "flipclock/dist/flipclock.css";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { OPEN_RESULT_DEFAULT_COUNT } from "common/js/config";
import Flipclock from "flipclock/dist/flipclock";
import { saveFavoriteList, loadFavoriteList } from "common/js/cache";

export default {
  name: "lottery-banner",
  data() {
    return {
      curTimeNum: 0,
      setTimeFunc: {},
      timeFunc: {},
      curIsFavorite: false
    };
  },
  created() {
    this.initFavoriteLottery(this.getLottsCode());
  },
  methods: {
    ...mapMutations({
      setDelFavoriteLotteryList: "L_SET_DEL_FAVORITE_LOTTERY_LIST",
      setAddFavoriteLotteryList: "L_SET_FAVORITE_LOTTERY_LIST"
    }),
    //   获取彩种code
    getLottsCode() {
      return this.$route.params.lottsCode;
    },

    initFavoriteLottery(code) {
      this.curIsFavorite = false;
      this.l_getAllCountDown(this.getLottsCode());
      this.l_favoriteLotteryList.forEach((item, index) => {
        if (item.lotteryCode == code) {
          this.curIsFavorite = true;
        }
      });
    },

    favoriteLottery(code) {
      if (this.curIsFavorite) {
        this.setDelFavoriteLotteryList(code);
        this.curIsFavorite = false;
      } else {
        if(this.l_favoriteLotteryList.length >=8){
            this.$alert("收藏最多不超过8个！", "温馨提示", {
                confirmButtonText: "确定",
                center: true,
                lockScroll: false
            });
            return;
        }
        this.l_allLotteryList.forEach((item, index) => {
          if (item.lotteryCode == code) {
            this.setAddFavoriteLotteryList(item);
          }
        });
        this.curIsFavorite = true;
      }
    },

    openNewTrend(code) {
      window.open("#/lotts/" + code + "/trend", "trend");
    },

    timeUIFunc(item) {
      if (item.isClose == 1) return;
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
          let _run = () => {
            _self.timeFunc = setTimeout(() => {
              _self.l_getAllCountDown(_self.getLottsCode());
              _self.l_lotteryNextqs(_self.getLottsCode());
              _self.l_getAwardResults({
                lottsCode: _self.getLottsCode(),
                count: OPEN_RESULT_DEFAULT_COUNT
              });
            }, 50);
          };
          _run();
        }
      });
    },

    ...mapActions(["l_getAllCountDown", "l_getAwardResults", "l_lotteryNextqs"])
  },
  computed: {
    ...mapGetters([
      "l_curLottsCountDown",
      "l_favoriteLotteryList",
      "l_allLotteryList",
      "l_curNewAwardResults"
    ])
  },
  watch: {
    $route: function(to, from) {
      this.initFavoriteLottery(this.getLottsCode());
    },
    l_curLottsCountDown: function() {
      this.$nextTick(() => {
        this.timeUIFunc(this.l_curLottsCountDown);
      });
    },
    l_curNewAwardResults: function(){/*
      console.log(this.l_curNewAwardResults);
      console.log(this.l_curLottsCountDown);*/
    }
  }
};
</script>


<style lang="sass" scoped>
@import "~common/sass/variable"

.banner
    margin: 0 0 8px 0
    height: 93px
    background-color: $color_text_white
    box-shadow: 0 0 8px 0 rgba(0,0,0,.3)
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
