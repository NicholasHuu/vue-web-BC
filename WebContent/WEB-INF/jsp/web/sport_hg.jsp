<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/inc.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ include file="inc/common.jsp" %>
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
    <iframe src="${ctx}/sport/main" name="sportFrame" id="sportFrame" width="100%" height="750" frameborder="0" scrolling="no"></iframe>
  </div>
</div>
<!-- / 主体 -->
<%@ include file="inc/foot.jsp" %>
</html>
