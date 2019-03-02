<template>
  <div class="gameList">
    <div class="banner">
      <div class="bannerImg"></div>
    </div>
    <div class="gamesBox">
      <div class="pageWidth gamesBoxWrapper">
        <div class="wrapper">
          <div class="nav">
            <div
              class="itemNav"
              :class="{active: index == curIndex}"
              v-for="(item,index) in list"
              :key="index"
              @click="switchList(index)"
            >{{item.groupCodeName}}</div>
          </div>
          <ul>
            <li v-for="(item,index) in contentList" :key="index">
              <div class="top">
                <div class="imgBox">
                  <img :src="item.smallPicUrl" alt>
                </div>
                <div class="info">
                  <h1>{{item.gameName}}</h1>
                  <p>
                    第
                    <span>{{item.qs}}</span>期
                  </p>
                  <div class="timeDownBox" v-show="item.isClose==0">
                    <span>距离开奖：</span>
                    <TimeDown class="times" @callBackFunc="callBackFunc" :time="item.times"/>
                  </div>
                  <div class="timeDownBox" v-show="item.isClose==1">
                    <span class="times">{{item.closeDes}}</span>
                  </div>
                </div>
              </div>
              <div class="btnGroup">
                <div class="btn">
                  <router-link :to="'/lotts/'+item.gameCode+'/historyOpenResult'">历史开奖</router-link>
                </div>
                <div class="btn">
                  <span
                    @click="openNewTrend(item.gameCode)"
                    :to="'lotts/'+item.gameCode+'/trend'"
                  >走势图</span>
                </div>
                <div class="btn" @click="goLotteryPage(item.gameCode)">立即投注</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeDown from "base/timeDown/timeDown";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { customLotteryGroup } from "api/common/commonApi";
import { ERR_OK } from "api/config";
export default {
  name: "gameList",
  data() {
    return {
      list: [],
      contentList: [],
      curIndex: 0
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["l_getAllCountDown"]),
    ...mapMutations({
      setLoginPopIsShow: "U_SET_IS_SHOW_LOGIN_POP"
    }),
    init() {
      customLotteryGroup().then(res => {
        if (res.errorCode == ERR_OK) {
          this.list = res.datas;
          this.contentList = this.list[this.curIndex].allResult;
        }
      });
    },
    switchList(index) {
      this.contentList = this.list[index].allResult;
      this.curIndex = index;
    },
    openNewTrend(code) {
      window.open("#/lotts/" + code + "/trend", "trend");
    },
    callBackFunc() {
      clearTimeout(this.timeFunc);
      let _run = () => {
        this.timeFunc = setTimeout(() => {
          this.init();
        }, 100);
      };
      _run();
    },

    // // 去彩票大厅
    // goLotteryPage(code) {
    //   if (!this.global_userName) {
    //     this.setLoginPopIsShow(true);
    //   } else {
    //     this.$router.push({ path: "/lotts/" + code + "/index" });
    //   }
    // }
    // 去彩票大厅
    goLotteryPage(code) {
      this.setLoginPopIsShow(false);
      this.$router.push({ path: "/lotts/" + code + "/index" });
    }
  },
  computed: {
    ...mapGetters(["global_userName"])
  },
  components: {
    TimeDown
  }
};
</script>


<style lang="sass" scoped>
@import '~common/sass/variable'

.gameList
    .banner
        width: 100%
        height: 177px
        position: relative
        .bannerImg
            width: 100%
            height: 100%
            background-image: url('./banner.jpg')
            background-position: center
            background-repeat: no-repeat
    .gamesBox
        height: 765px
        background: url(./bg.jpg)
        background-position: center
        background-repeat: no-repeat
        .gamesBoxWrapper
            padding: 20px 0
        .wrapper
            width: 100%
            padding: 28px 28px
            background: #ECECEC
            border-radius: 20px
            box-sizing: border-box
        .nav
            margin-bottom: 20px
            text-align: center
            .itemNav
                display: inline-block
                width: 100px
                height: 30px
                line-height: 30px
                margin-right: 14px
                text-align: center
                color: #7C7C7C
                background: #fff
                cursor: pointer
                font-size: 14px
                border-radius: 20px
            .itemNav:hover,.itemNav.active
                background: url(./btn_bg.png) no-repeat
                background-size: 100% 100%
                box-shadow: 0px 2px 3px 2px #dadada
                color: #fff
        ul
            margin-right: -28px
            overflow: auto
            li
                position: relative
                width: 328px
                float: left
                height: 146px
                margin: 0 28px 20px 0
                background: #fff 
                background-position: left
                border-radius: 20px
                overflow: hidden
                .top
                    background: url(./btn_bg.png) no-repeat
                .imgBox
                    display: inline-block
                    width: 120px
                    height: 100px
                    img
                        float: right
                        width: 80px
                        height: 80px
                        margin-top: 10px
                .info
                    width: 180px
                    padding: 15px 0
                    box-sizing: border-box
                    display: inline-block
                    float: right
                    font-size: 14px
                    color: #fff
                    h1
                        font-size: 18px
                        font-weight: bold
                    p
                        margin: 10px 0
                        span
                            // color: #fef500
                            color: #fff
                .timeDownBox
                    display: inline-block
                    .times
                        display: inline-block
                .btnGroup
                    height: 28px
                    line-height: 28px
                    padding-top: 8px
                    margin-right: -20px
                    text-align: center
                    &>div
                        display: inline-block
                        width: 70px
                        height: 100%
                        margin-right: 20px
                        box-sizing: border-box
                        font-size: 13px
                        color: #fff
                        background: #989898
                        border-radius: 20px
                    &>div:last-child
                        background: url(./btn_bg.png) no-repeat
                        background-size: 100% 100%
                        /*&:after
                            z-index: -1
                            position: absolute
                            top: 0
                            left: 0
                            display: block
                            content: ''
                            width: 100%
                            height: 100%
                            background: #E13434
                            transform: skew(-30deg)*/
</style>
