function convertToGS(img) {
	//如果浏览器不支持<canvas>就返回
	if (!Modernizr.canvas) return;
	//存储原始的彩色版
	img.color = img.src;
	//创建灰度板；
	img.grayscale = createGSCanvas(img);

	//在 mouseover/out 事件发生时切换图片；
	img.onmouseover = function() {
		this.src = this.color;
	}
	img.onmouseout = function() {
		this.src = this.grayscale;
	}

	img.onmouseout();
}

function createGSCanvas(img) {
	//创建新的 canvans 元素，在其绘图环境中绘制彩色图片
	var canvas=document.createElement("canvas");
	canvas.width=img.width;
	canvas.height=img.height;
	var ctx=canvas.getContext("2d");
	ctx.drawImage(img,0,0);

	// Note: getImageData will only work for images 
	// on the same domain as the script. 
	//遍历每一个像素，将每个像素的红，绿，蓝彩色成分求平均值，得到对应彩色值的灰度值
	var c = ctx.getImageData(0, 0, img.width, img.height);
	for (i=0; i<c.height; i++){
		for (j=0; j<c.width; j++) {
			var x = (i*4) * c.width + (j*4);
			var r = c.data[x];
			var g = c.data[x+1];
			var b = c.data[x+2];
			c.data[x] = c.data[x+1] = c.data[x+2] = (r+g+b)/3;
		}
	}

	//将灰度数据放回到画布的绘图环境中,并返回原始图像数据作为新灰度图片的值;
	ctx.putImageData(c,0,0,0,0, c.width, c.height);
	return canvas.toDataURL();
}

window.onload = function() {
	convertToGS(document.getElementById('avatar'));
}