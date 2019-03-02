<template>
	<div class="onlineSaoma payStyle">
		<div class="inner">
			
			<div class="nav" ref="nav">
				<ul>
	                <li v-for="(item,index) in list" :key="index" :class="{active: curIndex == index}" @click="switchSubItem(index)">
	                    {{item.payName}}
	                </li>
					
				</ul>
			</div>
			
			<div class="content">
				<div class="border"></div>
				<div class="item inlineForm itemHeight" ref="item">
					<ul>
						<li><span>充值金额:</span> <input class="chromeInputClearAuto"><input type="number" v-model="re_list.money" :placeholder="subItem.minMaxDes" /></li>
						<li v-show="subItem.remark"><span></span> 
							<div class="icon_notice_remark disin" style="color: #5c5c5c;">{{subItem.remark}}</div>
						</li>
						<li><span></span> <p class="btn-search btn-moditfy disin" @click="chargeBtn(re_list)">确 认</p></li>
					</ul>
				</div>

			</div>

		</div>
	</div>
</template>

<script>
import { mapGetters,mapState,mapActions } from 'vuex'
import { ERR_OK } from "api/config"
import { charge_onlineSaoma } from "api/member/memberApi"
import { messageOption } from '../toolFunction'
export default {
	name: 'onlineSaoma',
	props: {
		list: {
			type: Array,
			default: []
		}
	},
 	data() {
		return {
			curIndex: 0,
			bankList: [],	
			subItem: {},
			defaultBank: "",
			
			re_list: {
				userName: '',
				money: "",
				payType: "",
				client: 0,
				bankCode: "",
				module: ''
			},
			minMoney: 0,
			maxMoney: 0,

		}
  	},
 	created(){ 
		this.re_list.userName = this.global_userName;
		this.switchSubItem(0);
 	},
 	methods: {
 		switchSubItem(index){
 			this.curIndex = index;
 			this.subItem = this.list[index];
 			this.re_list.payType = this.list[index].payType;
 			this.re_list.module = this.list[index].module;
 			this.minMoney = this.list[index].payMinEdu;
 			this.maxMoney = this.list[index].payMaxEdu;
 		},
 		chargeBtn(item){
			if(this.re_list.money > this.maxMoney || this.re_list.money < this.minMoney){
				this.$message(messageOption('请输入'+this.minMoney+'~'+this.maxMoney+'之间的金额！'));return;
			}

			var newTab = window.open();
			var span = document.createElement("span");
			span.innerHTML="正在加载中...";
			
			newTab.window.document.body.appendChild(span); 

 			charge_onlineSaoma(item).then( res => {
 				this.$message(messageOption(res.msg));
 				if(res.errorCode == ERR_OK){
 					this.re_list.money = "";
 					let url = '/lottery/user/goPayCenter' + '?pay_url='+res.datas.pay_url + '&sendParams=' + res.datas.sendParams;
 					newTab.location.href = url;
 				}
 			})
 		},
	},
	computed: {
		...mapGetters({
			'global_userName': 'global_userName',
		})
	},
	components: {

	},
	mounted(){
		if(this.list.length > 14){
			let navHeight = this.$refs.nav.scrollHeight
			this.$refs.item.style.height = navHeight - 2 + 'px';
		}
	},

}
</script>

<style lang="sass" scoped>

</style>


