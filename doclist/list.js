var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var emptyMsj = {offset: 0, rows: []};
var list = msjs.publish(msjs(function(msj) {
    if (msj.dbInfo) {
        var couch = new couchServer(msj.host).getDatabase(msj.dbInfo.db_name);
        var response = couch.getAllDocuments({skip: 0, limit: 30, include_docs: true});
        if (isSuccess(response)) return response.result;
    }
    return emptyMsj;
}));
list.push("chaise.dblist.picker", "dbInfo");
list.pull("chaise.hostlist.picker", "host");
list.packMe = false;
