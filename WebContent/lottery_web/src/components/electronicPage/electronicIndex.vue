<template>
  <div class="electronic">
    <div class="banner">
      <div class="pageWidth">
        <div class="wrap">
          <div class="item ag" :class="{'active': showNavIndex == 0}">
            <div class="ele ele_1">
              <img src="./images/ag_ele.png" alt>
            </div>
            <!-- <div class="ele bg_ele">
              <img src="./images/bg_ele.png" alt>
            </div>-->
          </div>
          <div class="item bbin" :class="{'active': showNavIndex == 1}">
            <div class="ele ele_1">
              <img src="./images/bbin_ele.png" alt>
            </div>
            <!-- <div class="ele bg_ele">
              <img src="./images/bg_ele.png" alt>
            </div>-->
          </div>
          <div class="item pt" :class="{'active': showNavIndex == 2}">
            <div class="ele ele_1">
              <img src="./images/pt_ele.png" alt>
            </div>
            <!-- <div class="ele bg_ele">
              <img src="./images/bg_ele.png" alt>
            </div>-->
          </div>
          <div class="item mg" :class="{'active': showNavIndex == 3}">
            <div class="ele ele_1">
              <img src="./images/mg_ele.png" alt>
            </div>
            <!-- <div class="ele bg_ele">
              <img src="./images/bg_ele.png" alt>
            </div>-->
          </div>
        </div>
        <div class="nav" ref="navList">
          <div
            v-for="(item,index) in c_homeMenuList.electronic"
            :class="[item.flatCode+' position_'+index ,{'active': index==0}]"
            class="item"
            @click="switchGame($event,index,item.flatCode)"
            :key="index"
          >
            <div class="inner">
              <div class="shade"></div>
              <div class="navContent">
                <div class="icon" :class="item.flatCode"></div>
                <h3>{{item.flatName}}</h3>
                <p>{{item.remark}}</p>
                <div
                  v-if="item.flatCode == 'ag'"
                  class="btn"
                  @click.stop="goGame(item.flatCode,item.gameCode)"
                >开始游戏</div>
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
                          <div class="btn" @click="goFlatList('ag',1)">开始游戏</div>
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
                          <div class="btn" @click="goFlatList('bbin',1)">开始游戏</div>
                        </div>
                      </div>
                    </div>
                    <div class="item mg position_3" @click="switchGame($event,3)">
                      <div class="inner">
                        <div class="shade"></div>
                        <div class="navContent">
                          <img src="./images/mg_icon.png" alt="">
                          <h3>bbin真人视讯</h3>
                          <p>AG为玩家打造绝佳真人视讯 的游戏体验。游戏选择多样化、 包括非常受欢迎的百家乐、骰 宝、轮盘等，加上全天候监控 管理，为玩</p>
                          <div class="btn" @click="goFlatList('mg',1)">开始游戏</div>
                        </div>
                      </div>
                    </div>
                    <div class="item pt position_4" @click="switchGame($event,4)">
                      <div class="inner">
                        <div class="shade"></div>
                        <div class="navContent">
                          <img src="./images/pt_icon.png" alt="">
                          <h3>bbin真人视讯</h3>
                          <p>AG为玩家打造绝佳真人视讯 的游戏体验。游戏选择多样化、 包括非常受欢迎的百家乐、骰 宝、轮盘等，加上全天候监控 管理，为玩</p>
                          <div class="btn" @click="goFlatList('pt',1)">开始游戏</div>
                        </div>
                      </div>
                    </div>
          -->
        </div>
      </div>
    </div>
    <div class="content">
      <div class="gamesBox pageWidth">
        <!-- <div class="flat_nav">
                    <ul class="tc">
                        <li v-for="(item,index) in c_homeMenuList.electronic" :key="index" :class="[index == currentIndex_flat ? 'curFlat': '']" @click="goFlatList(item.flatCode,index)">{{item.flatName}}</li>
                    </ul>
        </div>-->
        <div class="game_class">
          <ul class>
            <li>
              <div
                class="gameTypeFirstL1"
                :class="{'active': require_list.code == 'all'}"
                @click="choseGameList('all')"
              >全部游戏</div>
            </li>
            <li>
              <div
                class="gameTypeFirstL1"
                :class="{'active': require_list.code == 'hot'}"
                @click="choseGameList('hot')"
              >热门游戏</div>
            </li>
            <li>
              <div
                class="gameTypeFirstL1"
                :class="{'active': require_list.code == 'new'}"
                @click="choseGameList('new')"
              >最新游戏</div>
            </li>
            <li class="gameTypeL2">
              <div class="gameTypeFirstL1">游戏类型</div>
              <div class="gameType">
                <div
                  class="item"
                  :class="{'active':activeClass ==  item.eleType}"
                  v-for="(item,index) in electronicGameTypeList"
                  @click="choseGameType(item.eleType)"
                  :key="index"
                >{{item.eleTypeName}}</div>
              </div>
            </li>
            <li>
              <div
                class="gameTypeFirstL1"
                :class="{'active': require_list.code == 'favourite'}"
                @click="choseGameList('favourite')"
              >我的收藏</div>
            </li>
          </ul>
          <div class="search">
            <input type="text" placeholder="搜索游戏" v-model="require_list.gameName">
            <div class="btn fl" @click="requireGameList()"></div>
          </div>
        </div>

        <div class="game_list" :class="require_list.flat">
          <ul>
            <li v-for="(item,index) in game_list" v-show="true" :key="index">
              <img v-lazy="item.img" class="gameImg" alt>
              <div class="name">
                <p>{{item.cnName}}</p>
                <span
                  @click="collection(item.gameCode)"
                  :class="{'collectionYet' : item.havourite}"
                ></span>
              </div>
              <div class="goGame" @click="openGame(item.gameCode)">
                <span>开始游戏</span>
              </div>
            </li>
          </ul>
          <div v-show="noMore" class="noMoreGame">没有更多游戏了</div>
        </div>
        <div class="pageSwitch">
          <PageOption
            :totalNumber="game_return_data.totalRows"
            :totalPage="game_return_data.totalPages"
            :curPage="game_return_data.currentPage"
            @callPage="callPage"
          ></PageOption>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageOption from "../../modules/member/components/pageOption";
