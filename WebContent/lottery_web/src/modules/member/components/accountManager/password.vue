<template>
  <div class="password clearfix">
    <HeaderNav :data="listlist"></HeaderNav>
    <div class="password-nav">
      <ul>
        <li :class="{active: index == 0}" @click="switchPage(0)">修改登录密码</li>
        <li :class="{active: index == 1}" @click="switchPage(1)">修改资金密码</li>
      </ul>
    </div>
    <div class="password-content">
      <div class="item" v-show="index == 0">
        <ul>
          <li>
            <span>旧密码:</span>
            <input class="chromeInputClearAuto">
            <input type="password" v-model.trim="password.oldPwd" placeholder="请输入旧密码">
          </li>
          <li>
            <span>新密码:</span>
            <input type="password" v-model.trim="password.newPwd" placeholder="请输入6-16位英文字母以及数字组合">
          </li>
          <li>
            <span>确认新密码:</span>
            <input type="password" v-model.trim="password.againPwd" placeholder="请输入确认新密码">
          </li>
          <li>
            <span></span>
            <p class="disin btn-search btn-moditfy" @click="modifyPassword('login')">确认修改</p>
          </li>
        </ul>
      </div>

      <div class="item" v-show="index == 1">
        <ul>
          <li>
            <span>旧密码:</span>
            <input class="chromeInputClearAuto">
            <input type="password" v-model.trim="password.oldPwd" placeholder="请输入旧密码">
          </li>
          <li>
            <span>新密码:</span>
            <input type="password" v-model.trim="password.newPwd" placeholder="请输入4位数字密码">
          </li>
          <li>
            <span>确认新密码:</span>
            <input type="password" v-model.trim="password.againPwd" placeholder="请输入确认新密码">
          </li>
          <li>
            <span></span>
            <p class="disin btn-search btn-moditfy" @click="modifyPassword('money')">确认修改</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "../headerNav";
import { mapGetters, mapState, mapActions } from "vuex";
import { m_modifyLoginPwd, m_modifyMoneyPwd } from "api/member/memberApi";
import { ERR_OK } from "api/config";
import { messageOption, passwordPwd, withdrawalPwd } from "../toolFunction";
import { estimateMoneyPsw } from "common/js/utils";
export default {
  name: "password",
  data() {
    return {
      listlist: ["密码管理"],
      index: 0,
      password: {
        oldPwd: "",
        newPwd: "",
        againPwd: "",
        userName: ""
      },
      isRun: true
    };
  },
  created() {
    this.password.userName = this.global_userName;
  },
  methods: {
    switchPage(index) {
      this.index = index;
      this.clearInput();
    },
    modifyPassword(type) {
      if (type == "login") {
        if (!this.password.oldPwd) {
          this.$message(messageOption("请输入6-16位数字/字母或组合的旧密码"));
          this.clearInput();
          return;
        }
        if (!this.password.newPwd) {
          this.$message(messageOption("请输入6-16位数字/字母或组合的新密码"));
          this.clearInput();
          return;
        }
        if (!this.password.againPwd) {
          this.$message(
            messageOption("请输入6-16位数字/字母或组合的确认新密码")
          );
          this.clearInput();
          return;
        }
        if (!passwordPwd(this.password.newPwd)) {
          this.$message(
            messageOption("新账户密码格式不正确，请输入正确的格式")
          );
          this.clearInput();
          return;
        }
        if (this.password.oldPwd == this.password.newPwd) {
          this.$message(messageOption("旧密码与新密码不能一致"));
          this.clearInput();
          return;
        }
        if (this.password.newPwd != this.password.againPwd) {
          this.$message(messageOption("新密码与确认新密码不一致"));
          this.clearInput();
          return;
        }
        m_modifyLoginPwd(this.password).then(res => {
          this.$message(messageOption(res.msg));
          this.clearInput();
        });
      } else {
        if (!withdrawalPwd(this.password.oldPwd)) {
          this.$message(messageOption("请输入正确的4位旧密码"));
          this.clearInput();
          return;
        }
        if (!withdrawalPwd(this.password.newPwd)) {
          this.$message(messageOption("请输入正确的4位新密码"));
          this.clearInput();
          return;
        }
        if (!withdrawalPwd(this.password.againPwd)) {
          this.$message(messageOption("请输入正确的确认新密码"));
          this.clearInput();
          return;
        }
        if (this.password.oldPwd == this.password.newPwd) {
          this.$message(messageOption("旧密码与新密码不能一致"));
          this.clearInput();
          return;
        }
        if (this.password.newPwd != this.password.againPwd) {
          this.$message(messageOption("新密码与确认新密码不一致"));
          this.clearInput();
          return;
        }
        m_modifyMoneyPwd(this.password).then(res => {
          this.$message(messageOption(res.msg));
          this.clearInput();
        });
      }
    },
    clearInput() {
      this.password.oldPwd = "";
      this.password.newPwd = "";
      this.password.againPwd = "";
    }
  },
  computed: {
    ...mapGetters({
      global_userName: "global_userName"
    })
  },
  watch: {
    $route: function(to, from) {}
  },
  components: {
    HeaderNav
  }
};
</script>

<style lang="sass" scoped>
@import '~common/sass/variable'
.password
	position: relative
	// padding: 30px
	height: 440px
.password-nav
	position: absolute
	width: 178px
	ul
		position: absolute
		top: 0
		left: 0
		width: 100%
		li
			height: 35px
			line-height: 35px
			padding-left: 12px
			text-align: left
			border: 1px solid #ccc
			font-size: 14px
			cursor: pointer
			user-select: none
			border-right: 0
			&:first-child
				border-bottom: 0
		.active
			position: relative
			color: #f12
			border-right: 0
			background: #efefef
			box-sizing: border-box
			&:after
				content: ""
				display: block
				position: absolute
				top: -1px
				left: -1px
				width: 4px
				height: 35px
				background: #f12
.password-content
	float: left
	width: 858px
	// height: 100%
	margin-left: 177px
	border: 1px solid #ccc
	box-sizing: border-box
	.item
		height: 100%
		padding: 50px 0 0 130px
		background: #efefef
		box-sizing: border-box
		ul
			li
				margin-bottom: 20px
				font-size: 14px
				span
					display: inline-block
					width: 160px
					padding-right: 10px
					text-align: right
				input
					width: 220px
					height: 30px
					line-height: 30px
					padding-left: 8px
					border: 1px solid #ccc
					border-radius: 4px
.btn-moditfy
	display: inline-block
	width: 140px

</style>


