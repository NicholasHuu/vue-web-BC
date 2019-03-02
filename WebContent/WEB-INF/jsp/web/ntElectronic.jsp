<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/inc.jsp"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ include file="inc/common.jsp"%>
<link rel="stylesheet" href="http://www.tickerassist.co.uk/ProgressiveTickers/include/css/ProgressiveTickers.css">
<script type="text/javascript">
var status = "${status}";//网格列表切换标识
</script>
</head>

<body class="ybb-web slot slot-nt">
	<%@ include file="inc/head.jsp"%>
	<!-- Banner -->
	<div class="banner">
		<div class="container">
      <ul class="bd cf">
        <li class="ui-item"><img src="${resourceRoot}/web/ybb/assets/img/temp/banner1.jpg"></li>
        <li class="ui-item"><img src="${resourceRoot}/web/ybb/assets/img/temp/jingxi365.jpg"></li>
        <li class="ui-item"><img src="${resourceRoot}/web/ybb/assets/img/temp/banner2.jpg"></li>
        <li class="ui-item"><img src="${resourceRoot}/web/ybb/assets/img/temp/banner0125.jpg"></li>
        <li class="ui-item"><img src="${resourceRoot}/web/ybb/assets/img/temp/0122banner.jpg"></li>
      </ul>
      <ul class="hd cf">
        <li class="ui-item"></li>
      </ul>
		</div>
	</div>
	<!-- / Banner -->
	<%@ include file="inc/msg.jsp"%>
	<!-- 主体 -->
	<div class="page-body">
		<div class="container cf">

			<!-- 侧边栏 -->
			<div class="page-sidebar l">
				<!-- 老虎机 -->
				<div class="ui-mod mod-slot">
					<!-- 搜索 -->
					<div class="ui-mod mod-search">
						<div class="ui-mod-head b ac">游戏搜索</div>
						<div class="ui-mod-body pt10">
							<input type="text" value="${null == gameName ? '请输入游戏名称' : gameName}" id="gameName" onfocus="formIptTips('请输入游戏名称', this)" onblur="formIptTips('请输入游戏名称', this)">
							<a href="javascript:void(0);" onclick="searchGame();">查询</a>
						</div>
					</div>
					<!-- / 搜索 -->
					<!-- 视图 -->
					<div class="ui-mod mod-slot-view">
						<div class="ui-mod-body">
							<ul class="row cf">
								<li class="col-sm-6 ui-item item-grid ui-active"><i class="flaticon-gallery6"></i>网格</li>
								<li class="col-sm-6 ui-item item-list"><i class="flaticon-text156"></i>列表</li>
							</ul>
						</div>
					</div>
					<!-- / 视图 -->
					<!-- 菜单 -->
					<div class="ui-mod mod-menu">
						<div class="ui-mod-body">
							<ul class="ui-group cf" id="_memu">
								<li class="ui-item ${gameType1 eq 'all' ? 'item-jackpot ui-active':'' }">
									<a href="${ctx}/yzc_electronic?code=nt&gameType1=all&status=1" class="ui-link">全部</a>
								</li>
							</ul>
						</div>
					</div>
					<!-- / 菜单 -->
				</div>
				<!-- /老虎机 -->
			</div>
			<!-- / 侧边栏 -->
			<!-- 主内容 -->
			<div class="page-main r">
				<!-- slot show -->
				<div class="ui-mod mod-slot-show">
					<div class="ui-mod-body col-three">
						<!-- group -->
						<div class="row ui-group">
							<div class="search-status">
								<i class="ui-icon icon-unhappy"></i>
							</div>
							<!-- 老虎机列表循环 -->
							<c:forEach var="item" items="${result}" varStatus="status">
								<!-- item -->
								<div class="col-sm-4 ui-item">
									<!-- 网格视图 -->
									<div class="row-thumb">
										<!-- 开始游戏判断 -->
										<c:choose>
											<c:when test="${!empty webUser}">
												<a href="javascript:void(0);" target="_blank"
													onclick="winOpen('${ctx}/forwardGame?gameType=ntElectronic&game=${item.eleGameCode}',window.screen.width,window.screen.height,0,0,'game','nt');return false;"
													title="开始游戏" class="ui-icon lazy"
													data-original="${item.eleGamePic}"
													style=" background-image: url(${resourceRoot}/web/ybb/assets/img/blank.png);"></a>
											</c:when>
											<c:otherwise>
												<a href="javascript:void(0);" data-toggle="modal"
													data-target=".modal-login" title="登录" class="ui-icon lazy"
													data-original="${item.eleGamePic}"
													style=" background-image: url(${resourceRoot}/web/ybb/assets/img/blank.png);"></a>
											</c:otherwise>
										</c:choose>
										<!-- / 开始游戏判断 -->
									</div>
									<div class="row-title">${item.eleGameCnname}</div>
									<div class="row row-btn">
										<div class="col-sm-12 ui-item-son">
											<!-- 开始游戏判断 -->
											<c:choose>
												<c:when test="${!empty webUser}">
													<a href="javascript:void(0);" target="_blank"
														onclick="winOpen('${ctx}/forwardGame?gameType=ntElectronic&game=${item.eleGameCode}',window.screen.width,window.screen.height,0,0,'game','nt');return false;"
														title="开始游戏" class="btn-play">开始游戏</a>
												</c:when>
												<c:otherwise>
													<a href="javascript:void(0);" data-toggle="modal"
														data-target=".modal-login" title="登录" class="btn-play">开始游戏</a>
												</c:otherwise>
											</c:choose>
											<!-- / 开始游戏判断 -->
										</div>
									</div>
									<!-- / 网格视图 -->
									<!-- 列表视图 -->
									<div class="row row-btn row-btn-link">
										<div class="col-sm-12 ui-item-son">
											<!-- 开始游戏判断 -->
											<c:choose>
												<c:when test="${!empty webUser}">
													<a href="javascript:void(0);" target="_blank"
														onclick="winOpen('${ctx}/forwardGame?gameType=ntElectronic&game=${item.eleGameCode}',window.screen.width,window.screen.height,0,0,'game','nt');return false;"
														title="开始游戏" class="btn-play">${item.eleGameCnname}</a>
												</c:when>
												<c:otherwise>
													<a href="javascript:void(0);" data-toggle="modal"
														data-target=".modal-login" title="登录" class="btn-play">${item.eleGameCnname}</a>
												</c:otherwise>
											</c:choose>
											<!-- / 开始游戏判断 -->
										</div>
									</div>
									<!-- / 列表视图 -->
								</div>
								<!-- / item -->
							</c:forEach>
							<!-- / 老虎机列表循环 -->

						</div>
						<!-- / group -->
					</div>
				</div>
				<!-- / slot show -->
			</div>
			<!-- 主内容 -->
		</div>
	<div class="ui-mod mod-slot-map">
		<div class="container">
		<!-- 分类 -->
		<div class="ui-group">
			<div class="ui-mod-body">
				<ul class="row cf">
					<c:forEach items="${result}" var="item">
						<li class="col-sm-2 ui-item"><c:choose>
								<c:when test="${!empty webUser}">
									<a href="javascript:void(0);" target="_blank"
														onclick="winOpen('${ctx}/forwardGame?gameType=ntElectronic&game=${item.eleGameCode}',window.screen.width,window.screen.height,0,0,'game','nt');return false;"
														title="开始游戏" class="ui-link">${item.eleGameCnname}</a>
								</c:when>
								<c:otherwise>
									<a href="javascript:void(0);" data-toggle="modal" data-target=".modal-login" title="登录" class="ui-link">${item.eleGameCnname}</a>
								</c:otherwise>
							</c:choose></li>
					</c:forEach>
				</ul>
			</div>
		</div>
		<!-- / 分类 -->
		</div>
	</div>
	</div>
	<!-- / 主体 -->
	<%@ include file="inc/foot.jsp"%>
</html>
