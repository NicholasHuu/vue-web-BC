<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/inc.jsp"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ include file="inc/common.jsp"%>
<script type="text/javascript">
var status = "${status}";//网格列表切换标识
</script>
<link rel="stylesheet" href="http://www.tickerassist.co.uk/ProgressiveTickers/include/css/ProgressiveTickers.css">
<style>
.JackpotTotalUpperBox {
	display: none;
}

#jackpotstotal {
	width: 178px;
}
</style>
</head>

<body class="ybb-web ybb-slot-bd slot slot-ag slot-mg">
	<%@ include file="inc/head.jsp"%>
	<%@ include file="inc/msg.jsp"%>
	<!-- 主体 -->
	<div class="page-body">
		<div class="container cf">
	          
	            
			<!-- 侧边栏 -->
			<div class="page-sidebar l">
				<!-- 老虎机 -->
				<div class="ui-mod mod-slot">
					<!-- 总奖池 -->
					<div class="ui-mod mod-jackpot">
                        <img src="${resourceRoot }/web/ybb/assets/img/slots/${fn:toUpperCase(code)}.png" alt="" />
					</div>
					<!-- / 总奖池 -->
					<!-- 搜索 -->
					<div class="ui-mod mod-search">
						<div class="ui-mod-head b ac">游戏搜索</div>
						<div class="ui-mod-body pt10">
	                          <input type="hidden" name="code" value="${code }" />
	                          <input type="hidden" name="cat" value="${gameType1 }" />
							<input type="text" value="${gameName}" name="keyword" onkeypress="(function (event){ if (event.which == 13) searchSlotGame(event); })(event);" placeholder="请输入游戏名称" />
							<a href="javascript:void(0);" onclick="searchSlotGame(event);">查询</a>
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
								<li class="ui-item" style="height: 39px;"><a href="javascript:void(0);" class="ui-link" id="gameFirst" style="height: 39px;"></a></li>
					            <li class="ui-item ${gameType1 eq 'all' || gameType1 eq null   ? 'item-jackpot ui-active':'' }"><a href="${ctx}/electronic?code=${code}&gameType1=all&status=1" class="ui-link">全部游戏</a></li>
					            <li class="ui-item ${gameType1 eq 'new'   ? 'item-jackpot ui-active':'' }"><a href="${ctx}/electronic?code=${code}&gameType1=new&status=1" class="ui-link">最新上线</a></li>
					            <li class="ui-item ${gameType1 eq 'hot'   ? 'item-jackpot ui-active':'' }"><a href="${ctx}/electronic?code=${code}&gameType1=hot&status=1" class="ui-link">平台推荐</a></li>
                                <li class="ui-item ${gameType1 eq 'favourite'   ? 'item-jackpot ui-active':'' }">
                                    <c:choose>
                                        <c:when test="${empty webUser}">
                                            <a class="ui-link" href="javascript:alert('请登录后查看您的收藏')">我的收藏 <img src="${resourceRoot }/web/ybb/assets/img/slots/like-on.png" alt="" /></a>
                                        </c:when>
                                        <c:otherwise>
                                           <a class="ui-link" href="${ctx}/electronic?code=${code}&gameType1=favourite&status=1">我的收藏 <img src="${resourceRoot }/web/ybb/assets/img/slots/like-on.png" alt="" /></a>
                                        </c:otherwise>
                                    </c:choose>
                                </li> 
					            <li class="subcat-drawer ui-item" style="height: 39px;">
                                    <a href="javascript:void(0)" class="ui-link" id="gamLast" style="height: 39px;"></a>
                                </li>
                                <c:forEach var="item" items="${electronicClass}">
                                <li class="ui-item ${gameType1 eq item.eleType ? 'item-jackpot ui-active':''}"><a href="${ctx}/electronic?code=${item.eleFlat }&gameType1=${item.eleType}" class="ui-link">${item.eleTypeName }</a></li>
                                </c:forEach>
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
							
                            <c:if test="${empty result}">
                                <p class="search-alert">未查询到对应游戏</p>
                            </c:if>
							<!-- 老虎机列表循环 -->
							<c:forEach var="item" items="${result}" varStatus="status">
								<!-- item -->
								<div class="col-sm-4 ui-item">
									<!-- 网格视图 -->
									<c:choose>
										<c:when test="${gameType1 eq 'Pot' }">
											<div class="row-thumb row-thumb-jp">
										</c:when>
										<c:otherwise>
											<div class="row-thumb">
										</c:otherwise>
									</c:choose>
									<!-- 开始游戏判断 -->
									<c:choose>
										<c:when test="${!empty webUser}">
											<a href="javascript:void(0);" target="_blank"
												onclick="winOpen('${ctx}/forwardGame?gameType=bbin&gameid=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','bbin');" href="javascript:void(0);"
												title="开始游戏" class="ui-icon lazy"
												data-original="${item.eleGamePic}"
												style=" background-image: url(${resourceRoot}/web/ybb/assets/img/blank.png);background-size: 100%;"></a>
										</c:when>
										<c:otherwise>
											<a href="javascript:void(0);" data-toggle="modal"
												data-target=".modal-login" title="登录" class="ui-icon lazy"
												data-original="${item.eleGamePic}"
												style=" background-image: url(${resourceRoot}/web/ybb/assets/img/blank.png);background-size: 100%;"></a>
										</c:otherwise>
									</c:choose>
									<!-- / 开始游戏判断 -->
								</div>
								<div class="row-title">

	                                <c:choose>
	                                 <c:when test="${item.isFavourite eq 1 }">
	                                     <img src="${resourceRoot }/web/ybb/assets/img/slots/like-on.png" class="like-slot active" alt="" onclick="likeThisSlot(this, '${code}', '${item.eleGameId}')"/>
	                                 </c:when>
	                                 <c:otherwise>
	                                    <img src="${resourceRoot }/web/ybb/assets/img/slots/like-off.png" class="like-slot" alt="" onclick="likeThisSlot(this, '${code}', '${item.eleGameId}')"/>   
	                                 </c:otherwise>
	                                </c:choose>
	                                <div class="hot-new-icons">
	                                    <c:if test="${item.eleHotNum eq 1}">            
	                                        <img src="${resourceRoot }/web/ybb/assets/img/slots/hot.png" class="hot-slot" alt="" />
	                                    </c:if>
	                                    
	                                    <c:if test="${item.eleIsNew eq 1 }">
	                                        <img src="${resourceRoot }/web/ybb/assets/img/slots/new.png" class="new-slot" alt="" />
	                                    </c:if>
	                                </div>
								    <p class="title">${item.eleGameCnname}</p>
								</div>
								<div class="row row-btn">
									<div class="col-sm-12 ui-item-son">
										<!-- 开始游戏判断 -->
										<c:choose>
											<c:when test="${!empty webUser}">
												<a href="javascript:void(0);" target="_blank"
													onclick="winOpen('${ctx}/forwardGame?gameType=bbin&gameid=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','bbin');return false;" href="javascript:void(0);"
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
                                        <c:choose>
                                          <c:when test="${item.isFavourite eq 1 }">
                                              <img src="${resourceRoot }/web/ybb/assets/img/slots/like-on.png" class="like-slot active" alt="" onclick="likeThisSlot(this, '${code}', '${item.eleGameId}')"/>
                                          </c:when>
                                          <c:otherwise>
                                             <img src="${resourceRoot }/web/ybb/assets/img/slots/like-off.png" class="like-slot" alt="" onclick="likeThisSlot(this, '${code}', '${item.eleGameId}')"/>   
                                          </c:otherwise>
                                         </c:choose>
                                         <div class="hot-new-icons">
                                             <c:if test="${item.eleHotNum eq 1}">            
                                                 <img src="${resourceRoot }/web/ybb/assets/img/slots/hot.png" class="hot-slot" alt="" />
                                             </c:if>
                                             
                                             <c:if test="${item.eleIsNew eq 1 }">
                                                 <img src="${resourceRoot }/web/ybb/assets/img/slots/new.png" class="new-slot" alt="" />
                                             </c:if>
                                         </div>
									<div class="col-sm-12 ui-item-son">
                                         
										<!-- 开始游戏判断 -->
										<c:choose>
											<c:when test="${!empty webUser}">
												<a href="javascript:void(0);" target="_blank"
													onclick="winOpen('${ctx}/forwardGame?gameType=bbin&gameid=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','bbin');return false;" href="javascript:void(0);"
													title="开始游戏" class="btn-play">
													
													<p class="title">
                                                        ${item.eleGameCnname}
													</p>
				                                    
													</a>
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
    <c:if test="${gameType1 eq 'all' || gameType1 eq null}">
      <!-- 分类 -->
      <div class="ui-group">
        <div class="ui-mod-head">老虎机</div>
        <div class="ui-mod-body">
          <ul class="row cf">
            <c:forEach items="${bbin_all['Slot'] }" var="item">
              <li class="col-sm-2 ui-item">
                <c:choose>
                  <c:when test="${!empty webUser}">
                    <a href="javascript:void(0);" title="开始游戏" onclick="winOpen('${ctx}/forwardGame?gameType=bbin&gameid=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','bbin');return false;" href="javascript:void(0);" target="_blank" class="ui-link">${item.eleGameCnname }</a>
                  </c:when>
                  <c:otherwise>
                    <a href="javascript:void(0);" data-toggle="modal" data-target=".modal-login" title="登录" class="ui-link">${item.eleGameCnname }</a>
                  </c:otherwise>
                </c:choose>
              </li>
            </c:forEach>
          </ul>
        </div>
      </div>
      <!-- / 分类 -->
      <!-- 分类 -->
      <div class="ui-group">
        <div class="ui-mod-head">桌上游戏</div>
        <div class="ui-mod-body">
          <ul class="row cf">
            <c:forEach items="${bbin_all['Table'] }" var="item">
              <li class="col-sm-2 ui-item">
                <c:choose>
                  <c:when test="${!empty webUser}">
                    <a href="javascript:void(0);" title="开始游戏" onclick="winOpen('${ctx}/forwardGame?gameType=bbin&gameid=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','bbin');return false;" href="javascript:void(0);" target="_blank" class="ui-link">${item.eleGameCnname }</a>
                  </c:when>
                  <c:otherwise>
                    <a href="javascript:void(0);" data-toggle="modal" data-target=".modal-login" title="登录" class="ui-link">${item.eleGameCnname }</a>
                  </c:otherwise>
                </c:choose>
              </li>
            </c:forEach>
          </ul>
        </div>
      </div>
      <!-- / 分类 -->
      <!-- 分类 -->
      <div class="ui-group">
        <div class="ui-mod-head">大型机台</div>
        <div class="ui-mod-body">
          <ul class="row cf">
            <c:forEach items="${bbin_all['LargeMachine'] }" var="item">
              <li class="col-sm-2 ui-item">
                <c:choose>
                  <c:when test="${!empty webUser}">
                    <a href="javascript:void(0);" title="开始游戏" onclick="winOpen('${ctx}/forwardGame?gameType=bbin&gameid=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','bbin');return false;" target="_blank" class="ui-link">${item.eleGameCnname }</a>
                  </c:when>
                  <c:otherwise>
                    <a href="javascript:void(0);" data-toggle="modal" data-target=".modal-login" title="登录" class="ui-link">${item.eleGameCnname }</a>
                  </c:otherwise>
                </c:choose>
              </li>
            </c:forEach>
          </ul>
        </div>
      </div>
      <!-- / 分类 -->
      <!-- 分类 -->
      <div class="ui-group">
        <div class="ui-mod-head">刮刮乐</div>
        <div class="ui-mod-body">
          <ul class="row cf">
            <c:forEach items="${bbin_all['ScratchMusic'] }" var="item">
              <li class="col-sm-2 ui-item">
                <c:choose>
                  <c:when test="${!empty webUser}">
                    <a href="javascript:void(0);" title="开始游戏" onclick="winOpen('${ctx}/forwardGame?gameType=bbin&gameid=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','bbin');return false;" href="javascript:void(0);" target="_blank" class="ui-link">${item.eleGameCnname }</a>
                  </c:when>
                  <c:otherwise>
                    <a href="javascript:void(0);" data-toggle="modal" data-target=".modal-login" title="登录" class="ui-link">${item.eleGameCnname }</a>
                  </c:otherwise>
                </c:choose>
              </li>
            </c:forEach>
          </ul>
        </div>
      </div>
      <!-- / 分类 -->
    </c:if>
    <c:if test="${gameType1 eq 'Table'}">
      <div class="ui-group">
        <div class="ui-mod-head">桌上游戏</div>
        <div class="ui-mod-body">
          <ul class="row cf">
            <c:forEach items="${bbin_all['Table'] }" var="item">
              <li class="col-sm-2 ui-item">
                <c:choose>
                  <c:when test="${!empty webUser}">
                    <a href="javascript:void(0);" title="开始游戏" onclick="winOpen('${ctx}/forwardGame?gameType=bbin&gameid=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','bbin');return false;" href="javascript:void(0);" target="_blank" class="ui-link">${item.eleGameCnname }</a>
                  </c:when>
                  <c:otherwise>
                    <a href="javascript:void(0);" data-toggle="modal" data-target=".modal-login" title="登录" class="ui-link">${item.eleGameCnname }</a>
                  </c:otherwise>
                </c:choose>
              </li>
            </c:forEach>
          </ul>
        </div>
      </div>
    </c:if>
    <c:if test="${gameType1 eq 'Slot'}">
      <div class="ui-group">
        <div class="ui-mod-head">老虎机</div>
        <div class="ui-mod-body">
          <ul class="row cf">
            <c:forEach items="${bbin_all['Slot'] }" var="item">
              <li class="col-sm-2 ui-item">
                <c:choose>
                  <c:when test="${!empty webUser}">
                    <a href="javascript:void(0);" title="开始游戏" onclick="winOpen('${ctx}/forwardGame?gameType=bbin&gameid=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','bbin');return false;" href="javascript:void(0);" target="_blank" class="ui-link">${item.eleGameCnname }</a>
                  </c:when>
                  <c:otherwise>
                    <a href="javascript:void(0);" data-toggle="modal" data-target=".modal-login" title="登录" class="ui-link">${item.eleGameCnname }</a>
                  </c:otherwise>
                </c:choose>
              </li>
            </c:forEach>
          </ul>
        </div>
      </div>
    </c:if>
    <c:if test="${gameType1 eq 'LargeMachine'}">
      <div class="ui-group">
        <div class="ui-mod-head">大型机台</div>
        <div class="ui-mod-body">
          <ul class="row cf">
            <c:forEach items="${bbin_all['LargeMachine'] }" var="item">
              <li class="col-sm-2 ui-item">
                <c:choose>
                  <c:when test="${!empty webUser}">
                    <a href="javascript:void(0);" title="开始游戏" onclick="winOpen('${ctx}/forwardGame?gameType=bbin&gameid=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','bbin');return false;" href="javascript:void(0);" target="_blank" class="ui-link">${item.eleGameCnname }</a>
                  </c:when>
                  <c:otherwise>
                    <a href="javascript:void(0);" data-toggle="modal" data-target=".modal-login" title="登录" class="ui-link">${item.eleGameCnname }</a>
                  </c:otherwise>
                </c:choose>
              </li>
            </c:forEach>
          </ul>
        </div>
      </div>
    </c:if>
    <c:if test="${gameType1 eq 'ScratchMusic'}">
      <div class="ui-group">
        <div class="ui-mod-head">视频扑克</div>
        <div class="ui-mod-body">
          <ul class="row cf">
            <c:forEach items="${bbin_all['ScratchMusic'] }" var="item">
              <li class="col-sm-2 ui-item">
                <c:choose>
                  <c:when test="${!empty webUser}">
                    <a href="javascript:void(0);" title="开始游戏" onclick="winOpen('${ctx}/forwardGame?gameType=bbin&gameid=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','bbin');return false;" href="javascript:void(0);" target="_blank" class="ui-link">${item.eleGameCnname }</a>
                  </c:when>
                  <c:otherwise>
                    <a href="javascript:void(0);" data-toggle="modal" data-target=".modal-login" title="登录" class="ui-link">${item.eleGameCnname }</a>
                  </c:otherwise>
                </c:choose>
              </li>
            </c:forEach>
          </ul>
        </div>
      </div>
    </c:if>
  </div>
</div>

</div>
	<!-- / 主体 -->
	<%@ include file="inc/foot.jsp"%>
</html>
