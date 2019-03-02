<template>
	<div class="playOption ce">
		<SlotCommon :currentStyle="slotActive" @proupsClose="proupsClose">
			<h1 slot="header">选择玩法</h1>
			<div class="main">
				<ul>
					<li v-for="(item,index) in list" :key="index">
						<el-checkbox v-model="item.isChecked" :label="item.value" @change="checkChoseOne">{{item.name}}</el-checkbox>
					</li>
				</ul>
			</div>
			<div slot="footer" class="foot">
				<div class="fl optionChose">
					<el-checkbox class="optionChose_btn" v-model="isCheckedAll" @change="checkChoseAll">全选</el-checkbox>
					<span class="optionChose_btn" @click="reverseChose">反选</span>
					<span class="optionChose_btn" @click="emptyChose">清空</span>
				</div>
				<div class="fr popupChose">
					<span class="optionChose_btn" @click="proupsClose">取消</span>
					<span class="optionChose_btn sure" @click="sureOption">确定</span>
				</div>
			</div>
		</SlotCommon>
	</div>
</template>

<script>
import { mapGetters , mapMutations , mapActions } from 'vuex'
import SlotCommon from './slotCommon'
import { messageOption } from './toolFunction'
export default {
	name: 'playOption',
	data(){
		return {
			slotActive: "playOption",
			isCheckedAll: true,
			choseList: [],
			list: [],
		}
	},
	created(){
		console.log(this.lotteryCode);
		if(this.lotteryCode == "") {
			this.$emit("closePlayOptionPopup");return;
		};
		this.m_setPlayOption(this.lotteryCode);
		this.list = this.listState;
	},
	methods: {
		proupsClose(){
			this.$emit("closePlayOptionPopup");
		},
		reverseChose(){
			let con = 0;
			for(let i = 0; i < this.list.length; i++){
				if(this.list[i].isChecked){
					this.list[i].isChecked = false;
				}else{
					this.list[i].isChecked = true;
					con++
				}
			}
			this.isCheckedAll = con == this.list.length ? true : false;
		},
		emptyChose(){
			for(let i = 0; i < this.list.length; i++){
				this.list[i].isChecked = false;
			}
			this.isCheckedAll = false;
			this.choseList = [];
		},
	  	checkChoseOne(){
	  		this.m_setPlayOption(this.lotteryCode,false,this.list);
			let con = 0;
			for(let i = 0; i < this.list.length; i++){
				if(this.list[i].isChecked){
					con++
				}
			}
			this.isCheckedAll = con == this.list.length ? true : false;
	  	},
	  	checkChoseAll(){
	  		this.m_setPlayOption(this.lotteryCode,false,this.list);
	  		for(let i = 0; i < this.list.length; i++){
				this.list[i].isChecked = this.isCheckedAll;
			}
	  	},
	  	sureOption(){
	  		this.choseList = [];
			for(let i = 0; i < this.list.length; i++){
				if(this.list[i].isChecked){
					console.log(this.choseList);
					this.choseList.push(this.list[i].value);
					//this.choseList[i] = this.list[i].value;
				}
			}
			
	        this.choseList = this.choseList.join(";");
	        if(this.choseList == ""){
	        	this.$message(messageOption('请选择玩法！'));return;
	        }
	        this.$emit("choseResult",this.choseList);
	        this.choseList = "";
	        this.choseList = [];
		},
		...mapMutations({
			m_setPlayOption: 'm_setPlayOption'
		}),
	},
	computed: {
		...mapGetters({
			listState: 'm_setPlayOption'
		})
	},
	props: {
		playOptionList: {
			type: Array,
			default: function(){
				return []
			}
		},
		lotteryCode: {
			type: String,
			default: ''
		},
	},
	components: {
		SlotCommon
	},
	
}
</script>

<style lang="sass" scoped>
@import '~common/sass/variable'
.main
	height: 318px
	padding: 20px 10px 20px 20px
	overflow-y: auto
	box-sizing: border-box
	ul
		li
			float: left
			width: 150px
			margin: 0 10px 10px 0
.foot
	padding: 4px 10px 0 10px
	span.optionChose_btn
		display: inline-block
		width: 70px
		height: 24px
		line-height: 24px
		margin-right: 10px
		border: 1px solid #ccc
		text-align: center
		border-radius: 4px
		color: #333
		font-size: 13px
		cursor: pointer
	.optionChose
		span
			
	.popupChose
		span.sure
			background: $color_theme
			color: #fff

</style>


