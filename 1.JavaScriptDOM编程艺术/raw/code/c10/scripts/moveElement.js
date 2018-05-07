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