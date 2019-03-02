<template>
	<div class="message-manage">
		<div class="select-zone">
			<ul class="clearfix">
				<li>
					<el-checkbox v-model="isCheckedAll" @change="checkChoseAll">全选</el-checkbox>
				</li>
				<li>
					<Select v-model="defaultShowOption" @change="re_messageList.status = defaultShowOption;re_messageList.currentPage = 1;getMessageList(re_messageList)" placeholder="请选择">
					    <Option v-for="item in setShowOption" :key="item.value" :label="item.label" :value="item.value"></Option>
					</Select>
				</li>
				<li><span class="btn btn_style deleteBtn" @click="deleteMessage">删 除</span></li>
				<li class="contact_btn">
					<span class="btn btn_style" @click="contactSomeone(0,'contactSomeone')">联系上级</span>
					<span v-if="memberInfo.isAgent == 1" class="btn btn_style" @click="contactSomeone(1,'contactSomeone')">联系下级</span>
				</li>
			</ul>
		</div>
	  	<div class="messageList" :class="{'noMessage': !list.length}">
	  		<table>
	  			<thead>
	  				<tr>
	  					<td width="40"></td>
	  					<td width="100">标题</td>
	  					<td>最新消息</td>
	  					<td width="80">发送人</td>
	  					<td width="150">时间</td>
	  					<td width="80">接收人</td>
	  				</tr>
	  			</thead>
	  			<tbody>
	  				<tr v-if="list.length" v-for="(item,index) in list" :key="index" :class="{'noRead': item.status == 1}">
	  					<td><el-checkbox v-model="item.isChecked" @change="checkChose"></el-checkbox></td>
	  					<td><span class="style_hidden cursor" @click="messageDialogue(item.id,item.title,item.groupKey,'messageRecord')">{{item.title}}</span></td>
	  					<td class="messageContent"><span class="text_hidden cursor" @click="messageDialogue(item.id,item.title,item.groupKey,'messageRecord')">{{item.newMessage}}</span></td>
	  					<td>{{item.sender}}</td>
	  					<td>{{item.messageTime}}</td>
	  					<td>{{item.receiver}}</td>
	  				</tr>
	  			</tbody>
	  		</table>
	  	</div>

	  	<div class="pageSwitch" style="background: #fff;">
			<PageOption :totalNumber="totalNumber" :totalPage="totalPage" :curPage="re_messageList.currentPage" @callPage="callPage"></PageOption>
		</div>

	  	<div class="proups" v-if="slotActive != ''">
			<SlotCommon v-if="slotActive == 'messageRecord'" :currentStyle="slotActive" @proupsClose="proupsClose">
				<h1 slot="header">{{messageRecord.title}}</h1>
				<div class="main">
					<div class="inner" id="inner">
						<div class="msg_item" v-for="(item,index) in messageRecord.list" :key="index">
							<div v-if="item.senderSimple == '我'" class="me">
								<div class="msg_time">{{item.messageTimeLong.substring(5).substr(0,11)}}</div>
								<div class="msg_content">{{item.message}}</div>
								<div class="msg_name">{{item.senderSimple}}</div>
							</div>
							<div v-else>
							  	<div class="msg_name">{{item.senderSimple}}</div>
							  	<div class="msg_content">{{item.message}}</div>
							  	<div class="msg_time">{{item.messageTimeLong.substring(5).substr(0,11)}}</div>
							</div>

						</div>
					</div>
				</div>
				<div slot="footer">
					<input class="user-name" v-on:keyup.enter="sendMessage" type="text" v-model="re_sendMessage.content">
					<p class="btn" @click="sendMessage">发 送</p>
				</div>
			</SlotCommon>

			<SlotCommon v-if="slotActive == 'contactSomeone'" :currentStyle="slotActive" @proupsClose="proupsClose">
				<h1 slot="header">发送消息</h1>
				<div class="main">
					<div class="item clearfix">
						<div class="left">接收人: </div>
						<div class="right"><input type="text" v-model.trim="re_addMessage.receiver" :disabled="re_addMessage.type == 0"  placeholder="请输入接收人用户名" /></div>
					</div>
					<div class="item clearfix">
						<div class="left">标题: </div>
						<div class="right"><input type="text" v-model="re_addMessage.title" value="" placeholder="请输入消息标题，最多20个字符" /></div>
					</div>
					<div class="item clearfix">
						<div class="left">备注: </div>
						<div class="right"><textarea name="" v-model="re_addMessage.content" id="" cols="30" rows="10" placeholder="请输入消息内容，最多80个字符"></textarea></div>
					</div>
				</div>
				<p slot="footer" @click="siteMessageSend">发 送</p>
			</SlotCommon>
		</div>

	</div>
</template>

<script>
import { Select , Option } from 'element-ui'
import { verifyNotNull , clearObject } from 'common/js/utils'
import { mapGetters, mapMutations , mapActions } from 'vuex'
import { 
	m_messageCount ,
	m_messageList , 
	m_messageContent , 
	m_messageUpdateGroup ,
	m_messageAddGroup,
	m_messageDeleteGroup
} from "api/member/memberApi"
import SlotCommon from '../slotCommon'
import { messageOption , re_substring } from '../toolFunction'
import PageOption from '../pageOption'
import { ERR_OK } from "api/config";

