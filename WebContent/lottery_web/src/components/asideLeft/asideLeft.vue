<template>
  <div class="asideLeft" ref="asideLeft" :class="{'ani':isOpen}" @mouseenter="_clickOpen" @mouseleave="_clickClose">
      <div class="listWrap" ref="listWrap">
        <div class="hotType typeBox btn" :class="{'active':!isShowAll}" @click="showAllOrHot(false)">热门彩种 <i class="icon"></i></div>
         <div class="scrollBox" ref="hotBox">
           <ul class="listBox" ref="hotList">
              <li @click="goLotteryPage(item.gameCode)"  class="item " :class="{'active': lottsCode() == item.gameCode}" v-for="(item,index) in l_hotNumberList" :key="index">
                  <div class="info">
                      <div class="gameName">{{item.gameName}}</div>								
                      <div class="times" v-show="item.isClose==1">{{item.closeDes}}</div>
                      <TimeDown v-show="item.isClose==0" class="times" @callBackFunc="callBackFunc" :time="item.times"/>
                  </div>
              </li>
          </ul>
         </div>
        <div class="allType typeBox btn" :class="{'active':isShowAll}" @click="showAllOrHot(true)">全部彩种 <i class="icon"></i></div>
        <div class="scrollBox" ref="allBox" :class="{'show':isShowAll}">
           <ul class="listBox" ref="allList">
              <li @click="goLotteryPage(item.gameCode)"  class="item " :class="{'active': lottsCode() == item.gameCode}" v-for="(item,index) in l_allLottsCountDownList" :key="index">
                  <div class="info">
                      <div class="gameName">{{item.gameName}}</div>								
                      <div class="times" v-show="item.isClose==1">{{item.closeDes}}</div>
                      <TimeDown v-show="item.isClose==0" class="times" @callBackFunc="callBackFunc" :time="item.times"/>
                  </div>
              </li>
          </ul>
         </div>
      </div>   
    <div class="arrow btn mCeTB" >
        <img src="./arrow.png" class="ce" :class="{'open':isOpen}" alt="">
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters,mapMutations } from "vuex";
import TimeDown from "base/timeDown/timeDown";

export default {
  name: "asideLeft",
  data() {
    return {
      timeFunc: {},
      isOpen: false,
      isShowAll: false,
      isOnce: false
    };
  },
  created() {
    this.l_getAllCountDown(this.lottsCode());
  },
  methods: {
    ...mapActions(["l_getAllCountDown"]),
    ...mapMutations({
      setLoginPopIsShow: "U_SET_IS_SHOW_LOGIN_POP"
    }),

    // 显示热门或全部
    showAllOrHot(flag){
      this.isShowAll = flag;
      if(!flag){
        this.$refs.allBox.style.height=0;
        if(this.$refs.hotList.clientHeight < 460){
          this.$refs.hotBox.style.height = (this.$refs.hotList.clientHeight) + "px";
        }else{
          this.$refs.hotBox.style.height = (this.$refs.asideLeft.clientHeight -286) + 'px';
        }
      }else{
        this.$refs.hotBox.style.height = "0px";
        this.$refs.allBox.style.height = (this.$refs.asideLeft.clientHeight -286) + 'px';
      }
    },

    lottsCode() {
      return this.$route.params.lottsCode || "";
    },
    _clickOpen(e) {
      if(this.isOpen) return;
      if(!this.isOpen){
        this.showAllOrHot(false);
      }
      this.isOpen = true;
      this.$refs.listWrap.style.height = (this.$refs.asideLeft.clientHeight -196) + 45 + 'px';
    },

     _clickClose(e) {
       if(!this.isOpen) return;
      this.isOpen = false;
    },
    _timeDown(second) {
      return timeDown(second, function(time) {
        return time;
      });
    },

    callBackFunc() {
      clearTimeout(this.timeFunc);
      let _run = () =>{
          this.timeFunc = setTimeout(() => {
            this.l_getAllCountDown(this.lottsCode());
          }, 100);
        };
      _run();
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
    ...mapGetters(["l_allLottsCountDownList","global_userName","l_hotNumberList"])
  },
  components: {
    TimeDown
  },
  watch: {
    $route(to, from) {
      //this.l_getAllCountDown(to.params.lottsCode);
      this.$nextTick(()=>{
        if(!this.isOnce && this.$route.path ==  '/lotts/'+ this.$route.params.lottsCode +'/index'){
          this.isOnce = true;
          this._clickOpen();
        }
      });
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~common/sass/variable'

.asideLeft
    position: fixed
    box-shadow: 0 0 8px 0 rgba(0,0,0,.3)
    transform: translate3d(-163px,0,0)
    transition: all .5s
    left: -163px\0
    top: 0px
    width: 163px
    height: 100%
    z-index: 7
    background-color: $color_text_white
    &.ani
        transform: translate3d(0,0,0)
        left: 0\0
    .listWrap
        width: 100%
        top: 96px
        left: 0
        position: absolute
        overflow: hidden
        .typeBox
          width: 100%
          height: 45px
          text-align: center
          line-height: 45px
          background-color: #3a3937
          color: $color_text_white
          font-size: $fs14
          position: relative
          .icon
            background-image: url("../index/images/icon2.png")
            display: inline-block
            background-size: 100% 100%
            transition: all .5s
            margin-left: 15px
            width: 18px
            height: 18px
            vertical-align: middle
          &.active
            .icon
              transform: rotate(90deg)
          &.active,&:hover
            background-color: #575757
        .scrollBox
          height: 0
          box-sizing: border-box
          overflow-y: scroll
          transition: all 1s
          &.show
            height: 420px
          &::-webkit-scrollbar
              width: 5px  
              height: 5px
          &::-webkit-scrollbar-track-piece
              background: #eee
          &::-webkit-scrollbar-thumb
              background: #333
              border-radius: 4px 
    .arrow
        position: absolute
        background-image: url('arrowBg.png')
        background-repeat: no-repeat
        width: 24px
        right: -24px
        height: 88px
        transition: all .5s
        transform: rotate(0)
        .open
            transform: rotate(180deg)
    .listBox
        .item
            cursor: pointer
            height: 45px
            line-height: 45px
            width: 100%
            font-size: $fs14
            box-sizing: border-box
            border-bottom: 1px dashed #ebebeb
            padding: 5px 10px
            .info
                width: 100%
            .gameName
                color: $color_text_fade_gray
                width: 70px
                overflow: hidden
                text-align: center
                float: left
                height: 40px
            .times
              float: right
              color: $color_theme
            &.active,&:hover
                background-color: $color_theme
                .gameName
                  color: $color_text_deep_yellow
                .times
                    color: $color_text_white
            &.addLottery
              height: 50px
              background-color: $color_text_white
              &:hover
                background-color: $color_text_white
              img
                transition: all .8s
                transform: rotateX(0)
              &.active
                img
                  transform: rotateX(180deg)
</style>
