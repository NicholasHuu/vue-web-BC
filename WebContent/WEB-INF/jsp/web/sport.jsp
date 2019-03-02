<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/inc.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ include file="inc/common.jsp" %>
<!-- css(sport) -->
<link rel="stylesheet" href="${resourceRoot}/web/ybb/assets/css/sys_w_sport.css">
<!-- / css(sport) -->
</head>

<body class="ybb-web sport">
<%@ include file="inc/head.jsp" %>
<!-- Banner -->
<div class="banner">
  <div class="container">
    <img src="${resourceRoot}/web/ybb/assets/img/banner_sport.jpg">
  </div>
</div>
<!-- / Banner -->
<%@ include file="inc/msg.jsp" %>
<!-- 主体 -->
<div class="page-body">
  <div class="container cf">
<!-- 体育赛事平台 -->
<div class="row sports-index-row">
	<div class="wrapper">
		<ul class="clearfix">
			<c:forEach items="${sportSite }" var="item">
				<li class="item item1 clearfix">
					<div class="left">
						<img src="${resourceRoot }/web/ybb/assets/img/sport/sport-banner-${item.flat }.png" alt="" />
						<div class="bg"></div>
					</div>
					<div class="right">
						<img src="${resourceRoot }/web/ybb/assets/img/sport/sport_${item.flat }.png" alt="" />
						<c:choose>
							<c:when test="${item.flat eq 'bbin' }">
								<a href="javascript:void(0)" onclick="winOpen('${ctx}/${item.flatUrl }',window.screen.width,window.screen.height,0,0,'game','${item.flat }')">立即体验</a>
							</c:when>
              				<c:when test="${item.flat eq 'sb' or item.flat eq 'sbt'}">
								<a href="${ctx }/${item.flatUrl}" target="_blank">立即体验</a>
              				</c:when>
							<c:otherwise>
								<a href="${ctx }/${item.flatUrl}">立即体验</a>
							</c:otherwise>
						</c:choose>
					</div>
				</li>
			</c:forEach>
		</ul>
	</div>
</div>
<!-- 体育赛事平台结束 -->
  </div>
</div>
<!-- / 主体 -->
<%@ include file="inc/foot.jsp" %>
</html>
