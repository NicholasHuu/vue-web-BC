<template>
  <div class="profile">
    <HeaderNav :data="listlist"></HeaderNav>
    <div class="inner">
      <div class="items">
        <h1>会员信息</h1>
        <div class="content">
          <div class="wrapper clearfix">
            <div class="item">
              <p>
                用户名：
                <span>{{info.userName}}</span>
              </p>
            </div>
            <div class="item">
              <p>
                姓名：
                <span v-if="info.userRealName != ''">{{info.userRealName}}</span>
                <span v-else class="setColor btn" @click="setRealName">设置</span>
              </p>
            </div>
            <div class="item">
              <p>
                账户余额：
                <span>{{info.userMoney}}</span>
              </p>
            </div>
          </div>
          <div class="wrapper clearfix">
            <div class="item">
              <p>
                昵称：
                <span v-if="info.nickName != ''">{{info.nickName}}</span>
                <span v-else class="setColor btn" @click="setInfo('nickName','personal')">设置</span>
              </p>
            </div>
            <div class="item">
              <p>
                QQ号码：
                <span v-if="info.qq != ''">{{info.qq}}</span>
                <span v-else class="setColor btn" @click="setInfo('qq','personal')">设置</span>
              </p>
            </div>
            <div class="item">
              <p>
                手机号：
                <span v-if="info.mobile != ''">{{info.mobile}}</span>
                <span v-else class="setColor btn" @click="bindMobile">绑定手机号</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="items">
        <h1>返点信息</h1>
        <div class="content">
          <div class="wrapper clearfix">
            <div class="item">
              <p>
                彩票返点：
                <span>{{info.backWater.lottery}}%</span>
              </p>
            </div>
            <div class="item">
              <p>
                真人返点：
                <span>{{info.backWater.live}}%</span>
              </p>
            </div>
            <div class="item">
              <p>
                电子返点：
                <span>{{info.backWater.electronic}}%</span>
              </p>
            </div>
          </div>
          <div class="wrapper clearfix">
            <div class="item">
              <p>
                体育返点：
                <span>{{info.backWater.sport}}%</span>
              </p>
            </div>
            <div class="item">
              <p>
                捕鱼返点：
                <span>{{info.backWater.fish}}%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="items">
        <h1>安全信息</h1>
        <div class="content">
          <div class="item">
            <p>
              上次登录时间：&nbsp;&nbsp;&nbsp;&nbsp;
              <span class="colorStyle">{{info.lastLoginTime}}</span>
            </p>
          </div>
          <div class="item">
            <p>
              上次登录IP：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span
                class="colorStyle"
              >{{info.lastLoginIp}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="proups" v-if="slotActive != ''">
      <SlotCommon
        v-if="slotActive == 'personal'"
        :currentStyle="slotActive"
        @proupsClose="proupsClose"
      >
        <h1 slot="header">{{title}}</h1>
        <div class="main">
          <div class="item clearfix">
            <div class="left">{{text}}:</div>
            <div class="right">
              <input class="chromeInputClearAuto">
              <input type="text" :placeholder="placeholderText" v-model="newValue">
            </div>
          </div>
        </div>
        <p slot="footer" @click="submitInfo">提 交</p>
      </SlotCommon>
    </div>
  </div>
</template>

<script>
import HeaderNav from "../headerNav";
import { mapGetter, mapState, mapActions } from "vuex";
import { m_info, m_modifyInfo } from "api/member/memberApi";
import { mapGetters, mapMutations } from "vuex";
import { ERR_OK } from "api/config";
import { messageOption } from "../toolFunction";
import SlotCommon from "../slotCommon";
export default {
  name: "profile",
  data() {
    return {
      listlist: ["个人资料"],
      info: {},

      newValue: "",

      slotActive: "",

      title: "",
      text: "",
      placeholderText: "",

      curType: ""
    };
  },
  created() {
    this.m_memberInfo();
    this.info = this.memberInfo;
  },
  methods: {
    proupsClose() {
      this.slotActive = "";
    },
    setRealName() {
      this.u_setMoneyPwStatus(true);
    },
    setInfo(style, type) {
      this.newValue = "";
      this.slotActive = type;
      this.curType = style;
      if (style == "qq") {
        this.title = "设置QQ号码";
        this.text = "QQ号";
        this.placeholderText = "请输入QQ号码";
      } else {
        this.title = "设置昵称";
        this.text = "昵称";
        this.placeholderText = "请输入昵称";
      }
    },
    bindMobile() {
      this.$router.push("/member/mobilebind");
    },
    submitInfo() {
      let newObj = {};
      newObj.nickName = "";
      newObj.qq = "";
      if (this.curType == "nickName") {
        newObj.nickName = this.newValue;
        if (newObj.nickName.length > 10 || newObj.nickName.length < 1) {
          this.$message(messageOption("请输入正确的昵称(10个字符内)"));
          return;
        }
        newObj.nickName = newObj.nickName.trim();
      } else {
        newObj.qq = this.newValue;
        if (!/^\d{5,12}$/.test(newObj.qq)) {
          this.$message(messageOption("请输入正确的qq号码"));
          return;
        }
        newObj.qq = newObj.qq.trim();
      }
      this.modify(newObj);
    },
    modify(obj) {
      m_modifyInfo(obj).then(res => {
        this.$message(messageOption(res.msg));
        if (res.errorCode == ERR_OK) {
          this.slotActive = "";
          this.m_memberInfo();
        }
      });
    },
    ...mapMutations({
      memberInfo_nickName: "m_memberInfo_nickName",
      u_setMoneyPwStatus: "u_setMoneyPwStatus"
    }),

    ...mapActions(["m_memberInfo"])
  },
  computed: {
    ...mapGetters({
      memberInfo: "m_memberInfo"
    }),
    ...mapState({
      nickNameState: state => state.member.m_memberInfo.nickName,
      qqState: state => state.member.m_memberInfo.qq,
      mailState: state => state.member.m_memberInfo.mail
    })
  },
  watch: {
    /*"info.mobile": function(newValue, oldValue) {
			this.info.mobile = newValue.length > oldValue.length ? newValue.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : this.info.mobile.trim();
		}*/
    memberInfo: function() {
      this.info = this.memberInfo;
    },
    $route(to, from) {}
  },
  components: {
    SlotCommon,
    HeaderNav
  }
};
</script>

<style lang="sass" scoped>
@import '~common/sass/variable'
.profile
	height: 540px
	// padding: 30px
	.inner
		padding: 60px 0
		.items
			width: 640px
			margin: 0 auto 30px
			h1
				height: 24px
				line-height: 24px
				padding-left: 14px
				font-weight: 600
				color: #000
				background: #E6E6E6
				font-size: 14px
			.content
				padding: 20px 20px 6px
				background: #FAFAFA
				.wrapper
					.item
						float: left
						width: 33.333%
						text-align: left
						.setColor
							color: #ff7701
							cursor: pointer
							text-decoration: underline
				.item
					margin-bottom: 14px
					p
						font-size: 13px
						color: #8e8d8c
					.colorStyle
						color: #333

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
    -webkit-appearance: none;
input[type="number"]
    -moz-appearance: textfield;
</style>


