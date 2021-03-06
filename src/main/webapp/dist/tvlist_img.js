webpackJsonp([13],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(56);
	__webpack_require__(58);

	__webpack_require__(19);
	var Fingerprint = __webpack_require__(24);
	__webpack_require__(60);


	$(function () {
	    var blogId, viewUrl, needAuth;

	    $('.loading').hide();

	    $('#fix-both').navigator({     //左右都有fix元素
	        isScrollToNext: true,      //出现半个tab时，不跳动到下一个tab
	        isShowShadow: false       //不显示左右阴影
	    });

	    $('.loadmore-div').on('click', function () {
	        loadMoreData();
	    });

	    $('.menu-tap').on('tap', function () {
	        // $(this).css("background-color","#afa");
	        // location.href = $(this).data('href');
	        viewUrl = $(this).data('href');
	        blogId = $(this).data('id');
	        needAuth = $(this).data('valid');
	        if (!needAuth) {
	            location.href = $(this).data('href');
	        }
	    });
	    $('.popup-with-form').magnificPopup({
	        disableOn: function() {
	            if(!needAuth) {
	                return false;
	            }
	            return true;
	        },
	        type: 'inline',
	        preloader: false,
	        focus: '#name',
	        callbacks: {
	            beforeOpen: function () {
	                if ($(window).width() < 700) {
	                    this.st.focus = false;
	                } else {
	                    this.st.focus = '#name';
	                }
	            },
	            beforeClose: function () {
	                $('.name').attr('value', '');
	            }
	        }
	    });
	    $('.submit-btn').on('tap', function () {
	        $.ajax({
	            type: "GET",
	            url: "/front/blog/checkAuthCode.json",
	            data: {
	                blogId: blogId,
	                authCode: $('.name').val()
	            },
	            dataType: "json",
	            success: function (data) {
	                if (data.result == "success") {
	                    location.href = viewUrl;
	                } else {
	                    $('.error').html(data.msg);
	                }
	            },
	            error: function () {

	            }
	        });
	    });

	    init();

	});

	function init() {
	    $('.newsdiv').css("display", "none");
	    $('.noResult').css("display", "none");
	    $(".loadmore-div").css("display", "none");
	    var blogType = $(".cur").html();
	    var pageNo = 1;

	    $.ajax({
	        type: "GET",
	        url: "http://gmxx.goldskyer.com/front/blog/list.json",
	        data: {type: blogType, pageNo: pageNo},
	        dataType: "json",
	        success: function (data) {
	            //如果pageNo=1 and count(blogs)=0,则显示暂无数据
	            var resultData = data.data;
	            var pageNo = resultData.pageNo;
	            var blogs = resultData.blogs;
	            var totalcnt = resultData.count;
	            if (pageNo == 1 && blogs.length == 0) {
	                $('.newsdiv').css("display", "none");
	                $('.noResult').css("display", "block");
	                $(".loadmore-div").css("display", "none");
	                return;
	            } else {
	                $('.newsdiv').css("display", "block");
	                $('.noResult').css("display", "none");
	            }

	            //当totalcnt - 如果currentcnt >= 10,则加载刷新展现
	            if (totalcnt - pageNo * 10 > 0) {
	                $(".loadmore-div").css("display", "block");//展示
	                $(".loadmore-p").css("display", "block");
	                $(".loadmore-img").css("display", "none");
	            } else {//否则不现实加载刷新
	                $(".loadmore-div").css("display", "none");
	            }
	            $(".pageNo").text(pageNo + 1);
	        },
	        error: function () {
	            $(".loadmore-p").css("display", "block");
	            $(".loadmore-img").css("display", "none");
	        }
	    });
	};

	function loadMoreData() {

	    $('.loadmore-p').css("display", "none");
	    $('.loadmore-img').css("display", "block");

	    var blogType = $(".cur").html();
	    var pageNo = $(".pageNo").text();

	    $.ajax({
	        type: "GET",
	        url: "http://gmxx.goldskyer.com/front/blog/list.json",
	        data: {type: blogType, pageNo: pageNo},
	        dataType: "json",
	        success: function (data) {
	            //如果pageNo=1 and count(blogs)=0,则显示暂无数据
	            var resultData = data.data;
	            var pageNo = resultData.pageNo;
	            var blogs = resultData.blogs;
	            var totalcnt = resultData.count;
	            if (pageNo == 1 && blogs.length == 0) {
	                $('.rich_media_area').css("display", "none");
	                $('.noResult').css("display", "block");
	                $(".loadmore-div").css("display", "none");
	                return;
	            } else {
	                $('.rich_media_area').css("display", "block");
	                $('.noResult').css("display", "none");
	            }
	            //否则加载并显示数据
	            for (var i = 0; i < blogs.length; i++) {
	                var blog = blogs[i];
	                var basePath = "http://gmxx.goldskyer.com/";
	                var blogUrl = basePath + "front/tv/view.htm?id=" + blog.id;
	                var imgSrc;
	                if ("coverImage" in blog) {
	                    imgSrc = blog.coverImage;
	                } else {
	                    imgSrc = "http://gmxx.szgm.edu.cn/UploadFile/1511/182034504628960/182033210161026.jpg";
	                }

	                var blog_row = '<a href="' + blogUrl + '"><div class="rich_media_list">';
	                blog_row += '<div class="media_content">';
	                blog_row += '<p class="media_title">' + blog.title + '</p>';
	                blog_row += '<div class="bg_img">';
	                blog_row += '<img class="media_image" src="' + imgSrc + '" z-index=1>';
	                blog_row += '<img class="play_img" src="../images/play.png" z-index=2>';
	                blog_row += '</div>';
	                blog_row += '<div class="tips">';
	                blog_row += '<div class="tips_video_type"><i class="icon_logo"></i>  ' + blogType + ' ';
	                blog_row += '<span class="media_date">' + blog.updateDate + '</span></div>';
	                blog_row += '<div class="tips_video_tool">赞 <span class="likeNum">' + blog.voteUp + '</span></div>';
	                blog_row += '</div></div></div></a>';
	                $(".rich_media_area").append(blog_row);
	            }

	            //当totalcnt - 如果currentcnt >= 10,则加载刷新展现
	            if (totalcnt - pageNo * 10 > 0) {
	                $(".loadmore-div").css("display", "block");//展示
	                $(".loadmore-p").css("display", "block");
	                $(".loadmore-img").css("display", "none");
	            } else {//否则不现实加载刷新
	                $(".loadmore-div").css("display", "none");
	            }
	            $(".pageNo").text(pageNo + 1);
	        },
	        error: function () {
	            $(".loadmore-p").css("display", "block");
	            $(".loadmore-img").css("display", "none");
	        }
	    });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },

/***/ 7:
/***/ function(module, exports) {

	/* Zepto v1.1.4-95-g601372a - zepto event ajax data form fx fx_methods selector touch - zeptojs.com/license */
	var Zepto=function(){function L(t){return null==t?String(t):j[C.call(t)]||"object"}function A(t){return"function"==L(t)}function Z(t){return null!=t&&t==t.window}function $(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function k(t){return"object"==L(t)}function R(t){return k(t)&&!Z(t)&&Object.getPrototypeOf(t)==Object.prototype}function z(t){return"number"==typeof t.length}function q(t){return s.call(t,function(t){return null!=t})}function F(t){return t.length>0?n.fn.concat.apply([],t):t}function _(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function I(t){return t in c?c[t]:c[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function H(t,e){return"number"!=typeof e||l[_(t)]?e:e+"px"}function U(t){var e,n;return f[t]||(e=u.createElement(t),u.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),f[t]=n),f[t]}function X(t){return"children"in t?a.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function V(t,e){var n,i=t?t.length:0;for(n=0;i>n;n++)this[n]=t[n];this.length=i,this.selector=e||""}function B(n,i,r){for(e in i)r&&(R(i[e])||D(i[e]))?(R(i[e])&&!R(n[e])&&(n[e]={}),D(i[e])&&!D(n[e])&&(n[e]=[]),B(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function Y(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return A(e)?e.call(t,n,i):e}function W(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function G(e,n){var i=e.className||"",r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function K(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?n.parseJSON(t):t):t}catch(e){return t}}function Q(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)Q(t.childNodes[n],e)}var t,e,n,i,N,P,r=[],o=r.concat,s=r.filter,a=r.slice,u=window.document,f={},c={},l={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},h=/^\s*<(\w+|!)[^>]*>/,p=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,d=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,m=/^(?:body|html)$/i,g=/([A-Z])/g,v=["val","css","html","text","data","width","height","offset"],y=["after","prepend","before","append"],x=u.createElement("table"),w=u.createElement("tr"),b={tr:u.createElement("tbody"),tbody:x,thead:x,tfoot:x,td:w,th:w,"*":u.createElement("div")},E=/complete|loaded|interactive/,T=/^[\w-]*$/,j={},C=j.toString,S={},O=u.createElement("div"),M={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},D=Array.isArray||function(t){return t instanceof Array};return S.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~S.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},N=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},P=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},S.fragment=function(e,i,r){var o,s,f;return p.test(e)&&(o=n(u.createElement(RegExp.$1))),o||(e.replace&&(e=e.replace(d,"<$1></$2>")),i===t&&(i=h.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,o=n.each(a.call(f.childNodes),function(){f.removeChild(this)})),R(r)&&(s=n(o),n.each(r,function(t,e){v.indexOf(t)>-1?s[t](e):s.attr(t,e)})),o},S.Z=function(t,e){return new V(t,e)},S.isZ=function(t){return t instanceof S.Z},S.init=function(e,i){var r;if(!e)return S.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&h.test(e))r=S.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(u,e)}else{if(A(e))return n(u).ready(e);if(S.isZ(e))return e;if(D(e))r=q(e);else if(k(e))r=[e],e=null;else if(h.test(e))r=S.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(u,e)}}return S.Z(r,e)},n=function(t,e){return S.init(t,e)},n.extend=function(t){var e,n=a.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},S.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],o=i||r?e.slice(1):e,s=T.test(o);return t.getElementById&&s&&i?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:a.call(s&&!i&&t.getElementsByClassName?r?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=u.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=L,n.isFunction=A,n.isWindow=Z,n.isArray=D,n.isPlainObject=R,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=N,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.noop=function(){},n.map=function(t,e){var n,r,o,i=[];if(z(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return F(i)},n.each=function(t,e){var n,i;if(z(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={constructor:S.Z,length:0,forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,splice:r.splice,indexOf:r.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=S.isZ(e)?e.toArray():e;return o.apply(S.isZ(this)?this.toArray():this,n)},map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(a.apply(this,arguments))},ready:function(t){return E.test(u.readyState)&&u.body?t(n):u.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?a.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return A(t)?this.not(this.not(t)):n(s.call(this,function(e){return S.matches(e,t)}))},add:function(t,e){return n(P(this.concat(n(t,e))))},is:function(t){return this.length>0&&S.matches(this[0],t)},not:function(e){var i=[];if(A(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):z(e)&&A(e.item)?a.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return k(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!k(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!k(t)?t:n(t)},find:function(t){var e,i=this;return e=t?"object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(S.qsa(this[0],t)):this.map(function(){return S.qsa(this,t)}):n()},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:S.matches(i,t));)i=i!==e&&!$(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!$(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return Y(e,t)},parent:function(t){return Y(P(this.pluck("parentNode")),t)},children:function(t){return Y(this.map(function(){return X(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||a.call(this.childNodes)})},siblings:function(t){return Y(this.map(function(t,e){return s.call(X(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=U(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=A(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=A(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=J(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this.pluck("textContent").join(""):null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if(k(n))for(e in n)W(this,e,n[e]);else W(this,n,J(this,i,t,this.getAttribute(n)))}):this.length&&1===this[0].nodeType?!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){W(this,t)},this)})},prop:function(t,e){return t=M[t]||t,1 in arguments?this.each(function(n){this[t]=J(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(e,n){var i="data-"+e.replace(g,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?K(r):t},val:function(t){return 0 in arguments?this.each(function(e){this.value=J(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;if(!n.contains(u.documentElement,this[0]))return{top:0,left:0};var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r,o=this[0];if(!o)return;if(r=getComputedStyle(o,""),"string"==typeof t)return o.style[N(t)]||r.getPropertyValue(t);if(D(t)){var s={};return n.each(t,function(t,e){s[e]=o.style[N(e)]||r.getPropertyValue(e)}),s}}var a="";if("string"==L(t))i||0===i?a=_(t)+":"+H(t,i):this.each(function(){this.style.removeProperty(_(t))});else for(e in t)t[e]||0===t[e]?a+=_(e)+":"+H(e,t[e])+";":this.each(function(){this.style.removeProperty(_(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(G(t))},I(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){i=[];var r=G(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&G(this,r+(r?" ":"")+i.join(" "))}}):this},removeClass:function(e){return this.each(function(n){if("className"in this){if(e===t)return G(this,"");i=G(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(I(t)," ")}),G(this,i.trim())}})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,G(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=m.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||u.body;t&&!m.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?Z(s)?s["inner"+i]:$(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),y.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=L(e),"object"==t||"array"==t||null==e?e:S.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,a){o=i?a:a.parentNode,a=0==e?a.nextSibling:1==e?a.firstChild:2==e?a:null;var f=n.contains(u.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,a),f&&Q(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),S.Z.prototype=V.prototype=n.fn,S.uniq=P,S.deserializeValue=K,n.zepto=S,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return t&&(!e.e||t.e==e.e)&&(!e.ns||r.test(t.ns))&&(!n||l(t.fn)===l(n))&&(!i||t.sel==i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=T(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function T(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=w}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function j(t){var e,i={originalEvent:t};for(e in t)b.test(e)||t[e]===n||(i[e]=t[e]);return T(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=l(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},w=function(){return!1},b=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(u===n||a===!1)&&(u=a,a=n),u===!1&&(u=w),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(j(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=w),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):T(e),e._args=n,this.each(function(){e.type in f&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=j(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),T(n)}}(Zepto),function(t){function h(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function p(t,e,i,r){return t.global?h(e||n,i,r):void 0}function d(e){e.global&&0===t.active++&&p(e,null,"ajaxStart")}function m(e){e.global&&!--t.active&&p(e,null,"ajaxStop")}function g(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||p(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void p(e,n,"ajaxSend",[t,e])}function v(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),p(n,r,"ajaxSuccess",[e,n,t]),x(o,e,n)}function y(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),p(i,o,"ajaxError",[n,i,t||e]),x(e,n,i)}function x(t,e,n){var i=n.context;n.complete.call(i,e,t),p(n,i,"ajaxComplete",[e,n]),m(n)}function w(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function E(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function T(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=E(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function S(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?S(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/,l=n.createElement("a");l.href=window.location.href,t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?v(f[0],l,i,r):y(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),g(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:w,success:w,error:w,complete:w,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var a,u,o=t.extend({},e||{}),s=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===o[i]&&(o[i]=t.ajaxSettings[i]);d(o),o.crossDomain||(a=n.createElement("a"),a.href=o.url,a.href=a.href,o.crossDomain=l.protocol+"//"+l.host!=a.protocol+"//"+a.host),o.url||(o.url=window.location.toString()),(u=o.url.indexOf("#"))>-1&&(o.url=o.url.slice(0,u)),T(o);var f=o.dataType,h=/\?.+=\?/.test(o.url);if(h&&(f="jsonp"),o.cache!==!1&&(e&&e.cache===!0||"script"!=f&&"jsonp"!=f)||(o.url=E(o.url,"_="+Date.now())),"jsonp"==f)return h||(o.url=E(o.url,o.jsonp?o.jsonp+"=?":o.jsonp===!1?"":"callback=?")),t.ajaxJSONP(o,s);var N,p=o.accepts[f],m={},x=function(t,e){m[t.toLowerCase()]=[t,e]},j=/^([\w-]+:)\/\//.test(o.url)?RegExp.$1:window.location.protocol,C=o.xhr(),S=C.setRequestHeader;if(s&&s.promise(C),o.crossDomain||x("X-Requested-With","XMLHttpRequest"),x("Accept",p||"*/*"),(p=o.mimeType||p)&&(p.indexOf(",")>-1&&(p=p.split(",",2)[0]),C.overrideMimeType&&C.overrideMimeType(p)),(o.contentType||o.contentType!==!1&&o.data&&"GET"!=o.type.toUpperCase())&&x("Content-Type",o.contentType||"application/x-www-form-urlencoded"),o.headers)for(r in o.headers)x(r,o.headers[r]);if(C.setRequestHeader=x,C.onreadystatechange=function(){if(4==C.readyState){C.onreadystatechange=w,clearTimeout(N);var e,n=!1;if(C.status>=200&&C.status<300||304==C.status||0==C.status&&"file:"==j){if(f=f||b(o.mimeType||C.getResponseHeader("content-type")),"arraybuffer"==C.responseType||"blob"==C.responseType)e=C.response;else{e=C.responseText;try{"script"==f?(1,eval)(e):"xml"==f?e=C.responseXML:"json"==f&&(e=c.test(e)?null:t.parseJSON(e))}catch(i){n=i}if(n)return y(n,"parsererror",C,o,s)}v(e,C,o,s)}else y(C.statusText||null,C.status?"error":"abort",C,o,s)}},g(C,o)===!1)return C.abort(),y(null,"abort",C,o,s),C;if(o.xhrFields)for(r in o.xhrFields)C[r]=o.xhrFields[r];var P="async"in o?o.async:!0;C.open(o.type,o.url,P,o.username,o.password);for(r in m)S.apply(C,m[r]);return o.timeout>0&&(N=setTimeout(function(){C.onreadystatechange=w,C.abort(),y(null,"timeout",C,o,s)},o.timeout)),C.send(o.data?o.data:null),C},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var C=encodeURIComponent;t.param=function(e,n){var i=[];return i.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(C(e)+"="+C(n))},S(i,e,n),i.join("&").replace(/%20/g,"+")}}(Zepto),function(t){function s(o,s){var u=o[r],f=u&&e[u];if(void 0===s)return f||a(o);if(f){if(s in f)return f[s];var c=i(s);if(c in f)return f[c]}return n.call(t(o),s)}function a(n,o,s){var a=n[r]||(n[r]=++t.uuid),f=e[a]||(e[a]=u(n));return void 0!==o&&(f[i(o)]=s),f}function u(e){var n={};return t.each(e.attributes||o,function(e,r){0==r.name.indexOf("data-")&&(n[i(r.name.replace("data-",""))]=t.zepto.deserializeValue(r.value))}),n}var e={},n=t.fn.data,i=t.camelCase,r=t.expando="Zepto"+ +new Date,o=[];t.fn.data=function(e,n){return void 0===n?t.isPlainObject(e)?this.each(function(n,i){t.each(e,function(t,e){a(i,t,e)})}):0 in this?s(this[0],e):void 0:this.each(function(){a(this,e,n)})},t.fn.removeData=function(n){return"string"==typeof n&&(n=n.split(/\s+/)),this.each(function(){var o=this[r],s=o&&e[o];s&&t.each(n||s,function(t){delete s[n?i(this):t]})})},["remove","empty"].forEach(function(e){var n=t.fn[e];t.fn[e]=function(){var t=this.find("*");return"remove"===e&&(t=t.add(this)),t.removeData(),n.call(this)}})}(Zepto),function(t){t.fn.serializeArray=function(){var e,n,i=[],r=function(t){return t.forEach?t.forEach(r):void i.push({name:e,value:t})};return this[0]&&t.each(this[0].elements,function(i,o){n=o.type,e=o.name,e&&"fieldset"!=o.nodeName.toLowerCase()&&!o.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&"file"!=n&&("radio"!=n&&"checkbox"!=n||o.checked)&&r(t(o).val())}),i},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(0 in arguments)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t,e){function v(t){return t.replace(/([a-z])([A-Z])/,"$1-$2").toLowerCase()}function y(t){return i?i+t:t.toLowerCase()}var i,a,u,f,c,l,h,p,d,m,n="",r={Webkit:"webkit",Moz:"",O:"o"},o=document.createElement("div"),s=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,g={};t.each(r,function(t,r){return o.style[t+"TransitionProperty"]!==e?(n="-"+t.toLowerCase()+"-",i=r,!1):void 0}),a=n+"transform",g[u=n+"transition-property"]=g[f=n+"transition-duration"]=g[l=n+"transition-delay"]=g[c=n+"transition-timing-function"]=g[h=n+"animation-name"]=g[p=n+"animation-duration"]=g[m=n+"animation-delay"]=g[d=n+"animation-timing-function"]="",t.fx={off:i===e&&o.style.transitionProperty===e,speeds:{_default:400,fast:200,slow:600},cssPrefix:n,transitionEnd:y("TransitionEnd"),animationEnd:y("AnimationEnd")},t.fn.animate=function(n,i,r,o,s){return t.isFunction(i)&&(o=i,r=e,i=e),t.isFunction(r)&&(o=r,r=e),t.isPlainObject(i)&&(r=i.easing,o=i.complete,s=i.delay,i=i.duration),i&&(i=("number"==typeof i?i:t.fx.speeds[i]||t.fx.speeds._default)/1e3),s&&(s=parseFloat(s)/1e3),this.anim(n,i,r,o,s)},t.fn.anim=function(n,i,r,o,y){var x,b,j,w={},E="",T=this,C=t.fx.transitionEnd,S=!1;if(i===e&&(i=t.fx.speeds._default/1e3),y===e&&(y=0),t.fx.off&&(i=0),"string"==typeof n)w[h]=n,w[p]=i+"s",w[m]=y+"s",w[d]=r||"linear",C=t.fx.animationEnd;else{b=[];for(x in n)s.test(x)?E+=x+"("+n[x]+") ":(w[x]=n[x],b.push(v(x)));E&&(w[a]=E,b.push(a)),i>0&&"object"==typeof n&&(w[u]=b.join(", "),w[f]=i+"s",w[l]=y+"s",w[c]=r||"linear")}return j=function(e){if("undefined"!=typeof e){if(e.target!==e.currentTarget)return;t(e.target).unbind(C,j)}else t(this).unbind(C,j);S=!0,t(this).css(g),o&&o.call(this)},i>0&&(this.bind(C,j),setTimeout(function(){S||j.call(T)},1e3*(i+y)+25)),this.size()&&this.get(0).clientLeft,this.css(w),0>=i&&setTimeout(function(){T.each(function(){j.call(this)})},0),this},o=null}(Zepto),function(t,e){function a(n,i,r,o,s){"function"!=typeof i||s||(s=i,i=e);var a={opacity:r};return o&&(a.scale=o,n.css(t.fx.cssPrefix+"transform-origin","0 0")),n.animate(a,i,null,s)}function u(e,n,i,r){return a(e,n,0,i,function(){o.call(t(this)),r&&r.call(this)})}var n=window.document,r=(n.documentElement,t.fn.show),o=t.fn.hide,s=t.fn.toggle;t.fn.show=function(t,n){return r.call(this),t===e?t=0:this.css("opacity",0),a(this,t,1,"1,1",n)},t.fn.hide=function(t,n){return t===e?o.call(this):u(this,t,"0,0",n)},t.fn.toggle=function(n,i){return n===e||"boolean"==typeof n?s.call(this,n):this.each(function(){var e=t(this);e["none"==e.css("display")?"show":"hide"](n,i)})},t.fn.fadeTo=function(t,e,n){return a(this,t,e,null,n)},t.fn.fadeIn=function(t,e){var n=this.css("opacity");return n>0?this.css("opacity",0):n=1,r.call(this).fadeTo(t,n,e)},t.fn.fadeOut=function(t,e){return u(this,t,null,e)},t.fn.fadeToggle=function(e,n){return this.each(function(){var i=t(this);i[0==i.css("opacity")||"none"==i.css("display")?"fadeIn":"fadeOut"](e,n)})}}(Zepto),function(t){function r(e){return e=t(e),!(!e.width()&&!e.height())&&"none"!==e.css("display")}function f(t,e){t=t.replace(/=#\]/g,'="#"]');var n,i,r=s.exec(t);if(r&&r[2]in o&&(n=o[r[2]],i=r[3],t=r[1],i)){var a=Number(i);i=isNaN(a)?i.replace(/^["']|["']$/g,""):a}return e(t,n,i)}var e=t.zepto,n=e.qsa,i=e.matches,o=t.expr[":"]={visible:function(){return r(this)?this:void 0},hidden:function(){return r(this)?void 0:this},selected:function(){return this.selected?this:void 0},checked:function(){return this.checked?this:void 0},parent:function(){return this.parentNode},first:function(t){return 0===t?this:void 0},last:function(t,e){return t===e.length-1?this:void 0},eq:function(t,e,n){return t===n?this:void 0},contains:function(e,n,i){return t(this).text().indexOf(i)>-1?this:void 0},has:function(t,n,i){return e.qsa(this,i).length?this:void 0}},s=new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),a=/^\s*>/,u="Zepto"+ +new Date;e.qsa=function(i,r){return f(r,function(o,s,f){try{var c;!o&&s?o="*":a.test(o)&&(c=t(i).addClass(u),o="."+u+" "+o);var l=n(i,o)}catch(h){throw console.error("error performing selector: %o",r),h}finally{c&&c.removeClass(u)}return s?e.uniq(t.map(l,function(t,e){return s.call(t,e,l,f)})):l})},e.matches=function(t,e){return f(e,function(e,n,r){return(!e||i(t,e))&&(!n||n.call(t,null,r)===t)})}}(Zepto),function(t){function u(t,e,n,i){return Math.abs(t-e)>=Math.abs(n-i)?t-e>0?"Left":"Right":n-i>0?"Up":"Down"}function f(){o=null,e.last&&(e.el.trigger("longTap"),e={})}function c(){o&&clearTimeout(o),o=null}function l(){n&&clearTimeout(n),i&&clearTimeout(i),r&&clearTimeout(r),o&&clearTimeout(o),n=i=r=o=null,e={}}function h(t){return("touch"==t.pointerType||t.pointerType==t.MSPOINTER_TYPE_TOUCH)&&t.isPrimary}function p(t,e){return t.type=="pointer"+e||t.type.toLowerCase()=="mspointer"+e}var n,i,r,o,a,e={},s=750;t(document).ready(function(){var d,m,y,x,g=0,v=0;"MSGesture"in window&&(a=new MSGesture,a.target=document.body),t(document).bind("MSGestureEnd",function(t){var n=t.velocityX>1?"Right":t.velocityX<-1?"Left":t.velocityY>1?"Down":t.velocityY<-1?"Up":null;n&&(e.el.trigger("swipe"),e.el.trigger("swipe"+n))}).on("touchstart MSPointerDown pointerdown",function(i){(!(x=p(i,"down"))||h(i))&&(y=x?i:i.touches[0],i.touches&&1===i.touches.length&&e.x2&&(e.x2=void 0,e.y2=void 0),d=Date.now(),m=d-(e.last||d),e.el=t("tagName"in y.target?y.target:y.target.parentNode),n&&clearTimeout(n),e.x1=y.pageX,e.y1=y.pageY,m>0&&250>=m&&(e.isDoubleTap=!0),e.last=d,o=setTimeout(f,s),a&&x&&a.addPointer(i.pointerId))}).on("touchmove MSPointerMove pointermove",function(t){(!(x=p(t,"move"))||h(t))&&(y=x?t:t.touches[0],c(),e.x2=y.pageX,e.y2=y.pageY,g+=Math.abs(e.x1-e.x2),
	v+=Math.abs(e.y1-e.y2))}).on("touchend MSPointerUp pointerup",function(o){(!(x=p(o,"up"))||h(o))&&(c(),e.x2&&Math.abs(e.x1-e.x2)>30||e.y2&&Math.abs(e.y1-e.y2)>30?r=setTimeout(function(){e.el.trigger("swipe"),e.el.trigger("swipe"+u(e.x1,e.x2,e.y1,e.y2)),e={}},0):"last"in e&&(30>g&&30>v?i=setTimeout(function(){var i=t.Event("tap");i.cancelTouch=l,e.el.trigger(i),e.isDoubleTap?(e.el&&e.el.trigger("doubleTap"),e={}):n=setTimeout(function(){n=null,e.el&&e.el.trigger("singleTap"),e={}},250)},0):e={}),g=v=0)}).on("touchcancel MSPointerCancel pointercancel",l),t(window).on("scroll",l)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(e){t.fn[e]=function(t){return this.on(e,t)}})}(Zepto);
	module.exports=Zepto;

/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(20);
	__webpack_require__(21);

	/**
	 * @file 导航栏组件 － iScroll插件
	 * @name Navigator.iscroll
	 * @desc <qrcode align="right" title="Live Demo">../gmu/_examples/webapp/naivgator/navigator.html</qrcode>
	 * navigator iscroll插件，可滚动导航栏
	 * @import core/zepto.iscroll.js, widget/navigator.js
	 */

	(function ($, undefined) {
	    /**
	     * @name navigator
	     * @grammar navigator(options)  ⇒ self
	     * @grammar $.ui.navigator([el [,options]])  ⇒ instance
	     * @desc
	     * **Options**
	     * navigator iscroll插件在原来options基础上增加以下参数
	     * - ''disablePlugin''    {Boolean|String}:    (可选, 默认false)是否禁用插件，加载了该插件，若需要禁用，可直接设为true
	     * - ''isScrollToNext''   {Boolean}:           (必选, 默认true)是否启用点击可视范围内第一个或最后一个跳动
	     * - ''isShowShadow''     {Boolean}:           (可选, 默认true)是否启用阴影
	     * - ''iScrollOpts''      {Object}:            (可选)配置iScroll中的参数，其中scrollstart,scrollmove,scrollend做为单独事件在组件中派生，可直接绑相应事件
	     * - ''scrollstart''      {Function}:          (可选)滑动前触发的事件，对应iScroll中的onScrollStart
	     * - ''scrollmove''       {Function}:          (可选)滑动中触发的事件，对应iScroll中的onScrollMove
	     * - ''scrollend''        {Function}:          (可选)滑动后触发的事件，对应iScroll中的onScrollEnd
	     *
	     * **setup方式html规则**
	     * <code type="html">
	     * <div id="nav-smartSetup">
	     *     <a class="ui-navigator-fixleft" href="#test1">fixleft</a>       <!--固定元素，若没有，则不写，可写多个，左边加class="ui-navigator-fixleft"-->
	     *     <ul>                                              <!--中间非固定tab-->
	     *         <li><a href="#test1">首页</a></li>
	     *         <li><a href="javascript:;">电影</a></li>
	     *         <li><a class="cur" href="javascript:;">电视剧</a></li>
	     *     </ul>
	     *     <a class="ui-navigator-fixleft" href="#test1">fixleft</a>    <!--固定元素，若没有，则不写，可写多个，右边加class="ui-navigator-fixright"-->
	     * </div>
	     * </code>
	     * **full setup方式html规则**
	     * <code type="html">        <!--需将所有的class都写全-->
	     * <div id="nav-smartSetup">
	     *     <a class="ui-navigator-fixleft ui-navigator-fix" href="#test1">fixleft</a>       <!--固定元素，若没有，则不写，可写多个，左边加class="ui-navigator-fixleft"-->
	     *     <div class="ui-navigator-wrapper" style="overflow:hidden;">
	     *         <ul class="ui-navigator-list">                                             <!--中间非固定tab-->
	     *             <li><a href="#test1">首页</a></li>
	     *             <li><a href="javascript:;">电影</a></li>
	     *             <li><a class="cur" href="javascript:;">电视剧</a></li>
	     *         </ul>
	     *     </div>
	     *     <a class="ui-navigator-fixleft ui-navigator-fix" href="#test1">fixleft</a>    <!--固定元素，若没有，则不写，可写多个，右边加class="ui-navigator-fixright"-->
	     * </div>
	     * </code>
	     * **Demo**
	     * <codepreview href="../gmu/_examples/widget/navigator/navigator.html">
	     * ../gmu/_examples/widget/navigator/navigator.html
	     * ../gmu/_examples/widget/navigator/navigator_fix.html
	     * </codepreview>
	     */

	    $.ui.navigator.register(function () {
	        return {
	            pluginName: 'iscroll',
	            _init: function () {
	                return this._adjustHtml()._reBindEvent()._initOrg();
	            },
	            _reBindEvent: function () {
	                var me = this,
	                    data = me._data;

	                data.isScrollToNext = data.isScrollToNext === undefined ? true : data.isScrollToNext ;
	                data.isShowShadow = data.isShowShadow === undefined ? true : data.isShowShadow;
	                me._loadIscroll();
	                $(window).on('ortchange', $.proxy(me._ortChangeHandler, me));
	                me.on('destroy', function () {
	                    $(window).off('ortchange', me._ortChangeHandler);
	                    data.iScroll.destroy();
	                });
	                return me;
	            },
	            _adjustHtml: function () {
	                var me = this,
	                    data = me._data,
	                    $el = me.root().addClass('ui-navigator'),
	                    $navScroller = $el.find('ul'),
	                    $navWrapper = $el.find('.ui-navigator-wrapper'),
	                    $navList = $navScroller.find('li'),
	                    scrollerSumWidth = [0];

	                !$navWrapper.length && $navScroller.wrap('<div class="ui-navigator-wrapper"></div>');    //smart模式
	                $navScroller.find('li').each(function (index) {     //记录每个tab长度的累加和，为半个tab滑动用
	                    scrollerSumWidth[index] = index ? (scrollerSumWidth[index -1] + this.offsetWidth) :
	                        (scrollerSumWidth[index] + this.offsetLeft - $navScroller[0].offsetLeft + this.offsetWidth);
	                });
	                $.extend(data, {
	                    _$navWrapper: $el.find('.ui-navigator-wrapper'),
	                    _$navScroller: $navScroller.width(scrollerSumWidth[$navList.length - 1]),
	                    _$navList: $navList,
	                    _scrollerNum: $navList.length,
	                    _scrollerSumWidth: scrollerSumWidth,
	                    _$fixElemLeft: $el.find('.ui-navigator-fixleft'),
	                    _$fixElemRight: $el.find('.ui-navigator-fixright')
	                });

	                return me;
	            },
	            _loadIscroll:function () {
	                var me = this,
	                    data = me._data;

	                data.iScroll = iScroll(data._$navWrapper.get(0), data.iScrollOpts = $.extend({
	                    hScroll:true,
	                    vScroll:false,
	                    hScrollbar:false,
	                    vScrollbar:false
	                }, data.iScrollOpts, {
	                    onScrollStart:function (e) {
	                        me.trigger('scrollstart', e);
	                    },
	                    onScrollMove:function (e) {
	                        me.trigger('scrollmove', e);
	                    },
	                    onScrollEnd:function (e) {
	                        data.isShowShadow && me._setShadow();
	                        me.trigger('scrollend', e);
	                    }
	                }));
	                return me;
	            },
	            _setShadow:function () {
	                var me = this,
	                    data = me._data,
	                    $navWrapper = data._$navWrapper,
	                    shadowClass = {
	                        left: 'ui-navigator-shadowl',
	                        right: 'ui-navigator-shadowr',
	                        all: 'ui-navigator-shadowall'
	                    },
	                    iScroll = data.iScroll,
	                    movedX = iScroll.x;

	                if (movedX < 0) {
	                    $navWrapper.removeClass(shadowClass['left'] + ' ' + shadowClass['right']).addClass(shadowClass['all']);     //开始滑动时
	                    if (movedX <= iScroll.maxScrollX) {       //向右滑动到最大
	                        $navWrapper.removeClass(shadowClass['all'] + ' ' + shadowClass['right']).addClass(shadowClass['left']);
	                    }
	                } else {      //向左滑动到最大
	                    $navWrapper.removeClass(shadowClass['all'] + ' ' + shadowClass['left']);
	                    //转屏后是否可滑动
	                    iScroll.hScroll ? $navWrapper.addClass(shadowClass['right']) : $navWrapper.removeClass(shadowClass['all'] + ' ' + shadowClass['left'] + ' ' +shadowClass['right']);
	                }

	                return me;
	            },
	            _scrollToNext: function (index, pos) {
	                var me = this,
	                    data = me._data,
	                    scrollerSumWidth = data._scrollerSumWidth,
	                    iScroll = data.iScroll;      //iscroll滚动的时间

	                iScroll.scrollTo(pos == 'last' ? iScroll.wrapperW - (scrollerSumWidth[index + 1] || scrollerSumWidth[scrollerSumWidth.length - 1]) : pos == 'first' ? (-scrollerSumWidth[index - 2] || 0) : iScroll.x, 0, 400);
	                return me;
	            },
	            _getPos:function (index) {
	                var me = this,
	                    data = me._data,
	                    iScroll = data.iScroll,
	                    movedXDis = Math.abs(iScroll.x) || 0,
	                    scrollerSumWidth = data._scrollerSumWidth,
	                    $navList = data._$navList,
	                    thisOffsetDis = scrollerSumWidth[index] - movedXDis,
	                    preOffsetDis = scrollerSumWidth[(index - 1) || 0]  - movedXDis,
	                    nextOffsetDis = (scrollerSumWidth[index + 1] || scrollerSumWidth[scrollerSumWidth.length - 1]) - movedXDis,
	                    wrapperWidth = iScroll.wrapperW;

	                return (thisOffsetDis >= wrapperWidth || nextOffsetDis > wrapperWidth) ?   //当前tab为半个tab或者其下一个tab为半个，则视为可显示区的最后一个
	                    'last' : (thisOffsetDis <= $navList[index].offsetWidth || preOffsetDis < $navList[index - 1].offsetWidth) ?  //当前tab为半个或者其前面的tab是半个，则视为可显示区的第一个
	                    'first' : 'middle';
	            },
	            _ortChangeHandler:function () {
	                var me = this,
	                    data = me._data,
	                    iScroll = data.iScroll;

	                iScroll.refresh();
	                me._setShadow();    //增加阴影的转屏处理 traceid:FEBASE-663
	                data._$navWrapper.width(iScroll.wrapperW - iScroll.wrapperOffsetLeft);
	            },
	            switchTo: function (index, isDef, e) {
	                var me = this,
	                    data = me._data;

	                me.switchToOrg(index, isDef, e);
	                if (!data._$tabList.eq(index).hasClass('ui-navigator-fix')) {
	                    var $fixElemLeft = data._$fixElemLeft,
	                        index = index - ($fixElemLeft.length ? $fixElemLeft.length : 0),    //若存在左fix的元素，则滑动的tab的index需相应减去fix tab数量
	                        pos = me._getPos(index);

	                    isDef && data.isShowShadow && me._setShadow();      //默认defTab设置阴影
	                    data.isScrollToNext && me._scrollToNext(index, pos);
	                }
	                return me;
	            }
	        }
	    });
	})(Zepto);


/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * iScroll v4.2.2 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
	 * Released under MIT license, http://cubiq.org/license
	 */
	(function(window, doc){
	    var m = Math,_bindArr = [],
	        dummyStyle = doc.createElement('div').style,
	        vendor = (function () {
	            var vendors = 'webkitT,MozT,msT,OT,t'.split(','),
	                t,
	                i = 0,
	                l = vendors.length;

	            for ( ; i < l; i++ ) {
	                t = vendors[i] + 'ransform';
	                if ( t in dummyStyle ) {
	                    return vendors[i].substr(0, vendors[i].length - 1);
	                }
	            }

	            return false;
	        })(),
	        cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '',


	    // Style properties
	        transform = prefixStyle('transform'),
	        transitionProperty = prefixStyle('transitionProperty'),
	        transitionDuration = prefixStyle('transitionDuration'),
	        transformOrigin = prefixStyle('transformOrigin'),
	        transitionTimingFunction = prefixStyle('transitionTimingFunction'),
	        transitionDelay = prefixStyle('transitionDelay'),

	    // Browser capabilities
	        isAndroid = (/android/gi).test(navigator.appVersion),
	        isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),

	        has3d = prefixStyle('perspective') in dummyStyle,
	        hasTouch = 'ontouchstart' in window && !isTouchPad,
	        hasTransform = !!vendor,
	        hasTransitionEnd = prefixStyle('transition') in dummyStyle,

	        RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
	        START_EV = hasTouch ? 'touchstart' : 'mousedown',
	        MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
	        END_EV = hasTouch ? 'touchend' : 'mouseup',
	        CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
	        TRNEND_EV = (function () {
	            if ( vendor === false ) return false;

	            var transitionEnd = {
	                ''			: 'transitionend',
	                'webkit'	: 'webkitTransitionEnd',
	                'Moz'		: 'transitionend',
	                'O'			: 'otransitionend',
	                'ms'		: 'MSTransitionEnd'
	            };

	            return transitionEnd[vendor];
	        })(),

	        nextFrame = (function() {
	            return window.requestAnimationFrame ||
	                window.webkitRequestAnimationFrame ||
	                window.mozRequestAnimationFrame ||
	                window.oRequestAnimationFrame ||
	                window.msRequestAnimationFrame ||
	                function(callback) { return setTimeout(callback, 1); };
	        })(),
	        cancelFrame = (function () {
	            return window.cancelRequestAnimationFrame ||
	                window.webkitCancelAnimationFrame ||
	                window.webkitCancelRequestAnimationFrame ||
	                window.mozCancelRequestAnimationFrame ||
	                window.oCancelRequestAnimationFrame ||
	                window.msCancelRequestAnimationFrame ||
	                clearTimeout;
	        })(),

	    // Helpers
	        translateZ = has3d ? ' translateZ(0)' : '',

	    // Constructor
	        iScroll = function (el, options) {
	            var that = this,
	                i;

	            that.wrapper = typeof el == 'object' ? el : doc.getElementById(el);
	            that.wrapper.style.overflow = 'hidden';
	            that.scroller = that.wrapper.children[0];

	            that.translateZ = translateZ;
	            // Default options
	            that.options = {
	                hScroll: true,
	                vScroll: true,
	                x: 0,
	                y: 0,
	                bounce: true,
	                bounceLock: false,
	                momentum: true,
	                lockDirection: true,
	                useTransform: true,
	                useTransition: false,
	                topOffset: 0,
	                checkDOMChanges: false,		// Experimental
	                handleClick: true,


	                // Events
	                onRefresh: null,
	                onBeforeScrollStart: function (e) { e.preventDefault(); },
	                onScrollStart: null,
	                onBeforeScrollMove: null,
	                onScrollMove: null,
	                onBeforeScrollEnd: null,
	                onScrollEnd: null,
	                onTouchEnd: null,
	                onDestroy: null

	            };

	            // User defined options
	            for (i in options) that.options[i] = options[i];

	            // Set starting position
	            that.x = that.options.x;
	            that.y = that.options.y;

	            // Normalize options
	            that.options.useTransform = hasTransform && that.options.useTransform;

	            that.options.useTransition = hasTransitionEnd && that.options.useTransition;



	            // Set some default styles
	            that.scroller.style[transitionProperty] = that.options.useTransform ? cssVendor + 'transform' : 'top left';
	            that.scroller.style[transitionDuration] = '0';
	            that.scroller.style[transformOrigin] = '0 0';
	            if (that.options.useTransition) that.scroller.style[transitionTimingFunction] = 'cubic-bezier(0.33,0.66,0.66,1)';

	            if (that.options.useTransform) that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px)' + translateZ;
	            else that.scroller.style.cssText += ';position:absolute;top:' + that.y + 'px;left:' + that.x + 'px';



	            that.refresh();

	            that._bind(RESIZE_EV, window);
	            that._bind(START_EV);


	            if (that.options.checkDOMChanges) that.checkDOMTime = setInterval(function () {
	                that._checkDOMChanges();
	            }, 500);
	        };

	// Prototype
	    iScroll.prototype = {
	        enabled: true,
	        x: 0,
	        y: 0,
	        steps: [],
	        scale: 1,
	        currPageX: 0, currPageY: 0,
	        pagesX: [], pagesY: [],
	        aniTime: null,
	        isStopScrollAction:false,

	        handleEvent: function (e) {
	            var that = this;
	            switch(e.type) {
	                case START_EV:
	                    if (!hasTouch && e.button !== 0) return;
	                    that._start(e);
	                    break;
	                case MOVE_EV: that._move(e); break;
	                case END_EV:
	                case CANCEL_EV: that._end(e); break;
	                case RESIZE_EV: that._resize(); break;
	                case TRNEND_EV: that._transitionEnd(e); break;
	            }
	        },

	        _checkDOMChanges: function () {
	            if (this.moved ||  this.animating ||
	                (this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) return;

	            this.refresh();
	        },

	        _resize: function () {
	            var that = this;
	            setTimeout(function () { that.refresh(); }, isAndroid ? 200 : 0);
	        },

	        _pos: function (x, y) {
	            x = this.hScroll ? x : 0;
	            y = this.vScroll ? y : 0;

	            if (this.options.useTransform) {
	                this.scroller.style[transform] = 'translate(' + x + 'px,' + y + 'px) scale(' + this.scale + ')' + translateZ;
	            } else {
	                x = m.round(x);
	                y = m.round(y);
	                this.scroller.style.left = x + 'px';
	                this.scroller.style.top = y + 'px';
	            }

	            this.x = x;
	            this.y = y;

	        },



	        _start: function (e) {
	            var that = this,
	                point = hasTouch ? e.touches[0] : e,
	                matrix, x, y,
	                c1, c2;

	            if (!that.enabled) return;

	            if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);

	            if (that.options.useTransition ) that._transitionTime(0);

	            that.moved = false;
	            that.animating = false;

	            that.distX = 0;
	            that.distY = 0;
	            that.absDistX = 0;
	            that.absDistY = 0;
	            that.dirX = 0;
	            that.dirY = 0;
	            that.isStopScrollAction = false;

	            if (that.options.momentum) {
	                if (that.options.useTransform) {
	                    // Very lame general purpose alternative to CSSMatrix
	                    matrix = getComputedStyle(that.scroller, null)[transform].replace(/[^0-9\-.,]/g, '').split(',');
	                    x = +matrix[4];
	                    y = +matrix[5];
	                } else {
	                    x = +getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '');
	                    y = +getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '');
	                }

	                if (x != that.x || y != that.y) {
	                    that.isStopScrollAction = true;
	                    if (that.options.useTransition) that._unbind(TRNEND_EV);
	                    else cancelFrame(that.aniTime);
	                    that.steps = [];
	                    that._pos(x, y);
	                    if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);
	                }
	            }



	            that.startX = that.x;
	            that.startY = that.y;
	            that.pointX = point.pageX;
	            that.pointY = point.pageY;

	            that.startTime = e.timeStamp || Date.now();

	            if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);

	            that._bind(MOVE_EV, window);
	            that._bind(END_EV, window);
	            that._bind(CANCEL_EV, window);
	        },

	        _move: function (e) {
	            var that = this,
	                point = hasTouch ? e.touches[0] : e,
	                deltaX = point.pageX - that.pointX,
	                deltaY = point.pageY - that.pointY,
	                newX = that.x + deltaX,
	                newY = that.y + deltaY,

	                timestamp = e.timeStamp || Date.now();

	            if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);

	            that.pointX = point.pageX;
	            that.pointY = point.pageY;

	            // Slow down if outside of the boundaries
	            if (newX > 0 || newX < that.maxScrollX) {
	                newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
	            }
	            if (newY > that.minScrollY || newY < that.maxScrollY) {
	                newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= that.minScrollY || that.maxScrollY >= 0 ? that.minScrollY : that.maxScrollY;
	            }

	            that.distX += deltaX;
	            that.distY += deltaY;
	            that.absDistX = m.abs(that.distX);
	            that.absDistY = m.abs(that.distY);

	            if (that.absDistX < 6 && that.absDistY < 6) {
	                return;
	            }

	            // Lock direction
	            if (that.options.lockDirection) {
	                if (that.absDistX > that.absDistY + 5) {
	                    newY = that.y;
	                    deltaY = 0;
	                } else if (that.absDistY > that.absDistX + 5) {
	                    newX = that.x;
	                    deltaX = 0;
	                }
	            }

	            that.moved = true;

	            // internal for header scroll

	            that._beforePos ? that._beforePos(newY, deltaY) && that._pos(newX, newY) : that._pos(newX, newY);

	            that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
	            that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

	            if (timestamp - that.startTime > 300) {
	                that.startTime = timestamp;
	                that.startX = that.x;
	                that.startY = that.y;
	            }

	            if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
	        },

	        _end: function (e) {
	            if (hasTouch && e.touches.length !== 0) return;

	            var that = this,
	                point = hasTouch ? e.changedTouches[0] : e,
	                target, ev,
	                momentumX = { dist:0, time:0 },
	                momentumY = { dist:0, time:0 },
	                duration = (e.timeStamp || Date.now()) - that.startTime,
	                newPosX = that.x,
	                newPosY = that.y,
	                newDuration;


	            that._unbind(MOVE_EV, window);
	            that._unbind(END_EV, window);
	            that._unbind(CANCEL_EV, window);

	            if (that.options.onBeforeScrollEnd) that.options.onBeforeScrollEnd.call(that, e);


	            if (!that.moved) {

	                if (hasTouch && this.options.handleClick && !that.isStopScrollAction) {
	                    that.doubleTapTimer = setTimeout(function () {
	                        that.doubleTapTimer = null;

	                        // Find the last touched element
	                        target = point.target;
	                        while (target.nodeType != 1) target = target.parentNode;

	                        if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
	                            ev = doc.createEvent('MouseEvents');
	                            ev.initMouseEvent('click', true, true, e.view, 1,
	                                point.screenX, point.screenY, point.clientX, point.clientY,
	                                e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
	                                0, null);
	                            ev._fake = true;
	                            target.dispatchEvent(ev);
	                        }
	                    },  0);
	                }


	                that._resetPos(400);

	                if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
	                return;
	            }

	            if (duration < 300 && that.options.momentum) {
	                momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
	                momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y - that.minScrollY : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;

	                newPosX = that.x + momentumX.dist;
	                newPosY = that.y + momentumY.dist;

	                if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = { dist:0, time:0 };
	                if ((that.y > that.minScrollY && newPosY > that.minScrollY) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = { dist:0, time:0 };
	            }

	            if (momentumX.dist || momentumY.dist) {
	                newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);



	                that.scrollTo(m.round(newPosX), m.round(newPosY), newDuration);

	                if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
	                return;
	            }



	            that._resetPos(200);
	            if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
	        },

	        _resetPos: function (time) {
	            var that = this,
	                resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x,
	                resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;

	            if (resetX == that.x && resetY == that.y) {
	                if (that.moved) {
	                    that.moved = false;
	                    if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);		// Execute custom code on scroll end
	                    if (that._afterPos) that._afterPos();
	                }

	                return;
	            }

	            that.scrollTo(resetX, resetY, time || 0);
	        },



	        _transitionEnd: function (e) {
	            var that = this;

	            if (e.target != that.scroller) return;

	            that._unbind(TRNEND_EV);

	            that._startAni();
	        },


	        /**
	         *
	         * Utilities
	         *
	         */
	        _startAni: function () {
	            var that = this,
	                startX = that.x, startY = that.y,
	                startTime = Date.now(),
	                step, easeOut,
	                animate;

	            if (that.animating) return;

	            if (!that.steps.length) {
	                that._resetPos(400);
	                return;
	            }

	            step = that.steps.shift();

	            if (step.x == startX && step.y == startY) step.time = 0;

	            that.animating = true;
	            that.moved = true;

	            if (that.options.useTransition) {
	                that._transitionTime(step.time);
	                that._pos(step.x, step.y);
	                that.animating = false;
	                if (step.time) that._bind(TRNEND_EV);
	                else that._resetPos(0);
	                return;
	            }

	            animate = function () {
	                var now = Date.now(),
	                    newX, newY;

	                if (now >= startTime + step.time) {
	                    that._pos(step.x, step.y);
	                    that.animating = false;
	                    if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that);			// Execute custom code on animation end
	                    that._startAni();
	                    return;
	                }

	                now = (now - startTime) / step.time - 1;
	                easeOut = m.sqrt(1 - now * now);
	                newX = (step.x - startX) * easeOut + startX;
	                newY = (step.y - startY) * easeOut + startY;
	                that._pos(newX, newY);
	                if (that.animating) that.aniTime = nextFrame(animate);
	            };

	            animate();
	        },

	        _transitionTime: function (time) {
	            time += 'ms';
	            this.scroller.style[transitionDuration] = time;

	        },

	        _momentum: function (dist, time, maxDistUpper, maxDistLower, size) {
	            var deceleration = 0.0006,
	                speed = m.abs(dist) * (this.options.speedScale||1) / time,
	                newDist = (speed * speed) / (2 * deceleration),
	                newTime = 0, outsideDist = 0;

	            // Proportinally reduce speed if we are outside of the boundaries
	            if (dist > 0 && newDist > maxDistUpper) {
	                outsideDist = size / (6 / (newDist / speed * deceleration));
	                maxDistUpper = maxDistUpper + outsideDist;
	                speed = speed * maxDistUpper / newDist;
	                newDist = maxDistUpper;
	            } else if (dist < 0 && newDist > maxDistLower) {
	                outsideDist = size / (6 / (newDist / speed * deceleration));
	                maxDistLower = maxDistLower + outsideDist;
	                speed = speed * maxDistLower / newDist;
	                newDist = maxDistLower;
	            }

	            newDist = newDist * (dist < 0 ? -1 : 1);
	            newTime = speed / deceleration;

	            return { dist: newDist, time: m.round(newTime) };
	        },

	        _offset: function (el) {
	            var left = -el.offsetLeft,
	                top = -el.offsetTop;

	            while (el = el.offsetParent) {
	                left -= el.offsetLeft;
	                top -= el.offsetTop;
	            }

	            if (el != this.wrapper) {
	                left *= this.scale;
	                top *= this.scale;
	            }

	            return { left: left, top: top };
	        },



	        _bind: function (type, el, bubble) {
	            _bindArr.concat([el || this.scroller, type, this]);
	            (el || this.scroller).addEventListener(type, this, !!bubble);
	        },

	        _unbind: function (type, el, bubble) {
	            (el || this.scroller).removeEventListener(type, this, !!bubble);
	        },


	        /**
	         *
	         * Public methods
	         *
	         */
	        destroy: function () {
	            var that = this;

	            that.scroller.style[transform] = '';



	            // Remove the event listeners
	            that._unbind(RESIZE_EV, window);
	            that._unbind(START_EV);
	            that._unbind(MOVE_EV, window);
	            that._unbind(END_EV, window);
	            that._unbind(CANCEL_EV, window);



	            if (that.options.useTransition) that._unbind(TRNEND_EV);

	            if (that.options.checkDOMChanges) clearInterval(that.checkDOMTime);

	            if (that.options.onDestroy) that.options.onDestroy.call(that);

	            //清除所有绑定的事件
	            for (var i = 0, l = _bindArr.length; i < l;) {
	                _bindArr[i].removeEventListener(_bindArr[i + 1], _bindArr[i + 2]);
	                _bindArr[i] = null;
	                i = i + 3
	            }
	            _bindArr = [];

	            //干掉外边的容器内容
	            var div = doc.createElement('div');
	            div.appendChild(this.wrapper);
	            div.innerHTML = '';
	            that.wrapper = that.scroller = div = null;
	        },

	        refresh: function () {
	            var that = this,
	                offset;



	            that.wrapperW = that.wrapper.clientWidth || 1;
	            that.wrapperH = that.wrapper.clientHeight || 1;

	            that.minScrollY = -that.options.topOffset || 0;
	            that.scrollerW = m.round(that.scroller.offsetWidth * that.scale);
	            that.scrollerH = m.round((that.scroller.offsetHeight + that.minScrollY) * that.scale);
	            that.maxScrollX = that.wrapperW - that.scrollerW;
	            that.maxScrollY = that.wrapperH - that.scrollerH + that.minScrollY;
	            that.dirX = 0;
	            that.dirY = 0;

	            if (that.options.onRefresh) that.options.onRefresh.call(that);

	            that.hScroll = that.options.hScroll && that.maxScrollX < 0;
	            that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);


	            offset = that._offset(that.wrapper);
	            that.wrapperOffsetLeft = -offset.left;
	            that.wrapperOffsetTop = -offset.top;


	            that.scroller.style[transitionDuration] = '0';
	            that._resetPos(400);
	        },

	        scrollTo: function (x, y, time, relative) {
	            var that = this,
	                step = x,
	                i, l;

	            that.stop();

	            if (!step.length) step = [{ x: x, y: y, time: time, relative: relative }];

	            for (i=0, l=step.length; i<l; i++) {
	                if (step[i].relative) { step[i].x = that.x - step[i].x; step[i].y = that.y - step[i].y; }
	                that.steps.push({ x: step[i].x, y: step[i].y, time: step[i].time || 0 });
	            }

	            that._startAni();
	        },

	        scrollToElement: function (el, time) {
	            var that = this, pos;
	            el = el.nodeType ? el : that.scroller.querySelector(el);
	            if (!el) return;

	            pos = that._offset(el);
	            pos.left += that.wrapperOffsetLeft;
	            pos.top += that.wrapperOffsetTop;

	            pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
	            pos.top = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
	            time = time === undefined ? m.max(m.abs(pos.left)*2, m.abs(pos.top)*2) : time;

	            that.scrollTo(pos.left, pos.top, time);
	        },

	        scrollToPage: function (pageX, pageY, time) {
	            var that = this, x, y;

	            time = time === undefined ? 400 : time;

	            if (that.options.onScrollStart) that.options.onScrollStart.call(that);


	            x = -that.wrapperW * pageX;
	            y = -that.wrapperH * pageY;
	            if (x < that.maxScrollX) x = that.maxScrollX;
	            if (y < that.maxScrollY) y = that.maxScrollY;


	            that.scrollTo(x, y, time);
	        },

	        disable: function () {
	            this.stop();
	            this._resetPos(0);
	            this.enabled = false;

	            // If disabled after touchstart we make sure that there are no left over events
	            this._unbind(MOVE_EV, window);
	            this._unbind(END_EV, window);
	            this._unbind(CANCEL_EV, window);
	        },

	        enable: function () {
	            this.enabled = true;
	        },

	        stop: function () {
	            if (this.options.useTransition) this._unbind(TRNEND_EV);
	            else cancelFrame(this.aniTime);
	            this.steps = [];
	            this.moved = false;
	            this.animating = false;
	        },

	        isReady: function () {
	            return !this.moved &&  !this.animating;
	        }
	    };

	    function prefixStyle (style) {
	        if ( vendor === '' ) return style;

	        style = style.charAt(0).toUpperCase() + style.substr(1);
	        return vendor + style;
	    }

	    dummyStyle = null;	// for the sake of it

	    if (true) exports.iScroll = iScroll;
	    else window.iScroll = iScroll;

	    (function($){
	        if(!$)return;
	        var orgiScroll = iScroll,
	            id = 0,
	            cacheInstance = {};
	        function createInstance(el,options){
	            var uqid = 'iscroll' + id++;
	            el.data('_iscroll_',uqid);
	            return cacheInstance[uqid] = new orgiScroll(el[0],options)
	        }
	        window.iScroll = function(el,options){
	            return createInstance($(typeof el == 'string' ? '#' + el : el),options)
	        };
	        $.fn.iScroll = function(method){
	            var resultArr = [];
	            this.each(function(i,el){
	                if(typeof method == 'string'){
	                    var instance = cacheInstance[$(el).data('_iscroll_')],pro;
	                    if(instance && (pro = instance[method])){
	                        var result = $.isFunction(pro) ? pro.apply(instance, Array.prototype.slice.call(arguments,1)) : pro;
	                        if(result !== instance && result !== undefined){
	                            resultArr.push(result);
	                        }
	                    }
	                }else{
	                    if(!$(el).data('_iscroll_'))
	                        createInstance($(el),method)
	                }
	            });

	            return resultArr.length ? resultArr : this;
	        }
	    })(window.Zepto || null)



	})(window, document);
	/**
	 * Change list
	 * 修改记录
	 *
	 * 1. 2012-08-14 解决滑动中按住停止滚动，松开后被点元素触发点击事件。
	 *
	 * 具体修改:
	 * a. 202行 添加isStopScrollAction: false 给iScroll的原型上添加变量
	 * b. 365行 _start方法里面添加that.isStopScrollAction = false; 默认让这个值为false
	 * c. 390行 if (x != that.x || y != that.y)条件语句里面 添加了  that.isStopScrollAction = true; 当目标值与实际值不一致，说明还在滚动动画中
	 * d. 554行 that.isStopScrollAction || (that.doubleTapTimer = setTimeout(function () {
	 *          ......
	 *          ......
	 *          }, that.options.zoom ? 250 : 0));
	 *   如果isStopScrollAction为true就不派送click事件
	 *
	 *
	 * 2. 2012-08-14 给options里面添加speedScale属性，提供外部控制冲量滚动速度
	 *
	 * 具体修改
	 * a. 108行 添加speedScale: 1, 给options里面添加speedScale属性，默认为1
	 * b. 798行 speed = m.abs(dist) * this.options.speedScale / time, 在原来速度的基础上*speedScale来改变速度
	 *
	 * 3. 2012-08-21 修改部分代码，给iscroll_plugin墙用的
	 *
	 * 具体修改
	 * a. 517行  在_pos之前，调用_beforePos,如果里面不返回true,  将不会调用_pos
	 *  // internal for header scroll
	 *  if (that._beforePos)
	 *      that._beforePos(newY, deltaY) && that._pos(newX, newY);
	 *  else
	 *      that._pos(newX, newY);
	 *
	 * b. 680行 在滚动结束后调用 _afterPos.
	 * // internal for header scroll
	 * if (that._afterPos) that._afterPos();
	 *
	 * c. 106行构造器里面添加以下代码
	 * // add var to this for header scroll
	 * that.translateZ = translateZ;
	 *
	 * 为处理溢出
	 * _bind 方法
	 * destroy 方法
	 * 最开头的 _bindArr = []
	 *
	 */
	/**
	 * @file GMU定制版iscroll，基于[iScroll 4.2.2](http://cubiq.org/iscroll-4), 去除zoom, pc兼容，snap, scrollbar等功能。同时把iscroll扩展到了Zepto的原型中。
	 * @name zepto.iScroll
	 * @import core/zepto.js
	 * @desc GMU定制版iscroll，基于{@link[http://cubiq.org/iscroll-4] iScroll 4.2.2}, 去除zoom, pc兼容，snap, scrollbar等功能。同时把iscroll扩展到了***Zepto***的原型中。
	 */

	/**
	 * @name iScroll
	 * @grammar new iScroll(el,[options])  ⇒ self
	 * @grammar $('selecotr').iScroll([options])  ⇒ zepto实例
	 * @desc 将iScroll加入到了***$.fn***中，方便用Zepto的方式调用iScroll。
	 * **el**
	 * - ***el {String/ElementNode}*** iscroll容器节点
	 *
	 * **Options**
	 * - ***hScroll*** {Boolean}: (可选, 默认: true)横向是否可以滚动
	 * - ***vScroll*** {Boolean}: (可选, 默认: true)竖向是否可以滚动
	 * - ***momentum*** {Boolean}: (可选, 默认: true)是否带有滚动效果
	 * - ***checkDOMChanges*** {Boolean, 默认: false}: (可选)每个500毫秒判断一下滚动区域的容器是否有新追加的内容，如果有就调用refresh重新渲染一次
	 * - ***useTransition*** {Boolean, 默认: false}: (可选)是否使用css3来来实现动画，默认是false,建议开启
	 * - ***topOffset*** {Number}: (可选, 默认: 0)可滚动区域头部缩紧多少高度，默认是0， ***主要用于头部下拉加载更多时，收起头部的提示按钮***
	 * @example
	 * $('div').iscroll().find('selector').atrr({'name':'aaa'}) //保持链式调用
	 * $('div').iScroll('refresh');//调用iScroll的方法
	 * $('div').iScroll('scrollTo', 0, 0, 200);//调用iScroll的方法, 200ms内滚动到顶部
	 */


	/**
	 * @name destroy
	 * @desc 销毁iScroll实例，在原iScroll的destroy的基础上对创建的dom元素进行了销毁
	 * @grammar destroy()  ⇒ undefined
	 */

	/**
	 * @name refresh
	 * @desc 更新iScroll实例，在滚动的内容增减时，或者可滚动区域发生变化时需要调用***refresh***方法来纠正。
	 * @grammar refresh()  ⇒ undefined
	 */

	/**
	 * @name scrollTo
	 * @desc 使iScroll实例，在指定时间内滚动到指定的位置， 如果relative为true, 说明x, y的值是相对与当前位置的。
	 * @grammar scrollTo(x, y, time, relative)  ⇒ undefined
	 */
	/**
	 * @name scrollToElement
	 * @desc 滚动到指定内部元素
	 * @grammar scrollToElement(element, time)  ⇒ undefined
	 * @grammar scrollToElement(selector, time)  ⇒ undefined
	 */
	/**
	 * @name scrollToPage
	 * @desc 跟scrollTo很像，这里传入的是百分比。
	 * @grammar scrollToPage(pageX, pageY, time)  ⇒ undefined
	 */
	/**
	 * @name disable
	 * @desc 禁用iScroll
	 * @grammar disable()  ⇒ undefined
	 */
	/**
	 * @name enable
	 * @desc 启用iScroll
	 * @grammar enable()  ⇒ undefined
	 */
	/**
	 * @name stop
	 * @desc 定制iscroll滚动
	 * @grammar stop()  ⇒ undefined
	 */



