<template>
	<div class="about-money">
		
		<BankCharge v-if="pageIndex == 0"></BankCharge>
		<BankWithdraw v-if="pageIndex == 1"></BankWithdraw>
		<TransferRecord v-if="pageIndex == 2"></TransferRecord>
		<AccountRecord v-if="pageIndex == 3"></AccountRecord>
		<ProfitAndLossRecord v-if="pageIndex == 4"></ProfitAndLossRecord>

	</div>
</template>

<script>

import PageOption from './components/pageOption'
import BankWithdraw from './components/aboutMoney/bankWithdraw'
import BankCharge from './components/aboutMoney/bankCharge'
import TransferRecord from './components/aboutMoney/transferRecord'
import AccountRecord from './components/aboutMoney/accountRecord'
import ProfitAndLossRecord from './components/aboutMoney/profitAndLossRecord'
import { mapGetters,mapActions,mapMutations } from 'vuex'

import { ERR_OK } from "api/config";
export default {
    name: 'aboutMoney',
 	data() {
	    return {
	    	pageIndex: 0,
	    }
  	},
 	created(){
 		this.pageIndex = this.$route.params.pageIndex * 1;
 		
		this.get_otherGameFlat();
 	},
 	methods: {
 		...mapMutations({
			changePage: 'm_aboutMoney_changeIndex',
		}),
		...mapActions([
			'get_otherGameFlat'
		])
 	},
 	watch: {
 		'$route': function(){
 			this.pageIndex = this.$route.params.pageIndex * 1;
 		},
 	},
 	components: {
		PageOption,
		BankWithdraw,
		BankCharge,
		TransferRecord,
		AccountRecord,
		ProfitAndLossRecord,
		
	},
	computed:{
		...mapGetters({
			"activeIndex": "m_aboutMoneyIndex",
			"m_module_title": "m_module_title"
		}),
	}

}
</script>

<style lang="sass" scoped>
.pageSwitch
	padding: 20px
	background: #eee
</style>

