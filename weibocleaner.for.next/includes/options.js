var t;
var pagecolor = document.getElementById("pagecolor");
var pagewidth = document.getElementById("pagewidth");
function showStatus() {
	var status = document.getElementById("status");
	clearTimeout(t);
	status.style.visibility = "visible";
	t = setTimeout(function () {
		status.style.visibility = "hidden";
	}, 2000);
}
pagecolor.addEventListener("change", function() {
	chrome.storage.local.set({"weibocleaner_pagecolor": this.value});
	showStatus();
}, false);
pagewidth.addEventListener("change", function() {
	chrome.storage.local.set({"weibocleaner_pagewidth": this.value});
	showStatus();
}, false);

chrome.storage.local.get("weibocleaner_pagecolor", function (fetchedData) {
	pagecolor.value = fetchedData.weibocleaner_pagecolor ? fetchedData.weibocleaner_pagecolor : pagecolor.options[0].value;
});
chrome.storage.local.get("weibocleaner_pagewidth", function (fetchedData) {
	pagewidth.value = fetchedData.weibocleaner_pagewidth ? fetchedData.weibocleaner_pagewidth : pagewidth.options[0].value;
});