/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(22);

	/**
	 * @file 导航栏组件
	 * @name Navigator
	 * @desc <qrcode align="right" title="Live Demo">../gmu/_examples/widget/navigator/tab.html</qrcode>
	 * 导航栏组件
	 * @import core/zepto.ui.js
	 */

	(function ($, undefined) {
	    /**
	     * @name navigator
	     * @grammar navigator(options)  ⇒ self
	     * @grammar $.ui.navigator([el [,options]])  ⇒ self
	     * @desc
	     * **Options**
	     * - ''container''       {Selector|Zepto}:    (可选)父容器，渲染的元素，默认值：document.body
	     * - ''content''         {Array}:             (必选)导航tab项的内容，支持fix的元素(设置pos)及自定义属性(设置attr){text:\'\',url:\'\',pos:\'\',attr:{a:\'\',b:\'\'}}
	     * - ''defTab''          {Number}:            (可选, 默认:0)默认选中的导航tab项的索引，若为默认选中固定tab，则索引值在原来tabs.length上加1，默认值：0
	     * - ''beforetabselect'' {Function}:          (可选)tab选中前的事件，可阻止tab选中
	     * - ''tabselect''       {Function}:          (可选)tab选中时的事件
	     *
	     * **setup方式html规则**
	     * <code type="html">
	     * <div>
	     *     <ul>
	     *         <li><a href="#test1">首页</a></li>
	     *         <li><a href="javascript:;">电影</a></li>
	     *         <li><a class="cur" href="javascript:;">电视剧</a></li>
	     *     </ul>
	     * </div>
	     * </code>
	     * **full setup方式html规则**
	     * <code type="html">
	     * <div class="ui-navigator">     <!--需将所有的class都写全，在网速较慢时先展示-->
	     *     <ul class="ui-navigator-list">
	     *         <li><a href="#test1">首页</a></li>
	     *         <li><a href="javascript:;">电影</a></li>
	     *         <li><a class="cur" href="javascript:;">电视剧</a></li>
	     *     </ul>
	     * </div>
	     * </code>
	     * **Demo**
	     * <codepreview href="../gmu/_examples/widget/navigator/tab.html">
	     * ../gmu/_examples/widget/navigator/tab.html
	     * </codepreview>
	     */
	    var tmpl = '<% for (var i=0, len=left.length; i<len; i++) { %>'
	            + '<a href="<%=left[i].url%>" class="ui-navigator-fix ui-navigator-fixleft"><%=left[i].text%></a>'
	            + '<% } %>'
	            + '<ul class="ui-navigator-list">'
	            + '<% for (var i=0, len=mid.length; i<len; i++) { %>'
	            + '<li><a href="<%=mid[i].url%>"><%=mid[i].text%></a></li>'
	            + '<% } %></ul>'
	            + '<% for (var i=0, len=right.length; i<len; i++) { %>'
	            + '<a href="<%=right[i].url%>" class="ui-navigator-fix ui-navigator-fixright"><%=right[i].text%></a>'
	            + '<% } %>';

	    $.ui.define("navigator", {
	        _data: {
	            container: "",
	            content: [],
	            defTab: 0,
	            beforetabselect: null,
	            tabselect: null
	        },
	        _create: function () {
	            var me = this,
	                data = me._data,
	                $el = me.root(),
	                container = $(data.container || document.body).get(0),
	                tabObj = {left: [],mid: [],right: []},html;

	            $.each(data.content, function () {      //组合数据
	                tabObj[this.pos ? this.pos : 'mid'].push(this);
	            });

	            html = $.parseTpl(tmpl, tabObj)       //解析数据模板
	            if ($el) {
	                $el.append(html);
	                (!$el.parent().length || container !== document.body) && $el.appendTo(container);
	            } else {
	                me.root($("<div></div>").append(html)).appendTo(container);
	            }
	        },
	        _setup: function (fullMode) {
	            var me = this,
	                data = me._data,
	                defTab = data.defTab,
	                $el = me.root();
	            if (!fullMode) {
	                $el.children('a').addClass('ui-navigator-fix');     //smart模式针对内容添加样式
	                $el.children('ul').addClass('ui-navigator-list');
	            }
	            $el.find('a').each(function (i) {
	                defTab === 0 ? $(this).hasClass('cur') && (data.defTab = i) : $(this).removeClass('cur');    //处理同时defTab和写cur class的情况
	            });
	        },
	        _init: function () {
	            var me = this,
	                data = me._data,
	                $el = me.root(),
	                content = data.content,
	                $tabList = $el.find('a');    //包括fix的tab和可滑动的tab

	            $tabList.each(function (i) {
	                this.index = i;
	                content.length && content[i].attr && $(this).attr(content[i].attr);     //添加自己定义属性
	            });
	            data._$tabList = $tabList;
	            data._lastIndex = -1;

	            $el.addClass('ui-navigator').on('click', $.proxy(me._switchTabHandler, me));
	            me.switchTo(data.defTab, true);    //设置默认选中的tab
	        },
	        _switchTabHandler: function (e) {
	            var me = this,
	                target = e.target;

	            $(target).closest('a').get(0) && me.switchTo(target.index, false, e);
	            return me;
	        },
	        /**
	         * @name switchTo
	         * @desc 切换到某个tab
	         * @grammar switchTo()  ⇒ self
	         * @example
	         * $('#nav').navigator('switchTo', 1);      //setup模式
	         * var nav = $.ui.navigator(opts);      //render模式
	         * nav.switchTo(1);
	         */
	        switchTo: function (index, isDef, e) {
	            var me = this,
	                data = me._data,
	                lastIndex = data._lastIndex,
	                $tabList = data._$tabList,
	                beforeSelectEvent = $.Event('beforetabselect');

	            me.trigger(beforeSelectEvent, [$tabList[index]]);
	            if (beforeSelectEvent.defaultPrevented) {     //阻止默认事件
	                e && e.preventDefault();     //若是程序调switchTo，则直接return，若点击调用则preventDefault
	                return me;
	            };

	            //点击同一个tab，若是程序调switchTo，则直接return，若点击调用则preventDefault
	            if (lastIndex == index) {
	                e && e.preventDefault();
	                return me;
	            }          //当选中的是同一个tab时，直接返回
	            lastIndex >= 0 && $tabList.eq(lastIndex).removeClass("cur");      //修改样式放在跳转后边
	            $tabList.eq(index).addClass("cur");
	            data._lastIndex = index;

	            return me.trigger('tabselect', [$tabList.get(index), index]);
	        },
	        /**
	         * @name getCurTab
	         * @desc 切换到某个tab
	         * @grammar getCurTab()  ⇒ tab obj
	         * @example
	         * $('#nav').navigator('getCurTab');      //setup模式
	         * var nav = $.ui.navigator(opts);      //render模式
	         * nav.getCurTab();     //返回当前tab信息，包括index和当前tab elem
	         */
	        getCurTab: function () {
	            var me = this,
	                data = me._data,
	                lastIndex = data._lastIndex;

	            return {
	                index: lastIndex,
	                info: data._$tabList[lastIndex]
	            }
	        }
	    });
	    
	})(Zepto);


