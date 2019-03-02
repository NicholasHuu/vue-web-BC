<template>
	<div class="salary-manage">
		<div class="nav">
			<ul class="clearfix">
				<li @click="switchFrame(0)" :class="activeIndex == 0 ? 'active' : '' ">日薪信息</li>
				<li @click="switchFrame(1)" :class="activeIndex == 1 ? 'active' : '' ">日薪管理</li>
				<li @click="switchFrame(2)" :class="activeIndex == 2 ? 'active' : '' ">新增下级日薪</li>
			</ul>
			<div class="btn btn_backPageOne" @click="backPageOne"><i class="el-icon-d-arrow-left"></i>返回会员管理</div>
		</div>
		
		<div class="wrapper-content">
			
			<Info v-if="activeIndex == 0" ></Info>
			<Manage v-if="activeIndex == 1" :userName="userName"></Manage>
			<Add v-if="activeIndex == 2" :userName="userName"></Add>

		</div>

	</div>
</template>

<script>
import Info from "./info"
import Manage from "./manage"
import Add from "./add"
export default {
	name: "salaryManage",
	props: {
		userName: {
			type: String,
			default: ""
		},
		setIndex: {
			type: Number,
			default: 1
		}
	},
	data(){
		return {
			activeIndex: 1,
		}
	},
	created(){
		this.activeIndex = this.setIndex;
	},
	methods: {
		
		switchFrame(index){
			this.activeIndex = index;
		},
		backPageOne(){
			this.$emit("back");
		}
	},
	components: {
		Info,
		Manage,
		Add,
	}
}
</script>

<style lang="sass" scoped>
@import '~common/sass/variable'
.salary-manage
.nav
	position: relative
	padding: 25px
	li
		display: inline-block
		float: left
		padding: 6px 16px
		margin-right: 20px
		border: 1px solid $color_theme
		color: $color_theme
		cursor: pointer
		border-radius: 3px
		user-select: none
		font-size: 15px
.nav
	.active
 		background: $color_theme
 		color: #fff
	.btn_backPageOne
		position: absolute
		top: 30px
		right: 30px
		color: $color_theme
		cursor: pointer

.wrapper-content
	padding: 0 25px 25px 25px


</style>