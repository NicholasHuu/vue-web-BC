<template>
	<div class="betRecordWrapper ">
		<HeaderNav :data="list" :currentIndex="curIndex" @navSwitch="navSwitch"></HeaderNav>
		<BetRecord  v-if="curIndex == 0"></BetRecord>
		<OtherGame  v-if="curIndex == 1"></OtherGame>
	</div>
</template>
<script>
import HeaderNav from '../headerNav'
import BetRecord from './betRecord'
import OtherGame from './otherGame'
import { mapGetters,mapActions,mapMutations } from 'vuex'
export default {
	name: 'betRecordWrapper',
	data(){
		return {
			curIndex: 0,
	    	list: ["彩票投注记录","其他游戏投注记录",],
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
		BetRecord,
		OtherGame
	},
}
</script>
<style lang='sass' scoped>

</style>