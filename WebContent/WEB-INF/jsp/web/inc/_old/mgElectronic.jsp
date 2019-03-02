<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ page trimDirectiveWhitespaces="true" %>
<link rel="Stylesheet" href="http://www.tickerassist.co.uk/ProgressiveTickers/include/css/ProgressiveTickers.css" />
<!-- SlotsBody -->
<div class="ybb-slots-bd">
  <div class="hall">
    <ul class="cf">
      <li class="active"><a href="${ctx}/electronic?code=mg">MG电子厅</a></li>
      <li><a href="${ctx}/electronic?code=pt">PT电子厅</a></li>
      <li><a href="${ctx}/electronic?code=nt">NT电子厅</a></li>
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
  </div>
  <!-- /hall -->
  <div id="tabs-container">
    <div class="container">
      <div class="sort">
        <ul class="cf">
      <li><a href="${ctx}/electronic?code=mg&gameType1=Table">桌面游戏</a></li>
      <li><a href="${ctx}/electronic?code=mg&gameType1=Slots">老虎机</a></li>
      <li><a href="${ctx}/electronic?code=mg&gameType1=NewSlots">新老虎机</a></li>
      <li><a href="${ctx}/electronic?code=mg&gameType1=Video">视频扑克</a></li>
      <li><a href="${ctx}/electronic?code=mg&gameType1=Qt">其他游戏</a></li>
      <li><a href="${ctx}/electronic?code=mg&gameType1=Pot" style=" font-weight: bold; color: #ff0;">累计彩池</a></li>
        </ul>
      </div>
      <!-- /sort -->
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
                    <i><a target="_blank" onclick="winOpen('${ctx}/forwardGame?gameType=mgElectronic&gameName=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','mg');return false;" href="javascript:void(0);">开始游戏</a></i>
                  </c:when>
                  <c:otherwise>
                    <i><a href="javascript:void(0);" onclick="alert('您尚未登录，请先登录再进行游戏');" >开始游戏</a></i>
                  </c:otherwise>
                </c:choose>
              </div>
          <c:if test="${gameType1 eq 'Pot' }">
            <div class="title abs" id="${item.eleGameId}" style=" margin-top: 120px;">
              <h6><script type="text/javascript" src="http://www.tickerassist.co.uk/ProgressiveTickers/include/js/ProgressiveTickersControl.js?progid=${item.eleGameName}&font-color=yellow&font-family=verdana&showlogo=no&currency=CNY"></script></h6>
              <div class="bg-black abs"></div>
              <script type="text/javascript">
              function reflashPot() {
                var index = Math.floor(Math.random() * 1.6) + 0.9;
                var id = "progressive" + '${item.eleGameName}';
                setInterval(function() {
                  var step = Math.floor(Math.random() * 6 + 1);
                  var s = document.getElementById(id).value;
                  var priceVal = parseFloat(s.replace(/[^0-9-]/g, '')); // 1234599
                  priceVal = (priceVal + step) / 100;
                  //alert(priceVal)
                  /* if(s.indexOf("$")>-1){
                    s= s.replace("$","");
                  } */
                  var num = formatMoney(priceVal, 2, "$");
                  document.getElementById(id).value = num;
                }, 1000 * index);
              }
              reflashPot();
              </script>
            </div>
          </c:if>
          <c:choose>
            <c:when test="${gameType1 eq 'Pot' }">
              <img class="lazy" width="230" height="150" data-original="${resourceRoot}/web/ybb/common/images/mg/${item.eleGamePic}.jpg" src="${resourceRoot}/web/ybb/common/images/grey.gif" />
            </c:when>
            <c:otherwise>
              <a class="gm-ic-mg lazy" data-original="${resourceRoot}/web/ybb/common/images/mg/${item.eleGamePic}.png" style="background-image: url(${resourceRoot}/web/ybb/common/images/grey.gif)"></a>
            </c:otherwise>
          </c:choose>
            </div>
          </c:forEach>
        </div>
      </div>
      <!-- /group -->
    </div>
  </div>
</div>
<!-- /SlotsBody -->