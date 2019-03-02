<template>
	<div class="withdraw">
		
		<HeaderNav :data="withdrawTitle"></HeaderNav>
		
		<div class="content" v-show="page_status">
			<div class="wrapper">
				<h3>{{l_lotteryWebSiteInfo.information.withdraw}}</h3>
				<div class="status_no" v-show="!bankList.length">
					没有绑定银行卡，请点击&nbsp;&nbsp; <span class="btn" style='color: red;' @click="linkAddBankCard"> 添加</span>
				</div>
				<table v-show="bankList.length">
					<thead>
						<tr>
							<td>开户行</td>
							<td>开户名</td>
							<td>卡号</td>
							<td>开户地址</td>
							<td>操作</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in bankList" :key="index">
							<td>{{item.bankCnName}}</td>
							<td>{{item.userRealName}}</td>
							<td>{{item.bankCard}}</td>
							<td>{{item.bankAddress}}</td>
							<td><span class="btn" @click="page_status = !page_status;re_list.bankCode = item.id;balanceRemark = item.minMaxDes;setMoneyValue(item);clear_re_list;">提现</span></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="page_two" v-show="!page_status">

			<div class="form">
				<ul>
					<li><span>会员账号: </span>
						<div class="disin">
							<p>{{re_list.userName}}</p>
						</div>
					</li>
					<li><span>收款人姓名: </span>
						<div class="disin">
							<p>{{memberInfo.userRealName}}</p>
						</div>
					</li>
					<li><span>当前余额: </span>
						<div class="disin">
							<p>{{u_userBalance.balance}}</p>
						</div>
					</li>
					<li><span>提现金额: </span>
						<div class="disin">
							<input type="number" v-model.trim="re_list.balance" :placeholder="balanceRemark">
						</div>
					</li>
					<li><span>资金密码: </span>
						<div class="disin">
							<input type="password" v-model.trim="re_list.withdrawPwd" placeholder="请输入4位纯数字资金密码">
						</div>
					</li>
					<li><span></span>
						<div class="disin btn-search" @click="withdraw">确 定</div>
						<div class="disin btn-search btn-search-back" @click="page_status = !page_status">返 回</div>
					</li>
				</ul>
			</div>	
		</div>
	</div>
</template>

<script>
import { mapActions , mapGetters , mapMutations } from 'vuex'
import HeaderNav from './components/headerNav'
import { withdrawSubmit } from "api/member/memberApi"
import { ERR_OK } from "api/config"
import { messageOption } from './components/toolFunction'
export default {
	name: "withdraw",
	data() {
	    return {
	    	withdrawTitle: ["提现"],
	    	page_status: true,
			bankList: [],

	    	re_list:{
				userName: "",
	    		balance: "",
	    		bankCode: "",
	    		withdrawPwd: ""
	    	},

	    	minPay: 0,
	    	maxPay: 0,

	    	balanceRemark: '',
		};
	},
	created() {
		this.re_list.userName = this.global_userName;
		this.init();
	},
    methods: {
		init(){
			this.m_userBankList();
		},
		withdraw(){
			if(!this.memberInfo.hasWithdrawPwd || !this.memberInfo.hasRealName){
				this.u_setMoneyPwStatus(true);return;
			}
			if(this.re_list.balance == "" || !/^\d{1,6}$/.test(this.re_list.balance) || (this.re_list.balance < this.minPay || this.re_list.balance > this.maxPay ) ){
				this.$message(messageOption('请输入正确的金额!'));return;
			}
			if(this.re_list.withdrawPwd == "" || !/^\d{4}$/.test(this.re_list.withdrawPwd) ){
				this.$message(messageOption('请输入正确的资金密码!'));return;	
			}
			withdrawSubmit(this.re_list).then( res => {
				this.$message(messageOption(res.msg));
				if(res.errorCode == ERR_OK){
 					this.u_getUserBalance();
 				}
				this.clear_re_list();
			})
		},
		setMoneyValue(obj){
			this.minPay = obj.minPay;
			this.maxPay = obj.maxPay == 0 ? 9999999999 : obj.maxPay;
		},
		linkAddBankCard(){
			this.$router.push('/member/accountmanager/2');
			this.m_accountManager_changeIndex(2);
		},
		clear_re_list(){
			this.re_list.balance = "";
			this.re_list.withdrawPwd = "";
		},
		...mapActions([
			'm_userBankList',
			'u_getUserBalance'
		]),
		...mapMutations([
			'm_accountManager_changeIndex',
			'u_setMoneyPwStatus'
		])
	},
	computed: {
		...mapGetters({
			'mUserBankList': 'm_userBankList',
			'global_userName': 'global_userName',
			'memberInfo': 'm_memberInfo',
			'u_userBalance': 'u_userBalance',
			'l_lotteryWebSiteInfo': 'l_lotteryWebSiteInfo'
		})
	},
	components: {
		HeaderNav,
	},
	watch: {
 		"mUserBankList": function(){
			this.bankList = this.mUserBankList.list;
			
		},
		
 	}
};
</script>

<style lang="sass" scoped>
.withdraw
	.content
		min-height: 450px
		padding: 20px
		background: #fff
		font-size: 14px
		h3
			line-height: 24px
			margin-bottom: 10px
		.wrapper .btn
			color: #f11
.page_two
	min-height: 450px
	padding: 20px
	background: #fff
	.form
		padding: 40px 0 0 360px
		input
			width: 160px
			height: 26px
			line-height: 30px
			padding-left: 6px
			border-radius: 4px
			border: 1px solid #dcdfe6
			font-size: 13px
		p
			font-size: 14px
			color: 464646
	h3
		line-height: 24px
		margin-bottom: 10px
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

