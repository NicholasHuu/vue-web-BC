<template>
  <div class="lottery pageWidth">
    <!-- 当前彩种倒计时等信息 -->
      <Banner/>
      <div class="areaMContainer" >
        <!-- 号码选择 -->
        <SelectBet ref="SelectBet" class="selectBet"/>
        <!-- 开奖结果 -->
        <OpenResultList class="openResultList" />
      </div>
      <!-- 购彩篮 -->
      <AppNumArea/>
      <!-- 我的追号投注 -->
      <NoteChasing/>
      <!-- 投注确认弹窗 -->
      <BettingPopup/>
      <router-view/>
  </div>
</template>

<script>
import Banner from "./components/banner/banner";
import SelectBet from "./components/selectBet/selectBet";
import OpenResultList from "./components/openResultList/openResultList";
import AppNumArea from "./components/appNumArea/appNumArea";
import NoteChasing from "./components/noteChasing/noteChasing";
import BettingPopup from "./components/bettingPopup/bettingPopup";
import {mapGetters} from 'vuex'

export default {
  name: "lotter",
  data(){
    return{
      curBoxHeight: 0,
    }
  },
  computed:{
    ...mapGetters(['l_curNumberList'])
  },
  components: {
    Banner,
    SelectBet,
    OpenResultList,
    AppNumArea,
    NoteChasing,
    BettingPopup
  },
};
</script>


<style lang="sass" scoped>
.lottery
  padding-top: 20px
  overflow: auto
.areaMContainer
  overflow: auto
  display: flex
  justify-content: space-between
  background-color: #fff\0
  .openResultList,.selectBet
    padding-bottom: 0\0
    margin-bottom: 0\0
    box-sizing: border-box
  .openResultList
    vertical-align: top
    float: right
  .selectBet
    float: left
</style>
