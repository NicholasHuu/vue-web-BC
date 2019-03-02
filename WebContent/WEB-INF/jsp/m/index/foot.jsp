<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<!--   <div data-role="footer" data-theme="x" class="ybb-mobile-footer">
  <div class="r1">
    <ul class="cf">
    <li><a href="${ctx }/m/help?code=m_duty" data-ajax="false">博彩责任</a></li>
    <li><a href="${ctx }/m/help?code=m_fair" data-ajax="false">公平与公正</a></li>
    <li><a href="${ctx }/m/help?code=m_rule" data-ajax="false">规则与条款</a></li>
    </ul>
  </div>
  <div class="r2">
    <ul class="cf">
      <li class="a18 spr-common"></li>
      <li class="ag spr-common"></li>
      <li class="mg spr-common"></li>
      <li class="pt spr-common"></li>
    </ul>
  </div>
  <div class="r3 ac">
    <p>Copyright &copy; ${ctxMap['siteName'] } All Reserved.</p>
  </div>
</div> -->
<style>
  .footer {
    height: 6rem;
    background-color: #151515;
    margin-top: 0rem;
    color: #fff;
    width: 100%;
    bottom: 0;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    padding-bottom: 2rem;
  }
  .footer .inner {
      padding: 1rem 0;
      text-align: center;
  }
  .footer .inner .flinks a {
      color: #9c9898;
      display: inline-block;
      padding-right: 1rem;
  }
  .footer .inner .flinks a:last-child {
      color: #9c9898;
      display: inline-block;
      padding-right: 0;
  }
  .footer .inner .flogo img {
      width: 80%;
      display: block;
      margin: 0 auto;
  }
  .footer .inner p {
      color: #9c9898;
      margin: 0;
  }
</style>
<div class="footer" data-role="footer" data-theme="x">
  <div class="inner">
    <div class="flinks">
      <a href="${ctx }/m/help?code=m_duty">博彩责任</a>
      <a href="${ctx }/m/help?code=m_fair">公平与责任</a>
      <a href="${ctx }/m/help?code=m_rule">规则与条款</a>
    </div>
    <div class="flogo">
      <img src="${resourceRoot }/m/mobileapp/images/flogo.png">
    </div>
    <p class="copyright">${ctxMap['siteFooter'] }</p>
  </div>
</div>
