<template>
  <div class="betDetailPopup">
      <div  class="bet-detail popup-box">
			<div class="popup-cover-shadow"></div>
			<div class="popup-content">
				<div class="popup-header">
					<div class="bet-detail-title fl">详情</div>
					<div class="popup-close-btn fr" @click="closePopup"><i class="el-icon-close"></i></div>
				</div>
				<div class="popup-detail">
					<div class="bet-detail-header">
						<div class="left fl">
							<div class="left-name clearfix">
								<div class="fl logo_wrapper"><img :src="betDetailTable.logo" alt=""></div>
								<h1>{{betDetailTable.lotteryName}}<p>第{{betDetailTable.betQishu}}期</p></h1>
							</div>
							<div class="left-date">
								<p>投注时间: <span>{{betDetailTable.betTime}}</span></p>
								<p>方案编号: <span>{{betDetailTable.schemeNumbe}}</span></p>
							</div>
						</div>
						<div class="right fr">
							<ul class="clearfix">
								<li>
									<h3>投注金额</h3>
									<p class="g_color_theme">{{betDetailTable.betMoneyValue}}</p>
								</li>
								<li>
									<h3>中奖金额</h3>
									<p>{{betDetailTable.betWinValue}}</p>
								</li>
								<li>
									<h3>返点金额</h3>
									<p>{{betDetailTable.betBack}}</p>
								</li>
							</ul>
							<div class="bet-content">
								<p>投注内容</p>
								<div class="bet-content-textarea">{{betDetailTable.content}}</div>
							</div>
						</div>
					</div>

					<div class="bet-detail-table">
						<table>
							<thead>
								<tr>
									<td>玩法</td>
									<td>注数</td>
									<td>倍数</td>
									<td>投注金额</td>
									<td>金额类型</td>
									<td>模式</td>
									<td width="300">开奖号码</td>
									<td>状态</td>
									<td>操作</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{{betDetailTable.gameName}}</td>
									<td>{{betDetailTable.noteNuber}}注</td>
									<td>{{betDetailTable.multipe}}倍</td>
									<td>{{betDetailTable.betMoney}}</td>
									<td>{{betDetailTable.model}}</td>
									<td>{{betDetailTable.remarks}}</td>
									<td>{{betDetailTable.winNumber}}</td>
									<td :class="{prizeColor: betDetailTable.betStatusValue == '2'}">{{betDetailTable.betStatus}}</td>
									<td class="btn chedian" v-show="betDetailTable.stopOrderFlag == 1" @click.stop="orderStop(betDetailTable)">撤单</td>
									<td v-show="betDetailTable.stopOrderFlag != 1"></td>
								</tr>
							</tbody>
						</table>
					</div>
					
					<div class="btn-sure btn" @click="closePopup">关 闭</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ERR_OK } from "api/config";

export default {
  name: "betDetailPopup",
  props: {
    betDetailTable: {
      type: [Object],
      default: {}
    }
  },
  created() {},
  methods: {
    ...mapActions(["l_lotteryOrderStop"]),

    closePopup() {
      this.$emit("betClosePopup");
    },

    //  撤单
    orderStop(item) {
      this.l_lotteryOrderStop(item.id).then(res => {
        if (res && res.errorCode == ERR_OK) {
          item.betStatus = "停追撤单";
          this.$alert("撤单成功！", "提示", {
            confirmButtonText: "确定",
            type: "success",
            center: true,
						lockScroll: false
          });
        } else {
          this.$alert("撤单失败请重试<br>" + res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error",
            dangerouslyUseHTMLString: true,
            center: true,
						lockScroll: false
          });
        }
      });
    }
  }
};
</script>



<style lang="sass" scoped>
.logo_wrapper
	display: inline-block
	width: 80px
	height: 80px
	img
		width: 100%
		height: 100%
.popup-content
	width: 1000px
	height: 500px
	box-sizing: border-box
	background: #fff
.popup-header
	height: 46px
	line-height: 46px
	padding: 0 20px
	background: #C12727
	color: #fff
	font-weight: 700
	.el-icon-error
		margin: 10px -7px 0 0
		font-size: 24px
.popup-detail
	padding: 20px
	.bet-detail-header
		height: 220px
		padding: 20px
		background: #F9F9F9
		box-sizing: border-box
		font-size: 12px
		.left
			.left-name
				img
					float: left
				h1
					float: left
					line-height: 50px
					margin-left: 20px
					font-size: 18px
					p
						line-height: 14px
						font-size: 12px
			.left-date
				line-height: 28px
				margin: 5px 0 0 20px
				color: #666
		.right
			&>ul
				width: 600px
				li
					float: left
					width: 200px
					text-align: center
					h3
						font-size: 13px
						color:#666
					p
						line-height: 38px
						font-size: 24px
		.bet-content
			margin-top: 20px
			p
				color: #666
			.bet-content-textarea
				width: 600px
				border: 1px solid #999
				height: 80px
				font-size: 16px
				line-height: 16px
				padding: 10px
				margin-top: 10px
				overflow-y: auto
				background: #fff
				box-sizing: border-box
				word-break: break-all
	.bet-detail-table
		width: 100%
		color: #666
		font-size: 14px
		table
			width: 100%
			margin: 26px 0
			text-align: center
		td
			padding: 10px
			border: 1px solid #EBEBEB
			&.chedian
				color: #0062dc
.el-icon-close
    font-size: 28px
.prizeColor
	color: #f12	!important
</style>
