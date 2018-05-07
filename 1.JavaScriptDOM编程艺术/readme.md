JavaScript DOM编程艺术 小记
---
[本书链接：JavaScript DOM编程艺术(第2版)](https://www.amazon.cn/dp/B004VJM5KE/ref=sr_1_1?ie=UTF8&qid=1525569169&sr=8-1&keywords=DOM%E7%BC%96%E7%A8%8B%E8%89%BA%E6%9C%AF)

前言
---
本书的真正目的是让大家理解DOM脚本编程技术背后的思路和原则。平稳退化、渐进增强、以用户为中心的设计对任何前端 Web 开发工作都非常重要。

目录
---
* [第1章 JavaScript简史](#1)
* [第2章 JavaScript语法](#2)
* [第3章 DOM](#3)
* [第4章 案例研究：JavaScript图片库](#4)
* [第5章 最佳实践](#5)
* [第6章 案例研究：图片库改进版](#6)
* [第7章 动态创建标记](#7)
* [第8章 充实文档的内容](#8)
* [第9章 CSS DOM](#9)
* [第10章 用JavaScript实现动画效果](#10)
* [第11章 HTML5](#11)
* [第12章 综合示例](#12)

---

#### 第1章 JavaScript简史
<div id="1"></div>

JavaScript 是 NetScape 公司与 Sun 公司合作开发的脚本语言，它的出现使得网页的内容不再局限于枯燥的文本，可交互性得到显著改善。JavaScript 和 Java 实际上并没有任何联系。 Java 在理论上可以部署在任何环境，但 JavaScript 只倾向于应用在 Web 浏览器。

[DOM](#3) 是一套对文档的内容进行抽象和概念化的方法。

W3C 对 DOM 的定义： 一个与系统平台和编程语言无关的接口，程序和脚本可以通过这个接口动态地访问和修改文档的内容、结构和形式。

关于早期浏览器战争不作详述，只需了解到现在的大部分了浏览器都遵循最新的规范，意味着大量的任务都不必依靠分支代码即可。

---

#### 第2章 JavaScript语法
<div id="2"></div>

##### 2.1 准备工作
JavaScript 代码的运行必须通过 HTML/XHTML才能执行，主要有两种方式。
~~~html
<!DOCTYPE html>
<html>
<head>
	<script type="text/javascript">
		alert("Hello world.")
	</script>
	<script type="text/javascript" src="test.js"></script>
</head>
<body>
	<script type="text/javascript" src="test.js"></script>
</body>
</html>
~~~
第一是将代码放到文档 `<head>`标签中的 `<script>`标签之间。

第二种更好的方法是把 JavaScript 代码村委一个拓展名为.js顶端独立文件，将`<script>`标签的 src 属性指向该文件。

但最好的做法是把`<script>`标签放到 HTML 文档的最后，</body>标签之前，这样能使浏览器更快地加载页面。

##### 2.2 语法
关于注释的格式有多种，我一般直接使用`ctrl+/`。

通常驼峰格式是函数名、方法名和对象属性名命名的首选格式。
~~~js
var MyMoodOfToday = "happy";
~~~

JavaScript 不需要进行类型声明，因为它是一种弱类型(weakly typed)语言.这意味着我们可以在任何阶段改变数据的类型。

JavaScript 主要的几种数据类型：字符串、数值、布尔值、Null、undefined。

###### 宽松相等== 与严格相等 ===

宽松相等==比较两个值是否相等，在比较前将两个被比较的值转换为相同类型。在转换后（等式的一边或两边都可能被转换）。

严格相等 === 比较两个值是否相等，两个被比较的值在比较前都不进行隐式转换。如果两个被比较的值具有不同的类型，这两个值是不全等的。在日常中使用全等操作符几乎总是正确的选择。对于除了数值之外的值，全等操作符使用明确的语义进行比较：一个值只与自身全等。

---

#### 第3章 DOM
DOM 代表文档对象模型(Document Object Model)。简单的说DOM把一份文档表示为一颗家谱树，而家谱树本身又是一种模型，其典型用法是表示一个人类家族的谱系，使用`parent`,`child`,`siblings`等记号来表明家族成员之间的关系。
<div id="3"></div>

下面是一个简单的例子：
~~~html
<body>
	<h1>What to buy</h1>
	<p title="a gentle reminder">Don't forget to buy this stuff.</p>
	<p>This is just a test</p>
	<ul id="purchases">
		<li>A tin of beans</li>
		<li>Cheese</li>
		<li>Milk</li>
	</ul>
</body>
~~~
这份文档可用下图表示：

![](./raw/images/output1.png)

DOM的节点类型：3种常用类型
- 元素节点（element node）构成DOM文档的基础，文档结构中，是根元素，代表整个文档，其他的还有,,

,等。元素节点之间可以相互包含(当然遵循一定的规则)；
- 文本节点（text node） 文本节点总是被包含在元素节点的内部。
- 属性节点（attribute node）属性节点总是被放在起始标签里，所有的属性都被元素包含。其作用就就是用来对元素做出更具体的描述，比如 title name alt。

~~~html
<p title="a gentle reminder">Don't forget to buy this stuff.</p>
~~~
如上述``<p>``为为元素节点，`Don't forget to buy this stuff.`为``<p>``标签的文本节点，`title="a gentle reminder"`为其属性节点。

获取元素3种方法,分别通过元素id,标签名字和类名字来获取。
* document.getElementById（返回一个对象）
* document.getElementsByTagName（返回一个对象数值）
当整个文档中指定要查找的标签只有一个元素，它返回的也是一个数组，那个数组的长度是1；允许把一个通配符（星号字符 “*”）作为参数，这意味着文档中每个元素都讲在所返回的数组中。

* document.getElementsByClassName （返回的是数值；此方法低版本不兼容，可以用原有的方法实现，如下：

~~~js
function getElementsByClassName(node,classname){
	if(node.getElementsByClassName){
	//如果浏览器支持原生的方法，则直接用原生的方法
		return node.getElementsByClassName(classname);
	}else{
	var results = new Array();
	var elems = node.getElementsByTagName(“*”);
	for(var i = 0; i < elems.length; i++){
		if(elems[i].className.indexOf(classname)!=-1){
			results[results.length]=elems[i];
		}
	}
	return results;
}
~~~

获取和设置属性（两者只能作用于元素节点）

* getAttribute(attribute) 当元素中没有你要获取的值，此方法会返回null值；

* setAttribute(attribute) 设置或修改属性。

以上5个方法是 DOM 操作的基石。

---

#### 第4章 案例研究: JavaScript图片库
<div id="4"></div>

本章讲解了用 DOM 实现图片库的案例。[代码](./raw/code/co4)

上一节的 DOM 操作方法都属于"第一级DOM"，在此方法出现前还有非 DOM 解决方案。

`element.value="the new value";`

等价于

`element.setAttribute(value,"the new value");`

这里稍微提及下但是我们应该严格遵守“第一级 DOM ”，能够避免与兼容性有关的问题。

为了减少对站点的请求次数（提高性能），应该把一些 .js文件合并到一个文件中。

对于本案例中onclick事件处理函数，``<a>``标签的点击默认行为也会被调用，而要阻止这种默认行为，则需要使返回值为false ；使得事件处理函数认为‘这个链接没有被点击’。

在一颗节点树上，`childNodes`属性可以用来获取任何一个元素的所有子元素，它是一个包含这个元素全部子元素的数组。

由`childNodes`属性返回的数组包含所有类型的节点，而不仅仅是元素节点，文档里几乎每一样都是一个节点，连空格和换行符都会被解释为节点，不过每个节点都有nodeType属性，nodeType 属性共有12种可取值，如若只对特定类型的节点进行处理，则需判断.

例如：
~~~
if(childNode.nodeType != ‘3’) continue;
~~~

节点3个基本属性: `nodeType` `nodeName` `nodeValue`

对于元素节点，nodeType=1；nodeName=标签名（返回的名称是大写的）；nodeValue=null（元素节点本身不直接包含文本，所以nodeValue不可用）

对于文本节点，nodeType=3；nodeName=#text ；nodeValue=文本值[空格都属于是文本节点]

对于属性节点，nodeType=2；nodeName=属性名（返回的名称是大写的）；nodeValue=属性值;

`firstChild` 和`lastChild` 属性
子节点的第一个和最后一个元素
对应的是 `childNodes[0]` 和`childNodes[childNodes.length-1]`.

---

#### 第5章 最佳实践
<div id="5"></div>

##### 平稳退化
网站的访问者完全有可能使用的是不支持 JavaScript 的浏览器，或者用户禁用了Javascript。 此时我们应当正确地使用 JavaScript 脚本让用户可以在以上情况下仍能顺利地浏览网站。

##### 结构与 JavaScript 分离

##### 向后兼容

不同的浏览器对 JavaScript的支持度也不尽相同。针对这一问题，我们可以检测浏览器对JavaScript的支持度。

下面检查DOM方法是否被浏览器支持会在全书频繁出现。

~~~js
//类似以下的测试
if(!document.getElementById || !document.getElementsByTagName) return false;
if(!document.getElementById(“imagegallery”)) return false;
~~~

浏览器嗅探技术：通过提取浏览器供应商提供的信息来解决向后兼容的问题。

##### 性能考虑
* 尽量少访问 DOM 和减少标记： 把第一次搜索的结果保存到一个变量当中来减少 DOM 访问。
* 合并和放置脚本： 减少加载页面时发送的请求数量
* 压缩脚本： 利用压缩工具删除不必要字节，如空格和注释。使用更短的变量名，从而减少整体文件的大小。本书的最后案例中使用了 Google 的 Closure Compiler 工具来进行压缩。

---

#### 第6章 案例研究：图片库改进版
<div id="6"></div>

[代码](./raw/code/co6)

从第五章内容中的几个要点：平稳退化，分离JavaScript,向后兼容性，性能考虑；对第四章的图片库JS的改进。

结构化程序设计 其中有这样一条规则：函数应该只有一个入口和一个出口，但在实际工作中，会造成代码难以阅读，作者的理念是 如若一个函数有多个出口，只要这些出口集中出现在函数的开头部分就是可以接受的。

下面是 addLoadEvent 函数，它只有一个参数：打算在页面加载完毕时执行的函数的名字，也是全书频繁出现的函数之一。

~~~js
function addLoadEvent(func) {
    var oldonload=window.onload;
    if(typeof window.onload != 'function'){
        window.onload=func;
    } else {
        window.onload= function (){
            oldonload();
            func();
        }
    }
}
~~~

三元操作符：是if/else语句的一种变体形式，较为简短。

`variable = condition ? if true : if false`




#### 第7章 动态创建标记
<div id="7"></div>

##### 传统方法

document.write()方法可方便快捷的把字符串插入到文档中，它违背了“行为应该与表现分离”的原则，必须把`<script>`放到`<html>`里调用。   
~~~js
document.write("<p>This is text.</p>");
~~~
~~~js
// 分离到外部js
function insertParagraph(text){
	var str = "<p>";
	str += text;
	str += "</p>";
	document.write(str);
}
~~~

innerHTML 属性可以用来读、写某给定元素里的html内容。该属性无细节可言。是带有标签的内容。

利用这个技术无法区分“插入一段html内容”与“写入一段html内容”。一旦使用innerHTML,它的全部内容将被替换。

~~~js
p.innerHTML = "This is content.";
//会将所有<p>标签的文本内容替换掉
~~~

##### DOM 方法

createElement方法

`document.createElement(nodename)``; 创建的节点它还不是DOM节点树的组成部分，这种情况称为文档碎片。

appendChild方法

`parent.appendChild(child)``; 将新创建的节点插入某个文档节点树中，让其成为文档中某个现有节点的一个子节点。

createTextNode方法

`document.createTextNode(text)``; 创建一个文本节点；注意与createElement的区别。

insertBefore()方法

`parentElement.insertBefore(newElement, targetElement)``；将一个新元素插入到目标元素之前，

parentElement父元素是targetElement的父元素，元素节点的父元素必须是另一个元素节点。

DOM中没有相对应的 insertAfter()方法，本书中扩展的写法如下；在现有元素后插入一个新元素。
~~~js
function insertAfter(newElement, targetElement){  
    var parent = targetElement.parentNode;  
    if(parent.lastChild == targetElement){  
        parent.appendChild(newElement);  
	} else{  
        parent.insertBefore(newElement, targetElement.nextSibling);  
 }  
}  
~~~

##### Ajax

使用 Ajax可以做到只更新页面的一小部分。主要优势就是对页面的请求以异步方式发送到服务器，而服务器不会用整个页面来响应请求，它会在后台处理请求，与此同时用户还能继续浏览页面并与之交互。脚本则可以被按需加载和创建页面内容，而不会打断用户的浏览体验。

Ajax 技术的核心是 XMLHttpRequest 对象。

Javascript获取XMLHttpRrquest对象的兼容写法：
~~~js
function getHTTPObject(){  
    if(typeof XMLHttpRrquest == ’undefined’){  
        XMLHttpRrquest = function(){  
            try {return new ActiveXObject(“Msxml2.XMLHTTP.6.0”);}  
            catch (e){ }  
            try {return new ActiveXObject(“Msxml2.XMLHTTP.3.0”);}  
            catch (e){ }  
            try {return new ActiveXObject(“Msxml2.XMLHTTP”);}  
            catch (e){ }  
            return false;  
 }  
}  
return new XMLHttpRequest();  
}
~~~
当在脚本中要使用XMLHttpRequest对象，可将这个新对象直接赋值给一个变量；
~~~js
var request = getHTTPObject();
~~~

书中的例子：
~~~js
function getNewContent(){
    var request = getHTTPObject();
    if(request){
        request.open("GET","example.txt",true);
        request.onreadystatechange = function(){
            if(request.readyState ==4){
                var para = document.createElement("p");
                var txt = document.createTextNode(request.responseText);
                para.appendChild(txt);
                document.getElementById('new').appendChild(para);
            }
        };
        request.send(null);
    } else{
        alert('Sorry,your browser doesn\'t support XMLHttpRequest');
}
alert(‘Function Done!’)
}
addLoadEvent(getNewContent);
~~~
当页面加载完成，以上代码发起一个GET请求，加载exemple.txt文件；
代码中的onreadystatechange是一个时间处理函数，它会在服务器给XMLHttpRequest对象送回响应时被触发执行；
`request.onreadystatechange = dosomething`
然后就可以发送请求`request.send(null)`
浏览器会在不同阶段更新readyState属性

|数值|意义|
|--|--|
|0 |代表未初始化  |
|1 |代表正在加载 |
|2 |代表加载完毕  |
|3 |代表正在交互  |
|4 |表示完成|

只要readyState属性值变成4，就可以访问服务器发送回来的数据；
在使用Ajax时，要注意同源策略，发送的请求只能访问与其所在的html处于用一个域中的数据。

---
#### 第8章 充实文档的内容
<div id="8"></div>

[代码](./raw/code/co8)

#### 第9章 CSS DOM
<div id="9"></div>

##### style属性

文档中每个元素都是一个对象，每个对象又有着各种各样的属性。
element.style.property
style属性是一个对象，如果要具体的style样式的话，可以用style.cssText获取；
当引用一个中间带减号的css属性时，DOM要求用驼峰命名法。

例子：
~~~js
<div id='example' style='background-color: yellow; width:200px; height: 50px;color:red'>测试style属性</div>
var example = document.getElementById("example");
console.log(typeof (example.style))
console.log(example.style.cssText)
console.log(example.style. backgroundColor)；
~~~

只要有可能，选用CSS最好为文档设置样式。当CSS无法处理时才选用 DOM 来设置CSS。

table表格斑马色，平时经常都是用css3：
~~~css
tr:nth-child(odd) {background-color: }
tr:nth-child(even) {background-color: }
~~~
JS写法：
~~~js
function stripeTable(){
	if(!document.getElementsByTagName) return false;
		var tables = document.getElementsByTagName("table");
		var odd,rows;
		for(var i = 0; i < tables.length; i++){
		 odd = false; //条件判断或者称为开关
		 rows = tables[i].getElementsByTagName("tr");
		 for (var j = 0; j < rows.length; j++) {
		 if(odd == true){
			rows[j].style.backgroundColor = "#ffc";
			odd = false;
		 }else{
			odd = true;
		 }
		};
	}
}
~~~


对函数进行抽象： 把一个非常具体的东西改进为一个较为通用的东西的过程叫做抽象（abstraction），把具体的值转换为函数的参数，就可以让其成为一个更通用的函数。

#### 第10章 用JavaScript实现动画效果
<div id="10"></div>

##### 动画基本要素： 位置, 时间， 时间增量

`setTimeout( “function”, interval);`

`clearTimeout(); `

setTimeout 能够让某个函数在经过一段时间之后才开始执行。这个函数带有两个参数:第一个参数通常是一个字符串，其内容是将要执行那个函数的名字；第二个参数是一个数值，它以毫秒为单位设定了需要经过多长时间以后才开始执行一个参数所给的函数。

简单的动画例子：
~~~js
function positionMessage(){
	if(!document.getElementById) return false;
	if(!document.getElementById("message")) return false;
	var elem = document.getElementById("message");
	elem.style.position = "absolute";
	elem.style.left = "50px";
	elem.style.top = "100px";
	moveElement("message", 125, 25, 20);
	if(!document.getElementById("message2")) return false;
	var elem = document.getElementById("message2");
	elem.style.position = "absolute";
	elem.style.left = "50px";
	elem.style.top = "50px";
	moveElement("message2", 125, 125, 20);
}

function moveElement(elementID, final_x, final_y, interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	//将变量 movement 从一个全局变量变为正在被移动的那个元素的属性，如果已经存在则使用clearTimeout函数；
	if (elem.movement) {
		clearTimeout(elem.movement);
	}

	//如果元素的 left 和 top 属性未被设置，则设置其默认值为 0px；
	if (!elem.style.left) {
		elem.style.left = "0px"
	}
	if (!elem.style.top) {
		elem.style.top = "0px"
	}


	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	var dist = 0;

	if (xpos == final_x && ypos == 100) {
		return true;
	}
	if (xpos < final_x) {
		dist = Math.ceil((final_x - xpos)/10)
		xpos += dist;
	}
	if (xpos > final_x) {
		dist = Math.ceil((xpos - final_x)/10)
		xpos -= dist;
	}
	if (ypos < final_y) {
		dist = Math.ceil((final_y - ypos)/10)
		ypos += dist;
	}
	if (ypos > final_y) {
		dist = Math.ceil((ypos - final_y)/10)
		ypos -= dist;
	}
	elem.style.left =  xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"', "+final_x+", "+final_y+", "+interval+")";
	elem.movement = setTimeout(repeat, interval);
}

function moveMessage(){
	if(!document.getElementById) return false;
	if(!document.getElementById("message")) return false;
	var elem = document.getElementById("message");
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);;
	if (xpos == 200 && ypos == 100) {
		return true;
	}
	if (xpos < 200) {
		xpos++;
	}
	if (xpos > 200) {
		xpos--;
	}
	if (ypos < 100) {
		ypos++;
	}
	if (ypos > 100) {
		ypos--;
	}
	elem.style.left =  xpos + "px";
	elem.style.top = ypos + "px";
	movement = setTimeout("moveMessage()", 10);
}

positionMessage();
~~~

效果：

>![效果图](./raw/images/output2.gif)

#### 第11章 HTML5
<div id="11"></div>

简单介绍了 Canvas 视频 音频 和表单新特性，例子见[代码](./raw/code/c11)。

Patatap： 一个由 canvas 和 paper.js、howler.js 组成的小项目：不同的按键触发对应颜色及音乐片段的雨滴效果。

~~~html
<!DOCTYPE html>
<html>
<head>
	<title>Circles</title>
	<script type="text/javascript" src="lib\paper-full.js"></script>
	<link rel="stylesheet" type="text/css" href="circles.css">
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.9/howler.js"></script>

	<script type="text/paperscript" canvas="myCanvas">
	// Create a Paper.js Path to draw a line into it:
	<!-- var path = new Path(); -->
	var keyData = {
		q:{
			color:"#60a372",
			sounds: new Howl({
			src: ['sounds/bubbles.mp3']
			})
		},
		w:{
			color:"#294a97",
			sounds: new Howl({
			src: ['sounds/clay.mp3']
			})
		},
		e:{
			color:"#818ead",
			sounds: new Howl({
			src: ['sounds/confetti.mp3']
			})
		},
		r:{
			color:"#e25176",
			sounds: new Howl({
			src: ['sounds/corona.mp3']
			})
		},
		//其他按键省略
		},
	}



	var circles= [];

	function onKeyDown(event){
	// When a key is pressed, set the content of the text item:
		if(keyData[event.key]){
			var maxPoint = new Point(view.size.width, view.size.height);
		    var randomPoint = Point.random();
		    var point = maxPoint * randomPoint
		    var newCircle = new Path.Circle(point, 300);
			newCircle.fillColor = keyData[event.key].color;
			keyData[event.key].sounds.play();
			circles.push(newCircle);
		}
    }

    function onFrame(event){
	    for(var i=0; i< circles.length; i++){
	    	circles[i].fillColor.hue += 1;
	    	circles[i].scale(.9);
		};
	}
	</script>
</head>
<body>
	<canvas id="myCanvas" resize></canvas>
</body>
</html>
~~~

效果如下。声音就听不到了。

>![效果图](./raw/images/output3.gif)

#### 第12章 综合示例
<div id="12"></div>

利用之前章节的知识做了一个小站点: [代码](./raw/code/c12)。

`@import url()` 可以将多个css样式表导入合并成一个样式表, 便于修改;

高亮当前页面标签和单击内部链接只显示对应内容都非常有用。

---
全书的知识点就简单地总结到这，模糊的地方还是要结合代码多敲。
