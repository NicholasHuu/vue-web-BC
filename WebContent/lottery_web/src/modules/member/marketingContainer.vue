<template>
	<div class="marketing">
		<!-- <HeaderNav :data="m_module_title.marketing" :currentIndex="pageIndex" @navSwitch="navSwitch"></HeaderNav> -->
		<MemberList v-if="pageIndex == 0"></MemberList>
		<NoneBetList v-if="pageIndex == 1"></NoneBetList>
		<ValidList v-if="pageIndex == 2"></ValidList>
	</div>
</template>
<script>
import HeaderNav from './components/headerNav'
import PageOption from './components/pageOption'
import MemberList from './components/marketing/memberList'
import NoneBetList from './components/marketing/noneBetList'
import ValidList from './components/marketing/validList'
import { mapGetters,mapActions,mapMutations } from 'vuex'
import { ERR_OK } from "api/config";
export default {
    name: 'marketing',
 	data() {
	    return {
	    	pageIndex: 0
	    }
  	},
 	created(){
 		this.pageIndex = this.$route.params.pageIndex * 1;
 	},
 	methods: {
 		navSwitch(index){
 			this.$router.push({path: '/member/marketing/' + index});
 		},
 		...mapMutations({
			changePage: 'm_marketing_changeIndex',
		}),
 	},
 	watch: {
 		'$route': function(){
 			this.pageIndex = this.$route.params.pageIndex * 1;
 		}
 	},
 	components: {
		HeaderNav,
		PageOption,
		MemberList,
		NoneBetList,
		ValidList
	},
	computed:{
		...mapGetters({
			"activeIndex": "m_marketingIndex",
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

