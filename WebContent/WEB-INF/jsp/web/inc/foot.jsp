<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!-- 底部 -->
    <style>
    	.row-partner {
    		position: relative;
    	}
    	.row-partner a{
    		display: block;
		    width: 76px;
		    height: 50px;
		    position: absolute;
		    right: 234px;
		    top: 59px;
    	}
    </style>

<div class="footer">
  <div class="container">
    <div class="row-tips">易博亚洲(www.1b.cc)是国际知名的线上博彩营运商、亚洲最大的在线老虎机投注平台

与MG、PT、NT、OS、GD、TTG、BBIN、AG等游戏提供商合作经营！老品牌、诚信经营，政府牌照。</div>
    <div class="row-partner mt20">
	   <a href="http://www.ab8686.com/" target="_blank"></a>
    </div>

    <div class="row-nav ac">
      <ul class="cf">
        <li class="ui-item"><a href="${ctx }/goPageCenter?code=help&pgSn=about" class="ui-link">关于我们</a></li>
        <li class="ui-item"><a href="${ctx }/goPageCenter?code=help&pgSn=contact" class="ui-link">联系我们</a></li>
        <li class="ui-item"><a href="${ctx }/goPageCenter?code=help&pgSn=agent" class="ui-link">代理合作</a></li>
        <li class="ui-item"><a href="${ctx }/goPageCenter?code=help&pgSn=deposit" class="ui-link">存款帮助</a></li>
        <li class="ui-item"><a href="${ctx }/goPageCenter?code=help&pgSn=withdrawals" class="ui-link">取款帮助</a></li>
        <li class="ui-item"><a href="${ctx }/goPageCenter?code=help&pgSn=question" class="ui-link">常见问题</a></li>
      </ul>
    </div>
    <div class="row-copy ac">&copy; 2010 - 2016 易博亞洲 All rights reserved.</div>
  </div>
</div>
<%-- <style>
  #mesWrap{position: fixed;left: 0;bottom: 110px;z-index: 997;cursor: pointer;}
  #downloadPng{position: relative;width:150px;height:335px}
  #downloadZxd{position: absolute;display:block;left:0;bottom:50px;width:150px;height:125px;z-index:998}
  #closeZxd{position: absolute;display: block;left:0;bottom:0;width:150px;height:50px;z-index:998}
</style>
<div id="mesWrap">
  <div id="downloadPng" onclick="">
    <a title="扫描下载AG手机客户端">
      <img src="${resourceRoot}/web/ybb/assets/img/foot/1bMes.png" >
    </a>
    <a id="downloadZxd" title="点击下载资讯端" href="http://1b6688.bybet888.com/易博亚洲资讯端.exe" download></a>
    <a id="closeZxd" onclick=" this.parentNode.style.display='none' " title="点击关闭"></a>
  </div>
</div> --%>
<!-- / 底部 -->
${ctxMap['msg008']}
</body>
<!-- 右侧浮动 -->
<div class="ui-mod mod-fixed-menu">
  <div class="ui-mod-body">
    <ul class="ui-group">
      <li class="ui-item item-serv">
        <a href="${ctxMap['msg007']}" target="_blank" class="ui-link ui-animate" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="24小时在线客服"></a>
      </li>
      <li class="ui-item item-qq">
        <a href="tencent://message/?uin=${ctxMap['siteQq'] }&Site=web&Menu=yes" target="_blank" class="ui-link ui-animate" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="QQ客服"></a>
      </li>
      <li class="ui-item item-gotop">
        <a href="javascript:void(0);" class="ui-link ui-animate" data-toggle="popover" data-trigger="hover" data-placement="left" data-content="返回顶部"></a>
      </li>
    </ul>
  </div>
