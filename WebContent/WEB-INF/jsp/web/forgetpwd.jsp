<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/inc.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ include file="inc/common.jsp" %>

<style>
    .form .field input {
	    padding: 10px 2px;
	    border: 1px solid #696969;
	    text-indent: 1rem;
	    min-width: 200px;
	    display: inline-block;
    }
    
    .form .field {
        margin-bottom: 10px;
        position: relative;
    }
    
    .form button {
	    display: inline-block;
	    padding: 10px 5px;
	    min-width: 100px;
	    background: #545454;
	    color: #d6d6d6;
    }
    
    .form button.disabled {
	    background: #8c8c8c;
	    color: #e0e0e0;
    }
    
    .form .field .notice {
        margin-left: 3.5rem;
    }
    
    .form .field .notice img {
	    width: 15px;
	    height: 15px;
	    margin-right: 5px;
    }
    
    .form .btn-submit {
        margin-left: 3.5rem;
        width: 200px;
    }
    
</style>

</head>

<body class="ybb-web signup">
<%@ include file="inc/head.jsp" %>
<!-- Banner -->
<div class="banner">
  <div class="container">
    <img src="${resourceRoot}/web/ybb/assets/img/temp/banner1.jpg">
  </div>
</div>
<!-- / Banner -->
<%@ include file="inc/msg.jsp" %>
<!-- 主体 -->
<div class="page-body ybb-page ybb-assist ybb-signup">
  <div class="container ybb-pg-ct cf">
    <!-- 侧边栏 -->
    <div class="page-sidebar l">
      <div class="ui-mod mod-slot">
        <!-- 菜单 -->
        <div class="ui-mod mod-menu">
          <div class="ui-mod-head ac b" style="font-size: 14px; color: yellow;">歡迎蒞臨</div>
          <div class="ui-mod-body pt10">
            <ul class="ui-group">
              <li class="ui-item">
                <a href="${ctx}/yzc_electronic?code=pt&gameType1=Slot%20Machines&status=1" class="ui-link">老虎机</a>
              </li>
              <li class="ui-item">
                <a href="${ctx}/goPageCenter?code=live" class="ui-link">真人视讯</a>
              </li>
              <li class="ui-item">
                <a href="${ctx}/goPageCenter?code=sport" class="ui-link">体育赛事</a>
              </li>
              <li class="ui-item">
                <a href="${ctx}/goPageCenter?code=lottery" class="ui-link">彩票游戏</a>
              </li>
            </ul>
          </div>
        </div>
        <!-- / 菜单 -->
      </div>
    </div>
    <!-- / 侧边栏 -->
    <!-- 主内容 -->
    <div class="page-main yb-assist-content r">
		
		<div class="msg">${err }</div>
		
		<form class="form" action="${ctx }/verify" type="post" name="verifyForm">
		  <div class="field">
		      <label>用户名</label>
		      <input name="account" placeholder="请输入用户名" />
		  </div>
		  <div class="field">
		      <label>手机号</label>
		      <input name="phone" placeholder="请输入手机号码"/>
		  </div>
		  <div class="field">
		      <label>验证码</label>
		      <input name="code" placeholder="请输入验证码"/>
		      <button type="button" name="get_code">获取手机验证码</button>
		  </div>
		  <div class="field">
		      <p class="notice"><img src="${resourceRoot }/web/ybb/assets/img/notice.png"/>${forgetpwd}</p>
		  </div>
		  <div class="field">
            <button type="button" name="verifyBtn" class="btn-submit">确认提交</button>
		  </div>
	      <input type="hidden" name="businessType" value="2" />
		</form>
		
		<form class="form hideme" action="${ctx }/reset" type="post" name="resetForm">
		  <div class="field">
		      <label>新<b style="width:1rem;display:inline-block;"></b>密<b style="width:1rem;display:inline-block;"></b>码</label>
		      <input name="pwd" type="password" placeholder="6-12位数字/字母" />
		  </div>
		  <div class="field">
		      <label>确认新密码</label>
		      <input name="cfmpwd" type="password" placeholder="再次确认密码" />
		  </div>
		  <div class="field">
		      <button style="margin-left:5.5rem;" type="button" class="btn-submit" name="resetBtn">确认提交</button>
		  </div>
		  <input type="hidden" name="key" />
		  <input type="hidden" name="account" />
		  <input type="hidden" name="phone" />
		</form>
		
		
		
		
<!-- 开户表单 -->
	</div>
<!-- / 开户表单 -->
	</div>
<!-- / 主体 -->
</div>

<%@ include file="inc/foot.jsp" %>

