<template>
	<div class="salary-add">
		<h1>新增下级日薪</h1>
		
		<div class="top-content">
			<div class="left">
				<ul>
					<li><p>用户名:&nbsp;&nbsp;</p>
						<input class="chromeInputClearAuto">
						<input class="user-name" type="text" v-model.trim="requestList.account" placeholder="请输入用户名">
					</li>
					<li><p>发展模式:&nbsp;&nbsp;</p>
						<div class="disin">
							<Select v-model="defaultDevelopModule" @change="requestList.developModule = defaultDevelopModule;" placeholder="请选择">
							    <Option v-for="item in m_pay_salary_type" :key="item.value" :label="item.label" :value="item.value"></Option>
							</Select>
						</div>
					</li>
					<li><p>日薪金额:&nbsp;&nbsp;</p>
						<input class="user-name" type="text" v-model.trim="requestList.salaryMoney" placeholder="请输入日薪金额">
						<span>(团队/个人投注量每有10000.0000，就可以拿到输入框填写的日薪金额)</span>
					</li>
					<li><p>起始金额:&nbsp;&nbsp;</p>
						<input class="user-name" type="text" v-model.trim="requestList.startMoney" placeholder="请输入起始金额">
						<span>(团队/个人投注销量高于该金额，才会拿到相应的日工资金额)</span>
					</li>
					<li><p>投注人数要求:&nbsp;&nbsp;</p>
						<input class="user-name" type="text" v-model.trim="requestList.personCount" placeholder="">
						<span>(可分配范围 0 ~ 3000)</span>
					</li>
					<li><p>封顶金额:&nbsp;&nbsp;</p>
						<input class="user-name" type="text" v-model.trim="requestList.maxMoney" value="" >
						<span>(如果不填写，则不限制封顶金额！)</span>
					</li>
					<li><p>亏损要求:&nbsp;&nbsp;</p>
						<Radio v-model="requestList.loss" label="1">要求</Radio>
  						<Radio v-model="requestList.loss" label="0">不要求</Radio>
						<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(如要求亏损，则该用户团队处于亏损状态下，才有日薪！)</span>
					</li>
					<li><p></p> <div class="btn-search" @click="addSalary(requestList)">确 定</div></li>
				</ul>
			</div>

		</div>
	</div>
</template>

<script>
import { Select , Option , Radio } from 'element-ui'
import { m_teamSalaryAdd } from "api/member/memberApi"
import { ERR_OK } from "api/config"
import { messageOption } from '../../toolFunction'
import { mapGetters } from 'vuex'
export default {
	name: "salaryAdd",
	props: {
		userName: {
			type: String,
			default: ""
		}
	},
	data(){
		return {
			
			developModule: [{
		    	value: 0,
		    	label: "阶梯模式"
		    }],
			defaultDevelopModule: 0,

			requestList: {
				account: '',
				fangshi: 0,
				maxMoney: "",
				personCount: "",
				salaryMoney: "",
				startMoney: "",
				loss: "0",
			},

			isRun: true,
		}
	},
	created(){
		this.requestList.account = this.userName;
		this.defaultDevelopModule = this.m_pay_salary_type[0].value;
		this.requestList.fangshi = this.m_pay_salary_type[0].value;
	},
	methods: {
		addSalary(obj){
			if(!/^[A-Za-z0-9]{4,16}$/.test(obj.account)){
				this.$message(messageOption('请输入正确的用户名'));return;
			}
			if(obj.salaryMoney <= 0 ){
				this.$message(messageOption('请输入正确的日薪金额！'));return;
			}
			if(obj.startMoney < 0 ){
				this.$message(messageOption('请输入正确的起始金额！'));return;
			}
			if(obj.personCount != "" && (obj.personCount < 0 || obj.personCount > 3000 ) || !/^\d*$/.test(obj.personCount) ){
				this.$message(messageOption('请输入正确的投注人数！'));return;
			}
			if(obj.personCount == ''){
				obj.personCount = 0;
			}
			if(obj.maxMoney != "" && ( !/^\d*$/.test(obj.maxMoney) || obj.maxMoney < 0 ) ){
				this.$message(messageOption('请正确输入封顶金额'));return;
			}
			m_teamSalaryAdd(obj).then( res => {
				this.$message(messageOption(res.msg));
				if(res.errorCode == ERR_OK){
					this.clearInput();
				}
			})
		},
		clearInput(){
			this.requestList.account = "";
			this.requestList.maxMoney = "";
			this.requestList.personCount = "";
			this.requestList.salaryMoney = "";
			this.requestList.startMoney = "";
		}
	},
	computed:{
		...mapGetters({
			'm_pay_salary_type': 'm_pay_salary_type',
		})
	},
	components: {
		Select,
		Option,
		Radio
	},
	watch:{
		
	}
}
</script>



<style lang="sass" scoped>
.salary-add
	margin-bottom: 20px
	h1
		margin-bottom: 20px
		font-weight: 600
	.top-content
		position: relative
		width: 100%
		padding: 30px 50px
		margin: 0 auto 
		background: #E3E0E7
		box-sizing: border-box
		&:before,&:after
			content: ''
			position: absolute
			top: 0
			left: -5px
			width: 5px
			height: 100%
			background: url(../addUser-l.png) repeat-y;
		&:after
			left: unset
			right: -5px
			background: url(../addUser-r.png) repeat-y;
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
			span
				display: inline-block
				font-size: 14px
			.el-radio + .el-radio
				margin-left: 10px
				.el-radio__label
					padding-left: 5px
		.btn-search
			display: inline-block
</style>