<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/inc.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ include file="inc/common.jsp" %>
<!-- css(lotto) -->
<link rel="stylesheet" href="${resourceRoot}/web/ybb/assets/css/sys_w_lotto.css">
<!-- / css(lotto) -->
</head>

<body class="ybb-web lotto">
<%@ include file="inc/head.jsp" %>
<!-- Banner -->
<div class="banner">
  <div class="container">
    <img src="${resourceRoot}/web/ybb/assets/img/banner_lotto.jpg">
  </div>
</div>
<!-- / Banner -->
<%@ include file="inc/msg.jsp" %>
<!-- 主体 -->
<div class="page-body">
  <div class="container cf">
<!-- 彩票主体 -->
<div class="main inner">
  <div id="lottery-index">
		<div class="wrapper">
			<ul class="clearfix clear list">
				<c:forEach items="${lottery_list}" var="obj" varStatus="sts">
				<c:if test="${obj.value.isEnable == 1 }">
					<li class="lottery-item lottery-item-${obj.value.gameTypeCode}"><a
						href="javascript:void(0)"
						onclick="Go('${ctx}/goPageCenter?code=lottery&cpparam=${obj.value.handicapCode}|${obj.value.gameTypeCode}', 'caipiao');">
							<img
							src="${resourceRoot}/web/ybb/assets/images/lottery/${obj.value.gameTypeCode}.png"
							alt="" />
							<h3>${obj.value.gameTypeName}</h3> </a></li>
				</c:if>
				</c:forEach>
			</ul>
		</div>
	</div>
</div>
<!-- / 彩票主体 -->
  </div>
</div>
<!-- / 主体 -->
<%@ include file="inc/foot.jsp" %>
</html>
