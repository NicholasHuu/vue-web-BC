<template>
	<div class="bank clearfix payStyle">
		<div class="inner">
			<div class="nav" ref="nav">
				<ul>
	                <li v-for="(item,index) in list" :key="index" :class="{active: curIndex == index}" @click="switchPage(index)">
	                    {{item.bankType}}
	                </li>
				</ul>
			</div>
			<div class="content">
				<div class="border"></div>
				<div class="item " ref="item" v-for="(item,index) in list" :key="index" v-show="curIndex == index">
					<div class="companyPay" v-if="testPayType(item.payType) == 'companyPay'">
						<div class="receiveInfo clearfix">
							<div class="fl">
								<img :src="item.bigPic" alt="" />
							</div>
							<div class="fl info">
								<p><span>{{item.bankUser}}</span></p>
								<p>{{item.bankCard}}</p>
								<p>开户行:<span>{{item.bankAddress}}</span></p>
							</div>
						</div>
						<ul>
							<li><span>充值金额:</span> <input class="chromeInputClearAuto"><input type="number" v-model="re_list.money" :placeholder="item.minMaxDes" /></li>
							<li><span>汇款时间:</span> 
								<DatePicker v-model="re_list.time" type="datetime" placeholder="选择日期时间" default-time="12:00:00"></DatePicker >
							</li>
							<li><span>汇款方式:</span> 
								<Select v-model="defaultTransferType" @change="re_list.hkType = defaultTransferType" placeholder="请选择">
								    <Option v-for="item in m_bank_transfer_type" :key="item.value" :label="item.label" :value="item.value"></Option>
								</Select>
							</li>
							<li><span>汇款人姓名:</span> <input type="text" v-model="re_list.hkName" placeholder="请输入姓名" /></li>
							<!-- <li><span>备注:</span> <input type="text" v-model="re_list.userRemark" placeholder="请输入备注" /></li> -->
							<li v-show="item.remark"><span></span>
								<div class="icon_notice_remark disin" style="color: #5c5c5c;">{{item.remark}}</div>
							</li>
							<li><span></span> <p class="btn-search btn-moditfy disin" @click="chargeBtn('companyPay')">确 认</p></li>
						</ul>
					</div>
					<div class="thirdPay" v-else-if="testPayType(item.payType) == 'thirdPay'">
						<div class="receiveInfo clearfix">
							<div class="fl">
								<img :src="item.bigPic" alt="" />
							</div>
							<div class="fl info">
								<p>收款账号:<span>{{item.bankCard}}</span></p>
								<p>收款姓名:<span>{{item.bankUser}}</span></p>
							</div>
						</div>
						<ul>
							<li><span>充值金额:</span> <input class="chromeInputClearAuto"><input type="number" v-model="re_list.money" :placeholder="item.minMaxDes" /></li>
							<li><span>汇款时间:</span> 
								<DatePicker v-model="re_list.time" type="datetime" placeholder="选择日期时间" default-time="12:00:00"></DatePicker >
							</li>
							<li><span>账号:</span> 
								<input type="text" v-model="re_list.hkType" placeholder="请输入账号" />
							</li>
							<li><span>姓名:</span> <input type="text" v-model="re_list.hkName" placeholder="请输入姓名" /></li>
							<li><span>备注:</span> <input type="text" v-model="re_list.userRemark" placeholder="请输入备注" /></li>
							<li v-show="item.remark"><span></span>
								<div class="icon_notice_remark disin" style="color: #5c5c5c;">{{item.remark}}</div>
							</li>
							<li><span></span> <p class="btn-search btn-moditfy disin" @click="chargeBtn('thirdPay')">确 认</p></li>
						</ul>
					</div>
					<div v-else>
						<div class="receiveInfo clearfix">
							<div class="fl">
								<img :src="item.bigPic" alt="" />
							</div>
							<div class="fl info">
								<p>{{item.bankType}}</p>
								<p><span class="fl">{{item.payLink}}</span></p>
							</div>
							<div class="fl" style="margin-top: 10px;">
								<a class="btn-search btn-moditfy" :href="item.payLink" target="_blank">进入充值</a>
							</div>
						</div>
						<ul>
							<li><span>充值金额</span> <input type="number" v-model="re_list.money" :placeholder="item.minMaxDes"  /></li>
							<li v-show="item.remark"><span></span>
								<div class="icon_notice_remark disin" style="color: #5c5c5c;">{{item.remark}}</div>
							</li>
							<li><span></span> <p class="btn-search btn-moditfy disin" @click="chargeBtn('website')">确 认</p></li>
						</ul>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters,mapState,mapActions } from 'vuex'
