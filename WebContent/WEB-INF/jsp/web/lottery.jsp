<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/inc.jsp"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ include file="inc/common.jsp"%>
<!-- css(lotto) -->
<link rel="stylesheet"
	href="${resourceRoot}/web/ybb/assets/css/sys_w_lotto.css">
<!-- / css(lotto) -->
</head>

<body class="ybb-web lotto">
	<%@ include file="inc/head.jsp"%>
	
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
			<div class="main inner" style="width: 1030px;">
				<jsp:include page="inc/lottery.jsp" />
			</div>
			<!-- / 彩票主体 -->
		</div>
	</div>
	<!-- / 主体 -->
	<%@ include file="inc/foot.jsp"%>
</html>