export default {
	name: "messageManage",
	data(){
		return{
			totalPage: 0,   
	    	totalNumber: 0,
			count: 0,			//未读消息数目
			re_messageList: {   //获取消息列表请求参数
				status: '',
				pageLimit: 0,
				currentPage: 1,
			},
			list: [],         //消息列表
			setShowOption: [
				{
			    	value: "",
			    	label: "全部显示"
			    },{
			    	value: 0,
			    	label: "显示已读"
			    },{
			    	value: 1,
			    	label: "显示未读"
			    }
		    ],
		    defaultShowOption: "",

		    isCheckedAll: false,
		    deleteMessageIdList: [],  //删除消息请求参数 一个为int 多个为 a;b;c;

		    slotActive: "",
		    messageRecord: {    //消息详情记录列表
		    	list: [],
		    	title: "",
		    },  
		    messageId: '',      //用于发送后重新请求数据

		    re_sendMessage: {    //发送消息请求参数
		    	content: "",
		    	groupKey: ""
		    },

		    re_addMessage: {    //上下级发送消息请求参数
		    	type: '',
				title: '',
				receiver: '',
				content: '',
		    },

		    intervalName: null,   //轮询timer
		}
	},
	created(){
		this.re_messageList.pageLimit = this.set_defaultPageLimit;
	  	this.getMessageList(this.re_messageList,true);
    },
    destroyed(){
    	clearInterval(this.intervalName);
    	this.intervalName = null;
    },
	methods: {
		//获取未读消息数
		getMessageCount(){
	  		m_messageCount().then(res => {
	  			this.count = res.datas.messageCount;
	  		})
	  	},
	  	//获取消息列表
	  	getMessageList(obj,loading){
	  		m_messageList(obj).then( res => {
	  			res.datas.resultList.forEach(item => {
		            this.$set(item, "isChecked", this.isCheckedAll);
		        });
		        this.totalNumber = res.datas.totalRows != "" ? res.datas.totalRows : 0;
				this.totalPage = res.datas.totalPages != "" ? res.datas.totalPages : 0;
	  			this.list = res.datas.resultList;
	  		})
	  	},
	  	//获取消息详情     
	  	getMessageDetail(callback){
			m_messageContent(this.messageId).then( res => {
	  			if(res.errorCode == ERR_OK){
	  				this.messageRecord.list = res.datas.resultList;
	  				// this.messageRecord.list = res.datas.resultList.reverse();
	  				if(callback)callback();
	  			}else{
	  				this.$message(messageOption(res.msg));
	  			}
	  		})
	  	},
	  	//获取对话记录
	  	messageDialogue(id,title,groupKey,type){
	  		this.messageId = id;
	  		this.getMessageDetail( () => {
	  			this.slotActive = type;
	  			this.messageRecord.title = title;
	  			this.re_sendMessage.groupKey = groupKey;
	  			this.getMessageList(this.re_messageList,false);
	  		})
	  		this.intervalName = setInterval(this.getMessageDetail, 4000);
	  		//document.body.style.overflow = "hidden";
	  		//刷新全局未读信息条数
	  		this.re_m_messageCount();
	  	},
	  	//发送消息
	  	sendMessage(){
	  		if(this.re_sendMessage.content == ""){
	  			this.$message(messageOption('请填写消息！'));return;
	  		}else{
	  			this.re_sendMessage.content = re_substring(this.re_sendMessage.content,"content");
	  		}
	  		m_messageUpdateGroup(this.re_sendMessage).then( res => {
	  			this.$message(messageOption(res.msg));
	  			if(res.errorCode == ERR_OK){
	  				this.re_sendMessage.content = "";
	  				this.getMessageDetail();
	  				this.getMessageList(this.re_messageList,false);
	  			}
	  		})
	  	},
	  	//单选
	  	checkChose(){
			let con = 0;
			for(let i = 0; i < this.list.length; i++){
				if(this.list[i].isChecked){
					con++
				}
			}
			this.isCheckedAll = con == this.list.length ? true : false;/**/
	  	},
	  	//全选
	  	checkChoseAll(){
	  		for(let i = 0; i < this.list.length; i++){
				this.list[i].isChecked = this.isCheckedAll;
			}
	  	},
	  	//删除消息
	  	deleteMessage(){
	  		this.deleteMessageIdList = [];
	  		for(let i = 0; i < this.list.length; i++){
				if(this.list[i].isChecked){
					this.deleteMessageIdList.push(this.list[i].id);
				}
			}
	        this.deleteMessageIdList = this.deleteMessageIdList.join(";");
	        if(this.deleteMessageIdList == ""){
	        	this.$message(messageOption('请选择需要删除的消息！'));return;
	        }
	        m_messageDeleteGroup(this.deleteMessageIdList).then( res => {
	        	this.$message(messageOption(res.msg));
	        	if(res.errorCode == ERR_OK){
	        		this.getMessageList(this.re_messageList,true);
	        		//刷新全局未读信息条数
	  				this.re_m_messageCount();
	        	}
	        })
	  	},
	  	//关闭弹窗
	  	proupsClose(){
	  		this.slotActive = "";
	  		//this.getMessageList(this.re_messageList);
	  		clearObject(this.re_addMessage);
	  		clearInterval(this.intervalName);
	  		this.intervalName = null;
	  		//document.body.style.overflow = "auto";
	  	},
	  	//打开聊天窗口（上下级联系）
	  	contactSomeone(type,className){
	  		this.re_addMessage.type = type;
	  		this.re_addMessage.receiver = type == 0 ? "上级" : '';
	  		this.slotActive = className;
	  	},
	  	//发送消息（上下级联系）
	  	siteMessageSend(){
	  		if( this.re_addMessage.title == '' || this.re_addMessage.receiver == '' || this.re_addMessage.content == '' ){
	  			this.$message(messageOption('不能有空项！'));return;
	  		}
	  		this.re_addMessage.title = re_substring(this.re_addMessage.title,"title");
	  		this.re_addMessage.content = re_substring(this.re_addMessage.content,"content");
	  		m_messageAddGroup(this.re_addMessage).then( res => {
	  			this.$message(messageOption(res.msg));
	  			if(res.errorCode == ERR_OK){
	  				this.re_addMessage.title = "";
	  				this.re_addMessage.content = "";
	  				this.slotActive = "";
	  				this.getMessageList(this.re_messageList,true);
	  			}
	  		})
	  	},
	  	//分页组件事件
		callPage(obj){
			this.re_messageList.currentPage = obj.currentPage;
			this.re_messageList.pageLimit = obj.pageLimit;
			this.getMessageList(this.re_messageList,true);
		},
	  	...mapActions([
	      're_m_messageCount',    //查询未读消息数
	    ]),
	},
	computed:{
		...mapGetters({
			'memberInfo': 'm_memberInfo',
			'set_defaultPageLimit': 'set_defaultPageLimit'
		})
	},
	components: {
		Select,
		Option,
		SlotCommon,
		PageOption
	},
	watch: {
	    "messageRecord.list": function() {
	        this.$nextTick(() => {
	        	document.getElementById('inner').scrollTop = document.getElementById('inner').scrollHeight;
	        })
	    }
	}
}


