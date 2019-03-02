<template>
	<div class="bet-record">
		<div class="select-zone">
			<ul class="clearfix">
				<li><span>彩种:&nbsp;&nbsp;</span>
					<div class="disin">
						<Select v-model="defaultLotteryValue" @change="searchList.lotteryCode = defaultLotteryValue;defaultGameCode = '';searchList.gameCode = '';m_setPlayOption(defaultLotteryValue);searchList.currentPage = 1;" placeholder="请选择">
						    <Option v-for="item in lotteryAll" :key="item.value" :label="item.label" :value="item.value"></Option>
						</Select>
					</div>
				</li>
				<li><span>玩法:&nbsp;&nbsp;</span>
					<div class="disin">
						<Select v-model="defaultGameCode" @change="searchList.gameCode = defaultGameCode;searchList.currentPage = 1;" placeholder="请选择">
						    <Option v-for="item in listState" :key="item.value" :label="item.label" :value="item.value"></Option>
						</Select>
					</div>
				</li>
				<!--<li><span>玩法:&nbsp;&nbsp;</span>
					<div class="playOptionBtn btn" @click="showPlayOption">选择玩法</div>
				</li>-->
				<li><span>状态:&nbsp;&nbsp;</span>
					<div class="disin">
						<Select v-model="defaultOrderStatus" @change="searchList.status = defaultOrderStatus;" placeholder="请选择">
						    <Option v-for="item in m_lottery_order_status" :key="item.value" :label="item.label" :value="item.value"></Option>
						</Select>
					</div>
				</li>
				<li><span>用户名:&nbsp;&nbsp;</span><input class="user-name" type="text" v-model.trim="searchList.account"></li>
				<li><input type="checkbox" v-model="status" true-value="yes" false-value="no" id="contain"><label for="contain" class="lineheight-style">包含下级</label></li>
				<li><span>投注时间:&nbsp;&nbsp;</span>
					<DateOptionSelect @ChangeDateValue="changeDate" @runDateOption="runDateOption" :setDefault="setDefault"></DateOptionSelect>
				</li>
				
				<li><span class="btn-search" @click="searchList.currentPage = 1;getAllList(searchList)">搜 索</span></li>
			</ul>
		</div>
		<div class="record-list" :class="{nofound: !list.length}">
			<table>
				<thead>
					<tr>
						<td width="130">用户名</td>
						<td width="156">投注时间</td>
						<td width="110">彩种</td>
						<td width="130">玩法</td>
						<td width="120">期号</td>
						<td width="110">投注内容</td>
						<td width="85">投注金额</td>
						<td width="85">奖金</td>
						<td width="60">状态</td>
						<td width="60">操作</td>
					</tr>
				</thead>
				<tbody>
					
					<tr class="btn" v-show="list.length" v-for="(item,index) in list" :key="index" @click="lookDetail(item.id)">
						<td>{{item.userName}}</td>
						<td>{{item.betTime.substring(0,item.betTime.length-3)}}</td>
						<td>{{item.lotteryName}}</td>
						<td>{{item.gameName}}</td>
						<td>{{item.betQishu}}</td>
						<td class="bet_content" v-if="item.content.length > 20">
							{{item.content.substr(0,10)}}...
						</td>
						<td class="bet_content" v-else>{{item.content}}</td>

						<td>{{item.betMoney}}</td>
						<td :class="{prizeColor: item.statusValue == 2}">{{item.winMoney}}</td>
						<td :class="{prizeColor: item.statusValue == 2}">{{item.status}}</td>
						<td @click.stop="stopOrder(item.id)" class="member-btn-color">
							<span v-if="item.stopOrderFalg == 1">撤单</span>
							<span class="disnone">{{item.id}}</span>
						</td>
					</tr>
					<tr v-show="list.length">
						<td colspan="6">汇总小结</td>
						<td>{{count_sum.betSum_val}}</td>
						<td :class="{prizeColor:count_sum.winSum_val < 0}">{{count_sum.winSum_val}}</td>
						<td colspan="3"></td>
					</tr>
				</tbody>
			</table>
		</div>
		
		<LookBetDetail :content="lookBetDetail" :slotActive="slotActive_betDetail" @closeBetDetail="closeBetDetail"></LookBetDetail>

		<div class="pageSwitch">
			<PageOption :totalNumber="totalNumber" :totalPage="totalPage" :curPage="searchList.currentPage" @callPage="callPage"></PageOption>
		</div>

		<BetDetailPopup v-show="popupStaus" @betClosePopup="closePopup" :betDetailTable="betDetailTable"  />
	
		<PlayOption v-if="playOptionStatus" :lotteryCode="searchList.lotteryCode" @closePlayOptionPopup="closePlayOptionPopup" @choseResult="choseResult"></PlayOption>

	</div>


