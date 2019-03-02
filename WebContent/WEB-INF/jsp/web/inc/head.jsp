<%@ page language="java" pageEncoding="UTF-8" %>
<%
String reFlag = (String)request.getSession().getAttribute("PARAM_S");
if ("0".equals(reFlag)) {
request.getSession().removeAttribute("PARAM_S");
out.flush();
out.println("<script>");
out.println("alert('您尚未登录，请先登录再进行游戏!');");
out.println("</script>");
}
%>
<script>
var isLogin = false;
<c:if test="${!empty webUser}">
isLogin = true;
</c:if>
</script>
<!-- 菜单 -->
<div class="mod-menu-top">
  <div class="container">
    <div class="row">
      <div class="col-sm-6">
        <div id="est-time"></div>
      </div>
      <div class="col-sm-6">
        <ul class="ui-group cf">
          <li class="ui-item"><a href="${ctx}/commons/web/jsp/createDesk.jsp" class="ui-link">桌面快捷</a></li>
          <li class="ui-item"><a href="javascript:void(0);" data-toggle="modal" data-target=".modal-url" class="ui-link" >备用网址</a></li>
          <li class="ui-item"><a href="http://www.1b.cc" target="_blank" class="ui-link">线路检测</a></li>
          <li class="ui-item"><a id="addToF" onclick="bookMarksite('http://'+ window.location.hostname,'易博亚洲1b.cc');" href="javascript:void(0);" class="ui-link">加入收藏</a></li>
          <li class="ui-item"><a id="setHome" onclick="setFirst('http://'+ window.location.hostname)" href="javascript:void(0);" class="ui-link">设为首页</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
