var t;
var iswitch = document.getElementById("switch");
var colors = document.getElementById("colors");
var pagesize = document.getElementById("pagesize");

function showStatus() {
	var status = document.getElementById("status");
	clearTimeout(t);
	status.style.visibility = "visible";
	t = setTimeout(function () {
		status.style.visibility = "hidden";
	}, 2000);
}

function changeOption(target) {
	var selected = target.parentNode.querySelector(".selected");
	if(selected) {
		selected.className = "";
	}
	target.className = "selected";
	showStatus();
}

iswitch.addEventListener("click", function (e) {
	var target = e.target;
	if(target.tagName === "LI") {
		chrome.storage.local.set({"weibocleaner_pageswitch": target.id});
		changeOption(target);
	}
}, "false");
colors.addEventListener("click", function (e) {
	var target = e.target;
	if(target.tagName === "LI") {
		chrome.storage.local.set({"weibocleaner_pagecolor": target.id});
		changeOption(target);
	}
}, "false");
pagesize.addEventListener("click", function (e) {
	var target = e.target;
	if(target.tagName === "LI") {
		chrome.storage.local.set({"weibocleaner_pagewidth": target.id});
		changeOption(target);
	}
}, "false");

chrome.storage.local.get("weibocleaner_pageswitch", function (fetchedData) {
	var id = fetchedData.weibocleaner_pageswitch ? fetchedData.weibocleaner_pageswitch : iswitch.querySelector("li").id;
	document.getElementById(id).className = "selected";
});
chrome.storage.local.get("weibocleaner_pagecolor", function (fetchedData) {
	var id = fetchedData.weibocleaner_pagecolor ? fetchedData.weibocleaner_pagecolor : colors.querySelector("li").id;
	document.getElementById(id).className = "selected";
});
chrome.storage.local.get("weibocleaner_pagewidth", function (fetchedData) {
	var id = fetchedData.weibocleaner_pagewidth ? fetchedData.weibocleaner_pagewidth : pagesize.querySelector("li").id;
	document.getElementById(id).className = "selected";
});