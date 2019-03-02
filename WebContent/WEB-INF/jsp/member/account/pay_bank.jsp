<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<head>
<%@include file="/commons/member/jsp/member_common.jsp"%>

</head>
<body>
<div class="wrapper">
<div class="panel-content font-hei" >
<div class="page-title clear">
	<div class="left">
		<h2 class="s24 blue">充值到账户</h2>
		<p class="mt5 gray">尊敬的客户您好，请选择您的存款方式及银行，并填写存款金额</p>
	</div>
	<div class="right mt10">
		<button class="button button-primary button-raised button-pill button-tiny btn-contact"><i></i>在线客服</button>
	</div>
</div>
<div class="page-body switch-mod">
	<div class="switch-group">
		<div class="switch-item">
			<div class="pt20">
				<div class="panel-progress">
					<ul class="progress-step-group clear">
						<li class="step step-one step-active">
							<div class="step-inner"><span class="step-icon">1</span><h2>查看公司账户并填表</h2></div>
						</li>
						<li class="step step-two">
					      <div class="step-inner">
					        <span class="step-icon">2</span>
					        <h2 id="setp2Ts">正在操作，请稍候</h2>
					      </div>
					    </li>
					    <li class="step step-three">
					      <div class="step-inner">
					        <span class="step-icon">3</span>
					        <h2 id="setp3Ts">完成</h2>
					      </div>
					    </li>
					</ul>
					<div class="progress-line"></div>
				</div>
				<!-- /progress -->
			</div>
			<div class="switch-body-wrap company-recharge">
				<div class="progress-body-item progress-body-step1">
					<div class="verify-item verify-bank mt10 s12">
						<div class="verify-title clear">
							<div class="left b">公司入款账户信息：</div>
						</div>
						<div class="verify-body">
						  <c:choose>
						      <c:when test="${hasThirdPayment eq true }">
							      <table class="charge">
	                                <thead>
	                                    <tr class="table-title">
	                                        <th colspan="4">快捷转账入款</th>
	                                    </tr>
	                                    <tr class="table-header">
	                                        <th>类型</th>
	                                        <th>帐号</th>
	                                        <th>姓名</th>
	                                        <th>备注</th>
	                                    </tr>
	                                </thead>
	                                <tbody>
	                                    <c:forEach var="item" items="${bankList }">
	                                        <c:choose>
	                                            <c:when
	                                                test="${item.payType eq 0 or item.payType eq 1 or item.payType eq 2}">
	                                                <tr>
	                                                    <td width="35%">${item.bankType }</td>
	                                                    <td width="15%">${item.bankCard }</td>
	                                                    <td width="25%">${item.bankUser }</td>
	                                                    <td width="35%" style="text-align: center;">${item.remark }</td>
	                                                </tr>
	                                            </c:when>
	                                        </c:choose>
	                                    </c:forEach>
	                                </tbody>
	                            </table>
						      </c:when>
						  </c:choose>
							
							<c:choose>
							  <c:when test="${ hasWebsitePayment eq true }">
								  <table class="charge">
	                              <thead>
	                                <tr class="table-title">
	                                  <th colspan="4" >网页入款</th>
	                                </tr>
	                              </thead>
	                              <tbody>
	                               <c:forEach var="item" items="${bankList }">
	                                 <c:choose>
	                                   <c:when test="${item.payType eq 5 }" >
	                                        <tr>
	                                          <td width="35%">${item.bankType }</td>
	                                          <td width="15%">${item.payLink }</td>
	                                          <td width="25%"><a style="color:#45aee2;font-weight: bold;" href="${item.payLink }" target="_blank">进入网址</a></td>
	                                          <td width="35%" style="text-align: center;">${item.remark }</td>
	                                        </tr>
	                                   </c:when>
	                                 </c:choose>
	                               </c:forEach>
	                              </tbody>
	                            </table>
							  </c:when>
							</c:choose>
							
                           <c:choose>
                                <c:when test="${hasBankPayment eq true }">
	                                <table class="charge">
	                                 <thead>
	                                     <tr class="table-title" >
	                                       <th colspan="4">银行卡入款</th>
	                                     </tr>
	                                     <tr class="table-header">
	                                         <th>银行卡号</th>
	                                         <th>开户名</th>
	                                         <th>开户行</th>
	                                         <th>备注</th>
	                                     </tr>
	                                 </thead>
	                                <c:forEach var="item" items="${bankList}">
	                                    <c:choose>
	                                        <c:when test="${ item.payType ne 5 and item.payType ne 1 and item.payType ne 2 and item.payType ne 0 }">
	                                            <tr>
	                                                <td width="35%">${item.bankType } - ${item.bankCard }</td>
	                                                <td width="15%">${item.bankUser }</td>
	                                                <td width="25%">${item.bankAddress }</td>
	                                                <td width="35%" style="text-align: center;">${item.remark }</td>
	                                            </tr>
	                                        </c:when>
	                                    </c:choose>
	                                </c:forEach>
	                            </table>
                                </c:when>
                           </c:choose>
					       
						</div>
					</div>
					<!-- /verify -->
					<div class="sheet-mod">
						<div class="sheet-content mt10">
							<form id="form1" action="${ctx}/member/doBankPay" method="post">
							<table style="border:none;" class="mt20 s14">
								<tr>
									<td width="160" class="pr20 ar gray-dark">会员账号</td>
									<td align="left">${webUser.userName }</td>
								</tr>
								<tr>
									<td class="pr20 ar gray-dark"><label for="rechargeAmount">充值金额</label></td>
									<td class="s12" align="left"> 
										<input type="text" id="hkMoney" name="hkMoney" size="20" class="write b red" maxlength="10" onkeyup="clearNoNum(this);" />
										<span class="pl10 s12 gray">最低入款：${webConfig.companyMinPay }元</span>
									</td>
								</tr>
								<script type="text/javascript">
                                 var noPayChannelPayType = [5, 1, 2];
                                 var hasRemarkPayType = [0, 1, 2];
                                 var WebPayType = '';
								$(function(){
									$('#payNo').on('selectmenuchange', function (e,ui) {
									//alert(ui.item.value);
									setPayNo();
									});
								});
								
								function setPayNo(){
										var hkCompanyBank=$("#payNo  option:selected").text();
										var payType = $("#payNo  option:selected").data('type');
										var hkType = $("#hkType");
										var commonPayType = 0;
										var websitePayType = 5;
										var wxPayType = 1;
										var aliPayType = 2;
										$("#hkCompanyBank").val(hkCompanyBank);
										
										var options=["通用支付", "网版支付", "微信转账", "支付宝转账", "银行柜台", "ATM现金", "ATM卡转", "网银转账", "手机银行转帐"];
										var hideOptions = ["银行柜台", "ATM现金", "ATM卡转", "网银转账", "手机银行转帐", "微信转账", "支付宝转账"];
										
										function hideOption() {
										  for (var i = 0; i < options.length; i++) {
										      hkType.find('option[value="'+options[i]+'"]').remove();
										  }
										  for (var i = 0; i < hideOptions.length; i++) {
                                              hkType.append('<option value="'+hideOptions[i]+'">'+hideOptions[i]+'</option>');
                                          }
										  hkType.selectmenu('refresh');
										}
										
										function showOption(option) {
										  for (var i = 0; i < options.length; i++) {
                                              hkType.find('option[value="'+options[i]+'"]').remove();
										  }
                                          hkType.append('<option value="'+option+'">'+option+'</option>');
										  hkType.selectmenu('refresh');
										}
										
										if (payType == commonPayType) {
										  showOption('通用支付');
										  hkType.val('通用支付');
										  hkType.selectmenu('refresh');
										} else if (payType == websitePayType) {
										  showOption('网版支付');
                                          hkType.val('网版支付');
                                          hkType.selectmenu('refresh');
										} else if (payType == wxPayType) {
										  showOption('微信转账');
                                          hkType.val('微信转账');
                                          hkType.selectmenu('refresh');
										} else if (payType == aliPayType) {
										  showOption('支付宝转账');
                                          hkType.val('支付宝转账');
                                          hkType.selectmenu('refresh');
										} else {
                                          hideOption();
										}
										if (noPayChannelPayType.indexOf(payType) != -1) {
										  //$('.payChannel-column').hide();
										} else {
										  //$('.payChannel-column').show();
										}
										
										if (hasRemarkPayType.indexOf(payType) != -1 ) {
										  $('.userRemark-column').show();
										} else {
										  $('.userRemark-column').hide();
										}
								}
								</script>
								<tr>
									<td class="pr20 ar gray-dark"><label for="rechargeBank">汇入银行</label></td>
									<td class="s12" align="left">
										<select id="payNo" name="payNo" onchange="setPayNo(this)" style="height: 26px;" class="dropmenu w150" >
											<option value="" selected="selected">请选择</option>
											<c:forEach var="item" items="${bankList}">
												<option data-type="${item.payType }" value="${item.payNo}" >
													${item.bankType } - ${item.bankUser }
												</option>
											</c:forEach>
										</select>
									</td>
								</tr>
								<tr>
									<td class="pr20 ar gray-dark"><label for="rechargeTime">汇入日期</label></td>
									<td class="s12" align="left">
										<input type="text" size="10" name="time" value="${currDateStr}" id="time" class="kui-input-date s14 datepicker">
										时间： <select name="timeHour"
												id="timeHour" style="width: 60px" class="dropmenu">
													<option value="00">00</option>
													<option value="01">01</option>
													<option value="02">02</option>
													<option value="03">03</option>
													<option value="04">04</option>
													<option value="05">05</option>
													<option value="06">06</option>
													<option value="07">07</option>
													<option value="08">08</option>
													<option value="09">09</option>
													<option value="10">10</option>
													<option value="11">11</option>
													<option value="12">12</option>
													<option value="13">13</option>
													<option value="14">14</option>
													<option value="15">15</option>
													<option value="16">16</option>
													<option value="17">17</option>
													<option value="18">18</option>
													<option value="19">19</option>
													<option value="20">20</option>
													<option value="21">21</option>
													<option value="22">22</option>
													<option value="23">23</option>
											</select> 时 <select name="timeMinute" id="timeMinute"
												 style="width: 60px" class="dropmenu w50">
													<option value="00">00</option>
													<option value="01">01</option>
													<option value="02">02</option>
													<option value="03">03</option>
													<option value="04">04</option>
													<option value="05">05</option>
													<option value="06">06</option>
													<option value="07">07</option>
													<option value="08">08</option>
													<option value="09">09</option>
													<option value="10">10</option>
													<option value="11">11</option>
													<option value="12">12</option>
													<option value="13">13</option>
													<option value="14">14</option>
													<option value="15">15</option>
													<option value="16">16</option>
													<option value="17">17</option>
													<option value="18">18</option>
													<option value="19">19</option>
													<option value="20">20</option>
													<option value="21">21</option>
													<option value="22">22</option>
													<option value="23">23</option>
													<option value="24">24</option>
													<option value="25">25</option>
													<option value="26">26</option>
													<option value="27">27</option>
													<option value="28">28</option>
													<option value="29">29</option>
													<option value="30">30</option>
													<option value="31">31</option>
													<option value="32">32</option>
													<option value="33">33</option>
													<option value="34">34</option>
													<option value="35">35</option>
													<option value="36">36</option>
													<option value="37">37</option>
													<option value="38">38</option>
													<option value="39">39</option>
													<option value="40">40</option>
													<option value="41">41</option>
													<option value="42">42</option>
													<option value="43">43</option>
													<option value="44">44</option>
													<option value="45">45</option>
													<option value="46">46</option>
													<option value="47">47</option>
													<option value="48">48</option>
													<option value="49">49</option>
													<option value="50">50</option>
													<option value="51">51</option>
													<option value="52">52</option>
													<option value="53">53</option>
													<option value="54">54</option>
													<option value="55">55</option>
													<option value="56">56</option>
													<option value="57">57</option>
													<option value="58">58</option>
													<option value="59">59</option>
											</select> 分</td>
								</tr>
								<tr class="payChannel-column">
									<td class="pr20 ar gray-dark"><label for="rechargeType">汇入方式</label></td>
									<td class="s12" align="left">
										<select id="hkType" name="hkType" class="dropmenu w150">
											<option value="">请选择</option>
											<option value="银行柜台">银行柜台</option>
											<option value="ATM现金">ATM现金</option>
											<option value="ATM卡转">ATM卡转</option>
											<option value="网银转账">网银转账</option>
											<option value="手机银行转帐">手机银行转帐</option>
											<option value="微信转账">微信转账</option>
											<option value="支付宝转账">支付宝转账</option>
                                            <option value="网版支付">网版支付</option>
                                            <option value="通用支付">通用支付</option>
										</select>
									</td>
								</tr>
								<tr>
									<td class="pr20 ar gray-dark"><label for="rechargeName">汇款人姓名</label></td>
									<td class="s12" align="left"  > 
										<input name="hkUserName" type="text"  id="hkUserName" onfocus="javascript:this.select();" size="30" class="write b red"  maxlength="30"/>
									</td>
								</tr>
								<tr class="userRemark-column">
                                    <td class="pr20 ar gray-dark"><label for="rechargeName">备注</label></td>
                                    <td class="s12" align="left"  > 
                                        <input name="userRemark" type="text"  id="userRemark" onfocus="javascript:this.select();" size="30" class="write b red"  maxlength="30"/>
                                    </td>
                                </tr>
								
					              <tr>
					                <td colspan="2">
					                    <div class="remark">
					                        <i class="icon icon-alert"></i>
					                        ${ remark }
					                    </div>
					                </td>
					              </tr>
								<tr>
									<td></td>
									<td>
										<input type="hidden" name="hkCompanyBank" id="hkCompanyBank" value=""/>
										<input type="hidden" name="userName" id="userName" value="${webUser.userName }" />
										<input type="hidden" name="key" id="key" value="${param.key }" /> 
										<input type="hidden" name="minPay" id="minPay" value="${webConfig.companyMinPay }" /> 
										<button class="button button-raised button-primary button-small" onclick="SubInfo();return false;">下一步</button>
									</td>
								</tr>
							</table>
							</form>
						</div>
					</div>
					<!-- /sheet -->
				</div>
				<div class="progress-body-item progress-body-step2"></div>
				<!-- /item -->
			</div>
		</div>
		<!-- /item -->
	</div>
	<!-- /group -->
</div>
<!-- /body -->
</div>
</div>
<script src="${resourceRoot}/member/js/plugins.js"></script>
</body>