<!-- / 菜单 -->
<!-- 头部 -->
<div class="header-zone">
  <div class="header">
    <div class="container cf">
      <div class="l">
        <h1 class="logo"><a href="${ctx}/" class="ui-link"></a></h1>
      </div>
      <div class="r">
        <!-- 控制面板 -->
        <div class="mod-panel">
          <c:choose>
          <c:when test="${!empty webUser}">
          <div class="active">
            <div class="ui-group group-1 cf">
              <div class="ui-item item-1">
                <a onclick="GoToMember('${ctx}/member/main')" href="javascript:void(0);" class="ui-link">
                  <i class="ui-icon"></i><div class="ui-txt">会员中心</div>
                </a>
              </div>
              <div class="ui-item item-2">
                <a onclick="GoToMember('${ctx}/member/main?type=1')" href="javascript:void(0);" class="ui-link">
                  <i class="ui-icon"></i><div class="ui-txt">线上存款</div>
                </a>
              </div>
              <div class="ui-item item-3">
                <a onclick="GoToMember('${ctx}/member/main?type=2')" href="javascript:void(0);" class="ui-link">
                  <i class="ui-icon"></i><div class="ui-txt">线上取款</div>
                </a>
              </div>
              <div class="ui-item item-4">
                <a onclick="GoToMember('${ctx}/member/main?type=3')" href="javascript:void(0);" class="ui-link">
                  <i class="ui-icon"></i><div class="ui-txt">额度转换</div>
                </a>
              </div>
              <div class="ui-item item-5">
                <a onclick="GoToMember('${ctx}/member/main?type=4')" href="javascript:void(0);" class="ui-link">
                  <i class="ui-icon"></i><div class="ui-txt">往来记录</div>
                </a>
              </div>
              <script type="text/javascript">
              setInterval('refreshUserMoney()', 10000);
              function GoToMember(url) {
              window.open(url, "memberFrame");
              }
              </script>
            </div>
            <div class="ui-group row-one cf">
              <div class="ui-item item-6">
                <a href="" class="ui-link">
                  <i class="ui-icon"></i><div class="ui-txt">账号：<strong style=" color: yellow; ">${webUser.userName}</strong></div>
                </a>
              </div>
              <div class="ui-item item-7">
                <a href="" class="ui-link">
                  <i class="ui-icon"></i><div class="ui-txt">余额：<strong id="userMoneyId" style=" color: yellow; ">${webUser.userMoney}RMB</strong></div>
                </a>
              </div>
              <div class="ui-item item-8">
                <a href="${ctx}/member/main?type=5" target="_blank" class="ui-link">
                  <i class="ui-icon"></i><div class="ui-txt">未读讯息(<font id="userMessageId" color="ffff00">0</font>)</div>
                </a>
              </div>
              <div class="ui-item item-9">
                <a href="javascript:void(0);" onclick="loginOut();return false" class="ui-link">
                  <i class="ui-icon"></i><div class="ui-txt">退出</div>
                </a>
              </div>
            </div>
          </div>
          </c:when>
          <c:otherwise>
          <form id="loginForm">
            <mh:token></mh:token>
            <div class="fail cf">
              <div class="l">
                <ul class="ui-group cf">
                  <li class="ui-item">
                    <input type="text" name="userName" id="loginName" tabindex="1" value="用户名" class="ui-input" onfocus="formIptTips('用户名', this)" onblur="formIptTips('用户名', this)">
                  </li>
                  <li class="ui-item">
                    <input type="password" name="password" id="password" tabindex="2" value="777" class="ui-input" style=" width: 110px;" onfocus="formIptTips('777', this)" onblur="formIptTips('777', this)">
                  </li>
                </ul>
                <ul class="ui-group cf">
                  <li class="ui-item item-vcode">
                    <input type="text" name="yzm" id="verifycode" tabindex="3" value="验证码" maxlength="4" class="ui-input" onfocus="formIptTips('验证码', this)" onblur="formIptTips('验证码', this)">
                    <span onclick="javascript:createCode();" id="validateCodeLabelId">
                      <img src="${resourceRoot}/web/ybb/assets/img/yzm.gif" title="点击刷新" id="img_validateCode">
                    </span>
                  </li>
                  <li class="ui-item" style=" width: 110px">
                    <input type="button" tabindex="4" onclick="return login();" value="登录" class="ui-btn">
                    <!-- <a tabindex="0" role="button" href="javascript:void(0);" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="请联系<a href='${ctxMap['msg007']}' target='_blank' class='b'>在线客服</a>">忘记密码</a> -->
                    <a href="${ctx}/forgetpwd">忘记密码</a>
                  </li>
                </ul>
              </div>
              <div class="l">
                <ul class="ui-group cf">
                  <li class="ui-item item-signup">
                    <a href="${ctx}/register" title="免费开户"></a>
                  </li>
                </ul>
              </div>
            </div>
          </form>
          </c:otherwise>
          </c:choose>
        </div>
        <!-- / 控制面板 -->
      </div>
    </div>
  </div>
  <!-- 主导航 -->
  <div class="nav-main">
    <div class="container cf">
      <div class="nav-core l">
        <ul class="ui-group cf">
          <li class="ui-item home">
            <a href="${ctx}/" class="ui-link">首页</a>
          </li>
          <li class="ui-item item-slot">
            <a href="${ctx}/electronic?code=pt&gameType1=Slot%20Machines&status=1" class="ui-link">老虎机</a>
            <div class="nav-second">
              <ul class="ui-group-son cf">
                
                <c:forEach var="item" items="${ slotSite}">
                
                  <li class="ui-item-son"><a href="${item.flatUrl }" class="ui-link-son">${item.flatName }</a></li>
                    </c:forEach>
                  </ul>
                </div>
              </li>
              <li class="ui-item item-live">
                <a href="${ctx}/goPageCenter?code=live" class="ui-link">真人娱乐</a>
                <div class="nav-second">
                  <ul class="ui-group-son cf">
                    <c:forEach items="${liveSite }" var="item">
                    <li class="ui-item-son">
                      <c:choose><c:when test="${!empty webUser}">
                      <a href="javascript:void(0)" onclick="winOpen('${ctx}/${item.flatUrl }',window.screen.width,window.screen.height,0,0,'game','${item.flat }')" title="点击进入" class="ui-link-son">
                        </c:when><c:otherwise>
                        <a href="javascript:void(0)" data-toggle="modal" data-target=".modal-login" class="ui-link-son">
                        </c:otherwise></c:choose>${item.flatName }</a>
                      </li>
                      </c:forEach>
                    </ul>
                  </div>
                </li>
                <li class="ui-item item-sport">
                  <a href="${ctx}/goPageCenter?code=sport" class="ui-link">体育赛事</a>
                  <div class="nav-second">
                    <ul class="ui-group-son cf">
                      <c:forEach items="${sportSite }" var="item">
                      <li class="ui-item-son">
                        <c:choose>
                        <c:when test="${item.flat eq 'bbin' }">
                        <a href="javascript:void(0)" onclick="winOpen('${ctx}/${item.flatUrl }',window.screen.width,window.screen.height,0,0,'game','${item.flat }')" class="ui-link-son">${item.flatName }</a>
                        </c:when>
                        <c:when test="${item.flat eq 'sb' or item.flat eq 'sbt'}">
                        <a href="${ctx}/${item.flatUrl}" target="_blank" class="ui-link-son">${item.flatName }</a>
                        </c:when>
                        <c:otherwise>
                        <a href="${ctx}/${item.flatUrl}" class="ui-link-son">${item.flatName }</a>
                        </c:otherwise>
                        </c:choose>
                      </li>
                      </c:forEach>
                    </ul>
                  </div>
                </li>
                <li class="ui-item item-cp">
                  <a href="${ctx}/goPageCenter?code=lottery_index" class="ui-link">彩票</a>
                  <div class="nav-second">
                    <ul class="ui-group-son cf">
                      <c:forEach items="${cpSite }" var="item">
                      <li class="ui-item-son">
                        <c:choose>
                        <c:when test="${item.flat eq 'bbin' }">
                        <a href="javascript:void(0)" onclick="winOpen('${ctx}/${item.flatUrl }',window.screen.width,window.screen.height,0,0,'game','${item.flat }')" class="ui-link-son">${item.flatName }</a>
                        </c:when>
                        <c:otherwise>
                        <a href="${ctx}/${item.flatUrl}" class="ui-link-son">${item.flatName }</a>
                        </c:otherwise>
                        </c:choose>
                      </li>
                      </c:forEach>
                    </ul>
                  </div>
                </li>
                <li class="ui-item">
                  <a href="${ctx}/goPageCenter?code=fishinggame" class="ui-link">对战游戏</a>
                </li>
                <li class="ui-item">
                  <a href="${ctx }/goMobile?code=yzc" class="ui-link ui-discolor">手机投注</a>
                </li>
                <li class="ui-item">
                  <a href="${ctx}/goPageCenter?code=promos" class="ui-link">优惠活动</a>
                </li>
                <li class="ui-item">
                  <a href="${ctx}/goPageCenter?code=help&pgSn=agent" class="ui-link">代理合作</a>
                </li>
              </ul>
            </div>
            <div class="nav-assist r">
              <ul class="ui-group cf">
                <li class="ui-item item-cs">
                  <a href="${ctxMap['msg007']}" target="_blank" class="ui-link">在线客服</a>
                </li>
                <li class="ui-item item-more">
                  <a href="javascript:void(0);" data-toggle="dropdown" class="ui-link">服务</a>
                  <ul class="dropdown-menu">
                    <li ><a href="${ctx }/goPageCenter?code=help&pgSn=about" class="ui-link">关于我们</a></li>
                    <li ><a href="${ctx }/goPageCenter?code=help&pgSn=contact" class="ui-link">联系我们</a></li>
                    <li ><a href="${ctx }/goPageCenter?code=help&pgSn=agent" class="ui-link">代理合作</a></li>
                    <li ><a href="${ctx }/goPageCenter?code=help&pgSn=deposit" class="ui-link">存款帮助</a></li>
                    <li ><a href="${ctx }/goPageCenter?code=help&pgSn=withdrawals" class="ui-link">取款帮助</a></li>
                    <li ><a href="${ctx }/goPageCenter?code=help&pgSn=question" class="ui-link">常见问题</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- / 主导航 -->
        <!-- 老虎机导航栏 -->
        <div class="nav-slot">
          <ul class="ui-group cf">
            <c:forEach var="item" items="${slotSite}">
          
                <li class='ui-item item-${item.flat } ${(param.code eq item.flat)?" ui-active":"" }'><a href="${ctx}/electronic?code=${item.flat }&gameType1=all" class="ui-link">${item.flatName }</a></li>
               
                </c:forEach>
              </ul>
            </div>
            <!-- / 老虎机导航栏 -->
          </div>
          <!-- / 头部 -->