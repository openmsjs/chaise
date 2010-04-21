var couchServer = msjs.require("chaise.couch.server");
var doc = msjs.require("chaise.document.remove.submitter");
var host = msjs.require("chaise.host.list.picker");
var database = msjs.require("chaise.database.list.picker");
var remover = msjs.publish(msjs(function() {
    return (new couchServer(host()))
           .getDatabase(database())
           .removeDocument(doc());
}).setPack(false).depends(doc));

