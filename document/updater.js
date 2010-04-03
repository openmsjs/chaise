var updater = msjs.publish(msjs(function(msj){
    var couch = new (msjs.require("chaise.couch.server"))(msj.host);
    return couch.getDatabase(msj.dbInfo.db_name).writeDocument(msj.doc);
}));
updater.packMe = false;
updater.push("chaise.document.submitter", "doc");
updater.pull("chaise.database.picker", "dbInfo");
updater.pull("chaise.host.picker", "host");
