var couchServer = msjs.require("chaise.couch.server");
var isSuccess = msjs.require("chaise.couch.issuccess");
var dbName = msjs.require("chaise.database.list.picker");
var hostPicker = msjs.require("chaise.host.list.picker");
msjs.publish(msjs(function(msj) {
    var host = hostPicker();
    if (!host) return;

    var db = new couchServer(host).getDatabase(dbName());
    var response = db.getAllDocuments({startkey: "_design/",
                                      endkey: "_design0",
                                      include_docs: true});
    if (isSuccess(response)) {
        return msjs.map(response.result.rows, function(row) {
            return row.doc;
        });
    }
}).setPack(false).depends(dbName, "chaise.document.view.saver"));
