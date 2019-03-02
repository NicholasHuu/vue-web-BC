<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/inc.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ include file="inc/common.jsp" %>
<!-- css(sport) -->
<link rel="stylesheet" href="${resourceRoot}/web/ybb/assets/css/swiper-4.1.0.min.css">
<link rel="stylesheet" href="${resourceRoot}/web/ybb/assets/css/video-js.css">

<script src="${resourceRoot}/web/ybb/assets/js/swiper-4.1.0.min.js"></script>
<script src="${resourceRoot}/web/ybb/assets/js/video.js"></script>
<script src="${resourceRoot}/web/ybb/assets/js/videojs-ie8.min.js"></script>

<!-- / css(sport) -->
</head>

<body class="ybb-web slot">
<%@ include file="inc/head.jsp" %>
	<!-- Banner -->
	<div class="banner">
		<div class="container " style="height: 250px;">
	      <ul class="bd cf">
	        <li class="ui-item"><img src="${resourceRoot}/web/ybb/assets/img/temp/banner1.jpg"></li>
	        <li class="ui-item"><img src="${resourceRoot}/web/ybb/assets/img/temp/jingxi365.jpg"></li>
	        <li class="ui-item"><img src="${resourceRoot}/web/ybb/assets/img/temp/banner2.jpg"></li>
	        <li class="ui-item"><img src="${resourceRoot}/web/ybb/assets/img/temp/banner0125.jpg"></li>
	        <li class="ui-item"><img src="${resourceRoot}/web/ybb/assets/img/temp/0122banner.jpg"></li>
	      </ul>
      <ul class="hd cf">
        <li class="ui-item"></li>
      </ul>
		</div>
	</div>
	<!-- / Banner -->
<%@ include file="inc/msg.jsp" %>
<!-- 主体 -->
<div class="page-body">
  <div class="container cf">
	<style>
		.swiper-pagination.swiper-pagination-bullets{
			bottom: 63px;
		}
		.swiper-pagination-bullet{
			opacity: 1;
		}
		.video_wrapper .video-js{
			position: absolute;
			top: 58px;
			left: 180px;
		}
		.video-js .vjs-big-play-button{
			top: 160px;
    		left: 280px;
		}
	</style>
	
	<div class="fishing-con clearfix">
		<div class="wrapper">
            <c:forEach items="${cardSite}" var="item">
            	<div class="fish_flat ${item.flat}">
            		<a href="javascript:void(0)" onclick="winOpen('${ctx}/${item.flatUrl}',window.screen.width,window.screen.height,0,0,'game','${item.flat}')" id="landlord">
            			<span>进入游戏</span>
            		</a>
            		
            		<span class="fish_name">${item.flatName}</span>
            		<span class="introduce_game">游戏介绍<i style="display:none;">${item.flat}</i></span>
            	</div>
			</c:forEach>
		</div>
	</div>
	
	<div class="fish_content_box">
		<div class="content_main">
		
		</div>
		
		<div class="content_tab">
			<ul></ul>
		</div>
	</div>

  </div>
</div>

<div class="fishinggame_rule_wrapper">
	<%@include file="fishinggame_rule.jsp"%>

</div>

<script>
$('.fishinggame_rule_wrapper').css('display','none');

var res_bbin_daren_rule = $('.fishinggame_rule_wrapper .res_bbin_daren').html();
var res_bbin_master_rule = $('.fishinggame_rule_wrapper .res_bbin_master').html();
var res_ag_rule = $('.fishinggame_rule_wrapper .res_ag').html();
var res_vg_rule = $('.fishinggame_rule_wrapper .res_vg').html();
var res_pt_rule = $('.fishinggame_rule_wrapper .res_pt').html();

