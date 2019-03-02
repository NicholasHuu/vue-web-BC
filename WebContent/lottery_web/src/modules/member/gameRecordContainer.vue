<template>
  <div class="game-record">
    <!-- <HeaderNav :data="m_module_title.gameRecord" :currentIndex="pageIndex" @navSwitch="navSwitch"></HeaderNav> -->
    <BetRecordWrapper v-if="pageIndex == 0"></BetRecordWrapper>
    <ZhuihaoRecord v-if="pageIndex == 1"></ZhuihaoRecord>
  </div>
</template>

<script>
import HeaderNav from "./components/headerNav";
import ZhuihaoRecord from "./components/gameRecord/zhuihaoRecord";
import BetRecordWrapper from "./components/gameRecord/betRecordWrapper";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { getLotteryGameList } from "api/common/commonApi";
import { getLotteryAll } from "api/member/memberApi";
import { ERR_OK } from "api/config";
export default {
  name: "gameRecord",
  data() {
    return {
      pageIndex: 0
    };
  },
  created() {
    this.pageIndex = this.$route.params.pageIndex * 1;
    this.get_otherGameFlat();
  },
  methods: {
    navSwitch(index) {
      this.$router.push({ path: "/member/gameRecord/" + index });
      //this.changePage(index);
    },
    ...mapMutations({
      changePage: "m_gameRecord_changeIndex"
    }),
    ...mapActions(["get_otherGameFlat"])
  },
  watch: {
    $route: function() {
      this.pageIndex = this.$route.params.pageIndex * 1;
    }
  },
  components: {
    HeaderNav,
    BetRecordWrapper,
    ZhuihaoRecord
  },
  computed: {
    ...mapGetters({
      activeIndex: "m_gameRecordIndex",
      m_module_title: "m_module_title"
    })
  }
};
</script>

<style lang="sass" scoped>

</style>

