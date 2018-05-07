function prepareGallery() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	// 理论上应该只有一个入口，但是代码会掩埋在一层又一层的花括号里；
	// 所以如果一个函数有多个出口，只要出口集中在函数的开头部分也可以接受。
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(i=0; i<links.length; i++){
		links[i].onclick = function() {
			return showPic(this) ? false : true ;
			//如果showpic返回true,我们就返回false,浏览器不会打开该链接
		}
	}
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

// 1把现有的 window.onload 事件处理函数的值存入变量 oldonload
// 2如果这个处理函数上还没有绑定任何函数，就像平时那样啊把新函数添加给它；
// 3如果在这个处理函数上已经绑定了一些函数，就把新函数追加到现有指令的末尾；

addLoadEvent(prepareGallery);

function showPic(whichpic){
	if(!document.getElementById("placeholder")) return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);
	if(placeholder.nodeName != "IMG") return false;
	//验证是否图片
	if(document.getElementById("description")) {
		var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
		//三元操作符，问号的后面时变量text的两种可能取值，如返回值是null，text变量将被赋予第二个值；
		// variable = condition ? if true ; if false ;
		// or var text = whichpic.firstChild.nodeValue;
		// 等同于 var text = whichpic.childNodes[0].nodeValue;
		var description = document.getElementById("description");
		// description.innerHTML = ("title", text);
		if(description.firstChild.nodeType == 3){
			//验证是否文本；
			description.firstChild.nodeValue = text;
		}
	}
	return true;
	//根据实际情况做出假设
}

//第三行可以替换为 placeholder.src = source 但是不推荐；
//因为严格遵守“第一级 DOM ”能够让你避免与兼容性有关的问题。

// function countBodyChildren() {
// 	var body_element = document.getElementsByTagName("body")[0];
// 	alert (body_element.childNodes.length);
// 	alert(body_element.nodeType);
// 	// 可以精确查出body元素一共有多少子元素
// }

// window.onload = countBodyChildren;
// // 在页面加载时执行该函数；

alert("Loaded.");
