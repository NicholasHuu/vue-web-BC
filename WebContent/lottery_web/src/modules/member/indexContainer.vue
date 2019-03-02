<template>
  <div class="member-content">
    <!-- <div class="pageWidth help-inner"> -->
    <div class="help-inner">
      <img src="./charge_banner.png" class="img" alt>
      <div class="member-wrapper">
        <SlideNav v-show="true"></SlideNav>
        <router-view/>
      </div>
    </div>
    <div v-show="memberInfo.typeDetail && memberInfo.typeDetail.contentStatus == 1">
      <MessageBox></MessageBox>
    </div>
  </div>
</template>
<script>
import SlideNav from "./slideNavContainer";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import MessageBox from "./messageBox";
export default {
  name: "member-content",
  data() {
    return {
      isShow: false,
      showPage: [
        "GameRecord",
        "AboutMoney",
        "AccountManager",
        "Agent",
        "Message",
        "Marketing"
      ]
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      if (this.showPage.indexOf(this.$route.name) >= 0) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  },
  watch: {
    $route: function() {
      this.initialize();
    }
  },
  computed: {
    ...mapGetters({
      m_module_title: "m_module_title",
      memberInfo: "m_memberInfo"
    })
  },
  components: {
    SlideNav,
    MessageBox
  }
};
</script>
<style lang="sass" scoped>
img
	display: block
	width: 100%
.member-content
	background: url(./bg.png)
	
.help-inner
	width: 1100px
	min-height: 200px
	margin: 0 auto
	padding: 0 0 20px 0
	box-sizing: border-box
	.member-wrapper
		position: relative
		border: 1px solid #C5C5C5
		border-top: 0
		min-height: 430px
		background: #fff
	
</style>
