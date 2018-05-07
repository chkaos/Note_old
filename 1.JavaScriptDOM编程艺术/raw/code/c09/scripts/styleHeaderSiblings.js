//使用DOM根据元素之间的相对位置来找出某特定元素
// function styleHeaderSiblings(){
// 	if (!document.getElementsByTagName) return false;
// 	var headers = document.getElementsByTagName("h1");
// 	var elem;
// 	for (var i=0; i < headers.length; i++){
// 		elem = getNextElement(headers[i].nextSibling);
// 		addClass(elem, "intro");
// 		// elem.className += "intro";
// 		// elem.style.fontWeight = "bold";
// 		// elem.style.fontSize = "1.2em";
// 	}
// }

//抽象化
function styleHeaderSiblings(tag, theclass){
	if (!document.getElementsByTagName) return false;
	var headers = document.getElementsByTagName(tag);
	var elem;
	for (var i=0; i < headers.length; i++){
		elem = getNextElement(headers[i].nextSibling);
		addClass(elem, theclass);
		// elem.className += "intro";
		// elem.style.fontWeight = "bold";
		// elem.style.fontSize = "1.2em";
	}
}

function getNextElement(node) {
	if(node.nodeType == 1) {
		return node;
	}
	if (node.nextSibling) {
		return getNextElement(node.nextSibling);
	}
	return null;
}

function addClass(element, value){
	if(!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName+= "";
		newClassName+= value;
		element.className = newClassName;
	}
}

addLoadEvent(function(){
	styleHeaderSiblings("h1","intro");
});