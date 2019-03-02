<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>

<head>
  <%@include file="/commons/member/jsp/member_common.jsp"%>
  <script type="text/javascript">var billno = '${billno}';</script>
</head>

<body class="${theme }">
  <div class="switch-body-wrap">
    <div class="progress-body-item progress-body-step1">
      <div class="sheet-mod">
        <div class="sheet-content mt10">
          <form id="payForm" action="${ctx}/pay/doPayCenterData" method="post" target="_blank">
            <table class="mt20 s14">
              <tr>
                <td width="160" class="pr20 ar gray-dark">会员账号</td>
                <td style="text-align: left">${user.userName }</td>
              </tr>
              <tr>
                <td class="pr20 ar gray-dark">总账户余额</td>
                <td style="text-align: left">
                  <span class="red">${webuser.userMoney }</span>
                </td>
              </tr>
              <tr>
                <td class="pr20 ar gray-dark">
                  <label for="rechargeAmount">充值金额</label>
                </td>
                <td class="s12" style="text-align: left;width: 40px">
                  <input type="text" size="10" class="write b red" id="money" name="money" onKeyUp="clearNoNum(this);" />
                </td>
                <td style="text-align: left">
                  <span class="pl10 s12 gray">单笔支付（${thirdPay.thirdMinEdu } ~ ${thirdPay.thirdMaxEdu }）元！</span>
                </td>
              </tr>
              <tr>
                <td width="160" class="pr20 ar gray-dark">银行类型</td>
                <td style="text-align: left">
                	<select id="bank_code" name="bank_code" class="dropmenu" style="width: auto;height:30px;">
						<option value="">-请选择-</option>
						<option value="00004">工商银行</option>
						<option value="00021">招商银行</option>
						<option value="00003">建设银行</option>
						<option value="00017">农业银行</option>
						<option value="00083">中国银行</option>
						<option value="00051">邮政银行</option>
						<option value="00032">浦发银行</option>
						<option value="00052">广发银行</option>
						<option value="00057">光大银行</option>
						<option value="00013">民生银行</option>
						<option value="00054">中信银行</option>
						<option value="00016">兴业银行</option>
						<option value="00006">平安银行</option>
						<option value="00005">交通银行</option>
						<option value="00050">北京银行</option>
						<option value="00041">华夏银行</option>
						
						<option value="00101">天津银行</option>
						<option value="00103">宁波银行</option>
						<option value="00102">上海银行</option>
						
						<option value="00104">南京银行</option>
					 
					</select>
				</td>
              </tr>
              <tr>
                <td></td>
                <td style="text-align: left">
                  <input type="button" class="button button-raised button-primary button-small" onclick="return SubInfoForOnlinePay(this.form);" value="充值" />
                </td>
              </tr>
            </table>
            <input type="hidden" name="thirdMinEdu" id="thirdMinEdu" value=${thirdPay.thirdMinEdu } />
            <input type="hidden" name="thirdMaxEdu" id="thirdMaxEdu" value=${thirdPay.thirdMaxEdu } />
            <input type="hidden" name="domain" value="<%=basePath%>" />
            <input type="hidden" name="billno" value="${billno }" />
            <input type="hidden" name="payId" value="${thirdPay.id }" />
            <input type="hidden" name="pay_url" value="/payhc/payCenter_payHandleCenter.action" />
          </form>
        </div>
      </div>
      <!-- /sheet --> </div>
    <div class="progress-body-item progress-body-step2"></div>
    <!-- /item --> </div>
</body>

</html>