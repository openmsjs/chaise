var couchServer = msjs.require("chaise.couch.server");
var list = msjs.publish(msjs(function(msj) {
    var doc = msj.docInfo && msj.docInfo.doc || null;
    if (msj.updated && doc) {        
        doc._rev = msj.updated.result.rev;
    }
    return doc;
}));
list.pull("chaise.document.picker", "docInfo");
list.depends("chaise.document.picker");
list.depends("chaise.database.picker");
list.depends("chaise.host.picker");
list.push("chaise.document.updater", "updated");
