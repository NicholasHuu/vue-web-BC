<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!-- 公告 -->

<div class="promo-text-wrap">
	<marquee behavior="scroll" direction="left" scrollamount="2" scrolldelay="8" onmouseover="this.stop();" onmouseout="this.start();"  style=" cursor: pointer;">
	<a href="goPageCenter?code=promos">
	<c:forEach var="t" items="${promoList}">
	  <span class="white">${t.pmsTitle }${t.pmsSubTitle }&nbsp;</span>
	</c:forEach>
	</a>
	</marquee>
</div>
<!-- / 公告 -->
