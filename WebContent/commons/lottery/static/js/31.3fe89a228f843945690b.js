webpackJsonp([31],{"7LU9":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("Dd8w"),n=e.n(i),a=e("gPNx"),o=e("NYxO"),c=e("yBKP"),l=e("T452"),r={name:"gameList",data:function(){return{list:[],contentList:[],curIndex:0}},created:function(){this.init()},methods:n()({},Object(o.b)(["l_getAllCountDown"]),Object(o.d)({setLoginPopIsShow:"U_SET_IS_SHOW_LOGIN_POP"}),{init:function(){var t=this;Object(c.a)().then(function(s){s.errorCode==l.a&&(t.list=s.datas,t.contentList=t.list[t.curIndex].allResult)})},switchList:function(t){this.contentList=this.list[t].allResult,this.curIndex=t},openNewTrend:function(t){window.open("#/lotts/"+t+"/trend","trend")},callBackFunc:function(){var t=this;clearTimeout(this.timeFunc);t.timeFunc=setTimeout(function(){t.init()},100)},goLotteryPage:function(t){this.setLoginPopIsShow(!1),this.$router.push({path:"/lotts/"+t+"/index"})}}),computed:n()({},Object(o.c)(["global_userName"])),components:{TimeDown:a.a}},u={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"gameList"},[t._m(0),t._v(" "),e("div",{staticClass:"gamesBox"},[e("div",{staticClass:"pageWidth gamesBoxWrapper"},[e("div",{staticClass:"wrapper"},[e("div",{staticClass:"nav"},t._l(t.list,function(s,i){return e("div",{key:i,staticClass:"itemNav",class:{active:i==t.curIndex},on:{click:function(s){t.switchList(i)}}},[t._v(t._s(s.groupCodeName))])})),t._v(" "),e("ul",t._l(t.contentList,function(s,i){return e("li",{key:i},[e("div",{staticClass:"top"},[e("div",{staticClass:"imgBox"},[e("img",{attrs:{src:s.smallPicUrl,alt:""}})]),t._v(" "),e("div",{staticClass:"info"},[e("h1",[t._v(t._s(s.gameName))]),t._v(" "),e("p",[t._v("\n                  第\n                  "),e("span",[t._v(t._s(s.qs))]),t._v("期\n                ")]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:0==s.isClose,expression:"item.isClose==0"}],staticClass:"timeDownBox"},[e("span",[t._v("距离开奖：")]),t._v(" "),e("TimeDown",{staticClass:"times",attrs:{time:s.times},on:{callBackFunc:t.callBackFunc}})],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:1==s.isClose,expression:"item.isClose==1"}],staticClass:"timeDownBox"},[e("span",{staticClass:"times"},[t._v(t._s(s.closeDes))])])])]),t._v(" "),e("div",{staticClass:"btnGroup"},[e("div",{staticClass:"btn"},[e("router-link",{attrs:{to:"/lotts/"+s.gameCode+"/historyOpenResult"}},[t._v("历史开奖")])],1),t._v(" "),e("div",{staticClass:"btn"},[e("span",{attrs:{to:"lotts/"+s.gameCode+"/trend"},on:{click:function(e){t.openNewTrend(s.gameCode)}}},[t._v("走势图")])]),t._v(" "),e("div",{staticClass:"btn",on:{click:function(e){t.goLotteryPage(s.gameCode)}}},[t._v("立即投注")])])])}))])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"banner"},[s("div",{staticClass:"bannerImg"})])}]};var v=e("VU/8")(r,u,!1,function(t){e("hstR")},"data-v-288c6180",null);s.default=v.exports},hstR:function(t,s){}});