var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var list = msjs.publish(msjs(function(msj) {
    var db = new couchServer(msj.host).getDatabase(msj.dbInfo.db_name);
    var response = db.getDocument(msj.docInfo.id);
    if (!isSuccess(response)) return null;
    return response.result;
}));
list.packMe = false;
list.pull("chaise.document.picker", "docInfo");
list.depends("chaise.document.picker");
list.depends("chaise.document.updater");
list.pull("chaise.database.picker", "dbInfo");
list.pull("chaise.host.picker", "host");
