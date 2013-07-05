// ==UserScript==
// @include http://weibo.com/*
// @include http://www.weibo.com/*
// @include http://photo.weibo.com/*
// ==/UserScript==

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

function formatSkin(skinid) {
	var links = document.querySelectorAll("link");
	var custom_style;
	for(var i = links.length; i--;) {
		if(links[i].href.match(/skin\d+/gi)) {
			links[i].href = links[i].href.replace(/skin\d+/gi, "diy/" + skinid);
			break;
		}
	}
	if(document.getElementById("custom_style")) {
		custom_style = document.getElementById("custom_style");
		custom_style.innerHTML = custom_style.innerHTML.match(/@import.+/gi)[0].replace(/diy\d+/gi, skinid);
	}
}

window.addEventListener("DOMContentLoaded", function () {
	opera.extension.addEventListener("message", function (event) {
		var msg = event.data;
		if(msg.name === "impony") {
			reRender(msg.value[0], G_G.styleid);
			if(widget.preferences.pagewidth === "narrow") {
				reRender(msg.value[1], G_G.styleid_narrow);
			}
			formatSkin(widget.preferences.pagecolor);
			if(window.location.host.indexOf("photo.weibo.com") != -1) {
				document.body.style.backgroundColor = "#FFF";
			}
		}
	}, false);
}, false);
