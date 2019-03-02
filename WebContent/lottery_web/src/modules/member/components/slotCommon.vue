<template>
	<div class="slotCommon" :class="currentStyle">
		<div class="shadow-cover"></div>
		<div class="content">
			<div class="inner">
				<div class="btn-close" @click="closePoups"><i class="el-icon-close"></i></div>
				<header>
					<slot name="header"></slot>
				</header>
				<main>
					<slot></slot>
				</main>
				<footer v-show="currentStyle != 'messageBox'">
					<slot name="footer"></slot>
				</footer>
			</div>
		</div>
	</div>
</template>
	
<script>
export default {
	name: "slotCommon",
	props: {
		currentStyle: {
			type: String,
			default: ""
		},
		
	},
	data(){
		return{

		}
	},
	methods: {
		closePoups(){
			this.$emit("proupsClose")
		}
	}

}
</script>

<style lang="sass" scoped>
@import '~common/sass/variable'
.slotCommon
	.shadow-cover
		z-index: 8
		position: fixed
		top: 0
		left: 0
		width: 100%
		height: 100%
		background: #000
		opacity: .8
	.content
		z-index: 9
		position: fixed
		top: 0
		left: 0
		right: 0
		bottom: 0
		display: table
		width: 500px
		min-height: 200px
		height: auto
		margin: auto
		background: #fff
		//transform: translateY(-50%)
	.inner
		position: relative
		width: 100%
		height: 100%
		.btn-close
			z-index: 7
			position: absolute
			top: 10px
			right: 10px
			color: #fff
			cursor: pointer
			i
				font-size: 22px
				transition: all .3s ease-in-out
				&:hover
					transform: rotate(180deg)
	header
		width: 100%
		height: 40px
		line-height: 40px
		padding-left: 20px 
		background: $color_theme
		box-sizing: border-box
		font-size: 16px
		color: #fff
	main
		input
			height: 24px
			line-height: 24px
			padding-left: 4px
			border: 1px solid #aaa
			border-radius: 4px
	footer
		display: block
		width: 100px
		height: 30px
		line-height: 30px
		margin: 0 auto
		background: $color_theme
		color: #fff
		text-align: center
		border-radius: 4px
		cursor: pointer
.slotCommon.addRemark,.slotCommon.siteMessage,.slotCommon.operation,.slotCommon.contactSomeone
	.content
		width: 500px
		height: 250px
		.main
			padding-top: 20px
			.item
				margin-bottom: 10px
				.left
					float: left
					width: 150px
					line-height: 27px
					padding-right: 10px
					text-align: right
					font-size: 13px
				.right
					float: left
					width: 300px
					text-align: left
					textarea
						width: 200px
						height: 80px
						padding-top: 2px
						padding-left: 4px
						border: 1px solid #aaa
						border-radius: 4px
						border-radius: 4px
						resize: none
						font-family: Arial
						font-size: 13px
						color: #333
.slotCommon.setBackMoney
	.content
		width: 700px
		height: 250px
		background: #eee
		main
			padding: 25px
			.item
				border-bottom: 1px solid #D9D9D9
				height: 50px
				line-height: 50px
				font-size: 14px
				background: #fff
				&:last-child
					border-top: 0
			.left
				float: left
				width: 150px
				text-align: right
				padding-right: 10px
				border-right: 1px solid #D9D9D9
			.right
				float: left
				width: 420px
				padding-left: 20px
				input
					width: 60px
				p
					display: inline-block
					margin-right: 20px
					font-size: 14px
		footer
			margin: 0 auto 20px
.slotCommon.siteMessage,.slotCommon.contactSomeone
	.content
		height: 290px
		input,textarea
			width: 200px
			font-size: 13px
			
.slotCommon.modifyMoney
	.content
		width: 850px
		height: 400px
		.main
			padding-top: 20px
			padding-bottom: 10px
	li
		margin-bottom: 12px
		p
			display: inline-block
			width: 150px
			margin-right: 10px
			text-align: right
			font-size: 14px
		input
			width: 180px
			height: 26px
			line-height: 26px
			padding-left: 6px
			margin-right: 10px
			border: 1px solid #ccc
			border-radius: 4px
		span
			display: inline-block
			font-size: 14px
		.el-radio + .el-radio
			margin-left: 10px
			.el-radio__label
				margin-left: 5px
	.btn-search
		display: inline-block

.slotCommon.operation
	.item
		.left
			width: 190px !important
		.right
			width: 200px !important
		&:first-child
			margin-top: 10px !important
			margin-bottom: 20px !important
		&:last-child
			margin-bottom: 20px !important

.slotCommon.messageRecord
	header
		height: 41px
	.content
		width: 440px
		height: 400px
	.main
		padding: 20px
		box-sizing: border-box
		.inner
			width: 100%
			height: 260px
			padding: 10px
			box-sizing: border-box
			background: #F0F0F0
			overflow-y: auto
	footer
		width: 100%
		padding: 0 20px
		margin-bottom: 20px
		box-sizing: border-box 
		background: #fff
		input
			float: left
			width: 300px
		.btn
			float: right
			width: 70px
			height: 30px
			line-height: 30px
			text-align: center
			color: #fff
			background: $color_theme
			border-radius: 4px
			font-size: 14px
.slotCommon.lookBetDetail,.slotCommon.lookRemarkDetail
	.content
		width: 400px
		padding-bottom: 20px
		.main
			padding: 20px 30px
			.betContent
				width: 280px
				height: 120px
				line-height: 16px
				margin: 0 auto
				padding: 6px
				box-sizing: border-box
				border: 1px solid #a1a1a1
				border-radius: 4px
				word-break: break-all
				overflow-y: auto
				font-size: 13px

.slotCommon.removeBank,.slotCommon.personal
	.main
		padding: 30px 0
	.left
		float: left
		width: 190px
		line-height: 28px
		padding-right: 10px
		text-align: right
	.right
		display: inline-block
		width: 200px
.slotCommon.lotteryChangeDetail
	.content
		width: 1000px
		.top
			padding: 20px 40px
			.left
				img
					width: 56px
				.changeMoney
					margin: 10px 0 0 20px
					p:first-child
						color: #85D123
						font-size: 20px
						font-weight: 600
					p.outgo
						color: #EB4342
			.right
				margin-top: 14px
				p:first-child
					font-size: 16px
					font-weight: 600
		.changeType
			font-size: 13px
			color: #8E8D8C
			line-height: 24px		
		.bottom
			padding: 30px 40px 
			background: #f8f8f8
			tbody
				background: #fff
	footer
		margin: 20px auto


.slotCommon.playOption
	.content
		width: 700px
		height: 400px

.slotCommon.playOption
	footer
		position: absolute
		bottom: 0
		left: 0
		display: block
		width: 100%
		height: 40px
		background: #fff
		border-top: 1px solid #ccc
		cursor: unset

.slotCommon.exchangeInner,.slotCommon.exchangeOuter
	footer
		width: 240px
		height: 34px
		line-height: 34px
		border-radius: 0
		margin-bottom: 20px

</style>