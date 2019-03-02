<%@ page language="java" import="java.util.*,com.mh.commons.constants.*" pageEncoding="utf-8" %>
<%
	Map<String,String> ctxMap = WebSiteManagerConstants.ctxMap;
	request.setAttribute("ctxMap", ctxMap);

	String p = request.getParameter("p");
	if(!"".equals(p) && !"null".equals(p) && p!=null){
		request.getSession().setAttribute("agentNo", p);
	}
%>
<style>
    html{
      font-size:11.5px; 
    }
    .ybb-mobile-header .payment-icon {
	    display: inline-block;
	    position: absolute;
	    width: 50px;
	    overflow: hidden;
	    right: 79px;
    }
    .ybb-mobile-header .r1 div.c-action a.link-user{
      border-radius: 10px;
      border: 0.2rem solid #d6d6d6;
      line-height: 100%;
      height: 100%;
      font-size: 1rem;
      padding: 0.3rem 1rem;
    }
    .ybb-mobile-header .r1 div.c-action a.link-home{
      background: url('${resourceRoot }/m/mobileapp/images/home-icon.png');
      background-repeat: no-repeat;
      background-size: cover;
      width: 2rem;
      height: 2rem;
    }
    .ybb-mobile-header .r1 div.c-action a.link-out{
      background: url('${resourceRoot }/m/mobileapp/images/logout-icon.png');
      background-repeat: no-repeat;
      background-size: cover;
      width: 2rem;
      height: 2rem;
    }
    .flaticon-house58:before {
      content: "\e004";
      font-size: 1.2rem;
    }
    .ybb-mobile-header .r1 a .flaticon-house58{
      text-align: center;
      width: 1.8rem;
      height: 1.8rem;
      border: 0.2rem solid #d6d6d6;
      color: white;
      border-radius: 50%;
      line-height: 1.4rem;
      display: inline-block;
    }
    .ybb-mobile-header .r1{
      height: 5rem;
      background: #000;
    }
    .ybb-mobile-header .r1 .c-action {
      top: 30%;
      position: absolute;
      right: 0;
      margin-right: 0.9rem;
      padding: 0;
    }
    .ybb-mobile-header .r1 .c-action a{
      margin: 0;
      padding: 0;
      margin-left: 1rem;
    }
    .ybb-mobile-logo {
      position: absolute;
      top: 0%;
      left: 0.9rem;
      display: block;
      width: 45%;
      height: 70%;
      margin-left: 0;
    }
    .ybb-mobile-nav .nav-group li {
      padding: 1rem 1%;
      width: 20%;
      float: left;
      box-sizing: border-box;
      text-align: center;
      height: auto;
      line-height: auto;
      font-size: 1rem;
    }
    .ybb-mobile-nav li a{
      line-height: 100%;
      color: #eee;
    }
    .ybb-mobile-nav li a.active {
        color: #ffd32b !important;
    }
</style>
<header class="ybb-mobile-header">
  <div class="r1">
    <a href="#quickMenu" class="btn-menu" style="display: none"><i class="flaticon-rectangular9"></i></a>
    <span class="ybb-mobile-logo">
      <img src="${resourceRoot }/m/mobileapp/images/logo.png" style="width: 70%;vertical-align: middle;height: auto;position: static;max-width: 282px;">
    </span>
    <div class="c-action r">
      <c:choose>
        <c:when test="${empty webUser}">
          <a href="${ctx}/m/main" data-ajax="false" class="link-home"><i class="link-home"></i></a>
          <a href="${ctx}/m/main#/login" data-ajax="false" class="link-user">登录</a>
          <a href="${ctx}/m/main#/register" data-ajax="false" class="link-user">注册</a>
        </c:when>
        <c:otherwise> 
          <a href="${ctx}/m/main" data-ajax="false" class="link-home"><i class="link-home"></i></a>
          <a href="${ctx}/m/wap/member#/home" data-ajax="false" class="link-user">会员中心</a>
          <a href="javascript:void(0);" data-ajax="false" class="link-out" onclick="mobile_loginOut();"></a>
        </c:otherwise>
      </c:choose>
    </div>
    <!-- /Action -->
  </div>
  <!-- /Row1 -->
  <div class="r2 ybb-mobile-nav">
    <nav class="nav-group" style="background: linear-gradient(#424242, #1f1f1f);">
      <ul class="cf" style="margin: 0 auto;padding: 0 1rem;box-sizing: border-box;">
        <li><a href="${ctx}/m/main#/live" data-ajax="false">真人视讯</a></li>
        <li><a href="${ctx}/m/main#/slot" data-ajax="false">电子游戏</a></li>
        <li><a href="${ctx}/m/main#/sport" data-ajax="false">体育赛事</a></li>
        <li><a href="${ctx}/m/wap" data-ajax="false">彩票游戏</a></li>
        <li><a href="${ctx}/m/main?code=bbin" class="<c:if test="${code eq 'bbin' }">active</c:if>" data-ajax="false">BBIN</a></li>
      </ul>
    </nav>
    <!-- /Nav -->
    <nav class="nav-more">
      <ul>
        <li><a href="${ctx}/m/help?code=m_duty" data-ajax="false">博彩责任</a></li>
        <li><a href="${ctx}/m/help?code=m_fair" data-ajax="false">公平与公正</a></li>
        <li><a href="${ctx}/m/help?code=m_rule" data-ajax="false">规则与条款</a></li>
      </ul>
    </nav>
  </div>
  <!-- /Row2 -->
</header>
<!-- /Header -->