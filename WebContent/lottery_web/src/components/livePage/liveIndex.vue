<template>
  <div class="live">
    <!-- <div class="banner"> -->
    <div class="banner">
      <div class="pageWidth">
        <div class="wrap">
          <div class="item ag" :class="{'active': showNavIndex == 0}">
            <div class="ele ele_2">
              <img src="./images/ag_ele_2.png" alt>
            </div>
            <div class="ele ele_1">
              <img src="./images/ag_ele_1.png" alt>
            </div>
            <!-- <div class="ele ele_3">
              <img src="./images/ag_ele_3.png" alt>
            </div>-->
            <div class="ele ele_4">
              <img src="./images/ag_ele_4.png" alt>
            </div>
          </div>
          <div class="item bbin" :class="{'active': showNavIndex == 1}">
            <div class="ele ele_2">
              <img src="./images/bbin_ele_2.png" alt>
            </div>
            <div class="ele ele_1">
              <img src="./images/bbin_ele_1.png" alt>
            </div>
            <!-- <div class="ele ele_3">
              <img src="./images/bbin_ele_3.png" alt>
            </div>-->
          </div>
          <div class="item sun" :class="{'active': showNavIndex == 2}">
            <div class="ele ele_2">
              <img src="./images/sb_ele_2.png" alt>
            </div>
            <!-- <div class="ele ele_1">
              <img src="./images/sb_ele_1.png" alt>
            </div>-->
            <div class="ele ele_4">
              <img src="./images/bbin_ele_1.png" alt>
            </div>
          </div>
          <div class="item ds" :class="{'active': showNavIndex == 3}">
            <div class="ele ele_2">
              <img src="./images/ds_ele_2.png" alt>
            </div>
            <!-- <div class="ele ele_1">
              <img src="./images/sb_ele_1.png" alt>
            </div>-->
            <div class="ele ele_4">
              <img src="./images/bbin_ele_1.png" alt>
            </div>
          </div>
        </div>
        <div class="nav" ref="navList">
          <div
            v-for="(item,index) in c_homeMenuList.live"
            :class="[item.flatCode+' position_'+index ,{'active': index==0}]"
            class="item"
            @click="switchGame($event,index)"
            :key="index"
          >
            <div class="inner">
              <div class="shade"></div>
              <div class="navContent">
                <div class="icon" :class="item.flatCode"></div>
                <h3>{{item.flatName}}</h3>
                <p>{{item.remark}}</p>
                <div class="btn" @click.stop="goGame(item.flatCode,item.gameCode)">开始游戏</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="pageWidth">
        <div class="wrap">
          <div class="section baccarat">
            <h3>
              百家乐
              <span>Live Baccarat</span>
            </h3>
            <div class="text">百家乐源于意大利，十五世纪时期传入法国，及至十九世纪时盛传于英法等地。时至今日，百家乐是世界各地赌场中最受欢迎的赌戏之一。</div>
          </div>
          <div class="clearfix">
            <div class="left section roulette">
              <h3>
                轮盘
                <span>Live Roulette</span>
              </h3>
              <div class="text">百家乐源于意大利，十五世纪时期传入法国，及至十九世纪时盛传于英法等地。时至今日，百家乐是世界各地赌场中最受欢迎的赌戏之一。</div>
            </div>
            <div class="right section sicBo">
              <h3>
                骰宝
                <span>Sic bo</span>
              </h3>
              <div class="text">庄家先把三颗骰子放在有盖的器皿内摇晃。当各闲家下注完毕，庄家便打开器皿并派彩。</div>
            </div>
          </div>
          <div class="clearfix">
            <div class="left section blackjack">
              <h3>
                21点
                <span>Live Blackjack</span>
              </h3>
              <div class="text">21点源于法国，有着悠久的历史。世界各地的赌场中21点都广受欢迎。</div>
            </div>
            <div class="right section texasPoker">
              <h3>
                德州扑克
                <span>TexasPoker</span>
              </h3>
              <div class="text">是世界上最流行的公牌扑克衍生游戏，也是国际扑克比赛的正式竞赛项目之一。</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { addClass, removeClass, hasClass } from "common/js/dom";
