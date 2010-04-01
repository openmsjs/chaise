var couchServer = msjs.require("chaise.couch.server");
var list = msjs.publish(msjs(function(msj) {
    return msj.docInfo && msj.docInfo.doc || null;
}));
list.push("chaise.doclist.picker", "docInfo");
list.depends("chaise.dblist.picker");
list.depends("chaise.hostlist.picker");
