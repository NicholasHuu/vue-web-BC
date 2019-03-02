<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!-- 公告 -->

<div class="mgs-text-wrap">
	<marquee behavior="scroll" direction="left" scrollamount="2" scrolldelay="8" onmouseover="this.stop();" onmouseout="this.start();" onclick="winOpenMessage('${ctx}/message/goGongGaoList','message','top=0,left=0,width=800,height=450,resizable=yes')" style=" cursor: pointer;">
	    <c:forEach var="item" items="${dataList}" varStatus="status">
	      <span class="white">${item.ggContent}</span>
	    </c:forEach>
	</marquee>
</div>
<!-- / 公告 -->
