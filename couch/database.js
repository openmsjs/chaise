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

var toCouchQueryString = function(queryMap) {
    var query = [];
    for (var k in queryMap) {
        query.push(k + "=" + escape(msjs.toJSON(queryMap[k])));
    }
    return query.join("&");
}
var couchRequest = msjs.require("chaise.couch.request");
var isSuccess = msjs.require("chaise.couch.issuccess");

//url includes database name
var db = msjs.publish(function(dbName, server) {
    this.url = server.url + "/" + escape(dbName);
    this.server = server;
});

// db level
db.prototype.getInfo = function() {
    return couchRequest.get(this.url);
};

db.prototype.create = function() {
    return couchRequest.put(this.url);
};

db.prototype.remove = function() {
    return couchRequest.del(this.url);
};

db.prototype.getChanges = function() {
    return couchRequest.get(this.url + "/_changes");
};

db.prototype.compact = function() {
    return couchRequest.post(this.url + "/_compact");
};

// Documents
// query map keys: 
// startkey=<json> 
// endkey=<json> 
// include_docs=[true|false]
// descending=[true|false]
// limit=<number>
// skip=<number of rows to skip>
db.prototype.getAllDocuments = function(queryMap) {
    var queryString = toCouchQueryString(queryMap);
    return couchRequest.get(this.url + "/_all_docs?" + queryString);
};

db.prototype.updateBulkDocuments = function(docList) {
    var content = msjs.toJSON({docs: docList});
    return couchRequest.post(this.url + "/_bulk_docs", content);
};

db.prototype.getDocument = function(docId) {
    return couchRequest.get(this.url + "/" + escape(docId));
};


// will update doc with rev
db.prototype.writeDocument = function(doc) {
    if (!doc._id) doc._id = this.server.getUuids().result.uuids[0];
    var response = couchRequest.put(this.url + "/" + escape(doc._id), msjs.toJSONWithFunctions(doc, true));
    if (isSuccess(response)) {
        doc._id = response.result.id;
        doc._rev = response.result.rev;
    }
    return response;
};

db.prototype.removeDocument = function(doc) {
    return this.removeDocumentById(doc._id, doc._rev);
};

db.prototype.removeDocumentById = function(docId, rev) {
    return couchRequest.del(this.url + "/" + escape(docId) + "?rev=" + rev);
};

// Views
db.prototype.getDesignInfo = function(design) {
    return couchRequest.get(this.url + "/_design/" + escape(design));
};


// queryMap:
//     key=<json>
//     startkey=<json>
//     endkey=<json>
//     startkey_docid=<docid>
//     endkey_docid=<docid>
//     limit=<num>
//     stale=[ok]
//     descending=[true|false] (default: false)
//     skip=<num> (default: 0)
//     group=[true|false] (default: false)
//     group_level=<num>
//     reduce=[true|false] (default: true)
//     include_docs=[true|false] (default: false)
//     inclusive_end=[true|false] (default: false)
// keys (opt):
//     {"keys": ["key1", "key2", ...]}
db.prototype.getView = function(design, view, queryMap, keys) {
    var url = this.url + "/_design/" + escape(design) + "/_view/" + escape(view);
    if (queryMap) {
        var queryString = toCouchQueryString(queryMap);
        if (queryString) url += "?" + queryString;
    }
    return keys ? couchRequest.post(url, msjs.toJSON(keys)) : couchRequest.get(url);
};

// {
//     "map": "function(doc) {
//         // map code
//     }",
//     "reduce": "function(keys, views, rereduce) {
//         // reduce code (optional)
//     }"
// }
db.prototype.runTemporaryView = function(view, queryMap) {
    var url = this.url + "/_temp_view";
    if (queryMap) {
        var queryString = toCouchQueryString(queryMap);
        if (queryString) url += "?" + queryString;
    }
    return couchRequest.post(url, msjs.toJSON(view));
};

db.prototype.cleanupViews = function() {
    return couchRequest.del(this.url + "/_view_cleanup");
};

db.prototype.compactViews = function(design) {
    return couchRequest.del(this.url + "/_compact/" + design);
};
