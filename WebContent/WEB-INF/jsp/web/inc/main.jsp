<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ page trimDirectiveWhitespaces="true" %>

<div class="row relative">
    <div class="wrapper">
        <div class="sidebar-bottom"></div>
        <div class="notice-msg-container">
            <%@include file="msg_text.jsp" %>
            <%@include file="promo_text.jsp" %>
        </div>
        <div class="slider slider-home" plugin="superslide" 
        plugin-data-next=".slider-direction .slider-right"
        plugin-data-pre=".slider-direction .slider-left" 
        plugin-data-pager=".links-pager ul">
            <ul class="bd clearfix">
                <li><img src="${resourceRoot}/web/ybb/assets/img/slider-1.jpg" alt="" /></li>
                <li><img src="${resourceRoot}/web/ybb/assets/img/slider-2.jpg" alt="" /></li>
                <li><img src="${resourceRoot}/web/ybb/assets/img/slider-3.jpg" alt="" /></li>
                <li><img src="${resourceRoot}/web/ybb/assets/img/slider-4.jpg" alt="" /></li>
            </ul>
            <div class="slider-direction">
	             <img src="${resourceRoot }/web/ybb/assets/img/slider-left.png" alt="" class="slider-left" />
	             <img src="${resourceRoot }/web/ybb/assets/img/slider-right.png" alt="" class="slider-right" />
            </div>
        </div>
    </div>
</div>