/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	__webpack_require__(23);

	/**
	 * @file 所有UI组件的基类，通过它可以简单的快速的创建新的组件。
	 * @name zepto.ui
	 * @short zepto.ui
	 * @desc 所有UI组件的基类，通过它可以简单的快速的创建新的组件。
	 * @import core/zepto.js, core/zepto.extend.js
	 */
	(function($, undefined) {
	    var id = 1,
	        _blankFn = function(){},
	        tpl = '<%=name%>-<%=id%>',
	        record = (function(){
	            var data = {},
	                id = 0,
	                iKey = "GMUWidget"+(+ new Date()); //internal key.

	            return function( obj, key, val){
	                var dkey = obj[ iKey ] || ( obj[ iKey ] = ++id ),
	                    store = data[dkey] || (data[dkey] = {});

	                !$.isUndefined(val) && (store[key] = val);
	                $.isNull(val) && delete store[key];

	                return store[ key ];
	            }
	        })();
	        
	    $.ui = $.ui || {
	        version: '2.0.5',

	        guid: _guid,

	        /**
	         * @name $.ui.define
	         * @grammar $.ui.define(name, data[, superClass]) ⇒ undefined
	         * @desc 定义组件,
	         * - ''name'' 组件名称
	         * - ''data'' 对象，设置此组件的prototype。可以添加属性或方法
	         * - ''superClass'' 基类，指定此组件基于哪个现有组件，默认为Widget基类
	         * **示例:**
	         * <code type="javascript">
	         * $.ui.define('helloworld', {
	         *     _data: {
	         *         opt1: null
	         *     },
	         *     enable: function(){
	         *         //...
	         *     }
	         * });
	         * </code>
	         *
	         * **定义完后，就可以通过以下方式使用了**
	         *<code type="javascript">
	         * var instance = $.ui.helloworld({opt1: true});
	         * instance.enable();
	         *
	         * //或者
	         * $('#id').helloworld({opt1:true});
	         * //...later
	         * $('#id').helloworld('enable');
	         * </code>
	         *
	         * **Tips**
	         * 1. 通过Zepto对象上的组件方法，可以直接实例话组件, 如: $('#btn').button({label: 'abc'});
	         * 2. 通过Zepto对象上的组件方法，传入字符串this, 可以获得组件实例，如：var btn = $('#btn').button('this');
	         * 3. 通过Zepto对象上的组件方法，可以直接调用组件方法，第一个参数用来指定方法名，之后的参数作为方法参数，如: $('#btn').button('setIcon', 'home');
	         * 4. 在子类中，如覆写了某个方法，可以在方法中通过this.$super()方法调用父级方法。如：this.$super('enable');
	         */
	        define: function(name, data, superClass) {
	            if(superClass) data.inherit = superClass;
	            var Class = $.ui[name] = _createClass(function(el, options) {
	                var obj = _createObject(Class.prototype, {
	                    _id: $.parseTpl(tpl, {
	                        name: name,
	                        id: _guid()
	                    })
	                });

	                obj._createWidget.call(obj, el, options,Class.plugins);
	                return obj;
	            }, data);
	            return _zeptoLize(name, Class);
	        },

	        /**
	         * @name $.ui.isWidget()
	         * @grammar $.ui.isWidget(obj) ⇒ boolean
	         * @grammar $.ui.isWidget(obj, name) ⇒ boolean
	         * @desc 判断obj是不是widget实例
	         *
	         * **参数**
	         * - ''obj'' 用于检测的对象
	         * - ''name'' 可选，默认监测是不是''widget''(基类)的实例，可以传入组件名字如''button''。作用将变为obj是不是button组件实例。
	         * @param obj
	         * @param name
	         * @example
	         *
	         * var btn = $.ui.button(),
	         *     dialog = $.ui.dialog();
	         *
	         * console.log($.isWidget(btn)); // => true
	         * console.log($.isWidget(dialog)); // => true
	         * console.log($.isWidget(btn, 'button')); // => true
	         * console.log($.isWidget(dialog, 'button')); // => false
	         * console.log($.isWidget(btn, 'noexist')); // => false
	         */
	        isWidget: function(obj, name){
	            return obj instanceof (name===undefined ? _widget: $.ui[name] || _blankFn);
	        }
	    };
	        
	    /**
	     * generate guid
	     */
	    function _guid() {
	        return id++;
	    };

	    function _createObject(proto, data) {
	        var obj = {};
	        Object.create ? obj = Object.create(proto) : obj.__proto__ = proto;
	        return $.extend(obj, data || {});
	    }

	    function _createClass(Class, data) {
	        if (data) {
	            _process(Class, data);
	            $.extend(Class.prototype, data);
	        }
	        return $.extend(Class, {
	            plugins: [],
	            register: function(fn) {
	                if ($.isObject(fn)) {
	                    $.extend(this.prototype,fn);
	                    return;
	                }
	                this.plugins.push(fn);
	            }
	        });
	    }

	    /**
	     * handle inherit & _data
	     */
	    function _process(Class, data) {
	        var superClass = data.inherit || _widget,
	            proto = superClass.prototype,
	            obj;
	        obj = Class.prototype = _createObject(proto, {
	            $factory: Class,
	            $super: function(key) {
	                var fn = proto[key];
	                return $.isFunction(fn) ? fn.apply(this, $.slice(arguments, 1)) : fn;
	            }
	        });
	        obj._data = $.extend({}, proto._data, data._data);
	        delete data._data;
	        return Class;
	    }

	    /**
	     * 强制setup模式
	     * @grammar $(selector).dialog(opts);
	     */
	    function _zeptoLize( name ) {
	        $.fn[ name ] = function(opts) {
	            var ret,
	                obj,
	                args = $.slice(arguments, 1);

	            $.each( this, function( i, el ){

	                obj = record( el, name ) || $.ui[name]( el, $.extend( $.isPlainObject(opts) ? opts : {}, {
	                    setup: true
	                } ) );
	                if ($.isString( opts )) {
	                    if (!$.isFunction( obj[ opts ] ) && opts !== 'this') {
	                        throw new Error(name + '组件没有此方法');    //当不是取方法是，抛出错误信息
	                    }
	                    ret = $.isFunction( obj[ opts ] ) ? obj[opts].apply(obj, args) : undefined;
	                }
	                if( ret !== undefined && ret !== obj || opts === "this" && ( ret = obj ) ) {
	                    return false;
	                }
	                ret = undefined;
	            });
	            //ret 为真就是要返回ui实例之外的内容
	            //obj 'this'时返回
	            //其他都是返回zepto实例
	            //修改返回值为空的时，返回值不对的问题
	            return ret !== undefined ? ret : this;
	        };
	    }
	    /**
	     * @name widget
	     * @desc GMU所有的组件都是此类的子类，即以下此类里面的方法都可在其他组建中调用。
	     */
	    var _widget = function() {};
	    $.extend(_widget.prototype, {
	        _data: {
	            status: true
	        },

	        /**
	         * @name data
	         * @grammar data(key) ⇒ value
	         * @grammar data(key, value) ⇒ value
	         * @desc 设置或者获取options, 所有组件中的配置项都可以通过此方法得到。
	         * @example
	         * $('a#btn').button({label: '按钮'});
	         * console.log($('a#btn').button('data', 'label'));// => 按钮
	         */
	        data: function(key, val) {
	            var _data = this._data;
	            if ($.isObject(key)) return $.extend(_data, key);
	            else return !$.isUndefined(val) ? _data[key] = val : _data[key];
	        },

	        /**
	         * common constructor
	         */
	        _createWidget: function(el, opts,plugins) {

	            if ($.isObject(el)) {
	                opts = el || {};
	                el = undefined;
	            }

	            var data = $.extend({}, this._data, opts);
	            $.extend(this, {
	                _el: el ? $(el) : undefined,
	                _data: data
	            });

	            //触发plugins
	            var me = this;
	            $.each( plugins, function( i, fn ){
	                var result = fn.apply( me );
	                if(result && $.isPlainObject(result) ){
	                    var plugins = me._data.disablePlugin;
	                    if( !plugins || $.isString(plugins) && !~plugins.indexOf(result.pluginName) ){
	                        delete result.pluginName;
	                        $.each(result,function( key, val ){
	                            var orgFn;
	                            if((orgFn = me[key]) && $.isFunction( val ) ){
	                                me[key] = function(){
	                                    me[key + 'Org'] = orgFn;
	                                    return val.apply(me,arguments);
	                                }
	                            }else
	                                me[key] = val;
	                        });
	                    }
	                }
	            });
	            // use setup or render
	            if(data.setup) this._setup(el && el.getAttribute('data-mode'));
	            else this._create();
	            this._init();

	            var me = this,
	                $el = this.trigger('init').root();
	            $el.on('tap', function(e) {
	                (e['bubblesList'] || (e['bubblesList'] = [])).push(me);
	            });

	            record( $el[0], me._id.split('-')[0], me );
	        },

	        /**
	         * @interface: use in render mod
	         * @name _create
	         * @desc 接口定义，子类中需要重新实现此方法，此方法在render模式时被调用。
	         *
	         * 所谓的render方式，即，通过以下方式初始化组件
	         * <code>
	         * $.ui.widgetName(options);
	         * </code>
	         */
	        _create: function() {},

	        /**
	         * @interface: use in setup mod
	         * @name _setup
	         * @desc 接口定义，子类中需要重新实现此方法，此方法在setup模式时被调用。第一个行参用来分辨时fullsetup，还是setup
	         *
	         * <code>
	         * $.ui.define('helloworld', {
	         *     _setup: function(mode){
	         *          if(mode){
	         *              //为fullsetup模式
	         *          } else {
	         *              //为setup模式
	         *          }
	         *     }
	         * });
	         * </code>
	         *
	         * 所谓的setup方式，即，先有dom，然后通过选择器，初始化Zepto后，在Zepto对象直接调用组件名方法实例化组件，如
	         * <code>
	         * //<div id="widget"></div>
	         * $('#widget').widgetName(options);
	         * </code>
	         *
	         * 如果用来初始化的element，设置了data-mode="true"，组件将以fullsetup模式初始化
	         */
	        _setup: function(mode) {},

	        /**
	         * @name root
	         * @grammar root() ⇒ value
	         * @grammar root(el) ⇒ value
	         * @desc 设置或者获取根节点
	         * @example
	         * $('a#btn').button({label: '按钮'});
	         * console.log($('a#btn').button('root'));// => a#btn
	         */
	        root: function(el) {
	            return this._el = el || this._el;
	        },

	        /**
	         * @name id
	         * @grammar id() ⇒ value
	         * @grammar id(id) ⇒ value
	         * @desc 设置或者获取组件id
	         */
	        id: function(id) {
	            return this._id = id || this._id;
	        },

	        /**
	         * @name destroy
	         * @grammar destroy() ⇒ undefined
	         * @desc 注销组件
	         */
	        destroy: function() {
	            var me = this,
	                $el;
	            $el = this.trigger('destroy').off().root();
	            $el.find('*').off();
	            record( $el[0], me._id.split('-')[0], null);
	            $el.off().remove();
	            this.__proto__ = null;
	            $.each(this, function(key) {
	                delete me[key];
	            });
	        },

	        /**
	         * @name on
	         * @grammar on(type, handler) ⇒ instance
	         * @desc 绑定事件，此事件绑定不同于zepto上绑定事件，此On的this只想组件实例，而非zepto实例
	         */
	        on: function(ev, callback) {
	            this.root().on(ev, $.proxy(callback, this));
	            return this;
	        },

	        /**
	         * @name off
	         * @grammar off(type) ⇒ instance
	         * @grammar off(type, handler) ⇒ instance
	         * @desc 解绑事件
	         */
	        off: function(ev, callback) {
	            this.root().off(ev, callback);
	            return this;
	        },

	        /**
	         * @name trigger
	         * @grammar trigger(type[, data]) ⇒ instance
	         * @desc 触发事件, 此trigger会优先把options上的事件回调函数先执行，然后给根DOM派送事件。
	         * options上回调函数可以通过e.preventDefaualt()来组织事件派发。
	         */
	        trigger: function(event, data) {
	            event = $.isString(event) ? $.Event(event) : event;
	            var onEvent = this.data(event.type),result;
	            if( onEvent && $.isFunction(onEvent) ){
	                event.data = data;
	                result = onEvent.apply(this, [event].concat(data));
	                if(result === false || event.defaultPrevented){
	                    return this;
	                }
	            }
	            this.root().trigger(event, data);
	            return this;
	        }
	    });
	})(Zepto);

