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
  <ul class="cf">
<c:choose>
<c:when test="${!empty webUser}">
    <li class="item i1">
      <h6 class="name">香港六合彩</h6>
      <a onclick="winOpen('${ctx}/lottery',window.screen.width,window.screen.height,0,0,'彩票','caipiao')" href="javascript:void(0);" title="点击进入" class="icon"></a>
    </li>
    <li class="item i2">
      <h6 class="name">福彩3D</h6>
      <a onclick="winOpen('${ctx}/lottery',window.screen.width,window.screen.height,0,0,'彩票','caipiao')" href="javascript:void(0);" title="点击进入" class="icon"></a>
    </li>
    <li class="item i3">
      <h6 class="name">排列3</h6>
      <a onclick="winOpen('${ctx}/lottery',window.screen.width,window.screen.height,0,0,'彩票','caipiao')" href="javascript:void(0);" title="点击进入" class="icon"></a>
    </li>
    <li class="item i4">
      <h6 class="name">重庆时时彩</h6>
      <a onclick="winOpen('${ctx}/lottery',window.screen.width,window.screen.height,0,0,'彩票','caipiao')" href="javascript:void(0);" title="点击进入" class="icon"></a>
    </li>
    <li class="item i5">
      <h6 class="name">天津时时彩</h6>
      <a onclick="winOpen('${ctx}/lottery',window.screen.width,window.screen.height,0,0,'彩票','caipiao')" href="javascript:void(0);" title="点击进入" class="icon"></a>
    </li>
    <li class="item i6">
      <h6 class="name">江西时时彩</h6>
      <a onclick="winOpen('${ctx}/lottery',window.screen.width,window.screen.height,0,0,'彩票','caipiao')" href="javascript:void(0);" title="点击进入" class="icon"></a>
    </li>
    <li class="item i7">
      <h6 class="name">新疆时时彩</h6>
      <a onclick="winOpen('${ctx}/lottery',window.screen.width,window.screen.height,0,0,'彩票','caipiao')" href="javascript:void(0);" title="点击进入" class="icon"></a>
    </li>
    <li class="item i8">
      <h6 class="name">广东快乐十分</h6>
      <a onclick="winOpen('${ctx}/lottery',window.screen.width,window.screen.height,0,0,'彩票','caipiao')" href="javascript:void(0);" title="点击进入" class="icon"></a>
    </li>
    <li class="item i9">
      <h6 class="name">天津快乐十分</h6>
      <a onclick="winOpen('${ctx}/lottery',window.screen.width,window.screen.height,0,0,'彩票','caipiao')" href="javascript:void(0);" title="点击进入" class="icon"></a>
    </li>
    <li class="item i10">
      <h6 class="name">北京PK10</h6>
      <a onclick="winOpen('${ctx}/lottery',window.screen.width,window.screen.height,0,0,'彩票','caipiao')" href="javascript:void(0);" title="点击进入" class="icon"></a>
    </li>
</c:when>
<c:otherwise>
    <li class="item i1">
      <h6 class="name">香港六合彩</h6>
      <a href="javascript:void(0);" title="未登录，请登录后游戏" data-toggle="modal" data-target=".modal-login" class="icon"></a>
    </li>
    <li class="item i2">
      <h6 class="name">福彩3D</h6>
      <a href="javascript:void(0);" title="未登录，请登录后游戏" data-toggle="modal" data-target=".modal-login" class="icon"></a>
    </li>
    <li class="item i3">
      <h6 class="name">排列3</h6>
      <a href="javascript:void(0);" title="未登录，请登录后游戏" data-toggle="modal" data-target=".modal-login" class="icon"></a>
    </li>
    <li class="item i4">
      <h6 class="name">重庆时时彩</h6>
      <a href="javascript:void(0);" title="未登录，请登录后游戏" data-toggle="modal" data-target=".modal-login" class="icon"></a>
    </li>
    <li class="item i5">
      <h6 class="name">天津时时彩</h6>
      <a href="javascript:void(0);" title="未登录，请登录后游戏" data-toggle="modal" data-target=".modal-login" class="icon"></a>
    </li>
    <li class="item i6">
      <h6 class="name">江西时时彩</h6>
      <a href="javascript:void(0);" title="未登录，请登录后游戏" data-toggle="modal" data-target=".modal-login" class="icon"></a>
    </li>
    <li class="item i7">
      <h6 class="name">新疆时时彩</h6>
      <a href="javascript:void(0);" title="未登录，请登录后游戏" data-toggle="modal" data-target=".modal-login" class="icon"></a>
    </li>
    <li class="item i8">
      <h6 class="name">广东快乐十分</h6>
      <a href="javascript:void(0);" title="未登录，请登录后游戏" data-toggle="modal" data-target=".modal-login" class="icon"></a>
    </li>
    <li class="item i9">
      <h6 class="name">天津快乐十分</h6>
      <a href="javascript:void(0);" title="未登录，请登录后游戏" data-toggle="modal" data-target=".modal-login" class="icon"></a>
    </li>
    <li class="item i10">
      <h6 class="name">北京PK10</h6>
      <a href="javascript:void(0);" title="未登录，请登录后游戏" data-toggle="modal" data-target=".modal-login" class="icon"></a>
    </li>
</c:otherwise>
</c:choose>
  </ul>
</div>
<!-- / 彩票主体 -->
  </div>
</div>
<!-- / 主体 -->
<%@ include file="inc/foot.jsp" %>
</html>
