<template>
	<div class="select-wrapper">
		<Select v-model="value" @change="select" placeholder="请选择">
		    <Option v-for="item in data" :key="item.value" :label="item.label" :value="item.value"></Option>
		</Select>
	</div>
</template>
<script>
import { Select , Option } from 'element-ui'
export default {
	name: 'selectOption',
	data(){
		return {
			value: ''
		}
	},
	props:{
		data: {
			type: [Array],
			default: function(){
				return []
			}
		},
		defaultValue: {
			type: [String],
			default: ""
		}
	},
	created(){
		console.log(this.defaultValue);	
	},
	methods: {
		select(val){
			this.$emit('selectChangeValue',val)
		}
	},
	components: {
		Select,
		Option
	},
	created(){
		
	}
}
</script>
<style lang="sass" >


</style>




