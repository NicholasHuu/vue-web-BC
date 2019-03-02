<template>
	<div class="accountRecord">
		<HeaderNav :data="list" :currentIndex="curIndex" @navSwitch="navSwitch"></HeaderNav>

		<LotteryAccount  v-if="curIndex == 0"></LotteryAccount>
		<OtherGameAccount  v-if="curIndex == 1"></OtherGameAccount>

	</div>
</template>

<script>
import HeaderNav from '../headerNav'
import LotteryAccount from './lotteryAccount'
import OtherGameAccount from './otherGameAccount'
import { mapGetters,mapActions,mapMutations } from 'vuex'
export default {
	name: 'accountRecord',
	data(){
		return {
			curIndex: 0,

	    	list: ["彩票账变","其他游戏账变",],
		}
	},
	created(){
		
	},
	methods: {
		navSwitch(index){
			this.curIndex = index;
		},
	},
	computed: {
		...mapGetters({
			
		})
	},
	components: {
		HeaderNav,
		LotteryAccount,
		OtherGameAccount
	},
}
</script>
<style lang='sass' scoped>

</style>