var jsonRequest = msjs.require("msjs.jsonrequest");
var request = msjs.publish({});
request.packMe = false;
request.get = function(url) {
    var response = {status: -1, result: null};
    try {
        response = jsonRequest.get(url);
   } catch (e) {
        msjs.log('[warn] couch get:');
   }
    return response;
};
request.del = function(url) {
    var response = {status: -1, result: null};
    try {
        response = jsonRequest.del(url);
   } catch (e) {
        msjs.log('[warn] couch del:');
   }
    return response;
};
request.post = function(url, content, mimeType) {
    var response = {status: -1, result: null};
    try {
        response = jsonRequest.get(url, content, mimeType);
   } catch (e) {
        msjs.log('[warn] couch post:');
   }
    return response;
};
request.put = function(url, content, mimeType) {
    var response = {status: -1, result: null};
    try {
        response = jsonRequest.put(url, content, mimeType);
   } catch (e) {
        msjs.log('[warn] couch put:');
   }
    return response;
};
