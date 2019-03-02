<template>
  <div class="openWinResult">
    <div class="banner">
      <div class="bannerImg"></div>
    </div>
    <div class="content pageWidth">
      <ul>
        <li class="title item">
          <div class="flex1">彩种</div>
          <div class="flex1">期号</div>
          <div class="num">开奖号码</div>
          <div class="flex1">期数/天</div>
          <div class="flex1">频率</div>
          <div class="flex1">走势</div>
          <div class="flex1">历史</div>
          <div class="flex1">购买</div>
        </li>
        <li class="item" v-for="(item,index) in resultList" :key="index">
          <div class="flex1">{{item.lotteryName}}</div>
          <div class="flex1">{{item.qs}}</div>
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
            <span v-show="item.isOpen == 1" v-for="(obj,key) in item.openResult" :key="key">{{obj}}</span>
            <div v-show="item.isOpen == 0" class="open">等待开奖</div>
          </div>
          <div class="flex1">{{item.counts}}</div>
          <div class="flex1">{{item.frequency}}</div>
          <div class="flex1">
            <span @click="openNewTrend(item.lotteryCode)" class="btn link">查看></span>
          </div>
          <div class="flex1">
            <router-link :to="'/lotts/'+item.lotteryCode+'/historyOpenResult'" class="btn link">查看></router-link>
          </div>
          <div class="flex1">
            <div class="btn purchase ce" @click="goLotteryPage(item.lotteryCode)">立即购彩</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import { ERR_OK } from "api/config";

export default {
  name: "openWinResult",
  data() {
    return {
      resultList: []
    };
  },
  created() {
    this._getOpenResult();
  },
  methods: {
    ...mapActions(["l_lotteryNewLatestResult"]),
    ...mapMutations({
      setLoginPopIsShow: "U_SET_IS_SHOW_LOGIN_POP"
    }),

    openNewTrend(code) {
      window.open("#/lotts/" + code + "/trend", "trend");
    },

    _getOpenResult() {
      this.l_lotteryNewLatestResult().then(res => {
        if (res && res.errorCode == ERR_OK) {
          this.resultList = res.datas.openResult;
        } else {
          this.$alert(res.msg, "温馨提示", {
            confirmButtonText: "确定",
            center: true,
            lockScroll: false
          });
          console.log(res);
        }
      });
    },
    // 去彩票大厅
    goLotteryPage(code) {
      if (!this.global_userName) {
        this.setLoginPopIsShow(true);
      } else {
        this.$router.push({ path: "/lotts/" + code + "/index" });
      }
    }
  },
  computed: {
    ...mapGetters(["global_userName"])
  }
};
</script>



<style lang="sass" scoped>
@import '~common/sass/variable'

.openWinResult
    padding-bottom: 5px
    .banner
        width: 100%
        height: 253px
        .bannerImg
            width: 100%
            height: 100%
            background-image: url('./banner.png')
            background-position: center
            background-repeat: no-repeat
    .content
        margin-top: 5px
        padding: 15px
        background-color: $color_text_white
        ul
            width: 100%
            li.item
                height: 35px
                line-height: 35px
                font-size: 14px
                background-color: #f6f6f6
                color: #666666
                &:nth-of-type(2n-1)
                    background-color: #ebebeb
                &.title
                    background-color: $color_theme
                    color: $color_text_white
                &>div
                    height: 100%
                    float: left
                    box-sizing: border-box
                    border: 1px solid $color_text_white
                    overflow: hidden
                    text-overflow: ellipsis
                    white-space: nowrap
                    &.num
                        width: 294px
                        text-align: center
                        margin-left: -1px
                        display: inline-block
                        &>div
                            display: inline-block
                            &.hz
                                width: 30px
                        img
                            width: 20px
                            height: 20px
                            margin: 0 3px
                            vertical-align: middle
                        span
                            width: 20px
                            height: 20px
                            text-align: center
                            line-height: 20px
                            display: inline-block
                            margin: 0 3px
                            border-radius: 50%
                            background-color: $color_theme
                            color: $color_text_white
                        .bjsc
                            background-image: url('./ball-pk.png') 
                            width: 20px
                            height: 20px
                            margin: 6px 3px 0 3px
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
                .flex1
                    width: 112px
                    text-align: center
                    margin-left: -1px
                    position: relative
                    .link
                        color: #3397fd
                    .purchase
                        width: 80px
                        height: 25px
                        text-align: center
                        line-height: 25px
                        color: $color_text_white
                        border-radius: 25px
                        background-color: $color_theme
</style>
