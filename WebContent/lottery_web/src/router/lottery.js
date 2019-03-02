import Vue from 'vue'
import Router from 'vue-router'

const IndexContainer = resolve => require(['@/components/indexContainer'], resolve);
const LotteryContainer = resolve => require(['@/modules/lottery/lotteryContainer'], resolve);


export default {
	path: '/lotts/:lottsCode/index',
	component: IndexContainer,
	children:[
		{
			path: '/',
			name: 'LotteryContainer',
			component: LotteryContainer,
			meta:{
				title: "下注页"
			}
		}
	]
}
