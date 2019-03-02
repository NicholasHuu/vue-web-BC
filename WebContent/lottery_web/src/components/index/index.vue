<template>
  <div class="index-content">
    <div class="slide tc">
      <Slide
        :data="bannerList"
        :autoplay="true"
        :loop="true"
        :swiperButtonClass="'index'"
        :paginationIsShow="true"
        class="swiper"
      >
        <swiper-slide v-for="(item,index) in bannerList" :key="index">
          <div class="bannerImg" :class="'bannerImg'+ index"></div>
        </swiper-slide>
      </Slide>
    </div>

    <div class="noticeBox">
      <div class="notice pageWidth">
        <div class="title">
          <i class="iconNotice"></i>
        </div>
        <div class="txt">
          <transition name="fadeY">
            <span
              class="btn"
              @click="showNoticePop(1)"
              v-show="rollingTxtIsShow"
            >{{noticeTxt.title}}</span>
          </transition>
        </div>
      </div>
    </div>

    <div class="pageWidth">
      <div class="section activities">
        <div class="title">
          <div class="mainTitle">精彩活动助您玩转头彩</div>
          <p class="subTitle">海量精彩活动时时推出，海量彩金免费送</p>
        </div>

        <div class="content">
          <div class="contentActivities">
            <li
              class="activitiesItem firstActivitiesItem"
              @click="popupStatus = !popupStatus;selectClassed(0)"
              v-bind:class="{ classred:0==current}"
            >
              <p class="activitiesTitle">周周转运</p>
              <div class="backgroundImage">
                <img src="./images/activities_1.jpg" alt>
              </div>
              <p class="activitiesTitleM">贴心回馈,周周负利大回馈</p>
              <p class="activitiesTitleN">13888转运金</p>
              <div
                class="activitiesIntroduce"
              >对于忠实新老会员，我们从不会忘却为答谢广大新老玩家长期以来对本站的支持与信赖。凡是本站新老会员当周负盈利额度达到1001元以上，皆可联系24小时在线客服进行申请转运金，最高可获13888元</div>
              <div class="btn_link">
                <span>详情+</span>
              </div>
            </li>
            <li
              class="activitiesItem"
              @click="popupStatus = !popupStatus;selectClassed(7)"
              v-bind:class="{ classred:7==current}"
            >
              <p class="activitiesTitle">周勤礼金</p>
              <div class="backgroundImage">
                <img src="./images/activities_8.jpg" alt>
              </div>
              <p class="activitiesTitleM">周周领礼金</p>
              <p class="activitiesTitleN">可获得88-18888元礼金</p>
              <div class="activitiesIntroduce">会员在一个自然周内，只要签到指定天数和完成周有效投注，即可申请一定的奖勤礼金。</div>
              <div class="btn_link">
                <span>详情+</span>
              </div>
            </li>

            <li
              class="activitiesItem"
              @click="popupStatus = !popupStatus;selectClassed(8)"
              v-bind:class="{ classred:8==current}"
            >
              <p class="activitiesTitle">新会员送彩金</p>
              <div class="backgroundImage">
                <img src="./images/activities_9.jpg" alt>
              </div>
              <p class="activitiesTitleM">首次存款赠送海量彩金</p>
              <div
                class="activitiesIntroduce"
              >新会员首次入款，即送18元彩金，多存多送，最高达1888元。头彩欢迎新会员加入我们，现在起只要你加入我们并完成首次充值100元以上，即可获得派送的幸运彩金，存越多，赠送越多，老品牌值得信赖！</div>
              <div class="btn_link">
                <span>详情+</span>
              </div>
            </li>
            <li
              class="activitiesItem"
              @click="popupStatus = !popupStatus;selectClassed(2)"
              v-bind:class="{ classred:2==current}"
            >
              <p class="activitiesTitle">逢一必送</p>
              <div class="backgroundImage">
                <img src="./images/activities_3.jpg" alt>
              </div>
              <p class="activitiesTitleM">每月1,11,21号存款送礼金</p>
              <div
                class="activitiesIntroduce"
              >“逢一必送”活动是针对每月1号，11号，21号进行存款的会员，根据不同等级的累计存款金额赠送相应礼金，多存多送。</div>
              <div class="btn_link">
                <span>详情+</span>
              </div>
            </li>
          </div>
        </div>
      </div>

      <div class="section lotterySection">
        <div class="title">
          <div class="mainTitle">全网热门彩种一站搞定</div>
          <p class="subTitle">汇聚全网热门彩种，还有海量快速彩等你来玩</p>
        </div>

        <div class="content clearfix">
          <div class="left">
            <div class="resultWrap">
              <div class="openResult">
                <div class="title">
                  <div
                    class="btn"
                    v-for="(item,index) in hotList_custom"
                    :key="index"
                    v-if="index < 5"
                    @click="_getOpenResult(item.lotteryCode,item.type);"
                    :class="{'active': curResCode == item.lotteryCode}"
                  >{{item.lotteryName}}</div>
                </div>

                <div class="resultBox">
                  <div class="tips">
                    <div class="tipsWrap">
                      <span class="icon mCeTB"></span>
                      <div class="qstxt">
                        {{newTimeNum}}期
                        <div class="timeDownBox">
                          <span class="qs">距离开奖</span>
                          <div class="time" v-show="curTimeItem.isClose==1">封盘中</div>
                          <TimeDown
                            v-show="curTimeItem.isClose==0"
                            class="time"
                            @callBackFunc="callBackFunc"
                            :typeStr="0"
                            　:time="curTimeItem.times"
                          />
                        </div>
                        <div class="btn btn_link" @click="openNewTrend(curResCode)">走势图</div>
                        <div class="btn btn_link" @click="isShowLoginBox">手动选号</div>
                      </div>
                    </div>
                  </div>

                  <div class="numBox">
                    <div class="numWrap">
                      <div class="num" v-if=" curTimeItem.type == 1 || curTimeItem.type == 6">
                        <span
                          class="normalType"
                          v-for="(obj,key) in defaultBetNumberList"
                          :key="key"
                        >{{obj}}</span>
                      </div>
                      <div class="num" v-else-if="curTimeItem.type == 2 ">
                        <span class="fir normalType">{{defaultBetNumberList[0] == 0 ? "龙" : "虎"}}</span>
                      </div>
                      <div class="num" v-else-if="curTimeItem.type == 3 ">
                        <span class="fir normalType">{{firTxt}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bottom">
                  <InputNumber v-model="multiple" :min="1" :size="'mini'"/>&nbsp;&nbsp;
                  <span>倍</span>
                  <p class="price disin">
                    共
                    <span>{{multiple*2}}</span> 元
                  </p>
                  <div class="betBtn btn" @click="isShowLoginBox">立即投注</div>
                  <div class="btn disin fr" @click="changeBetNumber">换一注</div>&nbsp;&nbsp;&nbsp;
                </div>
              </div>
            </div>
          </div>

          <div class="right">
            <ul>
              <li
                @click="goLotteryPage(item.lotteryCode)"
                v-for="(item,index) in hotList_custom"
                :key="index"
                class="item btn"
              >
                <div class="imgBox">
                  <img :src="item.smallPicUrl" alt>
                </div>
                <div class="name">
                  <div class="lotteryName">{{item.lotteryName}}</div>
                  <div class="tips">{{item.remark}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="section kind">
        <div class="title">
          <div class="mainTitle">头彩-不仅仅是彩票</div>
          <p class="subTitle">最新推出真人，电子，对战游戏，体育。你想要的这里都有</p>
        </div>
        <div class="content">
          <ul>
            <li
              class="item"
              :class="'item_'+item.code"
              v-for="(item,index) in kindList"
              :key="index"
            >
              <router-link tag="div" :to="item.link">
                <div class="icon_game"></div>
                <div class="text_game">{{item.title}}</div>
                <div class="sign_game">{{item.subTitle}}</div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="section download" ref="download" id="download">
      <div class="pageWidth">
        <div class="left">
          <div :class="['downloadCode',{active: animationStatus}]"></div>
          <div class="downloadText_1">扫一扫即刻下载</div>
          <div class="downloadText_2">支持IOS-Android等全部移动端</div>
        </div>
        <div class="middle">
          <div class="middleText_1">头彩独家APP下载</div>
          <div class="middleText_2">头彩原生APP带给您全新的游戏体验</div>
          <div
            class="middleText_3"
          >我们的手机投注平台面向全网玩家，提供近百款老虎机·百家乐·以及彩票游戏投注，线上存款及线上取款，一键操作，运用3D即时运算创造真实场景结合立体影像，完整规划的跨系统娱乐平台，整合同步帐号和资料传输，达到随时随地不间断娱乐的享受概念。</div>
        </div>
        <div class="right">
          <div :class="['pic',{active: animationStatus}]"></div>
        </div>
      </div>
    </div>

    <!-- 公告弹窗 -->
    <PanelPop
      :content="popContent"
      :title="popTitle"
      v-show="popIsShow"
      @closePanelPop="closePanelPop"
    />
    <!-- 通知弹窗以及帮助列表弹窗 -->
    <NoticePop
      :dataList="noticeDataList"
      :title="noticePopTitle"
      v-show="noticePopIsShow"
      @switchPage="switchPage"
      @closeNoticePop="closeNoticePop"
    />
    <!-- 活动内容弹窗 -->
    <ActivesPopups
      :popupStatus="popupStatus"
      :curImgUrl="curImgUrl"
      @closeActivesPop="closeActivesPop"
    />
  </div>
</template>

<script>
import { Select, Option, InputNumber, Tooltip } from "element-ui";
import { swiperSlide } from "vue-awesome-swiper";
import Slide from "base/slide/slide";
import { generateRandomNumber } from "modules/lottery/components/selectBet/selectUtil";
import PanelPop from "../panelPop/panelPop";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { ERR_OK } from "api/config";
import TimeDown from "base/timeDown/timeDown";
import NoticePop from "base/noticePop/noticePop";
import { NOTICE_DEFAULY_COUNT } from "common/js/config";
import { nextqs } from "api/lottery/lotteryApi";

import bjsc_small from "./images/lottery/bjsc_small.png";
import cqssc_small from "./images/lottery/cqssc_small.png";
import jsk3_small from "./images/lottery/jsk3_small.png";
import sdsyxw_small from "./images/lottery/sdsyxw_small.png";
import txffc_small from "./images/lottery/txffc_small.png";
import xy28_small from "./images/lottery/xy28_small.png";
import ActivesPopups from "./activesPopups";

export default {
  name: "indexContent",
  data() {
    return {
      current: 0,
      curImgUrl: 0,
      bannerList: [1, 2, 3],
      animationStatus: false,
      /****************************************/
      curLotteryType: 1, //  当前彩种类型
      openLinkType: 1, //  当前彩种类型

      multiple: 1, //  当前倍数
      hotList: [], //  热门彩种列表
      curTimeItem: {}, //  当前彩种最新一期信息（当前设计稿需下一期信息）
      isLoadOk: false, //  是否更新
      curNumberList: [], //  当前生成选取号码
      /****************************************/
      noticeList: {},
      noticeTxt: {},
      rollingTxtIsShow: false,
      curResCode: "",
      indexWinNoticeList: [],
      helpList: {},
      popContent: "",
      popTitle: "公告",
      popIsShow: false,
      noticePopTitle: "公告详情",
      noticeDataList: [],
      noticePopIsShow: false,
      noticeCurType: 1,
      setTimeFUnc: {},
      /***********************/
      curTabIndex: 1, //闲置
      downloadTabIndex: 1, //闲置
      dpList: [], //闲置
      gpList: [], //闲置

      defaultBetNumberList: [],

      kindList: [
        {
          title: "真人视讯",
          subTitle: "LIVE",
          code: "live",
          link: "/live"
        },
        {
          title: "电子游戏",
          subTitle: "ELECTRONIC",
          code: "electronic",
          link: "/electronic"
        },
        {
          title: "体育赛事",
          subTitle: "SPORT",
          code: "sport",
          link: "/sport"
        },
        {
          title: "彩票游戏",
          subTitle: "LOTTERY",
          code: "lottery",
          link: "/gameList"
        },
        {
          title: "捕鱼游戏",
          subTitle: "FISH",
          code: "fish",
          link: "/fish"
        }
      ],
      hotList_custom: [
        {
          lotteryCode: "cqssc",
          lotteryName: "重庆时时彩",
          remark: "易操作",
          smallPicUrl: cqssc_small,
          type: 1
        },
        {
          lotteryCode: "txffc",
          lotteryName: "腾讯分分彩",
          remark: "高额中奖",
          smallPicUrl: txffc_small,
          type: 1
        },
        {
          lotteryCode: "bjsc",
          lotteryName: "北京赛车",
          remark: "中奖率高",
          smallPicUrl: bjsc_small,
          type: 2
        },
        {
          lotteryCode: "jsk3",
          lotteryName: "江苏快3",
          remark: "20分钟1期",
          smallPicUrl: jsk3_small,
          type: 3
        },
        {
          lotteryCode: "xy28",
          lotteryName: "幸运28",
          remark: "5分钟1期",
          smallPicUrl: xy28_small,
          type: 6
        },
        {
          lotteryCode: "sdsyxw",
          lotteryName: "山东11选5",
          remark: "20分钟1期",
          smallPicUrl: sdsyxw_small,
          type: 4
        }
      ],

      // activitiesList: [],

      newTimeNum: "",

      firTxtList: ["大", "小", "单", "双"],
      firTxt: "",
      popupStatus: false
    };
  },
  created() {
    this._getAllLottery();
    this.l_getAllLottery_custom();
    this._getWinNotice();
    this._getGongGao(1);
    this._getHotLottery();
    this._getHelpList(1);
    // this.l_lotteryPromosActive().then(res => {
    //   if (res && res.errorCode == ERR_OK) {
    //     this.activitiesList = res.datas.resultList;
    //   }
    // });
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.$route.fullPath == "/" && this.l_isShowIndexNotice) {
          this._getPanelInfo();
        }
      }, 2000);
    });
  },
  methods: {
    selectClassed(index) {
      this.current = index;
      this.curImgUrl = index;
    },
    linkActivities(pmsTitle) {
      this.$router.push({ path: "/active/", query: { type: pmsTitle } });
    },
    changeBetNumber() {
      this.defaultBetNumberList = generateRandomNumber(this.curLotteryType);
      if (this.curLotteryType == 3) {
        this.firTxt = this.firTxtList[this.defaultBetNumberList[0]];
      }
    },
    openNewTrend(code) {
      window.open("#/lotts/" + code + "/trend", "trend");
    },

    closePanelPop() {
      this.popIsShow = false;
    },
    closeActivesPop() {
      this.popupStatus = false;
    },
    closeNoticePop() {
      this.noticePopIsShow = false;
    },

    showNoticePop(type) {
      this.noticeCurType = type;
      this.setNotictPopDataList(type);
      this.noticePopIsShow = true;
    },

    setNotictPopDataList(type) {
      this.noticeCurType = type;
      if (type == 1) {
        this.noticeDataList = this.noticeList;
      } else if (type == 2) {
        this.noticeDataList = this.helpList;
      }
    },

    switchPage(curPage) {
      if (this.noticeCurType == 1) {
        this._getGongGao(curPage);
      } else if (this.noticeCurType == 2) {
        this._getHelpList(curPage);
      }
    },

    _getPanelInfo() {
      this.l_lotteryPanelInfo("msg004").then(res => {
        if (res && res.errorCode == ERR_OK) {
          this.popContent = res.datas;
          this.popIsShow = true;
          this.setIsShowIndexNotice(false);
        } else {
          console.log(res);
        }
      });
    },

    _getHelpList(curPage) {
      this.l_lotteryHomeHelp({
        currentPage: curPage,
        pageLimit: NOTICE_DEFAULY_COUNT
      }).then(res => {
        if (res && res.errorCode == ERR_OK) {
          this.helpList = res.datas;
          this.setNotictPopDataList(2);
        } else {
          // todo
          console.log(res);
        }
      });
    },

    _getGongGao(curPage) {
      this.l_lotteryGonggao({
        currentPage: curPage,
        pageLimit: NOTICE_DEFAULY_COUNT
      }).then(res => {
        if (res && res.errorCode == ERR_OK) {
          this.noticeList = res.datas;
          this.setNotictPopDataList(1);
          this.noticeLoop();
        } else {
          // todo
          console.log(res);
        }
      });
    },

    _getHotLottery() {
      this.l_getAllCountDown("");
      this._getOpenResult(
        this.hotList_custom[0].lotteryCode,
        this.hotList_custom[0].type
      );
      // this.l_lotteryHomeHotLottery().then(res => {
      //   if (res && res.errorCode == ERR_OK) {
      //     this.hotList = res.datas.hot;
      //     this.gpList = res.datas.gp;
      //     this.dpList = res.datas.dp;
      //   } else {
      //     // todo
      //     console.log(res);
      //   }
      // });
    },

    callBackFunc() {
      this._getOpenResult(this.curResCode);
      clearTimeout(this.timeFunc);
      let _run = () => {
        this.timeFunc = setTimeout(() => {
          this.l_getAllCountDown("");
        }, 100);
      };
      _run();
    },

    _getWinNotice() {
      if (this.indexWinNoticeList.length > 0) return;
      let names = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ];
      for (let i = 0; i < 20; i++) {
        let name =
          names[~~(Math.random() * (names.length - 1))] +
          "***" +
          names[~~(Math.random() * (names.length - 1))];
        let money = 0;
        let gl = ~~(Math.random() * 10);
        let glZor = ~~(Math.random() * 2);
        if (gl >= 0 && gl < 3) {
          money = (Math.random() * 500 + 1).toFixed(2);
        } else if (gl >= 3 && gl < 6) {
          money = (Math.random() * 100 + 2).toFixed(2);
        } else if (gl >= 6 && gl < 8) {
          money = (Math.random() * 2000 + 500).toFixed(2);
        } else if (gl > 8) {
          money = (Math.random() * 100000 + 2000).toFixed(2);
        } else {
          money = (Math.random() * 500 + 1).toFixed(2);
        }
        if (glZor > 0) {
          money = parseInt(money);
          money = money.toFixed(2);
        }
        let item = { content: "恭喜" + name + "中奖" + money + "元" };
        this.indexWinNoticeList.push(item);
      }
    },

    _getOpenResult(code, type) {
      this.isLoadOk = false;
      this.curResCode = code;
      this.openLinkType = type;
      this.curLotteryType = type;
      for (let i = 0; i < this.l_allLottsCountDownList.length; i++) {
        if (code == this.l_allLottsCountDownList[i].gameCode) {
          this.isLoadOk = true;
          this.curTimeItem = this.l_allLottsCountDownList[i];
        }
      }
      this.defaultBetNumberList = generateRandomNumber(type);
      if (type == 3) {
        this.firTxt = this.firTxtList[this.defaultBetNumberList[0]];
      }
      nextqs(code).then(res => {
        this.newTimeNum = res.datas.paiqiResult.qs;
      });
    },

    // 是否显示登陆弹窗
    isShowLoginBox() {
      this.goLotteryPage(this.curResCode, this.openLinkType); //true用于首页近期开奖进入时默认选择号码
    },

    // // 去彩票大厅
    // goLotteryPage(code,flag) {
    //   if (!this.global_userName) {
    //     this.setLoginPopIsShow(true);
    //   } else {
    //     this.l_curAutoChoseList(this.defaultBetNumberList);
    //     if(flag){
    //       this.$router.push({
    //         path: "/lotts/" + code + "/index/",
    //         query: { type: flag, multipleNum: this.multiple }
    //       });
    //     }else{
    //       this.$router.push({ path: "/lotts/" + code + "/index/" });
    //     }
    //   }
    // },
    // 去彩票大厅
    goLotteryPage(code, flag) {
      this.l_curAutoChoseList(this.defaultBetNumberList);
      if (flag) {
        this.$router.push({
          path: "/lotts/" + code + "/index/",
          query: { type: flag, multipleNum: this.multiple }
        });
      } else {
        this.$router.push({ path: "/lotts/" + code + "/index/" });
      }
    },
    // 公告轮播
    noticeLoop() {
      let i = 0;
      this.noticeTxt = this.noticeList.resultList[i];
      clearTimeout(this.setTimeFUnc);
      var _run = () => {
        this.rollingTxtIsShow = true;
        this.setTimeFUnc = setTimeout(() => {
          i++;
          if (i >= this.noticeList.resultList.length) {
            i = 0;
          }
          this.noticeTxt = this.noticeList.resultList[i];
          setTimeout(() => {
            this.rollingTxtIsShow = false;
          }, 2500);
          _run();
        }, 3000);
      };
      _run();
    },

    //   获取数据
    _getAllLottery() {
      this.l_getAllLottery();
    },

    animationStatusControl() {
      if (this.$route.path != "/") return;
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      let height = document.getElementById("download").offsetTop;
      if (this.scroll >= height - 500) {
        this.animationStatus = true;
      } else {
        this.animationStatus = false;
      }
    },
    ...mapActions([
      "l_lotteryGonggao",
      "l_getAllLottery",
      "l_getAllLottery_custom",
      "l_indexWinNotice",
      "l_getAllCountDown",
      "l_lotteryHomeHotLottery",
      "l_lotteryHomeHelp",
      "l_lotteryPanelInfo"
      // "l_lotteryPromosActive"
    ]),

    ...mapMutations({
      setLoginPopIsShow: "U_SET_IS_SHOW_LOGIN_POP",
      setIsShowIndexNotice: "L_SET_IS_SHOW_INDEX_NOTICE",
      setOpenComeLink: "L_SET_OPENCOMELINK",
      l_curAutoChoseList: "l_curAutoChoseList"
    })
  },
  components: {
    Slide,
    swiperSlide,
    TimeDown,
    PanelPop,
    NoticePop,
    InputNumber,
    ActivesPopups
  },
  mounted() {
    window.addEventListener("scroll", this.animationStatusControl);
  },
  destroyed() {
    window.removeEventListener(
      "scroll",
      function(event) {
        event.preventDefault();
      },
      false
    );
  },
  computed: {
    ...mapGetters([
      "l_allLotteryList",
      "u_isShowLoginPop",
      "global_userName",
      "l_allLottsCountDownList",
      "l_isShowIndexNotice"
    ])
  },
  watch: {
    l_allLottsCountDownList: function(val, oval) {
      val.forEach(item => {
        if (item.gameCode == this.curResCode) {
          this.defaultBetNumberList = generateRandomNumber(item.type);
          this.curTimeItem = item;
          this.curLotteryType = item.type;
          nextqs(item.gameCode).then(res => {
            this.newTimeNum = res.datas.paiqiResult.qs;
          });
        }
      });
      this.isLoadOk = true;
    } /**/
  }
};
</script>
<style lang="sass" scoped>
@import '~common/sass/variable'
.index-content
	position: relative
	padding-top: 520px
