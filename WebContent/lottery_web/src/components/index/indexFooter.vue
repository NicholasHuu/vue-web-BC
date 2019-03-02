<template>
  <div class="footer" :class="curPage">
    <div class="about_title">
      <router-link to="/rule?type=3&id=about">
        <span>关于我们</span>
      </router-link>
      <router-link to="/rule?type=3&id=deposit">
        <span>存款帮助</span>
      </router-link>|
      <router-link to="/rule?type=3&id=withdrawals">
        <span>取款帮助</span>
      </router-link>|
      <router-link to="/rule?type=3&id=agent">
        <span>代理加盟</span>
      </router-link>|
      <router-link to="/rule?type=3&id=contact">
        <span>联系我们</span>
      </router-link>|
      <router-link to="/rule?type=2">
        <span>常见问题</span>
      </router-link>
    </div>
    <div class="foot_info">
      <p>{{l_lotteryWebSiteInfo.siteFooter}}</p>
      <p>提醒：购买彩票有风险，在线投注需谨慎，不向未满18周岁的未成年人出售彩票！</p>
    </div>
    <div class="imgListBox"></div>
    <!-- 通知弹窗以及帮助列表弹窗 -->
    <NoticePop
      :dataList="noticeDataList"
      :title="noticePopTitle"
      v-show="noticePopIsShow"
      @switchPage="switchPage"
      @closeNoticePop="closeNoticePop"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PanelPop from "../panelPop/panelPop";
import NoticePop from "base/noticePop/noticePop";
import { NOTICE_DEFAULY_COUNT } from "common/js/config";
import { ERR_OK } from "api/config";

export default {
  name: "indexFooter",
  data() {
    return {
      noticePopTitle: "公告详情",
      noticeDataList: [],
      noticePopIsShow: false,
      noticeCurType: 1,

      curPage: ""
    };
  },
  created() {},
  methods: {
    ...mapActions(["l_lotteryGonggao", "get_rytoken"]),

    showNoticePop() {
      this.noticePopIsShow = true;
    },

    openNewTrend(code) {
      window.open("#/lotts/" + code + "/trend", "trend");
    },
    _getGongGao(curPage) {
      this.l_lotteryGonggao({
        currentPage: curPage,
        pageLimit: NOTICE_DEFAULY_COUNT
      }).then(res => {
        if (res && res.errorCode == ERR_OK) {
          this.noticeDataList = res.datas;
          this.showNoticePop();
        } else {
          // todo
          console.log(res);
        }
      });
    },

    switchPage(curPage) {
      this._getGongGao(curPage);
    },

    closeNoticePop() {
      this.noticePopIsShow = false;
    }
  },
  watch: {
    $route() {
      this.curPage = this.$route.name;
    }
  },
  computed: {
    ...mapGetters(["l_lotteryWebSiteInfo", "u_ryToken", "global_userName"])
  },
  components: {
    PanelPop,
    NoticePop
  }
};
</script>

<style lang="sass" scoped>
@import '~common/sass/variable'

.footer
	text-align: center
	background: #2a2a2a
	height: 200px	
	.about_title
		height: 76px
		line-height: 76px
		background: #2a2a2a
		color: #666
		font-size: 14px
		span
			color: #eee
			font-size: 14px
			margin: 0 10px
	.imgListBox
		background-image: url('images/bottom-info.png')
		background-position: center
		height: 28px
		background-repeat: no-repeat
	.foot_info
		height: 45px
		color: $color_text_white
		font-size: $fs12
		line-height: 25px
		padding: 15px
.footer.spare
	background: #414141
	.about_title
		background: #414141
.footer.active
	background: #120152
	box-shadow: 0px 0 8px 2px #111
	.about_title
		background: #120152
.footer.fish
	background: #074380
	box-shadow: 0px 0 8px 2px #111
	.about_title
		background: #074380
.footer.sport
	background: #08080A
	box-shadow: 0px 0 8px 2px #000
	.about_title
		background: #08080A
.footer.electronic
	background: #050410
	box-shadow: 0px 0 8px 2px #000
	.about_title
		background: #050410
.footer.live
	background: #1F1A58
	box-shadow: 0px 0 8px 2px #111
	.about_title
		background: #1F1A58


</style>
