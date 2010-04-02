var couchServer = msjs.require("chaise.couch.server");
var list = msjs.publish(msjs(function(msj) {
    var doc = msj.docInfo && msj.docInfo.doc || null;
    if (msj.updated && doc) {        
        doc._rev = msj.updated.result.rev;
    }
    return doc;
}));
list.pull("chaise.doclist.picker", "docInfo");
list.depends("chaise.doclist.picker");
list.depends("chaise.dblist.picker");
list.depends("chaise.hostlist.picker");
list.push("chaise.document.updater", "updated");
