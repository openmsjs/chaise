var couchServer = msjs.require("chaise.couch.server");
var isSuccess = msjs.require("chaise.couch.issuccess");
var docs = msjs.publish(msjs(function(msj) {
    var db = new couchServer(msj.host).getDatabase(msj.dbName);
    var response = db.getAllDocuments({startkey: "_design/",
                                      endkey: "_design0",
                                      include_docs: true});
    if (isSuccess(response)) {
        return msjs.map(response.result.rows, function(row) {
            return row.doc;
        });
    }
}));
docs.push("chaise.database.list.picker", "dbName");
docs.pull("chaise.host.list.picker", "host");
docs.packMe = false;