/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);

	/**
	 * @name zepto.extend
	 * @file 对Zepto做了些扩展，以下所有JS都依赖与此文件
	 * @desc 对Zepto一些扩展，组件必须依赖
	 * @import core/zepto.js
	 */

	(function($){
	    $.extend($, {
	        contains: function(parent, node) {
	            /**
	             * modified by chenluyang
	             * @reason ios4 safari下，无法判断包含文字节点的情况
	             * @original return parent !== node && parent.contains(node)
	             */
	            return parent.compareDocumentPosition
	                ? !!(parent.compareDocumentPosition(node) & 16)
	                : parent !== node && parent.contains(node)
	        }
	    });
	})(Zepto);


	//Core.js
	;(function($, undefined) {
	    //扩展在Zepto静态类上
	    $.extend($, {
	        /**
	         * @grammar $.toString(obj)  ⇒ string
	         * @name $.toString
	         * @desc toString转化
	         */
	        toString: function(obj) {
	            return Object.prototype.toString.call(obj);
	        },

	        /**
	         * @desc 从集合中截取部分数据，这里说的集合，可以是数组，也可以是跟数组性质很像的对象，比如arguments
	         * @name $.slice
	         * @grammar $.slice(collection, [index])  ⇒ array
	         * @example (function(){
	         *     var args = $.slice(arguments, 2);
	         *     console.log(args); // => [3]
	         * })(1, 2, 3);
	         */
	        slice: function(array, index) {
	            return Array.prototype.slice.call(array, index || 0);
	        },

	        /**
	         * @name $.later
	         * @grammar $.later(fn, [when, [periodic, [context, [data]]]])  ⇒ timer
	         * @desc 延迟执行fn
	         * **参数:**
	         * - ***fn***: 将要延时执行的方法
	         * - ***when***: *可选(默认 0)* 什么时间后执行
	         * - ***periodic***: *可选(默认 false)* 设定是否是周期性的执行
	         * - ***context***: *可选(默认 undefined)* 给方法设定上下文
	         * - ***data***: *可选(默认 undefined)* 给方法设定传入参数
	         * @example $.later(function(str){
	         *     console.log(this.name + ' ' + str); // => Example hello
	         * }, 250, false, {name:'Example'}, ['hello']);
	         */
	        later: function(fn, when, periodic, context, data) {
	            return window['set' + (periodic ? 'Interval' : 'Timeout')](function() {
	                fn.apply(context, data);
	            }, when || 0);
	        },

	        /**
	         * @desc 解析模版
	         * @grammar $.parseTpl(str, data)  ⇒ string
	         * @name $.parseTpl
	         * @example var str = "<p><%=name%></p>",
	         * obj = {name: 'ajean'};
	         * console.log($.parseTpl(str, data)); // => <p>ajean</p>
	         */
	        parseTpl: function(str, data) {
	            var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' + 'with(obj||{}){__p.push(\'' + str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/<%=([\s\S]+?)%>/g, function(match, code) {
	                return "'," + code.replace(/\\'/g, "'") + ",'";
	            }).replace(/<%([\s\S]+?)%>/g, function(match, code) {
	                    return "');" + code.replace(/\\'/g, "'").replace(/[\r\n\t]/g, ' ') + "__p.push('";
	                }).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t') + "');}return __p.join('');";
	            var func = new Function('obj', tmpl);
	            return data ? func(data) : func;
	        },

	        /**
	         * @desc 减少执行频率, 多次调用，在指定的时间内，只会执行一次。
	         * **options:**
	         * - ***delay***: 延时时间
	         * - ***fn***: 被稀释的方法
	         * - ***debounce_mode***: 是否开启防震动模式, true:start, false:end
	         *
	         * <code type="text">||||||||||||||||||||||||| (空闲) |||||||||||||||||||||||||
	         * X    X    X    X    X    X      X    X    X    X    X    X</code>
	         *
	         * @grammar $.throttle(delay, fn) ⇒ function
	         * @name $.throttle
	         * @example var touchmoveHander = function(){
	         *     //....
	         * }
	         * //绑定事件
	         * $(document).bind('touchmove', $.throttle(250, touchmoveHander));//频繁滚动，每250ms，执行一次touchmoveHandler
	         *
	         * //解绑事件
	         * $(document).unbind('touchmove', touchmoveHander);//注意这里面unbind还是touchmoveHander,而不是$.throttle返回的function, 当然unbind那个也是一样的效果
	         *
	         */
	        throttle: function(delay, fn, debounce_mode) {
	            var last = 0,
	                timeId;

	            if (typeof fn !== 'function') {
	                debounce_mode = fn;
	                fn = delay;
	                delay = 250;
	            }

	            function wrapper() {
	                var that = this,
	                    period = Date.now() - last,
	                    args = arguments;

	                function exec() {
	                    last = Date.now();
	                    fn.apply(that, args);
	                };

	                function clear() {
	                    timeId = undefined;
	                };

	                if (debounce_mode && !timeId) {
	                    // debounce模式 && 第一次调用
	                    exec();
	                }

	                timeId && clearTimeout(timeId);
	                if (debounce_mode === undefined && period > delay) {
	                    // throttle, 执行到了delay时间
	                    exec();
	                } else {
	                    // debounce, 如果是start就clearTimeout
	                    timeId = setTimeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - period : delay);
	                }
	            };
	            // for event bind | unbind
	            wrapper._zid = fn._zid = fn._zid || $.proxy(fn)._zid;
	            return wrapper;
	        },

	        /**
	         * @desc 减少执行频率, 在指定的时间内, 多次调用，只会执行一次。
	         * **options:**
	         * - ***delay***: 延时时间
	         * - ***fn***: 被稀释的方法
	         * - ***t***: 指定是在开始处执行，还是结束是执行, true:start, false:end
	         *
	         * 非at_begin模式
	         * <code type="text">||||||||||||||||||||||||| (空闲) |||||||||||||||||||||||||
	         *                         X                                X</code>
	         * at_begin模式
	         * <code type="text">||||||||||||||||||||||||| (空闲) |||||||||||||||||||||||||
	         * X                                X                        </code>
	         *
	         * @grammar $.debounce(delay, fn[, at_begin]) ⇒ function
	         * @name $.debounce
	         * @example var touchmoveHander = function(){
	         *     //....
	         * }
	         * //绑定事件
	         * $(document).bind('touchmove', $.debounce(250, touchmoveHander));//频繁滚动，只要间隔时间不大于250ms, 在一系列移动后，只会执行一次
	         *
	         * //解绑事件
	         * $(document).unbind('touchmove', touchmoveHander);//注意这里面unbind还是touchmoveHander,而不是$.debounce返回的function, 当然unbind那个也是一样的效果
	         */
	        debounce: function(delay, fn, t) {
	            return fn === undefined ? $.throttle(250, delay, false) : $.throttle(delay, fn, t === undefined ? false : t !== false);
	        }
	    });

	    /**
	     * 扩展类型判断
	     * @param {Any} obj
	     * @see isString, isBoolean, isRegExp, isNumber, isDate, isObject, isNull, isUdefined
	     */
	    /**
	     * @name $.isString
	     * @grammar $.isString(val)  ⇒ Boolean
	     * @desc 判断变量类型是否为***String***
	     * @example console.log($.isString({}));// => false
	     * console.log($.isString(123));// => false
	     * console.log($.isString('123'));// => true
	     */
	    /**
	     * @name $.isBoolean
	     * @grammar $.isBoolean(val)  ⇒ Boolean
	     * @desc 判断变量类型是否为***Boolean***
	     * @example console.log($.isBoolean(1));// => false
	     * console.log($.isBoolean('true'));// => false
	     * console.log($.isBoolean(false));// => true
	     */
	    /**
	     * @name $.isRegExp
	     * @grammar $.isRegExp(val)  ⇒ Boolean
	     * @desc 判断变量类型是否为***RegExp***
	     * @example console.log($.isRegExp(1));// => false
	     * console.log($.isRegExp('test'));// => false
	     * console.log($.isRegExp(/test/));// => true
	     */
	    /**
	     * @name $.isNumber
	     * @grammar $.isNumber(val)  ⇒ Boolean
	     * @desc 判断变量类型是否为***Number***
	     * @example console.log($.isNumber('123'));// => false
	     * console.log($.isNumber(true));// => false
	     * console.log($.isNumber(123));// => true
	     */
	    /**
	     * @name $.isDate
	     * @grammar $.isDate(val)  ⇒ Boolean
	     * @desc 判断变量类型是否为***Date***
	     * @example console.log($.isDate('123'));// => false
	     * console.log($.isDate('2012-12-12'));// => false
	     * console.log($.isDate(new Date()));// => true
	     */
	    /**
	     * @name $.isObject
	     * @grammar $.isObject(val)  ⇒ Boolean
	     * @desc 判断变量类型是否为***Object***
	     * @example console.log($.isObject('123'));// => false
	     * console.log($.isObject(true));// => false
	     * console.log($.isObject({}));// => true
	     */
	    /**
	     * @name $.isNull
	     * @grammar $.isNull(val)  ⇒ Boolean
	     * @desc 判断变量类型是否为***null***
	     * @example console.log($.isNull(false));// => false
	     * console.log($.isNull(0));// => false
	     * console.log($.isNull(null));// => true
	     */
	    /**
	     * @name $.isUndefined
	     * @grammar $.isUndefined(val)  ⇒ Boolean
	     * @desc 判断变量类型是否为***undefined***
	     * @example
	     * console.log($.isUndefined(false));// => false
	     * console.log($.isUndefined(0));// => false
	     * console.log($.isUndefined(a));// => true
	     */
	    $.each("String Boolean RegExp Number Date Object Null Undefined".split(" "), function( i, name ){
	        var fn;

	        if( 'is' + name in $ ) return;//already defined then ignore.

	        switch (name) {
	            case 'Null':
	                fn = function(obj){ return obj === null; };
	                break;
	            case 'Undefined':
	                fn = function(obj){ return obj === undefined; };
	                break;
	            default:
	                fn = function(obj){ return new RegExp(name + ']', 'i').test( toString(obj) )};
	        }
	        $['is'+name] = fn;
	    });

	    var toString = $.toString;

	})(Zepto);

	//Support.js
	//(function($, undefined) {
	//    var ua = navigator.userAgent,
	//        na = navigator.appVersion,
	//        br = $.browser;
	//
	//    /**
	//     * @name $.browser
	//     * @desc 扩展zepto中对browser的检测
	//     *
	//     * **可用属性**
	//     * - ***qq*** 检测qq浏览器
	//     * - ***chrome*** 检测chrome浏览器
	//     * - ***uc*** 检测uc浏览器
	//     * - ***version*** 检测浏览器版本
	//     *
	//     * @example
	//     * if ($.browser.qq) {      //在qq浏览器上打出此log
	//     *     console.log('this is qq browser');
	//     * }
	//     */
	//    $.extend( br, {
	//        qq: /qq/i.test(ua),
	//        uc: /UC/i.test(ua) || /UC/i.test(na)
	//    } );
	//
	//    br.uc = br.uc || !br.qq && !br.chrome && !br.firefox && !/safari/i.test(ua);
	//
	//    try {
	//        br.version = br.uc ? na.match(/UC(?:Browser)?\/([\d.]+)/)[1] : br.qq ? ua.match(/MQQBrowser\/([\d.]+)/)[1] : br.version;
	//    } catch (e) {}
	//
	//
	//    /**
	//     * @name $.support
	//     * @desc 检测设备对某些属性或方法的支持情况
	//     *
	//     * **可用属性**
	//     * - ***orientation*** 检测是否支持转屏事件，UC中存在orientaion，但转屏不会触发该事件，故UC属于不支持转屏事件(iOS 4上qq, chrome都有这个现象)
	//     * - ***touch*** 检测是否支持touch相关事件
	//     * - ***cssTransitions*** 检测是否支持css3的transition
	//     * - ***has3d*** 检测是否支持translate3d的硬件加速
	//     *
	//     * @example
	//     * if ($.support.has3d) {      //在支持3d的设备上使用
	//     *     console.log('you can use transtion3d');
	//     * }
	//     */
	//    $.support = $.extend($.support || {}, {
	//        orientation: !(br.uc || (parseFloat($.os.version)<5 && (br.qq || br.chrome))) && !($.os.android && parseFloat($.os.version) > 3) && "orientation" in window && "onorientationchange" in window,
	//        touch: "ontouchend" in document,
	//        cssTransitions: "WebKitTransitionEvent" in window,
	//        has3d: 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()
	//    });
	//
	//})(Zepto);

	//Event.js
	(function($) {
	    /**
	     * @name $.matchMedia
	     * @grammar $.matchMedia(query)  ⇒ MediaQueryList
	     * @desc 是原生的window.matchMedia方法的polyfill，对于不支持matchMedia的方法系统和浏览器，按照[w3c window.matchMedia](http://www.w3.org/TR/cssom-view/#dom-window-matchmedia)的接口
	     * 定义，对matchMedia方法进行了封装。原理是用css media query及transitionEnd事件来完成的。在页面中插入media query样式及元素，当query条件满足时改变该元素样式，同时这个样式是transition作用的属性，
	     * 满足条件后即会触发transitionEnd，由此创建MediaQueryList的事件监听。由于transition的duration time为0.001ms，故若直接使用MediaQueryList对象的matches去判断当前是否与query匹配，会有部分延迟，
	     * 建议注册addListener的方式去监听query的改变。$.matchMedia的详细实现原理及采用该方法实现的转屏统一解决方案详见
	     * [GMU Pages: 转屏解决方案($.matchMedia)](https://github.com/gmuteam/GMU/wiki/%E8%BD%AC%E5%B1%8F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88$.matchMedia)
	     *
	     * **MediaQueryList对象包含的属性**
	     * - ***matches*** 是否满足query
	     * - ***query*** 查询的css query，类似\'screen and (orientation: portrait)\'
	     * - ***addListener*** 添加MediaQueryList对象监听器，接收回调函数，回调参数为MediaQueryList对象
	     * - ***removeListener*** 移除MediaQueryList对象监听器
	     *
	     * @example
	     * $.matchMedia('screen and (orientation: portrait)').addListener(fn);
	     */
	    $.matchMedia = (function() {
	        var mediaId = 0,
	            cls = 'gmu-media-detect',
	            transitionEnd = $.fx.transitionEnd,
	            cssPrefix = $.fx.cssPrefix,
	            $style = $('<style></style>').append('.' + cls + '{' + cssPrefix + 'transition: width 0.001ms; width: 0; position: relative; bottom: -999999px;}\n').appendTo('head');

	        return function (query) {
	            var id = cls + mediaId++,
	                $mediaElem = $('<div class="' + cls + '" id="' + id + '"></div>').appendTo('body'),
	                listeners = [],
	                ret;

	            $style.append('@media ' + query + ' { #' + id + ' { width: 100px; } }\n') ;   //原生matchMedia也需要添加对应的@media才能生效
	            // if ('matchMedia' in window) {
	            //     return window.matchMedia(query);
	            // }

	            $mediaElem.on(transitionEnd, function() {
	                ret.matches = $mediaElem.width() === 100;
	                $.each(listeners, function (i,fn) {
	                    $.isFunction(fn) && fn.call(ret, ret);
	                });
	            });

	            ret = {
	                matches: $mediaElem.width() === 100 ,
	                media: query,
	                addListener: function (callback) {
	                    listeners.push(callback);
	                    return this;
	                },
	                removeListener: function (callback) {
	                    var index = listeners.indexOf(callback);
	                    ~index && listeners.splice(index, 1);
	                    return this;
	                }
	            };

	            return ret;
	        };
	    }());

	    $(function () {
	        var handleOrtchange = function (mql) {
	                if ( state !== mql.matches ) {
	                    $( window ).trigger( 'ortchange' );
	                    state = mql.matches;
	                }
	            },
	            state = true;
	        $.mediaQuery = {
	            ortchange: 'screen and (width: ' + window.innerWidth + 'px)'
	        };
	        $.matchMedia($.mediaQuery.ortchange).addListener(handleOrtchange);
	    });

	    /**
	     * @name Trigger Events
	     * @theme event
	     * @desc 扩展的事件
	     * - ***scrollStop*** : scroll停下来时触发, 考虑前进或者后退后scroll事件不触发情况。
	     * - ***ortchange*** : 当转屏的时候触发，兼容uc和其他不支持orientationchange的设备，利用css media query实现，解决了转屏延时及orientation事件的兼容性问题
	     * @example $(document).on('scrollStop', function () {        //scroll停下来时显示scrollStop
	     *     console.log('scrollStop');
	     * });
	     *
	     * $(window).on('ortchange', function () {        //当转屏的时候触发
	     *     console.log('ortchange');
	     * });
	     */
	    /** dispatch scrollStop */
	    function _registerScrollStop(){
	        $(window).on('scroll', $.debounce(80, function() {
	            $(document).trigger('scrollStop');
	        }, false));
	    }
	    //在离开页面，前进或后退回到页面后，重新绑定scroll, 需要off掉所有的scroll，否则scroll时间不触发
	    function _touchstartHander() {
	        $(window).off('scroll');
	        _registerScrollStop();
	    }
	    _registerScrollStop();
	    $(window).on('pageshow', function(e){
	        if(e.persisted) {//如果是从bfcache中加载页面
	            $(document).off('touchstart', _touchstartHander).one('touchstart', _touchstartHander);
	        }
	    });
	})(Zepto);


/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	* fingerprintJS 0.5.3 - Fast browser fingerprint library
	* https://github.com/Valve/fingerprintjs
	* Copyright (c) 2013 Valentin Vasilyev (valentin.vasilyev@outlook.com)
	* Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
	*
	* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	* ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
	* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	* THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	;(function (name, context, definition) {
	  if (typeof module !== 'undefined' && module.exports) { module.exports = definition(); }
	  else if (true) { !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); }
	  else { context[name] = definition(); }
	})('Fingerprint', this, function () {
	  'use strict';
	  
	  var Fingerprint = function (options) {
	    var nativeForEach, nativeMap;
	    nativeForEach = Array.prototype.forEach;
	    nativeMap = Array.prototype.map;

	    this.each = function (obj, iterator, context) {
	      if (obj === null) {
	        return;
	      }
	      if (nativeForEach && obj.forEach === nativeForEach) {
	        obj.forEach(iterator, context);
	      } else if (obj.length === +obj.length) {
	        for (var i = 0, l = obj.length; i < l; i++) {
	          if (iterator.call(context, obj[i], i, obj) === {}) return;
	        }
	      } else {
	        for (var key in obj) {
	          if (obj.hasOwnProperty(key)) {
	            if (iterator.call(context, obj[key], key, obj) === {}) return;
	          }
	        }
	      }
	    };

	    this.map = function(obj, iterator, context) {
	      var results = [];
	      // Not using strict equality so that this acts as a
	      // shortcut to checking for `null` and `undefined`.
	      if (obj == null) return results;
	      if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
	      this.each(obj, function(value, index, list) {
	        results[results.length] = iterator.call(context, value, index, list);
	      });
	      return results;
	    };

	    if (typeof options == 'object'){
	      this.hasher = options.hasher;
	      this.screen_resolution = options.screen_resolution;
	      this.canvas = options.canvas;
	      this.ie_activex = options.ie_activex;
	    } else if(typeof options == 'function'){
	      this.hasher = options;
	    }
	  };

	  Fingerprint.prototype = {
	    get: function(){
	      var keys = [];
	      keys.push(navigator.userAgent);
	      keys.push(navigator.language);
	      keys.push(screen.colorDepth);
	      if (this.screen_resolution) {
	        var resolution = this.getScreenResolution();
	        if (typeof resolution !== 'undefined'){ // headless browsers, such as phantomjs
	          keys.push(this.getScreenResolution().join('x'));
	        }
	      }
	      keys.push(new Date().getTimezoneOffset());
	      keys.push(this.hasSessionStorage());
	      keys.push(this.hasLocalStorage());
	      keys.push(!!window.indexedDB);
	      //body might not be defined at this point or removed programmatically
	      if(document.body){
	        keys.push(typeof(document.body.addBehavior));
	      } else {
	        keys.push(typeof undefined);
	      }
	      keys.push(typeof(window.openDatabase));
	      keys.push(navigator.cpuClass);
	      keys.push(navigator.platform);
	      keys.push(navigator.doNotTrack);
	      keys.push(this.getPluginsString());
	      if(this.canvas && this.isCanvasSupported()){
	        keys.push(this.getCanvasFingerprint());
	      }
	      if(this.hasher){
	        return this.hasher(keys.join('###'), 31);
	      } else {
	        return this.murmurhash3_32_gc(keys.join('###'), 31);
	      }
	    },

	    /**
	     * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
	     * 
	     * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
	     * @see http://github.com/garycourt/murmurhash-js
	     * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
	     * @see http://sites.google.com/site/murmurhash/
	     * 
	     * @param {string} key ASCII only
	     * @param {number} seed Positive integer only
	     * @return {number} 32-bit positive integer hash 
	     */

	    murmurhash3_32_gc: function(key, seed) {
	      var remainder, bytes, h1, h1b, c1, c2, k1, i;
	      
	      remainder = key.length & 3; // key.length % 4
	      bytes = key.length - remainder;
	      h1 = seed;
	      c1 = 0xcc9e2d51;
	      c2 = 0x1b873593;
	      i = 0;
	      
	      while (i < bytes) {
	          k1 = 
	            ((key.charCodeAt(i) & 0xff)) |
	            ((key.charCodeAt(++i) & 0xff) << 8) |
	            ((key.charCodeAt(++i) & 0xff) << 16) |
	            ((key.charCodeAt(++i) & 0xff) << 24);
	        ++i;
	        
	        k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
	        k1 = (k1 << 15) | (k1 >>> 17);
	        k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

	        h1 ^= k1;
	            h1 = (h1 << 13) | (h1 >>> 19);
	        h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
	        h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
	      }
	      
	      k1 = 0;
	      
	      switch (remainder) {
	        case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
	        case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
	        case 1: k1 ^= (key.charCodeAt(i) & 0xff);
	        
	        k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
	        k1 = (k1 << 15) | (k1 >>> 17);
	        k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
	        h1 ^= k1;
	      }
	      
	      h1 ^= key.length;

	      h1 ^= h1 >>> 16;
	      h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
	      h1 ^= h1 >>> 13;
	      h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
	      h1 ^= h1 >>> 16;

	      return h1 >>> 0;
	    },

	    // https://bugzilla.mozilla.org/show_bug.cgi?id=781447
	    hasLocalStorage: function () {
	      try{
	        return !!window.localStorage;
	      } catch(e) {
	        return true; // SecurityError when referencing it means it exists
	      }
	    },
	    
	    hasSessionStorage: function () {
	      try{
	        return !!window.sessionStorage;
	      } catch(e) {
	        return true; // SecurityError when referencing it means it exists
	      }
	    },

	    isCanvasSupported: function () {
	      var elem = document.createElement('canvas');
	      return !!(elem.getContext && elem.getContext('2d'));
	    },

	    isIE: function () {
	      if(navigator.appName === 'Microsoft Internet Explorer') {
	        return true;
	      } else if(navigator.appName === 'Netscape' && /Trident/.test(navigator.userAgent)){// IE 11
	        return true;
	      }
	      return false;
	    },

	    getPluginsString: function () {
	      if(this.isIE() && this.ie_activex){
	        return this.getIEPluginsString();
	      } else {
	        return this.getRegularPluginsString();
	      }
	    },

	    getRegularPluginsString: function () {
	      return this.map(navigator.plugins, function (p) {
	        var mimeTypes = this.map(p, function(mt){
	          return [mt.type, mt.suffixes].join('~');
	        }).join(',');
	        return [p.name, p.description, mimeTypes].join('::');
	      }, this).join(';');
	    },

	    getIEPluginsString: function () {
	      if(window.ActiveXObject){
	        var names = ['ShockwaveFlash.ShockwaveFlash',//flash plugin
	          'AcroPDF.PDF', // Adobe PDF reader 7+
	          'PDF.PdfCtrl', // Adobe PDF reader 6 and earlier, brrr
	          'QuickTime.QuickTime', // QuickTime
	          // 5 versions of real players
	          'rmocx.RealPlayer G2 Control',
	          'rmocx.RealPlayer G2 Control.1',
	          'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
	          'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
	          'RealPlayer',
	          'SWCtl.SWCtl', // ShockWave player
	          'WMPlayer.OCX', // Windows media player
	          'AgControl.AgControl', // Silverlight
	          'Skype.Detection'];
	          
	        // starting to detect plugins in IE
	        return this.map(names, function(name){
	          try{
	            new ActiveXObject(name);
	            return name;
	          } catch(e){
	            return null;
	          }
	        }).join(';');
	      } else {
	        return ""; // behavior prior version 0.5.0, not breaking backwards compat.
	      }
	    },

	    getScreenResolution: function () {
	      return [screen.height, screen.width];
	    },

	    getCanvasFingerprint: function () {
	      var canvas = document.createElement('canvas');
	      var ctx = canvas.getContext('2d');
	      // https://www.browserleaks.com/canvas#how-does-it-work
	      var txt = 'http://valve.github.io';
	      ctx.textBaseline = "top";
	      ctx.font = "14px 'Arial'";
	      ctx.textBaseline = "alphabetic";
	      ctx.fillStyle = "#f60";
	      ctx.fillRect(125,1,62,20);
	      ctx.fillStyle = "#069";
	      ctx.fillText(txt, 2, 15);
	      ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
	      ctx.fillText(txt, 4, 17);
	      return canvas.toDataURL();
	    }
	  };


	  return Fingerprint;

	});


