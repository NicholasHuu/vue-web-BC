webpackJsonp([19],{EUT5:function(e,t){},UYEO:function(e,t){},hK87:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("Dd8w"),i=s.n(a),n=s("8lCg"),o=(s("I4nB"),s("+BTi"),s("STLj")),l=s.n(o),r=(s("cDSy"),s("e0Bm")),c=s.n(r),d=s("fdFc"),g=s("NYxO"),m=s("Q4oj"),v=s("zbwn"),u=s("p4UF"),_=s("HENB"),h=s("T452"),p={name:"messageManage",data:function(){return{totalPage:0,totalNumber:0,count:0,re_messageList:{status:"",pageLimit:0,currentPage:1},list:[],setShowOption:[{value:"",label:"全部显示"},{value:0,label:"显示已读"},{value:1,label:"显示未读"}],defaultShowOption:"",isCheckedAll:!1,deleteMessageIdList:[],slotActive:"",messageRecord:{list:[],title:""},messageId:"",re_sendMessage:{content:"",groupKey:""},re_addMessage:{type:"",title:"",receiver:"",content:""},intervalName:null}},created:function(){this.re_messageList.pageLimit=this.set_defaultPageLimit,this.getMessageList(this.re_messageList,!0)},destroyed:function(){clearInterval(this.intervalName),this.intervalName=null},methods:i()({getMessageCount:function(){var e=this;Object(m.J)().then(function(t){e.count=t.datas.messageCount})},getMessageList:function(e,t){var s=this;Object(m.L)(e).then(function(e){e.datas.resultList.forEach(function(e){s.$set(e,"isChecked",s.isCheckedAll)}),s.totalNumber=""!=e.datas.totalRows?e.datas.totalRows:0,s.totalPage=""!=e.datas.totalPages?e.datas.totalPages:0,s.list=e.datas.resultList})},getMessageDetail:function(e){var t=this;Object(m.I)(this.messageId).then(function(s){s.errorCode==h.a?(t.messageRecord.list=s.datas.resultList,e&&e()):t.$message(Object(u.e)(s.msg))})},messageDialogue:function(e,t,s,a){var i=this;this.messageId=e,this.getMessageDetail(function(){i.slotActive=a,i.messageRecord.title=t,i.re_sendMessage.groupKey=s,i.getMessageList(i.re_messageList,!1)}),this.intervalName=setInterval(this.getMessageDetail,4e3),this.re_m_messageCount()},sendMessage:function(){var e=this;""!=this.re_sendMessage.content?(this.re_sendMessage.content=Object(u.g)(this.re_sendMessage.content,"content"),Object(m.M)(this.re_sendMessage).then(function(t){e.$message(Object(u.e)(t.msg)),t.errorCode==h.a&&(e.re_sendMessage.content="",e.getMessageDetail(),e.getMessageList(e.re_messageList,!1))})):this.$message(Object(u.e)("请填写消息！"))},checkChose:function(){for(var e=0,t=0;t<this.list.length;t++)this.list[t].isChecked&&e++;this.isCheckedAll=e==this.list.length},checkChoseAll:function(){for(var e=0;e<this.list.length;e++)this.list[e].isChecked=this.isCheckedAll},deleteMessage:function(){var e=this;this.deleteMessageIdList=[];for(var t=0;t<this.list.length;t++)this.list[t].isChecked&&this.deleteMessageIdList.push(this.list[t].id);this.deleteMessageIdList=this.deleteMessageIdList.join(";"),""!=this.deleteMessageIdList?Object(m.K)(this.deleteMessageIdList).then(function(t){e.$message(Object(u.e)(t.msg)),t.errorCode==h.a&&(e.getMessageList(e.re_messageList,!0),e.re_m_messageCount())}):this.$message(Object(u.e)("请选择需要删除的消息！"))},proupsClose:function(){this.slotActive="",Object(d.a)(this.re_addMessage),clearInterval(this.intervalName),this.intervalName=null},contactSomeone:function(e,t){this.re_addMessage.type=e,this.re_addMessage.receiver=0==e?"上级":"",this.slotActive=t},siteMessageSend:function(){var e=this;""!=this.re_addMessage.title&&""!=this.re_addMessage.receiver&&""!=this.re_addMessage.content?(this.re_addMessage.title=Object(u.g)(this.re_addMessage.title,"title"),this.re_addMessage.content=Object(u.g)(this.re_addMessage.content,"content"),Object(m.H)(this.re_addMessage).then(function(t){e.$message(Object(u.e)(t.msg)),t.errorCode==h.a&&(e.re_addMessage.title="",e.re_addMessage.content="",e.slotActive="",e.getMessageList(e.re_messageList,!0))})):this.$message(Object(u.e)("不能有空项！"))},callPage:function(e){this.re_messageList.currentPage=e.currentPage,this.re_messageList.pageLimit=e.pageLimit,this.getMessageList(this.re_messageList,!0)}},Object(g.b)(["re_m_messageCount"])),computed:i()({},Object(g.c)({memberInfo:"m_memberInfo",set_defaultPageLimit:"set_defaultPageLimit"})),components:{Select:c.a,Option:l.a,SlotCommon:v.a,PageOption:_.a},watch:{"messageRecord.list":function(){this.$nextTick(function(){document.getElementById("inner").scrollTop=document.getElementById("inner").scrollHeight})}}},f={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"message-manage"},[s("div",{staticClass:"select-zone"},[s("ul",{staticClass:"clearfix"},[s("li",[s("el-checkbox",{on:{change:e.checkChoseAll},model:{value:e.isCheckedAll,callback:function(t){e.isCheckedAll=t},expression:"isCheckedAll"}},[e._v("全选")])],1),e._v(" "),s("li",[s("Select",{attrs:{placeholder:"请选择"},on:{change:function(t){e.re_messageList.status=e.defaultShowOption,e.re_messageList.currentPage=1,e.getMessageList(e.re_messageList)}},model:{value:e.defaultShowOption,callback:function(t){e.defaultShowOption=t},expression:"defaultShowOption"}},e._l(e.setShowOption,function(e){return s("Option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),s("li",[s("span",{staticClass:"btn btn_style deleteBtn",on:{click:e.deleteMessage}},[e._v("删 除")])]),e._v(" "),s("li",{staticClass:"contact_btn"},[s("span",{staticClass:"btn btn_style",on:{click:function(t){e.contactSomeone(0,"contactSomeone")}}},[e._v("联系上级")]),e._v(" "),1==e.memberInfo.isAgent?s("span",{staticClass:"btn btn_style",on:{click:function(t){e.contactSomeone(1,"contactSomeone")}}},[e._v("联系下级")]):e._e()])])]),e._v(" "),s("div",{staticClass:"messageList",class:{noMessage:!e.list.length}},[s("table",[e._m(0),e._v(" "),s("tbody",e._l(e.list,function(t,a){return e.list.length?s("tr",{key:a,class:{noRead:1==t.status}},[s("td",[s("el-checkbox",{on:{change:e.checkChose},model:{value:t.isChecked,callback:function(s){e.$set(t,"isChecked",s)},expression:"item.isChecked"}})],1),e._v(" "),s("td",[s("span",{staticClass:"style_hidden cursor",on:{click:function(s){e.messageDialogue(t.id,t.title,t.groupKey,"messageRecord")}}},[e._v(e._s(t.title))])]),e._v(" "),s("td",{staticClass:"messageContent"},[s("span",{staticClass:"text_hidden cursor",on:{click:function(s){e.messageDialogue(t.id,t.title,t.groupKey,"messageRecord")}}},[e._v(e._s(t.newMessage))])]),e._v(" "),s("td",[e._v(e._s(t.sender))]),e._v(" "),s("td",[e._v(e._s(t.messageTime))]),e._v(" "),s("td",[e._v(e._s(t.receiver))])]):e._e()}))])]),e._v(" "),s("div",{staticClass:"pageSwitch",staticStyle:{background:"#fff"}},[s("PageOption",{attrs:{totalNumber:e.totalNumber,totalPage:e.totalPage,curPage:e.re_messageList.currentPage},on:{callPage:e.callPage}})],1),e._v(" "),""!=e.slotActive?s("div",{staticClass:"proups"},["messageRecord"==e.slotActive?s("SlotCommon",{attrs:{currentStyle:e.slotActive},on:{proupsClose:e.proupsClose}},[s("h1",{attrs:{slot:"header"},slot:"header"},[e._v(e._s(e.messageRecord.title))]),e._v(" "),s("div",{staticClass:"main"},[s("div",{staticClass:"inner",attrs:{id:"inner"}},e._l(e.messageRecord.list,function(t,a){return s("div",{key:a,staticClass:"msg_item"},["我"==t.senderSimple?s("div",{staticClass:"me"},[s("div",{staticClass:"msg_time"},[e._v(e._s(t.messageTimeLong.substring(5).substr(0,11)))]),e._v(" "),s("div",{staticClass:"msg_content"},[e._v(e._s(t.message))]),e._v(" "),s("div",{staticClass:"msg_name"},[e._v(e._s(t.senderSimple))])]):s("div",[s("div",{staticClass:"msg_name"},[e._v(e._s(t.senderSimple))]),e._v(" "),s("div",{staticClass:"msg_content"},[e._v(e._s(t.message))]),e._v(" "),s("div",{staticClass:"msg_time"},[e._v(e._s(t.messageTimeLong.substring(5).substr(0,11)))])])])}))]),e._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.re_sendMessage.content,expression:"re_sendMessage.content"}],staticClass:"user-name",attrs:{type:"text"},domProps:{value:e.re_sendMessage.content},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.sendMessage(t):null},input:function(t){t.target.composing||e.$set(e.re_sendMessage,"content",t.target.value)}}}),e._v(" "),s("p",{staticClass:"btn",on:{click:e.sendMessage}},[e._v("发 送")])])]):e._e(),e._v(" "),"contactSomeone"==e.slotActive?s("SlotCommon",{attrs:{currentStyle:e.slotActive},on:{proupsClose:e.proupsClose}},[s("h1",{attrs:{slot:"header"},slot:"header"},[e._v("发送消息")]),e._v(" "),s("div",{staticClass:"main"},[s("div",{staticClass:"item clearfix"},[s("div",{staticClass:"left"},[e._v("接收人: ")]),e._v(" "),s("div",{staticClass:"right"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.re_addMessage.receiver,expression:"re_addMessage.receiver",modifiers:{trim:!0}}],attrs:{type:"text",disabled:0==e.re_addMessage.type,placeholder:"请输入接收人用户名"},domProps:{value:e.re_addMessage.receiver},on:{input:function(t){t.target.composing||e.$set(e.re_addMessage,"receiver",t.target.value.trim())},blur:function(t){e.$forceUpdate()}}})])]),e._v(" "),s("div",{staticClass:"item clearfix"},[s("div",{staticClass:"left"},[e._v("标题: ")]),e._v(" "),s("div",{staticClass:"right"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.re_addMessage.title,expression:"re_addMessage.title"}],attrs:{type:"text",value:"",placeholder:"请输入消息标题，最多20个字符"},domProps:{value:e.re_addMessage.title},on:{input:function(t){t.target.composing||e.$set(e.re_addMessage,"title",t.target.value)}}})])]),e._v(" "),s("div",{staticClass:"item clearfix"},[s("div",{staticClass:"left"},[e._v("备注: ")]),e._v(" "),s("div",{staticClass:"right"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.re_addMessage.content,expression:"re_addMessage.content"}],attrs:{name:"",id:"",cols:"30",rows:"10",placeholder:"请输入消息内容，最多80个字符"},domProps:{value:e.re_addMessage.content},on:{input:function(t){t.target.composing||e.$set(e.re_addMessage,"content",t.target.value)}}})])])]),e._v(" "),s("p",{attrs:{slot:"footer"},on:{click:e.siteMessageSend},slot:"footer"},[e._v("发 送")])]):e._e()],1):e._e()])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("thead",[s("tr",[s("td",{attrs:{width:"40"}}),e._v(" "),s("td",{attrs:{width:"100"}},[e._v("标题")]),e._v(" "),s("td",[e._v("最新消息")]),e._v(" "),s("td",{attrs:{width:"80"}},[e._v("发送人")]),e._v(" "),s("td",{attrs:{width:"150"}},[e._v("时间")]),e._v(" "),s("td",{attrs:{width:"80"}},[e._v("接收人")])])])}]};var C=s("VU/8")(p,f,!1,function(e){s("UYEO")},"data-v-9eada794",null).exports,M={name:"message",data:function(){return{messageTitle:["消息管理"],activeIndex:0,pageIndex:0}},created:function(){this.pageIndex=1*this.$route.params.pageIndex},methods:i()({navSwitch:function(e){this.changePage(e),this.$router.push({path:"/member/message/"+e})}},Object(g.d)({changePage:"m_gameRecord_changeIndex"})),watch:{$route:function(){this.pageIndex=1*this.$route.params.pageIndex}},components:{HeaderNav:n.a,MessageManage:C}},b={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"message "},[t("HeaderNav",{attrs:{data:this.messageTitle,currentIndex:this.pageIndex},on:{navSwitch:this.navSwitch}}),this._v(" "),0==this.pageIndex?t("MessageManage"):this._e()],1)},staticRenderFns:[]};var L=s("VU/8")(M,b,!1,function(e){s("EUT5")},"data-v-502631fd",null);t.default=L.exports}});