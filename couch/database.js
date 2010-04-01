var toCouchQueryString = function(queryMap) {
    var query = [];
    for (var k in queryMap) {
        query.push(k + "=" + escape(msjs.toJSON(queryMap[k])));
    }
    return query.join("&");
}
var jsonRequest = msjs.require("msjs.jsonrequest");


//url includes database name
var db = msjs.publish(function(url) {
    this.url = url;
});

// db level
db.prototype.getInfo = function() {
    return jsonRequest.get(this.url).result;
};

db.prototype.create = function() {
    return jsonRequest.put(this.url).result;
};

db.prototype.remove = function() {
    return jsonRequest.del(this.url).result;
};

db.prototype.getChanges = function() {
    return jsonRequest.get(this.url + "/_changes").result;
};

db.prototype.compact = function() {
    return jsonRequest.post(this.url + "/_compact").result;
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
    return jsonRequest.get(this.url + "/_all_docs?" + queryString).result;
};

db.prototype.updateBulkDocuments = function(docList) {
    var content = msjs.toJSON({docs: docList});
    return jsonRequest.post(this.url + "/_bulk_docs", content).result;
};

db.prototype.getDocument = function(docId) {
    return jsonRequest.get(this.url + "/" + escape(docId)).result;
};

db.prototype.createDocument = function(doc) {
    return jsonRequest.post(this.url, msjs.toJSON(doc)).result;
};

db.prototype.updateDocument = function(docId, doc) {
    return jsonRequest.post(this.url + "/" + escape(docId), msjs.toJSON(doc)).result;
};

db.prototype.removeDocument = function(docId, doc) {
    return jsonRequest.post(this.url + "/" + escape(docId), msjs.toJSON(doc)).result;
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
    return jsonRequest.get(this.url + "/_design/" + escape(design) + "/_view/" + escape(view)).result;
};

db.prototype.cleanupViews = function() {
    return jsonRequest.del(this.url + "/_view_cleanup").result;
};
