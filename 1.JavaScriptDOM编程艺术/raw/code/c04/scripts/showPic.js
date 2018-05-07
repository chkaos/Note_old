function showPic(whichpic){
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);
	// or var text = whichpic.firstChild.nodeValue;
	var text = whichpic.getAttribute("title");
	// 等同于 var text = whichpic.childNodes[0].nodeValue;
	var description = document.getElementById("description");
	// description.innerHTML = ("title", text);
	description.firstChild.nodeValue = text;
}

//第三行可以替换为 placeholder.src = source 但是不推荐；
//因为严格遵守“第一级 DOM ”能够让你避免与兼容性有关的问题。

function countBodyChildren() {
	var body_element = document.getElementsByTagName("body")[0];
	alert (body_element.childNodes.length);
	alert(body_element.nodeType);
	// 可以精确查出body元素一共有多少子元素
}

window.onload = countBodyChildren;
// 在页面加载时执行该函数；
