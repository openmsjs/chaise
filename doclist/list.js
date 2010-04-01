var couchServer = msjs.require("chaise.couch.server");
var list = msjs.publish(msjs(function(msj) {
    if (!msj.dbInfo) return;
    var couch = new couchServer(msj.host).getDatabase(msj.dbInfo.db_name);
    return couch.getAllDocuments({skip: 0, limit: 30, include_docs: true});
}));
list.push("chaise.dblist.picker", "dbInfo");
list.pull("chaise.hostlist.picker", "host");
list.packMe = false;
