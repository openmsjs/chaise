var toCouchQueryString = function(queryMap) {
    var query = [];
    for (var k in queryMap) {
        query.push(k + "=" + escape(msjs.toJSON(queryMap[k])));
    }
    return query.join("&");
}
var couchRequest = msjs.require("chaise.couch.request");

//url includes database name
var db = msjs.publish(function(url) {
    this.url = url;
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

db.prototype.writeDocument = function(doc) {
    return doc._id
        ? couchRequest.put(this.url + "/" + escape(doc._id), msjs.toJSON(doc))
        : couchRequest.post(this.url, msjs.toJSON(doc));
};

db.prototype.removeDocument = function(doc) {
    return this.removeDocumentById(doc._id, doc._rev);
};

db.prototype.removeDocumentById = function(docId, rev) {
    return couchRequest.del(this.url + "/" + escape(docId) + "?rev=" + rev);
};

// Views
db.prototype.getDesignDocuments = function() {
    return this.getAllDocuments({
        startkey: "_design/",
        endkey: "_design0",
        include_docs: true
    });
};

db.prototype.getView = function(design, view) {
    return couchRequest.get(this.url + "/_design/" + escape(design) + "/_view/" + escape(view));
};

db.prototype.cleanupViews = function() {
    return couchRequest.del(this.url + "/_view_cleanup");
};
