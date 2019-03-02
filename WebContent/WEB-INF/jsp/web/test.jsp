<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/inc.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ include file="inc/common.jsp" %>
  <link rel="stylesheet" href="${resourceRoot}/web/ybb/common/plugins/jui/smoothness/jquery-ui.min.css">
</head>

<body>
<div id="body-wrap" class="clearfix">
<%@ include file="inc/head.jsp" %>
<div class="container ybb-page ybb-assist ybb-signup">
<div class="assist-main inner cf">
  <div class="c1 l">
    <div class="r1">
      <ul>
        <li><a href="index" class="block">首页</a></li>
        <li><a href="${ctx}/goPageCenter?code=sport" class="block">体育赛事</a></li>
        <li><a href="${ctx}/goPageCenter?code=live" class="block">视讯直播</a></li>
        <li><a href="${ctx}/electronic?code=mg" class="block">电子游艺</a></li>
        <li><a href="${ctx}/goPageCenter?code=lottery" class="block">彩票游艺</a></li>
        <li><a href="${ctx}/goPageCenter?code=promos" class="block">最新优惠</a></li>
      </ul>
    </div>
    <div class="r2 mt10">
      <a href="${ctx}/goPageCenter?code=promos"><img src="${resourceRoot}/web/ybb/assets/img/assist/c1r2.jpg"></a>
    </div>
  </div>
  <div class="c2 ybb-pg-ct r">
    <%@ include file="inc/test.jsp" %>
  </div>
</div>
</div>
<!-- /container -->
<%@ include file="inc/foot.jsp" %>
<script>
$('.ybb-try').slide({
  titCell: '.ybb-md-tt li',
  mainCell: '.ybb-md-ct ul',
  trigger: 'click'
});
</script>
</html>