import { Select , Option , DatePicker  } from 'element-ui'
import { charge_bank } from "api/member/memberApi"
import { ERR_OK } from "api/config";
import { testBankType } from "./bankConstant"
import { messageOption } from '../toolFunction'
export default {
	name: 'bank',
	props: {
		list: {
			type: Array,
			default: []
		}
	},
 	data() {
		return {
			curIndex: 0,
			//list: [],
			
			re_list: {
				userName: "",
				money: "",
				payNo: "",
				time: new Date(),
				hkName: "",
				hkType: "",
				client: 0,
				userRemark: "",
			},

			defaultTransferType: "",

			minMoney: 0,
			maxMoney: 0,

			currentType: '',
		}
  	},
 	created(){
		this.re_list.userName = this.global_userName;
		this.defaultTransferType = this.m_bank_transfer_type[0].value;
		this.setReList(0);
 	},
 	methods: {
		chargeBtn(type){
			if(this.re_list.money < this.minMoney){
				this.$message(messageOption('请输入大于'+this.minMoney+'的金额！'));return;
			}
			switch (type){
				case "companyPay": 
					if(this.re_list.hkName == ""){
						this.$message(messageOption('请输入账号名!'));return;
					}
					break;
				case "thirdPay":
					if(this.re_list.hkType == "" || !/^[0-9a-zA-Z]+$/.test(this.re_list.hkType)){
						this.$message(messageOption('请填写正确的账号!'));return;
					}
					if(this.re_list.hkName == "" ){
						this.$message(messageOption('请输入账号昵称!'));return;
					}
					break;
			}
			charge_bank(this.re_list).then(res=>{
				this.$message(messageOption(res.msg));
				if(res.errorCode == ERR_OK){
					this.clearAfterSubmit();
 				}
			})
		},
 		switchPage(index){
			this.curIndex = index;
			this.setReList(index); 
 		},
 		testPayType(payType){
 			return testBankType(payType);
 		},
 		clearAfterSubmit(){
 			if(this.currentType == 'companyPay'){
 				this.re_list.money = "";
				this.re_list.hkName = "";
 			}else if(this.currentType == 'website'){
 				this.re_list.money = "";
 			}else{
 				this.re_list.money = "";
				this.re_list.hkName = "";
				this.re_list.hkType = "";
				this.re_list.userRemark = "";
 			}
 		},
		setReList(index){
			this.currentType = testBankType(this.list[index].payType);
			if(this.currentType == 'companyPay'){
				this.re_list.hkType = this.m_bank_transfer_type[0].value;
				this.re_list.hkName = "";
			}else if(this.currentType == 'website'){
				this.re_list.hkType = "网页支付";
				this.re_list.hkName = "网页支付";
			}else{
				this.re_list.hkType = "";
				this.re_list.hkName = "";
			}

			this.re_list.payNo = this.list[index].payNo;
			this.minMoney = this.list[index].minEdu;
 			this.maxMoney = this.list[index].maxPay;
		}
	 },
	 computed: {
		...mapGetters({
			'm_bank_transfer_type': 'm_bank_transfer_type',
			'global_userName': 'global_userName'
		})
	},
	mounted(){
		if(this.list.length > 14){
			let navHeight = this.$refs.nav.scrollHeight;
			this.$refs.item.style.height = navHeight - 2 + 'px';
		}
	},

	watch: {
		'm_bank_transfer_type': function(){
			this.defaultTransferType = this.m_bank_transfer_type[0].value;
		}
	},
	components: {
		Select, 
		Option,
		DatePicker 
	}
}
</script>

<style lang="sass" scoped>

</style>


