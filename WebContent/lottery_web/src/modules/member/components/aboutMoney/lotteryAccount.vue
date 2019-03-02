<template>
	<div class="lottery-account">
		<div class="select-zone">
			<ul class="clearfix">
				<li><span>彩种:&nbsp;&nbsp;</span>
					<div class="disin">
						<Select v-model="defaultLotteryValue" @change="accountLottery.lotteryCode = defaultLotteryValue;accountLottery.gameCode = '';defaultGameCode = '';m_setPlayOption(defaultLotteryValue);accountLottery.currentPage = 1;" placeholder="请选择">
						    <Option v-for="item in lotteryAll" :key="item.value" :label="item.label" :value="item.value"></Option>
						</Select>
					</div>
				</li>
				<li><span>玩法:&nbsp;&nbsp;</span>
						<div class="disin">
							<Select v-model="defaultGameCode" @change="accountLottery.gameCode = defaultGameCode;accountLottery.currentPage = 1;" placeholder="请选择">
							    <Option v-for="item in listState" :key="item.value" :label="item.label" :value="item.value"></Option>
							</Select>
						</div>
					</li>
				<!--<li><span>玩法:&nbsp;&nbsp;</span>
					<div class="playOptionBtn btn" @click="showPlayOption">选择玩法</div>
				</li>-->
				<li><span>类别:&nbsp;&nbsp;</span>
					<div class="disin">
						<Select v-model="defaultTypeList" @change="accountLottery.type = defaultTypeList;" placeholder="请选择">
						    <Option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></Option>
						</Select>
					</div>
				</li>
				<li><span>账变类型:&nbsp;&nbsp;</span>
					<div class="disin">
						<Select v-model="defaultAccountChange" @change="accountLottery.changeType = defaultAccountChange;" placeholder="请选择">
						    <Option v-for="item in m_lottery_account_change" :key="item.value" :label="item.label" :value="item.value"></Option>
						</Select>
					</div>
				</li>
				<li><span>用户名:&nbsp;&nbsp;</span><input class="user-name" type="text" v-model.trim="accountLottery.account"></li>
 				<li><span>账变时间:&nbsp;&nbsp;</span>
					<DateOptionSelect @ChangeDateValue="changeDate" @runDateOption="runDateOption" :setDefault="setDefault"></DateOptionSelect>
				</li>
				<li><input type="checkbox" v-model="status" true-value="yes" false-value="no" id="contain-accountLottery"><label for="contain-accountLottery" class="lineheight-style">包含下级</label></li>
				<li><span class="btn-search" @click="accountLottery.currentPage = 1;getLotteryAccountList(accountLottery)">搜 索</span></li>
			</ul>
			<ul class="clearfix">	
				
			</ul>
		</div>
		<div class="record-list" :class="{nofound: !list.length}">
			<table>
				<thead>
					<tr>
						<td width="120">用户名</td>
						<td width="90">彩种</td>
						<td width="120">玩法</td>
						<td width="120">期号</td>
						<td width="120">账变类型</td>
						<td width="160">账变时间</td>
						<td width="130">账变金额</td>
						<td width="130">用户余额</td>
						<td>类别</td>
					</tr>
				</thead>
				<tbody>
					<tr class="btn" v-for="(item,index) in list" :key="index" @click="lookDetail(item,'lotteryChangeDetail')">
						<td>{{item.userName}}</td>
						<td>{{item.lotteryName}}</td>
						<td>{{item.gameName}}</td>
						<td>{{item.qihao}}</td>
						<td>{{item.changeType}}</td>
						<td>{{item.changeTime.substring(0,item.changeTime.length-3)}}</td>
						<td :class="['income',{pay:item.changeMoney < 0}]">{{item.changeMoney}}</td>
						<td>{{item.userBalance}}</td>
						<td :class="['income',{pay:item.testValue == '0'}]">{{item.test}}</td>
					</tr>
					<tr v-show="list.length">
						<td colspan="6">汇总小结</td>
						<td :class="['income',{pay:count_sum.betSum_val < 0}]">{{count_sum.betSum_val}}</td>
						<td colspan="2"></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="pageSwitch">
			<PageOption :totalNumber="totalNumber" :totalPage="totalPage" :curPage="accountLottery.currentPage" @callPage="callPage"></PageOption>
		</div>

		<div class="proups" v-if="slotActive != ''">
			<SlotCommon v-if="slotActive == 'lotteryChangeDetail'" :currentStyle="slotActive" @proupsClose="proupsClose">
				<h1 slot="header">账变详情</h1>
				<div class="main">
					<div class="top clearfix">
						<div class="left fl">
							<img class="fl" v-if="slotCommonInfo.testValue == '0'" src="./outgo.png" alt="">
							<img class="fl" v-else="slotCommonInfo.testValue == '1'" src="./income.png" alt="">
							<div class="fl changeMoney">
								<p :class="{outgo: slotCommonInfo.testValue == '0'}">{{slotCommonInfo.changeMoney}}</p>
								<p class="changeType">{{slotCommonInfo.changeType}}</p>
							</div>
						</div>
						<div class="right fr">
							<p class="">{{slotCommonInfo.lotteryName}}-{{slotCommonInfo.gameName}}</p>
							<p class="changeType">{{slotCommonInfo.qihao}}</p>
						</div>
					</div>
					<div class="bottom">
						<table>
							<thead>
								<tr>
									<td>用户</td>
									<td>账变时间</td>
									<td>追号编号</td>
									<td>方案编号</td>
									<td>用户余额</td>
									<td>备注</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{{slotCommonInfo.userName}}</td>
									<td>{{slotCommonInfo.changeTime}}</td>
									<td>{{slotCommonInfo.appendOrder}}</td>
									<td>{{slotCommonInfo.fanganOrder}}</td>
									<td>{{slotCommonInfo.userBalance}}</td>
									<td>{{slotCommonInfo.remark}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<p slot="footer" @click="proupsClose">关 闭</p>
			</SlotCommon>
		</div>

		<PlayOption v-if="playOptionStatus" :lotteryCode="accountLottery.lotteryCode" @closePlayOptionPopup="closePlayOptionPopup" @choseResult="choseResult"></PlayOption>

	</div>
</template>

<script>
import { Select , Option } from 'element-ui'
import NewDatePicker from '../newDatePicker'
import PageOption from '../pageOption'
import { ERR_OK } from "api/config"
import { mapGetters,mapState,mapActions ,mapMutations} from 'vuex'
import { m_account_change } from "api/member/memberApi"
import { defaultDateSet , countArrSum , messageOption , getDateDruing } from '../toolFunction'
import SlotCommon from '../slotCommon'
import DateOptionSelect from '../dateOptionSelect'
import PlayOption from '../playOption'
export default {
	name: 'prifitLoss',
	data(){
		return {
			defaultLotteryValue: "",
			defaultAccountChange: "",
			status: "",
			accountLottery: {
				lotteryCode: "",
				startTime: "",
				finishTime: "",
				flag: "",
				account: "",
				changeType: "",
				currentPage: 1,
				pageLimit: 0,
				type: '',
				gameCode: ""
			},
			list: [],
			totalPage: 0,
		    totalNumber: 0,

		    typeList: [
		    	{
					value: "",
					label: "全部"
				},{
					value: 0,
					label: "支出"
				},{
					value: 1,
					label: "收入"
				}
		    ],
		    defaultTypeList: '',

		    count_sum: {
		    	betSum: [],
			    betSum_val: 0,
		    },
		    slotActive: "",

		    slotCommonInfo: {},

		    defaultGameCode: "",
		    defaultOrderStatus: "",
		    playOptionStatus: false,

		    setDefault: {}
		}
	},
	created(){
		this.accountLottery.pageLimit = this.set_defaultPageLimit;
		
		this.defaultLotteryValue = this.lotteryAll[0].value;
		this.accountLottery.lotteryCode = this.lotteryAll[0].value;
		this.defaultAccountChange = this.m_lottery_account_change[0].value;
		this.accountLottery.changeType = this.m_lottery_account_change[0].value;
		
		this.accountLottery.account = this.m_groupUserName_forLink ? this.m_groupUserName_forLink : "";
		this.__init();
	},
	beforeDestroy(){
		this.m_setPlayOption("");
	},
	methods: {
		__init(){
			if( Object.keys(this.m_date_forLink).length != 0 ){
				this.setDefault = this.m_date_forLink;
				this.accountLottery.startTime = this.m_date_forLink.start;
				this.accountLottery.finishTime = this.m_date_forLink.end;
			}else{
				let dateChoseList = getDateDruing();
				let defaultDateVar = dateChoseList['today'];
				this.accountLottery.startTime = defaultDateVar.start;
				this.accountLottery.finishTime = defaultDateVar.end;
			}
			this.getLotteryAccountList(this.accountLottery);
		},
		getLotteryAccountList(obj){
			if(this.accountLottery.account != "" && !(/^[A-Za-z0-9]{4,16}$/.test(this.accountLottery.account)) ){
				this.accountLottery.account = "";
				this.$message(messageOption('您输入的账户格式不正确！'));
				return;
			}
			obj.flag = this.status === "yes" ? 1 : 0;
			m_account_change(obj).then( res => {
				if(res.errorCode == ERR_OK){
					this.list = res.datas.resultList;
					this.totalNumber = res.datas.totalRows != "" ? res.datas.totalRows : 0;
					this.totalPage = res.datas.totalPages != "" ? res.datas.totalPages : 0;
					this.count_sum.betSum = [];
					for(let i=0;i<this.list.length;i++){
						this.count_sum.betSum.push(this.list[i].changeMoney);
					}
					this.count_sum.betSum_val = countArrSum(this.count_sum.betSum);
 				}else{
 					this.$message(messageOption(res.msg));
 				}
			})
		},
		//玩法操作
		choseResult(str){
			this.accountLottery.gameCode = str;
			this.playOptionStatus = false;
			//this.getLotteryAccountList(this.accountLottery);
		},
		showPlayOption(){
			this.playOptionStatus = true;
		},
		closePlayOptionPopup(){
			this.playOptionStatus = false;
		},

		lookDetail(obj,type){
			this.slotActive = type;
			this.slotCommonInfo = obj;
		},
		proupsClose(){
 			this.slotActive = "";
 		},
 		runDateOption(obj){
			this.accountLottery.startTime = obj.start;
			this.accountLottery.finishTime = obj.end;
			//this.getLotteryAccountList(this.accountLottery);
		},
		changeDate(start,end){
			this.accountLottery.startTime = start;
			this.accountLottery.finishTime = end;
		},
		callPage(obj){
			this.accountLottery.currentPage = obj.currentPage;
			this.accountLottery.pageLimit = obj.pageLimit;
			this.getLotteryAccountList(this.accountLottery);
		},
		...mapMutations({
			m_setPlayOption: 'm_setPlayOption'
		})
	},
	computed: {
		...mapGetters({
			lotteryAll: 'm_lottery_menu_list',
			m_lottery_account_change: 'm_lottery_account_change',
			set_defaultPageLimit: 'set_defaultPageLimit',
			listState: 'm_setPlayOption',
			m_groupUserName_forLink: 'm_groupUserName_forLink',
			m_date_forLink: 'm_date_forLink'
		})
	},
	components: {
		Select,
		Option,
		NewDatePicker,
		PageOption,
		SlotCommon,
		DateOptionSelect,
		PlayOption
	},
}
</script>
<style lang='sass' scoped>
.income
	color: #05be05
.income.pay
	color: #f33
.nofound
	background: #eee url(../nofound.png) no-repeat center;
</style>