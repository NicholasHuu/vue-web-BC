<template>
  <div class="rule pageWidth">
    <div class="left">
      <div class="title">
        <img src="./ruleTitle.png" v-show="_getType() == 1" alt>
        <img src="./helpTitle.png" v-show="_getType() == 2" alt>
        <img src="./welcomeTitle.png" v-show="_getType() == 3" alt>
      </div>
      <div class="leftBox">
        <ul ref="cz">
          <li
            @click="_selectLotteryRule(item)"
            v-if="_getType() == 1"
            class="item btn"
            :class="{'avtive': curLottery.lotteryCode == item.lotteryCode}"
            v-for="(item,index) in l_allLotteryList"
            :key="index"
          >{{item.lotteryName}}</li>
          <li
            @click="_selectIssuse(item)"
            v-if="_getType() == 2"
            class="item btn"
            :class="{'avtive': curActive.id == item.id}"
            v-for="(item,index) in helpList"
            :key="index"
          >{{item.title }}</li>
          <li
            @click="_selectIssuse(item)"
            v-if="_getType() == 3"
            class="item btn"
            :class="{'avtive': curActive.id == item.id}"
            v-for="(item,index) in aboutUsList"
            :key="index"
          >{{item.title }}</li>
        </ul>
      </div>
    </div>
    <div class="right" v-show="_getType() == 1">
      <div class="titleBox">
        <div class="title">
          <span class="icon mCeTB"></span>
          <h2>{{curLottery.lotteryName}}</h2>
        </div>
        <div class="jianjie">
          <div class="titleName">简介</div>
          <div class="content">{{gameDatas.introduction}}</div>
          <table class="timeBox">
            <thead>
              <tr class="timeTitle row">
                <th>彩种名称</th>
                <th>开奖时间</th>
                <th>每日期数</th>
                <th>开奖频率</th>
              </tr>
            </thead>
            <tbody>
              <tr class="row">
                <td>{{curLottery.lotteryName}}</td>
                <td class="openTime">{{gameDatas.openTime}}</td>
                <td>{{gameDatas.dayQs}}</td>
                <td>{{gameDatas.frequency}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ul class="shuomingBox">
        <li class="item" v-for="(item,index) in resultList" :key="index">
          <div v-for="(obj,key) in item.groupDetails" :key="key">
            <div v-for="(game,j) in obj.games" :key="j">
              <h1>{{game.name}}</h1>
              <p>{{game.wfsm}}</p>
              <p>{{game.xhsl}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="right" v-show="_getType() == 2 || _getType() == 3">
      <div class="titleBox">
        <div class="title">
          <span class="icon mCeTB"></span>
          <h2>{{curActive.title}}</h2>
        </div>
      </div>
      <div v-html="curActive.content"></div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { ERR_OK } from "api/config";

export default {
  name: "rule",
  data() {
    return {
      resultList: [],
      curLottery: {},
      gameDatas: {},
      curType: "1",
      helpList: [],
      curActive: {},
      aboutUsList: []
    };
  },
  created() {
    this._getDatas();
  },
  methods: {
    ...mapActions(["l_lotteryRule", "l_lotteryHomeHelp", "l_lotteryAboutUs"]),

    // 获取数据
    _getDatas() {
      if (this._getType() == 1) {
        this.curLottery = this.l_allLotteryList[0];
        this._getRuleList(this.curLottery.lotteryCode);
      } else if (this._getType() == 2) {
        this._getHelpList();
      } else {
        this._getAboutUsList();
      }
    },

    _getType() {
      return this.$route.query.type;
    },

    _selectLotteryRule(item) {
      this.curType = 1;
      this.curLottery = item;
      this._getRuleList(this.curLottery.lotteryCode);
    },

    _selectIssuse(item) {
      this.curActive = item;
    },

    _getRuleList(code) {
      this.l_lotteryRule(code).then(res => {
        if (res && res.errorCode == ERR_OK) {
          this.gameDatas = res.datas;
          this.resultList = res.datas.gameGroup;
        } else {
          this.$alert(res.msg, "温馨提示", {
            confirmButtonText: "确定",
            center: true,
            lockScroll: false
          });
        }
      });
    },

    _getAboutUsList() {
      this.l_lotteryAboutUs().then(res => {
        if (res && res.errorCode == ERR_OK) {
          this.aboutUsList = res.datas.resultList;
          let id = this.$route.query.id;
          if (this._getType() == 3 && id) {
            this.aboutUsList.forEach((item, index) => {
              if (item.pgSn == id) {
                this.curActive = item;
              }
            });
          } else {
            this.curActive = this.aboutUsList[0];
          }
        } else {
          // todo
          console.log(res);
        }
      });
    },

    _getHelpList() {
      this.l_lotteryHomeHelp().then(res => {
        if (res && res.errorCode == ERR_OK) {
          this.helpList = res.datas.resultList;
          let id = this.$route.query.id;
          if (this._getType() == 2 && id) {
            this.helpList.forEach((item, index) => {
              if (item.id == id) {
                this.curActive = item;
              }
            });
          } else {
            this.curActive = this.helpList[0];
          }
        } else {
          // todo
          console.log(res);
        }
      });
    }
  },
  computed: {
    ...mapGetters(["l_allLotteryList"])
  },
  watch: {
    $route: "_getDatas"
  }
};
</script>


<style lang="sass" scoped>
@import "~common/sass/variable"

.rule
  padding: 10px
  overflow: auto
  display: flex
  justify-content: space-between
  .left
    width: 250px
    float: left
    display: flex
    flex-direction: column
    .leftBox,.title
      border: 1px solid #cdcdcd
      background-color: $color_text_white
      padding: 8px
    .leftBox
      margin-top: 5px
      flex: 1
    ul
      border: 1px solid #ebebeb
      overflow: hidden
      transition: all .5s
      li.item
        height: 38px
        line-height: 38px
        padding: 0 10px
        overflow: hidden
        text-overflow: ellipsis
        font-size: 14px
        white-space: nowrap
        box-sizing: border-box
        color: #666666
        background-color: #fafafa
        .icon
          width: 19px
          height: 23px
          vertical-align: middle
          margin-right: 10px
          display: inline-block
          background-size: 100% 100%
          // &.icon1
          //   display: inline-block
          //   background-image: url('./location1.png')
          // &.icon2
          //   display: none
          //   background-image: url('./location2.png')
          // &.icon3
          //   width: 18px
          //   height: 18px
          //   float: right
          //   margin-top: 10px
          //   display: inline-block
          //   background-image: url('./icon2.png')
          //   transition: all .5s
          //   &.open
          //     transform: rotate(90deg)
        &:nth-of-type(2n-1)
          background-color: #f3f3f3
        &:hover,&.avtive
          background-color: #acacac
          color: $color_text_white
          .icon1
            display: none
          .icon2
            display: inline-block
        &.title
          background-color: #575757
          color: $color_text_white
          padding: 0px 
          height: 62px
          position: relative
          text-align: center
          img
            vertical-align: middle
            width: 100%
          span
            width: 80px
            display: inline-block
  .right
    float: right
    width: 835px
    margin-left: 10px
    border: 1px solid #cdcdcd
    background-color: $color_text_white
    .titleBox
      .title
        height: 40px
        line-height: 40px
        background-color: #fafafa
        font-size: 18px
        color: $color_theme
        font-weight: bold
        position: relative
        h2
          margin-left: 20px
        .icon
          height: 20px
          width: 6px
          display: inline-block
          margin-right: 20px
          background-color: $color_theme
      .jianjie
        margin-top: 50px
        padding: 0 30px
        .titleName
          font-size: 16px
          color: $color_theme
          font-weight: bold
          margin: 10px 0
        .content
          font-size: 14px
          color: #666666
          line-height: 20px
      .timeBox
        width: 100%
        margin-top: 15px
        border: 1px solid #cacaca
        td,th
          border: 1px solid #cacaca
          text-align: center
          font-size: 12px
          height: 100%
          padding: 5px
          line-height: 15px
          vertical-align: middle
        .row
          border: 1px solid #cacaca
          .openTime
            width: 250px
          &.timeTitle
            background-color: #efefef 

</style>
