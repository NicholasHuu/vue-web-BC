<template>
	<div class="account-manager">
		<!-- <HeaderNav :data="m_module_title.accountManager" :currentIndex="pageIndex" @navSwitch="navSwitch"></HeaderNav> -->
		<div class="account-manager-content">
			<Profile v-if="pageIndex == 0"></Profile>
			<Password v-if="pageIndex == 1"></Password>
			<BankCard v-show="pageIndex == 2"></BankCard>
			<LotteryCategory v-if="pageIndex == 3"></LotteryCategory>
		</div>
	</div>
</template>

<script>
import HeaderNav from './components/headerNav'
import Profile from './components/accountManager/profile'
import Password from './components/accountManager/password'
import LotteryCategory from './components/accountManager/lotteryCategory'
import BankCard from './components/accountManager/bankCard'
import { mapGetters,mapState,mapActions,mapMutations } from 'vuex'
import { ERR_OK } from "api/config";
import { estimateMoneyPsw } from 'common/js/utils'
export default {
    name: 'accountManager',
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
			if(index == 1 || index == 2){
				if( !estimateMoneyPsw() ){
					if(index == 1){
						this.m_moneyPswStatus("password");
					}else{
						this.m_moneyPswStatus("bankCard");
					}
					return;
				}
			}
 			this.$router.push({path: '/member/accountmanager/' + index});
 		},
 		...mapMutations({
			changePage: 'm_accountManager_changeIndex',
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
		Profile,
		Password,
		LotteryCategory,
		BankCard
	},
	computed:{
		...mapGetters({
			"activeIndex": "m_accountManagerIndex",
			"m_module_title": "m_module_title"
		}),
	}

}
</script>

<style lang="sass" scoped>
.account-manager-content
	min-height: 400px
	background: #fff
</style>


