webpackJsonp([27],{"0V8H":function(t,s){},JUEu:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=e("Dd8w"),i=e.n(n),o=e("NYxO"),l=e("T452"),a=e("gPNx"),c={name:"rule",data:function(){return{resultList:[],curCount:20}},created:function(){this._getRuleList(this.getLottsCode(),this.curCount),this.l_getAllCountDown(this.getLottsCode()),this.loopTime()},methods:i()({},Object(o.b)(["l_getHistoryOPenResult","l_getAllCountDown"]),Object(o.d)({setLoginPopIsShow:"U_SET_IS_SHOW_LOGIN_POP"}),{openNewTrend:function(t){window.open("#/lotts/"+t+"/trend","trend")},getLottsCode:function(){return this.$route.params.lottsCode},callBackFunc:function(){this.l_getAllCountDown(this.getLottsCode()),this._getRuleList(this.getLottsCode(),this.curCount)},_selectCount:function(t){this.curCount=t,this._getRuleList(this.getLottsCode(),this.curCount)},goLotteryPage:function(t){this.global_userName?this.$router.push({path:"/lotts/"+t+"/index"}):this.setLoginPopIsShow(!0)},_selectLotteryRule:function(t){this.$router.push({path:"/lotts/"+t.lotteryCode+"/historyOpenResult"})},loopTime:function(){var t=this;!function s(){t.timeFunc=setTimeout(function(){t._getRuleList(t.getLottsCode(),t.curCount),-1!=t.$route.path.indexOf("historyOpenResult")&&s()},3e4)}()},_getRuleList:function(t,s){var e=this;this.l_getAllCountDown(t),this.l_getHistoryOPenResult({lottsCode:t,count:s}).then(function(t){t&&t.errorCode==l.a?t.datas&&t.datas.openResult.length>0&&(e.resultList=t.datas.openResult):e.$alert(t.msg,"温馨提示",{confirmButtonText:"确定",center:!0,lockScroll:!1})})}}),computed:i()({},Object(o.c)(["l_allLotteryList","l_curLottsCountDown","global_userName"])),components:{TimeDown:a.a},watch:{$route:function(){this._getRuleList(this.getLottsCode(),this.curCount)}}},u={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"rule pageWidth"},[e("div",{staticClass:"left"},[e("ul",[e("li",{staticClass:"title item"},[t._v("彩种")]),t._v(" "),t._l(t.l_allLotteryList,function(s,n){return e("li",{key:n,staticClass:"item btn",class:{avtive:t.getLottsCode()==s.lotteryCode},on:{click:function(e){t._selectLotteryRule(s)}}},[e("i",{staticClass:"icon1 icon"}),t._v(" "),e("i",{staticClass:"icon2 icon"}),t._v("\n        "+t._s(s.lotteryName)+"\n      ")])})],2)]),t._v(" "),e("div",{staticClass:"right"},[e("div",{staticClass:"titleBox"},[e("div",{staticClass:"prevQ"},[e("div",{staticClass:"imgBox"},[e("img",{staticClass:"ce",attrs:{src:t.l_curLottsCountDown.smallPicUrl,alt:""}})]),t._v(" "),e("div",{staticClass:"info"},[e("div",[e("span",[t._v(t._s(t.l_curLottsCountDown.gameName))]),t._v(" "),e("span",[t._v("\n              第\n              "),e("i",[t._v(t._s(t.l_curLottsCountDown.lastQs))]),t._v(" 期\n            ")])]),t._v(" "),e("div",{staticClass:"openRes"},[e("span",[t._v("开奖号码：")]),t._v(" "),2==t.l_curLottsCountDown.type&&1==t.l_curLottsCountDown.isOpen?e("div",{staticClass:"num"},t._l(t.l_curLottsCountDown.lastResult,function(s,n){return e("i",{key:n,staticClass:"bjsc",class:"bjsc"+s},[t._v(t._s(s))])})):3==t.l_curLottsCountDown.type&&1==t.l_curLottsCountDown.isOpen?e("div",{staticClass:"num"},t._l(t.l_curLottsCountDown.lastResult,function(s,n){return e("div",{key:n},[e("img",{attrs:{src:t.convertImgPath(s),alt:""}})])})):6==t.l_curLottsCountDown.type&&1==t.l_curLottsCountDown.isOpen?e("div",{staticClass:"num"},[t._l(t.l_curLottsCountDown.lastResult,function(s,n){return e("div",{key:n},[e("span",[t._v(t._s(s))]),t._v(" "),n<t.l_curLottsCountDown.lastResult.length-1?e("i",{staticClass:"push"},[t._v("+")]):t._e()])}),t._v(" "),e("div",{staticClass:"hz"},[t._v("="+t._s(t.caleHZ(t.l_curLottsCountDown.lastResult)))])],2):e("div",{staticClass:"num"},[t._l(t.l_curLottsCountDown.lastResult,function(s,n){return e("span",{directives:[{name:"show",rawName:"v-show",value:1==t.l_curLottsCountDown.isOpen,expression:"l_curLottsCountDown.isOpen == 1"}],key:n},[t._v(t._s(s))])}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:0==t.l_curLottsCountDown.isOpen,expression:"l_curLottsCountDown.isOpen == 0"}],staticClass:"opening"},[t._v("等待开奖")])],2)])])]),t._v(" "),e("div",{staticClass:"line mCeTB"}),t._v(" "),e("div",{staticClass:"curQ"},[e("div",{staticClass:"timeBox"},[e("span",[t._v("\n            距离\n            "),e("i",[t._v(t._s(t.l_curLottsCountDown.qs))]),t._v(" 期投注截至\n          ")]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:1==t.l_curLottsCountDown.isClose,expression:"l_curLottsCountDown.isClose==1"}],staticClass:"time"},[t._v("封盘中")]),t._v(" "),e("TimeDown",{directives:[{name:"show",rawName:"v-show",value:0==t.l_curLottsCountDown.isClose,expression:"l_curLottsCountDown.isClose==0"}],staticClass:"time",attrs:{typeStr:0,time:t.l_curLottsCountDown.times},on:{callBackFunc:t.callBackFunc}})],1),t._v(" "),e("div",{staticClass:"btnBox"},[e("div",[e("span",{staticClass:"btn",on:{click:function(s){t.openNewTrend(t.l_curLottsCountDown.gameCode)}}},[t._v("查看走势>")])]),t._v(" "),e("div",{staticClass:"btn betBtn",on:{click:function(s){t.goLotteryPage(t.l_curLottsCountDown.gameCode)}}},[t._v("立即投注")])])])]),t._v(" "),e("div",{staticClass:"listBox"},[e("div",{staticClass:"title"},[t._m(0),t._v(" "),e("div",{staticClass:"btnGroup"},[e("div",{staticClass:"btn",class:{active:20==t.curCount},on:{click:function(s){t._selectCount(20)}}},[t._v("近20期")]),t._v(" "),e("div",{staticClass:"btn",class:{active:50==t.curCount},on:{click:function(s){t._selectCount(50)}}},[t._v("近50期")]),t._v(" "),e("div",{staticClass:"btn",class:{active:100==t.curCount},on:{click:function(s){t._selectCount(100)}}},[t._v("近100期")])])]),t._v(" "),e("ul",{staticClass:"itemBox"},[t._m(1),t._v(" "),t._l(t.resultList,function(s,n){return e("li",{key:n,staticClass:"item"},[e("div",{staticClass:"flex1"},[t._v(t._s(s.qs))]),t._v(" "),e("div",{staticClass:"flex1"},[t._v(t._s(s.openTime))]),t._v(" "),e("div",{staticClass:"content"},[2==s.type&&1==s.isOpen?e("div",{staticClass:"num"},t._l(s.openResult,function(s,n){return e("i",{key:n,staticClass:"bjsc",class:"bjsc"+s},[t._v(t._s(s))])})):3==s.type&&1==s.isOpen?e("div",{staticClass:"num"},t._l(s.openResult,function(s,n){return e("div",{key:n},[e("img",{attrs:{src:t.convertImgPath(s),alt:""}})])})):6==s.type&&1==s.isOpen?e("div",{staticClass:"num"},[t._l(s.openResult,function(n,i){return e("div",{key:i},[e("span",[t._v(t._s(n))]),t._v(" "),i<s.openResult.length-1?e("i",{staticClass:"push"},[t._v("+")]):t._e()])}),t._v(" "),e("div",{staticClass:"hz"},[t._v("="+t._s(t.caleHZ(s.openResult)))])],2):e("div",{staticClass:"num"},[t._l(s.openResult,function(n,i){return e("span",{directives:[{name:"show",rawName:"v-show",value:1==s.isOpen,expression:"item.isOpen == 1"}],key:i},[t._v(t._s(n))])}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:1!=s.isOpen,expression:"item.isOpen != 1"}]},[t._v("等待开奖")])],2)])])})],2)])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"tiitleBox"},[s("span",{staticClass:"icon mCeTB"}),this._v(" "),s("h2",[this._v("历史开奖结果")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"item title"},[s("div",{staticClass:"flex1"},[this._v("期号")]),this._v(" "),s("div",{staticClass:"flex1"},[this._v("开奖日期")]),this._v(" "),s("div",{staticClass:"content"},[this._v("开奖号码")])])}]};var r=e("VU/8")(c,u,!1,function(t){e("0V8H")},"data-v-531b832c",null);s.default=r.exports}});