// ==UserScript==
// @include http://weibo.com/*
// @include http://www.weibo.com/*
// @include http://photo.weibo.com/*
// ==/UserScript==

//定义全局变量
var G_G = {
	"styleid": "imponystyle"
};

function $_$(id) {
	return document.getElementById(id);
}

function reRender(str) {
	var head = document.head;
	if($_$(G_G.styleid)) {
		return;
	}
	var style = document.createElement("style");
	style.innerHTML = str;
	style.id = G_G.styleid;
	head.appendChild(style);
}

// DOM 加载完成后就立即执行
window.addEventListener("DOMContentLoaded", function () {
	//如果接收到 background script 的消息
	opera.extension.addEventListener("message", function (event) {
		var msg = event.data;
		//如果传过来的消息的 name 为某特定值
		if(msg.name === "impony") {
			reRender(msg.value);
			if(window.location.host.indexOf("photo.weibo.com") != -1) {
				document.body.style.backgroundColor = "#FFF";
			}
		}
	}, false);
}, false);
