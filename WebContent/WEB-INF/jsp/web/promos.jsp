<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/inc.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ include file="inc/common.jsp" %>
</head>

<body>
<%@ include file="inc/head.jsp" %>
<!-- Banner -->
<div class="banner">
  <div class="container">
    <img src="${resourceRoot}/web/ybb/assets/img/temp/banner0125.jpg">
  </div>
</div>
<!-- / Banner -->
<%@ include file="inc/msg.jsp" %>
<!-- 主体 -->
<div class="page-body">
  <div class="container ybb-page ybb-promos">
<div class="promo-main inner">
<c:choose>
<c:when test="${ctxMap['wspromos'] eq '1' }">
  <%@ include file="inc/promos.jsp" %>
</c:when>
<c:otherwise>
  <%@ include file="inc/promosSimple.jsp" %>
</c:otherwise>
</c:choose>
</div>
  </div>
</div>
<!-- / 主体 -->
<%@ include file="inc/foot.jsp" %>
</html>