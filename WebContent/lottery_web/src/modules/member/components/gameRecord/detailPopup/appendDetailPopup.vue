<template>
  <div class="appendDetailPopup append-temp">
      	<div class="popupBox" >
			<div class="title">
				<h1>追号详情</h1>
                <i @click="closePopup" class="btn close el-icon-close"></i>
			</div>
			<div class="content">
                <div class="header">
                   <div class="header-title clearfix">
                        <div class="fl">
                            <div class="lotts-icon">
                                <img :src="m_zhuihaoDetail.appendLottery.logo" alt="">
                            </div>
                            <div class="lotts-name box">
                                <div>{{m_zhuihaoDetail.appendLottery.lotteryName}}</div>
                            </div>
                        </div>
                        <div class="fr">
                            <div class="box list">
                                <div class="">进度</div>
                                <div class="">{{m_zhuihaoDetail.appendLottery.jingDu}}</div>
                            </div>
                            <div class="box list">
                                <div class="">已追号金额</div>
                                <div class="">{{m_zhuihaoDetail.appendLottery.traceMoney}}</div>
                            </div>
                            <div class="box list">
                                <div class="">获奖金额</div>
                                <div class="">{{m_zhuihaoDetail.appendLottery.winMoney}}</div>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        
                   </div>
                    <div class="append-lottery-detail">
                        <div>
                            <p>起始期号: <span>{{m_zhuihaoDetail.appendLottery.startBetQishu}}</span></p> 
                            <p>追号时间: <span>{{m_zhuihaoDetail.appendLottery.traceTime}}</span></p> 
                        </div>
                        <div>
                            <p>终止追号条件: <span>{{m_zhuihaoDetail.appendLottery.stopCondition}}</span></p> 
                            <p>追号编号: <span>{{m_zhuihaoDetail.appendLottery.traceNumber}}</span></p> 
                        </div> 
                    </div>
                    <div class="append-scheme">
						<div class="append-scheme-frame">
							<table>
								<thead>
									<tr>
										<td>玩法</td>
										<td style="width: 400px;">投注内容</td>
										<td>注数</td>
										<td>模式</td>
										<td>金额模式</td>
									</tr>
								</thead>
								<tr>
									<td>{{m_zhuihaoDetail.appendScheme.gameName}}</td>
									<td><div class="appendSchemeContent" style="">{{m_zhuihaoDetail.appendScheme.content}}</div></td>
									<td>{{m_zhuihaoDetail.appendScheme.noteNuber}}注</td>
									<td>{{m_zhuihaoDetail.appendLottery.bonusType}}</td>
									<td>{{m_zhuihaoDetail.appendScheme.model}}</td>
								</tr>
							</table>
						</div>
					    <div v-if="m_zhuihaoDetail.appendLottery.stopFlag == 1" class="append-stop btn-base" @click="stopAppend(m_zhuihaoDetail.appendLottery.orderNumber)">终止追号</div>
					</div>
                </div>
				<div class="listBox">
                    <table>
						<thead>
							<tr>
								<td>期号</td>
								<td>倍数</td>
								<td>金额</td>
								<td>奖金</td>
								<td>开奖号码</td>
								<td>状态</td>
								<td>操作项</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in m_zhuihaoDetail.resultList" :key="index">
								<td>{{item.betQishu}}</td>
								<td>{{item.multipe}}</td>
								<td>{{item.betmoney}}</td>
								<td>{{item.winMoney}}</td>
								<td>{{item.winNumber}}</td>
								<td :class="{prizeColor: item.statusValue == '2'}">{{item.status}}</td>
								<td width="100" class="member-btn-color btn">
                                    <span @click="lookAppendDetail(item.id)">详情</span>
                                    <span v-if="item.stopOrderFlag == 1" @click="stopOrder(item.id,item)">撤单</span>
                                    <span class="disnone"></span></td>
							</tr>
						</tbody>
					</table>
                </div>
                <div class="bottom">
                    <div class="btn-sure btn btn-base" @click="closePopup">关　闭</div>
                </div> 
			</div>
		</div>
        <BetDetailPopup v-if="popupStaus" @betClosePopup="betClosePopup" :betDetailTable="betDetailTable"  />
  </div>
</template>

