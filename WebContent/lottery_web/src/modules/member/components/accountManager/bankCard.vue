<template>
  <div class="bank-card">
    <HeaderNav :data="listlist"></HeaderNav>
    <div class="one-page" v-show="pageStatus">
      <div class="content">
        <div class="status_no" v-show="!bankList.length">
          没有绑定银行卡，请点击&nbsp;&nbsp;
          <span class="btn" @click="estimateBtn">添加</span>
        </div>
        <div class="status_yes" v-show="bankList.length">
          <div class="table">
            <table>
              <thead>
                <tr>
                  <td>开户名</td>
                  <td>开户行</td>
                  <td>卡号</td>
                  <td>开户行地址</td>
                  <!-- <td>状态</td> -->
                  <td>操作</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in bankList" :key="index">
                  <td>{{item.userRealName}}</td>
                  <td>{{item.bankCnName}}</td>
                  <td>{{item.bankCard}}</td>
                  <td>{{item.bankAddress}}</td>
                  <!-- <td>{{item.minMaxDes}}</td> -->
                  <td class="operation">
                    <span @click="removeBank(item.id,'removeBank')">解绑</span>&nbsp;&nbsp;
                    <span @click="updateBank(item,0)">修改</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="btn-search btn_addBank" v-show="addStatus" @click="estimateBtn(1)">添 加</div>
        </div>
      </div>
      <div class="info">
        <p>
          <span>1.一个账户最多只能绑定</span>
          <span class="red-color">5</span>
          <span>张银行</span>
        </p>
        <!-- <p><span>2.</span> <span class="red-color">银行卡锁定</span> <span>可以增强账户安全，推荐锁定（如：账户被他人盗用后，由于锁定的限制，您账户的资金不会被他人提款）；</span></p>
        <p><span>3. 银行卡锁定后，</span> <span class="red-color">不能增加新银行卡绑定，自身不能解绑和解锁银行卡，需联系客服申请解锁。</span></p>-->
      </div>
    </div>

    <div class="two-page" v-show="!pageStatus">
      <h3>{{text}}</h3>
      <div class="form">
        <ul>
          <li>
            <span>开户姓名:</span>
            <div class="disin">
              <input type="text" v-model="memberInfo.userRealName" :disabled="true">
            </div>
          </li>
          <li>
            <span>收款银行:</span>
            <div class="disin">
              <Select
                style="width: 208px;"
                v-model="defaultBank"
                @change="addBankList.bankType = defaultBank;"
                placeholder="请选择"
              >
                <Option
                  v-for="item in allBankList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></Option>
              </Select>
            </div>
          </li>
          <li>
            <span>银行卡号:</span>
            <div class="disin">
              <input type="number" v-model.trim="addBankList.bankCard" placeholder="请输入银行卡号">
            </div>
          </li>
          <li>
            <span>开户地址:</span>
            <div class="disin">
              <input type="text" v-model.trim="addBankList.bankAddress" placeholder="请输入开户行地址">
            </div>
          </li>
          <li>
            <span>资金密码:</span>
            <div class="disin">
              <input type="password" v-model.trim="addBankList.withdrawPwd" placeholder="请输入资金密码">
            </div>
          </li>
          <li>
            <span></span>
            <div class="disin btn-search" @click="addBankBind">确 定</div>
            <div class="disin btn-search btn-search-back" @click="pageStatus = !pageStatus;">返 回</div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 几个弹窗组合具名插槽组 -->
    <div class="proups" v-if="slotActive != ''">
      <SlotCommon
        v-if="slotActive == 'removeBank'"
        :currentStyle="slotActive"
        @proupsClose="proupsClose"
      >
        <h1 slot="header">解绑银行卡</h1>
        <div class="main">
          <div class="item clearfix">
            <div class="left">资金密码:</div>
            <div class="right">
              <input class="chromeInputClearAuto">
              <input type="password" v-model="withdrawPwd" placeholder="请输入资金密码">
            </div>
          </div>
        </div>
        <p slot="footer" @click="removeBankSubmit">提 交</p>
      </SlotCommon>
    </div>
  </div>
</template>

