function popUp(winURL) {
	window.open(winURL, "popup", "width=320, height=480");
}

window.onload = prepareLinks;
function prepareLinks() {
	if (!document.getElementsByTagName) return false; //对象检测
	var links = document.getElementsByTagName("a");
	//这句语句会在Javascript被加载时立即执行，如果<script>tag位于文档底部则可能会出现不完整的情况。
	//所以将JavaScript打包在prepareLinks函数里并添加到onload事件上。
	for (var i=0; i<links.length; i++){
		if(links[i].getAttribute("class") == "popup") {
			links[i].onclick = function(){
				popUp(this.getAttribute("href"));
				return false;
			}
		}
	}
}