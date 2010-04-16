var couchServer = msjs.require("chaise.couch.server");
var remover = msjs.publish(msjs(function(msj) {
    var db = new couchServer(msj.host).getDatabase(msj.database);
    return db.removeDocument(msj.doc);
}));
remover.packMe = false;
remover.push("chaise.document.remove.submitter", "doc");
remover.pull("chaise.host.list.picker", "host");
remover.pull("chaise.database.list.picker", "database");
