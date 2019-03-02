<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/inc.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ include file="inc/common.jsp" %>
<!-- css(sport) -->
<link rel="stylesheet" href="${resourceRoot}/web/ybb/assets/css/sys_w_sport.css">
<!-- / css(sport) -->
</head>

<body class="ybb-web sport">
<%@ include file="inc/head.jsp" %>
	<!-- 主体 -->
	<div class="page-body">
	  <div class="container cf">
	     <!-- 手机版本  -->
	        <div class="body__mobile">
	           <div class="body__wrapper">
	               <div class="mobile-left"><img src="${resourceRoot }/web/ybb/assets/img/mobile-ver.png" alt="" /></div>
	               <div class="mobile-right">
	                   <div class="mobiel-right__wrapper">
	                       <div class="desc-wrapper">
	                           <h3>独家App下载</h3>
	                           <h4>更快&nbsp;更强;&nbsp;随时随地想玩就玩</h4>
	                           <p>采用全新技术开发.运行更流畅操作更便捷</p>
	                           <p>采用独家安全技术，防止域名劫持，更强的防护确保您的资金和资料</p>
	                           <p>安全，为您打造一更加安全的游戏环境。</p>
	                       </div>
	                       <div class="img-wrapper">
	                           <div class="ios">
		                           <h5>扫一扫下载APP</h5>
	                               <img src="${resourceRoot }/web/ybb/assets/img/mobile-ios-qrcode.jpg" alt="" />
	                               <a href=""><img src="${resourceRoot }/web/ybb/assets/img/btn-ios-download.png" alt="" /></a>
	                           </div>
	                           <div class="android">
                                   <h5>扫一扫下载APP</h5>
                                   <img src="${resourceRoot }/web/ybb/assets/img/mobile-android-qrcode.jpg" alt="" />
                                   <a href=""><img src="${resourceRoot }/web/ybb/assets/img/btn--download-android.png" alt="" /></a>
	                           </div>
	                       </div>
	                       <div class="fdesc-wrapper">
	                           <h3>独家WAP端</h3>
	                           <h4>无需下载输入网址即可畅玩</h4>
	                           <p>使用手机浏览器输入网址 <a href="">www.1b100.com 即可畅玩</a> </p>
	                       </div>
	                   </div>
	               </div>
	           </div>
	        </div>
	     <!-- 手机版本结束 -->
	  </div>
	</div>
	<!-- / 主体 -->
	<%@ include file="inc/foot.jsp" %>
</html>
