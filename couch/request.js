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
        msjs.log("[warn] couch get: " + url + handleException(e));
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
        response = jsonRequest.post(url, content, mimeType);
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
