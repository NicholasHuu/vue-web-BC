
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
 <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<head>
<%@include file="/commons/member/jsp/member_common.jsp"%>
</head>
<body>
<div class="wrapper">
<div class="panel-content font-hei">
<div class="panel-amount">
<div class="page-title clear">
	<div class="left">
		<h2 class="s24 blue">银行卡管理</h2>
		<p class="mt5 gray">${remark}</p>
	</div>
	<div class="right mt10">
		<button
			class="button button-primary button-raised button-pill button-tiny btn-contact">
			<i></i>在线客服
		</button>
	</div>
</div>

<div class="page-body">
	<div class="progress-body-item progress-body-step1">
		<div class="verify-item verify-bank s12">
			<div class="verify-title clear">
				<div class="left b">银行卡列表</div>
			</div>
			<div class="verify-body">
				<table>
					<tr class="sheet-title">
						<td width="10%">序号</td>
						<td width="10%">收款银行</td>
						<td width="10%">银行户名</td>
						<td width="30%">银行账号</td>
						<td width="30%">开户地址</td>
						<td width="10%">操作</td>
					</tr>
					<c:forEach var="item" items="${userBanks}"  varStatus="item_index">					
						<tr>
							<td class="pr20 ar gray-dark">${item.pxh}</td>
							<td>${item.bankCnName}</td>
							<td>${item.userRealName}</td>
							<td>${item.bankCard}</td>
							<td>${item.bankAddress}</td>
							<td 
							 data-card="${item.bankCard }" 
							 data-address="${item.bankAddress }" 
							 data-bank="${item.bankCnName }" 
							 data-id="${ item.id }"><a onclick="updateBank(this)" href="javascript:void(0);" class="blue">修改</a> | <a onclick="deleteBank(this)" href="javascript:void(0);" class="red">解绑</a></td>
						</tr>
					</c:forEach>
				</table>
			</div>
		</div>
	</div
</div>
<!-- /body -->

<c:choose>
  <c:when test="${ fn:length(userBanks) lt total }">
       <div class="page-body form-wrap">
         <div class="sheet-mod">
             <div class="sheet-content mt10">
                 <form id="form1" action="${ctx}/member/saveBackInfo" method="post">
      
                     <table class="s14">
                         <tr>
                             <td width="160" class="pr20 ar gray-dark">会员账号</td>
                             <td>${webUser.userName}</td>
                         </tr>
                         <tr>
                             <td class="pr20 ar gray-dark">收款人姓名</td>
                             <td><span class="red">${webUser.userRealName}</span></td>
                         </tr>
                         <tr>
                             <td class="pr20 ar gray-dark">收款银行</td>
                             <td>
                                 
                                 <select id="userBankType" name="userBankType" class="write" style="width: 120px;">
                                     <c:forEach var="item" items="${bankList}"  varStatus="item_index">  
                                         <option value="${item.bankCode}">${item.bankCnName}</option>
                                     </c:forEach>
                                 </select>
                             </td>
                         </tr>
                         <tr>
                             <td class="pr20 ar gray-dark">银行账号</td>
                             <td>
                                 <input type="text" name="userBankCard" id="userBank" size="30" class="write b red" onKeyUp="value=value.replace(/[^0-9]+/,'')">
                             </td>
                         </tr>
                         <tr>
                             <td class="pr20 ar gray-dark">开户行地址</td>
                             <td>
                                 <input type="text" name="userBankAddress" id="userBankAddress" size="128" maxlength="128" class="write b red" style="width: 300px;">&nbsp;省/市/县
                             </td>
                         </tr>
                         <tr>
                             <td class="pr20 ar gray-dark">资金密码</td>
                             <td>
                                 <input  type="password" maxlength="4" id="userWithdrawPassword" name="userWithdrawPassword" class="write b center">
                                 <span class="pl10 s12 gray">4位数字，方便记忆</span>
                             </td>
                         </tr>
                         <tr>
                             <td></td>
                             <td>
                                 <button onclick="bankSaveCheck();return false;" class="button button-raised button-primary button-small">确认</button>
                             </td>
                         </tr>
                     </table>
                 </form>
             </div>
         </div>
     </div>
  </c:when>
  
  <c:when test="${ fn:length(userBanks) >= total }">
    <div class="page-body form-wrap" style="min-height: 500px;">
         
     </div>
  </c:when>
 </c:choose>
 
 <div class="page-body form-wrap delete-bank hideme">
    <div class="sheet-mod">
        <div class="sheet-content mt10">
            <form class="form1" action="${ctx}/member/bank/delete" method="post">
                <input type="hidden" name="id" value="" />
                <table class="s14">
                    <tr>
                        <td class="pr20 ar gray-dark">解绑银行</td>
                        <td >
                            <span class="pl10 s12 red bank-desc"></span>   
                        </td>
                    </tr>
                    <tr>
                        <td class="pr20 ar gray-dark">资金密码</td>
                        <td>
                            <input  type="password" maxlength="4" id="pwd" name="pwd" class="write b center">
                            <span class="pl10 s12 gray">请输入资金密码</span>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button onclick="bankDeleteCheck();return false;" class="button button-raised button-primary button-small">确认解绑</button>
                            <button onclick="javascript:window.location.reload(); return false" class="button button-raised button-action button-small">取消</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
</div>

