<template>
	<div class="accountRecord">
		<HeaderNav :data="list" :currentIndex="curIndex" @navSwitch="navSwitch"></HeaderNav>
		<ProfitAndLoss  v-if="curIndex == 0"></ProfitAndLoss>
		<OtherGameProfitAndLoss  v-if="curIndex == 1"></OtherGameProfitAndLoss>
	</div>
</template>
<script>
import HeaderNav from '../headerNav'
import ProfitAndLoss from './profitAndLoss'
import OtherGameProfitAndLoss from './otherGameProfitAndLoss'
import { mapGetters,mapActions,mapMutations } from 'vuex'
export default {
	name: 'accountRecord',
	data(){
		return {
			curIndex: 0,
	    	list: ["彩票","其他",],
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
		
	},
	components: {
		HeaderNav,
		ProfitAndLoss,
		OtherGameProfitAndLoss
	},
}
</script>
<style lang='sass' scoped>
</style>