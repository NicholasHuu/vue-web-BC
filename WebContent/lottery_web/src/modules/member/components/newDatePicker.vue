<template>
	<div class="date-picker disin">
		<DatePicker @change="changeStartDate"  v-model="startValue" type="date" placeholder="开始日期" value-format="yyyy-MM-dd 00:00:00"></DatePicker>
		~
		<DatePicker @change="changeEndDate"  v-model="endValue" type="date" placeholder="结束日期" value-format="yyyy-MM-dd 23:59:59"></DatePicker>
	</div>
</template>

<script>
import { DatePicker } from 'element-ui'
import { format } from "common/js/utils"
import { messageOption } from './toolFunction'
export default {
	name: 'newDatePicker',
	props: {
		defaultDate: {
			type: Object,
			default: function(){
				return {
					start: '',
					end: '',
				}
			}
		}
	},
	data(){
		return {
			startValue: "",
			endValue: "",
			date: {
				start: "",
				end: "",
			},
		}
	},
	created(){
		this.initialDate();
	},
	methods: {
		initialDate(){
			if(this.defaultDate){
				this.startValue = this.defaultDate.start ? this.defaultDate.start : "";
				this.endValue = this.defaultDate.end ? this.defaultDate.end : "";
				this.date.start = this.defaultDate.start ? this.defaultDate.start : "";
				this.date.end = this.defaultDate.end ? this.defaultDate.end : "";
			}
		},
		changeStartDate(startDate){
			let now = new Date();
			if(startDate >  now.Format('yyyy-MM-dd HH:mm:ss')){
				this.startValue = "";
				this.$message(messageOption('开始日期不能大于今天'));
				return;
			}
			if(this.date.end && startDate > this.date.end){
				this.startValue = "";
				this.$message(messageOption('开始日期大于结束日期，请重新选择日期'));
				return;
			}
			this.date.start = startDate;
			this.changeDate(this.date);
		},
		changeEndDate(endDate){
			let now = new Date();
			let day = now.getTime();
			let dayDate = now.getDate();
			let endDay = new Date(endDate);
			let endDayDate = endDay.getDate();
			endDay = endDay.getTime();
			if(dayDate != endDayDate){
				if(endDay > day){
					this.endValue = "";
					this.$message(messageOption('结束日期不能大于今天'));
					return;
				}
				if(this.date.start && endDate < this.date.start){
					this.endValue = "";
					this.$message(messageOption('开始日期大于结束日期，请重新选择日期'));
					return;
				}
			}
			this.date.end = endDate;
			this.changeDate(this.date);
		},
		changeDate(date){
			date.start = date.start == null ? "" : date.start;
			date.end = date.end == null ? "" : date.end;
			this.$emit('ChangeDateValue',date.start,date.end)
		},
		message(msg){
			let option = {
				type: "info",
		        showClose: false,
		        customClass: "g_messageTips",
		        message: msg,
		        duration: 1000,
		        center: true
			};
			this.$message(option);
		}
	},
	watch: {
	  	defaultDate: {
		    handler() {
		      this.initialDate()
		    },
		    // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
		    immediate: true,
		    deep: true
	    },
		// defaultDate: function(){
		// 	console.log("change");
		// 	this.initialDate()
		// }
	},
	components: {
		DatePicker
	},

}
</script>


<style lang="sass" >

</style>


