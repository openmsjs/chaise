var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var emptyMsj = {offset: 0, rows: []};
var list = msjs.publish(msjs(function(msj) {
    if (msj.dbInfo) {
        var couch = new couchServer(msj.host).getDatabase(msj.dbInfo.db_name);
        var response = couch.getAllDocuments({skip: 0, limit: 30});
        if (isSuccess(response)) return response.result;
    }
    return emptyMsj;
}));
list.pull("chaise.database.list.picker", "dbInfo");
list.depends("chaise.database.list.picker");
list.pull("chaise.host.picker", "host");
list.depends("chaise.document.updater"); // refetch when document is updated
list.packMe = false;
