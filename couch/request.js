var jsonRequest = msjs.require("msjs.jsonrequest");
var request = msjs.publish({});
request.packMe = false;
var context = msjs.require("java.org.mozilla.javascript.Context");
var handleException = function(e) {
    if (e.javaException) {
        var writer = new Packages.java.io.StringWriter();
        e.javaException.printStackTrace(new Packages.java.io.PrintWriter(writer, true));
        writer.flush();
        e = writer.toString();
    }
    return e;
}
request.get = function(url) {
    var response = {status: -1, result: null, url: url};
    try {
        response = jsonRequest.get(url);
        response.url = url;
   } catch (e) {
        msjs.log("[warn] couch get: " + handleException(e));
   }
    return response;
};
request.del = function(url) {
    var response = {status: -1, result: null, url: url};
    try {
        response = jsonRequest.del(url);
        response.url = url;
   } catch (e) {
        msjs.log("[warn] couch del: " + handleException(e));
   }
    return response;
};
request.post = function(url, content, mimeType) {
    var response = {status: -1, result: null, url: url};
    try {
        response = jsonRequest.get(url, content, mimeType);
        response.url = url;
   } catch (e) {
        msjs.log("[warn] couch post: " + handleException(e));
   }
    return response;
};
request.put = function(url, content, mimeType) {
    var response = {status: -1, result: null, url: url};
    try {
        response = jsonRequest.put(url, content, mimeType);
        response.url = url;
   } catch (e) {
        msjs.log("[warn] couch put: " + handleException(e));
   }
    return response;
};
