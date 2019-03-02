<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="mh" uri="http://www.mh.com/framework/tags" %>
<%@ page trimDirectiveWhitespaces="true" %>
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title></title>
  <link rel="icon" type="image/png" href="${resourceRoot}/web/ybb/assets/img/favicon.png">
  <!--[if IE]>
  <link rel="shortcut icon" href="${resourceRoot}/web/ybb/assets/img/favicon.ico">
  <![endif]-->
  <!-- css -->
  <link rel="stylesheet" href="${resourceRoot}/web/ybb/assets/css/bootstrap.min.css">
  <link rel="stylesheet" href="${resourceRoot}/web/ybb/common/plugins/jui/smoothness/jquery-ui.min.css">
  <link rel="stylesheet" href="${resourceRoot}/web/ybb/assets/css/font/flaticon.css">
  <link rel="stylesheet" href="${resourceRoot}/web/ybb/assets/css/base.css">
  <link rel="stylesheet" href="${resourceRoot}/web/ybb/assets/css/sys.module.css">
  <link rel="stylesheet" href="${resourceRoot}/web/ybb/assets/css/custom.css">
  <!-- / css -->
  <!-- js -->
  <script src="${resourceRoot}/web/ybb/assets/js/jquery.min.js"></script>
  <script>
    var root = "${resourceRoot}";
    var rootPath = "${ctx}";
    var web_online_contact = "${ctxMap['msg007']}";
    var web_qq_contact = "${ctxMap['siteQq']}";
  </script>
  <!-- / js -->