</script>

<style lang="sass" scoped>
@import '~common/sass/variable'
.message-manage
	min-height: 400px
	background: #fff
	table
		width: 100%
		thead
			td
				font-size: 14px
		td
			padding: 8px 4px
			text-align: center
			text-overflow: ellipsis
			span
				line-height: 16px
		td.messageContent
			padding: 0 10px
			text-align: left
	.m_messageContent
		.item
			margin-bottom: 20px
	.btn_style
		display: inline-block
		width: 80px
		height: 30px
		background: #ccc
		text-align: center
		line-height: 30px
		color: #fff
		border-radius: 5px
	.deleteBtn.btn:hover
			background: $color_theme
	.contact_btn
		float: right
		margin-right: 0
		span
			margin-left: 10px
			background: #fff
			color:  $color_theme
			border: 1px solid  $color_theme
	.messageList
		position: relative
		min-height: 375px
		padding: 0 20px
		table thead
			background: #dadada !important
		.noRead
			font-weight: 600
		.style_hidden,.text_hidden
			display: inline-block
			width: 110px
			white-space: nowrap
			overflow: hidden
			text-overflow: ellipsis
		.text_hidden
			width: 250px
	.messageList.noMessage
		background: url(./nullMsg.png) no-repeat
		background-size: 80px 80px
		background-position: center center
	.messageList.noMessage:after
		content: "暂时还没有信息哦~"
		position: absolute
		top: 240px
		left: 0
		right: 0
		width: 100%
		text-align: center
	.msg_item
		margin-bottom: 14px
		.msg_name,.msg_content,.msg_time
			display: inline-block
			vertical-align: middle
			font-size: 13px
		.msg_time
			color: #999
		.msg_content
			position: relative
			max-width: 200px
			line-height: 16px
			padding: 8px
			margin-left: 4px
			border: 1px solid #ccc
    		radius: 4px;
			background: #fff
			word-break: break-all
			font-size: 13px
			&:before
				content: ""
				position: absolute
				top: 50%
				left: -7px
				width: 7px
				height: 12px
				margin-top: -6px
				background: url(./arrow-l.png) no-repeat
				background-size: 100%
		.me
		    text-align: right
		    .msg_content
		    	margin-right: 4px
		    	background: #BED2FF
		    	text-align: left
		    .msg_content:before
		    	width: 0
		    .msg_content:after
		    	content: ""
		    	position: absolute
		    	top: 50%
		    	right: -7px
		    	width: 7px
		    	height: 12px
		    	margin-top: -6px
		    	background: url(./arrow-r.png) no-repeat
		    	background-size: 100%

.slotCommon.messageRecord
	.inner
		header
			height: 41px
</style>