.slide
	top: 0
	height: 520px
	width: 100%
	position: absolute
	background-color: $color_text_white
	.swiper
		height: 100%
		position: relative
		.bannerImg
			width: 100%
			height: 100%
			background-position: center
			background-repeat: no-repeat
		.bannerImg0
			background-image: url('./images/banner1.jpg')
		.bannerImg1
			background-image: url('./images/banner2.jpg')
		.bannerImg2
			background-image: url('./images/banner3.jpg')
.noticeBox
  //position: relative
  z-index: 2
  height: 40px
  overflow: hidden
  .notice
    z-index: 1
    position: absolute
    top: 500px
    left: 0
    right: 0
    height: 40px
    line-height: 40px
    background: url(./images/bg_gonggao.png)
    background-size: 100% 100%
    .title
      float: left
      width: 200px
      height: 40px
      background: url(./images/icon_gonggao.png) no-repeat
      background-size: 113px 29px
      background-position: 34px 4px
    .txt
      float: left
      margin-top: 5px
      width: calc(100% - 350px)
      line-height: 30px
      font-size: 14px
      text-overflow: ellipsis
      overflow: hidden
      & >span
        height: 100%
        width: 100%
        font-weight: 100
        display: block
        white-space: nowrap
        text-overflow: ellipsis
        overflow: hidden