<div class="container home">
    <div class="inner clearfix">
        <div class="home-game-selector box-shadow-section">
            <div class="inner">
				<div class="game-switcher-con ">
		            <div class="wrap clearfix">
		                 <div class="pretitle"><img src="${resourceRoot}/web/ybb/assets/img/home-hot-game.png" alt="" /></div>
		                 <ul class="gs-nav">
		                     <c:forEach var="item" items="${slotSite}" varStatus="loop">
                             <li class="ui-item-son  <c:if test="${loop.index eq 0 }"> active </c:if>${item.flat}-slot">
                                 <a href="javascript:void(0);" class="ui-link-son"></a>
                                 <span>${item.flatName }</span>
                             </li>
			                </c:forEach>
		                 </ul>
		            </div>
		        </div>
		        <div class="game-items-wrap ">
		          <ul class="items clearfix">
                      <c:forEach var="item" items="${eleMap['pt']}" end="9">
                       <li class="slot-pt-items">
                         <div class="item-wrap">
                            <div class="item">
                                <c:choose>
                                    <c:when test="${item.isSupport eq 1 && gameType1 eq 'support'}">
                                        <c:choose>
                                             <c:when test="${item.isFavourite eq 1 }">
                                                 <img title="我的收藏" src="${resourceRoot }/web/ybb/assets/img/slots/like-on.png" class="like-slot active" alt="" onclick="likeThisSlot(this, 'pt', '${item.progressiveGameCode}')"/>
                                             </c:when>
                                             <c:otherwise>
                                                <img title="我的收藏"  src="${resourceRoot }/web/ybb/assets/img/slots/like-off.png" class="like-slot" alt="" onclick="likeThisSlot(this, 'pt', '${item.progressiveGameCode}')"/> 
                                             </c:otherwise>
                                         </c:choose>
                                    </c:when>
                                    <c:otherwise>
                                        <c:choose>
                                             <c:when test="${item.isFavourite eq 1 }">
                                                 <img title="我的收藏"  src="${resourceRoot }/web/ybb/assets/img/slots/like-on.png" class="like-slot active" alt="" onclick="likeThisSlot(this, 'pt', '${item.eleGameCode}')"/>
                                             </c:when>
                                             <c:otherwise>
                                                <img title="我的收藏"  src="${resourceRoot }/web/ybb/assets/img/slots/like-off.png" class="like-slot" alt="" onclick="likeThisSlot(this, 'pt', '${item.eleGameCode}')"/> 
                                             </c:otherwise>
                                         </c:choose>
                                    </c:otherwise>
                                </c:choose>
                                <div class="thumb-wrap"><div class="row-thumb">
                                <a
                                 class="ui-icon lazy" 
                                 data-original="${item.eleGamePic}"
                                 style=" background-image: url(${resourceRoot}/web/ybb/assets/img/blank.png);background-size: contain;"></a>
                                <a class="banner" href="javascript:void();" onclick="winOpen('${ctx}/forwardGame?gameType=ptElectronic&game=${item.eleGameCode}',window.screen.width,window.screen.height,0,0,'game','pt');return false;">${item.eleGameCnname }</a>
                             </div></div>
                             <c:choose>
	                             <c:when test="${empty webUser }">
                                   <a target="_blank" href="javascript:void();" 
                                  data-toggle="modal" data-target=".modal-login" title="登录"
                                   class="btn btn-home-play">开始游戏</a>
	                             </c:when>
	                             <c:otherwise>
	                               <a target="_blank" href="javascript:void();" 
	                               onclick="winOpen('${ctx}/forwardGame?gameType=ptElectronic&game=${item.eleGameCode}',window.screen.width,window.screen.height,0,0,'game','pt');return false;"
	                               class="btn btn-home-play">开始游戏</a>
	                             </c:otherwise>
                             </c:choose>
                
                            </div>
                         </div>
                       </li>
                      </c:forEach>
                      <c:forEach var="item" items="${eleMap['mg']}" end="9">
                       
                       <li class="hideme slot-mg-items">
                         <div class="item-wrap">
                            <div class="item">
	                            <c:choose>
		                          <c:when test="${item.isFavourite eq 1 }">
		                              <img title="我的收藏"  src="${resourceRoot }/web/ybb/assets/img/slots/like-on.png" class="like-slot active" alt="" onclick="likeThisSlot(this, 'mg', '${item.remark}')"/>
		                          </c:when>
		                          <c:otherwise>
		                             <img title="我的收藏"  src="${resourceRoot }/web/ybb/assets/img/slots/like-off.png" class="like-slot" alt="" onclick="likeThisSlot(this, 'mg', '${item.remark}')"/>  
		                          </c:otherwise>
		                      </c:choose>
                             <div class="thumb-wrap"><div class="row-thumb">
                                <a
                                 class="ui-icon lazy" 
                                 data-original="${item.eleGamePic}"
                                 style=" background-image: url(${resourceRoot}/web/ybb/assets/img/blank.png);"></a>
                                <a class="banner" href="javascript:void();" onclick="winOpen('${ctx}/forwardGame?gameType=mgElectronic&gameName=${item.eleGameId}&gameCode=${item.remark }',window.screen.width,window.screen.height,0,0,'game','mg');return false;">${item.eleGameCnname }</a>
                             </div></div>
                             <c:choose>
                                 <c:when test="${empty webUser }">
                                   <a target="_blank" href="javascript:void();" 
                                  data-toggle="modal" data-target=".modal-login" title="登录"
                                   class="btn btn-home-play">开始游戏</a>
                                 </c:when>
                                 <c:otherwise>
	                               <a target="_blank" href="javascript:void();" 
	                                onclick="winOpen('${ctx}/forwardGame?gameType=mgElectronic&gameName=${item.eleGameId}&gameCode=${item.remark }',window.screen.width,window.screen.height,0,0,'game','mg');return false;"
	                               class="btn btn-home-play">开始游戏</a>
                                 </c:otherwise>
                             </c:choose>
                            </div>
                         </div>
                       </li>
                      </c:forEach>
                      <c:forEach var="item" items="${eleMap['os']}" end="9">
                      
                       <li class="hideme slot-os-items">
                         <div class="item-wrap">
                            <div class="item">
                               <c:choose>
		                           <c:when test="${item.isFavourite eq 1 }">
		                               <img title="我的收藏"  src="${resourceRoot }/web/ybb/assets/img/slots/like-on.png" class="like-slot active" alt="" onclick="likeThisSlot(this, 'os', '${item.eleGameId}')"/>
		                           </c:when>
		                           <c:otherwise>
		                              <img title="我的收藏"  src="${resourceRoot }/web/ybb/assets/img/slots/like-off.png" class="like-slot" alt="" onclick="likeThisSlot(this, 'os', '${item.eleGameId}')"/>   
		                           </c:otherwise>
		                       </c:choose>
                             <div class="thumb-wrap"><div class="row-thumb">
                                <a
                                 class="ui-icon lazy" 
                                 data-original="${item.eleGamePic}"
                                 style=" background-image: url(${resourceRoot}/web/ybb/assets/img/blank.png);    background-size: 94%;"></a>
                                <a class="banner" href="javascript:void();" onclick="winOpen('${ctx}/forwardGame?gameType=osElectronicReal&gameName=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','os');return false;">${item.eleGameCnname }</a>
                             </div></div>
                             <c:choose>
                               <c:when test="${empty webUser }">
                                 <a target="_blank" href="javascript:void();" 
                                data-toggle="modal" data-target=".modal-login" title="登录"
                                 class="btn btn-home-play">开始游戏</a>
                               </c:when>
                               <c:otherwise>
                              <a target="_blank" href="javascript:void();" 
                              onclick="winOpen('${ctx}/forwardGame?gameType=osElectronicReal&gameName=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','os');return false;"
                              class="btn btn-home-play">开始游戏</a>
                               </c:otherwise>
                              </c:choose>
                            </div>
                         </div>
                       </li>
                      </c:forEach>
                      <c:forEach var="item" items="${eleMap['ttg']}" end="9">
                      
                       <li class="hideme slot-ttg-items">
                         <div class="item-wrap">
                            <div class="item">
	                            <c:choose>
		                        <c:when test="${item.isFavourite eq 1 }">
		                            <img title="我的收藏" src="${resourceRoot }/web/ybb/assets/img/slots/like-on.png" class="like-slot active" alt="" onclick="likeThisSlot(this, 'ttg', '${item.eleGameId}')"/>
		                        </c:when>
		                        <c:otherwise>
		                           <img title="我的收藏" src="${resourceRoot }/web/ybb/assets/img/slots/like-off.png" class="like-slot" alt="" onclick="likeThisSlot(this, 'ttg', '${item.eleGameId}')"/>   
		                        </c:otherwise>
		                       </c:choose>
                             <div class="thumb-wrap"><div class="row-thumb">
                                <a
                                 class="ui-icon lazy" 
                                 data-original="${item.eleGamePic}"
                                 style=" background-image: url(${resourceRoot}/web/ybb/assets/img/blank.png); background-size: 76%;"></a>
                                <a class="banner" href="javascript:void();" onclick="winOpen('${ctx}/forwardGame?gameType=ttg&gameName=${item.eleGameEnname}&gameId=${ item.eleGameId}&eleGameType=${item.eleGameType2 }',window.screen.width,window.screen.height,0,0,'game','ttg');return false;">${item.eleGameCnname }</a>
                             </div></div>
                            <c:choose>
                               <c:when test="${empty webUser }">
                                 <a target="_blank" href="javascript:void();" 
                                data-toggle="modal" data-target=".modal-login" title="登录"
                                 class="btn btn-home-play">开始游戏</a>
                               </c:when>
                               <c:otherwise>
                               <a target="_blank"
                                  onclick="winOpen('${ctx}/forwardGame?gameType=ttg&gameName=${item.eleGameEnname}&gameId=${ item.eleGameId}&eleGameType=${item.eleGameType2 }',window.screen.width,window.screen.height,0,0,'game','ttg');return false;" href="javascript:void(0);"
                               class="btn btn-home-play">开始游戏</a>
                               </c:otherwise>
                              </c:choose>
                            </div>
                         </div>
                       </li>
                      </c:forEach>
                      <c:forEach var="item" items="${eleMap['nt']}" end="9">
                     
                       <li class="hideme slot-newnt-items">
                         <div class="item-wrap">
                            <div class="item">
	                           <c:choose>
		                           <c:when test="${item.isFavourite eq 1 }">
		                               <img title="我的收藏"  src="${resourceRoot }/web/ybb/assets/img/slots/like-on.png" class="like-slot active" alt="" onclick="likeThisSlot(this, 'newnt', '${item.eleGameCode}')"/>
		                           </c:when>
		                           <c:otherwise>
		                              <img title="我的收藏"  src="${resourceRoot }/web/ybb/assets/img/slots/like-off.png" class="like-slot" alt="" onclick="likeThisSlot(this, 'newnt', '${item.eleGameCode}')"/> 
		                           </c:otherwise>
		                       </c:choose>
                             <div class="thumb-wrap"><div class="row-thumb">
                                <a
                                 class="ui-icon lazy" 
                                 data-original="${item.eleGamePic}"
                                 style=" background-image: url(${resourceRoot}/web/ybb/assets/img/blank.png);    background-size: 93%;"></a>
                                <a class="banner" href="javascript:void();" onclick="winOpen('${ctx}/forwardGame?gameType=newnt&game=${item.eleGameCode}',window.screen.width,window.screen.height,0,0,'game','newnt');return false;">${item.eleGameCnname }</a>
                             </div></div>
                               <c:choose>
	                               <c:when test="${empty webUser }">
	                                 <a target="_blank" href="javascript:void();" 
	                                data-toggle="modal" data-target=".modal-login" title="登录"
	                                 class="btn btn-home-play">开始游戏</a>
	                               </c:when>
	                               <c:otherwise>
	                               <a target="_blank" href="javascript:void();" 
	                                onclick="winOpen('${ctx}/forwardGame?gameType=newnt&game=${item.eleGameCode}',window.screen.width,window.screen.height,0,0,'game','newnt');return false;"
	                               class="btn btn-home-play">开始游戏</a>
	                               </c:otherwise>
                              </c:choose>
                            </div>
                         </div>
                       </li>
                      </c:forEach>
                      <c:forEach var="item" items="${eleMap['gd']}" end="9">
	                     
                       <li class="hideme slot-gd-items">
                         <div class="item-wrap">
                            <div class="item">
                            <c:choose>
                             <c:when test="${item.isFavourite eq 1 }">
                                 <img title="我的收藏"  src="${resourceRoot }/web/ybb/assets/img/slots/like-on.png" class="like-slot active" alt="" onclick="likeThisSlot(this, 'gd', '${item.eleGameId}')"/>
                             </c:when>
                             <c:otherwise>
                                <img title="我的收藏"  src="${resourceRoot }/web/ybb/assets/img/slots/like-off.png" class="like-slot" alt="" onclick="likeThisSlot(this, 'gd', '${item.eleGameId}')"/>   
                             </c:otherwise>
                            </c:choose>
                             <div class="thumb-wrap"><div class="row-thumb">
                                <a
                                 class="ui-icon lazy" 
                                 data-original="${item.eleGamePic}"
                                 style=" background-image: url(${resourceRoot}/web/ybb/assets/img/blank.png); background-size: contain;background-position-y: 6px;"></a>
                                <a class="banner" href="javascript:void();" onclick="winOpen('${ctx}/forwardGame?gameType=gd&game=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','gd');return false;">${item.eleGameCnname }</a>
                             </div></div>
                                <c:choose>
                                   <c:when test="${empty webUser }">
                                     <a target="_blank" href="javascript:void();" 
                                    data-toggle="modal" data-target=".modal-login" title="登录"
                                     class="btn btn-home-play">开始游戏</a>
                                   </c:when>
                                   <c:otherwise>
		                               <a target="_blank" href="javascript:void();" 
		                               onclick="winOpen('${ctx}/forwardGame?gameType=gd&game=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','gd');return false;"
		                               class="btn btn-home-play">开始游戏</a>
                                   </c:otherwise>
                              </c:choose>
                            </div>
                         </div>
                       </li>
                      </c:forEach>
                      <c:forEach var="item" items="${eleMap['bbin']}" end="9">
                       <li class="hideme slot-bbin-items">
                         <div class="item-wrap">
                            <div class="item">
                            <c:choose>
                            <c:when test="${item.isFavourite eq 1 }">
                                <img title="我的收藏"  src="${resourceRoot }/web/ybb/assets/img/slots/like-on.png" class="like-slot active" alt="" onclick="likeThisSlot(this, 'bbin', '${item.eleGameId}')"/>
                            </c:when>
                            <c:otherwise>
                               <img title="我的收藏"  src="${resourceRoot }/web/ybb/assets/img/slots/like-off.png" class="like-slot" alt="" onclick="likeThisSlot(this, 'bbin', '${item.eleGameId}')"/>   
                            </c:otherwise>
                           </c:choose>
                             <div class="thumb-wrap"><div class="row-thumb">
                                <a
                                 class="ui-icon lazy" 
                                 data-original="${item.eleGamePic}"
                                 style=" background-image: url(${resourceRoot}/web/ybb/assets/img/blank.png);"></a>
                                <a class="banner" href="javascript:void();"  onclick="winOpen('${ctx}/forwardGame?gameType=bbin&agGameType=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','bbin');" href="javascript:void(0);">${item.eleGameCnname }</a>
                             </div></div>
                               <c:choose>
                                   <c:when test="${empty webUser }">
                                     <a target="_blank" href="javascript:void();" 
                                    data-toggle="modal" data-target=".modal-login" title="登录"
                                     class="btn btn-home-play">开始游戏</a>
                                   </c:when>
                                   <c:otherwise>
                                   <a target="_blank" href="javascript:void();" 
                                    onclick="winOpen('${ctx}/forwardGame?gameType=bbin&agGameType=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','bbin');" href="javascript:void(0);"
                                   class="btn btn-home-play">开始游戏</a>
                                   </c:otherwise>
                              </c:choose>
                            </div>
                         </div>
                       </li>
                      </c:forEach>
                      <c:forEach var="item" items="${eleMap['ag']}" end="9">
                       <li class="hideme slot-ag-items">
                         <div class="item-wrap">
                            <div class="item">
                            <c:choose>
	                        <c:when test="${item.isFavourite eq 1 }">
	                            <img title="我的收藏"  src="${resourceRoot }/web/ybb/assets/img/slots/like-on.png" class="like-slot active" alt="" onclick="likeThisSlot(this, 'ag', '${item.eleGameId}')"/>
	                        </c:when>
	                        <c:otherwise>
	                           <img title="我的收藏"  src="${resourceRoot }/web/ybb/assets/img/slots/like-off.png" class="like-slot" alt="" onclick="likeThisSlot(this, 'ag', '${item.eleGameId}')"/>   
	                        </c:otherwise>
	                       </c:choose>
                             <div class="thumb-wrap"><div class="row-thumb">
                                <a
                                 class="ui-icon lazy" 
                                 data-original="${item.eleGamePic}"
                                 style=" background-image: url(${resourceRoot}/web/ybb/assets/img/blank.png);"></a>
                                <a class="banner" href="javascript:void();"  onclick="winOpen('${ctx}/forwardGame?gameType=ag&agGameType=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','ag');" href="javascript:void(0);">${item.eleGameCnname }</a>
                             </div></div>
                               <c:choose>
                                   <c:when test="${empty webUser }">
                                     <a target="_blank" href="javascript:void();" 
                                    data-toggle="modal" data-target=".modal-login" title="登录"
                                     class="btn btn-home-play">开始游戏</a>
                                   </c:when>
                                   <c:otherwise>
	                               <a target="_blank" href="javascript:void();" 
	                                onclick="winOpen('${ctx}/forwardGame?gameType=ag&agGameType=${item.eleGameId}',window.screen.width,window.screen.height,0,0,'game','ag');" href="javascript:void(0);"
	                               class="btn btn-home-play">开始游戏</a>
                                   </c:otherwise>
                              </c:choose>
                            </div>
                         </div>
                       </li>
                      </c:forEach>
		          </ul>
		        </div>
            </div>
        </div>
		<div class="promotion-wrap clearfix box-shadow-section">
		  <div class="left gamefish">
		      <a href="javascript:void(0)" onclick="winOpen('${ctx}/forwardGame?gameType=ag&agGameType=6',window.screen.width,window.screen.height,0,0,'game','ag')"><img src="${resourceRoot }//web/ybb/assets/img/fishing-game.png" alt="" /></a>
		      <a href="javascript:void(0)" onclick="winOpen('${ctx}/forwardGame?gameType=ag&agGameType=6',window.screen.width,window.screen.height,0,0,'game','ag')" class="btn btn-home-play">开始游戏</a>
		      <div class="bg"></div>
		  </div>
		  <div class="left promo">
		      <a href="${ctx }/goPageCenter?code=promos">优惠活动</a>
		  </div>
		</div>
		
		<div class="game-links-wrap clearfix box-shadow-section">
          <div class="left game-links">
            <ul class="items clearfix">
                <li><a href="${ctx }/goPageCenter?code=live"><img src="${resourceRoot }/web/ybb/assets/img/home-gl-live.png" alt="" /></a></li>
                <li><a href="${ctx }/goPageCenter?code=sport"><img src="${resourceRoot }/web/ybb/assets/img/home-gl-sport.png" alt="" /></a></li>
                <li><a href="${ctx }/electronic?code=mg"><img src="${resourceRoot }/web/ybb/assets/img/home-gl-slot.png" alt="" /></a></li>
                <li><a href="${ctx }/goPageCenter?code=lottery_index"><img src="${resourceRoot }/web/ybb/assets/img/home-gl-lottery.png" alt="" /></a></li>
            </ul>
          </div>
          <div class="left service-online">
              <a href="${ctxMap['msg007']}" target="_blank"></a>
          </div>
        </div>
        
        <div class="footer-banner">
            <img src="${resourceRoot }/web/ybb/assets/img/footer-banner.png" alt="" />
        </div>
		
    </div>
</div>