</template>

<script>
import { Select , Option } from 'element-ui'
import NewDatePicker from '../newDatePicker'
import PageOption from '../pageOption'
import { countArrSum , defaultDateSet , messageOption , getDateDruing } from '../toolFunction'
import { getLotteryBetList ,getLotteryBetDetail} from "api/member/memberApi"
import { ERR_OK } from "api/config"
import { mapGetters, mapMutations, mapActions} from 'vuex'
import BetDetailPopup from './detailPopup/betDetailPopup'
import SlotCommon from '../slotCommon'
import LookBetDetail from '../lookBetDetail'
import DateOptionSelect from '../dateOptionSelect'
import PlayOption from '../playOption'

export default {
	name: 'betRecord',
	data(){
		return {
			betDetailTable: {},
			defaultLotteryValue: "",
			popupStaus: false ,
		    searchList: {
		    	lotteryCode: "",
		    	startTime: "",
		    	finishTime: "",
		    	account: "",
		    	flag: 0,
		    	currentPage: 1,
		    	pageLimit: 10,
		    	gameCode: '',
		    	status: ""
		    },
		    status: '',
		    count_sum: {
		    	betSum: [],
			    winSum: [],
			    betSum_val: 0,
			    winSum_val: 0,
		    },
		    totalPage: 0,
		    totalNumber: 0,

		    lookBetDetail: "",
		    slotActive_betDetail: "",

		    defaultGameCode: "",
		    defaultOrderStatus: "",
		    playOptionStatus: false,

		    setDefault: {}
		}
	},
	created(){
		this.searchList.pageLimit = this.set_defaultPageLimit;
		this.defaultLotteryValue = this.lotteryAll.length ? this.lotteryAll[0].value : ""; //默认取第一个彩种
		this.searchList.lotteryCode = this.lotteryAll.length ? this.lotteryAll[0].value : "";
		this.searchList.account = this.m_groupUserName_forLink ? this.m_groupUserName_forLink : "";
		this.__init();
	},
	beforeDestroy(){
		this.m_setPlayOption("");
	},
	methods: {
		__init(){
			let dateChoseList = getDateDruing();
			let defaultDateVar = dateChoseList['today'];
			this.searchList.startTime = defaultDateVar.start;
			this.searchList.finishTime = defaultDateVar.end;

			if( Object.keys(this.m_date_forLink).length != 0 ){
				this.setDefault = this.m_date_forLink;
				this.searchList.startTime = this.m_date_forLink.start;
				this.searchList.finishTime = this.m_date_forLink.end;
			}
			this.getAllList(this.searchList);
		},
		// 关闭追号详情弹窗
		closePopup(){
			this.popupStaus = false;
		},
		stopOrder(id){
			this.l_lotteryOrderStop(id).then( res => {
				this.$message(messageOption(res.msg)); 
				if(res.errorCode == ERR_OK){
					this.getAllList(this.searchList);
 				}
			})
		},
		getAllList(obj){
			if(this.searchList.account != "" && !(/^[A-Za-z0-9]{4,16}$/.test(this.searchList.account)) ){
				this.searchList.account = "";
				this.$message(messageOption('请正确输入用户名(4-16位英文字母以及数字组合)'));
				return;
			}
			obj.flag = this.status === "yes" ? 1 : 0;
			getLotteryBetList(obj).then( res => {
				if(res.errorCode == ERR_OK){
					this.totalNumber = res.datas.totalRows != "" ? res.datas.totalRows : 0;
					this.totalPage = res.datas.totalPages != "" ? res.datas.totalPages : 0;
					this.count_sum.betSum = [],this.count_sum.winSum = [];
					for(let i=0;i<res.datas.resultList.length;i++){
						this.count_sum.betSum.push(res.datas.resultList[i].betMoney);
						this.count_sum.winSum.push(res.datas.resultList[i].winMoney);
					}
					this.count_sum.betSum_val = countArrSum(this.count_sum.betSum);
					this.count_sum.winSum_val = countArrSum(this.count_sum.winSum);
 					this.setBetList(res.datas);
 				}else{
					this.$message(messageOption(res.msg)); 
 				}
			});
		},
		lookDetail(id){
			console.log(id);
			getLotteryBetDetail(id).then( res => {
				if(res.errorCode == ERR_OK){
 					this.betDetailTable = res.datas;
 					this.popupStaus = !this.popupStaus
 				}else{
 					this.$message(messageOption(res.msg)); 
 				}
			});
		},
		f_lookBetDetail(content,type){
			this.lookBetDetail = content;
			this.slotActive_betDetail = type;
		},
		//玩法操作
		choseResult(str){
			this.searchList.gameCode = str;
			this.playOptionStatus = false;
			//this.getAllList(this.searchList);
		},
		showPlayOption(){
			this.playOptionStatus = true;
		},
		closePlayOptionPopup(){
			this.playOptionStatus = false;
		},
		//详情操作
		closeBetDetail(){
			this.slotActive_betDetail = "";
		},
		changeDate(start,end){
			this.searchList.startTime = start;
			this.searchList.finishTime = end;
		},
		runDateOption(obj){
			this.searchList.startTime = obj.start;
			this.searchList.finishTime = obj.end;
			//this.getAllList(this.searchList);
		},
		callPage(obj){
			this.searchList.currentPage = obj.currentPage;
			this.searchList.pageLimit = obj.pageLimit;
			this.getAllList(this.searchList);
		},
		...mapMutations({
			setBetList: 'm_lotteryRecordBetList',
			m_setPlayOption: 'm_setPlayOption'
		}),
		...mapActions([
			'l_lotteryOrderStop'
		])
	},
	watch: {
		"lotteryAll": function(){
			this.defaultLotteryValue = this.lotteryAll.length ? this.lotteryAll[0].value : "";
			this.searchList.lotteryCode = this.lotteryAll.length ? this.lotteryAll[0].value : "";
			this.getAllList(this.searchList);
		}
	},
	computed: {
		...mapGetters({
			list: 'm_lotteryRecordBetList',
			lotteryAll: 'm_lottery_menu_list',
			m_groupUserName_forLink: 'm_groupUserName_forLink',
			set_defaultPageLimit: 'set_defaultPageLimit',
			m_lottery_order_status: 'm_lottery_order_status',
			listState: 'm_setPlayOption',
			m_date_forLink: 'm_date_forLink'
		})
	},
	components: {
		Select,
		Option,
		PageOption,
		BetDetailPopup,
		LookBetDetail,
		DateOptionSelect,
		PlayOption
	},
}
</script>
<style lang='sass' scoped>
.bet-record
	position: relative
.bet_content
	// padding-left: 10px
	.lookDetail_content
		color: #499CF6
		cursor: pointer
		&:hover
			text-decoration: underline
.prizeColor
	color: #f12	!important
.nofound
	background: #eee url(../nofound.png) no-repeat center
</style>