webpackJsonp([7],{"3hEM":function(e,t){},"5Us1":function(e,t,s){e.exports=s.p+"static/img/byds_content.3ce72d5.jpg"},FiMw:function(e,t,s){e.exports=s.p+"static/img/byds_ele.bccfbc8.png"},"IhO+":function(e,t,s){e.exports=s.p+"static/img/bydr_content.f818044.jpg"},SY9v:function(e,t,s){e.exports=s.p+"static/img/shdyj_ele.8dc6f70.png"},TiCE:function(e,t,s){e.exports=s.p+"static/img/bydr_ele.2bc37ec.png"},VA74:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("Dd8w"),a=s.n(i),n=s("NYxO"),c=(s("3Q4o"),s("yBKP")),o=s("fdFc"),r=s("T452"),l={name:"live",data:function(){return{showNavIndex:0,require_login:{userName:"",flat:"",gameCode:""}}},created:function(){},methods:{goGame:function(e,t){this.require_login.userName=this.global_userName,""!=this.global_userName?(this.require_login.gameCode=t,this.require_login.flat=e,Object(c.d)(this.require_login).then(function(e){if(e.errorCode==r.a){var t=window.open(),s=document.createElement("span");t.window.document.body.appendChild(s),t.location.href=e.datas}else s.innerHTML=e.msg})):this.$message(Object(o.d)("请登录"))},switchGame:function(e,t){if(this.showNavIndex!=t){for(var s=1,i=e.currentTarget.className.split(" "),a=0;a<i.length;a++)-1!=i[a].indexOf("position")&&(s=i[a].substr(-1));for(var n=this.$refs.navList.querySelectorAll(".item"),c=0;c<n.length;c++)for(var o=n[c].className.split(" "),r=0;r<o.length;r++)-1==o[r].indexOf("position_0")&&-1==o[r].indexOf("active")||(o[r]="",o.push("position_"+s),n[c].className=o.join(" "));for(var l=e.currentTarget.className.split(" "),v=0;v<l.length;v++)-1!=l[v].indexOf("position")&&(l[v]="");l.push("position_0 "),l.push("active "),e.currentTarget.className=l.join(" "),this.showNavIndex=t}}},computed:a()({},Object(n.c)({c_homeMenuList:"c_homeMenuList",global_userName:"global_userName"})),components:{}},v={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"live"},[i("div",{staticClass:"banner"},[i("div",{staticClass:"pageWidth"},[i("div",{staticClass:"wrap"},[i("div",{staticClass:"item ag",class:{active:0==e.showNavIndex}},[e._m(0)]),e._v(" "),i("div",{staticClass:"item bbin_daren",class:{active:1==e.showNavIndex}},[e._m(1)]),e._v(" "),i("div",{staticClass:"item bbin_master",class:{active:2==e.showNavIndex}},[e._m(2)]),e._v(" "),i("div",{staticClass:"item pt",class:{active:3==e.showNavIndex}},[e._m(3)])]),e._v(" "),i("div",{ref:"navList",staticClass:"nav"},e._l(e.c_homeMenuList.fish,function(t,s){return i("div",{key:s,staticClass:"item",class:[t.flatCode+" position_"+s,{active:0==s}],on:{click:function(t){e.switchGame(t,s)}}},[i("div",{staticClass:"inner"},[i("div",{staticClass:"shade"}),e._v(" "),i("div",{staticClass:"navContent"},[i("div",{staticClass:"icon",class:t.flatCode}),e._v(" "),i("h3",[e._v(e._s(t.flatName))]),e._v(" "),i("p",[e._v(e._s(t.remark))]),e._v(" "),i("div",{staticClass:"btn",on:{click:function(s){s.stopPropagation(),e.goGame(t.flatCode,t.gameCode)}}},[e._v("开始游戏")])])])])}))])]),e._v(" "),i("div",{staticClass:"content"},[i("div",{staticClass:"pageWidth"},[i("div",{staticClass:"wrap"},[i("div",{directives:[{name:"show",rawName:"v-show",value:0==e.showNavIndex,expression:"showNavIndex == 0"}]},[i("img",{attrs:{src:s("IhO+"),alt:""}})]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:1==e.showNavIndex,expression:"showNavIndex == 1"}]},[i("img",{attrs:{src:s("5Us1"),alt:""}})]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:2==e.showNavIndex,expression:"showNavIndex == 2"}]},[i("img",{attrs:{src:s("e9Yr"),alt:""}})]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:3==e.showNavIndex,expression:"showNavIndex == 3"}]},[i("img",{attrs:{src:s("VIYm"),alt:""}})])])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"ele ele_1"},[t("img",{attrs:{src:s("TiCE"),alt:""}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"ele ele_1"},[t("img",{attrs:{src:s("FiMw"),alt:""}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"ele ele_1"},[t("img",{attrs:{src:s("kbHy"),alt:""}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"ele ele_1"},[t("img",{attrs:{src:s("SY9v"),alt:""}})])}]};var d=s("VU/8")(l,v,!1,function(e){s("3hEM")},"data-v-2a677e4e",null);t.default=d.exports},VIYm:function(e,t,s){e.exports=s.p+"static/img/shdyj_content.3ce72d5.jpg"},e9Yr:function(e,t,s){e.exports=s.p+"static/img/byw_content.e97ae69.jpg"},kbHy:function(e,t,s){e.exports=s.p+"static/img/byw_ele.25ad971.png"}});