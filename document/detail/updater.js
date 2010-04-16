var couchServer = msjs.require("chaise.couch.server");
var updater = msjs.publish(msjs(function(msj){
    var couch = new couchServer(msj.host);
    return couch.getDatabase(msj.dbName).writeDocument(msj.doc);
}));
updater.packMe = false;
updater.push("chaise.document.detail.submitter", "doc");
updater.pull("chaise.database.list.picker", "dbName");
updater.pull("chaise.host.list.picker", "host");