</div>
<!-- / 右侧浮动 -->
<!-- 会员登录 -->
<div class="modal fade modal-login" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <div class="modal-title">会员登录</div>
      </div>
      <!-- 主体 -->
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-8">
            <form id="loginForm_dialog" class="form-horizontal">
            	<mh:token></mh:token>
              <!-- 用户名 -->
              <div class="form-group">
                <label for="loginName_dialog" class="col-sm-2 control-label">用户名</label>
                <div class="col-sm-10 form-control-wrap">
                  <input type="text" id="loginName_dialog" name="loginName" class="form-control" placeholder="请输入登录用户名">
                </div>
              </div>
              <!-- / 用户名 -->
              <!-- 密码&验证码 -->
              <div class="form-group">
                <label for="password_dialog" class="col-sm-2 control-label">密码</label>
                <div class="col-sm-4 form-control-wrap">
                  <input type="password" id="password_dialog" name="password" class="form-control" placeholder="登录密码">
                </div>
                <label for="verifycode_dialog" class="col-sm-2 control-label">验证码</label>
                <div class="col-sm-4 form-control-wrap form-control-vc">
                  <input type="text" maxlength="4" id="verifycode_dialog" name="verifycode" class="form-control" placeholder="验证码">
                  <img src="${resourceRoot}/web/ybb/assets/img/yzm.gif" class="img-responsive form-control-vcpic" id="img_validateCode_dialog" onclick="javascript:dialog_createCode();">
                </div>
              </div>
              <!-- / 密码&验证码 -->
              <!-- 确认登录 -->
              <div class="form-group">
                <div class="col-sm-10 col-sm-offset-2">
                  <button type="reset" class="btn btn-sm btn-default">重写</button>
                  <input type="button" tabindex="4" onclick="return login(1);" value="登录" class="btn btn-sm btn-primary">
                </div>
              </div>
              <!-- / 确认登录 -->
            </form>
          </div>
          <div class="col-sm-4">
            <div class="mod-promos-hot"></div>
          </div>
        </div>
      </div>
      <!-- / 主体 -->
      <!-- 底部 -->
      <div class="modal-footer">
        <div class="row">
          <div class="col-sm-4 col-sm-offset-8">
            <a tabindex="0" role="button" href="javascript:void(0);" class="btn btn-sm btn-danger" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="请联系<a href='${ctxMap['msg007']}' target='_blank' class='b'>在线客服</a>">忘记密码</a>
          </div>
        </div>
      </div>
      <!-- / 底部 -->
    </div>
  </div>
</div>
<!-- / 会员登录 -->
<!-- 备用网址 -->
<div class="modal fade modal-url" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <div class="modal-title"><div align="center">易记网址：www.1b.cc</div></div>
      </div>
      <!-- 主体 -->
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-6"><a href="##">www.1b1188.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b222.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b2288.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b333.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b3388.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b444.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b4488.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b555.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b5588.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b666.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b6688.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b777.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b7788.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b999.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b9988.com</a></div>
          <div class="col-sm-6"><a href="##"></a></div>
          <div class="col-sm-6"><a href="##">www.1b188.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b588.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b288.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b688.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b388.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b788.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b488.com</a></div>
          <div class="col-sm-6"><a href="##">www.1b988.com</a></div>
        </div>
      </div>
      <!-- / 主体 -->
      <!-- 底部 -->
       <div class="modal-footer">
        <div class="row">
          <div class="col-sm-4 col-sm-offset-8">
            <a tabindex="0" role="button" href="javascript:void(0);" class="btn btn-sm btn-danger" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="联系<a href='${ctxMap['msg007']}' target='_blank' class='b'>在线客服</a>">在线客服</a>
          </div>
        </div>
      </div>
      <!-- / 底部 -->
    </div>
  </div>
</div>

<!-- /Wrap -->
<%-- <div class="ybb-dia-hp" title="欢迎莅临" style="display:none;">
  ${ctxMap['msg004']}
</div> --%>

<style>
	.ui-dialog {
		z-index: 111111;
	}
</style>

<script type="text/javascript">
$(function() {
  if ("${!empty ctxMap['msg004']}" == "true" ) {
    $('.ybb-dia-hp').dialog({
      width: 625,
      show: {
        effect: 'fade',
        duration: 800
      }
    });
  }
});
</script>

<!-- / 备用网址 -->
<!-- js -->
<!--[if lte IE 9]>
<script src="${resourceRoot}/web/ybb/assets/js/placeholders.min.js"></script>
<![endif]-->
<script src="${resourceRoot}/web/ybb/common/plugins/jui/jquery-ui.min.js"></script>
<script src="${resourceRoot}/web/ybb/assets/js/bootstrap.min.js"></script>
<script src="${resourceRoot}/web/ybb/assets/js/lazyload.min.js"></script>
<script src="${resourceRoot}/web/ybb/assets/js/superslide.min.js"></script>
<script src="${resourceRoot}/web/ybb/assets/js/web_common.js"></script>
<script src="${resourceRoot}/web/ybb/common/js/core.js"></script>
<script src="${resourceRoot}/web/ybb/common/js/custom-plugin.js"></script>
<script src="${resourceRoot}/web/ybb/assets/js/custom.js"></script>
<script src="${resourceRoot}/web/ybb/assets/js/fishinggame.js"></script>
<script type="text/javascript">
function createCode() {
  $("#img_validateCode").attr("src","${ctx}/resources-code.jpg?" + new Date().getTime());
}
createCode();

function dialog_createCode() {
	  $("#img_validateCode_dialog").attr("src","${ctx}/resources-code.jpg?" + new Date().getTime());
}
dialog_createCode();
</script>
<!-- / js -->

<!-- <script src="${resourceRoot}/web/ybb/common/js/core.js"></script> -->
