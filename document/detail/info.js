var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var list = msjs.publish(msjs(function(msj) {
    if (!msj.host) return;
    if (!msj.dbInfo) return;

    var db = new couchServer(msj.host).getDatabase(msj.dbInfo.db_name);
    var docId = null;
    if (msj.info) {
        docId = msj.info.id;
    } else if (msj.updated) {
        if (isSuccess(msj.updated)) {
            docId = msj.updated.result.id;
        }
        // TODO: send update error to client
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
list.push("chaise.document.list.picker", "info");
list.push("chaise.document.detail.updater", "updated");
list.pull("chaise.database.list.picker", "dbInfo");
list.pull("chaise.host.list.picker", "host");
