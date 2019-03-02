<template>
	<div class="groupProfitLossWrapper ">
		<HeaderNav :data="list" :currentIndex="curIndex" @navSwitch="navSwitch"></HeaderNav>
		<GroupProfitLoss  v-if="curIndex == 0"></GroupProfitLoss>
		<OtherGameGroupProfitLoss  v-if="curIndex == 1"></OtherGameGroupProfitLoss>
	</div>
</template>
<script>
import HeaderNav from '../headerNav'
import GroupProfitLoss from './groupProfitLoss'
import OtherGameGroupProfitLoss from './otherGameGroupProfitLoss'
import { mapGetters,mapActions,mapMutations } from 'vuex'
export default {
	name: 'groupProfitLossWrapper',
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
		...mapGetters({
			
		})
	},
	components: {
		HeaderNav,
		GroupProfitLoss,
		OtherGameGroupProfitLoss
	},
}
</script>
<style lang='sass' scoped>

</style>