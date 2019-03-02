<template>
  <div class="slideNav">
    <div class="items">
      <div class="inner">
        <div class="title gameRecord" @click="titleSwitch('GameRecord')">
          <span>游戏记录</span>
          <i class="arrow el-icon-arrow-right" :class="{arrowDown: showList == 'GameRecord'}"></i>
        </div>
        <div class="item" v-show="showList == 'GameRecord'">
          <ul>
            <li
              :class="{active: pageIndex == index && currentZone == 'GameRecord'}"
              v-for="(item,index) in m_module_title.gameRecord"
              :key="index"
              @click="linkIndex(index,'GameRecord')"
            >{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="inner">
        <div class="title aboutMoney" @click="titleSwitch('AboutMoney')">
          <span>资金相关</span>
          <i class="arrow el-icon-arrow-right" :class="{arrowDown: showList == 'AboutMoney'}"></i>
        </div>
        <div class="item" v-show="showList == 'AboutMoney'">
          <ul>
            <li
              :class="{active: pageIndex == index && currentZone == 'AboutMoney'}"
              v-for="(item,index) in m_module_title.aboutMoney"
              :key="index"
              @click="linkIndex(index,'AboutMoney')"
            >{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="inner">
        <div class="title accountManager" @click="titleSwitch('AccountManager')">
          <span>账户管理</span>
          <i class="arrow el-icon-arrow-right" :class="{arrowDown: showList == 'AccountManager'}"></i>
        </div>
        <div class="item" v-show="showList == 'AccountManager'">
          <ul>
            <li
              :class="{active: pageIndex == index && currentZone == 'AccountManager'}"
              v-for="(item,index) in m_module_title.accountManager"
              :key="index"
              @click="linkIndex(index,'AccountManager')"
            >{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="inner" v-if="memberInfo.isAgent == 1">
        <div class="title agent" @click="titleSwitch('Agent')">
          <span>代理中心</span>
          <i class="arrow el-icon-arrow-right" :class="{arrowDown: showList == 'Agent'}"></i>
        </div>
        <div class="item" v-show="showList == 'Agent'">
          <ul>
            <li
              :class="{active: pageIndex == index && currentZone == 'Agent'}"
              v-for="(item,index) in m_module_title.agent"
              :key="index"
              @click="linkIndex(index,'Agent')"
            >{{item}}</li>
          </ul>
        </div>
      </div>
      <!-- <div class="inner">
				<div class="title message" @click="titleSwitch('Message')"><span>站内信</span><i class="arrow el-icon-arrow-right" :class="{arrowDown: showList == 'Message'}"></i></div>
				<div class="item" v-show="showList == 'Message'">
					<ul>
						<li :class="{active: pageIndex == index && currentZone == 'Message'}" v-for="(item,index) in m_module_title.message" :key="index" @click="linkIndex(index,'Message')">{{item}}</li>
					</ul>
				</div>
      </div>-->
      <div class="inner" v-if="memberInfo.isAgent == 1">
        <div class="title marketing" @click="titleSwitch('Marketing')">
          <span>营销管理</span>
          <i class="arrow el-icon-arrow-right" :class="{arrowDown: showList == 'Marketing'}"></i>
        </div>
        <div class="item" v-show="showList == 'Marketing'">
          <ul>
            <li
              :class="{active: pageIndex == index && currentZone == 'Marketing'}"
              v-for="(item,index) in m_module_title.marketing"
              :key="index"
              @click="linkIndex(index,'Marketing')"
            >{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "./components/headerNav";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import { estimateMoneyPsw } from "common/js/utils";
import { ERR_OK } from "api/config";

export default {
  name: "slideNav",
  data() {
    return {
      pageIndex: 0,
      showList: "",
      currentZone: ""
    };
  },
  created() {
    this.currentZone = this.$route.name;
    this.showList = this.$route.name;
    this.pageIndex = this.$route.params.pageIndex * 1;
    console.log(this.memberInfo.agentDesc);
  },
  methods: {
    titleSwitch(title) {
      this.showList = title;
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
      }
    },
    linkIndex(index, type) {
      console.log(index, type);
      switch (type) {
        case "GameRecord":
          this.$router.push("/member/gamerecord/" + index);
          break;
        case "Message":
          this.$router.push("/member/Message/" + index);
          break;
        case "AboutMoney":
          this.$router.push("/member/aboutmoney/" + index);
          break;
        case "AccountManager":
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
        case "Agent":
          if (index == 4) {
            if (!estimateMoneyPsw()) {
              this.m_moneyPswStatus("transfer");
              return;
            }
            this.$router.push({ path: "/member/agent/" + index });
          }
          this.$router.push({ path: "/member/agent/" + index });
          break;
        case "Marketing":
          this.$router.push("/member/marketing/" + index);
          break;
      }
    }
  },
  watch: {
    $route: function() {
      console.log(this.$route);
      this.showList = this.$route.name;
      this.pageIndex = this.$route.params.pageIndex * 1;
      this.currentZone = this.$route.name;
    }
  },
  computed: {
    ...mapGetters({
      m_module_title: "m_module_title",
      m_gameRecord_changeIndex: "m_gameRecord_changeIndex",
      m_agent_changeIndex: "m_agent_changeIndex",
      m_aboutMoney_changeIndex: "m_aboutMoney_changeIndex",
      m_accountManager_changeIndex: "m_accountManager_changeIndex",
      m_moneyPswStatus: "m_moneyPswStatus",
      mUserBankList: "m_userBankList",
      memberInfo: "m_memberInfo"
    })
  }
};
</script>
<style lang="sass" scoped>
@import '~common/sass/variable'
.slideNav
	position: absolute
	top: 0
	left: -158px
	width: 157px
	height: 100%
	background: #eee
	cursor: pointer
	.title
		position: relative
		width: 100%
		height: 40px
		line-height: 40px
		padding: 0 0 0 20px
		box-sizing: border-box
		background: #eb4342
		font-size: 14px
		color: #fff
		border-bottom: 1px solid #ccc
		&:before
			//content: ""
			position: absolute
			top: 12px
			left: 27px
			width: 14px
			height: 12px
			background: url(./icon_slideNav.png) no-repeat
			background-size: 100% 100%
		.arrow
			position: absolute
			top: 12px
			right: 10px
			&.arrowDown
				transform: rotate(90deg)

	.item
		ul
			list-style-type: disc
			list-style-position: inside
		li
			height: 36px
			line-height: 36px
			padding-left: 20px
			font-size: 13px
			background: #fff
			color: #8A8A8A
			&.active
				color: #f33a55
			&:hover
				color: #f33a55
</style>


