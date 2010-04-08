var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var list = msjs.publish(msjs(function(msj) {
    if (msj.type == "all" || msj.type == "design") return null;

    var viewName = msj.type.view;
    var doc = msj.type.doc;
    return doc.views[viewName];
}));
list.packMe = false;
list.push("chaise.document.list.type.picker", "type");
//list.push("chaise.document.detail.updater", "updated");
