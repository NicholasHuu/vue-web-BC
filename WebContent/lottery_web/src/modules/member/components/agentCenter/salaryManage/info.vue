<template>
	<div class="salary-info">
		<h1>个人日薪信息</h1>
		
		<table>
			<thead>
				<tr>
					<td>用户名</td>
					<td>发放模式</td>
					<td>发放周期</td>
					<td>日薪金额</td>
					<td>起始金额</td>
					<td>投注人数要求</td>
					<td>亏损要求</td>
					<td>封顶金额</td>
					<td>开通时间</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in recordListPrivate" :key="index">
					<td>{{item.userName}}</td>
					<td>{{item.privodeFangshi}}</td>
					<td>{{item.privodezhouqi}}</td>
					<td>{{item.salaryMoney}}</td>
					<td>{{item.startMoney}}</td>
					<td>{{item.personCount}}</td>
					<td>{{item.lossCount}}</td>
					<td>{{item.moneyCount}}</td>
					<td>{{item.modifyTime}}</td>
				</tr>
			</tbody>
		</table>
		
		<h1 style="margin-top: 20px;">日薪领取明细</h1>
		<div class="searchCondition">
			<ul class="clearfix">
				<li><span>用户名:&nbsp;&nbsp;</span>
					<input class="chromeInputClearAuto">
					<input class="user-name" type="text" v-model="requestDetail.account">
				</li>
				<li><span>投注时间:&nbsp;&nbsp;</span>
					<NewDatePicker @ChangeDateValue="changeDate" :defaultDate="defaultDateVar"></NewDatePicker>
				</li>
				<li><span class="btn-search" @click="requestDetail.currentPage = 1;getSalaryDetail(requestDetail)">搜 索</span></li>
			</ul>
		</div>
		<div class="info-list" :class="{nofound: !requestDetailList.length}">
			<table>
				<thead>
					<tr>
						<td width="130">用户名</td>
						<td width="130">日期</td>
						<td width="110">投注人数</td>
						<td width="130">亏损情况</td>
						<td width="160">投注金额</td>
						<td width="110">日薪金额</td>
						<td width="130">日薪总额</td>
						<td>操作</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in requestDetailList" :key="index">
						<td>{{item.userName}}</td>
						<td>{{item.date}}</td>
						<td>{{item.personCount}}</td>
						<td>{{item.lossCount}}</td>
						<td>{{item.betMoney}}</td>
						<td>{{item.salaryMoney}}</td>
						<td>{{item.salaryAmount}}</td>
						<td>
							<span v-if="item.statusValue == 0" class="btn cursor" @click="operation(item.userName,item.id,'operation')">派发日薪</span>
							<span v-else>已派发</span>
						</td>

					</tr>
				</tbody>
			</table>
		</div>
		<PageOption :totalNumber="totalNumber" :totalPage="totalPage" :curPage="requestDetail.currentPage" @callPage="callPage"></PageOption>


		<div class="proups" v-if="slotActive != ''">
			<SlotCommon :currentStyle="slotActive" @proupsClose="proupsClose">
				<h1 slot="header">派送日薪</h1>
				<div class="main">
					<div class="item clearfix">
						<div class="left">接收人: </div>
						<div class="right"><input type="text" disabled v-model="operationName" /></div>
					</div>
					<div class="item clearfix">
						<div class="left">资金密码: </div>
						<div class="right"><input type="password" v-model="operationPassword" placeholder="请输入资金密码" /></div>
					</div>
				</div>
				<p slot="footer" @click="paySalary(operationId,operationPassword)">确 定</p>
			</SlotCommon>
		</div>
	</div>
</template>

