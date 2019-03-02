<template>
	<div class="prifit-loss">
		<div class="select-zone">
			<ul class="clearfix">
				<li><span>投注时间:&nbsp;&nbsp;</span>
					<DateOptionSelect @ChangeDateValue="changeDate" @runDateOption="runDateOption" :setDefault="setDefault"></DateOptionSelect>
				</li>
				<li><span>用户名:&nbsp;&nbsp;</span><input class="user-name" type="text" v-model.trim="accountProfitOrLoss.account"></li>
				<li><span class="btn-search" @click="accountProfitOrLoss.currentPage = 1;getProfitOrLossList(accountProfitOrLoss)">搜 索</span></li>
			</ul>
		</div>
		
		<div class="record-list" :class="{nofound: !list.length}">
			<table>
				<thead>
					<tr>
						<td width="130">时间</td>
						<td width="140">实际投注总额</td>
						<td width="140">返点总额</td>
						<td width="125">中奖总额</td>
						<td width="125">活动总额</td>
						<td width="125">充值总额</td>
						<td width="125">提款总额</td>
						<td>总盈亏</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in list" :key="index">
						<td>{{item.date}}</td>
						<td>{{item.betAmount}}</td>
						<td>{{item.betBack}}</td>
						<td :class="['income',{pay:count_sum.winAmountSum_val <= 0}]">{{item.winAmount}}</td>
						<td>{{item.huoDongAmount}}</td>
						<td>{{item.depositAmount}}</td>
						<td>{{item.drawAmount}}</td>
						<td :class="['income',{pay:item.totalProfit <= 0}]">{{item.totalProfit}}</td>
					</tr>

					<tr v-show="list.length">
						<td >小计</td>
						<td>{{count_sum.betAmountSum_val}}</td>
						<td>{{count_sum.betBackSum_val}}</td>
						<td :class="['income',{pay:count_sum.winAmountSum_val <= 0}]">{{count_sum.winAmountSum_val}}</td>
						<td>{{count_sum.huoDongAmountSum_val}}</td>
						<td>{{count_sum.depositAmountSum_val}}</td>
						<td>{{count_sum.drawAmountSum_val}}</td>
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
import { m_account_yingkui } from "api/member/memberApi"
import { defaultDateSet , countArrSum , messageOption , getDateDruing } from '../toolFunction'
import DateOptionSelect from '../dateOptionSelect'
export default {
	name: 'prifitLoss',
	data(){
		return {
			accountProfitOrLoss: {
				startTime: "",
				finishTime: "",
				flag: 1,
				currentPage: 1,
				pageLimit: 0,
				account: '',
			},
			list: [],
			totalPage: 0,
		    totalNumber: 0,
		    
		    count_sum: {
		    	betAmountSum: [],
		    	betBackSum: [],
		    	winAmountSum: [],
		    	huoDongAmountSum: [],
		    	depositAmountSum: [],
		    	drawAmountSum: [],
		    	totalProfitSum: [],

			    betAmountSum_val: 0,
			    betBackSum_val: 0,
			    winAmountSum_val: 0,
			    huoDongAmountSum_val: 0,
			    depositAmountSum_val: 0,
			    drawAmountSum_val: 0,
			    totalProfitSum_val: 0,
		    },

		    setDefault: {},
		}
	},
	created(){
		this.accountProfitOrLoss.account = this.m_groupUserName_forLink ? this.m_groupUserName_forLink : "";
		this.accountProfitOrLoss.pageLimit = this.set_defaultPageLimit;
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
		getProfitOrLossList(obj){
			m_account_yingkui(obj).then( res => {
				if(res.errorCode == ERR_OK){
					this.list = res.datas.resultList;
					this.totalNumber = res.datas.totalRows != "" ? res.datas.totalRows : 0;
					this.totalPage = res.datas.totalPages != "" ? res.datas.totalPages : 0;
					this.count_sum.betAmountSum = [], this.count_sum.betBackSum = [],this.count_sum.winAmountSum = [],this.count_sum.huoDongAmountSum = [],this.count_sum.depositAmountSum = [],this.count_sum.drawAmountSum = [],this.count_sum.totalProfitSum = [];
					for(let i=0;i<this.list.length;i++){
						this.count_sum.betAmountSum.push(this.list[i].betAmount);
						this.count_sum.betBackSum.push(this.list[i].betBack);
						this.count_sum.winAmountSum.push(this.list[i].winAmount);
						this.count_sum.huoDongAmountSum.push(this.list[i].huoDongAmount);
						this.count_sum.depositAmountSum.push(this.list[i].depositAmount);
						this.count_sum.drawAmountSum.push(this.list[i].drawAmount);
						this.count_sum.totalProfitSum.push(this.list[i].totalProfit);
					}
					this.count_sum.betAmountSum_val = countArrSum(this.count_sum.betAmountSum);
					this.count_sum.betBackSum_val = countArrSum(this.count_sum.betBackSum);
					this.count_sum.winAmountSum_val = countArrSum(this.count_sum.winAmountSum);
					this.count_sum.huoDongAmountSum_val = countArrSum(this.count_sum.huoDongAmountSum);
					this.count_sum.depositAmountSum_val = countArrSum(this.count_sum.depositAmountSum);
					this.count_sum.drawAmountSum_val = countArrSum(this.count_sum.drawAmountSum);
					this.count_sum.totalProfitSum_val = countArrSum(this.count_sum.totalProfitSum);
 				}else{
 					this.$message(messageOption(res.msg));
 				}
			})
		},
		runDateOption(obj){
			this.accountProfitOrLoss.startTime = obj.start;
			this.accountProfitOrLoss.finishTime = obj.end;
			//this.getProfitOrLossList(this.accountProfitOrLoss);
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
			m_groupUserName_forLink: 'm_groupUserName_forLink',
			m_date_forLink: 'm_date_forLink'
		})
	},
	watch: {
		
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