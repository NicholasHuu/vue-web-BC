<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!-- 公告 -->
<div class="ui-mod mod-notice">
  <div class="container cf">
    <div class="ui-mod-head l b">最新公告</div>
    <div class="ui-mod-body l">
<marquee behavior="scroll" direction="left" scrollamount="2" scrolldelay="8" onmouseover="this.stop();" onmouseout="this.start();" onclick="winOpenMessage('${ctx}/message/goGongGaoList','message','top=0,left=0,width=800,height=450,resizable=yes')" style=" cursor: pointer;">
<c:forEach var="item" items="${dataList}" varStatus="status">
  <span class="white">${item.ggContent}</span>
</c:forEach>
</marquee>
    </div>
  </div>
</div>
<!-- / 公告 -->
