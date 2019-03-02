<template>
	<div class="salary-manage">
		<h1>下级日薪信息</h1>
		<div class="searchCondition">
			<ul class="clearfix">
				<li><span>用户名:&nbsp;&nbsp;</span>
					<input class="chromeInputClearAuto">
					<input class="user-name" type="text" v-model="requestList.account">
				</li>
				<li><span class="btn-search" @click="requestList.currentPage = 1;getSalaryList(requestList)">查 询</span></li>
			</ul>
		</div>
		<div class="info-list" :class="{nofound: !recordList.length}">
			<table>
				<thead>
					<tr>
						<td width="120">用户名</td>
						<td width="85">发放模式</td>
						<td width="85">发放周期</td>
						<td width="85">日薪金额</td>
						<td width="85">起始金额</td>
						<td width="120">投注人数要求</td>
						<td width="85">亏损要求</td>
						<td width="85">封顶金额</td>
						<td width="160">处理时间</td>
						<td>操作</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in recordList" :key="index">
						<td>{{item.userName}}</td>
						<td>{{item.privodeFangshi}}</td>
						<td>{{item.privodezhouqi}}</td>
						<td>{{item.salaryMoney}}</td>
						<td>{{item.startMoney}}</td>
						<td>{{item.personCount}}</td>
						<td>{{item.lossCount}}</td>
						<td>{{item.moneyCount}}</td>
						<td>{{item.modifyTime.substring(0,item.modifyTime.length-3)}}</td>
						<td><span class="cursor btn" @click="proupsModifyMoney(item,'modifyMoney')">修改日薪规则</span></td>
					</tr>
				</tbody>
			</table>
		</div>
		<PageOption :totalNumber="totalNumber" :totalPage="totalPage" :curPage="requestList.currentPage" @callPage="callPage"></PageOption>

		<div class="proups" v-if="slotActive != ''">
			<SlotCommon :currentStyle="slotActive" @proupsClose="proupsClose">
				<h1 slot="header">修改下级日薪</h1>
				<div class="main">
					<ul>
						<li><p>用户名:&nbsp;&nbsp;</p>
							<input class="user-name" type="text" placeholder="" disabled v-model="currentModify.userName">
						</li>
						<li><p>发展模式:&nbsp;&nbsp;</p>
							<div class="disin">
			
								<Select v-model="defaultDevelopModule" @change="currentModify.fangshi = defaultDevelopModule;" placeholder="请选择">
								    <Option v-for="item in m_pay_salary_type" :key="item.value" :label="item.label" :value="item.value"></Option>
								</Select>
							</div>
						</li>
						<li><p>日薪金额:&nbsp;&nbsp;</p>
							<input class="user-name" type="number" placeholder="" v-model.trim="currentModify.salaryMoney">
							<span>(团队/个人投注量每有10000.0000，就可以拿到输入框填写的日薪金额)</span>
						</li>
						<li><p>起始金额:&nbsp;&nbsp;</p>
							<input class="user-name" type="number" placeholder="" v-model.trim="currentModify.startMoney">
							<span>(团队/个人投注销量高于该金额，才会拿到相应的日工资金额)</span>
						</li>
						<li><p>投注人数要求:&nbsp;&nbsp;</p>
							<input class="user-name" type="number" placeholder="" v-model.trim="currentModify.personCount">
							<span>(可分配范围 0 ~ 3000)</span>
						</li>
						<li><p>封顶金额:&nbsp;&nbsp;</p>
							<input class="user-name" type="number" value="" v-model.trim="currentModify.moneyCountValue">
							<span>(如果不填写，则不限制封顶金额！)</span>
						</li>
						<li><p>亏损要求:&nbsp;&nbsp;</p>
							<Radio v-model="currentModify.lossCountValue" label="1">要求</Radio>
	  						<Radio v-model="currentModify.lossCountValue" label="0">不要求</Radio>
							<span>(如要求亏损，则该用户团队处于亏损状态下，才有日薪！)</span>
						</li>
					</ul>
				</div>
				<p slot="footer" @click="setSalaryUpdate(currentModify)">确定</p>
			</SlotCommon>
		</div>
	</div>
</template>


<script>
import PageOption from '../../pageOption'
import SlotCommon from '../../slotCommon'
import { ERR_OK } from "api/config"
import { Select , Option , Radio } from 'element-ui'
import { m_teamSalaryList , m_teamSalaryUpdate } from "api/member/memberApi"
import { messageOption } from '../../toolFunction'
import { mapGetters } from 'vuex'
export default {
	name: "salaryManage",
	props: {
		userName: {
			type: String,
			default: ""
		}
	},
	data(){
		return {
			totalNumber: 0,
			totalPage: 0,
			slotActive: '',  //修改日薪规则弹窗状态
			requestList: {
				flag: 0,
				account: "",
				currentPage: 1,
				pageLimit: 0,
			},
			recordList: [],
			
			defaultDevelopModule: 0,

			//修改日薪过渡变量
			currentModify: '',

		}
	},
	created(){
		this.requestList.pageLimit = this.set_defaultPageLimit;

		this.defaultDevelopModule = this.m_pay_salary_type[0].value;
		this.requestList.account = this.userName;
		this.getSalaryList(this.requestList);
	},
	methods: {
		getSalaryList(obj){
			m_teamSalaryList(obj).then( res => {
				if(res.errorCode == ERR_OK){
					this.totalNumber = res.datas.totalRows;
					this.totalPage = res.datas.totalPages;
					this.recordList = res.datas.resultList;
				}
			})
		},
		setSalaryUpdate(obj){
			obj.personCount = obj.personCount == "无要求" ? "" : obj.personCount;
			
			if(obj.salaryMoney <= 0  ){
				this.$message(messageOption('请输入正确的日薪金额！'));return;
			}
			if(obj.startMoney < 0  ){
				this.$message(messageOption('请输入正确的起始金额！'));return;
			}
			if(obj.personCount != "" && (obj.personCount < 0 || obj.personCount > 3000 ) || !/^\d*$/.test(obj.personCount) ){
				this.$message(messageOption('请输入正确的投注人数！'));return;
			}
			if(obj.personCount == ''){
				obj.personCount = 0;
			}
			m_teamSalaryUpdate(obj).then( res => {
				this.$message(messageOption(res.msg));
				if(res.errorCode == ERR_OK){
					this.getSalaryList(this.requestList);
					this.slotActive = "";	
				}
			})
		},
		proupsModifyMoney(obj,type){
			this.currentModify = obj;
			this.slotActive = type;
		},
		proupsClose(){
			this.slotActive = '';
		},
		callPage(obj){
			this.requestList.currentPage = obj.currentPage;
			this.requestList.pageLimit = obj.pageLimit;
			this.getSalaryList(this.requestList);
		},
	},
	computed:{
		...mapGetters({
			'm_pay_salary_type': 'm_pay_salary_type',
			'set_defaultPageLimit': 'set_defaultPageLimit'
		})
	},
	components: {
		PageOption,
		SlotCommon,
		Select,
		Option,
		Radio
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
.salary-manage
	h1
		margin-bottom: 20px
		font-weight: 600
.info-list
	min-height: 400px
	.cursor
		color: #b00

.nofound
	background: #eee url(../../nofound.png) no-repeat center;
</style>