/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(57);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./magnific-popup.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./magnific-popup.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports


	// module
	exports.push([module.id, "/* Magnific Popup CSS */\n.mfp-bg {\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1042;\n  overflow: hidden;\n  position: fixed;\n  background: #0b0b0b;\n  opacity: 0.8; }\n\n.mfp-wrap {\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1043;\n  position: fixed;\n  outline: none !important;\n  -webkit-backface-visibility: hidden; }\n\n.mfp-container {\n  text-align: center;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  padding: 0 8px;\n  box-sizing: border-box; }\n\n.mfp-container:before {\n  content: '';\n  display: inline-block;\n  height: 100%;\n  vertical-align: middle; }\n\n.mfp-align-top .mfp-container:before {\n  display: none; }\n\n.mfp-content {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n  margin: 0 auto;\n  text-align: left;\n  z-index: 1045; }\n\n.mfp-inline-holder .mfp-content,\n.mfp-ajax-holder .mfp-content {\n  width: 100%;\n  cursor: auto; }\n\n.mfp-ajax-cur {\n  cursor: progress; }\n\n.mfp-zoom-out-cur, .mfp-zoom-out-cur .mfp-image-holder .mfp-close {\n  cursor: -moz-zoom-out;\n  cursor: -webkit-zoom-out;\n  cursor: zoom-out; }\n\n.mfp-zoom {\n  cursor: pointer;\n  cursor: -webkit-zoom-in;\n  cursor: -moz-zoom-in;\n  cursor: zoom-in; }\n\n.mfp-auto-cursor .mfp-content {\n  cursor: auto; }\n\n.mfp-close,\n.mfp-arrow,\n.mfp-preloader,\n.mfp-counter {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none; }\n\n.mfp-loading.mfp-figure {\n  display: none; }\n\n.mfp-hide {\n  display: none !important; }\n\n.mfp-preloader {\n  color: #CCC;\n  position: absolute;\n  top: 50%;\n  width: auto;\n  text-align: center;\n  margin-top: -0.8em;\n  left: 8px;\n  right: 8px;\n  z-index: 1044; }\n  .mfp-preloader a {\n    color: #CCC; }\n    .mfp-preloader a:hover {\n      color: #FFF; }\n\n.mfp-s-ready .mfp-preloader {\n  display: none; }\n\n.mfp-s-error .mfp-content {\n  display: none; }\n\nbutton.mfp-close,\nbutton.mfp-arrow {\n  overflow: visible;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none;\n  display: block;\n  outline: none;\n  padding: 0;\n  z-index: 1046;\n  box-shadow: none;\n  touch-action: manipulation; }\n\nbutton::-moz-focus-inner {\n  padding: 0;\n  border: 0; }\n\n.mfp-close {\n  width: 44px;\n  height: 44px;\n  line-height: 44px;\n  position: absolute;\n  right: 0;\n  top: 0;\n  text-decoration: none;\n  text-align: center;\n  opacity: 0.65;\n  padding: 0 0 18px 10px;\n  color: #FFF;\n  font-style: normal;\n  font-size: 28px;\n  font-family: Arial, Baskerville, monospace; }\n  .mfp-close:hover,\n  .mfp-close:focus {\n    opacity: 1; }\n  .mfp-close:active {\n    top: 1px; }\n\n.mfp-close-btn-in .mfp-close {\n  color: #333; }\n\n.mfp-image-holder .mfp-close,\n.mfp-iframe-holder .mfp-close {\n  color: #FFF;\n  right: -6px;\n  text-align: right;\n  padding-right: 6px;\n  width: 100%; }\n\n.mfp-counter {\n  position: absolute;\n  top: 0;\n  right: 0;\n  color: #CCC;\n  font-size: 12px;\n  line-height: 18px;\n  white-space: nowrap; }\n\n.mfp-arrow {\n  position: absolute;\n  opacity: 0.65;\n  margin: 0;\n  top: 50%;\n  margin-top: -55px;\n  padding: 0;\n  width: 90px;\n  height: 110px;\n  -webkit-tap-highlight-color: transparent; }\n  .mfp-arrow:active {\n    margin-top: -54px; }\n  .mfp-arrow:hover,\n  .mfp-arrow:focus {\n    opacity: 1; }\n  .mfp-arrow:before,\n  .mfp-arrow:after {\n    content: '';\n    display: block;\n    width: 0;\n    height: 0;\n    position: absolute;\n    left: 0;\n    top: 0;\n    margin-top: 35px;\n    margin-left: 35px;\n    border: medium inset transparent; }\n  .mfp-arrow:after {\n    border-top-width: 13px;\n    border-bottom-width: 13px;\n    top: 8px; }\n  .mfp-arrow:before {\n    border-top-width: 21px;\n    border-bottom-width: 21px;\n    opacity: 0.7; }\n\n.mfp-arrow-left {\n  left: 0; }\n  .mfp-arrow-left:after {\n    border-right: 17px solid #FFF;\n    margin-left: 31px; }\n  .mfp-arrow-left:before {\n    margin-left: 25px;\n    border-right: 27px solid #3F3F3F; }\n\n.mfp-arrow-right {\n  right: 0; }\n  .mfp-arrow-right:after {\n    border-left: 17px solid #FFF;\n    margin-left: 39px; }\n  .mfp-arrow-right:before {\n    border-left: 27px solid #3F3F3F; }\n\n.mfp-iframe-holder {\n  padding-top: 40px;\n  padding-bottom: 40px; }\n  .mfp-iframe-holder .mfp-content {\n    line-height: 0;\n    width: 100%;\n    max-width: 900px; }\n  .mfp-iframe-holder .mfp-close {\n    top: -40px; }\n\n.mfp-iframe-scaler {\n  width: 100%;\n  height: 0;\n  overflow: hidden;\n  padding-top: 56.25%; }\n  .mfp-iframe-scaler iframe {\n    position: absolute;\n    display: block;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);\n    background: #000; }\n\n/* Main image in popup */\nimg.mfp-img {\n  width: auto;\n  max-width: 100%;\n  height: auto;\n  display: block;\n  line-height: 0;\n  box-sizing: border-box;\n  padding: 40px 0 40px;\n  margin: 0 auto; }\n\n/* The shadow behind the image */\n.mfp-figure {\n  line-height: 0; }\n  .mfp-figure:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 40px;\n    bottom: 40px;\n    display: block;\n    right: 0;\n    width: auto;\n    height: auto;\n    z-index: -1;\n    box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);\n    background: #444; }\n  .mfp-figure small {\n    color: #BDBDBD;\n    display: block;\n    font-size: 12px;\n    line-height: 14px; }\n  .mfp-figure figure {\n    margin: 0; }\n\n.mfp-bottom-bar {\n  margin-top: -36px;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  width: 100%;\n  cursor: auto; }\n\n.mfp-title {\n  text-align: left;\n  line-height: 18px;\n  color: #F3F3F3;\n  word-wrap: break-word;\n  padding-right: 36px; }\n\n.mfp-image-holder .mfp-content {\n  max-width: 100%; }\n\n.mfp-gallery .mfp-image-holder .mfp-figure {\n  cursor: pointer; }\n\n@media screen and (max-width: 800px) and (orientation: landscape), screen and (max-height: 300px) {\n  /**\n       * Remove all paddings around the image on small screen\n       */\n  .mfp-img-mobile .mfp-image-holder {\n    padding-left: 0;\n    padding-right: 0; }\n  .mfp-img-mobile img.mfp-img {\n    padding: 0; }\n  .mfp-img-mobile .mfp-figure:after {\n    top: 0;\n    bottom: 0; }\n  .mfp-img-mobile .mfp-figure small {\n    display: inline;\n    margin-left: 5px; }\n  .mfp-img-mobile .mfp-bottom-bar {\n    background: rgba(0, 0, 0, 0.6);\n    bottom: 0;\n    margin: 0;\n    top: auto;\n    padding: 3px 5px;\n    position: fixed;\n    box-sizing: border-box; }\n    .mfp-img-mobile .mfp-bottom-bar:empty {\n      padding: 0; }\n  .mfp-img-mobile .mfp-counter {\n    right: 5px;\n    top: 3px; }\n  .mfp-img-mobile .mfp-close {\n    top: 0;\n    right: 0;\n    width: 35px;\n    height: 35px;\n    line-height: 35px;\n    background: rgba(0, 0, 0, 0.6);\n    position: fixed;\n    text-align: center;\n    padding: 0; } }\n\n@media all and (max-width: 900px) {\n  .mfp-arrow {\n    -webkit-transform: scale(0.75);\n    transform: scale(0.75); }\n  .mfp-arrow-left {\n    -webkit-transform-origin: 0;\n    transform-origin: 0; }\n  .mfp-arrow-right {\n    -webkit-transform-origin: 100%;\n    transform-origin: 100%; }\n  .mfp-container {\n    padding-left: 6px;\n    padding-right: 6px; } }\n", ""]);

	// exports


