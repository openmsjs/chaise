var jsonRequest = msjs.require("msjs.jsonrequest");
var request = msjs.publish({});
request.packMe = false;
var context = msjs.require("java.org.mozilla.javascript.Context");
var javaToJS = function(o) {
    if (o instanceof java.lang.Object) {
        o = o.toString();
    }
    return o;
};
request.get = function(url) {
    var response = {status: -1, result: null, url: url};
    try {
        response = jsonRequest.get(url);
        response.url = url;
   } catch (e) {
        msjs.log("[warn] couch get:", javaToJS(e));
   }
    return response;
};
request.del = function(url) {
    var response = {status: -1, result: null, url: url};
    try {
        response = jsonRequest.del(url);
        response.url = url;
   } catch (e) {
        msjs.log("[warn] couch del:", javaToJS(e));
   }
    return response;
};
request.post = function(url, content, mimeType) {
    var response = {status: -1, result: null, url: url};
    try {
        response = jsonRequest.get(url, content, mimeType);
        response.url = url;
   } catch (e) {
        msjs.log("[warn] couch post:", javaToJS(e));
   }
    return response;
};
request.put = function(url, content, mimeType) {
    var response = {status: -1, result: null, url: url};
    try {
        response = jsonRequest.put(url, content, mimeType);
        response.url = url;
   } catch (e) {
        msjs.log("[warn] couch put:", javaToJS(e));
   }
    return response;
};
