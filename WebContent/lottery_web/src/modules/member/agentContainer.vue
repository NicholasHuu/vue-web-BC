<template>
	<div class="agent">
		<GroupProfitLossWrapper v-if="pageIndex == 0"></GroupProfitLossWrapper>
		<GroupManager v-if="pageIndex == 1"></GroupManager>
		<RegisterLower v-if="pageIndex == 2"></RegisterLower>
		<SpreadLink v-if="pageIndex == 3"></SpreadLink>
		<Transfer v-if="pageIndex == 4"></Transfer>
	</div>
</template>

<script>
import HeaderNav from './components/headerNav'
import GroupProfitLossWrapper from './components/agentCenter/GroupProfitLossWrapper'
import GroupManager from './components/agentCenter/groupManager'
import RegisterLower from './components/agentCenter/RegisterLower'
import SpreadLink from './components/agentCenter/spreadLink'
import Transfer from './components/agentCenter/transfer'
import { estimateMoneyPsw } from "common/js/utils"
import { mapGetters,mapState,mapActions,mapMutations } from 'vuex'

import { ERR_OK } from "api/config";
export default {
    name: 'agent',
 	data() {
	    return {
	    	pageIndex: 0,
	    }
  	},
 	created(){
 		this.pageIndex = this.$route.params.pageIndex * 1;
 	},
 	methods: {
 		navSwitch(index){
			if(index == 4){
				if (!estimateMoneyPsw()) {
					this.m_moneyPswStatus("transfer");
					return;
				}
			}
			this.$router.push({path: '/member/agent/' + index});
 		},
 		...mapMutations({
			m_moneyPswStatus: "m_moneyPswStatus"
		})
 	},
 	watch: {
 		'$route': function(){
 			this.pageIndex = this.$route.params.pageIndex * 1;
 		}
 	},
 	components: {
		HeaderNav,
		GroupProfitLossWrapper,
		GroupManager,
		RegisterLower,
		SpreadLink,
		Transfer
	},
	computed:{
		...mapGetters({
			'activeIndex': "m_agentIndex",
			"m_module_title": "m_module_title"
		})
	}

}
</script>

<style lang="sass" scoped>
.pageSwitch
	padding: 20px
	background: #eee
</style>


