<template>
	<div class="prifit-loss">
		<div class="select-zone">
			<ul class="clearfix">
				<li><span>平台类型:&nbsp;&nbsp;</span>
					<div class="disin">
						<Select v-model="otherGameTypeDefault" @change="changeFlatType(otherGameTypeDefault)" placeholder="请选择">
						    <Option v-for="item in c_otherGameList_prifitLoss" :key="item.value" :label="item.label" :value="item.value"></Option>
						</Select>
					</div>
				</li>
				<li><span>所属厅:&nbsp;&nbsp;</span>
					<div class="disin">
						<Select v-model="flat_default" @change="accountProfitOrLoss.flat = flat_default;accountProfitOrLoss.currentPage = 1;" placeholder="请选择">
						    <Option v-for="item in flat_list" :key="item.value" :label="item.label" :value="item.value"></Option>
						</Select>
					</div>
				</li>
				<li><span>投注时间:&nbsp;&nbsp;</span>
					<DateOptionSelect @ChangeDateValue="changeDate" @runDateOption="runDateOption" :setDefault="setDefault"></DateOptionSelect>
				</li>
				<li><span class="btn-search" @click="accountProfitOrLoss.currentPage = 1;getProfitOrLossList(accountProfitOrLoss)">搜 索</span></li>
			</ul>
		</div>
		
		<div class="record-list" :class="{nofound: !list.length}">
			<table>
				<thead>
					<tr>
						<td width="130">时间</td>
						<td width="115">投注总额</td>
						<td width="115">实际投注总额</td>
						<td width="115">中奖总额</td>
						<td width="115">返点总额</td>
						<td width="115">转入总额</td>
						<td width="115">转出总额</td>
						<td width="115">活动总额</td>
						<td>总盈亏</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in list" :key="index">
						<td>{{item.date}}</td>
						<td>{{item.betAmount}}</td>
						<td>{{item.betInAmout}}</td>
						<td>{{item.betPayout}}</td>
						<td>{{item.betBack}}</td>
						<td>{{item.depositAmount}}</td>
						<td>{{item.withdrawAmount}}</td>
						<td>{{item.huoDongAmount}}</td>
						<td :class="['income',{pay:item.totalProfit <= 0}]">{{item.totalProfit}}</td>
					</tr>
					
					<tr v-show="list.length">
						<td >小计</td>
						<td :class="['income',{pay:count_sum.betAmountSum_val <= 0}]">{{count_sum.betAmountSum_val}}</td>
						<td :class="['income',{pay:count_sum.betInAmoutSum_val <= 0}]">{{count_sum.betInAmoutSum_val}}</td>
						<td :class="['income',{pay:count_sum.betPayoutSum_val <= 0}]">{{count_sum.betPayoutSum_val}}</td>
						<td :class="['income',{pay:count_sum.betBackSum_val <= 0}]">{{count_sum.betBackSum_val}}</td>
						<td :class="['income',{pay:count_sum.depositAmountSum_val <= 0}]">{{count_sum.depositAmountSum_val}}</td>
						<td :class="['income',{pay:count_sum.withdrawAmountSum_val <= 0}]">{{count_sum.withdrawAmountSum_val}}</td>
						<td :class="['income',{pay:count_sum.huoDongAmountSum_val <= 0}]">{{count_sum.huoDongAmountSum_val}}</td>
						<td :class="['income',{pay:count_sum.totalProfitSum_val <= 0}]">{{count_sum.totalProfitSum_val}}</td>
					</tr>
					<tr v-show="list.length">
						<td  colspan="8" class="income pay"><p class="tr">注：总盈亏=活动总额+中奖总额-实际投注总额&nbsp;&nbsp;&nbsp;&nbsp;</p></td>
						
					</tr>

				</tbody>
			</table>
		</div>

		<div class="pageSwitch">
			<PageOption :totalNumber="totalNumber" :totalPage="totalPage" :curPage="accountProfitOrLoss.currentPage" @callPage="callPage"></PageOption>
		</div>
	</div>
</template>

