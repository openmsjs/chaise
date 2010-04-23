/*
 * Copyright (c) 2010 Sharegrove Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

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
