var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var list = msjs.publish(msjs(function(msj) {
    if (!msj.host) return;
    if (!msj.dbName) return;

    var db = new couchServer(msj.host).getDatabase(msj.dbName);
    var docId = null;
    if (msj.picked) {
        docId = msj.picked.id;
    } else if (msj.updated) {
        if (isSuccess(msj.updated)) {
            docId = msj.updated.result.id;
        }
        // TODO: send update error to client
    } else {
        return;
    }
 
    if (docId) {
        var response = db.getDocument(docId);
        if (!isSuccess(response)) return null;
        return response.result;
    } else {
        return {};
    }
}));
list.packMe = false;
list.push("chaise.document.list.picker", "picked");
list.push("chaise.document.detail.updater", "updated");
list.pull("chaise.database.list.picker", "dbName");
list.pull("chaise.host.list.picker", "host");