import { gameLogin } from "api/common/commonApi";
import { messageTipsOption } from "common/js/utils";
import { ERR_OK } from "api/config";
export default {
  name: "live",
  data() {
    return {
      bgDef: "bg.jpg",
      bannerClass: "banner0",
      showNavIndex: 0,
      require_login: {
        userName: "",
        flat: "",
        gameCode: ""
      }
    };
  },
  created() {},
  methods: {
    goGame(flatCode, gameCode) {
      this.require_login.userName = this.global_userName;
      console.log(this.require_login.userName);
      if (this.global_userName != "") {
        this.require_login.gameCode = gameCode;
        this.require_login.flat = flatCode;
        var newTab = window.open();
        var span = document.createElement("span");
        newTab.window.document.body.appendChild(span);
        gameLogin(this.require_login).then(res => {
          console.log(res);
          if (res.errorCode == ERR_OK) {
            newTab.location.href = res.datas;
          } else {
            span.innerHTML = res.msg;
          }
        });
      } else {
        this.$message(messageTipsOption("请登录"));
        return;
      }
    },
    switchGame(e, index) {
      console.log(this.showNavIndex == index);
      if (this.showNavIndex == index) return;
      let num = 1;
      let curClass = e.currentTarget.className.split(" ");
      for (let k = 0; k < curClass.length; k++) {
        if (curClass[k].indexOf("position") != -1) {
          num = curClass[k].substr(-1);
        }
      }

      let navList = this.$refs.navList.querySelectorAll(".item");
      for (let j = 0; j < navList.length; j++) {
        let newClass = navList[j].className.split(" ");
        for (let i = 0; i < newClass.length; i++) {
          if (
            newClass[i].indexOf("position_0") != -1 ||
            newClass[i].indexOf("active") != -1
          ) {
            newClass[i] = "";
            newClass.push("position_" + num);

            navList[j].className = newClass.join(" ");
          }
        }
      }

      let newClass1 = e.currentTarget.className.split(" ");
      for (let k = 0; k < newClass1.length; k++) {
        if (newClass1[k].indexOf("position") != -1) {
          newClass1[k] = "";
        }
      }
      newClass1.push("position_0 ");
      newClass1.push("active ");
      e.currentTarget.className = newClass1.join(" ");

      this.showNavIndex = index;
      this.bgDef = "bg" + index + ".jpg";
      this.bannerClass = "banner" + index;
    }
  },
  computed: {
    ...mapGetters({
      c_homeMenuList: "c_homeMenuList",
      global_userName: "global_userName"
    })
  },
  components: {}
};
</script>
<style lang="sass" scoped>
@import '~common/sass/variable'

