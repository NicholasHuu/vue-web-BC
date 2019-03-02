<template>
	<div class="lookBetDetail">

	  	<div class="proups" v-if="slotActive != ''">
			<SlotCommon  :currentStyle="slotActive" @proupsClose="proupsClose">
				<h1 slot="header">详情</h1>
				<div class="main">
					<div class="betContent">
						{{content}}
					</div>
				</div>
				<div slot="footer">
					<p class="btn" @click="proupsClose">确 定</p>
				</div>
			</SlotCommon>
		</div>
	</div>
</template>

<script>
import SlotCommon from './slotCommon'

export default {
	name: "lookBetDetail",
	props: {
		content: {
			type: String,
			default: ""
		},
		slotActive: {
			type: String,
			default: ""
		},
		closeBetDetail: {
			type: Function,
			default: () => {}
		}
	},
	data(){
		return{
			
		}
	},
	created(){
    },
	methods: {
		proupsClose(){
			this.$emit("closeBetDetail");
		}
	},
	components: {
		SlotCommon,
	},
}


</script>

<style lang="sass" scoped>
@import '~common/sass/variable'

</style>