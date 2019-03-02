<template>
	<div class="help-nav">
		<ul class="clearfix">
			<li @click="changeIndex(item)" :class="{active: currentIndex == item}" v-for="(item,index) in data" :key="index"><span>{{item}}</span></li>
		</ul>
	</div>
</template>
<script>
import {mapState, mapMutations } from 'vuex'
export default {
	name: 'helpNav',
	
	props: {
		data: {
			type: Array,
			default: function(){
				return []
			}
		},
		currentIndex: {
			type: String,
			default: ""
		}
	},
	
	methods:{
		changeIndex(type){
			this.$emit("navSwitch",type)
		},
	},
}
</script>



<style lang='sass' scoped>
.help-nav
	width: 100%
	background: #EB4342
	&>ul li
		float: left
		height: 40px
		cursor: pointer
		user-select: none
		span
			position: relative
			display: block
			margin-top: 4px
			padding: 11px 20px
			color: #fff
			font-size: 14px
			&:after
				position: absolute
				top: 0
				right: -1px
				width: 1px
				height: 30px
				content: ''
				background: #ff7070
	&>ul li.active
		position: relative
		background: #fff

		&:before
			content: ''
			position: absolute
			top: 0
			left: 0
			display: block
			height: 4px
			width: 100%
			background: #EB4342
		&:after
			content: ''
			position: absolute
			top: 0
			right: -16px
			border-width: 37px 0px 3px 16px
			border-style: solid
			border-color: transparent transparent #771515 #771515
			opacity: .4
		span
			color: #C12727
			&:after
				background: #C12727
</style>