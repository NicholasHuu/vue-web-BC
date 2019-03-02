<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/inc.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ include file="inc/common.jsp" %>
<!-- css(sport) -->
<link rel="stylesheet" href="${resourceRoot}/web/ybb/assets/css/sys_w_sport.css">
<!-- / css(sport) -->
</head>

<body class="ybb-web assist help">
<%@ include file="inc/head.jsp" %>
<!-- Banner -->
<div class="banner">
  <div class="container">
    <img src="${resourceRoot}/web/ybb/assets/img/banner_help.jpg">
  </div>
</div>
<!-- / Banner -->
<%@ include file="inc/msg.jsp" %>
<!-- 主体 -->
<div class="page-body">
  <div class="container ybb-page ybb-assist assist-main cf">
    <!-- 侧边栏 -->
    <div class="page-sidebar l">
      <div class="ui-mod mod-slot">
        <!-- 菜单 -->
        <div class="ui-mod mod-menu">
          <div class="ui-mod-head ac b" style="font-size: 14px; color: yellow;">歡迎蒞臨</div>
          <div class="ui-mod-body pt10">
            <ul id="tabs" class="ui-group">
              <c:forEach var="wp" items="${wpList}" varStatus="s">
                <li class="ui-item ${wp.pgSn eq param.pgSn ? 'ui-active' : ''}">
                  <a href="${resourceRoot}/web/ybb/html/help/${wp.pgSn }.html" class="ui-link">${wp.pgTitle}</a>
                </li>
              </c:forEach>
            </ul>
          </div>
        </div>
        <!-- / 菜单 -->
      </div>
    </div>
    <!-- / 侧边栏 -->
    <!-- 主内容 -->
    <div class="page-main yb-assist-content r">
      <div id="tabs-container">稍候，载入中</div>
    </div>
    <!-- 主内容 -->
  </div>
</div>
<!-- / 主体 -->

<%@ include file="inc/foot.jsp" %>
</html>
