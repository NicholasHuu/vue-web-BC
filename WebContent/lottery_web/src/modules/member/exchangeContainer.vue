<template>
  <div class="exchange">
    <HeaderNav :data="exchangeTitle"></HeaderNav>

    <div class="content">
      <div class="wrapper">
        <h3>
          总账户余额：
          <span>{{m_memberInfo.userMoney}}</span>
        </h3>
        <ul>
          <li v-for="(item,index) in middleList" :key="index">
            <div class="flagTitle">
              <i>
                <img :src="item.smallPic" alt>
              </i>
              {{item.flatName}}
            </div>
            <div
              :ref="item.flat"
              class="btn btn-balance"
              @click="showBalance(item.flat,index)"
            >{{balance[index]}}</div>
            <div class="btn_group">
              <span class="btn btn-search" @click="proupsSlot(item,'exchangeInner')">转 入</span>
              <span class="btn btn-search" @click="proupsSlot(item,'exchangeOuter')">转 出</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 几个弹窗组合具名插槽组 -->
    <div class="proups" v-if="slotActive != ''">
      <SlotCommon :currentStyle="slotActive" @proupsClose="proupsClose">
        <h1 slot="header">额度转换</h1>
        <div class="main">
          <div class="icon_exchange"></div>
          <div class="exchangeDirectionTitle tc">
            由总账户
            <span>{{direction_exchangeText}}</span>到
            <span class="exchangeflag">{{direction_exchangeflat}}</span>平台
          </div>
          <div class="tc exchange_amount">
            <input v-model.trim="money" type="number" :placeholder="placeholderText">
            <p>最低{{direction_exchangeText}}金额{{m_exchange_eduMinPay}}元</p>
          </div>
        </div>
        <p slot="footer" @click="sumbitExchange">{{sumbitExchangeText}}</p>
      </SlotCommon>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import HeaderNav from "./components/headerNav";
import { ERR_OK } from "api/config";
import { messageOption } from "./components/toolFunction";
import { addClass } from "common/js/dom";
import SlotCommon from "./components/slotCommon";
import {
  m_exchangeFlagList,
  m_exchangeShowBalance,
  m_exchangeDeposit,
  m_exchangeWithdraw
} from "api/member/memberApi";
export default {
  name: "exchange",
  data() {
    return {
      exchangeTitle: ["额度转换"],
      slotActive: "",
      direction_exchangeText: "",
      direction_exchangeflat: "",
      placeholderText: "",
      sumbitExchangeText: "",

      middleList: [],

      balance: [],
      showYorN: [],

      money: "",
      direction: 0
    };
  },
  created() {
    this.__init();
  },
  methods: {
    __init() {
      m_exchangeFlagList(this.global_userName).then(res => {
        if (res.errorCode == ERR_OK) {
          this.middleList = res.datas;
          for (let i = 0; i < this.middleList.length; i++) {
            this.balance[i] = "显示余额";
          }
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },
    showBalance(flat, index) {
      let currentClass = this.$refs[flat][0].className;
      const reg = new RegExp("(^|\\s)" + "show" + "(\\s|$)");
      //if( reg.test(currentClass) ) return;
      m_exchangeShowBalance(this.global_userName, flat).then(res => {
        if (res.errorCode == ERR_OK) {
          this.$refs[flat][0].innerHTML = res.datas;
          this.$refs[flat][0].className = currentClass + " show";
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },
    //弹窗插槽通用方法 --- 打开
    proupsSlot(obj, type) {
      this.money = "";
      this.direction_exchangeText = type == "exchangeInner" ? "转入" : "转出";
      this.placeholderText =
        type == "exchangeInner" ? "请输入转入金额" : "请输入转出金额";
      this.sumbitExchangeText =
        type == "exchangeInner" ? "确认转入" : "确认转出";
      this.direction_exchangeflat = obj.flat;
      this.direction = type;
      this.slotActive = type;
    },
    sumbitExchange() {
      console.log(this.m_exchange_eduMinPay);
      if (this.money < this.m_exchange_eduMinPay) {
        this.$message(messageOption("请输入正确的金额！"));
        return;
      }
      if (this.direction == "exchangeInner") {
        m_exchangeDeposit(
          this.global_userName,
          this.direction_exchangeflat,
          this.money
        ).then(res => {
          if (res.errorCode == ERR_OK) {
            this.$message(messageOption(res.msg));
            this.showBalance(this.direction_exchangeflat);
            this.slotActive = "";
          } else {
            this.$message(messageOption(res.msg));
          }
        });
      } else {
        m_exchangeWithdraw(
          this.global_userName,
          this.direction_exchangeflat,
          this.money
        ).then(res => {
          if (res.errorCode == ERR_OK) {
            this.$message(messageOption(res.msg));
            this.showBalance(this.direction_exchangeflat);
            this.slotActive = "";
          } else {
            this.$message(messageOption(res.msg));
          }
        });
      }
    },
    proupsClose() {
      this.slotActive = "";
    },
    ...mapActions([]),
    ...mapMutations([])
  },
  watch: {},
  computed: {
    ...mapGetters({
      global_userName: "global_userName",
      m_memberInfo: "m_memberInfo",
      m_exchange_eduMinPay: "m_exchange_eduMinPay"
    })
  },
  components: {
    HeaderNav,
    SlotCommon
  }
};
</script>

<style lang="sass" scoped>
@import '~common/sass/variable'
.exchange
	.content
		min-height: 450px
		padding: 20px 50px
		background: #fff
		font-size: 14px
		h3
			line-height: 24px
			margin-bottom: 10px
		.wrapper
			li
				padding: 10px 40px
				border: 1px solid #ccc
				border-bottom: 0
				&:last-child
					border-bottom: 1px solid #ccc 
				&>div
					display: inline-block
				.btn_group
					span
						display: inline-block
						margin-right: 10px
				.flagTitle
					position: relative
					width: 280px
					padding-left: 50px
					i
						position: absolute
						top: -11px
						left: 0
						width: 36px
						height: 36px
						background: #ccc
						border-radius: 50%
						img
							width: 100%
				.btn-balance
					width: 150px
					margin-right: 230px
					color: #1711ff
					text-decoration: underline
					text-align: center
				.btn-balance.show
					text-decoration: none
	.proups
		.icon_exchange
			width: 80px
			height: 80px
			margin: 16px auto
			background: url(./icon_exchange.png) no-repeat
			background-size: 100% 100%
		.exchangeDirectionTitle
			color: #333
			font-size: 14px
		.exchange_amount
			width: 240px
			margin: 0 auto 16px
			input
				width: 100%
				height: 34px
				margin: 16px 0 6px 0
				background: #efefef
				border-radius: 0
				box-sizing: border-box
			p
				text-align: left
				font-size: 12px
				color: #898989
		.exchangeflag
			color: $color_theme
</style>

