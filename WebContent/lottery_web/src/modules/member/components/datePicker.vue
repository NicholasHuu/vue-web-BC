<template>
	<div class="date-picker">
		<DatePicker @change="changeDate" v-model="value" type="date" placeholder="选择日期"></DatePicker>
		
	</div>
</template>

<script>
import { DatePicker } from 'element-ui'

export default {
	name: 'datePicker',
	data(){
		return {
			value: this.data
		}
	},
	props:{
		data: {
			type: String,
			default: ""
		}
	},
	methods: {
		changeDate(val){
			this.$emit('selectChangeValue',val)
		}
	},
	components: {
		DatePicker
	},

}
</script>


<style lang="sass" >

</style>


