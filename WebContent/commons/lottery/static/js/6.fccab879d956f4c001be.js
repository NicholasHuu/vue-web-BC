webpackJsonp([6],{"A/B2":function(t,e){},FYox:function(t,e){},H9tJ:function(t,e){},Hqnb:function(t,e,a){"use strict";var s=a("Dd8w"),i=a.n(s),o=a("Q4oj"),l=a("T452"),n=a("S38H"),r=a("NYxO"),c=a("p4UF"),u={name:"appendDetailPopup",props:{m_zhuihaoDetail:{type:Object,default:{appendLottery:{logo:""}}}},data:function(){return{popupStaus:!1,betDetailTable:{}}},created:function(){},methods:i()({closePopup:function(){this.$emit("closePopup")},betClosePopup:function(){this.popupStaus=!1},stopOrder:function(t,e){var a=this;this.l_lotteryOrderStop(t).then(function(t){a.$message(Object(c.e)(t.msg)),t.errorCode==l.a&&(e.stopOrderFlag=0)})},lookAppendDetail:function(t){var e=this;Object(o.e)(t).then(function(t){t.errorCode==l.a&&(e.betDetailTable=t.datas,e.popupStaus=!e.popupStaus)})},stopAppend:function(t){var e=this;Object(o.i)(t).then(function(t){e.$message(Object(c.e)(t.msg)),e.$emit("listReload"),e.$emit("detailReload")})}},Object(r.b)(["l_lotteryOrderStop"])),components:{BetDetailPopup:n.a}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"appendDetailPopup append-temp"},[a("div",{staticClass:"popupBox"},[a("div",{staticClass:"title"},[a("h1",[t._v("追号详情")]),t._v(" "),a("i",{staticClass:"btn close el-icon-close",on:{click:t.closePopup}})]),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"header"},[a("div",{staticClass:"header-title clearfix"},[a("div",{staticClass:"fl"},[a("div",{staticClass:"lotts-icon"},[a("img",{attrs:{src:t.m_zhuihaoDetail.appendLottery.logo,alt:""}})]),t._v(" "),a("div",{staticClass:"lotts-name box"},[a("div",[t._v(t._s(t.m_zhuihaoDetail.appendLottery.lotteryName))])])]),t._v(" "),a("div",{staticClass:"fr"},[a("div",{staticClass:"box list"},[a("div",{},[t._v("进度")]),t._v(" "),a("div",{},[t._v(t._s(t.m_zhuihaoDetail.appendLottery.jingDu))])]),t._v(" "),a("div",{staticClass:"box list"},[a("div",{},[t._v("已追号金额")]),t._v(" "),a("div",{},[t._v(t._s(t.m_zhuihaoDetail.appendLottery.traceMoney))])]),t._v(" "),a("div",{staticClass:"box list"},[a("div",{},[t._v("获奖金额")]),t._v(" "),a("div",{},[t._v(t._s(t.m_zhuihaoDetail.appendLottery.winMoney))])]),t._v("\n                                   \n                        ")])]),t._v(" "),a("div",{staticClass:"append-lottery-detail"},[a("div",[a("p",[t._v("起始期号: "),a("span",[t._v(t._s(t.m_zhuihaoDetail.appendLottery.startBetQishu))])]),t._v(" "),a("p",[t._v("追号时间: "),a("span",[t._v(t._s(t.m_zhuihaoDetail.appendLottery.traceTime))])])]),t._v(" "),a("div",[a("p",[t._v("终止追号条件: "),a("span",[t._v(t._s(t.m_zhuihaoDetail.appendLottery.stopCondition))])]),t._v(" "),a("p",[t._v("追号编号: "),a("span",[t._v(t._s(t.m_zhuihaoDetail.appendLottery.traceNumber))])])])]),t._v(" "),a("div",{staticClass:"append-scheme"},[a("div",{staticClass:"append-scheme-frame"},[a("table",[t._m(0),t._v(" "),a("tr",[a("td",[t._v(t._s(t.m_zhuihaoDetail.appendScheme.gameName))]),t._v(" "),a("td",[a("div",{staticClass:"appendSchemeContent"},[t._v(t._s(t.m_zhuihaoDetail.appendScheme.content))])]),t._v(" "),a("td",[t._v(t._s(t.m_zhuihaoDetail.appendScheme.noteNuber)+"注")]),t._v(" "),a("td",[t._v(t._s(t.m_zhuihaoDetail.appendLottery.bonusType))]),t._v(" "),a("td",[t._v(t._s(t.m_zhuihaoDetail.appendScheme.model))])])])]),t._v(" "),1==t.m_zhuihaoDetail.appendLottery.stopFlag?a("div",{staticClass:"append-stop btn-base",on:{click:function(e){t.stopAppend(t.m_zhuihaoDetail.appendLottery.orderNumber)}}},[t._v("终止追号")]):t._e()])]),t._v(" "),a("div",{staticClass:"listBox"},[a("table",[t._m(1),t._v(" "),a("tbody",t._l(t.m_zhuihaoDetail.resultList,function(e,s){return a("tr",{key:s},[a("td",[t._v(t._s(e.betQishu))]),t._v(" "),a("td",[t._v(t._s(e.multipe))]),t._v(" "),a("td",[t._v(t._s(e.betmoney))]),t._v(" "),a("td",[t._v(t._s(e.winMoney))]),t._v(" "),a("td",[t._v(t._s(e.winNumber))]),t._v(" "),a("td",{class:{prizeColor:"2"==e.statusValue}},[t._v(t._s(e.status))]),t._v(" "),a("td",{staticClass:"member-btn-color btn",attrs:{width:"100"}},[a("span",{on:{click:function(a){t.lookAppendDetail(e.id)}}},[t._v("详情")]),t._v(" "),1==e.stopOrderFlag?a("span",{on:{click:function(a){t.stopOrder(e.id,e)}}},[t._v("撤单")]):t._e(),t._v(" "),a("span",{staticClass:"disnone"})])])}))])]),t._v(" "),a("div",{staticClass:"bottom"},[a("div",{staticClass:"btn-sure btn btn-base",on:{click:t.closePopup}},[t._v("关　闭")])])])]),t._v(" "),t.popupStaus?a("BetDetailPopup",{attrs:{betDetailTable:t.betDetailTable},on:{betClosePopup:t.betClosePopup}}):t._e()],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("td",[t._v("玩法")]),t._v(" "),a("td",{staticStyle:{width:"400px"}},[t._v("投注内容")]),t._v(" "),a("td",[t._v("注数")]),t._v(" "),a("td",[t._v("模式")]),t._v(" "),a("td",[t._v("金额模式")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("td",[t._v("期号")]),t._v(" "),a("td",[t._v("倍数")]),t._v(" "),a("td",[t._v("金额")]),t._v(" "),a("td",[t._v("奖金")]),t._v(" "),a("td",[t._v("开奖号码")]),t._v(" "),a("td",[t._v("状态")]),t._v(" "),a("td",[t._v("操作项")])])])}]};var d=a("VU/8")(u,h,!1,function(t){a("RCcU")},"data-v-e4799478",null);e.a=d.exports},IWbs:function(t,e){},M2yX:function(t,e){},RCcU:function(t,e){},S38H:function(t,e,a){"use strict";var s=a("Dd8w"),i=a.n(s),o=a("NYxO"),l=a("T452"),n={name:"betDetailPopup",props:{betDetailTable:{type:[Object],default:{}}},created:function(){},methods:i()({},Object(o.b)(["l_lotteryOrderStop"]),{closePopup:function(){this.$emit("betClosePopup")},orderStop:function(t){var e=this;this.l_lotteryOrderStop(t.id).then(function(a){a&&a.errorCode==l.a?(t.betStatus="停追撤单",e.$alert("撤单成功！","提示",{confirmButtonText:"确定",type:"success",center:!0,lockScroll:!1})):e.$alert("撤单失败请重试<br>"+a.msg,"提示",{confirmButtonText:"确定",type:"error",dangerouslyUseHTMLString:!0,center:!0,lockScroll:!1})})}})},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"betDetailPopup"},[a("div",{staticClass:"bet-detail popup-box"},[a("div",{staticClass:"popup-cover-shadow"}),t._v(" "),a("div",{staticClass:"popup-content"},[a("div",{staticClass:"popup-header"},[a("div",{staticClass:"bet-detail-title fl"},[t._v("详情")]),t._v(" "),a("div",{staticClass:"popup-close-btn fr",on:{click:t.closePopup}},[a("i",{staticClass:"el-icon-close"})])]),t._v(" "),a("div",{staticClass:"popup-detail"},[a("div",{staticClass:"bet-detail-header"},[a("div",{staticClass:"left fl"},[a("div",{staticClass:"left-name clearfix"},[a("div",{staticClass:"fl logo_wrapper"},[a("img",{attrs:{src:t.betDetailTable.logo,alt:""}})]),t._v(" "),a("h1",[t._v(t._s(t.betDetailTable.lotteryName)),a("p",[t._v("第"+t._s(t.betDetailTable.betQishu)+"期")])])]),t._v(" "),a("div",{staticClass:"left-date"},[a("p",[t._v("投注时间: "),a("span",[t._v(t._s(t.betDetailTable.betTime))])]),t._v(" "),a("p",[t._v("方案编号: "),a("span",[t._v(t._s(t.betDetailTable.schemeNumbe))])])])]),t._v(" "),a("div",{staticClass:"right fr"},[a("ul",{staticClass:"clearfix"},[a("li",[a("h3",[t._v("投注金额")]),t._v(" "),a("p",{staticClass:"g_color_theme"},[t._v(t._s(t.betDetailTable.betMoneyValue))])]),t._v(" "),a("li",[a("h3",[t._v("中奖金额")]),t._v(" "),a("p",[t._v(t._s(t.betDetailTable.betWinValue))])]),t._v(" "),a("li",[a("h3",[t._v("返点金额")]),t._v(" "),a("p",[t._v(t._s(t.betDetailTable.betBack))])])]),t._v(" "),a("div",{staticClass:"bet-content"},[a("p",[t._v("投注内容")]),t._v(" "),a("div",{staticClass:"bet-content-textarea"},[t._v(t._s(t.betDetailTable.content))])])])]),t._v(" "),a("div",{staticClass:"bet-detail-table"},[a("table",[t._m(0),t._v(" "),a("tbody",[a("tr",[a("td",[t._v(t._s(t.betDetailTable.gameName))]),t._v(" "),a("td",[t._v(t._s(t.betDetailTable.noteNuber)+"注")]),t._v(" "),a("td",[t._v(t._s(t.betDetailTable.multipe)+"倍")]),t._v(" "),a("td",[t._v(t._s(t.betDetailTable.betMoney))]),t._v(" "),a("td",[t._v(t._s(t.betDetailTable.model))]),t._v(" "),a("td",[t._v(t._s(t.betDetailTable.remarks))]),t._v(" "),a("td",[t._v(t._s(t.betDetailTable.winNumber))]),t._v(" "),a("td",{class:{prizeColor:"2"==t.betDetailTable.betStatusValue}},[t._v(t._s(t.betDetailTable.betStatus))]),t._v(" "),a("td",{directives:[{name:"show",rawName:"v-show",value:1==t.betDetailTable.stopOrderFlag,expression:"betDetailTable.stopOrderFlag == 1"}],staticClass:"btn chedian",on:{click:function(e){e.stopPropagation(),t.orderStop(t.betDetailTable)}}},[t._v("撤单")]),t._v(" "),a("td",{directives:[{name:"show",rawName:"v-show",value:1!=t.betDetailTable.stopOrderFlag,expression:"betDetailTable.stopOrderFlag != 1"}]})])])])]),t._v(" "),a("div",{staticClass:"btn-sure btn",on:{click:t.closePopup}},[t._v("关 闭")])])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("td",[t._v("玩法")]),t._v(" "),a("td",[t._v("注数")]),t._v(" "),a("td",[t._v("倍数")]),t._v(" "),a("td",[t._v("投注金额")]),t._v(" "),a("td",[t._v("金额类型")]),t._v(" "),a("td",[t._v("模式")]),t._v(" "),a("td",{attrs:{width:"300"}},[t._v("开奖号码")]),t._v(" "),a("td",[t._v("状态")]),t._v(" "),a("td",[t._v("操作")])])])}]};var c=a("VU/8")(n,r,!1,function(t){a("xL73")},"data-v-f23d981c",null);e.a=c.exports},TYwk:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),o=a("8lCg"),l=(a("I4nB"),a("+BTi"),a("STLj")),n=a.n(l),r=(a("cDSy"),a("e0Bm")),c=a.n(r),u=a("dwvJ"),h=a("HENB"),d=a("Q4oj"),_=a("T452"),v=a("NYxO"),p=a("Hqnb"),m=a("p4UF"),f=a("MhpX"),b=a("oA8a"),g={name:"zhuihaoRecord",data:function(){return{popupStaus:!1,appendListDetail:{},defaultLotteryValue:"",searchZhuihao:{lotteryCode:"",startTime:"",finishTime:"",account:"",flag:0,currentPage:1,pageLimit:0,status:"",gameCode:""},status:"",totalPage:0,totalNumber:0,orderNumber:"",orderId:"",defaultGameCode:"",defaultOrderStatus:"",playOptionStatus:!1,curIndex:0,list:["追号记录"]}},created:function(){this.searchZhuihao.pageLimit=this.set_defaultPageLimit,this.defaultLotteryValue=this.lotteryAll[0].value,this.searchZhuihao.lotteryCode=this.lotteryAll[0].value,this.__init()},beforeDestroy:function(){this.m_setPlayOption("")},methods:i()({__init:function(){var t=Object(m.d)().today;this.searchZhuihao.startTime=t.start,this.searchZhuihao.finishTime=t.end,this.getZhuihaoLRecord(this.searchZhuihao)},closePopup:function(){this.popupStaus=!1},listReload:function(){this.searchZhuihao.account="",this.getZhuihaoLRecord(this.searchZhuihao)},getZhuihaoLRecord:function(t){var e=this;if(""!=this.searchZhuihao.account&&!/^[A-Za-z][A-Za-z0-9]{4,12}$/.test(this.searchZhuihao.account))return this.searchZhuihao.account="",void this.$message(Object(m.e)("您输入的账户格式不正确！"));t.flag="yes"===this.status?1:0,Object(d.h)(t).then(function(t){t.errorCode==_.a?(e.totalPage=""!=t.datas.totalPages?t.datas.totalPages:0,e.totalNumber=""!=t.datas.totalRows?t.datas.totalRows:0,e.setZhaohaoList(t.datas.resultList)):e.$message(Object(m.e)(t.msg))})},choseResult:function(t){this.searchZhuihao.gameCode=t,this.playOptionStatus=!1},showPlayOption:function(){this.playOptionStatus=!0},closePlayOptionPopup:function(){this.playOptionStatus=!1},runDateOption:function(t){this.searchZhuihao.startTime=t.start,this.searchZhuihao.finishTime=t.end},changeDate:function(t,e){this.searchZhuihao.startTime=t,this.searchZhuihao.finishTime=e},callPage:function(t){this.searchZhuihao.currentPage=t.currentPage,this.searchZhuihao.pageLimit=t.pageLimit,this.getZhuihaoLRecord(this.searchZhuihao)},detailReload:function(){this.lookDetail(this.orderNumber,this.orderId)},lookDetail:function(t,e){var a=this;this.orderNumber=t,this.orderId=e,Object(d.g)(t,e).then(function(t){t.errorCode==_.a?(a.setAppendDetail(t.datas),a.popupStaus=!a.popupStaus):a.$message(Object(m.e)(t.msg))})},lookAppendDetail:function(t){var e=this;Object(d.e)(t).then(function(t){t.errorCode==_.a?(e.appendListDetail=t.datas,e.popupStaus=!e.popupStaus):e.$message(Object(m.e)(t.msg))})}},Object(v.d)({setZhaohaoList:"m_zhuihaoRecordList",setAppendDetail:"m_zhuihaoDetail",m_setPlayOption:"m_setPlayOption"})),components:{Select:c.a,Option:n.a,NewDatePicker:u.a,PageOption:h.a,AppendDetailPopup:p.a,DateOptionSelect:f.a,PlayOption:b.a,HeaderNav:o.a},computed:i()({},Object(v.c)({zhuihaoList:"m_zhuihaoRecordList",m_zhuihaoDetail:"m_zhuihaoDetail",lotteryAll:"m_lottery_menu_list",set_defaultPageLimit:"set_defaultPageLimit",m_append_status:"m_append_status",listState:"m_setPlayOption"}))},y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"zhuihao-record"},[a("HeaderNav",{attrs:{data:t.list,currentIndex:t.curIndex}}),t._v(" "),a("div",{staticClass:"page-one"},[a("div",{staticClass:"select-zone"},[a("ul",{staticClass:"clearfix"},[a("li",[a("span",[t._v("彩种:  ")]),t._v(" "),a("div",{staticClass:"disin"},[a("Select",{attrs:{placeholder:"请选择"},on:{change:function(e){t.searchZhuihao.lotteryCode=t.defaultLotteryValue,t.searchZhuihao.gameCode="",t.defaultGameCode="",t.m_setPlayOption(t.defaultLotteryValue),t.searchZhuihao.currentPage=1}},model:{value:t.defaultLotteryValue,callback:function(e){t.defaultLotteryValue=e},expression:"defaultLotteryValue"}},t._l(t.lotteryAll,function(t){return a("Option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]),t._v(" "),a("li",[a("span",[t._v("玩法:  ")]),t._v(" "),a("div",{staticClass:"disin"},[a("Select",{attrs:{placeholder:"请选择"},on:{change:function(e){t.searchZhuihao.gameCode=t.defaultGameCode,t.searchZhuihao.currentPage=1}},model:{value:t.defaultGameCode,callback:function(e){t.defaultGameCode=e},expression:"defaultGameCode"}},t._l(t.listState,function(t){return a("Option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]),t._v(" "),a("li",[a("span",[t._v("状态:  ")]),t._v(" "),a("div",{staticClass:"disin"},[a("Select",{attrs:{placeholder:"请选择"},on:{change:function(e){t.searchZhuihao.status=t.defaultOrderStatus}},model:{value:t.defaultOrderStatus,callback:function(e){t.defaultOrderStatus=e},expression:"defaultOrderStatus"}},t._l(t.m_append_status,function(t){return a("Option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]),t._v(" "),a("li",[a("span",[t._v("用户名:  ")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.searchZhuihao.account,expression:"searchZhuihao.account",modifiers:{trim:!0}}],staticClass:"user-name",attrs:{type:"text",value:""},domProps:{value:t.searchZhuihao.account},on:{input:function(e){e.target.composing||t.$set(t.searchZhuihao,"account",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),a("li",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.status,expression:"status"}],attrs:{type:"checkbox","true-value":"yes","false-value":"no",id:"zhuiContain"},domProps:{checked:Array.isArray(t.status)?t._i(t.status,null)>-1:t._q(t.status,"yes")},on:{change:function(e){var a=t.status,s=e.target,i=s.checked?"yes":"no";if(Array.isArray(a)){var o=t._i(a,null);s.checked?o<0&&(t.status=a.concat([null])):o>-1&&(t.status=a.slice(0,o).concat(a.slice(o+1)))}else t.status=i}}}),t._v(" "),a("label",{staticClass:"lineheight-style",attrs:{for:"zhuiContain"}},[t._v("包含下级")])]),t._v(" "),a("li",[a("span",[t._v("投注时间:  ")]),t._v(" "),a("DateOptionSelect",{on:{ChangeDateValue:t.changeDate,runDateOption:t.runDateOption}})],1),t._v(" "),a("li",[a("span",{staticClass:"btn-search",on:{click:function(e){t.searchZhuihao.currentPage=1,t.getZhuihaoLRecord(t.searchZhuihao)}}},[t._v("搜 索")])])])]),t._v(" "),a("div",{staticClass:"record-list",class:{nofound:!t.zhuihaoList.length}},[a("table",[t._m(0),t._v(" "),a("tbody",t._l(t.zhuihaoList,function(e,s){return a("tr",{directives:[{name:"show",rawName:"v-show",value:t.zhuihaoList.length,expression:"zhuihaoList.length"}],key:s,staticClass:"btn",on:{click:function(a){t.lookDetail(e.orderNumber,e.ordreId)}}},[a("td",[t._v(t._s(e.userName))]),t._v(" "),a("td",[t._v(t._s(e.lotteryName))]),t._v(" "),a("td",[t._v(t._s(e.gameName))]),t._v(" "),a("td",[t._v(t._s(e.startTraceQishu))]),t._v(" "),a("td",[t._v(t._s(e.startTraceTime.substring(0,e.startTraceTime.length-3)))]),t._v(" "),a("td",[t._v(t._s(e.traceCountRate))]),t._v(" "),a("td",[t._v(t._s(e.traceMoney)+"/"+t._s(e.betWinMoney))]),t._v(" "),a("td",[t._v(t._s(e.traceWinStop))]),t._v(" "),a("td",[t._v(t._s(e.status))])])}))])]),t._v(" "),a("div",{staticClass:"pageSwitch"},[a("PageOption",{attrs:{totalNumber:t.totalNumber,totalPage:t.totalPage,curPage:t.searchZhuihao.currentPage},on:{callPage:t.callPage}})],1)]),t._v(" "),t.popupStaus?a("AppendDetailPopup",{attrs:{m_zhuihaoDetail:t.m_zhuihaoDetail},on:{listReload:t.listReload,detailReload:t.detailReload,closePopup:t.closePopup}}):t._e(),t._v(" "),t.playOptionStatus?a("PlayOption",{attrs:{lotteryCode:t.searchZhuihao.lotteryCode},on:{closePlayOptionPopup:t.closePlayOptionPopup,choseResult:t.choseResult}}):t._e()],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("td",{attrs:{width:"120"}},[t._v("用户名")]),t._v(" "),a("td",{attrs:{width:"90"}},[t._v("彩种")]),t._v(" "),a("td",{attrs:{width:"100"}},[t._v("玩法")]),t._v(" "),a("td",{attrs:{width:"140"}},[t._v("起始期号")]),t._v(" "),a("td",{attrs:{width:"160"}},[t._v("追号时间")]),t._v(" "),a("td",{attrs:{width:"140"}},[t._v("已追期数/总期数")]),t._v(" "),a("td",{attrs:{width:"160"}},[t._v("已追金额/中奖金额")]),t._v(" "),a("td",{attrs:{width:"80"}},[t._v("追中即停")]),t._v(" "),a("td",{attrs:{width:"60"}},[t._v("状态")])])])}]};var L=a("VU/8")(g,y,!1,function(t){a("M2yX")},"data-v-fb4191c4",null).exports,C=a("fZjL"),O=a.n(C),P=a("S38H"),S=(a("zbwn"),a("psXV")),D={name:"betRecord",data:function(){return{betDetailTable:{},defaultLotteryValue:"",popupStaus:!1,searchList:{lotteryCode:"",startTime:"",finishTime:"",account:"",flag:0,currentPage:1,pageLimit:10,gameCode:"",status:""},status:"",count_sum:{betSum:[],winSum:[],betSum_val:0,winSum_val:0},totalPage:0,totalNumber:0,lookBetDetail:"",slotActive_betDetail:"",defaultGameCode:"",defaultOrderStatus:"",playOptionStatus:!1,setDefault:{}}},created:function(){this.searchList.pageLimit=this.set_defaultPageLimit,this.defaultLotteryValue=this.lotteryAll.length?this.lotteryAll[0].value:"",this.searchList.lotteryCode=this.lotteryAll.length?this.lotteryAll[0].value:"",this.searchList.account=this.m_groupUserName_forLink?this.m_groupUserName_forLink:"",this.__init()},beforeDestroy:function(){this.m_setPlayOption("")},methods:i()({__init:function(){var t=Object(m.d)().today;this.searchList.startTime=t.start,this.searchList.finishTime=t.end,0!=O()(this.m_date_forLink).length&&(this.setDefault=this.m_date_forLink,this.searchList.startTime=this.m_date_forLink.start,this.searchList.finishTime=this.m_date_forLink.end),this.getAllList(this.searchList)},closePopup:function(){this.popupStaus=!1},stopOrder:function(t){var e=this;this.l_lotteryOrderStop(t).then(function(t){e.$message(Object(m.e)(t.msg)),t.errorCode==_.a&&e.getAllList(e.searchList)})},getAllList:function(t){var e=this;if(""!=this.searchList.account&&!/^[A-Za-z0-9]{4,16}$/.test(this.searchList.account))return this.searchList.account="",void this.$message(Object(m.e)("请正确输入用户名(4-16位英文字母以及数字组合)"));t.flag="yes"===this.status?1:0,Object(d.f)(t).then(function(t){if(t.errorCode==_.a){e.totalNumber=""!=t.datas.totalRows?t.datas.totalRows:0,e.totalPage=""!=t.datas.totalPages?t.datas.totalPages:0,e.count_sum.betSum=[],e.count_sum.winSum=[];for(var a=0;a<t.datas.resultList.length;a++)e.count_sum.betSum.push(t.datas.resultList[a].betMoney),e.count_sum.winSum.push(t.datas.resultList[a].winMoney);e.count_sum.betSum_val=Object(m.b)(e.count_sum.betSum),e.count_sum.winSum_val=Object(m.b)(e.count_sum.winSum),e.setBetList(t.datas)}else e.$message(Object(m.e)(t.msg))})},lookDetail:function(t){var e=this;Object(d.e)(t).then(function(t){t.errorCode==_.a?(e.betDetailTable=t.datas,e.popupStaus=!e.popupStaus):e.$message(Object(m.e)(t.msg))})},f_lookBetDetail:function(t,e){this.lookBetDetail=t,this.slotActive_betDetail=e},choseResult:function(t){this.searchList.gameCode=t,this.playOptionStatus=!1},showPlayOption:function(){this.playOptionStatus=!0},closePlayOptionPopup:function(){this.playOptionStatus=!1},closeBetDetail:function(){this.slotActive_betDetail=""},changeDate:function(t,e){this.searchList.startTime=t,this.searchList.finishTime=e},runDateOption:function(t){this.searchList.startTime=t.start,this.searchList.finishTime=t.end},callPage:function(t){this.searchList.currentPage=t.currentPage,this.searchList.pageLimit=t.pageLimit,this.getAllList(this.searchList)}},Object(v.d)({setBetList:"m_lotteryRecordBetList",m_setPlayOption:"m_setPlayOption"}),Object(v.b)(["l_lotteryOrderStop"])),watch:{lotteryAll:function(){this.defaultLotteryValue=this.lotteryAll.length?this.lotteryAll[0].value:"",this.searchList.lotteryCode=this.lotteryAll.length?this.lotteryAll[0].value:"",this.getAllList(this.searchList)}},computed:i()({},Object(v.c)({list:"m_lotteryRecordBetList",lotteryAll:"m_lottery_menu_list",m_groupUserName_forLink:"m_groupUserName_forLink",set_defaultPageLimit:"set_defaultPageLimit",m_lottery_order_status:"m_lottery_order_status",listState:"m_setPlayOption",m_date_forLink:"m_date_forLink"})),components:{Select:c.a,Option:n.a,PageOption:h.a,BetDetailPopup:P.a,LookBetDetail:S.a,DateOptionSelect:f.a,PlayOption:b.a}},k={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bet-record"},[a("div",{staticClass:"select-zone"},[a("ul",{staticClass:"clearfix"},[a("li",[a("span",[t._v("彩种:  ")]),t._v(" "),a("div",{staticClass:"disin"},[a("Select",{attrs:{placeholder:"请选择"},on:{change:function(e){t.searchList.lotteryCode=t.defaultLotteryValue,t.defaultGameCode="",t.searchList.gameCode="",t.m_setPlayOption(t.defaultLotteryValue),t.searchList.currentPage=1}},model:{value:t.defaultLotteryValue,callback:function(e){t.defaultLotteryValue=e},expression:"defaultLotteryValue"}},t._l(t.lotteryAll,function(t){return a("Option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]),t._v(" "),a("li",[a("span",[t._v("玩法:  ")]),t._v(" "),a("div",{staticClass:"disin"},[a("Select",{attrs:{placeholder:"请选择"},on:{change:function(e){t.searchList.gameCode=t.defaultGameCode,t.searchList.currentPage=1}},model:{value:t.defaultGameCode,callback:function(e){t.defaultGameCode=e},expression:"defaultGameCode"}},t._l(t.listState,function(t){return a("Option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]),t._v(" "),a("li",[a("span",[t._v("状态:  ")]),t._v(" "),a("div",{staticClass:"disin"},[a("Select",{attrs:{placeholder:"请选择"},on:{change:function(e){t.searchList.status=t.defaultOrderStatus}},model:{value:t.defaultOrderStatus,callback:function(e){t.defaultOrderStatus=e},expression:"defaultOrderStatus"}},t._l(t.m_lottery_order_status,function(t){return a("Option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]),t._v(" "),a("li",[a("span",[t._v("用户名:  ")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.searchList.account,expression:"searchList.account",modifiers:{trim:!0}}],staticClass:"user-name",attrs:{type:"text"},domProps:{value:t.searchList.account},on:{input:function(e){e.target.composing||t.$set(t.searchList,"account",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),a("li",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.status,expression:"status"}],attrs:{type:"checkbox","true-value":"yes","false-value":"no",id:"contain"},domProps:{checked:Array.isArray(t.status)?t._i(t.status,null)>-1:t._q(t.status,"yes")},on:{change:function(e){var a=t.status,s=e.target,i=s.checked?"yes":"no";if(Array.isArray(a)){var o=t._i(a,null);s.checked?o<0&&(t.status=a.concat([null])):o>-1&&(t.status=a.slice(0,o).concat(a.slice(o+1)))}else t.status=i}}}),a("label",{staticClass:"lineheight-style",attrs:{for:"contain"}},[t._v("包含下级")])]),t._v(" "),a("li",[a("span",[t._v("投注时间:  ")]),t._v(" "),a("DateOptionSelect",{attrs:{setDefault:t.setDefault},on:{ChangeDateValue:t.changeDate,runDateOption:t.runDateOption}})],1),t._v(" "),a("li",[a("span",{staticClass:"btn-search",on:{click:function(e){t.searchList.currentPage=1,t.getAllList(t.searchList)}}},[t._v("搜 索")])])])]),t._v(" "),a("div",{staticClass:"record-list",class:{nofound:!t.list.length}},[a("table",[t._m(0),t._v(" "),a("tbody",[t._l(t.list,function(e,s){return a("tr",{directives:[{name:"show",rawName:"v-show",value:t.list.length,expression:"list.length"}],key:s,staticClass:"btn",on:{click:function(a){t.lookDetail(e.id)}}},[a("td",[t._v(t._s(e.userName))]),t._v(" "),a("td",[t._v(t._s(e.betTime.substring(0,e.betTime.length-3)))]),t._v(" "),a("td",[t._v(t._s(e.lotteryName))]),t._v(" "),a("td",[t._v(t._s(e.gameName))]),t._v(" "),a("td",[t._v(t._s(e.betQishu))]),t._v(" "),e.content.length>20?a("td",{staticClass:"bet_content"},[t._v("\n\t\t\t\t\t\t"+t._s(e.content.substr(0,10))+"...\n\t\t\t\t\t")]):a("td",{staticClass:"bet_content"},[t._v(t._s(e.content))]),t._v(" "),a("td",[t._v(t._s(e.betMoney))]),t._v(" "),a("td",{class:{prizeColor:2==e.statusValue}},[t._v(t._s(e.winMoney))]),t._v(" "),a("td",{class:{prizeColor:2==e.statusValue}},[t._v(t._s(e.status))]),t._v(" "),a("td",{staticClass:"member-btn-color",on:{click:function(a){a.stopPropagation(),t.stopOrder(e.id)}}},[1==e.stopOrderFalg?a("span",[t._v("撤单")]):t._e(),t._v(" "),a("span",{staticClass:"disnone"},[t._v(t._s(e.id))])])])}),t._v(" "),a("tr",{directives:[{name:"show",rawName:"v-show",value:t.list.length,expression:"list.length"}]},[a("td",{attrs:{colspan:"6"}},[t._v("汇总小结")]),t._v(" "),a("td",[t._v(t._s(t.count_sum.betSum_val))]),t._v(" "),a("td",{class:{prizeColor:t.count_sum.winSum_val<0}},[t._v(t._s(t.count_sum.winSum_val))]),t._v(" "),a("td",{attrs:{colspan:"3"}})])],2)])]),t._v(" "),a("LookBetDetail",{attrs:{content:t.lookBetDetail,slotActive:t.slotActive_betDetail},on:{closeBetDetail:t.closeBetDetail}}),t._v(" "),a("div",{staticClass:"pageSwitch"},[a("PageOption",{attrs:{totalNumber:t.totalNumber,totalPage:t.totalPage,curPage:t.searchList.currentPage},on:{callPage:t.callPage}})],1),t._v(" "),a("BetDetailPopup",{directives:[{name:"show",rawName:"v-show",value:t.popupStaus,expression:"popupStaus"}],attrs:{betDetailTable:t.betDetailTable},on:{betClosePopup:t.closePopup}}),t._v(" "),t.playOptionStatus?a("PlayOption",{attrs:{lotteryCode:t.searchList.lotteryCode},on:{closePlayOptionPopup:t.closePlayOptionPopup,choseResult:t.choseResult}}):t._e()],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("td",{attrs:{width:"130"}},[t._v("用户名")]),t._v(" "),a("td",{attrs:{width:"156"}},[t._v("投注时间")]),t._v(" "),a("td",{attrs:{width:"110"}},[t._v("彩种")]),t._v(" "),a("td",{attrs:{width:"130"}},[t._v("玩法")]),t._v(" "),a("td",{attrs:{width:"120"}},[t._v("期号")]),t._v(" "),a("td",{attrs:{width:"110"}},[t._v("投注内容")]),t._v(" "),a("td",{attrs:{width:"85"}},[t._v("投注金额")]),t._v(" "),a("td",{attrs:{width:"85"}},[t._v("奖金")]),t._v(" "),a("td",{attrs:{width:"60"}},[t._v("状态")]),t._v(" "),a("td",{attrs:{width:"60"}},[t._v("操作")])])])}]};var w=a("VU/8")(D,k,!1,function(t){a("H9tJ")},"data-v-44752cc6",null).exports,x={name:"otherGame",data:function(){return{defaultDateVar:{},defaultLotteryValue:"",otherGameList:{startTime:"",finishTime:"",flat:"",currentPage:1,pageLimit:0},count_sum:{betSum:[],winSum:[],backSum:[],betSum_val:0,winSum_val:0,backSum_val:0},totalPage:0,totalNumber:0}},created:function(){this.otherGameList.pageLimit=this.set_defaultPageLimit,this.defaultDateVar=Object(m.c)(),this.otherGameList.startTime=this.defaultDateVar.start,this.otherGameList.finishTime=this.defaultDateVar.end,this.defaultLotteryValue=this.m_otherGameList[0].value,this.otherGameList.flat=this.m_otherGameList[0].value,this.getOtherGameList(this.otherGameList)},methods:i()({getOtherGameList:function(t){var e=this;Object(d._7)(t).then(function(t){if(t.errorCode==_.a){e.totalNumber=""!=t.datas.totalRows?t.datas.totalRows:0,e.totalPage=""!=t.datas.totalPages?t.datas.totalPages:0,e.count_sum.betSum=[],e.count_sum.winSum=[];for(var a=0;a<t.datas.resultList.length;a++)e.count_sum.betSum.push(t.datas.resultList[a].betMoney),e.count_sum.winSum.push(t.datas.resultList[a].winMoney),e.count_sum.backSum.push(t.datas.resultList[a].backWaterMoney);e.setOtherGameRecordList(t.datas.resultList),e.count_sum.betSum_val=Object(m.b)(e.count_sum.betSum),e.count_sum.winSum_val=Object(m.b)(e.count_sum.winSum),e.count_sum.backSum_val=Object(m.b)(e.count_sum.backSum)}else e.$message(Object(m.e)(t.msg))})},changeDate:function(t,e){this.otherGameList.startTime=t,this.otherGameList.finishTime=e},runDateOption:function(t){this.otherGameList.startTime=t.start,this.otherGameList.finishTime=t.end},callPage:function(t){this.otherGameList.currentPage=t.currentPage,this.otherGameList.pageLimit=t.pageLimit,this.getOtherGameList(this.otherGameList)}},Object(v.d)({setOtherGameRecordList:"m_otherGameRecordList"})),watch:{m_otherGameList:function(t,e){this.defaultLotteryValue=this.m_otherGameList[0].value,this.otherGameList.flat=this.m_otherGameList[0].value,this.getOtherGameList(this.otherGameList)}},components:{Select:c.a,Option:n.a,DateOptionSelect:f.a,PageOption:h.a},computed:i()({},Object(v.c)({m_otherGameList:"m_otherGameList",recordList:"m_otherGameRecordList",set_defaultPageLimit:"set_defaultPageLimit"}))},T={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"other-game"},[a("div",{staticClass:"select-zone"},[a("ul",{staticClass:"clearfix"},[a("li",[a("span",[t._v("所属厅:  ")]),t._v(" "),a("div",{staticClass:"disin"},[a("Select",{attrs:{placeholder:"请选择"},on:{change:function(e){t.otherGameList.flat=t.defaultLotteryValue,t.otherGameList.currentPage=1,t.getOtherGameList(t.otherGameList)}},model:{value:t.defaultLotteryValue,callback:function(e){t.defaultLotteryValue=e},expression:"defaultLotteryValue"}},t._l(t.m_otherGameList,function(t){return a("Option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]),t._v(" "),a("li",[a("span",[t._v("投注时间:  ")]),t._v(" "),a("DateOptionSelect",{on:{ChangeDateValue:t.changeDate,runDateOption:t.runDateOption}})],1),t._v(" "),a("li",[a("span",{staticClass:"btn-search",on:{click:function(e){t.otherGameList.currentPage=1,t.getOtherGameList(t.otherGameList)}}},[t._v("搜 索")])])])]),t._v(" "),a("div",{staticClass:"record-list",class:{nofound:!t.recordList.length}},[a("table",[t._m(0),t._v(" "),a("tbody",[t._l(t.recordList,function(e,s){return t.recordList.length?a("tr",{key:s},[a("td",[t._v(t._s(e.userName))]),t._v(" "),a("td",[t._v(t._s(e.gameOrder))]),t._v(" "),a("td",[t._v(t._s(e.gameContent))]),t._v(" "),a("td",[t._v(t._s(e.betTime))]),t._v(" "),a("td",[t._v(t._s(e.betInMoney))]),t._v(" "),a("td",{class:["income",{pay:e.winMoney<=0}]},[t._v(t._s(e.winMoney))]),t._v(" "),a("td",[t._v(t._s(e.backWaterMoney))]),t._v(" "),a("td",[t._v(t._s(e.winStatus))])]):t._e()}),t._v(" "),a("tr",{directives:[{name:"show",rawName:"v-show",value:t.recordList.length,expression:"recordList.length"}]},[a("td",{attrs:{colspan:"4"}},[t._v("汇总小结")]),t._v(" "),a("td",[t._v(t._s(t.count_sum.betSum_val))]),t._v(" "),a("td",{class:["income",{pay:t.count_sum.winSum_val<=0}]},[t._v(t._s(t.count_sum.winSum_val))]),t._v(" "),a("td",[t._v(t._s(t.count_sum.backSum_val))]),t._v(" "),a("td")])],2)])]),t._v(" "),a("div",{staticClass:"pageSwitch"},[a("PageOption",{attrs:{totalNumber:t.totalNumber,totalPage:t.totalPage,curPage:t.otherGameList.currentPage},on:{callPage:t.callPage}})],1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("td",{attrs:{width:"100"}},[t._v("用户")]),t._v(" "),a("td",{attrs:{width:"140"}},[t._v("订单号")]),t._v(" "),a("td",[t._v("游戏内容")]),t._v(" "),a("td",{attrs:{width:"150"}},[t._v("投注时间")]),t._v(" "),a("td",{attrs:{width:"110"}},[t._v("投注金额")]),t._v(" "),a("td",{attrs:{width:"110"}},[t._v("中奖金额")]),t._v(" "),a("td",{attrs:{width:"110"}},[t._v("返水金额")]),t._v(" "),a("td",{attrs:{width:"50"}},[t._v("状态")])])])}]};var A=a("VU/8")(x,T,!1,function(t){a("Uvo7")},"data-v-7166b786",null).exports,N={name:"betRecordWrapper",data:function(){return{curIndex:0,list:["彩票投注记录","其他游戏投注记录"]}},created:function(){},methods:{navSwitch:function(t){this.curIndex=t}},computed:i()({},Object(v.c)({})),components:{HeaderNav:o.a,BetRecord:w,OtherGame:A}},R={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"betRecordWrapper "},[a("HeaderNav",{attrs:{data:t.list,currentIndex:t.curIndex},on:{navSwitch:t.navSwitch}}),t._v(" "),0==t.curIndex?a("BetRecord"):t._e(),t._v(" "),1==t.curIndex?a("OtherGame"):t._e()],1)},staticRenderFns:[]};var G=a("VU/8")(N,R,!1,function(t){a("A/B2")},"data-v-0ef16597",null).exports,j=(a("yBKP"),{name:"gameRecord",data:function(){return{pageIndex:0}},created:function(){this.pageIndex=1*this.$route.params.pageIndex,this.get_otherGameFlat()},methods:i()({navSwitch:function(t){this.$router.push({path:"/member/gameRecord/"+t})}},Object(v.d)({changePage:"m_gameRecord_changeIndex"}),Object(v.b)(["get_otherGameFlat"])),watch:{$route:function(){this.pageIndex=1*this.$route.params.pageIndex}},components:{HeaderNav:o.a,BetRecordWrapper:G,ZhuihaoRecord:L},computed:i()({},Object(v.c)({activeIndex:"m_gameRecordIndex",m_module_title:"m_module_title"}))}),z={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"game-record"},[0==this.pageIndex?e("BetRecordWrapper"):this._e(),this._v(" "),1==this.pageIndex?e("ZhuihaoRecord"):this._e()],1)},staticRenderFns:[]};var Z=a("VU/8")(j,z,!1,function(t){a("IWbs")},"data-v-8abe9ff8",null);e.default=Z.exports},Uvo7:function(t,e){},oA8a:function(t,e,a){"use strict";var s=a("Dd8w"),i=a.n(s),o=a("NYxO"),l=a("zbwn"),n=a("p4UF"),r={name:"playOption",data:function(){return{slotActive:"playOption",isCheckedAll:!0,choseList:[],list:[]}},created:function(){""!=this.lotteryCode?(this.m_setPlayOption(this.lotteryCode),this.list=this.listState):this.$emit("closePlayOptionPopup")},methods:i()({proupsClose:function(){this.$emit("closePlayOptionPopup")},reverseChose:function(){for(var t=0,e=0;e<this.list.length;e++)this.list[e].isChecked?this.list[e].isChecked=!1:(this.list[e].isChecked=!0,t++);this.isCheckedAll=t==this.list.length},emptyChose:function(){for(var t=0;t<this.list.length;t++)this.list[t].isChecked=!1;this.isCheckedAll=!1,this.choseList=[]},checkChoseOne:function(){this.m_setPlayOption(this.lotteryCode,!1,this.list);for(var t=0,e=0;e<this.list.length;e++)this.list[e].isChecked&&t++;this.isCheckedAll=t==this.list.length},checkChoseAll:function(){this.m_setPlayOption(this.lotteryCode,!1,this.list);for(var t=0;t<this.list.length;t++)this.list[t].isChecked=this.isCheckedAll},sureOption:function(){this.choseList=[];for(var t=0;t<this.list.length;t++)this.list[t].isChecked&&this.choseList.push(this.list[t].value);this.choseList=this.choseList.join(";"),""!=this.choseList?(this.$emit("choseResult",this.choseList),this.choseList="",this.choseList=[]):this.$message(Object(n.e)("请选择玩法！"))}},Object(o.d)({m_setPlayOption:"m_setPlayOption"})),computed:i()({},Object(o.c)({listState:"m_setPlayOption"})),props:{playOptionList:{type:Array,default:function(){return[]}},lotteryCode:{type:String,default:""}},components:{SlotCommon:l.a}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"playOption ce"},[a("SlotCommon",{attrs:{currentStyle:t.slotActive},on:{proupsClose:t.proupsClose}},[a("h1",{attrs:{slot:"header"},slot:"header"},[t._v("选择玩法")]),t._v(" "),a("div",{staticClass:"main"},[a("ul",t._l(t.list,function(e,s){return a("li",{key:s},[a("el-checkbox",{attrs:{label:e.value},on:{change:t.checkChoseOne},model:{value:e.isChecked,callback:function(a){t.$set(e,"isChecked",a)},expression:"item.isChecked"}},[t._v(t._s(e.name))])],1)}))]),t._v(" "),a("div",{staticClass:"foot",attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"fl optionChose"},[a("el-checkbox",{staticClass:"optionChose_btn",on:{change:t.checkChoseAll},model:{value:t.isCheckedAll,callback:function(e){t.isCheckedAll=e},expression:"isCheckedAll"}},[t._v("全选")]),t._v(" "),a("span",{staticClass:"optionChose_btn",on:{click:t.reverseChose}},[t._v("反选")]),t._v(" "),a("span",{staticClass:"optionChose_btn",on:{click:t.emptyChose}},[t._v("清空")])],1),t._v(" "),a("div",{staticClass:"fr popupChose"},[a("span",{staticClass:"optionChose_btn",on:{click:t.proupsClose}},[t._v("取消")]),t._v(" "),a("span",{staticClass:"optionChose_btn sure",on:{click:t.sureOption}},[t._v("确定")])])])])],1)},staticRenderFns:[]};var u=a("VU/8")(r,c,!1,function(t){a("FYox")},"data-v-21b02f22",null);e.a=u.exports},xL73:function(t,e){}});