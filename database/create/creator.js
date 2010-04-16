var couchServer = msjs.require("chaise.couch.server");
var creator = msjs.publish(msjs(function(msj) {
    return new couchServer(msj.host).getDatabase(msj.dbName).create();
}));
creator.packMe = false;
creator.push("chaise.database.create.submitter", "dbName");
creator.pull("chaise.host.list.picker", "host");