.section
  margin-top: 50px
  .title
    text-align: center
    .mainTitle
      display: inline-block
      position: relative
      font-size: 32px
      color: #da3347
      &:before,&:after
        position: absolute
        top: 15px
        left: -150px
        content: ''
        display: block
        width: 115px
        height: 6px
        background: #E13434
        transform: skew(-45deg)
      &:after
        left: unset
        right: -150px
    .subTitle
      line-height: 40px
      font-size: 15px
      color: #666
  .content
    margin-top: 20px
.activities
  .content
    .contentActivities
      // width: 1100px
      width: 100%
      // margin: 0px auto
      display: flex
      .classred
       background: #d52f2f !important
       color: #FFF !important
       box-shadow: 0px 20px 15px rgba(0,0,0,0.3)
       .activitiesIntroduce
        color:#FFF !important
       .btn_link
          color: red !important
          span
            background: #FFF !important
      .activitiesItem
        position: relative
        flex: 1
        list-style: none
        // width: 240px
        height: 400px
        margin-left: 10px
        background: #DDD
        box-sizing: border-box
        cursor: pointer
        .activitiesTitle
          text-align: center
          padding-top: 10px
          padding-bottom: 10px
          font-size: 20px
          font-weight: 550
        .activitiesTitleM
          text-align: center
          padding-top: 10px
          font-size: 16px
          font-weight: 800
        .activitiesTitleN
          text-align: center
          padding-top: 10px
          padding-bottom: 10px
          font-size: 16px
          font-weight: 800
        .backgroundImage
        img
          display: block
          width: 240px
          margin: 0px auto
          border: 5px solid #CCC
        .activitiesIntroduce
          margin: 10px 6px
          line-height: 20px
          font-size: 14px
          color: rgba(0,0,0,0.7)
        .btn_link
          position: absolute
          bottom: -20px
          left: 120px
          color: #fff
          span
            z-index: 2
            display: inline-block
            width: 40px
            height: 40px
            text-align: center
            line-height: 40px
            font-size: 12px
            background: rgba(0,0,0,0.5)
            border-radius: 100%
