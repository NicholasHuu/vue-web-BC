webpackJsonp([28],{"+Ux7":function(t,s){},"4T1j":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("Dd8w"),i=e.n(a),n=e("NYxO"),r={name:"spare",data:function(){return{webSeitList:[]}},created:function(){this.webSeitList=this.l_lotteryWebSiteInfo.siteReserveDomain.split(",")},methods:{onCopy:function(){this.$message({type:"info",showClose:!1,customClass:"g_messageTips",message:"复制成功",duration:2500,center:!0})},onError:function(t){this.$message({type:"info",showClose:!1,customClass:"g_messageTips",message:"浏览器不支持复制，请手动复制！",duration:2500,center:!0})}},computed:i()({},Object(n.c)(["l_lotteryWebSiteInfo"]))},o={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"spare"},[e("div",{staticClass:"wrapper"},[e("div",{staticClass:"box pageWidth"},[e("div",{staticClass:"content"},[e("ul",{},t._l(t.webSeitList,function(s,a){return e("li",{key:a},[e("div",{staticClass:"inner"},[e("span",{staticClass:"index"},[t._v("NO"+t._s(a+1)),e("i",{staticClass:"borderInner"})]),t._v(" "),e("span",{staticClass:"tips"}),t._v(" "),e("div",{staticClass:"address"},[t._v(t._s(s))]),t._v(" "),e("a",{staticClass:"btn copy",attrs:{target:"_blank",href:"http://"+s}},[t._v("进入")])])])}))]),t._v(" "),e("div",{staticClass:"people"})])])])},staticRenderFns:[]};var c=e("VU/8")(r,o,!1,function(t){e("+Ux7")},"data-v-4c5573ab",null);s.default=c.exports}});