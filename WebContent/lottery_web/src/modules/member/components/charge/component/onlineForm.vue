<template>
	<div class="content">
		<div class="item inlineForm">
			<ul>
				<li><span>充值金额:</span> <input type="number" v-model="re_list.money" placeholder="请输入充值金额" /></li>
				<li v-if="subItem.bank.length"><span>选择银行:</span>
					<Select v-model="defaultBank" @change="re_list.bankCode = defaultBank" placeholder="请选择">
					    <Option v-for="itemBank in bankList" :key="itemBank.value" :label="itemBank.label" :value="itemBank.value"></Option>
					</Select>
				</li>
				<li><span></span> <p class="btn-search btn-moditfy disin" @click="charge(re_list)">确 认</p></li>
			</ul>
		</div>
	</div>
</template>

<script>
import { Select , Option } from 'element-ui'
import { mapGetters,mapState,mapActions } from 'vuex'
export default {
	name: 'onlineSaoma',
	props: {
		subItem: {
			type: Object,
			default: function(){
				return {}
			}
		},
		chargeBtn: {
			type: Function,
			default: () => {}
		}
	},
 	data() {
		return {
			bankList: [],
			defaultBank: "",

			re_list: {
				money: "",
				payType: "",
				client: 0,
				bankCode: ""
			},
		}
  	},
 	created(){
 		this.re_list.bankCode = this.subItem.bankCode ? this.subItem.bankCode : '';
 		this.re_list.payType = this.subItem.payType;
 	},
 	methods: {
 		charge(re_list){
 			this.$emit("chargeBtn",re_list);
 		}
	},
	computed: {
		...mapGetters({
			'global_userName': 'global_userName',
		})
	},
	watch: {
		"subItem": function(){
			this.re_list.payType = this.subItem.payType;
			if(this.subItem.bank.length){
				for(let i = 0; i < this.subItem.bank.length; i++){
					this.bankList[i] = {
						'value': this.subItem.bank[i].bankCode,
						'label': this.subItem.bank[i].bankName,
					}
				}
				this.defaultBank = this.subItem.bank[0].bankCode;
				this.re_list.bankCode = this.subItem.bank[0].bankCode;
			}
		}
	},
	components: {
		Select,
		Option,
	}
}
</script>

<style lang="sass" scoped>

</style>


