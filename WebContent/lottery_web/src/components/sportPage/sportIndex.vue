<template>
  <div class="live">
    <div class="banner">
      <div class="pageWidth">
        <div class="wrap">
          <div class="item ag" :class="{'active': showNavIndex == 0}">
            <div class="ele ele_2">
              <img src="./images/ele_2.png" alt>
            </div>
          </div>
          <!-- <div class="item bbin" :class="{'active': showNavIndex == 2}">
            <div class="ele ele_2"><img src="./images/bbin_ele_2.png" alt=""></div>
            <div class="ele ele_1"><img src="./images/bbin_ele_1.png" alt=""></div>
            <div class="ele ele_3"><img src="./images/bbin_ele_3.png" alt=""></div>
          </div>
          <div class="item sb" :class="{'active': showNavIndex == 3}">
            <div class="ele ele_2"><img src="./images/sb_ele_2.png" alt=""></div>
            <div class="ele ele_1"><img src="./images/sb_ele_1.png" alt=""></div>
            <div class="ele ele_4"><img src="./images/bbin_ele_1.png" alt=""></div>
          </div>-->
        </div>
        <div class="nav" ref="navList">
          <div
            v-for="(item,index) in c_homeMenuList.sport"
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
                <img src="./images/icon.png" alt="">
                <h3>体育赛事</h3>
                <p>捕鱼大师是BBIN公司旗下的一款经典游戏。精美的画面，繁多的深海鱼群，欢乐的音乐节奏，还有顶级的鱼阵和满屏的金币，让你在捕鱼的路上惊喜不停。</p>
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
          <div class="section baccarat">
            <h3>足球
              <span>Football</span>
            </h3>
            <div class="text">足球博彩中的一个流行市场是预测比赛的最终比分。虽然简单的比赛赔率只提供三种可能的结果——主胜、平局或客胜，但比赛其实有非常多的比分可能。</div>
          </div>
          <div class="clearfix">
            <div class="left section roulette">
              <h3>篮球
                <span>Basketball</span>
              </h3>
              <div
                class="text"
              >作为快节奏的攻守比赛，篮球为博彩玩家提供一种刺激的投注获利方式。我们对篮球博彩中非常重要的一些基本博彩类型进行了分类：输赢盘、让分盘、总分盘。</div>
            </div>
            <div class="right section sicBo">
              <h3>棒球
                <span>Baseball</span>
              </h3>
              <div class="text">棒球博彩常被敏锐的博彩玩家们视为最热门市场之一。棒球博彩中共有三种可用的基本投注类型；输赢盘、跑垒盘和总分盘。</div>
            </div>
          </div>
          <div class="clearfix">
            <div class="left section blackjack">
              <h3>网球
                <span>Tennis</span>
              </h3>
              <div class="text">网球中最基础的投注类型就是投注比赛获胜者。热门球员则意味着冒着相对较高的风险去获得较低的收益，这时候就有了正和负让分盘投注。</div>
            </div>
            <div class="right section texasPoker">
              <h3>电子竞技
                <span>Electronic sports</span>
              </h3>
              <div class="text">电子竞技是一种竞技性视频游戏的形式。在过去几年之内，这项体育项目（以及针对该项目的投资）人气急剧飙升。</div>
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
      if (this.global_userName != "") {
        this.require_login.gameCode = gameCode;
        this.require_login.flat = flatCode;
        var newTab = window.open();
        var span = document.createElement("span");
        newTab.window.document.body.appendChild(span);
        gameLogin(this.require_login).then(res => {
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
  display: block
  width: 100%
.live
  .banner
    height: 885px
    width: 100%
    background: url(./images/bg.jpg) no-repeat
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
            top: 150px
            width: 600px
            animation: ag_ele_2 0.5s ease-out
        .item.bbin
          .ele_2
            z-index: 6
            position: absolute
            bottom: 0
            left: 107px
            width: 330px
            height: 511px  
            animation: bbin_ele_2 0.5s ease-out
        .item.sb
          .ele_2
            z-index: 6
            position: absolute
            bottom: 0
            left: 127px
            width: 300px
            animation: sb_ele_2 0.8s ease-out
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
              .icon.sb
                background: url(./images/icon.png) no-repeat
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
          z-index: 3
          top: 140px
          right: 200px
          animation: moveL2 0.5s linear
        .item.position_1
          z-index: 2
          top: 80px
          right: 100px
          animation: moveL111 0.5s linear
        .item.position_2
          z-index: 1
          top: 20px
          right: 0
          animation: moveL111 0.5s linear
      
  .content
    margin-top: -1px
    background: #08080A
    .pageWidth
      position: relative
      padding: 310px 0 1px 0
      .wrap
        position: absolute
        top: -368px
        z-index: 6
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
        background: #2A3668 url(./images/content_bg_1.png) no-repeat
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
        background: #2A3668 url(./images/content_bg_2.png) no-repeat
        background-position: right
      .section.right.sicBo
        background: #2A3668 url(./images/content_bg_3.png) no-repeat
        background-position: right
      .section.left.blackjack
        background: #2A3668 url(./images/content_bg_4.png) no-repeat
        background-position: right
      .section.right.texasPoker
        background: #2A3668 url(./images/content_bg_5.png) no-repeat
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
    transform: scale(1.2)
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
</style>
