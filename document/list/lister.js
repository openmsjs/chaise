var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var emptyMsj = {offset: 0, rows: []};
var list = msjs.publish(msjs(function(msj) {
    if (msj.dbName) {
        var couch = new couchServer(msj.host).getDatabase(msj.dbName);
        var response = couch.getAllDocuments({skip: 0, limit: 30});
        if (isSuccess(response)) return response.result;
    }
    return emptyMsj;
}));
list.pull("chaise.database.list.picker", "dbName");
list.depends("chaise.database.list.picker");
list.pull("chaise.host.list.picker", "host");
list.depends("chaise.document.detail.updater"); // refetch when document is updated
list.depends("chaise.document.remove.remover"); // refetch when document is removed
list.packMe = false;
