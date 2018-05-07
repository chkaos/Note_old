function getHTTPObject() {
	if (typeof XMLHttpRequest == "undefined")
		XMLHttpRequest = function() {
			try {return new ActiveXObject("Msxmls.XMLHTTP.6.0");}
				catch(e){}
			try {return new ActiveXObject("Msxmls.XMLHTTP.3.0");}
				catch(e){}
			try {return new ActiveXObject("Msxmls.XMLHTTP");}
				catch(e){}
			return false;
		}
	return new XMLHttpRequest();	
}

addLoadEvent(getHTTPObject);