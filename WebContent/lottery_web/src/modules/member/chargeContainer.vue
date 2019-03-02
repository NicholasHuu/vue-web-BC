<template>
	<div class="charge">
		<HeaderNav :data="charge_allList_nav" :currentIndex="activeIndex" @navSwitch="navSwitch"></HeaderNav>
		
		<div v-for="(item,index) in charge_allList_nav" :key="index">
			<ChargeWrapper v-if="activeIndex == item" :type="item"></ChargeWrapper>
		</div>

	</div>
</template>
<script>
import { mapActions , mapGetters , mapMutations } from 'vuex'
import HeaderNav from './components/headerNav_charge'
import { charge_allList } from "api/member/memberApi"

import ChargeWrapper from './components/charge/chargeWrapper'

import { ERR_OK } from "api/config"
export default {
	name: "charge",
	data() {
	    return {
			charge_allList_nav: [],
			defaultNav: ['bank','chuantongSaoma','onlineSaoma','online'],   //for in不能保证遍历对象后的顺序，defaultNav因顺序而生
			allList: [],
		};
	},
	created() {
		charge_allList().then( res => {
			 if(res && res.errorCode == ERR_OK){
			 	for(let i = 0; i < this.defaultNav.length; i++){
			 		let name = this.defaultNav[i];
			 		if(res.datas[name].list.length){
			 			this.charge_allList_nav.push(res.datas[name].title);
			 		}
			 	}
				/*for(let i in res.datas){
					if(res.datas[i].list.length){
						console.log(res.datas[i].title);
						this.charge_allList_nav.push(res.datas[i].title);
					}
				}*/
				this.changePage(this.charge_allList_nav[0]);
				this.m_chargeList(res.datas);
			}else{
				console.log(res);
			}
		});

	},
    methods: {
		navSwitch(type){
			this.changePage(type);
		},
		...mapMutations({
			u_setMoneyPwStatus: 'u_setMoneyPwStatus',
			changePage: 'm_charge_changeIndex',
			m_chargeList: 'm_chargeList'
		}),
	},
	computed: {
		...mapGetters({
			'activeIndex': 'm_chargeIndex',
		})
	},
	components: {
		HeaderNav,
		ChargeWrapper
	}
};
</script>

<style lang="sass" scoped>

</style>

