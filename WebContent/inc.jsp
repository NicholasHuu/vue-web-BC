<%@ page language="java" import="java.util.*,com.mh.commons.constants.*,com.mh.commons.conf.*,com.mh.commons.constants.WebSiteManagerConstants"
	contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="com.mh.commons.utils.ServletUtils"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="mh" uri="http://www.mh.com/framework/tags" %>

<%
	Map<String,String> ctxMap = WebSiteManagerConstants.ctxMap;
	request.setAttribute("ctxMap", ctxMap);
	
	String p = request.getParameter("p");
	if(!"".equals(p) && !"null".equals(p) && p!=null){
		request.getSession().setAttribute("agentNo", p);
 
		String basePath = ServletUtils.getWebDomain(request);
		basePath += "main/register";
		response.setHeader("Location",basePath);
		response.sendRedirect(basePath);
	}
	request.setAttribute("liveSite", ResourceConstant.liveSite);
	request.setAttribute("slotSite", ResourceConstant.slotSite);
	request.setAttribute("sportSite", ResourceConstant.sportSite);
	request.setAttribute("cpSite", ResourceConstant.cpSite);
	
	if(null == request.getSession().getAttribute("sbtMsg")){
		request.getSession().setAttribute("sbtMsg", WebSiteManagerConstants.SYSPARAMMAP.get(com.mh.commons.constants.WebConstants.SBT_MSG_KEY));
	}
	
	Map<String, List<?>> map = new HashMap<String, List<?>>();
    map.put("pt", ResourceConstant.PT_ELECTRONIC_HOT);
    map.put("os", ResourceConstant.OS_ELECTRONIC_HOT);
    map.put("mg", ResourceConstant.MG_ELECTRONIC_HOT);
    map.put("ag", ResourceConstant.AG_ELECTRONIC_HOT);
    map.put("gd", ResourceConstant.GD_ELECTRONIC_HOT);
    map.put("ttg", ResourceConstant.TTG_ELECTRONIC_HOT);
    map.put("nt", ResourceConstant.NEWNT_ELECTRONIC_HOT);
    map.put("bbin", ResourceConstant.BBIN_ELECTRONIC_HOT);
    request.getSession().setAttribute("eleMap", map);
    
    request.getSession().setAttribute("promoList", WebSiteManagerConstants.LbWEBPROMOS_LIST);
 %>