<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
  <%@ include file="/inc.jsp"%>
    <%@ page trimDirectiveWhitespaces="true"%>
      <div class="banner">
        <div class="inner cf">
          <div class="c1 l">
            <div class="login">
              <c:choose>
                <c:when test="${!empty webUser}">
                  <div class="ybb-md-mpn">
                    <ul class="row mt15 cf">
                      <li>账号：<span class="b yellow">${webUser.userName}</span></li>
                      <li>余额：<span class="b yellow" id="userMoneyId">${webUser.userMoney}RMB</span></li>
                      <li><a href="${ctx}/member/main?type=5" target="_blank">未读讯息(<font id="userMessageId" color="F0E800">0</font>)</a></li>
                      <li><a href="javascript:void(0);" onclick="loginOut();return false">退出</a></li>
                    </ul>
                    <ul class="row mt10 cf">
                      <li><a href="${ctx}/member/main" target="_blank">会员中心</a></li>
                      <li><a href="${ctx}/member/main?type=1" target="_blank">线上存款</a></li>
                      <li><a href="${ctx}/member/main?type=2" target="_blank">线上取款</a></li>
                      <li><a href="${ctx}/member/main?type=3" target="_blank">额度转换</a></li>
                      <li><a href="${ctx}/member/main?type=4" target="_blank">往来记录</a></li>
                    </ul>
                    <script type="text/javascript">
                    setInterval('refreshUserMoney()', 10000);
                    </script>
                  </div>
                </c:when>
                <c:otherwise>
                  <form id="loginForm">
                    <mh:token></mh:token>
                    <ul>
                      <li>
                        <label for="">账号：</label>
                        <input type="text" name="loginName" id="loginName" value="用户名" onfocus="if(this.value=='用户名') this.value=''" onblur="if(this.value=='') this.value='用户名'">
                      </li>
                      <li>
                        <label for="">密码：</label>
                        <input type="password" name="password" id="password" onclick="this.value='';" value="">
                      </li>
                      <li>
                        <label for="">验证码：</label>
                        <input type="text" value="验证码" size="4" maxlength="4" name="verifycode" id="verifycode" onkeyup="value=value.replace(/[^\d]/g,'')" onfocus="javascript:if(this.value=='验证码')this.value='';" onblur="javascript:if(this.value=='')this.value='验证码';" class="write vcode mr5">
                        <span onclick="javascript:createCode();" id="validateCodeLabelId">
                                <img src="${resourceRoot}/web/ybb/assets/img/yzm.gif" width="48" height="20" id="img_validateCode" class="ybb-ele-vcode" alt="点击刷新">
                              </span>
                      </li>
                      <li class="confirm pt5 cf">
                        <a onclick="return login();" href="javascript:void(0);" class="btn btn-login"></a>
                        <a onclick="Go('${ctx}/register', 'register');" href="javascript:void(0);" class="btn btn-reg"></a>
                        <a onclick="alert('请您联系7*24小时在线客服找回!');" href="javascript:void(0);" class="btn btn-psw">忘记密码</a>
                      </li>
                    </ul>
                  </form>
                </c:otherwise>
              </c:choose>
            </div>
          </div>
        </div>
      </div>
