<template>
  <div class="openResultList">
    <div class="openresultBox">
      <div class="title">
        <img
          src="./refresh.png"
          class="btn"
          :class="{'refreshAni': isRefreshAni}"
          @click="_getAwardResults"
          alt
        >
        <div>近期开奖结果</div>
        <span class="btn" @click="openNewTrend(getLottsCode())">全部></span>
      </div>

      <div
        class="listTitle"
        v-if="l_awardResults.length && (l_awardResults[0].type == 3 || l_awardResults[0].type == 1) "
      >
        <ul class="clearfix">
          <li
            v-for="(item,index) in showTitle(l_awardResults[0].type,l_curNumberList.code)"
            :key="index"
          >{{item}}</li>
        </ul>
      </div>
      <!-- <ul class="listBox" :class="{'cssTwoStyle': this.cssTwoStyle}"> -->
      <ul class="listBox">
        <li
          class="item"
          v-for="(item,index) in l_awardResults"
          :key="index"
          :class="'item'+item.type"
        >
          <div class="qc">{{item.qsFormat}}期</div>
          <div class="openNum" :class="{'w100': !isShowHZ(item)}" v-if="item.type == 3">
            <span
              v-show="item.isOpen == 1 && item.openResult.length > 0"
              v-for="(obj,j) in item.openResult"
              :key="j"
            >
              <img class="dice" :src="convertImgPath(obj)" alt>
            </span>
            <span v-show="item.isOpen == 0">等待开奖</span>
          </div>
          <div class="openNum" :class="{'w100': !isShowHZ(item)}" v-else-if="item.type == 1">
            <span
              v-show="item.isOpen == 1 && item.openResult.length > 0"
              v-for="(obj,k) in item.openResult"
              :key="k"
              :class="{'choseElement': showElement(item.type,k)}"
            >{{obj}}</span>
            <span v-show="item.isOpen == 0">等待开奖</span>
          </div>

          <div class="openNum" :class="{'w100': !isShowHZ(item)}" v-else-if="item.type != 7">
            <span
              v-show="item.isOpen == 1 && item.openResult.length > 0 "
              v-for="(obj,j) in item.openResult"
              :key="j"
            >{{obj}}</span>
            <span v-show="item.isOpen == 0">等待开奖</span>
          </div>
          <div class="openNum" :class="{'w100': !isShowHZ(item)}" v-else>
            <span
              v-show="item.isOpen == 1 && item.openResult.length > 0 && item.type == 7 && k < item.openResult.length -1"
              v-for="(obj,k) in item.openResult"
              :key="k"
            >{{obj}}</span>
            <span v-show="item.isOpen == 0">等待开奖</span>
          </div>
          <div class="sumVal" v-if=" isShowHZ(item) && item.isOpen == 1">
            <span class="hz" v-if="item.type == 7">{{item.openResult[item.openResult.length -1]}}</span>
            <span class="hz" v-else-if="item.type == 3" v-html="sumVal(item.openResult,3)"></span>
            <span
              class="hz"
              v-else-if="item.type == 1"
              v-html="sumVal(item.openResult,1,l_curNumberList.code)"
            ></span>
            <span class="hz" v-else>{{sumVal(item.openResult)}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { ERR_OK } from "api/config";
import { OPEN_RESULT_DEFAULT_COUNT } from "common/js/config";
import { fiftle, showTxt } from "./unitl";

export default {
  name: "openResultList",
  data() {
    return {
      totalHZ: 0,
      isRefreshAni: false,
      cssTwoStyle: true
    };
  },
  created() {
    this._getAwardResults();
  },
  methods: {
    ...mapActions(["l_getAwardResults"]),
    getLottsCode() {
      return this.$route.params.lottsCode;
    },

    openNewTrend(code) {
      window.open("#/lotts/" + code + "/trend", "trend");
    },
    isShowHZ(item) {
      let code = this.l_curNumberList.code;
      if (
        item.type == 7 ||
        item.type == 6 ||
        item.type == 3 ||
        item.type == 1
      ) {
        if (/rx_/.test(code) || /dwd_/.test(code) || /wxwf_tm_tm/.test(code)) {
          return false;
        }
        return true;
      } else {
        return false;
      }
    },
    showElement: function(type, index) {
      //type 便于后期增加时时彩以外的彩种
      let code = this.l_curNumberList.code;
      if (type == 1) {
        return fiftle(code, index);
      }
    },
    //   和值
    sumVal: function(list, type, module) {
      let count = 0;
      let text = "";
      list.forEach(item => {
        count += parseInt(item);
      });
      if (isNaN(count)) {
        count = "";
      }
      if (type == 3) {
        let a = "",
          b = "";
        a =
          count <= 10
            ? "<span style='color: #f33;'>小</span>"
            : "<span style='color: #f33;'>大</span>";
        b =
          count & (1 === 1)
            ? "<span style='color: #9c9;'>单</span>"
            : "<span style='color: #69f;'>双</span>";
        text =
          "<span style='color: #00ddcb;'>" + count + "</span> " + a + " " + b;
      } else if (type == 1) {
        text = showTxt(type, module, list);
      } else {
        text = count;
      }
      return text;
    },

    showTitle: function(type, module) {
      let title = [];
      if (type == 3) {
        title = ["奖期", "号码", "和值"];
      } else if (type == 1) {
        title = ["奖期", "号码", "形态"];
        if (
          (/q2_zx/.test(module) || /h2_zx/.test(module)) &&
          !/kd/.test(module)
        ) {
          title = ["奖期", "号码", "直选和值"];
        } else if (/q2_zux/.test(module) || /h2_zux/.test(module)) {
          title = ["奖期", "号码", "组选和值"];
        } else if (/kd/.test(module)) {
          title = ["奖期", "号码", "跨度"];
        } else if (/lh_lhh/.test(module)) {
          title = ["奖期", "号码", "龙虎"];
        } else if (
          /rx_/.test(module) ||
          /dwd_/.test(module) ||
          /wxwf_tm_tm/.test(module)
        ) {
          title = ["奖期", "号码"];
        }
      }
      return title;
    },
    _getAwardResults() {
      this.isRefreshAni = true;
      setTimeout(() => {
        this.isRefreshAni = false;
      }, 2000);
      this.l_getAwardResults({
        lottsCode: this.getLottsCode(),
        count: OPEN_RESULT_DEFAULT_COUNT
      });
    }
  },
  computed: {
    ...mapGetters(["l_awardResults", "l_curNumberList", "l_curPlayMode"])
  },
  watch: {
    l_awardResults() {
      console.log(
        this.l_awardResults[0].type + "-------------------------------"
      );
    },
    $route(to, from) {
      this._getAwardResults();
    },
    l_curPlayMode() {
      console.log(this.l_curPlayMode);
    },
    l_curNumberList() {
      console.log(
        this.l_curNumberList.name +
          "++++++++++++++++++++++++++++++++++++++++++++++++++"
      );
    },
    watchCss() {
      if (this.l_awardResults[0].type == 1) {
        this.cssTwoStyle = true;
      } else {
        this.cssTwoStyle = false;
      }
    }
  }
};
</script>


<style lang="sass" scoped>
@import '~common/sass/variable'
.listTitle
    ul
        display: flex
        padding: 0 8px
    li
        // flex: 0.5
        width: 33%
        line-height: 30px
        text-align: center
        color: #828282
    // li:nth-child(3)
    //     flex: 0.5
.openResultList
    overflow: hidden
    box-shadow: 0 0 8px 0 rgba(0,0,0,.3)
    background-color: $color_text_white
    .openresultBox
        width: 315px
        overflow: hidden
        background-color: $color_text_white
        .title
            height: 40px
            line-height: 40px
            box-sizing: border-box
            background-color: #fafafa
            color: #666666
            font-size: $fs12
            padding: 0 15px
            img,div,span
                display: inline-block
            img
                vertical-align: middle
            div
                margin: 0 28px
            span
                color: #7f7fe0
        .listBox
            .item
                font-size: $fs12
                padding: 5px 10px
                box-sizing: border-box
                color: $color_text_fade_gray
                line-height: 18px
                overflow: auto
                border-bottom: 1px dashed #ebebeb
                .choseElement
                    color: #e74140 !important
                .qc
                    width: 62px
                div
                    display: inline-block
                    &:not(.sumVal)
                        vertical-align: middle
                    &.openNum
                        font-size: $fs14
                        text-align: center
                        overflow: auto
                        color: $color_theme
                        line-height: 20px
                        // width: 80px
                        margin: 0 5px
                        span
                            min-width: 15px
                            display: inline-block
                            margin: 0 2px
                            text-align: center
                            font-weight: 600
                            color: #339
                        &.w100
                            width: 218px
                    .dice
                        width: 15px
                        height: 15px
                        margin-left: 5px
                    &.sumVal
                        width: 30px
                        text-align: center
                        font-size: $fs14
                .hz
                    margin-left: 5px
            .item.item1
                display: flex
                padding: 5px 8px
                div
                    &.openNum
                        flex: 0.4
                        margin: 0
                        span
                            min-width: 8px                            
                    &.sumVal
                        flex: 0.3
                .qc
                    text-align: center
                    flex: 0.3
                .hz
                    margin-left: 0
                    display: inline-block
                    font-size: 12px
                    text-align: center
            .item.item3
                // display: flex
                .qc
                    width: 94px
                    text-align: center
                .hz
                    width: 102px
                    font-size: 12px
                    text-align: right
                div.sumVal
                    width: 80px
                    text-align: right
.refreshAni
    animation: refreshAni linear 1s both infinite
.cssTwoStyle
    .item.item1
        display: flex
        div
            flex: 0.5 !important
@keyframes refreshAni
    0%
        transform: rotate(0deg)
    100%
        transform: rotate(360deg)
</style>
