var couchServer = msjs.require("chaise.couch.server");
var creator = msjs.publish(msjs(function(msj) {
    var couch = new couchServer(msj.host);
    return couch.getDatabase(msj.dbName).remove();
}));
creator.packMe = false;
creator.push("chaise.database.remove.submitter", "dbName");
creator.pull("chaise.host.list.picker", "host");