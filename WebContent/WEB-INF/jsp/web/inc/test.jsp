<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="mh" uri="http://www.mh.com/framework/tags"%>
<!-- SignUP -->
<div class="ybb-md-ntc-ct pt5 pb15 ac">${ctxMap['msg009']}</div>
<form id="regForm" name="regForm" method="POST" action="${ctx}/doRegister">
  <div class="ybb-signup-form ybb-try">
    <div class="section">
      <div class="ybb-md-tt">
        <ul class="clear">
          <li>试玩账户注册</li>
          <li>已有账户登入</li>
        </ul>
      </div>
      <mh:token></mh:token>
      <div class="ybb-md-ct">
        <ul>
          <li>
            <div class="item">
              <label for="field-id">账号</label>
              <div class="content">
                <span style=" color: yellow">${userName}</span>
                <input type="hidden" id="testUserName" name="testUserName" value="${userName}" />
              </div>
            </div>
            <div class="item">
              <label for="field-psw">密码</label>
              <div class="content">
                <input type="password" maxlength="12" id="password1" name="password1" value="" onblur="validTestPassword1(this)" class="ybb-ui-in">
                <font color="#ff0000">*</font> <span id="password1Info"></span>
                <p>须为6~12码英文或数字且符合0~9或a~z字元</p>
              </div>
            </div>
            <div class="item">
              <label for="field-psw-verify">确认密码</label>
              <div class="content">
                <input type="password" id="password2" name="password2" onblur="validTestPassword2(this)" value="" maxlength="12" class="ybb-ui-in">
                <font color="#ff0000">*</font><span id="password2Info"></span>
                <p>须为6~12码英文或数字且符合0~9或a~z字元</p>
              </div>
            </div>
            <div class="item">
              <div class="item">
                <div class="content">
                  <input type="checkbox" id="agree" style=" vertical-align: middle" checked="checked" style="background-color:none"> 我已届满合法博彩年龄﹐且同意各项开户条约。 <a href="javascript:void(0)" class="signup-agm">《開戶協議》</a>
                </div>
              </div>
              <div class="item">
                <div class="content">
                  <input type="button" class="ui-button" value="进入游戏" name="addnews" onclick="registerTestForm();return false;">
                </div>
              </div>
              <div class="signup-notice">
                <h6>备注：</h6>
                <ol>
                  <li>带 * 号项为必填项</li>
                  <li>注册账户为本网站试玩账户，可在试玩登录进行登录再次试玩。</li>
                </ol>
              </div>
            </div>
          </li>
          <li>
            <div class="item">
              <label for="field-id">账号</label>
              <div class="content">
                <input type="text" maxlength="12" id="testLoginUserName" name="testLoginUserName" value="" onblur="validTestLoginName(this)" class="ybb-ui-in">
                <font color="#ff0000">*</font> <span id="testLoginUserNameInfo"></span>
                <p>须为6~12码英文或数字且符合0~9或a~z字元</p>
              </div>
            </div>
            <div class="item">
              <label for="field-psw">密码</label>
              <div class="content">
                <input type="password" maxlength="12" id="testLoginPwd" name="testLoginPwd" value="" onblur="validTestLoginPassword(this)" class="ybb-ui-in">
                <font color="#ff0000">*</font> <span id="testLoginPwdInfo"></span>
                <p>须为6~12码英文或数字且符合0~9或a~z字元</p>
              </div>
            </div>
            <div class="item">
              <label for="field-psw">验证码</label>
              <div class="content">
                <input type="text" name="testverifycode" id="testverifycode" value="" class="ybb-ui-in" size="4" maxlength="4" style="width: 45px;" onblur="validTestVerifycode(this)" />
                <span id="testverifycodeLabelId" onclick="javascript:createTestCode();"><img
src="${resourceRoot}/web/ybb/assets/img/yzm.gif"
id="img_testverifycode" style="vertical-align: middle">
</span>
                <font color="#ff0000">*</font><span id="testverifycodeInfo"></span>
              </div>
            </div>
            <div class="item">
              <div class="item">
                <div class="content">
                  <input type="button" class="ui-button" value="登录" onclick="loginTestForm();">
                </div>
              </div>
              <div class="signup-notice">
                <h6>备注：</h6>
                <ol>
                  <li>带 * 号项为必填项</li>
                </ol>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</form>
</div>
<!-- /SignUP -->
<style type="text/css">
.ui-datepicker {
  width: 260px;
}
</style>
<div class="signup-agm-ct" title="務必詳細閱讀">
  ${ctxMap['msg010'] }
</div>
<div class="ybb-dia-si"></div>
<script type="text/javascript">
function createTestCode() {
  $("#img_testverifycode").attr("src", rootPath + "/test-resources-code.jpg?" + new Date().getTime());
}

createTestCode();
</script>