<script>
import PageOption from '../../pageOption'
import NewDatePicker from '../../newDatePicker'
import SlotCommon from '../../slotCommon'
import { mapGetters , mapActions } from 'vuex'
import { m_teamSalaryList , m_teamSalaryDetail , m_payAgent } from "api/member/memberApi"
import { Select , Option } from 'element-ui'
import { ERR_OK } from "api/config"
import { messageOption , defaultDateSet } from '../../toolFunction'
import { estimateMoneyPsw } from "common/js/utils";
export default {
	name: "salaryInfo",
	data(){
		return {
			defaultDateVar: {},
			totalNumber: 0,
			totalPage: 0,
			requestList: {
				flag: 1,
				account: '',
				currentPage: 1,
				pageLimit: 1,
			},
			recordListPrivate: [],
			//团队方案配置
		    grpCategory: [
			    {
			    	value: 0,
			    	label: "下级团队方案"
			    },{
			    	value: 1,
			    	label: "本级团队方案"
			    }
		    ],
		    defaultGrpCategory: 0,
		    //日薪领取明细
		    requestDetail: {
		    	startTime: "",
				finishTime: "",
				account: "",
				currentPage: 1,
				pageLimit: 0,
		    },
		    requestDetailList: [],

		    slotActive: '',

		    operationId: '',
		    operationName: '',
		    operationPassword: ''
		}
	},
	created(){
		this.requestDetail.pageLimit = this.set_defaultPageLimit;
		this.defaultDateVar = defaultDateSet();
		this.requestDetail.startTime = this.defaultDateVar.start;
		this.requestDetail.finishTime = this.defaultDateVar.end;

		this.requestList.account = this.global_userName;
		this.getSalaryList(this.requestList);
		this.getSalaryDetail(this.requestDetail);
	},
	methods: {
		getSalaryList(obj){
			m_teamSalaryList(obj).then( res => {
				if(res.errorCode == ERR_OK) {
					this.recordListPrivate = res.datas.resultList;	
				}
			})
		},
		getSalaryDetail(obj){
			if( obj.account != "" && !/^[A-Za-z0-9]{4,16}$/.test(obj.account) ){
				this.requestDetail.account = "";
				this.$message(messageOption('您输入的账户格式不正确！'));
				return;
			}
			m_teamSalaryDetail(obj).then( res => {
				if(res.errorCode == ERR_OK) {
					this.totalNumber = res.datas.totalRows;
					this.totalPage = res.datas.totalPages;
					this.requestDetailList = res.datas.resultList;	
				}
			})
		},
		paySalary(id,zjPassword){
			if(zjPassword == "" || !/^\d{4}$/.test(zjPassword)){
				this.$message(messageOption('请输入正确资金密码'));return;
			}
			m_payAgent(id,zjPassword).then( res => {
				this.$message(messageOption(res.msg));
				if(res.errorCode == ERR_OK){
					this.slotActive = "";
					this.u_getUserBalance(this.global_userName);
					this.getSalaryDetail(this.requestDetail);
					this.m_memberInfo();
				}
			})
		},
		operation(userName,id,type){
			if (!estimateMoneyPsw()) {
		        return;
		    }
		    this.operationPassword = "";
			this.operationId = id;
			this.operationName = userName;
			this.slotActive = type;
		},
		proupsClose(){
			this.slotActive = '';
		},
		changeDate(start,end){
			this.requestDetail.startTime = start;
			this.requestDetail.finishTime = end;
		},
		callPage(obj){
			this.requestDetail.currentPage = obj.currentPage;
			this.requestDetail.pageLimit = obj.pageLimit;
			this.getSalaryDetail(this.requestDetail);
		},
		...mapActions([
			'u_getUserBalance',
			'm_memberInfo',
		])
	},
	computed: {
		...mapGetters({
			global_userName: 'global_userName',
			set_defaultPageLimit: 'set_defaultPageLimit'
		})
	},
	components: {
		PageOption,
		NewDatePicker,
		Select,
		Option,
		SlotCommon
	}
}
</script>



<style lang="sass" scoped>
.searchCondition
	padding: 10px 20px
	margin-bottom: 20px
	background: #fff
	li
		float: left
		margin-right: 20px
		&>span
			font-size: 14px
.salary-info
	h1
		margin-bottom: 20px
		font-weight: 600
.info-list
	min-height: 400px
	margin-bottom: 20px
	.cursor
		color: #b00

.nofound
	background: #eee url(../../nofound.png) no-repeat center;
</style>