<script>
import { Select , Option } from 'element-ui'
import NewDatePicker from '../newDatePicker'
import PageOption from '../pageOption'
import { ERR_OK } from "api/config"
import { mapGetters,mapState,mapActions ,mapMutations} from 'vuex'
import { m_account_flat_yingkui } from "api/member/memberApi"
import { defaultDateSet , countArrSum , messageOption , getDateDruing } from '../toolFunction'
import DateOptionSelect from '../dateOptionSelect'
export default {
	name: 'otherGameprifitLoss',
	data(){
		return {
			otherGameTypeDefault: '',

			flat_list: [],
			flat_default: '',

			accountProfitOrLoss: {
				flatType: '',
				flat: '',
				startTime: "",
				finishTime: "",
				flag: 1,
				currentPage: 1,
				pageLimit: 0,
			},
			list: [],
			totalPage: 0,
		    totalNumber: 0,
	   		
		    count_sum: {
		    	betAmountSum: [],
		    	betInAmoutSum: [],
		    	betPayoutSum: [],
		    	betBackSum: [],
		    	depositAmountSum: [],
		    	withdrawAmountSum: [],
		    	huodongAmoutSum: [],
		    	totalProfitSum: [],

			    betAmountSum_val: 0,
			    betInAmoutSum_val: 0,
			    betPayoutSum_val: 0,
			    betBackSum_val: 0,
			    depositAmountSum_val: 0,
			    withdrawAmountSum_val: 0,
			    huoDongAmountSum_val: 0,
			    totalProfitSum_val: 0,
		    },
		    setDefault: {}
		}
	},
	created(){
		this.accountProfitOrLoss.pageLimit = this.set_defaultPageLimit;
		this.otherGameTypeDefault = this.c_otherGameList_prifitLoss[0].value;
		this.accountProfitOrLoss.flatType = this.otherGameTypeDefault;
		this.flat_list = this.c_homeMenuList[this.otherGameTypeDefault];
		this.flat_default = this.flat_list[0].value;
		this.accountProfitOrLoss.flat = this.flat_default;
		this.accountProfitOrLoss.account = this.m_groupUserName_forLink ? this.m_groupUserName_forLink : "";
		this.__init();
	},
	methods: {
		__init(){
			if( Object.keys(this.m_date_forLink).length != 0 ){
				this.setDefault = this.m_date_forLink;
				this.accountProfitOrLoss.startTime = this.m_date_forLink.start;
				this.accountProfitOrLoss.finishTime = this.m_date_forLink.end;
			}else{
				let dateChoseList = getDateDruing();
				let defaultDateVar = dateChoseList['today'];
				this.accountProfitOrLoss.startTime = defaultDateVar.start;
				this.accountProfitOrLoss.finishTime = defaultDateVar.end;
			}
			this.getProfitOrLossList(this.accountProfitOrLoss);
		},
		changeFlatType(flatType){
			this.accountProfitOrLoss.flatType = flatType;
			this.accountProfitOrLoss.currentPage = 1;
			this.flat_list = this.c_homeMenuList[flatType];
			this.flat_default = this.flat_list[0].value;
		},
		getProfitOrLossList(obj){
			m_account_flat_yingkui(obj).then( res => {
				if(res.errorCode == ERR_OK){
					this.list = res.datas.resultList;
					this.totalNumber = res.datas.totalRows != "" ? res.datas.totalRows : 0;
					this.totalPage = res.datas.totalPages != "" ? res.datas.totalPages : 0;
					this.count_sum.betAmountSum = [], this.count_sum.betBackSum = [],this.count_sum.winAmountSum = [],this.count_sum.huoDongAmountSum = [],this.count_sum.depositAmountSum = [],this.count_sum.drawAmountSum = [],this.count_sum.totalProfitSum = [];
					for(let i=0;i<this.list.length;i++){
						this.count_sum.betAmountSum.push(this.list[i].betAmount);
						this.count_sum.betInAmoutSum.push(this.list[i].betInAmout);
						this.count_sum.betPayoutSum.push(this.list[i].betPayout);
						this.count_sum.betBackSum.push(this.list[i].betBack);
						this.count_sum.depositAmountSum.push(this.list[i].depositAmount);
						this.count_sum.withdrawAmountSum.push(this.list[i].withdrawAmount);
						this.count_sum.huodongAmoutSum.push(this.list[i].huoDongAmount);
						this.count_sum.totalProfitSum.push(this.list[i].totalProfit);
					}
					this.count_sum.betAmountSum_val = countArrSum(this.count_sum.betAmountSum);
					this.count_sum.betInAmoutSum_val = countArrSum(this.count_sum.betInAmoutSum);
					this.count_sum.betPayoutSum_val = countArrSum(this.count_sum.betPayoutSum);
					this.count_sum.betBackSum_val = countArrSum(this.count_sum.betBackSum);
					this.count_sum.depositAmountSum_val = countArrSum(this.count_sum.depositAmountSum);
					this.count_sum.withdrawAmountSum_val = countArrSum(this.count_sum.withdrawAmountSum);
					this.count_sum.huoDongAmountSum_val = countArrSum(this.count_sum.huodongAmoutSum);
					this.count_sum.totalProfitSum_val = countArrSum(this.count_sum.totalProfitSum);
 				}else{
 					this.$message(messageOption(res.msg));
 				}
			})
		},
		runDateOption(obj){
			this.accountProfitOrLoss.startTime = obj.start;
			this.accountProfitOrLoss.finishTime = obj.end;
		},
		changeDate(start,end){
			this.accountProfitOrLoss.startTime = start;
			this.accountProfitOrLoss.finishTime = end;
		},
		callPage(obj){
			this.accountProfitOrLoss.currentPage = obj.currentPage;
			this.accountProfitOrLoss.pageLimit = obj.pageLimit;
			this.getProfitOrLossList(this.accountProfitOrLoss);
		},
	},
	computed: {
		...mapGetters({
			set_defaultPageLimit: 'set_defaultPageLimit',
			c_otherGameList_prifitLoss: 'c_otherGameList_prifitLoss',
			c_homeMenuList:"c_formObject_homeMenuList",
			m_groupUserName_forLink: 'm_groupUserName_forLink',
			m_date_forLink: 'm_date_forLink'
		})
	},
	watch: {
		c_homeMenuList(){
			
		}
	},
	components: {
		Select,
		Option,
		NewDatePicker,
		PageOption,
		DateOptionSelect
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