import Vue from 'vue'
import Router from 'vue-router'

const Index = resolve => require(['@/modules/help/indexContainer'], resolve);
const About = resolve => require(['@/modules/help/aboutUsContainer'], resolve);
const HelpCenter = resolve => require(['@/modules/help/helpCenterContainer'], resolve);





export default {
	path: '/help',
	name: 'help',
	component: Index,
	children: [
		{
			path: '/help/aboutus',
			name: 'aboutus',
			component: About
		},{
			path: '/help/helpcenter',
			name: 'helpcenter',
			component: HelpCenter
		}

	]
}