var creator = msjs.publish(msjs(function(msj) {
    var couch = new (msjs.require("chaise.couch.server"))(msj.host);
    return couch.getDatabase(msj.dbName).create();
}));
creator.packMe = false;
creator.push("chaise.database.create.submitter", "dbName");
creator.pull("chaise.host.list.picker", "host");