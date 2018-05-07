function displayAbbreviations() {
	//检查兼容性；
	if (!document.getElementsByTagName) return false;
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	//取得所有缩略词
	var abbreviations = document.getElementsByTagName("abbr");
	// console.log(abbreviations);
	if (abbreviations.length < 1) return false;
	var defs = new Array()
	//遍历所有缩略词
	for (var i=0; i < abbreviations.length; i++) {
		var current_abbr = abbreviations[i];
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.textContent;
		//书里用的是nodeValue但是DOM一直返回null,用textContent代替；
		//对于Element返回值是null，应该是更新问题；
		defs[key] = definition;
	}
	// console.log(defs);
	//创建定义列表;
	var dlist = document.createElement("dl");
	for (key in defs){
		var definition = defs[key];
		//创建定义标题;
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		//创建定义描述;
		var ddecs = document.createElement("dd");
		var ddecs_text = document.createTextNode(definition);
		ddecs.appendChild(ddecs_text);
		//把它们添加到定义列表；
		dlist.appendChild(dtitle);
		dlist.appendChild(ddecs);
	}
	console.log(dlist);
	//创建标题
	var header = document.createElement("h2");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	//把标题和定义列表添加到页面主体
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(header);
	body.appendChild(dlist);
}


addLoadEvent(displayAbbreviations);