.lotterySection
  .content
    .left,.right
      display: inline-block
      height: 302px
    .left
      float: left
      width: 700px
      .resultWrap
        position: relative
        width: 100%
        height: 100%
        box-shadow: 0 0 1px 0 rgba(0,0,0,.3)
        background: #fff
        .openResult
          .title
            border-bottom: 1px solid #e6e6e6
            &>div
              width: 20%
              display: inline-block
              height: 45px
              line-height: 45px
              color: #666666
              box-sizing: border-box
              font-size: 14px
              position: relative
              &:hover,&.active
                color: #fff
                background: #d52f2f
                .topIcon
                  display: block
          .resultBox
            height: 150px
            .tips
              margin-top: 10px
              padding: 6px 24px
              .tipsWrap
                position: relative
                height: 40px
                line-height: 40px
                background-color: #f7f7f7
                .icon
                  width: 6px
                  height: 100%
                  display: inline-block
                  background-color: #eb4342
                .qstxt
                  display: block
                  margin-left: 12px
                  font-size: 18px
                  color: #999999
                .timeDownBox
                  display: inline-block
                  font-size: 14px
                  .qs
                    color: #666666
                    display: inline-block
                  .time
                    display: inline-block
                    color: #eb4342
                    margin-left: 15px
                .btn_link
                  float: right
                  display: inline-block
                  width: 70px
                  height: 22px
                  line-height: 22px
                  margin-right: 10px
                  margin-top: 9px
                  color: #fff
                  background: #d52f2f
                  text-align: center
                  font-size: 13px
            .numBox
              padding: 10px
              .numWrap
                padding: 7px 0
                .num
                  font-size: 14px
                  text-align: center
                  &>div
                    display: inline-block
                    img
                      width: 20px
                      height: 20px
                      margin: 0 5px
                      vertical-align: middle
                  .bjsc
                    background-image: url('./images/ball-pk.png') 
                    width: 20px
                    height: 20px
                    margin: 0 5px
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
                  width: 35px
                  height: 35px
                  border-radius: 50%
                  line-height: 35px
                  display: inline-block
                  margin: 0 10px
                  background-color: #e74140
                  color: $color_text_white
                  font-size: $fs22
                span.normalType
                  width: 86px
                  height: 74px
                  line-height: 74px
                  text-align: center
                  border-radius: 10px
                  font-size: 24px
                  font-weight: 700
                  user-select: none
                  background-image: linear-gradient(0deg, #b92828 0%, #ec4242 100%), linear-gradient(#e13434, #e13434)
                div
                  color: $color_theme
          .bottom
            position: absolute
            bottom: 0
            left: 0
            width: 100%
            line-height: 60px
            padding: 0 24px
            font-size: 13px !important
            background: #F6F6F6
            border-top: 1px solid #e6e6e6
            box-sizing: border-box
            .price
              margin-left: 20px
              span
                color: #d52f2f
            .fr
              margin-right: 30px
              font-size: 14px
            .betBtn
              float: right
              display: inline-block
              width: 130px
              height: 38px
              line-height: 38px
              margin-top: 10px
              text-align: center
              font-size: 14px
              background-color: $color_theme
              color: $color_text_white
    .right
      float: right
      width: 390px
      ul
        margin-right: -10px
      li
        position: relative
        float: left
        width: 190px
        height: 94px
        margin-bottom: 10px
        margin-right: 10px
        background: #fff
        .imgBox,.name
          float: left
        .imgBox
          width: 60px
          height: 60px
          margin: 18px 10px 0 14px
          transition: all 0.3s
          img
            width: 100%
        .name
          margin-top: 30px
          .lotteryName
            color: #232323
            font-size: 16px
          .tips
            line-height: 20px
            color: #626262
            font-size: 12px
      li:hover
        .imgBox
          transform: scale(1.1)
.kind
  margin-bottom: 20px
  .content
    ul
      margin-right: -16px
      li
        display: inline-block
        width: 203px
        height: 203px
        margin-right: 16px
        padding-top: 40px
        text-align: center
        background: #fff
        color: #333
        border-radius: 14px
        box-sizing: border-box
        cursor: pointer
      .item
        .icon_game
          margin: 0 auto 0
          //transform: translate3d(0,-12px,0)
        .text_game
          margin: 15px 0 5px
          font-size: 16px
        .sign_game
          font-size: 20px
          font-family: "MicrosoftYaHei"
      .item_live 
        .icon_game
          width: 51px
          height: 46px
          background: url(./images/icon_live.png) no-repeat
          background-position: -51px 0
      .item_sport
        .icon_game
          width: 46px
          height: 46px
          background: url(./images/icon_sport.png) no-repeat
          background-position: -46px 0
      .item_electronic
        .icon_game
          width: 46px
          height: 46px
          background: url(./images/icon_electron.png) no-repeat
          background-position: -46px 0
      .item_fish
        .icon_game
          width: 50px
          height: 44px
          background: url(./images/icon_fish.png) no-repeat
          background-position: -50px 0
      .item_lottery
        .icon_game
          width: 44px
          height: 44px
          background: url(./images/icon_lottery.png) no-repeat
          background-position: -44px 0
      li:hover
        background: #EA4140
        color: #fff
        .icon_game
          background-position: 0 0
          animation-name: bounce
          transform-origin: center bottom
          animation-iteration-count: 1
          animation-fill-mode: both
          animation-duration: 1s
.download
  height: 350px
  margin-top: 50px
  background: url(./images/bg_down.png) no-repeat
  background-size: 100% 100%
  color: #fff
  .pageWidth
    position: relative
  .left
    float: left
    margin-right: 50px
    text-align: center
    .downloadCode
      width: 150px
      height: 150px
      margin: 60px auto 0
      background: url(./images/down_code.png) no-repeat
      background-size: 100% 100%
    .downloadCode.active
      animation: shake 1s
    .downloadText_1
      margin: 16px 0 10px
      font-size: 22px
    .downloadText_2
      font-size: 12px
  .middle
    float: left
    width: 450px
    margin-top: 60px
    .middleText_1
      font-size: 40px
      font-weight: 600
    .middleText_2
      margin: 18px 0
      font-size: 18px
      font-weight: lighter
    .middleText_3
      font-size: 14px
      line-height: 22px
  .right
    position: absolute
    top: 0
    right: -42px
    width: 450px
    height: 350px
    overflow: hidden
    .pic
      width: 420px
      height: 354px
      margin: 0 auto
      background: url(./images/icon_down.png) no-repeat
      background-size: 100% 100%
    .pic.active
      animation: increase 1s
.firstActivitiesItem
  margin-left: 0px !important
@keyframes shake
  0%, 100%
    transform: rotate(0deg)
  40%,80%
    transform: rotate(5deg)
  20%,60%
    transform: rotate(-5deg)
@keyframes increase
  0%, 100%
    transform: scale(1)
  50%
    transform: scale(1.07)
@keyframes bounce
  from, 20%, 53%, 80%, to
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000)
    transform: translate3d(0,0,0)
  40%, 43%
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060)
    transform: translate3d(0,-30px,0)
  70%
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060)
    transform: translate3d(0,-15px,0)
  90%
    transform: translate3d(0,-4px,0)

</style>