/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(59);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./tvlist_img.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./tvlist_img.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 59:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports


	// module
	exports.push([module.id, "@charset \"utf-8\";\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo,\ninput {\n  margin: 0;\n  padding: 0;\n  border: none;\n  outline: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\nhtml,\nbody,\nform,\nfieldset,\np,\ndiv,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  -webkit-text-size-adjust: none;\n}\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  font-family: arial, sans-serif;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none;\n}\nins {\n  text-decoration: none;\n}\ndel {\n  text-decoration: line-through;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n/*!\n * pull to refresh v2.0\n *author:wallace\n *2015-7-22\n */\n#wrapper {\n  position: absolute;\n  z-index: 1;\n  height: 100%;\n  width: 100%;\n}\n.scroller {\n  position: absolute;\n  z-index: 1;\n  /*\t-webkit-touch-callout:none;*/\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  width: 100%;\n  padding: 0;\n}\n.scroller ul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  width: 100%;\n  text-align: left;\n}\n.scroller li {\n  min-height: 70px;\n  background-color: #fafafa;\n  font-size: 14px;\n  padding: 5px;\n}\n.pullDown,\n.pullUp {\n  text-align: center;\n  height: 40px;\n  line-height: 40px;\n  font-size: 12px;\n  color: #888;\n  font-family: Arial, Microsoft YaHei;\n}\n.pullUp {\n  display: block;\n}\n.loader {\n  display: inline-block;\n  font-size: 0px;\n  padding: 0px;\n  display: none;\n}\n.loader span {\n  vertical-align: middle;\n  border-radius: 100%;\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  margin: 0 2px;\n  -webkit-animation: loader 0.8s linear infinite alternate;\n  animation: loader 0.8s linear infinite alternate;\n}\n.loader span:nth-child(1) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n  background: rgba(245, 103, 115, 0.6);\n}\n.loader span:nth-child(2) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n  background: rgba(245, 103, 115, 0.8);\n}\n.loader span:nth-child(3) {\n  -webkit-animation-delay: -0.26666s;\n  animation-delay: -0.26666s;\n  background: #f56773;\n}\n.loader span:nth-child(4) {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n  background: rgba(245, 103, 115, 0.8);\n}\n.loader span:nth-child(5) {\n  -webkit-animation-delay: -1s;\n  animation-delay: -1s;\n  background: rgba(245, 103, 115, 0.4);\n}\n@keyframes loader {\n  from {\n    transform: scale(0, 0);\n  }\n  to {\n    transform: scale(1, 1);\n  }\n}\n@-webkit-keyframes loader {\n  from {\n    -webkit-transform: scale(0, 0);\n  }\n  to {\n    -webkit-transform: scale(1, 1);\n  }\n}\n/** 一级导航样式 */\n.ui-navigator {\n  display: -webkit-box;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.ui-navigator .ui-navigator-list,\n.ui-navigator .ui-navigator-fix {\n  display: -webkit-box;\n  -webkit-box-flex: 1;\n}\n.ui-navigator .ui-navigator-list li {\n  -webkit-box-flex: 1;\n}\n.ui-navigator .ui-navigator-list li a,\n.ui-navigator .ui-navigator-fix {\n  display: -webkit-box;\n  -webkit-box-sizing: border-box;\n  -webkit-box-align: center;\n  -webkit-box-pack: center;\n}\n.ui-navigator .ui-navigator-wrapper {\n  -webkit-box-flex: 1;\n}\n.ui-navigator .ui-navigator-list,\n.ui-navigator .ui-navigator-fix {\n  display: -webkit-box;\n  -webkit-box-flex: 0;\n  /*去掉-webkit-box-flex属性，可滑动tab不平分*/\n}\n.ui-navigator .ui-navigator-list li {\n  -webkit-box-flex: 0;\n}\n/** 一级导航样式 */\n.ui-navigator {\n  width: 100%;\n  border-top: 0px solid #ecede8;\n  border-bottom: 1px solid #d3d3d3;\n  background: #FFF;\n}\n.ui-navigator .ui-navigator-list li a,\n.ui-navigator .ui-navigator-fix {\n  padding: 0.6em 15px;\n  font-size: 16px;\n  color: #000;\n  text-decoration: none;\n  outline: none;\n  font-family: Arial ;\n  text-align: center;\n}\n/*css for pad*/\n@media all and (min-device-width: 768px) and (max-device-width: 1024px) {\n  .ui-navigator .ui-navigator-list li a,\n  .ui-navigator .ui-navigator-fix {\n    font-size: 18px;\n  }\n}\n.ui-navigator .ui-navigator-list li a.cur,\n.ui-navigator .ui-navigator-fix.cur {\n  background: #fff;\n  font: 16px Arial;\n  color: #ea8010;\n}\n.ui-navigator .ui-navigator-list li .cur {\n  border-bottom: solid 1.5px #ea8010;\n}\n.ui-navigator-fixright img {\n  width: 20px;\n  margin-top: -6px;\n}\n/*.ui-navigator .ui-navigator-shadowr, .ui-navigator .ui-navigator-shadowl {\n    background: url('nav.png') right -44px no-repeat;\n}*/\n.ui-navigator .ui-navigator-shadowl {\n  /*gmu-image-self*/\n  background-position: 0 0;\n}\n/*.ui-navigator .ui-navigator-shadowall {\n    background: url('nav.png') 0 0 no-repeat, url('nav.png') right -44px no-repeat;\n}*/\nbody {\n  font-family: \"Helvetica Neue\", Helvetica, \"Hiragino Sans GB\", \"Microsoft YaHei\", Arial, sans-serif;\n  background: #f3f3f3;\n}\na {\n  color: #000;\n  text-decoration: none;\n}\ndiv.rich_media_area {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 100%;\n}\ndiv.rich_media_list {\n  width: 100%;\n  border-bottom: 1px solid #ecede8;\n  display: inline-block;\n  background-color: #FFF;\n  margin-top: 10px;\n}\ndiv.media_content {\n  padding: 5px 10px;\n}\np.media_title {\n  padding: 10px 0px 10px 0px;\n  font-weight: bold;\n}\nimg.media_image {\n  height: 180px;\n  width: 100%;\n}\ndiv.tips {\n  font: 12px Arial;\n  color: #8c8c8c;\n  overflow: hidden;\n  line-height: 16px;\n  padding: 10px 0px 5px 0px;\n}\ndiv.tips_video_type {\n  float: left;\n}\ndiv.tips_video_tool {\n  float: right;\n  padding-right: 10px;\n}\n.media_date {\n  margin-left: 10px;\n}\n.icon_praise_gray {\n  background: transparent url(//storage.goldskyer.com/gmxx/images/dianzan.png) no-repeat 0 0;\n  width: 14px;\n  height: 14px;\n  padding-bottom: 4px;\n  margin-left: 10px;\n  vertical-align: middle;\n  display: inline-block;\n  -webkit-background-size: 100% auto;\n  background-size: 100% auto;\n}\n.icon_logo {\n  background: transparent url(//storage.goldskyer.com/gmxx/images/logo.png) no-repeat 0 0;\n  width: 14px;\n  height: 14px;\n  padding-bottom: 4px;\n  vertical-align: middle;\n  display: inline-block;\n  -webkit-background-size: 100% auto;\n  background-size: 100% auto;\n}\n.bg_img {\n  /*background: transparent url(http://vimg1.ws.126.net/image/snapshot/2016/4/K/3/VBINKLIK3.jpg) no-repeat 0 0;*/\n  height: 180px;\n  width: 100%;\n  text-align: center;\n  vertical-align: middle;\n  display: inline-block;\n  -webkit-background-size: 100% auto;\n  background-size: 100% auto;\n}\n.play_img {\n  width: 60px;\n  top: -125px;\n  opacity: 0.9;\n  position: relative;\n  filter: alpha(opacity=90);\n}\n.loadmore-div {\n  height: 40px;\n  padding-top: 15px;\n  padding-bottom: 10px;\n  text-align: center;\n}\n.loadmore-p {\n  text-align: center;\n  display: block;\n  color: #8c8c8c;\n  font-size: 14px;\n}\n.loadmore-img {\n  display: none;\n  height: 20px;\n  margin: 0 auto;\n}\n.noResult {\n  text-align: center;\n  margin-top: 100px;\n  display: none;\n  color: #8c8c8c;\n  font-size: 14px;\n}\n.pageNo {\n  display: none;\n}\n.currentshowlicount {\n  display: none;\n}\n.blogType {\n  display: none;\n}\nfooter.copyright {\n  text-align: center;\n  color: #999;\n  font-size: 10px;\n  bottom: 10px;\n  left: 0;\n  width: 100%;\n  position: fixed;\n}\n.module-tap-active {\n  -webkit-animation: scaleout 0.2s infinite ease-in-out;\n  animation: scaleout 0.2s infinite ease-in-out;\n}\n#test-form {\n  text-align: center;\n}\n#test-form .name {\n  border: 1px solid #ccc;\n  padding: 5px;\n}\n#test-form .error {\n  color: #A94442;\n}\n#test-form .submit-btn {\n  font-size: 16px;\n  border: 1px solid #5CB85C;\n  margin-top: 10px;\n  background-color: #5CB85C;\n  color: #fff;\n  padding: 5px 10px;\n  border-radius: 5px;\n}\n.white-popup-block {\n  background: #FFF;\n  padding: 20px 30px;\n  text-align: left;\n  max-width: 650px;\n  margin: 40px auto;\n  position: relative;\n}\n@-webkit-keyframes scaleout {\n  0% {\n    -webkit-transform: scale(1);\n  }\n  100% {\n    -webkit-transform: scale(1.2);\n    opacity: 0;\n  }\n}\n@keyframes scaleout {\n  0% {\n    transform: scale(1);\n    -webkit-transform: scale(1);\n  }\n  100% {\n    transform: scale(1.2);\n    -webkit-transform: scale(1.2);\n    opacity: 0;\n  }\n}\n", ""]);

	// exports


