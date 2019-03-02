<template>
	<div class="dateOptionSelect disin">
		<div class="disin" v-if="dateChoseStatus">
			<NewDatePicker @ChangeDateValue="changeDate" :defaultDate="defaultDateVar"></NewDatePicker>&nbsp;&nbsp;&nbsp;
		</div>
		
		<p class="disin" v-if="dateChoseStatus">
			<span :class="['btn',{'active': diaryCheckStatus == 'today'}]" @click="diaryCheck('today')">今日</span>
			<span :class="['btn',{'active': diaryCheckStatus == 'yesterday'}]" @click="diaryCheck('yesterday')">昨日</span>
			<span :class="['btn',{'active': diaryCheckStatus == 'week'}]" @click="diaryCheck('week')">一周内</span>
			<span :class="['btn',{'active': diaryCheckStatus == 'curMonth'}]" @click="diaryCheck('curMonth')">本月</span>
		</p>
		
		<p class="disin" v-if="!dateChoseStatus">

			<span v-for="(item,index) in m_dateChoseList" :key="index" :class="['btn',{'active': diaryCheckStatus == item.label}]" @click="diaryCheck(item.label)">{{item.value}}天以上</span>

			<!-- <span :class="['btn',{'active': diaryCheckStatus == 'date_1'}]" @click="diaryCheck('date_1')">1天以上</span>
			<span :class="['btn',{'active': diaryCheckStatus == 'date_3'}]" @click="diaryCheck('date_3')">3天以上</span>
			<span :class="['btn',{'active': diaryCheckStatus == 'date_7'}]" @click="diaryCheck('date_7')">7天以上</span>
			<span :class="['btn',{'active': diaryCheckStatus == 'date_30'}]" @click="diaryCheck('date_30')">30天以上</span> -->
		</p>

	</div>
</template>

<script>
import NewDatePicker from './newDatePicker'
import { format } from "common/js/utils"
import { messageOption , getDateDruing } from './toolFunction'
import { mapGetters, mapMutations, mapActions} from 'vuex'
export default {
	name: 'dateOptionSelect',
	data(){
		return {
			diaryCheckStatus: "today",
			defaultDateVar: {},
			dateChoseList: {},
			dateChoseStatus: true,
		}
	},
	props: ['setDefault','pageType'],
	created(){
		if(this.pageType && this.pageType == 'noneBetList'){
			this.dateChoseStatus = false;
			this.dateChoseList = getDateDruing("zone",this.m_dateChoseList);
			this.diaryCheckStatus = "date_1";
		}else{
			this.dateChoseList = getDateDruing();
			this.dateChoseStatus = true;
		}
		this.initializeDate(this.diaryCheckStatus);
	},
	methods: {
		initializeDate(druing){
			if(this.setDefault && Object.keys(this.setDefault).length != 0){
				this.defaultDateVar = this.setDefault;
				this.showCheck(this.defaultDateVar.start,this.defaultDateVar.end);
			}else{
				this.defaultDateVar = this.dateChoseList[druing];
			}
 			this.$emit("runDateOption",this.defaultDateVar);
 		},
		diaryCheck(type){
			this.diaryCheckStatus = type;
			this.initializeDate(type);
		},
		showCheck(start,end){
			if(start == this.dateChoseList.today.start && end == this.dateChoseList.today.end){
				this.diaryCheckStatus = 'today';
			}
			if(start == this.dateChoseList.week.start && end == this.dateChoseList.week.end){
				this.diaryCheckStatus = 'week';
			}
			if(start == this.dateChoseList.curMonth.start && end == this.dateChoseList.curMonth.end){
				this.diaryCheckStatus = 'curMonth';
			}
		},
		changeDate(start,end){
			this.diaryCheckStatus = '';
			this.showCheck(start,end);
			this.defaultDateVar = {
				'start': start,
				'end': end,
			}
			this.$emit("ChangeDateValue",start,end);
		},
	},
	computed: {
		...mapGetters({
			m_dateChoseList: 'm_dateChoseList'
		})
	},
	components: {
		NewDatePicker
	},

}
</script>


<style lang="sass" >
.dateOptionSelect
	.btn
		display: inline-block
		width: 60px
		height: 28px
		line-height: 28px
		margin-right: 12px
		border: 1px solid #ccc
		border-radius: 4px
		color: #333
		text-align: center
	.btn.active
		background: #feebeb
		border: 1px solid #C12727
		color: #C12727
</style>


