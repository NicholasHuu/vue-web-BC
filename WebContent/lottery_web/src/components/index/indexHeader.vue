<template>
  <div class="nav-bar" @keyup.enter="_login" ref="navBar">
    <div class="pageWidth loginBox">
      <div class="wrapBox">
        <div class="logo">
          <img :src="logoImg" alt>
        </div>
        <div class="from" v-show="global_userName == ''">
          <div class="inputBox">
            <input placeholder="用户名" ref="userName" tabindex="1" v-model="userName">
          </div>
          <div class="inputBox">
            <input placeholder="密码" ref="password" type="password" tabindex="2" v-model="password">
          </div>
          <div class="inputBox">
            <input placeholder="验证码" ref="vCode" tabindex="3" v-model="vCode">
            <img @click="getRandomNum" :src="l_lotteryVCodeImg" class="vCodeImg btn" alt>
          </div>
          <div
            class="btn loginBtn btnstyle"
            ref="loginBtn"
            tabindex="4"
            @click="_login"
            @keyup.enter="_login"
          >登录</div>
          <div class="regBtn btn btnstyle">
            <router-link tabindex="5" to="/signUp">注册</router-link>
          </div>
          <!-- <div class="forgetPwd btnstyle">
					<router-link tabindex="6" to="/member/forgetPassword">忘记密码</router-link>
          </div>-->
        </div>
        <div class="other" v-show="global_userName != ''">
          <div class="recharge btn" @click="estimateBtn('charge')">充值</div>
          <div class="putCash btn" @click="estimateBtn('withdraw')">提现</div>
          <div class="exchange btn" @click="estimateBtn('exchange')">转换</div>
          <ul class="userInfoBox">
            <li class="money">
              余额:
              <span>{{u_userBalance.balance}}</span>
            </li>
            <li class="name">
              <div class="nameTxt">
                <img src="./images/userImg.png" alt>
                <span>{{memberInfo.nickName}}</span>
                <span v-show="!memberInfo.nickName">会员中心</span>
              </div>
              <div class="subItem">
                <div class="item head clearfix">
                  <div class="userImg fl">
                    <img src="./images/userImg.png" alt>
                  </div>
                  <div class="userInfos fl">
                    <div>
                      <p>
                        <router-link to="/member/accountmanager/0">{{memberInfo.nickName}}</router-link>
                        <span
                          class="cursor disin"
                          v-if=" memberInfo.nickName == '' "
                          @click="setNickName('personal')"
                        >未设置</span>
                      </p>
                      <router-link tag="span" :to="'/member/message/0'" class="msg">
                        站内信
                        <span>{{messageCount}}</span>
                      </router-link>

                      <div class="exit subLink" @click="_loginOut">
                        <!-- <img src="./images/loginOut.png" alt=""> -->
                        退出登录
                      </div>
                    </div>
                    <div>
                      <div v-if="memberInfo.mobile==''" class="disin mobilebind">
                        <router-link :to="'/member/mobilebind'" class="a_mobilebind">
                          <span>绑定手机领取8元彩金&nbsp;&nbsp;&nbsp;</span>点击绑定>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <p>游戏记录</p>
                  <div
                    class="subLink"
                    v-for="(item,index) in m_module_title.gameRecord"
                    :key="index"
                  >
                    <div>
                      <span @click="linkIndex(index,'gamerecord')">{{item}}</span>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <p>资金相关</p>
                  <div
                    class="subLink"
                    v-for="(item,index) in m_module_title.aboutMoney"
                    :key="index"
                  >
                    <div>
                      <span @click="linkIndex(index,'aboutMoney')">{{item}}</span>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <p>账户管理</p>
                  <div
                    class="subLink"
                    v-for="(item,index) in m_module_title.accountManager"
                    :key="index"
                  >
                    <div>
                      <span @click="linkIndex(index,'accountManager')">{{item}}</span>
                    </div>
                  </div>
                </div>
                <div class="item" v-if="memberInfo.isAgent == 1">
                  <p>代理中心</p>
                  <div class="subLink" v-for="(item,index) in m_module_title.agent" :key="index">
                    <div>
                      <span @click="linkIndex(index,'agent')">{{item}}</span>
                    </div>
                  </div>
                </div>
                <div class="item" v-if="memberInfo.isAgent == 1">
                  <p>营销管理</p>
                  <div
                    class="subLink"
                    v-for="(item,index) in m_module_title.marketing"
                    :key="index"
                  >
                    <div>
                      <span @click="linkIndex(index,'marketing')">{{item}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="nav-list pageWidth">
        <ul class="clearfix">
          <!-- <li class="nav">
					<div class="item select">
						<span v-show="curPath == '\/'">选择彩种</span>
						<img v-show="curPath != '\/'" class="ce" src="./images/welcome.png" alt="">
					</div>
          </li>-->
          <li class="nav" @click="selectClassed(0)">
            <router-link tag="div" to="/" class="item" v-bind:class="{ classred:0==current}">首页</router-link>
          </li>
          <li class="nav" @click="selectClassed(1)">
            <router-link
              tag="div"
              to="/gameList"
              class="item"
              v-bind:class="{ classred:1==current}"
            >彩票大厅</router-link>
            <div class="menuBox lotteryMenu">
              <div class="pageWidth clearfix">
                <div class="left">
                  <img src="./images/nav_lottery_icon.png" alt>
                  <div class="tc">
                    <span class="btn skewBtn">
                      <router-link tag="div" to="/openWinResult">开奖大厅</router-link>
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="btn skewBtn">
                      <router-link tag="div" to="/rule?type=1">玩法规则</router-link>
                    </span>
                  </div>
                </div>
                <div class="fr">
                  <ul>
                    <li tag="li" v-for="(item,index) in list_left" :key="index">
                      <div class="name">{{item.groupCodeName}}</div>
                      <div
                        v-for="(items,index) in item.list"
                        :key="index"
                        class="items btn"
                        @click="goLotteryPage(items.lotteryCode,items.type)"
                      >
                        <span>{{items.lotteryName}}</span>
                        <i :class="{'icon_hot': items.isHot != 0}"></i>
                      </div>
                    </li>
                  </ul>
                  <ul>
                    <li tag="li" v-for="(item,index) in list_right" :key="index">
                      <div class="name">{{item.groupCodeName}}</div>
                      <div
                        v-for="(items,index) in item.list"
                        :key="index"
                        class="items btn"
                        @click="goLotteryPage(items.lotteryCode,items.type)"
                      >
                        <span>{{items.lotteryName}}</span>
                        <i :class="{'icon_hot': items.isHot != 0}"></i>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li class="nav" @click="selectClassed(2)">
            <router-link
              tag="div"
              to="/live"
              class="item"
              v-bind:class="{ classred:2==current}"
            >真人视讯</router-link>
            <div class="menuBox liveMenu">
              <div class="pageWidth clearfix">
                <ul>
                  <li
                    :class="item.flatCode"
                    tag="li"
                    v-for="(item,index) in c_homeMenuList.live"
                    :key="index"
                  >
                    <div class="name">
                      <span class="icon"></span>
                      <span class="title">{{item.flatName}}</span>
                      <div class="btn skewBtn" @click="goGame(item.flatCode,item.gameCode)">开始游戏</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="nav" @click="selectClassed(3)">
            <router-link
              tag="div"
              to="/electronic"
              class="item"
              v-bind:class="{ classred:3==current}"
            >电子游戏</router-link>
            <div class="menuBox electronicMenu">
              <div class="pageWidth clearfix">
                <div class="name">
                  <img src="./images/nav_electronic_icon.png" alt>
                </div>
                <ul>
                  <li
                    :class="item.flatCode"
                    tag="li"
                    v-for="(item,index) in c_homeMenuList.electronic"
                    :key="index"
                  >
                    <div class="imgBox"></div>
                    <div class="title">{{item.flatName}}</div>
                    <div class="btn skewBtn" @click="goElectronic(item.flatCode,index)">
                      <div class="inner">
                        <p>开始游戏</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="nav" @click="selectClassed(4)">
            <router-link
              tag="div"
              to="/sport"
              class="item"
              v-bind:class="{ classred:4==current}"
            >体育赛事</router-link>
            <div class="menuBox sportMenu">
              <div class="pageWidth clearfix">
                <div class="name" style="height: 230px;overflow: hidden;">
                  <img src="./images/ele_2.png" alt>
                </div>
                <ul>
                  <li
                    :class="item.flatCode"
                    tag="li"
                    v-for="(item,index) in c_homeMenuList.sport"
                    :key="index"
                  >
                    <div class="imgBox"></div>
                    <div class="title">{{item.flatName}}</div>
                    <div class="btn skewBtn" @click="goGame(item.flatCode,item.gameCode)">
                      <div class="inner">
                        <p>开始游戏</p>
                        <span>ENTER THE GAME</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="nav" @click="selectClassed(5)">
            <router-link
              tag="div"
              to="/fish"
              class="item"
              v-bind:class="{ classred:5==current}"
            >捕鱼游戏</router-link>
            <div class="menuBox fishMenu">
              <div class="pageWidth clearfix">
                <div class="name">
                  <img src="./images/nav_fish_icon.png" alt>
                </div>
                <ul>
                  <li
                    :class="item.flatCode"
                    tag="li"
                    v-for="(item,index) in c_homeMenuList.fish"
                    :key="index"
                  >
                    <div class="imgBox"></div>
                    <div class="title">{{item.flatName}}</div>
                    <div class="btn skewBtn" @click="goGame(item.flatCode,item.gameCode)">
                      <div class="inner">
                        <p>开始游戏</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <!-- <li class="nav">
					<router-link tag="div" to="/openWinResult" class="item">开奖结果</router-link>
				</li>
	  			<li class="nav">
					<div @click="openNewTrend('cqssc')"  class="item">走势图</div>
          </li>-->
          <li class="nav" @click="selectClassed(6)">
            <router-link
              tag="div"
              to="/mobile"
              class="item"
              v-bind:class="{ classred:6==current}"
            >手机投注</router-link>
            <!-- <img class="hot hotAni" src="./images/hot.png" alt=""> -->
          </li>
          <li class="nav" @click="selectClassed(7)">
            <router-link
              tag="div"
              to="/active"
              class="item"
              v-bind:class="{ classred:7==current}"
            >优惠活动</router-link>
          </li>
          <li class="nav" @click="selectClassed(8)">
            <router-link
              tag="div"
              to="/spare"
              class="item"
              v-bind:class="{ classred:8==current}"
            >备用网址</router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="proups" v-if="slotActive != ''">
      <SlotCommon
        v-if="slotActive == 'personal'"
        :currentStyle="slotActive"
        @proupsClose="proupsClose"
      >
        <h1 slot="header">设置昵称</h1>
        <div class="main">
          <div class="item clearfix">
            <div class="left">昵称:</div>
            <div class="right">
              <input class="chromeInputClearAuto">
              <input type="text" placeholder="请填写昵称" v-model="newValue">
            </div>
          </div>
        </div>
        <p slot="footer" @click="submitInfo">提 交</p>
      </SlotCommon>
    </div>
  </div>
</template>

<script>
import logoImg from "common/images/logo.png";
import { mapActions, mapGetters, mapMutations } from "vuex";
import SlotCommon from "modules/member/components/slotCommon";
import { messageOption } from "modules/member/components/toolFunction";
import { m_modifyInfo } from "api/member/memberApi";
import { getLiveLink, gameLogin } from "api/common/commonApi";
import { ERR_OK } from "api/config";
import live_ag from "./images/live_ag.png";
import live_bbin from "./images/live_bbin.png";
import {
  estimateMoneyPsw,
  v_userName,
  v_password_every
} from "common/js/utils";

export default {
  name: "navBar",
  data() {
    return {
      logoImg: logoImg,
      lotteryCode: "cqssc",
      userName: "",
      password: "",
      vCode: "",
      current: 0,
      randomNum: "",
      curPath: "/",
      messageCount: 0,
      slotActive: "",
      newValue: "",
      liveLinkList: [
        {
          flatName: "AG视讯",
          flatCode: "ag",
          gameCode: 2,
          imgSrc: live_ag
        },
        {
          flatName: "BBIN视讯",
          flatCode: "bbin",
          gameCode: "live",
          imgSrc: live_bbin
        }
      ],

      list_left: [],
      list_right: [],

      request_loginGame: {
        userName: "",
        flat: "",
        gameCode: ""
      }
    };
  },
  created() {
    this.getSystemCode();
    this.homeMenuList();
    this.initData();
    let arr = [];
    if (this.l_allLotteryList_custom.length) {
      arr = this.l_allLotteryList_custom.reduce((init, item, index) => {
        index % 3 === 0 ? init.push([item]) : init[init.length - 1].push(item);
        return init;
      }, []);
      this.list_left = arr[0];
      this.list_right = arr[1];
    }
  },
  methods: {
    openNewTrend(code) {
      window.open("#/lotts/" + code + "/trend", "trend");
    },
    ...mapActions([
      "u_login",
      "l_lotteryChangVCodeImg",
      "u_logout",
      "homeMenuList",
      "getSystemCode",
      "re_m_messageCount",
      "m_memberInfo",
      "u_getUserBalance",
      "m_userBankList"
    ]),
    domblur() {
      this.$refs.userName.blur();
      this.$refs.password.blur();
      this.$refs.vCode.blur();
      this.$refs.loginBtn.blur();
      this.$refs.navBar.blur();
    },
    // 当tabs被点击，给当前的tab添加class，从而有背景色，其他的tabs去除此class
    selectClassed(index) {
      this.current = index;
    },
    goGame(flatCode, gameCode) {
      console.log(flatCode, gameCode);
      if (this.global_userName == "") {
        this.$message(messageOption("请登录!"));
        return;
      }
      this.request_loginGame.userName = this.global_userName;
      this.request_loginGame.flat = flatCode;
      this.request_loginGame.gameCode = gameCode;
      /*var newTab = window.open();
		var span = document.createElement("span");*/
      gameLogin(this.request_loginGame).then(res => {
        if (res.errorCode == ERR_OK) {
          window.open(res.datas);
          /*newTab.window.document.body.appendChild(span);
				newTab.location.href = res.datas;*/
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },
    goElectronic(flatCode, index) {
      this.$router.push({
        path: "/electronic",
        query: { curIndex: index, flatCode: flatCode }
      });
    },

    submitInfo() {
      let newObj = {};
      newObj.nickName = this.newValue.trim();
      newObj.qq = "";
      if (newObj.nickName.length > 10 || newObj.nickName.length < 1) {
        this.$message(messageOption("请输入正确的昵称(10个字符内)"));
        return;
      }
      m_modifyInfo(newObj).then(res => {
        if (res.errorCode == ERR_OK) {
          this.$message(messageOption("修改成功！"));
          this.slotActive = "";
          this.m_memberInfo();
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },
    setNickName(type) {
      this.slotActive = "personal";
    },
    proupsClose() {
      this.slotActive = "";
    },
    // 初始化数据
    initData() {
      if (this.global_userName == "") {
        return;
      } else {
        this.m_memberInfo();
        this.m_userBankList();
        this.u_getUserBalance(this.global_userName);
        this.getMessageCount(); //未读消息获取
      }
      this.curPath = this.$route.path;
      this.messageCount = this.m_messageCount;
    },

    // // 去彩票大厅
    // goLotteryPage(code) {
    //   if (!this.global_userName) {
    //     this.setLoginPopIsShow(true);
    //   } else {
    //     this.$router.push({ path: "/lotts/" + code + "/index/" });
    //   }
    // },
    // 去彩票大厅
    goLotteryPage(code) {
      this.$router.push({ path: "/lotts/" + code + "/index/" });
    },
    _loginOut() {
      this.u_logout();
      this.$router.push("/");
    },

    estimateBtn(type) {
      if (!estimateMoneyPsw()) {
        this.m_moneyPswStatus(type);
        return;
      }
      if (type == "charge") {
        this.$router.push("/member/charge");
      } else if (type == "withdraw") {
        if (
          this.mUserBankList == undefined ||
          this.mUserBankList.list.length == 0
        ) {
          this.$router.push({ path: "/member/accountmanager/" + 2 });
        } else {
          this.$router.push("/member/withdraw");
        }
      } else if (type == "exchange") {
        this.$router.push("/member/exchange");
      }
    },
    //   生成随机数
    getRandomNum() {
      this.l_lotteryChangVCodeImg();
    },
    getMessageCount() {
      clearInterval(this.timers);
      this.re_m_messageCount();
      this.timers = setInterval(() => {
        this.re_m_messageCount();
      }, 30000);
    },
    messageLink() {
      this.$router.push("/member/message");
    },
    linkIndex(index, type) {
      switch (type) {
        case "gamerecord":
          this.$router.push("/member/gamerecord/" + index);
          //this.m_gameRecord_changeIndex(index);
          break;
        case "aboutMoney":
          this.$router.push("/member/aboutmoney/" + index);
          // this.m_aboutMoney_changeIndex(index);
          break;
        case "accountManager":
          if (index == 1 || index == 2) {
            if (!estimateMoneyPsw()) {
              if (index == 1) {
                this.m_moneyPswStatus("password");
              } else {
                this.m_moneyPswStatus("bankCard");
              }
              return;
            }
            this.$router.push({ path: "/member/accountmanager/" + index });
          }
          this.$router.push({ path: "/member/accountmanager/" + index });
          break;
        case "agent":
          if (index == 4) {
            if (!estimateMoneyPsw()) {
              this.m_moneyPswStatus("transfer");
              return;
            }
            this.$router.push({ path: "/member/agent/" + index });
          }
          this.$router.push({ path: "/member/agent/" + index });
          break;
        case "marketing":
          this.$router.push("/member/marketing/" + index);
          break;
      }
    },
    refreshMomney() {
      this.u_getUserBalance(this.global_userName);
    },
    _login() {
      if (!this.userName) {
        this.domblur();
        this.$alert("用户名不能为空！", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      if (!this.password) {
        this.domblur();
        this.$alert("密码不能为空！", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      if (!this.vCode) {
        this.domblur();
        this.$alert("验证码不能为空！", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      if (!v_userName(this.userName)) {
        this.domblur();
        this.$alert("请输入4-16位数字/字母或组合的帐号", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      if (!v_password_every(this.password)) {
        this.domblur();
        this.$alert("请输入6-16位数字/字母或组合的密码", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      this.u_login({
        userName: this.userName,
        password: this.password,
        yzm: this.vCode
      });
      this.domblur();
      this.getRandomNum();
    },
    ...mapMutations({
      m_gameRecord_changeIndex: "m_gameRecord_changeIndex",
      m_agent_changeIndex: "m_agent_changeIndex",
      m_aboutMoney_changeIndex: "m_aboutMoney_changeIndex",
      m_accountManager_changeIndex: "m_accountManager_changeIndex",
      m_moneyPswStatus: "m_moneyPswStatus",
      setLoginPopIsShow: "U_SET_IS_SHOW_LOGIN_POP"
    })
  },
  watch: {
    $route(to, from) {
      if (!to.params.lottsCode) {
        to.params.lottsCode = "cqssc";
      }
      this.lotteryCode = to.params.lottsCode;
      this.curPath = this.$route.path;
    },
    m_messageCount: function() {
      this.messageCount = this.m_messageCount;
    },
    global_userName: function() {
      this.initData();
    },
    l_allLotteryList_custom: function() {
      let arr = [];
      if (this.l_allLotteryList_custom.length) {
        arr = this.l_allLotteryList_custom.reduce((init, item, index) => {
          index % 3 === 0
            ? init.push([item])
            : init[init.length - 1].push(item);
          return init;
        }, []);
        this.list_left = arr[0];
        this.list_right = arr[1];
      }
    }
  },
  computed: {
    ...mapGetters({
      l_allLotteryList: "l_allLotteryList",
      l_allLotteryList_custom: "l_allLotteryList_custom",
      global_userName: "global_userName",
      m_messageCount: "m_messageCount",
      l_lotteryVCodeImg: "l_lotteryVCodeImg",
      u_userBalance: "u_userBalance",
      m_module_title: "m_module_title",
      memberInfo: "m_memberInfo",
      u_setIsRefreshMoney: "u_setIsRefreshMoney",
      mUserBankList: "m_userBankList",
      l_lotteryWebSiteInfo: "l_lotteryWebSiteInfo",
      c_homeMenuList: "c_homeMenuList"
    })
  },
  components: {
    SlotCommon
  }
};
</script>

<style lang="sass" scoped>
@import "~common/sass/variable"
.btn.skewBtn
	position: relative
	width: 80px
  // background: red !important
	height: 24px
	line-height: 24px
	margin: 10px auto 0
	font-size: 13px
	text-align: center
	color: #fff
	&:after
		z-index: -1
		position: absolute
		top: 0
		left: 0
		display: block
		content: ''
		width: 100%
		height: 100%
		background: #E13434
		transform: skew(-30deg)
.nav-bar
	background-color: #F6F6F6
	.loginBox
		height: 96px
		line-height: 96px
		.wrapBox
			height: 100%
			width: 100%
			.logo
				display: inline-block
				width: 300px
				img
					vertical-align: middle
		.from
			width: 698px
			float: right
			line-height: 96px
			position: relative
			display: inline-block
			&>div
				display: inline-block
				margin-left: 20px
				position: relative
				.vCodeImg
					width: 58px 
					height: 29px
					position: absolute
					right: 0
					top: 0
					bottom: 0
					margin: auto 0
					border-top-right-radius: 4px
					border-bottom-right-radius: 4px
			.inputBox
				width: 120px
				display: inline-block
				input
					width: 100%
					height: 29px
					background-color: #fff
					//border-radius: 4px
					outline: 0
					box-sizing: border-box
					border: 1px solid #e5e5e5
					padding: 0 12px
			.btn
				
				width: 84px
				//border-radius: 4px
				text-align: center
				color: $color_text_white
				
			.btnstyle
				font-size: 14px
			.loginBtn,.regBtn
				width: 79px
				height: 28px
				line-height: 28px
				z-index: 2	
				position: relative
				outline: none
				&:after
					z-index: -1
					position: absolute
					top: 0
					left: 0
					display: block
					content: ''
					width: 100%
					height: 100%
					background: #E13434
					transform: skew(-30deg)
				a
					outline: none
			.forgetPwd
				width: 65px
				a
					color: #2b67cb
					outline: none
		.other
			display: inline-block
			float: right
			.userInfoBox
				font-size: 14px
				display: inline-block
				li
					margin: 0 15px
					display: inline-block
				.name
					position: relative
					height: 30px
					line-height: 30px
					padding: 0 10px
					margin-right: 0
					box-sizing: border-box
					background: #EB8326
					color: #fff
					.nameTxt
						cursor: pointer
						position: relative
						padding-right: 25px
						padding-left: 24px
						&>img
							position: absolute
							top: 5px
							left: 0
							width: 20px
						.userImg
							width: 20px
							height: 20px
							border-radius: 50%
							vertical-align: middle
							margin-left: -8px
							margin-top: -5px
						&:after
							display: block
							content: ''
							position: absolute
							width: 14px
							height: 15px
							right: 0px
							top: 7px
							background: url(./images/icon_downList.png)
							background-size: 100% 100%
					&:hover
						.nameTxt
							&:after
								transform: rotate(180deg)
						.subItem
							display: block
					.subItem
						display: none
						z-index: 5
						width: 460px
						position: absolute
						box-sizing: border-box
						top: 30px
						right: 0
						padding-bottom: 10px
						background-color: #fff
						font-size: 13px
						color: #111
						.item
							padding: 3px 15px
							.mobilebind
								position: relative
								//padding-left: 22px
								color: #fff
								/*&:before
									content: ""
									position: absolute
									top: 5px
									left: 0
									width: 20px
									height: 20px
									background:  url(./images/whiteicon.gif) no-repeat
									background-size: 100% 100%*/
								.a_mobilebind
									padding-left: 10px
									color: #fff
							&.head
								margin-bottom: 15px
								padding-top: 10px
								background: url(./images/header_member_bg.png) no-repeat
								background-size: 360px
								.userImg
									padding: 5px
									display: inline-block
									margin-right: 6px
									img
										width: 50px
										height: 50px
										border-radius: 50%
								.userInfos
									display: inline-block
							.msg
								position: relative
								width: 60px
								padding: 5px 10px
								height: 25px
								line-height: 25px
								color: #fff
								cursor: pointer
								span
									display: inline-block
									width: 16px
									height: 16px
									line-height: 16px
									margin-left: 10px
									border-radius: 10px
									text-align: center
									background: #fff
									color: $color_theme
						p
							position: relative
							display: inline-block
							width: 70px
							height: 22px
							line-height: 22px
							margin-right: 10px
							color: #fff
							text-align: center
							&:after
								z-index: -1
								position: absolute
								top: 0
								left: 0
								display: block
								content: ''
								width: 100%
								height: 100%
								background: $color_theme
								border-radius: 14px
								//transform: skew(-30deg)
							span
								color: #fff
							a
								color: #000
						.subLink
							display: inline-block
							margin-right: 12px
							span
								cursor: pointer
								&:hover
									color: $color_theme
				.money
					color: #D4302D
					img
						margin-top: -2px
						margin-left: 5px
						cursor: pointer
						transition: all 1.8s
						transform: rotate(0)
						vertical-align: middle
						&.ani
							transform: rotate(720deg)
				.exit
					cursor: pointer
					position: absolute
					right: 10px
					top: 30px
					width: 80px
					height: 24px
					line-height: 24px
					text-align: center
					color: #fff
					&:after
						z-index: -1
						position: absolute
						top: 0
						left: 0
						display: block
						content: ''
						width: 100%
						height: 100%
						background: #ff9c00
						transform: skew(-30deg)
					
			.btn
				width: 80px
				height: 28px
				border-radius: 28px
				background-color: #EB8326
				font-size: 14px 
				color: $color_text_white
				text-align: center
				line-height: 28px
				margin: 0 10px
				&:hover
					background-color: #c22b2a
			.recharge
				display: inline-block
				background-image: url('./images/recharge.png')
				background-repeat: no-repeat
				background-size: 16px
				padding-left: 15px
				background-position: 10px center
				box-sizing: border-box
			.putCash
				display: inline-block
				background-image: url('images/putCash.png')
				background-repeat: no-repeat
				background-size: 15px
				padding-left: 15px
				background-position: 10px center
				box-sizing: border-box
			.exchange
				display: inline-block
				background-image: url('images/exchange.png')
				background-repeat: no-repeat
				background-size: 15px
				padding-left: 15px
				background-position: 10px center
				box-sizing: border-box
	.box
		position: relative
		width: 100%
		
		margin-top: 1px
		background: #fff
		.nav-list
			
			&>ul
				li.nav
					height: 44px
					float: left
					.hot
						position: absolute
						right: 5px
						top: 5px
						&.hotAni
							animation: hotAni ease .5s both infinite
					.menuBox
						visibility: hidden
						position: absolute
						top: 44px
						left: 0
						width: 100%
						z-index: 7
						padding: 26px 0
						background-color: #fff
						border-top: 1px solid #ccc
						box-shadow: 0 4px 4px #6c6c6c
						img
							display: block
							width: 100%
					.lotteryMenu.menuBox
						.left
							float: left
							img
								width: 300px
							span
								display: inline-block
								width: 124px
								height: 36px
								line-height: 36px
								margin-top: 30px
								color: #fff
								text-align: center
								border-radius: 24px
								font-size: 14px
								&:after
									// background: #7D7D7D
							span:hover:after
								background: #E13434		
						.fr
							width: 730px
							ul
								float: left
								width: 50%
								padding-left: 40px
								box-sizing: border-box
								border-left: 1px solid #ccc
								li
									margin-bottom: 12px
									.items
										display: inline-block
										margin-top: 8px
										width: 33.33%
										line-height: 20px
										font-size: 13px
										color: #575757
										span,i
											float: left
										i
											display: none
										.icon_hot
											display: inline-block
											width: 20px
											height: 20px
											margin-left: 5px
											background: url(./images/icon_hot.png) no-repeat
											background-size: 100% 100%
							ul:last-child
								border-right: 1px solid #ccc

							.name
								position: relative
								z-index: 2
								width: 120px
								height: 26px
								line-height: 26px
								color: #fff
								text-align: center
								font-size: 14px
								&:after
									z-index: -1
									position: absolute
									top: 0
									left: 0
									display: block
									content: ''
									width: 100%
									height: 100%
									background: #E13434
									border-radius: 14px
									//transform: skew(-30deg)
					.liveMenu.menuBox
						
						padding: 10px 0 0 0
						li
							float: left
							width: 24.7%
							height: 160px
							padding-left: 160px
							padding-top: 30px
							text-align: center
							border-left: 1px solid #ccc
							box-sizing: border-box
							.icon
								display: block
								width: 80px
								height: 45px
								margin: 0 auto
							.title
								line-height: 32px
							.btn
								&:after
									// background: #7D7D7D
							.btn:hover 
									&:after
										background: #E13434
						li.ag
							background: url(./images/nav_live_icon_ag.png) no-repeat
							background-size: 154px
							background-position: left bottom
							.icon
								background: url(./images/ag_icon.png) no-repeat
								background-size: 100% 100%
						li.bbin
							background: url(./images/nav_live_icon_bbin.png) no-repeat
							background-size: 154px
							background-position: left bottom
							.icon
								background: url(./images/bbin_icon.png) no-repeat
								background-size: 100% 100%
						li.sun
							background: url(./images/nav_live_icon_sun.png) no-repeat
							background-size: 154px
							background-position: left bottom
							.icon
								background: url(./images/sun_icon.png) no-repeat
								background-size: 100% 100%
						li.ds
							background: url(./images/nav_live_icon_ds.png) no-repeat
							background-size: 154px
							background-position: left bottom
							.icon
								background: url(./images/ds_icon.png) no-repeat
								background-size: 100% 100%
					.electronicMenu.menuBox
						padding: 0
						.name
							float: left
							width: 300px
						ul
							display: inline-block
							float: right
							li
								float: left
								width: 180px
								margin-top: 20px
								text-align: center
								.imgBox
									width: 121px
									height: 121px
									margin: 0 auto
								.title
									line-height: 30px
								.btn
									width: 100px
									height: 30px
									line-height: 30px
									&:after
										// background: #7D7D7D
									.inner
										display: inline-block
										padding-right: 20px
										background: url(./images/direction_arrow.png) no-repeat
										background-position: right 9px
										background-size: 14px 14px
										span
											font-size: 9px
								.btn:hover 
									&:after
										background: #E13434
							li.ag
								.imgBox
									background: url(./images/nav_electronic_ag.png) no-repeat
									background-size: 100% 100%
							li.bbin
								.imgBox
									background: url(./images/nav_electronic_bbin.png) no-repeat
									background-size: 100% 100%
							li.pt
								.imgBox
									background: url(./images/nav_electronic_pt.png) no-repeat
									background-size: 100% 100%
							li.mg
								.imgBox
									background: url(./images/nav_electronic_mg.png) no-repeat
									background-size: 100% 100%
					.sportMenu.menuBox
						
						padding: 0
						.name
							float: left
							width: 600px
						ul
							display: inline-block
							float: right
							margin-right: 150px
							li
								width: 200px
								margin-top: 20px
								text-align: center
								.imgBox
									width: 100%
									height: 88px
								.title
									line-height: 44px
									font-size: 24px
								.btn
									width: 200px
									height: 38px
									line-height: 38px
									&:after
										// background: #7D7D7D
									.inner
										display: inline-block
										padding-left: 28px
										margin-top: 5px
										line-height: 14px
										text-align: left
										background: url(./images/direction_arrow.png) no-repeat
										background-position: left center
										background-size: 22px 22px
										span
											font-size: 9px
								.btn:hover 
									&:after
										background: #E13434
							li.sb
								.imgBox
									background: url(./images/sb_icon.png) no-repeat
									background-size: 100% 100%
					.fishMenu.menuBox
						padding: 0
						.name
							float: left
							width: 300px
						ul
							float: right
							margin-right: 80px
							li
								float: left
								width: 160px
								margin-top: 20px
								text-align: center
								.imgBox
									width: 111px
									height: 111px
									margin: 0 auto
								.title
									line-height: 30px
								.btn
									width: 100px
									height: 30px
									line-height: 30px
									&:after
										// background: #7D7D7D
									.inner
										display: inline-block
										padding-right: 20px
										background: url(./images/direction_arrow.png) no-repeat
										background-position: right 9px
										background-size: 14px 14px
										span
											font-size: 9px
								.btn:hover 
									&:after
										background: #E13434
	
							li.ag
								.imgBox
									background: url(./images/nav_fish_ag.png) no-repeat
									background-size: 100% 100%
							li.bbin_daren
								.imgBox
									background: url(./images/nav_fish_daren.png) no-repeat
									background-size: 100% 100%
							li.bbin_master
								.imgBox
									background: url(./images/nav_fish_master.png) no-repeat
									background-size: 100% 100%
							li.pt
								.imgBox
									background: url(./images/nav_fish_pt.png) no-repeat
									background-size: 100% 100%
					&:hover
						.menuBox
							visibility: visible
						.item
							color: #fff
							&:after
								background: #E13434
					.item
						position: relative
						z-index: 2
						box-sizing: border-box
						text-align: center
						color: #787878
						line-height: 44px
						cursor: pointer
						width: 120px
						height: 44px
						font-size: $fs14
						&:after
							z-index: -1
							position: absolute
							top: 0
							left: 0
							display: block
							content: ''
							width: 100%
							height: 100%
							background: #fff
							transform: skew(-30deg)
						&.select
							width: 230px
							position: relative
							height: 44px
							background-color: #eb4342
					.classred
						color: #fff
						&:after
							background: #E13434


@keyframes hotAni
	50%
		transform: translate3d(0,-3px,0)
						

</style>
