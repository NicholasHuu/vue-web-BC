<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<style>
    .news {
        position: relative;
        padding-left: 2.6rem;
        height: 30px;
        overflow: hidden;
	    background: #2b2b2b;
	    color: #cecece;
	    line-height: 100%;
    }
	.news .marquee {
	  overflow: hidden;
	  border:none;
	  display: block;
	  width: 100%;
	  font-family: "Microsoft Yahei";
	  font-size: 12px;
	}
	.news:before {
	    content: " ";
	    display: block;
	    position: absolute;
	    left: 3%;
	    top: 50%;
	    margin-top: -0.9rem;
	    width: 1.5rem;
	    height: 1.8rem;
	    background: url(${resourceRoot}/m/mobileapp/images/message-icon.png);
	    background-size: cover;
	    background-repeat: no-repeat;
    }
</style>

<div class="news cf" >
	<a data-ajax="false" class="marquee" data-duration='15000' data-startVisible="true" data-gap='10' data-duplicated='true' href="${ctx }/m/main?code=new_list">
		<c:forEach var="item" items="${ggList}" varStatus="status">
			${item.ggName }&nbsp;&nbsp;
		</c:forEach>
	</a>
</div>

<script>
    $(function () {
        $('.marquee').marquee();
    });
</script>