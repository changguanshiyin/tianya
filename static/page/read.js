!function($){function getPostUserState(){var paras=location.pathname.replace(".shtml","").split("-"),blogId=$.param.getParam("BlogID")||paras[1],postId=$.param.getParam("PostID")||paras[2],pageId=$.param.getParam("page")||paras[3]||1;$.ajax({contentType:"application/x-www-form-urlencoded; charset=gbk",type:"get",datatype:"json",url:"http://blog.tianya.cn/blogger/permission.asp?BlogID="+blogId,cache:!1,success:function(html){if(eval(html),0==data1.result&&"/post"==location.pathname.split("-")[0]){if(2==data1.data.b_state||3==data1.data.b_state)return void(location.href="http://blog.tianya.cn/blogger/error.asp?msgid="+data1.data.b_state);if(1==data1.data.u_state)return void(location.href="http://blog.tianya.cn/blogger/post_read.asp?BlogID="+blogId+"&PostID="+postId+"&page="+pageId)}}})}function getUserState(){$.ajax({contentType:"application/x-www-form-urlencoded; charset=gbk",type:"get",datatype:"json",url:"http://blog.tianya.cn/blogger/permission.asp?BlogID="+pageParam.BlogID,cache:!1,success:function(html){if(eval(html),0==data1.result){for(var key in data1.data)$("#"+key).html(data1.data[key]);if(2==data1.data.b_state||3==data1.data.b_state)return void(location.href="http://blog.tianya.cn/blogger/error.asp?msgid="+data1.data.b_state)}}})}function getData(){var blogId="",postId="";window.pageParam?(blogId=pageParam.BlogID,postId=pageParam.PostID||0):(blogId=$.param.getParam("BlogID")||location.pathname.split("-")[1],postId=$.param.getParam("PostID")||location.pathname.split("-")[2]),$.ajax({contentType:"application/x-www-form-urlencoded; charset=gbk",type:"get",datatype:"json",url:"http://blog.tianya.cn/blogger/module_nocache.asp?blogId="+blogId+"&postId="+postId,cache:!1,success:function(html){if(eval(html),0==data1.result)for(var key in data1.data)$("#"+key).html(data1.data[key])}})}function blogSumbit(){var t=$("#frm_comment,#comment_anchor"),a=t.find("input[type=submit],input[type=button]"),e=t.find("textarea"),o="http://blog.tianya.cn/api/blog",n={method:"blog.ice.savenewComment","params.blogId":$("#BlogID").val(),"params.postId":$("#PostID").val()};a.unbind("click").click(function(){if(!n["params.blogId"]||!n["params.postId"])return alert("参数错误！"),!1;var t=$.trim(e.val());return 0==t.length?(alert("内容不能为空！"),!1):(n["params.content"]=t,a.attr({disabled:!0}),$.ajax({url:o,data:n,type:"POST",dataType:"json",success:function(t){t&&t.message?(alert(t.message),1==t.success?location.href="http://blog.tianya.cn/post-"+n["params.blogId"]+"-"+n["params.postId"]+"-1.shtml":-15==t.code&&TY.loader("TY.ui.nav",function(){TY.checkLoginUser(3)})):alert("提交失败！"),a.removeAttr("disabled")}}),!1)})}window.pageParam?getUserState():getPostUserState();var getUserName={domHtml:function(){return[__global.isOnline()?"作者："+__global.getUserName()+"<br>输入您的评论：(不支持HTML标签)":'<a href="javascript:void(0);" id="blog_login">登录</a> | <a href="http://passport.tianya.cn/register/default.jsp?sourceURL=http%3A%2F%2Fbbs.tianya.cn%2Fpost-no04-2525259-1.shtml" target="_blank">注册</a><br>输入您的评论：(不支持HTML标签)'].join("")},bindEvent:function(){$("div.posttop").html(this.domHtml()),$("div.posttop").delegate("#blog_login","click",function(){__global.isOnline()||TY.loginAction()})}},getKeyCode={domHtml:function(t){return['<input type="text" maxlength="4" size="4" id="validate_key" name="validate_key" /><img height="18" align="absmiddle" src="http://blog.tianya.cn/blogger/keycode/code.asp?id='+t+'"> <a href="javascript:void(0)" id="renovate">换一张</a>'].join("")},getScript:function(){var _this=this;$.ajax({contentType:"application/x-www-form-urlencoded; charset=gbk",url:"http://blog.tianya.cn/blogger/keycode/makeCode.asp",data:{tb_strip:makeKeycode.tb_strip,tb_comefrom:makeKeycode.tb_comefrom},cache:!1,type:"post",datatype:"json",success:function(html){eval(html),0==keyCodeId.result&&($("#imgcodeid").html(_this.domHtml(keyCodeId.data.Code)),$("#validate_key_id").val(keyCodeId.data.Code)),$("#validate_key").focus()}})},bindEvent:function(){var t=this;$("#validate_key").bind("click",function(){0==$("#imgcodeid").find("img").length&&t.getScript()}),$("#imgcodeid").delegate("#renovate","click",function(){t.getScript()})}};$(document).ready(function(){getData(),getUserName.bindEvent(),getKeyCode.bindEvent(),blogSumbit()})}(jQuery);