<script>
import HeaderNav from "../headerNav";
import { Select, Option } from "element-ui";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { ERR_OK } from "api/config";
import {
  m_userBankList,
  m_bankList,
  m_bankBind,
  m_bankRemoveBind,
  m_bankModifyBind
} from "api/member/memberApi";
import { messageOption, withdrawalPwd } from "../toolFunction";
import { estimateMoneyPsw } from "common/js/utils";
import SlotCommon from "../slotCommon";
export default {
  name: "bankCard",
  data() {
    return {
      listlist: ["银行卡管理"],
      bankList: [],
      addStatus: true,

      pageStatus: true,

      addBankList: {
        bankType: "",
        bankCard: "",
        bankAddress: "",
        withdrawPwd: "",
        id: ""
      },

      allBankList: [],
      defaultBank: "",

      submitStatus: 1, //判断按钮是添加还是修改  0 是修改 1是添加

      withdrawPwd: "",
      id: "",
      slotActive: "",

      text: "",

      isRun: true
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.m_bankList();
      this.m_userBankList();
    },
    removeBank(id, type) {
      this.slotActive = type;
      this.id = id;
      this.withdrawPwd = "";
    },
    removeBankSubmit() {
      if (this.withdrawPwd == "" || !withdrawalPwd(this.withdrawPwd)) {
        this.$message(messageOption("请输入正确的资金密码"));
        return;
      }
      m_bankRemoveBind(this.id, this.withdrawPwd).then(res => {
        this.$message(messageOption(res.msg));
        if (res.errorCode == ERR_OK) {
          this.slotActive = "";
          this.m_userBankList();
        }
      });
    },
    updateBank(item) {
      this.pageStatus = !this.pageStatus;
      this.submitStatus = 0;

      this.text = "修改银行卡";

      this.addBankList.withdrawPwd = "";
      this.addBankList.bankCard = "";
      this.addBankList.bankAddress = item.bankAddress;
      this.defaultBank = item.bankType;
      this.addBankList.bankType = item.bankType;
      this.addBankList.id = item.id;
    },
    proupsClose() {
      this.slotActive = "";
    },
    estimateBtn() {
      if (!estimateMoneyPsw()) {
        return;
      }
      this.clearInput();
      this.pageStatus = !this.pageStatus;
      this.submitStatus = 1;
      this.text = "增加绑定银行卡";
    },
    addBankBind() {
      if (!this.memberInfo.hasWithdrawPwd || !this.memberInfo.hasRealName) {
        this.u_setMoneyPwStatus(true);
        return;
      }
      let card = this.addBankList.bankCard;
      let bankAddress = this.addBankList.bankAddress;
      if (
        ((0 == this.submitStatus && card != "") || 1 == this.submitStatus) &&
        !/^([1-9]{1})(\d{12,18})$/.test(card)
      ) {
        this.$message(messageOption("请输入正确的银行卡号"));
        return;
      }
      if (bankAddress.length < 1) {
        this.$message(messageOption("请输入开户地址"));
        return;
      }
      if (!this.addBankList.withdrawPwd) {
        this.$message(messageOption("请输入资金密码"));
        return;
      }
      if (!withdrawalPwd(this.addBankList.withdrawPwd)) {
        this.$message(messageOption("请输入正确的资金密码"));
        return;
      }
      if (1 == this.submitStatus) {
        m_bankBind(this.addBankList).then(res => {
          this.$message(messageOption(res.msg));
          if (res.errorCode == ERR_OK) {
            this.m_userBankList();
            this.pageStatus = !this.pageStatus;
          }
        });
      }
      if (0 == this.submitStatus) {
        m_bankModifyBind(this.addBankList).then(res => {
          this.$message(messageOption(res.msg));
          if (res.errorCode == ERR_OK) {
            this.m_userBankList();
            this.pageStatus = !this.pageStatus;
          }
        });
      }
    },
    clearInput() {
      this.defaultBank = this.mBankList[0].value;
      this.addBankList.bankCard = "";
      this.addBankList.bankAddress = "";
      this.addBankList.withdrawPwd = "";
    },
    ...mapActions(["m_bankList", "m_userBankList"]),
    ...mapMutations(["u_setMoneyPwStatus"])
  },
  computed: {
    ...mapGetters({
      mBankList: "m_bankList",
      mUserBankList: "m_userBankList",
      memberInfo: "m_memberInfo",
      global_userName: "global_userName",
      memberInfo: "m_memberInfo"
    })
  },
  components: {
    HeaderNav,
    Select,
    Option,
    SlotCommon
  },
  watch: {
    mBankList: function() {
      if (this.mBankList) {
        this.defaultBank = this.mBankList[0].value;
        this.allBankList = this.mBankList;
        this.addBankList.bankType = this.mBankList[0].value;
      }
    },
    mUserBankList: function() {
      if (this.mUserBankList) {
        this.bankList = this.mUserBankList.list;
        this.addStatus = this.mUserBankList.addFlag;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~common/sass/variable'
.bank-card
	height: 440px
	// padding: 30px
	// box-sizing: border-box
	.table table
		width: 100%
		text-align: center
		td
			padding: 8px 0
			border: 1px solid #ccc

	.btn_addBank
		margin: 20px auto
		font-size: 14px
	.operation
		color: #f12
		cursor: pointer
		user-select: none
.content
	min-height: 360px
.red-color
	color: #f12
.status_no 
	padding-top: 100px
	text-align: center
	font-size: 14px
	.btn
		display: inline-block
		padding: 4px 10px
		background: #cf0000
		color: #fff
		border-radius: 4px
.info
	width: 100%
	padding: 20px
	background: #e1eaea
	box-sizing: border-box
	border: 1px solid #ccc
	p
		line-height: 20px
		font-size: 13px
		color: #666	
.two-page 
	.form
		padding: 40px 0 0 300px
		input
			width: 200px
			height: 26px
			line-height: 30px
			padding-left: 6px
			border-radius: 4px
			border: 1px solid #dcdfe6
			font-size: 13px
	h3
		font-size: 18px
		font-weight: 700
		color: #cf0000
	li
		margin-bottom: 20px
		span
			display: inline-block
			width: 100px
			padding-right: 10px
			text-align: right
			font-size: 14px
	.btn-search
		display: inline-block
		margin-top: 10px
		font-size: 14px
	.btn-search-back
		margin-left: 10px
		background: #827c7c
</style>


