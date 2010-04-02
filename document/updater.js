var updater = msjs.publish(msjs(function(msj){
    var couch = new (msjs.require("chaise.couch.server"))(msj.host);
    var response = couch.getDatabase(msj.dbInfo.db_name).writeDocument(msj.doc);
    msjs.log(msj.dbInfo.db_name)
    msjs.log(msj.doc)
    msjs.log(response)
}));
updater.packMe = false;
updater.push("chaise.document.submitter", "doc");
updater.pull("chaise.dblist.picker", "dbInfo");
updater.pull("chaise.hostlist.picker", "host");
