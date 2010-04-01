var list = msjs.publish(msjs(function(msj) {
    var couch = new (msjs.require("chaise.couch.server"))(msj.host);
    var list = [];
    $.each(couch.getDatabaseList(), function(i, dbName) {
        var db = couch.getDatabase(dbName);
        list.push(db.getInfo());
    });
    return list;
}));
list.push("chaise.hostlist.picker", "host");
list.packMe = false;
