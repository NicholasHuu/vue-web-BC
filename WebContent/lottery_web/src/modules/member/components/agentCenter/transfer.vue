<template>
  <div class="register-lower">
    <HeaderNav :data="listlist"></HeaderNav>
    <div class="top-content">
      <div class="left">
        <ul>
          <li>
            <p>用户名:&nbsp;&nbsp;</p>
            <input class="chromeInputClearAuto">
            <input
              class="user-name"
              tabindex="1"
              type="text"
              v-model.trim="transferList.account"
              placeholder="请输入对方的账号"
            >
          </li>
          <li>
            <p>金额:&nbsp;&nbsp;</p>
            <input
              class="user-name"
              tabindex="2"
              type="number"
              v-model.trim="transferList.money"
              placeholder="请输入转账金额"
            >
          </li>
          <li>
            <p>密码:&nbsp;&nbsp;</p>
            <input class="chromeInputClearAuto" type="password">
            <input
              class="user-name"
              tabindex="3"
              type="password"
              autocomplete="off"
              v-model.trim="transferList.zjPassword"
              placeholder="请输入资金密码"
            >
          </li>
          <li>
            <p style="padding-top: 4px; vertical-align: top;">备注:&nbsp;&nbsp;</p>
            <textarea
              class="user-name remark"
              tabindex="4"
              type="text"
              v-model="transferList.remark"
              placeholder="请输入备注(选填)"
            ></textarea>
          </li>
          <li>
            <p></p>
            <div class="btn-search" @click="submitTransfer(transferList)">提 交</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderNav from "../headerNav";
import { ERR_OK } from "api/config";
import { m_transferAgent } from "api/member/memberApi";
import { messageOption } from "../toolFunction";
import { estimateMoneyPsw } from "common/js/utils";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "transfer",
  data() {
    return {
      listlist: ["下级转账"],
      transferList: {
        money: "",
        account: "",
        zjPassword: "",
        remark: ""
      }
    };
  },
  created() {
    this.transferList.account = this.m_transfer_userName_forLink
      ? this.m_transfer_userName_forLink
      : "";
  },
  methods: {
    submitTransfer(obj) {
      if (!/^[A-Za-z0-9]{4,16}$/.test(obj.account)) {
        this.$message(messageOption("请输入4-16位数字/字母或组合的帐号"));
        return;
      }
      if (obj.money <= 0) {
        this.$message(messageOption("请输入正确的金额！"));
        return;
      }
      if (!/^\d{4}$/.test(obj.zjPassword)) {
        this.$message(messageOption("请输入的正确的资金密码！"));
        return;
      }
      obj.remark = obj.remark.substr(0, 50);
      m_transferAgent(obj).then(res => {
        this.$message(messageOption(res.msg));
        if (res.errorCode == ERR_OK) {
          this.u_getUserBalance();
          this.clearInput();
        }
      });
    },
    clearInput() {
      this.transferList.money = "";
      this.transferList.account = "";
      this.transferList.zjPassword = "";
      this.transferList.remark = "";
    },
    ...mapActions(["u_getUserBalance"])
  },
  computed: {
    ...mapGetters({
      m_transfer_userName_forLink: "m_transfer_userName_forLink"
    })
  },
  components: {
    HeaderNav
  }
};
</script>

<style lang="sass" scoped>
.register-lower
	// padding: 20px
	background: #fff
	.top-content
		position: relative
		width: 100%
		padding: 30px 50px
		margin: 0 auto
		background: #E3E0E7
		box-sizing: border-box
		.left
			display: inline-block
			margin-left: 50px
		li
			margin-bottom: 20px
			p
				display: inline-block
				width: 100px
				margin-right: 10px
				text-align: right
				font-size: 14px
			input
				width: 180px
				height: 26px
				line-height: 26px
				padding-left: 6px
				margin-right: 10px
				border: 1px solid #ccc
				border-radius: 4px
			.remark
				width: 290px
				height: 70px
				line-height: 20px
				resize: none
				font-family: "微软雅黑"
				font-size: 13px
				color: #000
			span
				display: inline-block
				font-size: 14px
			.btn-search
				display: inline-block
			.el-select
				width: 190px
		&:before,&:after
			content: ''
			position: absolute
			top: 0
			left: -4px
			width: 5px
			height: 100%
			background: url(./addUser-l.png) repeat-y;
		&:after
			left: unset
			right: -5px
			background: url(./addUser-r.png) repeat-y;
		
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button
  -webkit-appearance: none
input[type="number"]
  -moz-appearance: textfield
</style>


