<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page trimDirectiveWhitespaces="true" %>
<div class="row row-one mt10 cf">
<div class="item item-one l">
  <h2>博狗HG贵宾馆</h2>
<!-- LiveHG Enter -->
<c:choose>
  <c:when test="${!empty webUser}">
    <a onclick="winOpen('${ctx}/forwardGame?gameType=hg',window.screen.width,window.screen.height,0,0,'game','hg')" href="javascript:void(0);" class="btn-play block ac white">开始游戏</a>
  </c:when>
  <c:otherwise>
    <a onclick="alert('您尚未登录，请先登录再进行游戏')" href="javascript:void(0);" class="btn-play block ac white">登录</a>
  </c:otherwise>
</c:choose>
<!-- /LiveHG Enter -->
  <p class="sort cf">
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=hg',window.screen.width,window.screen.height,0,0,'game','hg')">百家乐</a>
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=hg',window.screen.width,window.screen.height,0,0,'game','hg')">骰宝</a>
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=hg',window.screen.width,window.screen.height,0,0,'game','hg')">轮盘</a>
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=hg',window.screen.width,window.screen.height,0,0,'game','hg')">龙虎</a>
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=hg',window.screen.width,window.screen.height,0,0,'game','hg')">牛牛</a>
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=hg',window.screen.width,window.screen.height,0,0,'game','hg')">21点</a>
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=hg',window.screen.width,window.screen.height,0,0,'game','hg')">二八杠</a>
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=hg',window.screen.width,window.screen.height,0,0,'game','hg')">色碟</a>
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=hg',window.screen.width,window.screen.height,0,0,'game','hg')">三公</a>
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=hg',window.screen.width,window.screen.height,0,0,'game','hg')">德州扑克</a>
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=hg',window.screen.width,window.screen.height,0,0,'game','hg')">温州牌九</a>
  </p>
</div><!-- /item -->
<!-- Help -->
<div class="notice r">
  <h2>帮助中心</h2>
  <ol>
    <li><a href="${ctx}/goPageCenter?code=help&pgSn=deposite">存款帮助</a></li>
    <li><a href="${ctx}/goPageCenter?code=help&pgSn=withdrawals">取款帮助</a></li>
    <li><a href="${ctx}/goPageCenter?code=help&pgSn=access">存取款常见问题</a></li>
  </ol>
  <h2>24/7客服支持</h2>
  <p>需要协助吗？现在就通过<a href="${ctxMap['msg007']}" target="_blank" class="white">即时聊天</a>联系我们友好的24/7客服人员获得立即帮助。</p>
</div>
<!-- /Help -->
</div><!-- /row -->
<div class="row row-two mt10 cf">
<div class="item item-two l">
  <h2>博狗AG国际馆</h2>
<!-- LiveAG Enter -->
<c:choose>
  <c:when test="${!empty webUser}">
    <a onclick="winOpen('${ctx}/forwardGame?gameType=ag&agGameType=2',window.screen.width,window.screen.height,0,0,'game','ag')" href="javascript:void(0);" class="btn-play block ac white">开始游戏</a>
  </c:when>
  <c:otherwise>
    <a onclick="alert('您尚未登录，请先登录再进行游戏')" href="javascript:void(0);" class="btn-play block ac white">登录</a>
  </c:otherwise>
</c:choose>
<!-- /LiveAG Enter -->
  <p class="sort cf">
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=ag&agGameType=2',window.screen.width,window.screen.height,0,0,'game','ag')">百家乐</a>
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=ag&agGameType=2',window.screen.width,window.screen.height,0,0,'game','ag')">骰宝</a>
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=ag&agGameType=2',window.screen.width,window.screen.height,0,0,'game','ag')">轮盘</a>
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=ag&agGameType=2',window.screen.width,window.screen.height,0,0,'game','ag')">龙虎</a>
    <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=ag&agGameType=2',window.screen.width,window.screen.height,0,0,'game','ag')">牛牛</a>
  </p>
</div><!-- /item -->
<div class="item item-three r">
  <h2>博狗BBIN台湾馆</h2>
<!-- LiveBBIN Enter -->
<c:choose>
  <c:when test="${!empty webUser}">
    <a onclick="winOpen('${ctx}/forwardGame?gameType=bbin&pageSite=live',window.screen.width,window.screen.height,0,0,'game','bbin')" href="javascript:void(0);" class="btn-play block ac white">开始游戏</a>
  </c:when>
  <c:otherwise>
    <a onclick="alert('您尚未登录，请先登录再进行游戏')" href="javascript:void(0);" class="btn-play block ac white">登录</a>
  </c:otherwise>
</c:choose>
<!-- /LiveBBIN Enter -->
  <ul class="sort">
    <li class="cf">
      <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=bbin&pageSite=live',window.screen.width,window.screen.height,0,0,'game','bbin')">百家乐</a>
      <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=bbin&pageSite=live',window.screen.width,window.screen.height,0,0,'game','bbin')">骰宝</a>
      <a href="javascript:void(0);"onclick="winOpen('${ctx}/forwardGame?gameType=bbin&pageSite=live',window.screen.width,window.screen.height,0,0,'game','bbin')">轮盘</a>
    </li>
  </ul>
</div><!-- /item -->
</div><!-- /row -->
<div class="row row-three mt10 cf">
<div class="item item-four l">
  <h2>博狗DS大阳城</h2>
<!-- LiveDS Enter -->
<c:choose>
  <c:when test="${!empty webUser}">
     <a href="javascript:void(0);" onclick="winOpen('${ctx}/forwardGame?gameType=ds',window.screen.width,window.screen.height,0,0,'game','ds')" class="btn-play block ac white">开始游戏</a>
  </c:when>
  <c:otherwise>
    <a onclick="alert('您尚未登录，请先登录再进行游戏')" href="javascript:void(0);" class="btn-play block ac white">登录</a>
  </c:otherwise>
</c:choose>
<!-- /LiveDS Enter -->
  <ul class="sort">
    <li class="cf">
      <a href="javascript:void(0);" onclick="winOpen('${ctx}/forwardGame?gameType=ds',window.screen.width,window.screen.height,0,0,'game','ds')">百家乐</a>
      <a href="javascript:void(0);" onclick="winOpen('${ctx}/forwardGame?gameType=ds',window.screen.width,window.screen.height,0,0,'game','ds')">骰宝</a>
      <a href="javascript:void(0);" onclick="winOpen('${ctx}/forwardGame?gameType=ds',window.screen.width,window.screen.height,0,0,'game','ds')">轮盘</a>
      <a href="javascript:void(0);" onclick="winOpen('${ctx}/forwardGame?gameType=ds',window.screen.width,window.screen.height,0,0,'game','ds')">龙虎</a>
      <a href="javascript:void(0);" onclick="winOpen('${ctx}/forwardGame?gameType=ds',window.screen.width,window.screen.height,0,0,'game','ds')">牛牛</a>
    </li>
  </ul>
</div><!-- /item -->
<div class="item item-five r"></div><!-- /item -->
</div><!-- /row -->