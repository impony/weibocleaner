// ==UserScript==
// @include http://weibo.com/*
// @include http://www.weibo.com/*
// @include http://photo.weibo.com/*
// ==/UserScript==

//定义全局变量
var G_G = {
	"styleid": "imponystyle",
	"styleid_narrow": "imponystyle_narrow"
};

function $_$(id) {
	return document.getElementById(id);
}

function reRender(str, id) {
	var head = document.head;
	if($_$(G_G.styleid) && $_$(G_G.styleid_narrow)) {
		return;
	}
	var style = document.createElement("style");
	style.innerHTML = str;
	style.id = id;
	head.appendChild(style);
}

// DOM 加载完成后就立即执行
window.addEventListener("DOMContentLoaded", function () {
	//如果接收到 background script 的消息
	opera.extension.addEventListener("message", function (event) {
		var msg = event.data;
		var custom_style;
		//如果传过来的消息的 name 为某特定值
		if(msg.name === "impony") {
			reRender(msg.value[0], G_G.styleid);
			if(widget.preferences.pagewidth === "narrow") {
				reRender(msg.value[1], G_G.styleid_narrow);
			}
			try {
				custom_style = document.getElementById("custom_style");
				custom_style.innerHTML = custom_style.innerHTML.match(/@import.+/gi)[0].replace(/diy\d+/gi, widget.preferences.pagecolor);
			} catch(e) {}
			if(window.location.host.indexOf("photo.weibo.com") != -1) {
				document.body.style.backgroundColor = "#FFF";
			}
		}
	}, false);
}, false);
