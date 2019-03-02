<template>
	<div class="messageBox">
		<div class="proups" v-if="slotActive != ''">
				<SlotCommon v-if="slotActive == 'messageBox'" :currentStyle="slotActive" @proupsClose="proupsClose">
					<h1 slot="header">消息</h1>
					<div class="main">
						<div class="main_content">
							{{memberInfo.typeDetail ? memberInfo.typeDetail.msgContent : ''}}
						</div>
					</div>
					<p slot="footer">提 交</p>
				</SlotCommon>
			</div>
		</div>
</template>

<script>
import { mapGetters , mapState , mapActions , mapMutations } from 'vuex'
import { ERR_OK } from "api/config"
import SlotCommon from './components/slotCommon'
export default {
    name: 'messageBox',
 	data() {
	    return {
	    	slotActive: 'messageBox'
	    }
  	},
 	created(){
 		
 	},
 	methods: {
 		proupsClose(){
 			this.slotActive = '';
 		},
 	},
 	
 	computed: {
		...mapGetters({
			'memberInfo': 'm_memberInfo'
		})
	},
	components: {
		SlotCommon,
	}

}
</script>

<style lang="sass" scoped>
.main
	.main_content	
		overflow-y: auto
		margin: 14px 24px
		height: auto
		padding: 10px 0
		min-height: 100px
		max-height: 400px
</style>