import { mapActions, mapGetters, mapMutations } from "vuex";
import img_banner from "./banner.png";
import { ERR_OK } from "api/config";
import {
  electronicList,
  electronicCollection,
  gameLogin
} from "api/common/commonApi";
import { messageTipsOption } from "common/js/utils";

export default {
  name: "electronic",
  data() {
    return {
      activeClass: "",
      noMore: false,
      totalPages: "",
      imgBanner: img_banner,
      require_list: {
        flat: "",
        code: "all",
        pageNo: 1,
        pageSize: 10,
        gameName: "",
        client: 0,
        gameType: ""
      },
      require_collection: {
        flat: "",
        userName: this.global_userName,
        client: 0,
        gameCode: ""
      },
      require_login: {
        userName: this.global_userName,
        flat: "",
        gameCode: ""
      },
      currentIndex_flat: 0,
      game_list: [],
      game_return_data: [],
      showNavIndex: 0,

      curIndex: null,

      electronicGameTypeList: []
    };
  },
  created() {
    if (this.$route.query.curIndex) {
      this.require_list.flat = this.$route.query.flatCode;
      this.requireGameList();
    } else {
      this.require_list.flat = this.c_homeMenuList.electronic[0].flatCode;
      this.requireGameList();
    }
    this.electronicGameTypeList = this.formArrayList(
      this.electronicGameType[this.require_list.flat]
    );
  },
  mounted() {
    if (this.$route.query.curIndex) {
      this.curIndex = this.$route.query.curIndex;
      let navList = this.$refs.navList.querySelectorAll(".item");
      navList[this.curIndex].click();
    }
    // window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    callPage(obj) {
      this.game_list = "";
      this.require_list.pageNo = obj.currentPage;
      this.require_list.pageSize = obj.pageLimit;
      electronicList(this.require_list).then(res => {
        if (res.errorCode == ERR_OK) {
          this.game_return_data = res.datas;
          this.game_list = res.datas.list;
        }
      });
    },
    formArrayList(arr) {
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        newArr[i] = {
          eleType: arr[i].eleType,
          eleTypeName: arr[i].eleTypeName
        };
      }
      newArr.unshift({ eleType: "", eleTypeName: "全部" });
      return newArr;
    },
    goGame(flatCode, gameCode) {
      this.require_login.userName = this.global_userName;
      if (this.global_userName != "") {
        this.require_login.gameCode = 500;
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
    requireGameList(obj = {}) {
      this.require_list.pageNo = 1;
      electronicList(this.require_list).then(res => {
        if (res.errorCode == ERR_OK) {
          if (!res.datas.list.length == 0) {
            this.game_list = res.datas.list;
            this.totalPages = res.datas.totalPages;
            this.game_return_data = res.datas;
            this.noMore = false;
          } else {
            this.noMore = true;
          }
          this.game_list = res.datas.list;
          this.totalPages = res.datas.totalPages;
          this.game_return_data = res.datas;
        }
      });
      this.require_list.gameType = "";
      this.game_list = "";
    },
    goFlatList(flat, index) {
      this.require_list.flat = flat;
      this.currentIndex_flat = index;
      this.requireGameList();
    },
    choseGameList(code) {
      this.activeClass = "";
      if (code == "favourite" && this.global_userName == "") {
        this.$message(messageTipsOption("请登录"));
        return;
      }
      this.require_list.code = code;
      this.requireGameList();
    },
    choseGameType(gameType) {
      this.require_list.gameType = gameType;
      this.activeClass = gameType;
      this.requireGameList();
    },
    collection(code) {
      if (this.global_userName == "") {
        this.$message(messageTipsOption("请登录"));
        return;
      }
      this.require_collection.gameCode = code;
      this.require_collection.flat = this.require_list.flat;
      electronicCollection(this.require_collection).then(res => {
        if (res.errorCode == ERR_OK) {
          this.requireGameList();
        } else {
          this.$message(messageTipsOption("请登录"));
          return;
        }
      });
    },
    openGame(code) {
      if (this.global_userName != "") {
        this.require_login.gameCode = code;
        this.require_login.flat = this.require_list.flat;
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
    switchGame(e, index, flatCode) {
      this.require_list.flat = flatCode;

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

      this.require_list.code = "all";
      this.require_list.gameName = "";
      let _this = this;
      setTimeout(function() {
        _this.electronicGameTypeList = _this.formArrayList(
          _this.electronicGameType[_this.require_list.flat]
        );
        _this.requireGameList();
      }, 500);
    },
    handleScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      const windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;

      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      if (scrollTop + windowHeight == scrollHeight) {
        if (this.require_list.pageNo == 1) {
          this.require_list.pageNo = 2;
        }
        if (this.require_list.pageNo == this.totalPages + 1) {
          this.noMore = true;
        }
        if (this.require_list.pageNo < this.totalPages + 1) {
          electronicList(this.require_list).then(res => {
            if (res.errorCode == ERR_OK) {
              this.game_list = this.game_list.concat(res.datas.list);
              this.require_list.pageNo += 1;
            }
          });
        } else {
          return;
        }
      } else {
        return;
      }
    }
  },
  computed: {
    ...mapGetters({
      c_homeMenuList: "c_homeMenuList",
      electronicGameType: "electronicGameType",
      global_userName: "global_userName"
    })
  },
  components: {
    PageOption
  },
  watch: {
    $route() {
      if (
        this.$route.query.curIndex &&
        this.curIndex == this.$route.query.curIndex
      )
        return;
      if (this.$route.query.curIndex >= 0) {
        this.require_list.flat = this.$route.query.flatCode;
        this.requireGameList(this.require_list);
        for (
          let i = 0;
          i < this.$refs.navList.querySelectorAll(".item").length;
          i++
        ) {
          if (
            this.$refs.navList
              .querySelectorAll(".item")
              [i].className.indexOf(this.require_list.flat) != -1
          ) {
            this.$refs.navList.querySelectorAll(".item")[i].click();
          }
        }
      } else {
        this.require_list.flat = this.c_homeMenuList.electronic[0].flatCode;
        this.requireGameList();
      }
    },
    c_homeMenuList() {
      if (this.c_homeMenuList) {
        this.require_list.flat = this.c_homeMenuList.electronic[0].flatCode;
        this.electronicGameTypeList = this.formArrayList(
          this.electronicGameType[this.require_list.flat]
        );
        this.requireGameList();
      }
    },
    electronicGameType() {
      this.electronicGameTypeList = this.formArrayList(
        this.electronicGameType[this.require_list.flat]
      );
      this.requireGameList();
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~common/sass/variable'
.electronic
    .banner
        height: 736px
        width: 100%
        background: url(./images/bg.jpg) no-repeat
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
              .ele_1
                z-index: 6
                position: absolute
                left: 0
                top: 0
                width: 460px
                animation: sb_ele_2 0.5s ease-out
              .bg_ele
                position: absolute
                left: -100px
                top: 100px
                width: 700px
            .item.bbin
              .ele_1
                z-index: 6
                position: absolute
                top: 0
                left: 0
                width: 590px
                animation: sb_ele_2 0.5s ease-out
              .bg_ele
                position: absolute
                left: -60px
                top: 100px
                width: 700px
            .item.mg
              .ele_1
                z-index: 6
                position: absolute
                top: 50px
                left: 0
                width: 660px
                animation: sb_ele_2 0.8s ease-out
              .bg_ele
                position: absolute
                left: -100px
                top: 50px
                width: 700px
            .item.pt
              .ele_1
                z-index: 6
                position: absolute
                top: 60px
                left: 0
                width: 510px
                animation: sb_ele_2 0.8s ease-out
              .bg_ele
                position: absolute
                left: -50px
                top: 60px
                width: 600px
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
                  .icon.mg
                    background: url(./images/mg_icon.png) no-repeat
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
        position: relative
        z-index: 6
        padding-bottom: 20px
        padding-top: 1px
        background: #050410
        .gamesBox
            margin-top: -200px
            border: 1px solid #565656
            .pageSwitch
                padding: 20px
                color: white
                .right
		                div
			                  color: white !important
		                .curPage
		                  	color: white
            .flat_nav
                padding-bottom: 20px
                border-bottom: 2px solid #333
                color: #fff
                li

                    display: inline-block
                    margin: 0 20px
                    cursor: pointer
                    &.curFlat
                        color: #f12
            .game_class
                height: 50px
                background: #212140
                .search
                    position: relative
                    float: right
                    margin: 10px 30px
                    input
                        width: 160px
                        height: 28px
                        line-height: 28px
                        padding-left: 10px
                        background: #000002
                        border: 0
                        color: #fff
                    .btn
                        position: absolute
                        top: 3px
                        right: 4px
                        width: 24px
                        height: 24px
                        background: #212140 url(./images/search_icon.png) no-repeat
                        background-size: 20px 20px
                        background-position: 2px 2px
                ul
                    display: inline-block
                li
                    float: left
                    display: inline-block
                    position: relative
                    .gameTypeFirstL1
                        display: inline-block
                        line-height: 30px
                        padding: 10px 30px
                        cursor: pointer
                        color: #fff
                        &:hover
                            background: #050509
                    .gameTypeFirstL1.active
                        background: #050509
                .gameType
                    display: none
                    z-index: 8
                    position: absolute
                    top: 50px
                    left: 0
                    width: 100%
                    background: #000
                    .item
                        line-height: 28px
                        padding: 4px
                        cursor: pointer
                        color: #fff
                        text-align: center
                        &:hover
                            background: #f12
                            color: #fff
                    .item.active
                      background: #f12
            .gameTypeL2:hover .gameType
                display: block !important
            .game_list.mg
              li
                width: 180px
                height: 180px
                img
                  width: 328px
                  margin: 20px 0 0 9px
                  transform: unset
                  transition: all 0.3s
              li:hover
                img
                  margin: 20px 0 0 -150px
            .game_list
                padding: 36px
                background: #060609
                ul
                    margin-right: -14px
                    overflow: hidden
                    li
                        position: relative
                        float: left
                        width: 194px
                        height: 194px
                        margin-right: 14px
                        margin-bottom: 14px
                        color: #fff
                        cursor: pointer
                        overflow: hidden
                        transition: all 0.3s
                        img
                          width: 100%
                          margin-top: 50%
                          transform: translateY(-50%)
                        .name
                            z-index: 5
                            position: absolute
                            top: 0
                            left: 0
                            width: 100%
                            height: 30px
                            line-height: 30px
                            background: rgba(0,0,0,0.6)
                            text-align: center
                            transition: all 0.3s
                            span
                                position: absolute
                                top: 7px
                                right: 10px
                                width: 20px
                                height: 20px
                                background: url(./images/collect-icon1.png) no-repeat
                                background-size: 100% 100%
                            span.collectionYet
                                background: url(./images/collect-icon.png) no-repeat
                                background-size: 100% 100%
                        .goGame
                            z-index: 7
                            position: absolute
                            bottom: -50px
                            left: 33px
                            text-align: center
                            color: #fff
                            transition: all 0.3s
                            span
                                position: relative
                                z-index: 8
                                display: block
                                width: 120px
                                height: 40px
                                line-height: 40px
                                border-radius: 20px
                                background: #1aa
                                transition: all 0.3s
                                font-size: 13px
                            span:hover
                                background: #000
                                box-shadow: 0 0 15px #1aa
                    li:hover
                        box-shadow: 0 0 15px #1aa
                    li:hover .name
                        height: 100%
                        span
                            transform: scale(1.1)
                    li:hover .goGame
                        bottom: 70px
.noMoreGame
    text-align: center
    color: white
@keyframes ag_ele_2
  0%
    left: -400px
  100%
    left: 0
@keyframes bbin_ele_2
  0%
    top: 700px
  100%
    top: 0
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
@keyframes increase
  0%
    transform: scale(1)
  100%
    transform: scale(1.07)
</style>
