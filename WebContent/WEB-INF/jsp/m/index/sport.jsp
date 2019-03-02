
<%@page import="com.mh.commons.conf.ResourceConstant"%>
<%@ page language="java" import="java.util.*,com.mh.commons.constants.*"
    contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="com.mh.commons.utils.ServletUtils"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="mh" uri="http://www.mh.com/framework/tags" %>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title></title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
  
  <script>
    var root = "${resourceRoot}";
    var rootPath = "${ctx}";
    var resourceRoot = "${resourceRoot}/m/mobileapp";
    var copyright = "${ctxMap['siteFooter'] }";
    var onlineServiceLink = "${ctxMap['msg007'] }";
    var defaultAgent = '${agentNo}';
    var sliders = [];
    <c:forEach var="item" items="${carousels}" varStatus="status">
        sliders.push('${item.crsPic}');
    </c:forEach>
    var defaultPath = '/sport';
  </script>

  <% request.getSession().setAttribute("isDev", false);   %>
  <c:choose>
    <c:when test="${isDev}">
      <link rel="stylesheet" href="http://192.168.0.100:8881/built/css/main.min.css">
      <script src="http://192.168.0.100:8881/built/scripts/vendor.min.js"></script>
      <script src="http://192.168.0.100:8881/built/scripts/main.min.js"></script>
    </c:when>
    <c:otherwise>
      <link rel="stylesheet" href="${resourceRoot}/m/mobileapp/built/css/main.min.css">
      <script src="${resourceRoot}/m/mobileapp/built/scripts/vendor.min.js"></script>
      <script src="${resourceRoot}/m/mobileapp/built/scripts/main.min.js"></script>
    </c:otherwise>
  </c:choose>
  
</head>
<body>
    
  <div id="mobile-app"></div>
</body>
</html>

<script>
</script>