.live
  .banner
    height: 580px
    width: 100%
    background: rgba(31,26,88,1) url(./images/bg6.jpg) no-repeat
    background-size: 100% 100%
    .pageWidth
      position: relative
      height: 100%
      .wrap
        width: 100%
        height: 100%
        .item
          display: none
          position: relative
          height: 100%
        .item.active
          display: block
        
        img
          width: 100%
        .item.ag
          .ele_2
            z-index: 6
            position: absolute
            left: 0
            bottom: 0
            width: 600px
            animation: bbin_ele_3 0.5s ease-out
          .ele_1
            position: absolute
            top: 170px
            left: 24px
            width: 126px
            opacity: 1
            transition-delay: 0.5s
            animation: ag_ele_1 0.5s ease-out
            animation-delay: 0.5s
          .ele_3
            position: absolute
            top: 50px
            left: -100px
            width: 740px
            animation: bbin_ele_3 0.5s ease-out
          .ele_4
            z-index: 4
            position: absolute
            bottom: -25px
            left: 400px
            width: 280px
            animation: ag_ele_4 0.5s ease-out
        .item.bbin
          .ele_2
            z-index: 6
            position: absolute
            bottom: 0
            left: 107px
            width: 330px
            height: 511px  
            animation: bbin_ele_3 0.5s ease-out
          .ele_1
            position: absolute
            bottom: 0
            left: 0
            width: 540px
            animation: bbin_ele_1 0.5s ease-out
          .ele_3
            position: absolute
            top: 100px
            left: 440px
            width: 150px
            animation: bbin_ele_3 0.5s ease-out
        .item.ds
          .ele_2
            z-index: 6
            position: absolute
            bottom: -26px
            left: 127px
            width: 400px
            animation: bbin_ele_3 0.8s ease-out
          .ele_1
            position: absolute
            bottom: 0
            left: -100px
            width: 750px
            animation: sb_ele_1 0.5s ease-out
          .ele_4
            position: absolute
            bottom: 0
            left: 0
            width: 550px
            animation: sb_ele_4 0.5s ease-out
        .item.sun
          .ele_2
            z-index: 6
            position: absolute
            bottom: 0
            left: 127px
            width: 300px
            animation: bbin_ele_3 0.8s ease-out
          .ele_1
            position: absolute
            bottom: 0
            left: -100px
            width: 750px
            animation: sb_ele_1 0.5s ease-out
          .ele_4
            position: absolute
            bottom: 0
            left: 0
            width: 550px
            animation: sb_ele_4 0.5s ease-out
      .nav
        .item.active .shade
          display: none
        .item
          position: absolute
          width: 240px
          height: 340px
          background: #fff
          text-align: center
          box-sizing: border-box
          transition: all 0.5s
          overflow: hidden
          .inner
            z-index: 3
            position: relative
            width: 100%
            height: 100%
            background: #fff
            .shade
              z-index: 4
              position: absolute
              top: 0
              left: 0
              width: 100%
              height: 100%
              opacity: 0.4
              background: #000
            .navContent
              padding: 20px
              background: #fff
              .icon
                width: 120px
                height: 60px
                margin: 0 auto
              .icon.ag
                background: url(./images/ag_icon.png) no-repeat
                background-size: 100% 100%
              .icon.bbin
                background: url(./images/bbin_icon.png) no-repeat
                background-size: 100% 100%
              .icon.sun
                background: url(./images/sun_icon.png) no-repeat
                background-size: 100% 100%
              .icon.ds
                background: url(./images/ds_icon.png) no-repeat
                background-size: 100% 100%
              h3
                line-height: 40px
              p
                line-height: 18px
                color: #949494
                text-align: left
                font-size: 13px
              .btn
                z-index: 1
                position: relative
                width: 100px
                height: 30px
                line-height: 30px
                margin: 20px auto 0
                color: #fff
                font-size: 13px
                &::before
                  content: ''
                  position: absolute
                  top: 0
                  left: 0
                  bottom: 0
                  right: 0
                  z-index: -1
                  background: #DA3C2B
                  transform: skew(-45deg)
        .item.position_0
          z-index: 4
          top: 170px
          right: 250px
          animation: moveL2 0.5s linear
        .item.position_1
          z-index: 3
          top: 120px
          right: 190px
          animation: moveL111 0.5s linear
        .item.position_2
          z-index: 2
          top: 70px
          right: 130px
          animation: moveL111 0.5s linear
        .item.position_3
          z-index: 1
          top: 20px
          right: 70px
          animation: moveL111 0.5s linear
      
  .content
    
    background: #1F1A58
    .pageWidth
      position: relative
      padding: 220px 0 1px 0
      .section
        height: 200px
        width: 100%
        padding: 30px
        margin-bottom: 20px
        background: #6664B8
        color: #f6f6f6
        box-sizing: border-box
        h3
          line-height: 40px
          font-size: 22px
          span
            margin-left: 10px
        .text
          line-height: 20px
          font-size: 13px
      .section.baccarat
        z-index: 8
        position: absolute
        top: 0px
        left: 0
        background: #6664B8 url(./images/content_bg_1.png) no-repeat
        background-position: right
        .text
          width: 400px
      .section.left
        float: left
        width: 680px
        .text
          width: 300px
      .section.right
        float: right
        width: 400px
        .text
          width: 130px
      .section.left.roulette
        background: #6664B8 url(./images/content_bg_2.png) no-repeat
        background-position: right
      .section.right.sicBo
        background: #6664B8 url(./images/content_bg_3.png) no-repeat
        background-position: right
      .section.left.blackjack
        background: #6664B8 url(./images/content_bg_4.png) no-repeat
        background-position: right
      .section.right.texasPoker
        background: #6664B8 url(./images/content_bg_5.png) no-repeat
        background-position: right
@keyframes ag_ele_2
  0%
    bottom: 600px
  100%
    bottom: 0
@keyframes ag_ele_1
  0%
    transform: rotateY(1080deg)
  100%
    transform: rotateY(0deg)
@keyframes ag_ele_4
  0%
    left: 800px
  100%
    left: 400px
@keyframes bbin_ele_2
  0%
    left: 500px
  100%
    left: 107px
@keyframes bbin_ele_1
  0%
    opacity: 0
  100%
    opacity: 1
@keyframes bbin_ele_3
  0%
    transform: scale(1)
  50%
    transform: scale(1.4)
  100%
    transform: scale(1)
@keyframes sb_ele_2
  0%
    left: -400px
  100%
    left: 127px
@keyframes sb_ele_4
  0%
    bottom: 500px
  100%
    bottom: 0   
@keyframes sb_ele_1
  0%
    transform: scale3d(1,1,1)
  50%
    transform: scale3d(1.3,1.3,1.6)
  100%
    transform: scale3d(1,1,1) 

@keyframes moveL111
  0%
    transform: scale(1)
  50%
    transform: scale(1.2)
  100%
    transform: scale(1)
@keyframes moveL2
  0%
    transform: scale(1)
  50%
    transform: scale(0.8)
  100%
    transform: scale(1)
.banner0
    background: rgba(31,26,88,1) url(./images/bg0.jpg) no-repeat
.banner1
    background: rgba(31,26,88,1) url(./images/bg1.jpg) no-repeat
.banner2
    background: rgba(31,26,88,1) url(./images/bg2.jpg) no-repeat
.banner3
    background: rgba(31,26,88,1) url(./images/bg3.jpg) no-repeat
</style>
