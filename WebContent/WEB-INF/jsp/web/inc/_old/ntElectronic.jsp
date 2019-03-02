<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page trimDirectiveWhitespaces="true" %>
<!-- SlotsBody -->
<div class="ybb-slots-bd">
<div class="hall">
<ul class="cf">
  <li><a href="${ctx}/electronic?code=mg">MG电子厅</a></li>
  <li><a href="${ctx}/electronic?code=pt">PT电子厅</a></li>
  <li class="active"><a href="${ctx}/electronic?code=nt">NT电子厅</a></li>
<c:choose>
<c:when test="${!empty webUser}">
  <li><a onclick="winOpen('${ctx}/forwardGame?gameType=bbin&pageSite=game',window.screen.width,window.screen.height,0,0,'game','bbin');return false;" href="javascript:void(0);" target="_blank">BBIN电子厅</a></li>
  <li><a onclick="winOpen('${ctx}/forwardGame?gameType=ag&agGameType=2',window.screen.width,window.screen.height,0,0,'game','ag');return false;" href="javascript:void(0);" target="_blank">AG电子厅</a></li>
</c:when>
<c:otherwise>
  <li><a href="javascript:void(0);" onclick="alert('您尚未登录，请先登录再进行游戏')">BBIN电子厅</a></li>
  <li><a href="javascript:void(0);" onclick="alert('您尚未登录，请先登录再进行游戏')">AG电子厅</a></li>
</c:otherwise>
</c:choose>
</ul>
</div><!-- /hall -->
<div class="group">
<div class="section cf">
<c:forEach var="item" items="${result}" varStatus="status">
  <div class="item">
    <div class="title abs">
      <h6>${item.eleGameCnname}</h6>
      <div class="bg-black abs"></div>
    </div>
    <div class="overlay abs">
<c:choose>
<c:when test="${!empty webUser}">
      <i><a onclick="winOpen('${ctx}/forwardGame?gameType=ntElectronic&game=${item.eleGameCode}',window.screen.width,window.screen.height,0,0,'game','nt');return false;" href="javascript:void(0);" target="_blank" class="block">开始游戏</a></i>
</c:when>
<c:otherwise>
      <i><a onclick="alert('您尚未登录，请先登录再进行游戏')" href="javascript:void(0);" class="block">登录</a></i>
</c:otherwise>
</c:choose>
    </div>
    <img class="lazy" width="230" height="150" data-original="${resourceRoot}/web/ybb/common/images/nt/${item.eleGamePic}.jpg" src="${resourceRoot}/web/ybb/common/images/gray.gif"/>
  </div>
</c:forEach>
</div>
</div><!-- /group -->
</div>
<!-- /SlotsBody -->