<template>
	<div class="ChargeWrapper">
		<div v-if=" type == '公司入款' ">
			<Bank :list="curItem"></Bank>
		</div>
		<div v-else-if=" type == '传统扫码' ">
			<ChuantongSaoma :list="curItem"></ChuantongSaoma>
		</div>
		<div v-else-if=" type == '在线扫码' ">
			<OnlineSaoma :list="curItem"></OnlineSaoma>
		</div>
		<div v-else>
			<Online :list="curItem"></Online>
		</div>
	</div>
</template>

<script>
import Bank from './bank'
import ChuantongSaoma from './chuantongSaoma'
import Online from './online'
import OnlineSaoma from './onlineSaoma'
import { mapActions , mapGetters , mapMutations } from 'vuex'
export default {
	name: 'ChargeWrapper',
	props: {
		
		type: {
			type: String,
			default: ""
		}
	},
 	data() {
		return {
			curItem: [],
		}
  	},
 	created(){
		for(let i in this.chargeList){
			if(this.chargeList[i].title == this.type){
				this.curItem = this.chargeList[i].list;
			}
		}
 	},
 	methods: {
 		
	},
	watch: {
		"chargeList": function(){
			for(let i in this.chargeList){
				if(i == this.type){
					this.curItem = this.chargeList[type].list;
				}
			}
		}
	},
	computed: {
		...mapGetters({
			'chargeList': 'm_chargeList',
		})
	},
	components: {
		Bank,
		ChuantongSaoma,
		Online,
		OnlineSaoma
	}
}
</script>

<style lang="sass" scoped>

</style>


