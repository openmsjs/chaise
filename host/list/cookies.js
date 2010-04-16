var cookies = msjs.publish({});
cookies.get = function(name) {
    if (!document.cookie) {
        msjs.log("no document cookie - running on server?");
        return;
    }
	var nameEQ = name + "=";
	var ca = document.cookie.split(";");
	for(var i=0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==" ") c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length,c.length));
	}
	return null;
};

cookies.set = function(name, value, seconds) {
    var expires;
	if (seconds > 0) {
		var date = new Date();
		date.setTime(date.getTime()+(seconds*1000));
		expires = "; expires="+date.toGMTString();
    } else if (seconds < 0) {
        expires = "";
    } else if (seconds == 0) {
        expires = "; expires=Thu, 01-Jan-1970 00:00:01 UTC";
    }

    value = escape(value);
	document.cookie = name+"="+value+expires+"; path=/;";

    // Clear cookies for those browser we set with no domain
    if (value == "") document.cookie = name+"="+value+expires+"; path=/;";
};
