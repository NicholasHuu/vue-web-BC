<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/inc.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ include file="inc/common.jsp" %>
</head>

<body>
<div class="wrapper ybb-web font-hei">
<%@ include file="inc/head.jsp" %>
<div class="container ybb-page">
<div class="yb-cf-main inner">
  <div class="r1 spr-cf"></div>
  <div class="r2 cf">
    <c:choose>
      <c:when test="${!empty webUser}">
        <a onclick="winOpen('${ctx}/forwardGame?gameType=douji',window.screen.width,window.screen.height,0,0,'game','douji');" title="进入游戏" href="javascript:void(0);" class="btn-play block spr-cf"></a>
      </c:when>
      <c:otherwise>
        <a onclick="alert('您尚未登录，请先登录再进行游戏');" title="进入游戏" href="javascript:void(0);" class="btn-play block spr-cf"></a>
      </c:otherwise>
    </c:choose>
    <a href="${resourceRoot}/web/ybb/html/cf/rule.html" title="查看规则" target="_blank" class="btn-rule block spr-cf"></a>
  </div>
  <div class="r3">
    <h2>游戏简介</h2>
    <p>斗鸡是菲律宾独特的遗产，一种体现了体育精神的传统文化。诚实遵守公平竞赛，尊敬彼此和大方的接受失败是这项运动的规范，菲律宾人都无一例外严格遵守。在追求这项运动中，爱好者被冠于崇高的敬意，而批评者将被排斥。这项运动符合了民主主义。社会的两个极端，从赤脚的农民，到崇高和威武的，以及两者之间的人们，都一视同仁。</p>
    <p>通过采用这种统一的赛事规则和服从其要求，我们希望最终能成功的启发公众，以及减少（如果不能完全消除）社会对Sabong的偏见和不屑。</p>
    <p>保护每个斗鸡爱好者的固有权利和热忱，让他们能享受这项运动，作为我国传统的一部分。</p>
  </div>
</div>
</div>
<!-- /container -->
<%@ include file="inc/foot.jsp" %>
</html>