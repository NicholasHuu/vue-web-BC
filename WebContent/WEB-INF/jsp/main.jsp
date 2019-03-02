<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/inc.jsp"%>
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title></title>
    <%@include file="web/inc/common.jsp"%>
      <script src="${resourceRoot}/web/ybb/common/js/jquery.min.js"></script>
      <script>
        var root = "${resourceRoot}";
        var rootPath = "${ctx}";
      </script> 
    </head>
    <body  class="ybb-web ybb-slot-bd slot slot-mg">
    <%@ include file="web/inc/head.jsp"%>
    <div class="page-body page-body-home">
       <%@include file="web/inc/main.jsp"%>
    </div>
	 
	 <%@include file="web/inc/foot.jsp"%>
</html>
         
    </body>
</html>