<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/manager/";
%>

<style type="text/css">
/* Basic Grey */
.basic-grey {
margin-left:auto;
margin-right:auto;
max-width: 100%;
background: #F7F7F7;
padding: 25px 15px 25px 10px;
font: 12px Georgia, "Times New Roman", Times, serif;
color: #888;
text-shadow: 1px 1px 1px #FFF;
border:1px solid #E4E4E4;
}
.basic-grey h1 {
font-size: 25px;
padding: 0px 0px 10px 40px;
display: block;
border-bottom:1px solid #E4E4E4;
margin: -10px -15px 30px -10px;;
color: #888;
}
.basic-grey h1>span {
display: block;
font-size: 11px;
}
.basic-grey label {
display: block;
margin: 0px;
}
.basic-grey label>span {
float: left;
width: 20%;
text-align: right;
padding-right: 10px;
margin-top: 10px;
color: #888;
}
.basic-grey input[type="text"], .basic-grey input[type="email"], .basic-grey input[type="password"], .basic-grey textarea, .basic-grey select {
border: 1px solid #DADADA;
color: #888;
height: 30px;
margin-bottom: 16px;
margin-right: 6px;
margin-top: 2px;
outline: 0 none;
padding: 3px 3px 3px 5px;
width: 70%;
font-size: 12px;
line-height:15px;
box-shadow: inset 0px 1px 4px #ECECEC;
-moz-box-shadow: inset 0px 1px 4px #ECECEC;
-webkit-box-shadow: inset 0px 1px 4px #ECECEC;
}
.basic-grey textarea{
padding: 5px 3px 3px 5px;
}
.basic-grey select {
background: #FFF url('down-arrow.png') no-repeat right;
background: #FFF url('down-arrow.png') no-repeat right);
appearance:none;
-webkit-appearance:none;
-moz-appearance: none;
text-indent: 0.01px;
text-overflow: '';
width: 70%;
height: 35px;
line-height: 25px;
}
.basic-grey textarea{
height:100px;
}
.basic-grey .button {
background: #E27575;
border: none;
padding: 10px 25px 10px 25px;
color: #FFF;
box-shadow: 1px 1px 5px #B6B6B6;
border-radius: 3px;
text-shadow: 1px 1px 1px #9E3F3F;
cursor: pointer;
}
.basic-grey .button:hover {
background: #CF7A7A
}
</style>
    	<div class="main">
    		<form action="<%=basePath%>user/add.htm" method="post" class="basic-grey">
    			<input type="hidden" name="id" value='${account.id}'/>
    			
				<label for="title">登录帐号：</label>
				<input type="text" name="username" id="username" value='${account.username}' style="width:80%"/>
				<br/>
				<br/>
				<label for="title">登录密码：</label>
				<input type="password" name="password" id="password" value='${account.password}' style="width:80%"/>
				<br/>
				<br/>
				<label for="title">用户名称：</label>
				<input type="text" name="nickname" id="nickname" value='${account.nickname}' style="width:80%"/>
				<br/>
				<br/>
				
				<label for="title">角色信息：</label>
				<c:forEach var="role" items="${roles}" >
			   		<p><input type="checkbox" name="roleId" value="${role.id}"/>${role.roleName}</p>
    			</c:forEach> 

				<br/>
    			<input type="submit" class="button" value="提交"/>
    		</form>
    	</div>
    	<script type="text/javascript">
	    </script>	