var res_bbin_daren = {
	"gameSpecial" : [
		"${resourceRoot}/web/ybb/assets/img/fishinggame/bbin_daren/gameSpecial/features_bbfg_1.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/bbin_daren/gameSpecial/features_bbfg_2.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/bbin_daren/gameSpecial/features_bbfg_3.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/bbin_daren/gameSpecial/features_bbfg_4.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/bbin_daren/gameSpecial/features_bbfg_5.jpg",
	],
	"odd": [
		"${resourceRoot}/web/ybb/assets/img/fishinggame/bbin_daren/odd/ratio_bbfg_0.jpg",
	],
	"rule": res_bbin_daren_rule
};
var res_bbin_master = {
	"gameSpecial": [
		"${resourceRoot}/web/ybb/assets/img/fishinggame/bbin_master/gameSpecial/features_bbfm_0.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/bbin_master/gameSpecial/features_bbfm_1.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/bbin_master/gameSpecial/features_bbfm_2.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/bbin_master/gameSpecial/features_bbfm_3.jpg"
	],
	"video" : {
		"src" : "${resourceRoot}/web/ybb/assets/img/fishinggame/bbfm.mp4",
		"poster" : "${resourceRoot}/web/ybb/assets/img/fishinggame/video_poster.png",
	},
	"odd": [
		"${resourceRoot}/web/ybb/assets/img/fishinggame/bbin_master/odd/ratio_bbfm_0.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/bbin_master/odd/ratio_bbfm_1.jpg",
	],
	"rule": res_bbin_master_rule
};
var res_ag = {
	"gameSpecial": [
		"${resourceRoot}/web/ybb/assets/img/fishinggame/ag/gameSpecial/features_ptfish_0.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/ag/gameSpecial/features_ptfish_1.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/ag/gameSpecial/features_ptfish_2.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/ag/gameSpecial/features_ptfish_3.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/ag/gameSpecial/features_ptfish_4.jpg"
	],
	"odd": [
		"${resourceRoot}/web/ybb/assets/img/fishinggame/ag/odd/ratio_ptfish_0.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/ag/odd/ratio_ptfish_1.jpg",
	],
	"rule": res_ag_rule
};
var res_vg = {
	"gameSpecial": [
		"${resourceRoot}/web/ybb/assets/img/fishinggame/vg/gameSpecial/features_agslotfish_0.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/vg/gameSpecial/features_agslotfish_1.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/vg/gameSpecial/features_agslotfish_2.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/vg/gameSpecial/features_agslotfish_3.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/vg/gameSpecial/features_agslotfish_4.jpg",
	],
	"odd": [
		"${resourceRoot}/web/ybb/assets/img/fishinggame/vg/odd/ratio_agslotfish_0.jpg",
	],
	"rule": res_vg_rule
};

var res_pt = {
	"gameSpecial": [
		"${resourceRoot}/web/ybb/assets/img/fishinggame/pt/gameSpecial/pt_gameSpecial_1.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/pt/gameSpecial/pt_gameSpecial_2.jpg",
	],
	"odd": [
		"${resourceRoot}/web/ybb/assets/img/fishinggame/pt/odd/pt_odd_1.jpg",
		"${resourceRoot}/web/ybb/assets/img/fishinggame/pt/odd/pt_odd_2.jpg",
	],
	"rule": res_pt_rule
};

var gameData = {

	"bbin_daren" : {
		"title" : [{
			"showType" : "gameSpecial",
			"name" : "游戏特色",
		},{
			"showType" : "odd",
			"name" : "鱼群赔率",
		},{
			"showType" : "rule",
			"name" : "规则说明",
		}],
		"gameSpecial" : {
			"name" : "游戏特色",
			"type" : 1,
			"content" : res_bbin_daren.gameSpecial
		},
		"odd" : {
			"name" : "鱼群赔率",
			"type" : 3,
			"content" : res_bbin_daren.odd
		},
		"rule" : {
			"name" : "规则说明",
			"type" : 4,
			"content" : res_bbin_daren.rule
		}
	},
	"bbin_master" : {
		"title" : [{
			"showType" : "gameSpecial",
			"name" : "游戏特色",
		},{
			"showType" : "video",
			"name" : "精彩视频",
		},{
			"showType" : "odd",
			"name" : "鱼群赔率",
		},{
			"showType" : "rule",
			"name" : "规则说明",
		}],
		"gameSpecial" : {
			"name" : "游戏特色",
			"type" : 1,
			"content" : res_bbin_master.gameSpecial
		},
		"video" : {
			"name" : "精彩视频",
			"type" : 2,
			"content" : res_bbin_master.video
		},
		"odd" : {
			"name" : "鱼群赔率",
			"type" : 3,
			"content" : res_bbin_master.odd
		},
		"rule" : {
			"name" : "规则说明",
			"type" : 4,
			"content" : res_bbin_master.rule
		}
	},
	"ag" : {
		"title" : [{
			"showType" : "gameSpecial",
			"name" : "游戏特色",
		},{
			"showType" : "odd",
			"name" : "鱼群赔率",
		}],
		"gameSpecial" : {
			"name" : "游戏特色",
			"type" : 1,
			"content" : res_ag.gameSpecial
		},
		"odd" : {
			"name" : "鱼群赔率",
			"type" : 3,
			"content" : res_ag.odd
		},
	},
	"vg" : {
		"title" : [{
			"showType" : "gameSpecial",
			"name" : "游戏特色",
		},{
			"showType" : "odd",
			"name" : "鱼群赔率",
		}],
		"gameSpecial" : {
			"name" : "游戏特色",
			"type" : 1,
			"content" : res_vg.gameSpecial
		},
		"odd" : {
			"name" : "鱼群赔率",
			"type" : 3,
			"content" : res_vg.odd
		}
	},
	"pt" : {
		"title" : [{
			"showType" : "gameSpecial",
			"name" : "游戏特色",
		},{
			"showType" : "odd",
			"name" : "鱼群赔率",
		}],
		"gameSpecial" : {
			"name" : "游戏特色",
			"type" : 1,
			"content" : res_pt.gameSpecial
		},
		"odd" : {
			"name" : "鱼群赔率",
			"type" : 3,
			"content" : res_pt.odd
		}
		
	},
	
};

</script>
<!-- / 主体 -->
<%@ include file="inc/foot.jsp" %>
</html>