<script>
	$(function() {
	   
	   var verifyCodeAPI = (function() {
	       
	       function _verifyCodeAPI() {
	           this.timer = null;
	           // 默认每60秒获取一次
	           this.defaultSecondLeft = this.secondLeft = 60;
	           this.intervalCallback = function () {}; 
	       }
	       
	       _verifyCodeAPI.prototype = {
	           fetch: function (phone, account, businessType, cb) {
	               cb || (cb = function () {});
	               if (this.timer != null ) {
	                   return 
	               } else {
	                   var self = this;
	                   
	                   if (phone.length <= 0 ||  account.length <=0 ) {
			             alert('请输入用户名或手机号码');
			             return ;
			           }
			           
	                   $.ajax({
		                    method: 'post',
		                    data: {
		                        phone: phone,
		                        account: account,
		                        businessType: businessType
		                    },
		                    url: '${ctx}/sendVariableCode',
		                    success: function(res) {
			                    cb(res);
		                    }
		                });
	                   
	                   this.timer = setInterval(function () {
	                       self.secondLeft --;
	                       if (self.secondLeft <= 0 ) {
	                           clearInterval(self.timer);
	                           // 还原默认数据
	                           self.timer = null;
	                           self.secondLeft = self.defaultSecondLeft;
	                           self._callInterval(0);
	                       } else {
	                           self._callInterval(self.secondLeft);
	                       }
                           
	                   }, 1000);
	               }
	           },
	           _callInterval: function(second) {
	               this.intervalCallback(second);
	           },
	           interval: function(cb) {
	               this.intervalCallback = cb;
	           },
	           cancel: function () {
	           	this.secondLeft = 0;
	           }
	       };
	       
	       return new _verifyCodeAPI();
	       
	   })();
	   
	   
	   verifyCodeAPI.interval(function(second) {
	       if (second <= 0) {
	           $('button[name="get_code"]').text("获取验证码").removeClass('disabled');
	       } else {
	           $('button[name="get_code"]').text(second+"秒重新获取").addClass('disabled');
	       }
	   });
		
		function serializeForm($form) {
		  var data = {};
		  $form.find('input[name!=""]').each(function () {
		      data[$(this).attr('name')] = $(this).val().trim();
		  });
		  
		  return data;
		}
		
		function unserializeForm($form, data) {
		  $form.find('input[name!=""]').each(function () {
		      $(this).val(data[$(this).attr('name')]);
		  });
		}
		
		function mobileNum(mobile) {
		  return mobile.length == 11;
		}
		
        $('button[name="get_code"]').click(function(event) {
            event.preventDefault();
            
            var phone = $('input[name="phone"]').val().trim();
            var account = $('input[name="account"]').val().trim();
            var businessType = $('input[name="businessType"]').val().trim();
            
            // 验证
            if (!mobileNum(phone)) {
                alert("请输入正确的手机号码");
                return ;
            }
            
             verifyCodeAPI.fetch(phone, account, businessType, function (res) {
                if (!res['rs']) {
                    verifyCodeAPI.cancel();
                    alert(res['msg']);
                } else {
                    alert(res['msg']);
                }
             });
            
            return false;
        });
		
		var $verifyForm =  $("form[name='verifyForm']");
		var $resetForm = $("form[name='resetForm']");
		
		$('button[name="verifyBtn"]').click(function (event) {
		  event.preventDefault();
		  
		  var _cls = 'verifying',
		      $self = $(this);
		  if ($self.hasClass(_cls)) {
		      return 
		  }
		  
		  var data = serializeForm($verifyForm);
		  $.ajax({
		      url: '${ctx}/verify',
		      data: data,
		      method: 'POST',
		      success: function (res) {
		         if (res['rs']) {
		          data['key'] = res['datas']['key'];
		          unserializeForm($resetForm, data);
		          $verifyForm.addClass('hideme');
		          $resetForm.removeClass('hideme');
		         } else {
		          alert(res['msg']);
		         }
		         
		         $self.removeClass(_cls);
		      }
		  });
		  
		  return false;
		});
		
		$('button[name="resetBtn"]').click(function (event) {
		  event.preventDefault();
		  
		  var _cls = 'reseting',
		      $self = $(this);
		      
		  if ($self.hasClass(_cls)) {
		      return 
		  }
		  $self.addClass(_cls);
		  
		  var data = serializeForm($resetForm);
		  
		  if (data.pwd == "") {
		      alert("请输入6-12位数字/字母作为密码");
              $self.removeClass(_cls);
		      return ;
		  } else if (data.cfmpwd =="" || data.cfmpwd != data.pwd) {
		      alert("两次输入的密码不一致");
              $self.removeClass(_cls);
		      return ;   
		  }
		  
		  $.ajax({
		      url: '${ctx}/pwd/reset',
		      data: data,
		      method: 'POST',
		      success: function (res) {
		          if (res['rs']) {
		              alert('密码修改成功, 您可以使用新密码进行登录');
		              window.location.href = "${ctx}";
		          } else {
		              alert(res['msg']);
		          }
		          $self.removeClass(_cls);
		      }
		  });
		  
		  return false;
		
		});
		
		
		
	})
</script>

</html>
