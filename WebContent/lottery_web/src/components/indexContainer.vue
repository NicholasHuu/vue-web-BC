<template>
  <div>
    <!-- 通用头部 -->
    <IndexHeader/>
    <!-- 具体内容 -->
    <div class="container" :class="{'bg': bgShow}">
      <router-view/>
    </div>
    <!-- 通用底部 -->
    <IndexFooter/>

    <!-- 左边 -->
    <!-- 聊天室 -->
    <!-- <ChatRoom/> -->
    <!-- <AsideLeft /> -->
    <!-- 右边导航栏 -->
    <AsideRight/>

    <!-- 登陆弹窗 -->
    <Login @closeLogin="closeLogin"/>
    <SetMoneyPw v-if="setMoneyPwStatus"/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Login from "modules/user/components/login/login";
import SetMoneyPw from "modules/user/setMoneyPwContainer";
import IndexHeader from "components/index/indexHeader";
import IndexFooter from "components/index/indexFooter";
// import AsideLeft from "components/asideLeft/asideLeft";
import AsideRight from "components/asideRight/asideRight";
// import ChatRoom from "components/chatRoom/chatRoom";
export default {
  name: "indexContainer",
  computed: {
    ...mapGetters({
      setMoneyPwStatus: "u_setMoneyPwStatus"
    })
  },
  data() {
    return {
      bgShow: false
    };
  },
  created() {
    if (this.$route.name == "LotteryContainer") {
      this.bgShow = true;
    }
  },
  methods: {
    // 关闭登陆弹窗
    closeLogin() {
      this.u_isShowLoginPop = false;
    }
  },
  watch: {
    $route() {
      if (this.$route.name == "LotteryContainer") {
        this.bgShow = true;
      }
    }
  },
  components: {
    IndexHeader,
    IndexFooter,
    // AsideLeft,
    AsideRight,
    Login,
    SetMoneyPw
    // ChatRoom
  }
};
</script>

<style lang="sass" scoped>
  .container
    //background: url("./index/images/bg.png")
    background: #F6F6F6
  .container.bg
    background: url("./index/images/bg.png")
</style>