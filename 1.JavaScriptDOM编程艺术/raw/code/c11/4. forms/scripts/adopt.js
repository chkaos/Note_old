if ( !Modernizr.input.placeholder ) { 
	var input = document.getElementById('email'); 
	input.onfocus = function () {
	var text = this.placeholder || this.getAttribute('placeholder'); 
	if ( this.value == text ) {
		// 重置输入框的值，以隐藏临时的占位符文本 
		this.value = '';
	}
	input.onblur = function () {
		if ( this.value == '' ) { 
			// 把输入框的值设置为占位符文本
			this.value = this.placeholder || this.getAttribute('placeholder');
		}
	} 
	// 在outblur 处理函数运行时钟添加占位符文本
	input.onblur();
}