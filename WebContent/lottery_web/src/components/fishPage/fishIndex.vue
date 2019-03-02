<template>
  <div class="live">
    <div class="banner">
      <div class="pageWidth">
        <div class="wrap">
          <div class="item ag" :class="{'active': showNavIndex == 0}">
            <div class="ele ele_1">
              <img src="./images/bydr_ele.png" alt>
            </div>
          </div>
          <div class="item bbin_daren" :class="{'active': showNavIndex == 1}">
            <div class="ele ele_1">
              <img src="./images/byds_ele.png" alt>
            </div>
          </div>
          <div class="item bbin_master" :class="{'active': showNavIndex == 2}">
            <div class="ele ele_1">
              <img src="./images/byw_ele.png" alt>
            </div>
          </div>
          <div class="item pt" :class="{'active': showNavIndex == 3}">
            <div class="ele ele_1">
              <img src="./images/shdyj_ele.png" alt>
            </div>
          </div>
        </div>
        <div class="nav" ref="navList">
          <div
            v-for="(item,index) in c_homeMenuList.fish"
            :key="index"
            :class="[item.flatCode+' position_'+index ,{'active': index==0}]"
            class="item"
            @click="switchGame($event,index)"
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
          <!-- <div class="item ag position_1 active" @click="switchGame($event,1)">
            <div class="inner">
              <div class="shade"></div>
              <div class="navContent">
                <img src="./images/ag_icon.png" alt="">
                <h3>AG真人视讯</h3>
                <p>AG为玩家打造绝佳真人视讯 的游戏体验。游戏选择多样化、 包括非常受欢迎的百家乐、骰 宝、轮盘等，加上全天候监控 管理，为玩</p>
                <div class="btn">开始游戏</div>
              </div>
            </div>
          </div>
          <div class="item bbin position_2" @click="switchGame($event,2)">
            <div class="inner">
              <div class="shade"></div>
              <div class="navContent">
                <img src="./images/bbin_icon.png" alt="">
                <h3>bbin真人视讯</h3>
                <p>AG为玩家打造绝佳真人视讯 的游戏体验。游戏选择多样化、 包括非常受欢迎的百家乐、骰 宝、轮盘等，加上全天候监控 管理，为玩</p>
                <div class="btn">开始游戏</div>
              </div>
            </div>
          </div>
          <div class="item sb position_3" @click="switchGame($event,3)">
            <div class="inner">
              <div class="shade"></div>
              <div class="navContent">
                <img src="./images/sb_icon.png" alt="">
                <h3>bbin真人视讯</h3>
                <p>AG为玩家打造绝佳真人视讯 的游戏体验。游戏选择多样化、 包括非常受欢迎的百家乐、骰 宝、轮盘等，加上全天候监控 管理，为玩</p>
                <div class="btn">开始游戏</div>
              </div>
            </div>
          </div>-->
        </div>
      </div>
    </div>
    <div class="content">
      <div class="pageWidth">
        <div class="wrap">
          <div v-show="showNavIndex == 0">
            <img src="./images/bydr_content.jpg" alt>
          </div>
          <div v-show="showNavIndex == 1">
            <img src="./images/byds_content.jpg" alt>
          </div>
          <div v-show="showNavIndex == 2">
            <img src="./images/byw_content.jpg" alt>
          </div>
          <div v-show="showNavIndex == 3">
            <img src="./images/shdyj_content.jpg" alt>
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
      showNavIndex: 0,
      require_login: {
        userName: "",
        flat: "",
        gameCode: ""
      }
    };
  },
  created() {
    console.log(this.c_homeMenuList);
  },
  methods: {
    goGame(flatCode, gameCode) {
      this.require_login.userName = this.global_userName;
      if (this.global_userName != "") {
        this.require_login.gameCode = gameCode;
        this.require_login.flat = flatCode;

        gameLogin(this.require_login).then(res => {
          if (res.errorCode == ERR_OK) {
            var newTab = window.open();
            var span = document.createElement("span");
            newTab.window.document.body.appendChild(span);
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
img
  width: 100%
.live
  .banner
    height: 660px
    width: 100%
    background: url(./images/bg.png) no-repeat
    background-size: 100%
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
          .ele_1
            z-index: 6
            position: absolute
            left: 0
            top: 40px
            width: 500px
            animation: sb_ele_2 0.5s ease-out
        .item.bbin_daren
          .ele_1
            z-index: 6
            position: absolute
            top: 40px
            left: 0
            width: 500px
            animation: sb_ele_2 0.5s ease-out
        .item.bbin_master
          .ele_1
            z-index: 6
            position: absolute
            top: 40px
            left: 0
            width: 500px
            animation: sb_ele_2 0.8s ease-out
        .item.pt
          .ele_1
            z-index: 6
            position: absolute
            top: 40px
            left: 0
            width: 500px
            animation: sb_ele_2 0.5s ease-out
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
              .icon.bbin_daren 
                background: url(./images/bbin_icon.png) no-repeat
                background-size: 100% 100%
              .icon.bbin_master
                background: url(./images/bbin_icon.png) no-repeat
                background-size: 100% 100%
              .icon.pt
                background: url(./images/pt_icon.png) no-repeat
                background-size: 100% 100%
              h3
                line-height: 50px
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
    background: #074380
    .pageWidth
      position: relative
      padding-bottom: 30px
      .wrap
        position: relative
        z-index: 6
        height: 464px
        width: 100%
        margin-top: -120px
        border-color: #3B8DC3
        border-style: solid
        border-width: 16px 8px 8px
        overflow: hidden
@keyframes ag_ele_2
  0%
    left: -400px
  100%
    left: 0
@keyframes bbin_ele_2
  0%
    top: 700px
  100%
    top: 40px
@keyframes sb_ele_2
  0%
    transform: scale(0)
  50%
    transform: scale(1.2)
  100%
    transform: scale(1)
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
</style>
