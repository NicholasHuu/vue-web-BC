<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/inc.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ include file="inc/common.jsp" %>
<!-- css(live) -->
<link rel="stylesheet" href="${resourceRoot}/web/ybb/assets/css/sys_w_live.css">
<!-- / css(live) -->
</head>

<body class="ybb_web live">
<%@ include file="inc/head.jsp" %>
<!-- Banner -->
<div class="banner">
  <div class="container">
    <img src="${resourceRoot}/web/ybb/assets/img/banner_live.jpg">
  </div>
</div>
<!-- / Banner -->
<%@ include file="inc/msg.jsp" %>
<!-- 主体 -->
<div class="page-body" style="padding-top:0">
  <div class="container cf">

<div class="row" style=" margin: auto; width: 1000px;">
  <div class="game-list noselect" style=" padding-left: 10px">
  	
  	<c:forEach items="${liveSite }" var="item">
	 	<div class="item top">
	      <div class="img">
	        <img src="${resourceRoot}/web/ybb/assets/img/live/live_bg_${item.flat }.jpg" />
	      </div>
	      <div class="logo ${item.flat }"></div>
	      <div class="money">${item.flatName }</div>
	      <div class="hover">
	        <div class="logo ${item.flat }"></div>
	        <div class="text">${item.flatDes }</div>
	        <div class="actions">
	          <c:choose>
	            <c:when test="${!empty webUser}">
	              <a href="javascript:void(0)" onclick="winOpen('${ctx}/${item.flatUrl }',window.screen.width,window.screen.height,0,0,'game','${item.flat }')" title="点击进入" class="enter">进入游戏</a>
	            </c:when>
	            <c:otherwise>
	              <a href="javascript:void(0)" onclick="alert('您尚未登录，请先登录再进行游戏')" title="点击进入" class="enter">进入游戏</a>
	            </c:otherwise>
	          </c:choose>
	        </div>
	      </div>
	    </div>
  	</c:forEach>
  </div>
</div>
<script>
var show = function() {
  $(this).children('.logo').hide();
  $(this).children('.money').hide();
  $(this).find('.hover').stop().fadeIn(200);
}
var hide = function() {
  $(this).children('.logo').show();
  $(this).children('.money').show();
  $(this).find('.hover').stop().fadeOut(200);
}
$('.game-list .item').hover(show, hide);
</script>

  </div>
</div>
<!-- / 主体 -->
<%@ include file="inc/foot.jsp" %>
</html>