/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! Magnific Popup - v1.1.0 - 2016-02-20
	* http://dimsemenov.com/plugins/magnific-popup/
	* Copyright (c) 2016 Dmitry Semenov; */
	;(function (factory) { 
	if (true) { 
	 // AMD. Register as an anonymous module. 
	 !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); 
	 } else if (typeof exports === 'object') { 
	 // Node/CommonJS 
	 factory(require('jquery')); 
	 } else { 
	 // Browser globals 
	 factory(window.jQuery || window.Zepto); 
	 } 
	 }(function($) { 

	/*>>core*/
	/**
	 * 
	 * Magnific Popup Core JS file
	 * 
	 */


	/**
	 * Private static constants
	 */
	var CLOSE_EVENT = 'Close',
		BEFORE_CLOSE_EVENT = 'BeforeClose',
		AFTER_CLOSE_EVENT = 'AfterClose',
		BEFORE_APPEND_EVENT = 'BeforeAppend',
		MARKUP_PARSE_EVENT = 'MarkupParse',
		OPEN_EVENT = 'Open',
		CHANGE_EVENT = 'Change',
		NS = 'mfp',
		EVENT_NS = '.' + NS,
		READY_CLASS = 'mfp-ready',
		REMOVING_CLASS = 'mfp-removing',
		PREVENT_CLOSE_CLASS = 'mfp-prevent-close';


	/**
	 * Private vars 
	 */
	/*jshint -W079 */
	var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
		MagnificPopup = function(){},
		_isJQ = !!(window.jQuery),
		_prevStatus,
		_window = $(window),
		_document,
		_prevContentType,
		_wrapClasses,
		_currPopupType;


	/**
	 * Private functions
	 */
	var _mfpOn = function(name, f) {
			mfp.ev.on(NS + name + EVENT_NS, f);
		},
		_getEl = function(className, appendTo, html, raw) {
			var el = document.createElement('div');
			el.className = 'mfp-'+className;
			if(html) {
				el.innerHTML = html;
			}
			if(!raw) {
				el = $(el);
				if(appendTo) {
					el.appendTo(appendTo);
				}
			} else if(appendTo) {
				appendTo.appendChild(el);
			}
			return el;
		},
		_mfpTrigger = function(e, data) {
			mfp.ev.triggerHandler(NS + e, data);

			if(mfp.st.callbacks) {
				// converts "mfpEventName" to "eventName" callback and triggers it if it's present
				e = e.charAt(0).toLowerCase() + e.slice(1);
				if(mfp.st.callbacks[e]) {
					mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
				}
			}
		},
		_getCloseBtn = function(type) {
			if(type !== _currPopupType || !mfp.currTemplate.closeBtn) {
				mfp.currTemplate.closeBtn = $( mfp.st.closeMarkup.replace('%title%', mfp.st.tClose ) );
				_currPopupType = type;
			}
			return mfp.currTemplate.closeBtn;
		},
		// Initialize Magnific Popup only when called at least once
		_checkInstance = function() {
			if(!$.magnificPopup.instance) {
				/*jshint -W020 */
				mfp = new MagnificPopup();
				mfp.init();
				$.magnificPopup.instance = mfp;
			}
		},
		// CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
		supportsTransitions = function() {
			var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
				v = ['ms','O','Moz','Webkit']; // 'v' for vendor

			if( s['transition'] !== undefined ) {
				return true; 
			}
				
			while( v.length ) {
				if( v.pop() + 'Transition' in s ) {
					return true;
				}
			}
					
			return false;
		};



	/**
	 * Public functions
	 */
	MagnificPopup.prototype = {

		constructor: MagnificPopup,

		/**
		 * Initializes Magnific Popup plugin. 
		 * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
		 */
		init: function() {
			var appVersion = navigator.appVersion;
			mfp.isLowIE = mfp.isIE8 = document.all && !document.addEventListener;
			mfp.isAndroid = (/android/gi).test(appVersion);
			mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
			mfp.supportsTransition = supportsTransitions();

			// We disable fixed positioned lightbox on devices that don't handle it nicely.
			// If you know a better way of detecting this - let me know.
			mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent) );
			_document = $(document);

			mfp.popupsCache = {};
		},

		/**
		 * Opens popup
		 * @param  data [description]
		 */
		open: function(data) {

			var i;

			if(data.isObj === false) { 
				// convert jQuery collection to array to avoid conflicts later
				mfp.items = data.items.toArray();

				mfp.index = 0;
				var items = data.items,
					item;
				for(i = 0; i < items.length; i++) {
					item = items[i];
					if(item.parsed) {
						item = item.el[0];
					}
					if(item === data.el[0]) {
						mfp.index = i;
						break;
					}
				}
			} else {
				mfp.items = $.isArray(data.items) ? data.items : [data.items];
				mfp.index = data.index || 0;
			}

			// if popup is already opened - we just update the content
			if(mfp.isOpen) {
				mfp.updateItemHTML();
				return;
			}
			
			mfp.types = []; 
			_wrapClasses = '';
			if(data.mainEl && data.mainEl.length) {
				mfp.ev = data.mainEl.eq(0);
			} else {
				mfp.ev = _document;
			}

			if(data.key) {
				if(!mfp.popupsCache[data.key]) {
					mfp.popupsCache[data.key] = {};
				}
				mfp.currTemplate = mfp.popupsCache[data.key];
			} else {
				mfp.currTemplate = {};
			}



			mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data ); 
			mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;

			if(mfp.st.modal) {
				mfp.st.closeOnContentClick = false;
				mfp.st.closeOnBgClick = false;
				mfp.st.showCloseBtn = false;
				mfp.st.enableEscapeKey = false;
			}
			

			// Building markup
			// main containers are created only once
			if(!mfp.bgOverlay) {

				// Dark overlay
				mfp.bgOverlay = _getEl('bg').on('click'+EVENT_NS, function() {
					mfp.close();
				});

				mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click'+EVENT_NS, function(e) {
					if(mfp._checkIfClose(e.target)) {
						mfp.close();
					}
				});

				mfp.container = _getEl('container', mfp.wrap);
			}

			mfp.contentContainer = _getEl('content');
			if(mfp.st.preloader) {
				mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
			}


			// Initializing modules
			var modules = $.magnificPopup.modules;
			for(i = 0; i < modules.length; i++) {
				var n = modules[i];
				n = n.charAt(0).toUpperCase() + n.slice(1);
				mfp['init'+n].call(mfp);
			}
			_mfpTrigger('BeforeOpen');


			if(mfp.st.showCloseBtn) {
				// Close button
				if(!mfp.st.closeBtnInside) {
					mfp.wrap.append( _getCloseBtn() );
				} else {
					_mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item) {
						values.close_replaceWith = _getCloseBtn(item.type);
					});
					_wrapClasses += ' mfp-close-btn-in';
				}
			}

			if(mfp.st.alignTop) {
				_wrapClasses += ' mfp-align-top';
			}

		

			if(mfp.fixedContentPos) {
				mfp.wrap.css({
					overflow: mfp.st.overflowY,
					overflowX: 'hidden',
					overflowY: mfp.st.overflowY
				});
			} else {
				mfp.wrap.css({ 
					top: _window.scrollTop(),
					position: 'absolute'
				});
			}
			if( mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos) ) {
				mfp.bgOverlay.css({
					height: _document.height(),
					position: 'absolute'
				});
			}

			

			if(mfp.st.enableEscapeKey) {
				// Close on ESC key
				_document.on('keyup' + EVENT_NS, function(e) {
					if(e.keyCode === 27) {
						mfp.close();
					}
				});
			}

			_window.on('resize' + EVENT_NS, function() {
				mfp.updateSize();
			});


			if(!mfp.st.closeOnContentClick) {
				_wrapClasses += ' mfp-auto-cursor';
			}
			
			if(_wrapClasses)
				mfp.wrap.addClass(_wrapClasses);


			// this triggers recalculation of layout, so we get it once to not to trigger twice
			var windowHeight = mfp.wH = _window.height();

			
			var windowStyles = {};

			if( mfp.fixedContentPos ) {
	            if(mfp._hasScrollBar(windowHeight)){
	                var s = mfp._getScrollbarSize();
	                if(s) {
	                    windowStyles.marginRight = s;
	                }
	            }
	        }

			if(mfp.fixedContentPos) {
				if(!mfp.isIE7) {
					windowStyles.overflow = 'hidden';
				} else {
					// ie7 double-scroll bug
					$('body, html').css('overflow', 'hidden');
				}
			}

			
			
			var classesToadd = mfp.st.mainClass;
			if(mfp.isIE7) {
				classesToadd += ' mfp-ie7';
			}
			if(classesToadd) {
				mfp._addClassToMFP( classesToadd );
			}

			// add content
			mfp.updateItemHTML();

			_mfpTrigger('BuildControls');

			// remove scrollbar, add margin e.t.c
			$('html').css(windowStyles);
			
			// add everything to DOM
			mfp.bgOverlay.add(mfp.wrap).prependTo( mfp.st.prependTo || $(document.body) );

			// Save last focused element
			mfp._lastFocusedEl = document.activeElement;
			
			// Wait for next cycle to allow CSS transition
			setTimeout(function() {
				
				if(mfp.content) {
					mfp._addClassToMFP(READY_CLASS);
					mfp._setFocus();
				} else {
					// if content is not defined (not loaded e.t.c) we add class only for BG
					mfp.bgOverlay.addClass(READY_CLASS);
				}
				
				// Trap the focus in popup
				_document.on('focusin' + EVENT_NS, mfp._onFocusIn);

			}, 16);

			mfp.isOpen = true;
			mfp.updateSize(windowHeight);
			_mfpTrigger(OPEN_EVENT);

			return data;
		},

		/**
		 * Closes the popup
		 */
		close: function() {
			if(!mfp.isOpen) return;
			_mfpTrigger(BEFORE_CLOSE_EVENT);

			mfp.isOpen = false;
			// for CSS3 animation
			if(mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition )  {
				mfp._addClassToMFP(REMOVING_CLASS);
				setTimeout(function() {
					mfp._close();
				}, mfp.st.removalDelay);
			} else {
				mfp._close();
			}
		},

		/**
		 * Helper for close() function
		 */
		_close: function() {
			_mfpTrigger(CLOSE_EVENT);

			var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';

			mfp.bgOverlay.detach();
			mfp.wrap.detach();
			mfp.container.empty();

			if(mfp.st.mainClass) {
				classesToRemove += mfp.st.mainClass + ' ';
			}

			mfp._removeClassFromMFP(classesToRemove);

			if(mfp.fixedContentPos) {
				var windowStyles = {marginRight: ''};
				if(mfp.isIE7) {
					$('body, html').css('overflow', '');
				} else {
					windowStyles.overflow = '';
				}
				$('html').css(windowStyles);
			}
			
			_document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
			mfp.ev.off(EVENT_NS);

			// clean up DOM elements that aren't removed
			mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
			mfp.bgOverlay.attr('class', 'mfp-bg');
			mfp.container.attr('class', 'mfp-container');

			// remove close button from target element
			if(mfp.st.showCloseBtn &&
			(!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
				if(mfp.currTemplate.closeBtn)
					mfp.currTemplate.closeBtn.detach();
			}


			if(mfp.st.autoFocusLast && mfp._lastFocusedEl) {
				$(mfp._lastFocusedEl).focus(); // put tab focus back
			}
			mfp.currItem = null;	
			mfp.content = null;
			mfp.currTemplate = null;
			mfp.prevHeight = 0;

			_mfpTrigger(AFTER_CLOSE_EVENT);
		},
		
		updateSize: function(winHeight) {

			if(mfp.isIOS) {
				// fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
				var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
				var height = window.innerHeight * zoomLevel;
				mfp.wrap.css('height', height);
				mfp.wH = height;
			} else {
				mfp.wH = winHeight || _window.height();
			}
			// Fixes #84: popup incorrectly positioned with position:relative on body
			if(!mfp.fixedContentPos) {
				mfp.wrap.css('height', mfp.wH);
			}

			_mfpTrigger('Resize');

		},

		/**
		 * Set content of popup based on current index
		 */
		updateItemHTML: function() {
			var item = mfp.items[mfp.index];

			// Detach and perform modifications
			mfp.contentContainer.detach();

			if(mfp.content)
				mfp.content.detach();

			if(!item.parsed) {
				item = mfp.parseEl( mfp.index );
			}

			var type = item.type;

			_mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
			// BeforeChange event works like so:
			// _mfpOn('BeforeChange', function(e, prevType, newType) { });

			mfp.currItem = item;

			if(!mfp.currTemplate[type]) {
				var markup = mfp.st[type] ? mfp.st[type].markup : false;

				// allows to modify markup
				_mfpTrigger('FirstMarkupParse', markup);

				if(markup) {
					mfp.currTemplate[type] = $(markup);
				} else {
					// if there is no markup found we just define that template is parsed
					mfp.currTemplate[type] = true;
				}
			}

			if(_prevContentType && _prevContentType !== item.type) {
				mfp.container.removeClass('mfp-'+_prevContentType+'-holder');
			}

			var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
			mfp.appendContent(newContent, type);

			item.preloaded = true;

			_mfpTrigger(CHANGE_EVENT, item);
			_prevContentType = item.type;

			// Append container back after its content changed
			mfp.container.prepend(mfp.contentContainer);

			_mfpTrigger('AfterChange');
		},


		/**
		 * Set HTML content of popup
		 */
		appendContent: function(newContent, type) {
			mfp.content = newContent;

			if(newContent) {
				if(mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
					mfp.currTemplate[type] === true) {
					// if there is no markup, we just append close button element inside
					if(!mfp.content.find('.mfp-close').length) {
						mfp.content.append(_getCloseBtn());
					}
				} else {
					mfp.content = newContent;
				}
			} else {
				mfp.content = '';
			}

			_mfpTrigger(BEFORE_APPEND_EVENT);
			mfp.container.addClass('mfp-'+type+'-holder');

			mfp.contentContainer.append(mfp.content);
		},


		/**
		 * Creates Magnific Popup data object based on given data
		 * @param  {int} index Index of item to parse
		 */
		parseEl: function(index) {
			var item = mfp.items[index],
				type;

			if(item.tagName) {
				item = { el: $(item) };
			} else {
				type = item.type;
				item = { data: item, src: item.src };
			}

			if(item.el) {
				var types = mfp.types;

				// check for 'mfp-TYPE' class
				for(var i = 0; i < types.length; i++) {
					if( item.el.hasClass('mfp-'+types[i]) ) {
						type = types[i];
						break;
					}
				}

				item.src = item.el.attr('data-mfp-src');
				if(!item.src) {
					item.src = item.el.attr('href');
				}
			}

			item.type = type || mfp.st.type || 'inline';
			item.index = index;
			item.parsed = true;
			mfp.items[index] = item;
			_mfpTrigger('ElementParse', item);

			return mfp.items[index];
		},


		/**
		 * Initializes single popup or a group of popups
		 */
		addGroup: function(el, options) {
			var eHandler = function(e) {
				e.mfpEl = this;
				mfp._openClick(e, el, options);
			};

			if(!options) {
				options = {};
			}

			var eName = 'click.magnificPopup';
			options.mainEl = el;

			if(options.items) {
				options.isObj = true;
				el.off(eName).on(eName, eHandler);
			} else {
				options.isObj = false;
				if(options.delegate) {
					el.off(eName).on(eName, options.delegate , eHandler);
				} else {
					options.items = el;
					el.off(eName).on(eName, eHandler);
				}
			}
		},
		_openClick: function(e, el, options) {
			var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;


			if(!midClick && ( e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey ) ) {
				return;
			}

			var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;

			if(disableOn) {
				if($.isFunction(disableOn)) {
					if( !disableOn.call(mfp) ) {
						return true;
					}
				} else { // else it's number
					if( _window.width() < disableOn ) {
						return true;
					}
				}
			}

			if(e.type) {
				e.preventDefault();

				// This will prevent popup from closing if element is inside and popup is already opened
				if(mfp.isOpen) {
					e.stopPropagation();
				}
			}

			options.el = $(e.mfpEl);
			if(options.delegate) {
				options.items = el.find(options.delegate);
			}
			mfp.open(options);
		},


		/**
		 * Updates text on preloader
		 */
		updateStatus: function(status, text) {

			if(mfp.preloader) {
				if(_prevStatus !== status) {
					mfp.container.removeClass('mfp-s-'+_prevStatus);
				}

				if(!text && status === 'loading') {
					text = mfp.st.tLoading;
				}

				var data = {
					status: status,
					text: text
				};
				// allows to modify status
				_mfpTrigger('UpdateStatus', data);

				status = data.status;
				text = data.text;

				mfp.preloader.html(text);

				mfp.preloader.find('a').on('click', function(e) {
					e.stopImmediatePropagation();
				});

				mfp.container.addClass('mfp-s-'+status);
				_prevStatus = status;
			}
		},


		/*
			"Private" helpers that aren't private at all
		 */
		// Check to close popup or not
		// "target" is an element that was clicked
		_checkIfClose: function(target) {

			if($(target).hasClass(PREVENT_CLOSE_CLASS)) {
				return;
			}

			var closeOnContent = mfp.st.closeOnContentClick;
			var closeOnBg = mfp.st.closeOnBgClick;

			if(closeOnContent && closeOnBg) {
				return true;
			} else {

				// We close the popup if click is on close button or on preloader. Or if there is no content.
				if(!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0]) ) {
					return true;
				}

				// if click is outside the content
				if(  (target !== mfp.content[0] && !$.contains(mfp.content[0], target))  ) {
					if(closeOnBg) {
						// last check, if the clicked element is in DOM, (in case it's removed onclick)
						if( $.contains(document, target) ) {
							return true;
						}
					}
				} else if(closeOnContent) {
					return true;
				}

			}
			return false;
		},
		_addClassToMFP: function(cName) {
			mfp.bgOverlay.addClass(cName);
			mfp.wrap.addClass(cName);
		},
		_removeClassFromMFP: function(cName) {
			this.bgOverlay.removeClass(cName);
			mfp.wrap.removeClass(cName);
		},
		_hasScrollBar: function(winHeight) {
			return (  (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()) );
		},
		_setFocus: function() {
			(mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
		},
		_onFocusIn: function(e) {
			if( e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target) ) {
				mfp._setFocus();
				return false;
			}
		},
		_parseMarkup: function(template, values, item) {
			var arr;
			if(item.data) {
				values = $.extend(item.data, values);
			}
			_mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item] );

			$.each(values, function(key, value) {
				if(value === undefined || value === false) {
					return true;
				}
				arr = key.split('_');
				if(arr.length > 1) {
					var el = template.find(EVENT_NS + '-'+arr[0]);

					if(el.length > 0) {
						var attr = arr[1];
						if(attr === 'replaceWith') {
							if(el[0] !== value[0]) {
								el.replaceWith(value);
							}
						} else if(attr === 'img') {
							if(el.is('img')) {
								el.attr('src', value);
							} else {
								el.replaceWith( $('<img>').attr('src', value).attr('class', el.attr('class')) );
							}
						} else {
							el.attr(arr[1], value);
						}
					}

				} else {
					template.find(EVENT_NS + '-'+key).html(value);
				}
			});
		},

		_getScrollbarSize: function() {
			// thx David
			if(mfp.scrollbarSize === undefined) {
				var scrollDiv = document.createElement("div");
				scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
				document.body.appendChild(scrollDiv);
				mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
				document.body.removeChild(scrollDiv);
			}
			return mfp.scrollbarSize;
		}

	}; /* MagnificPopup core prototype end */




	/**
	 * Public static functions
	 */
	$.magnificPopup = {
		instance: null,
		proto: MagnificPopup.prototype,
		modules: [],

		open: function(options, index) {
			_checkInstance();

			if(!options) {
				options = {};
			} else {
				options = $.extend(true, {}, options);
			}

			options.isObj = true;
			options.index = index || 0;
			return this.instance.open(options);
		},

		close: function() {
			return $.magnificPopup.instance && $.magnificPopup.instance.close();
		},

		registerModule: function(name, module) {
			if(module.options) {
				$.magnificPopup.defaults[name] = module.options;
			}
			$.extend(this.proto, module.proto);
			this.modules.push(name);
		},

		defaults: {

			// Info about options is in docs:
			// http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

			disableOn: 0,

			key: null,

			midClick: false,

			mainClass: '',

			preloader: true,

			focus: '', // CSS selector of input to focus after popup is opened

			closeOnContentClick: false,

			closeOnBgClick: true,

			closeBtnInside: true,

			showCloseBtn: true,

			enableEscapeKey: true,

			modal: false,

			alignTop: false,

			removalDelay: 0,

			prependTo: null,

			fixedContentPos: 'auto',

			fixedBgPos: 'auto',

			overflowY: 'auto',

			closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',

			tClose: 'Close (Esc)',

			tLoading: 'Loading...',

			autoFocusLast: true

		}
	};



	$.fn.magnificPopup = function(options) {
		_checkInstance();

		var jqEl = $(this);

		// We call some API method of first param is a string
		if (typeof options === "string" ) {

			if(options === 'open') {
				var items,
					itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
					index = parseInt(arguments[1], 10) || 0;

				if(itemOpts.items) {
					items = itemOpts.items[index];
				} else {
					items = jqEl;
					if(itemOpts.delegate) {
						items = items.find(itemOpts.delegate);
					}
					items = items.eq( index );
				}
				mfp._openClick({mfpEl:items}, jqEl, itemOpts);
			} else {
				if(mfp.isOpen)
					mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
			}

		} else {
			// clone options obj
			options = $.extend(true, {}, options);

			/*
			 * As Zepto doesn't support .data() method for objects
			 * and it works only in normal browsers
			 * we assign "options" object directly to the DOM element. FTW!
			 */
			if(_isJQ) {
				jqEl.data('magnificPopup', options);
			} else {
				jqEl[0].magnificPopup = options;
			}

			mfp.addGroup(jqEl, options);

		}
		return jqEl;
	};

	/*>>core*/

	/*>>inline*/

	var INLINE_NS = 'inline',
		_hiddenClass,
		_inlinePlaceholder,
		_lastInlineElement,
		_putInlineElementsBack = function() {
			if(_lastInlineElement) {
				_inlinePlaceholder.after( _lastInlineElement.addClass(_hiddenClass) ).detach();
				_lastInlineElement = null;
			}
		};

	$.magnificPopup.registerModule(INLINE_NS, {
		options: {
			hiddenClass: 'hide', // will be appended with `mfp-` prefix
			markup: '',
			tNotFound: 'Content not found'
		},
		proto: {

			initInline: function() {
				mfp.types.push(INLINE_NS);

				_mfpOn(CLOSE_EVENT+'.'+INLINE_NS, function() {
					_putInlineElementsBack();
				});
			},

			getInline: function(item, template) {

				_putInlineElementsBack();

				if(item.src) {
					var inlineSt = mfp.st.inline,
						el = $(item.src);

					if(el.length) {

						// If target element has parent - we replace it with placeholder and put it back after popup is closed
						var parent = el[0].parentNode;
						if(parent && parent.tagName) {
							if(!_inlinePlaceholder) {
								_hiddenClass = inlineSt.hiddenClass;
								_inlinePlaceholder = _getEl(_hiddenClass);
								_hiddenClass = 'mfp-'+_hiddenClass;
							}
							// replace target inline element with placeholder
							_lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
						}

						mfp.updateStatus('ready');
					} else {
						mfp.updateStatus('error', inlineSt.tNotFound);
						el = $('<div>');
					}

					item.inlineElement = el;
					return el;
				}

				mfp.updateStatus('ready');
				mfp._parseMarkup(template, {}, item);
				return template;
			}
		}
	});

	/*>>inline*/

	/*>>ajax*/
	var AJAX_NS = 'ajax',
		_ajaxCur,
		_removeAjaxCursor = function() {
			if(_ajaxCur) {
				$(document.body).removeClass(_ajaxCur);
			}
		},
		_destroyAjaxRequest = function() {
			_removeAjaxCursor();
			if(mfp.req) {
				mfp.req.abort();
			}
		};

	$.magnificPopup.registerModule(AJAX_NS, {

		options: {
			settings: null,
			cursor: 'mfp-ajax-cur',
			tError: '<a href="%url%">The content</a> could not be loaded.'
		},

		proto: {
			initAjax: function() {
				mfp.types.push(AJAX_NS);
				_ajaxCur = mfp.st.ajax.cursor;

				_mfpOn(CLOSE_EVENT+'.'+AJAX_NS, _destroyAjaxRequest);
				_mfpOn('BeforeChange.' + AJAX_NS, _destroyAjaxRequest);
			},
			getAjax: function(item) {

				if(_ajaxCur) {
					$(document.body).addClass(_ajaxCur);
				}

				mfp.updateStatus('loading');

				var opts = $.extend({
					url: item.src,
					success: function(data, textStatus, jqXHR) {
						var temp = {
							data:data,
							xhr:jqXHR
						};

						_mfpTrigger('ParseAjax', temp);

						mfp.appendContent( $(temp.data), AJAX_NS );

						item.finished = true;

						_removeAjaxCursor();

						mfp._setFocus();

						setTimeout(function() {
							mfp.wrap.addClass(READY_CLASS);
						}, 16);

						mfp.updateStatus('ready');

						_mfpTrigger('AjaxContentAdded');
					},
					error: function() {
						_removeAjaxCursor();
						item.finished = item.loadError = true;
						mfp.updateStatus('error', mfp.st.ajax.tError.replace('%url%', item.src));
					}
				}, mfp.st.ajax.settings);

				mfp.req = $.ajax(opts);

				return '';
			}
		}
	});

	/*>>ajax*/

	/*>>image*/
	var _imgInterval,
		_getTitle = function(item) {
			if(item.data && item.data.title !== undefined)
				return item.data.title;

			var src = mfp.st.image.titleSrc;

			if(src) {
				if($.isFunction(src)) {
					return src.call(mfp, item);
				} else if(item.el) {
					return item.el.attr(src) || '';
				}
			}
			return '';
		};

	$.magnificPopup.registerModule('image', {

		options: {
			markup: '<div class="mfp-figure">'+
						'<div class="mfp-close"></div>'+
						'<figure>'+
							'<div class="mfp-img"></div>'+
							'<figcaption>'+
								'<div class="mfp-bottom-bar">'+
									'<div class="mfp-title"></div>'+
									'<div class="mfp-counter"></div>'+
								'</div>'+
							'</figcaption>'+
						'</figure>'+
					'</div>',
			cursor: 'mfp-zoom-out-cur',
			titleSrc: 'title',
			verticalFit: true,
			tError: '<a href="%url%">The image</a> could not be loaded.'
		},

		proto: {
			initImage: function() {
				var imgSt = mfp.st.image,
					ns = '.image';

				mfp.types.push('image');

				_mfpOn(OPEN_EVENT+ns, function() {
					if(mfp.currItem.type === 'image' && imgSt.cursor) {
						$(document.body).addClass(imgSt.cursor);
					}
				});

				_mfpOn(CLOSE_EVENT+ns, function() {
					if(imgSt.cursor) {
						$(document.body).removeClass(imgSt.cursor);
					}
					_window.off('resize' + EVENT_NS);
				});

				_mfpOn('Resize'+ns, mfp.resizeImage);
				if(mfp.isLowIE) {
					_mfpOn('AfterChange', mfp.resizeImage);
				}
			},
			resizeImage: function() {
				var item = mfp.currItem;
				if(!item || !item.img) return;

				if(mfp.st.image.verticalFit) {
					var decr = 0;
					// fix box-sizing in ie7/8
					if(mfp.isLowIE) {
						decr = parseInt(item.img.css('padding-top'), 10) + parseInt(item.img.css('padding-bottom'),10);
					}
					item.img.css('max-height', mfp.wH-decr);
				}
			},
			_onImageHasSize: function(item) {
				if(item.img) {

					item.hasSize = true;

					if(_imgInterval) {
						clearInterval(_imgInterval);
					}

					item.isCheckingImgSize = false;

					_mfpTrigger('ImageHasSize', item);

					if(item.imgHidden) {
						if(mfp.content)
							mfp.content.removeClass('mfp-loading');

						item.imgHidden = false;
					}

				}
			},

			/**
			 * Function that loops until the image has size to display elements that rely on it asap
			 */
			findImageSize: function(item) {

				var counter = 0,
					img = item.img[0],
					mfpSetInterval = function(delay) {

						if(_imgInterval) {
							clearInterval(_imgInterval);
						}
						// decelerating interval that checks for size of an image
						_imgInterval = setInterval(function() {
							if(img.naturalWidth > 0) {
								mfp._onImageHasSize(item);
								return;
							}

							if(counter > 200) {
								clearInterval(_imgInterval);
							}

							counter++;
							if(counter === 3) {
								mfpSetInterval(10);
							} else if(counter === 40) {
								mfpSetInterval(50);
							} else if(counter === 100) {
								mfpSetInterval(500);
							}
						}, delay);
					};

				mfpSetInterval(1);
			},

			getImage: function(item, template) {

				var guard = 0,

					// image load complete handler
					onLoadComplete = function() {
						if(item) {
							if (item.img[0].complete) {
								item.img.off('.mfploader');

								if(item === mfp.currItem){
									mfp._onImageHasSize(item);

									mfp.updateStatus('ready');
								}

								item.hasSize = true;
								item.loaded = true;

								_mfpTrigger('ImageLoadComplete');

							}
							else {
								// if image complete check fails 200 times (20 sec), we assume that there was an error.
								guard++;
								if(guard < 200) {
									setTimeout(onLoadComplete,100);
								} else {
									onLoadError();
								}
							}
						}
					},

					// image error handler
					onLoadError = function() {
						if(item) {
							item.img.off('.mfploader');
							if(item === mfp.currItem){
								mfp._onImageHasSize(item);
								mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
							}

							item.hasSize = true;
							item.loaded = true;
							item.loadError = true;
						}
					},
					imgSt = mfp.st.image;


				var el = template.find('.mfp-img');
				if(el.length) {
					var img = document.createElement('img');
					img.className = 'mfp-img';
					if(item.el && item.el.find('img').length) {
						img.alt = item.el.find('img').attr('alt');
					}
					item.img = $(img).on('load.mfploader', onLoadComplete).on('error.mfploader', onLoadError);
					img.src = item.src;

					// without clone() "error" event is not firing when IMG is replaced by new IMG
					// TODO: find a way to avoid such cloning
					if(el.is('img')) {
						item.img = item.img.clone();
					}

					img = item.img[0];
					if(img.naturalWidth > 0) {
						item.hasSize = true;
					} else if(!img.width) {
						item.hasSize = false;
					}
				}

				mfp._parseMarkup(template, {
					title: _getTitle(item),
					img_replaceWith: item.img
				}, item);

				mfp.resizeImage();

				if(item.hasSize) {
					if(_imgInterval) clearInterval(_imgInterval);

					if(item.loadError) {
						template.addClass('mfp-loading');
						mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
					} else {
						template.removeClass('mfp-loading');
						mfp.updateStatus('ready');
					}
					return template;
				}

				mfp.updateStatus('loading');
				item.loading = true;

				if(!item.hasSize) {
					item.imgHidden = true;
					template.addClass('mfp-loading');
					mfp.findImageSize(item);
				}

				return template;
			}
		}
	});

	/*>>image*/

	/*>>zoom*/
	var hasMozTransform,
		getHasMozTransform = function() {
			if(hasMozTransform === undefined) {
				hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
			}
			return hasMozTransform;
		};

	$.magnificPopup.registerModule('zoom', {

		options: {
			enabled: false,
			easing: 'ease-in-out',
			duration: 300,
			opener: function(element) {
				return element.is('img') ? element : element.find('img');
			}
		},

		proto: {

			initZoom: function() {
				var zoomSt = mfp.st.zoom,
					ns = '.zoom',
					image;

				if(!zoomSt.enabled || !mfp.supportsTransition) {
					return;
				}

				var duration = zoomSt.duration,
					getElToAnimate = function(image) {
						var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
							transition = 'all '+(zoomSt.duration/1000)+'s ' + zoomSt.easing,
							cssObj = {
								position: 'fixed',
								zIndex: 9999,
								left: 0,
								top: 0,
								'-webkit-backface-visibility': 'hidden'
							},
							t = 'transition';

						cssObj['-webkit-'+t] = cssObj['-moz-'+t] = cssObj['-o-'+t] = cssObj[t] = transition;

						newImg.css(cssObj);
						return newImg;
					},
					showMainContent = function() {
						mfp.content.css('visibility', 'visible');
					},
					openTimeout,
					animatedImg;

				_mfpOn('BuildControls'+ns, function() {
					if(mfp._allowZoom()) {

						clearTimeout(openTimeout);
						mfp.content.css('visibility', 'hidden');

						// Basically, all code below does is clones existing image, puts in on top of the current one and animated it

						image = mfp._getItemToZoom();

						if(!image) {
							showMainContent();
							return;
						}

						animatedImg = getElToAnimate(image);

						animatedImg.css( mfp._getOffset() );

						mfp.wrap.append(animatedImg);

						openTimeout = setTimeout(function() {
							animatedImg.css( mfp._getOffset( true ) );
							openTimeout = setTimeout(function() {

								showMainContent();

								setTimeout(function() {
									animatedImg.remove();
									image = animatedImg = null;
									_mfpTrigger('ZoomAnimationEnded');
								}, 16); // avoid blink when switching images

							}, duration); // this timeout equals animation duration

						}, 16); // by adding this timeout we avoid short glitch at the beginning of animation


						// Lots of timeouts...
					}
				});
				_mfpOn(BEFORE_CLOSE_EVENT+ns, function() {
					if(mfp._allowZoom()) {

						clearTimeout(openTimeout);

						mfp.st.removalDelay = duration;

						if(!image) {
							image = mfp._getItemToZoom();
							if(!image) {
								return;
							}
							animatedImg = getElToAnimate(image);
						}

						animatedImg.css( mfp._getOffset(true) );
						mfp.wrap.append(animatedImg);
						mfp.content.css('visibility', 'hidden');

						setTimeout(function() {
							animatedImg.css( mfp._getOffset() );
						}, 16);
					}

				});

				_mfpOn(CLOSE_EVENT+ns, function() {
					if(mfp._allowZoom()) {
						showMainContent();
						if(animatedImg) {
							animatedImg.remove();
						}
						image = null;
					}
				});
			},

			_allowZoom: function() {
				return mfp.currItem.type === 'image';
			},

			_getItemToZoom: function() {
				if(mfp.currItem.hasSize) {
					return mfp.currItem.img;
				} else {
					return false;
				}
			},

			// Get element postion relative to viewport
			_getOffset: function(isLarge) {
				var el;
				if(isLarge) {
					el = mfp.currItem.img;
				} else {
					el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
				}

				var offset = el.offset();
				var paddingTop = parseInt(el.css('padding-top'),10);
				var paddingBottom = parseInt(el.css('padding-bottom'),10);
				offset.top -= ( $(window).scrollTop() - paddingTop );


				/*

				Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.

				 */
				var obj = {
					width: el.width(),
					// fix Zepto height+padding issue
					height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
				};

				// I hate to do this, but there is no another option
				if( getHasMozTransform() ) {
					obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
				} else {
					obj.left = offset.left;
					obj.top = offset.top;
				}
				return obj;
			}

		}
	});



	/*>>zoom*/

	/*>>iframe*/

	var IFRAME_NS = 'iframe',
		_emptyPage = '//about:blank',

		_fixIframeBugs = function(isShowing) {
			if(mfp.currTemplate[IFRAME_NS]) {
				var el = mfp.currTemplate[IFRAME_NS].find('iframe');
				if(el.length) {
					// reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
					if(!isShowing) {
						el[0].src = _emptyPage;
					}

					// IE8 black screen bug fix
					if(mfp.isIE8) {
						el.css('display', isShowing ? 'block' : 'none');
					}
				}
			}
		};

	$.magnificPopup.registerModule(IFRAME_NS, {

		options: {
			markup: '<div class="mfp-iframe-scaler">'+
						'<div class="mfp-close"></div>'+
						'<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>'+
					'</div>',

			srcAction: 'iframe_src',

			// we don't care and support only one default type of URL by default
			patterns: {
				youtube: {
					index: 'youtube.com',
					id: 'v=',
					src: '//www.youtube.com/embed/%id%?autoplay=1'
				},
				vimeo: {
					index: 'vimeo.com/',
					id: '/',
					src: '//player.vimeo.com/video/%id%?autoplay=1'
				},
				gmaps: {
					index: '//maps.google.',
					src: '%id%&output=embed'
				}
			}
		},

		proto: {
			initIframe: function() {
				mfp.types.push(IFRAME_NS);

				_mfpOn('BeforeChange', function(e, prevType, newType) {
					if(prevType !== newType) {
						if(prevType === IFRAME_NS) {
							_fixIframeBugs(); // iframe if removed
						} else if(newType === IFRAME_NS) {
							_fixIframeBugs(true); // iframe is showing
						}
					}// else {
						// iframe source is switched, don't do anything
					//}
				});

				_mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function() {
					_fixIframeBugs();
				});
			},

			getIframe: function(item, template) {
				var embedSrc = item.src;
				var iframeSt = mfp.st.iframe;

				$.each(iframeSt.patterns, function() {
					if(embedSrc.indexOf( this.index ) > -1) {
						if(this.id) {
							if(typeof this.id === 'string') {
								embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id)+this.id.length, embedSrc.length);
							} else {
								embedSrc = this.id.call( this, embedSrc );
							}
						}
						embedSrc = this.src.replace('%id%', embedSrc );
						return false; // break;
					}
				});

				var dataObj = {};
				if(iframeSt.srcAction) {
					dataObj[iframeSt.srcAction] = embedSrc;
				}
				mfp._parseMarkup(template, dataObj, item);

				mfp.updateStatus('ready');

				return template;
			}
		}
	});



	/*>>iframe*/

	/*>>gallery*/
	/**
	 * Get looped index depending on number of slides
	 */
	var _getLoopedId = function(index) {
			var numSlides = mfp.items.length;
			if(index > numSlides - 1) {
				return index - numSlides;
			} else  if(index < 0) {
				return numSlides + index;
			}
			return index;
		},
		_replaceCurrTotal = function(text, curr, total) {
			return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
		};

	$.magnificPopup.registerModule('gallery', {

		options: {
			enabled: false,
			arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
			preload: [0,2],
			navigateByImgClick: true,
			arrows: true,

			tPrev: 'Previous (Left arrow key)',
			tNext: 'Next (Right arrow key)',
			tCounter: '%curr% of %total%'
		},

		proto: {
			initGallery: function() {

				var gSt = mfp.st.gallery,
					ns = '.mfp-gallery';

				mfp.direction = true; // true - next, false - prev

				if(!gSt || !gSt.enabled ) return false;

				_wrapClasses += ' mfp-gallery';

				_mfpOn(OPEN_EVENT+ns, function() {

					if(gSt.navigateByImgClick) {
						mfp.wrap.on('click'+ns, '.mfp-img', function() {
							if(mfp.items.length > 1) {
								mfp.next();
								return false;
							}
						});
					}

					_document.on('keydown'+ns, function(e) {
						if (e.keyCode === 37) {
							mfp.prev();
						} else if (e.keyCode === 39) {
							mfp.next();
						}
					});
				});

				_mfpOn('UpdateStatus'+ns, function(e, data) {
					if(data.text) {
						data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
					}
				});

				_mfpOn(MARKUP_PARSE_EVENT+ns, function(e, element, values, item) {
					var l = mfp.items.length;
					values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
				});

				_mfpOn('BuildControls' + ns, function() {
					if(mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
						var markup = gSt.arrowMarkup,
							arrowLeft = mfp.arrowLeft = $( markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left') ).addClass(PREVENT_CLOSE_CLASS),
							arrowRight = mfp.arrowRight = $( markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right') ).addClass(PREVENT_CLOSE_CLASS);

						arrowLeft.click(function() {
							mfp.prev();
						});
						arrowRight.click(function() {
							mfp.next();
						});

						mfp.container.append(arrowLeft.add(arrowRight));
					}
				});

				_mfpOn(CHANGE_EVENT+ns, function() {
					if(mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);

					mfp._preloadTimeout = setTimeout(function() {
						mfp.preloadNearbyImages();
						mfp._preloadTimeout = null;
					}, 16);
				});


				_mfpOn(CLOSE_EVENT+ns, function() {
					_document.off(ns);
					mfp.wrap.off('click'+ns);
					mfp.arrowRight = mfp.arrowLeft = null;
				});

			},
			next: function() {
				mfp.direction = true;
				mfp.index = _getLoopedId(mfp.index + 1);
				mfp.updateItemHTML();
			},
			prev: function() {
				mfp.direction = false;
				mfp.index = _getLoopedId(mfp.index - 1);
				mfp.updateItemHTML();
			},
			goTo: function(newIndex) {
				mfp.direction = (newIndex >= mfp.index);
				mfp.index = newIndex;
				mfp.updateItemHTML();
			},
			preloadNearbyImages: function() {
				var p = mfp.st.gallery.preload,
					preloadBefore = Math.min(p[0], mfp.items.length),
					preloadAfter = Math.min(p[1], mfp.items.length),
					i;

				for(i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
					mfp._preloadItem(mfp.index+i);
				}
				for(i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
					mfp._preloadItem(mfp.index-i);
				}
			},
			_preloadItem: function(index) {
				index = _getLoopedId(index);

				if(mfp.items[index].preloaded) {
					return;
				}

				var item = mfp.items[index];
				if(!item.parsed) {
					item = mfp.parseEl( index );
				}

				_mfpTrigger('LazyLoad', item);

				if(item.type === 'image') {
					item.img = $('<img class="mfp-img" />').on('load.mfploader', function() {
						item.hasSize = true;
					}).on('error.mfploader', function() {
						item.hasSize = true;
						item.loadError = true;
						_mfpTrigger('LazyLoadError', item);
					}).attr('src', item.src);
				}


				item.preloaded = true;
			}
		}
	});

	/*>>gallery*/

	/*>>retina*/

	var RETINA_NS = 'retina';

	$.magnificPopup.registerModule(RETINA_NS, {
		options: {
			replaceSrc: function(item) {
				return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
			},
			ratio: 1 // Function or number.  Set to 1 to disable.
		},
		proto: {
			initRetina: function() {
				if(window.devicePixelRatio > 1) {

					var st = mfp.st.retina,
						ratio = st.ratio;

					ratio = !isNaN(ratio) ? ratio : ratio();

					if(ratio > 1) {
						_mfpOn('ImageHasSize' + '.' + RETINA_NS, function(e, item) {
							item.img.css({
								'max-width': item.img[0].naturalWidth / ratio,
								'width': '100%'
							});
						});
						_mfpOn('ElementParse' + '.' + RETINA_NS, function(e, item) {
							item.src = st.replaceSrc(item, ratio);
						});
					}
				}

			}
		}
	});

	/*>>retina*/
	 _checkInstance(); }));

/***/ }

});