<div class="page-body form-wrap update-bank hideme">
    <div class="sheet-mod">
        <div class="sheet-content mt10">
            <form class="form1" action="${ctx}/member/bank/delete" method="post">
                <input type="hidden" name="id" value="" />
                <table class="s14">
                  <tr>
                    <td class="pr20 ar gray-dark">收款银行</td>
                       <td>
                           
                           <select id="userBankType" name="bankType" class="write" style="width: 120px;">
                               <c:forEach var="item" items="${bankList}"  varStatus="item_index">  
                                   <option value="${item.bankCode}">${item.bankCnName}</option>
                               </c:forEach>
                           </select>
                       </td>
                   </tr>
                   <tr>
                       <td class="pr20 ar gray-dark">银行账号</td>
                       <td>
                           <input type="text" name="bankCard" id="userBankCard" size="30" class="write b red" onKeyUp="value=value.replace(/[^0-9]+/,'')">
                           
                           <span class="pl10 s12 gray">请输入完整的银行卡号</span>
                       </td>
                   </tr>
                   <tr>
                       <td class="pr20 ar gray-dark">开户行地址</td>
                       <td>
                           <input type="text" name="bankAddress" id="userBankAddress" size="128" maxlength="128" class="write b red" style="width: 300px;">&nbsp;省/市/县
                       </td>
                   </tr>
                   <tr>
                       <td class="pr20 ar gray-dark">资金密码</td>
                       <td>
                           <input  type="password" maxlength="4" id="pwd" name="pwd" class="write b center">
                           <span class="pl10 s12 gray">4位数字，方便记忆</span>
                       </td>
                   </tr>
                   <tr>
                       <td></td>
                       <td>
                           <button onclick="bankUpdateCheck();return false;" class="button button-raised button-primary button-small">确认</button>
                           <button onclick="javascript:window.location.reload(); return false" class="button button-raised button-action button-small">取消</button>

                       </td>
                   </tr>
                </table>
            </form>
        </div>
    </div>
</div>

</div>
</div>
</div>
<script src="${resourceRoot}/member/js/plugins.js"></script>

<script>
    
    function deleteBank(el) {
        var $el = $(el);
        $('.page-body.form-wrap').addClass('hideme');
        var $wrap = $('.page-body.delete-bank').removeClass('hideme');
        var id = $el.parent().data('id');
        
        var bank = $el.parent().data('bank');
        var address = $el.parent().data('address');
        var card = $el.parent().data('card');
        
        var desc = ""+bank+ "&nbsp;&nbsp;&nbsp;&nbsp;" +  card;
        $('.bank-desc').html(desc);
        
        $wrap.find('input[name="id"]').val(id);
    }
    
    function bankDeleteCheck() {
        var $wrap = $('.page-body.delete-bank');
        var id = $wrap.find('input[name="id"]').val();
        var pwd = $wrap.find('#pwd').val();
        
         if(pwd==""||id=="") {
             alert("请输入资金密码！");
             return false;
         }
         
         if(!confirm("是否确定修改？")){
             return false;
         }
         
        $.ajax({
            url: rootPath+"/member/bank/delete",
            type: "post",
            data: $wrap.find(".form1").serialize(),
            timeout : 30000,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType:"json",
            error: function(){
                alert("解绑银行卡出错~");
            },
            success: function(obj){
                if(obj.rs){
                    alert("银行卡成功解绑！");
                    parent.document.getElementById('memberFrame').src =rootPath+"/member/goBankList";
                }else{
                    alert(obj.msg);
                }
            }
        });
    }

    function updateBank(el) {
        var $el = $(el);
        $('.page-body.form-wrap').addClass('hideme');
        var $wrap = $('.page-body.update-bank').removeClass('hideme');
        
        var bank = $el.parent().data('bank');
        var address = $el.parent().data('address');
        var card = $el.parent().data('card');
        var id = $el.parent().data('id');
        
        // 把数据放入到表单中
        $wrap.find('#userBankType option').each(function (index, option) {
            if ($(option).text() == bank) {
                $(option).prop("selected", true);
            }
        });
        $wrap.find('#userBankCard').val(card);
        $wrap.find('#userBankAddress').val(address);
        $wrap.find('input[name="id"]').val(id);
    }
    
    function bankUpdateCheck() {
        var $wrap = $('.page-body.update-bank');
        var bankType = $wrap.find('#userBankType').val();
        var bankCard = $wrap.find('#userBank').val();
        var bankAddress = $wrap.find('#userBankAddress').val();
        var id = $wrap.find('input[name="id"]').val();
        var pwd = $wrap.find('#pwd').val();
        
	     if(bankType ===""||bankCard==""||bankAddress==""||pwd==""||id=="") {
	         alert("请填写完整的表单信息！");
	         return false;
	     }
	
	     if(!confirm("是否确定修改？")){
	         return false;
	     }
	     
	     $.ajax({
	        url: rootPath+"/member/bank/update",
	        type: "post",
	        data: $wrap.find(".form1").serialize(),
	        timeout : 30000,
	        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        dataType:"json",
	        error: function(){
	            alert("绑定银行卡出错~");
	        },
	        success: function(obj){
	            if(obj.rs){
	                alert("银行卡修改成功！");
	                parent.document.getElementById('memberFrame').src =rootPath+"/member/goBankList";
	            }else{
	                alert(obj.msg);
	            }
	
	
	        }
	    });
    }
</script>
</body>