<script>
import { getLotteryBetDetail , lotteryAppendStop } from "api/member/memberApi"
import { ERR_OK } from "api/config"
import BetDetailPopup from '../detailPopup/betDetailPopup'
import { mapActions } from 'vuex';
import { messageOption } from '../../toolFunction'
export default {
  name: "appendDetailPopup",
  props: {
    m_zhuihaoDetail: {
      type: Object,
      default: {
        appendLottery:{
            logo: ""
        }
      }
    },
    
  },
  data() {
    return {
      popupStaus: false,
      betDetailTable: {}
    };
  },
  created(){
    
  },
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
    betClosePopup(){
        this.popupStaus = false;
    },
    stopOrder(id,item){
        this.l_lotteryOrderStop(id).then( res => {
            this.$message(messageOption(res.msg)); 
            if(res.errorCode == ERR_OK){
                item.stopOrderFlag = 0;
            }
        })
    },
    lookAppendDetail(id) {
      getLotteryBetDetail(id).then(res => {
        if (res.errorCode == ERR_OK) {
          this.betDetailTable = res.datas;
          this.popupStaus = !this.popupStaus;
        }
      });
    },
    stopAppend(orderNumber){
        lotteryAppendStop(orderNumber).then( res => {
            this.$message(messageOption(res.msg));
            this.$emit("listReload");
            this.$emit('detailReload');
        });
    },
    ...mapActions([
        'l_lotteryOrderStop'
    ])
  },
  components:{
      BetDetailPopup
  }
};
</script>



<style lang="sass" scoped>
@import '~common/sass/variable'
@import '~common/sass/module'

.appendDetailPopup
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    background-color: rgba(0,0,0,.7)
    z-index: 9
    .popupBox
        position: fixed
        left: 0
        top: 0
        right: 0
        bottom: 0
        margin: auto
        background-color: $color_text_white
        width: 1000px
        max-height: 590px
        box-sizing: border-box
        .title
            position: relative
            height: 45px
            line-height: 45px
            background-color: $color_theme
            display: block
            justify-content: space-between
            align-items: center
            color: $color_text_white
            font-size: 18px
            font-weight: bold
            padding: 0 20px
            .close
                position: absolute
                top: 7px
                right: 10px
                font-size: $fs28
                transform: rotate(0deg)
                transition: all 300ms
                &:hover
                    transform: rotate(180deg)
        .content
            padding: 20px
            .header
                background-color: #f9f9f9
                padding: 10px 20px
                box-sizing: border-box
                .header-title
                    display: block
                    .lotts-icon
                        float: left
                        width: 74px
                        height: 74px
                        img
                            width: 100%
                            height: 100% 
                    .box
                        display: inline-block
                        line-height: 25px
                    .list
                        margin-left: 70px
                        margin-top: 14px
                        text-align: center
                        &>div:nth-of-type(1)
                            font-size: $fs14
                            color: #999999
                        &>div:nth-of-type(2)
                            font-size: 24px
                            color: $color_theme
                    .lotts-name
                        float: left
                        margin-left: 5px
                        margin-top: 24px
                        &>div:nth-of-type(1)
                            font-size: 20px
                            color: #333333
                            font-weight: bold
                        &>div:nth-of-type(2)
                            font-size: $fs14
                            color: #999999
                .append-lottery-detail
                    margin: 10px 0
                    font-size: $fs14
                    color: #999999
                    &>div 
                        
                        line-height: 25px
                        p
                            display: inline-block
                            margin: 0 15px
                .append-scheme
                    
                    .append-scheme-frame
                        display: inline-block
                        width: 710px
                        font-size: $fs14
                        thead > tr> td
                            color: #666666
                        tr td
                            color: #333
                            word-break: break-all
                    .appendSchemeContent
                        display: inline-block
                        height: 40px
                        line-height: 16px
                        padding: 0 10px
                        overflow-y: auto
                        text-align: left
                    .append-stop
                        float: right
                        width: 150px
                        height: 45px
                        background-color: $color_theme
                        line-height: 45px
                        margin-top: 52px
            .listBox
                max-height: 171px
                overflow-y: auto
                margin-top: 10px
                min-height: 160px
            .bottom
                text-align: center
                .btn-sure
                    background-color: $color_theme
                    width: 165px
                    height: 45px
                    line-height: 45px
                    font-size: $fs16
                    margin-top: 15px

.prizeColor
    color: #f12 !important
</style>
