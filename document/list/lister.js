var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var emptyMsj = {offset: 0, rows: []};
var list = msjs.publish(msjs(function(msj) {
    if (!msj.dbName) return emptyMsj;

    var couch = new couchServer(msj.host).getDatabase(msj.dbName);
    var options = msj.options;
    var response;
    switch (msj.type){
    case "all":
        response = couch.getAllDocuments(options);
        break;
    case "design":
        options.startkey = "_design/";
        options.endkey = "_design0";
        response = couch.getAllDocuments(options);
        break;
    default: // design object
        var design = msj.type.design;
        var view = msj.type.view;
        var doc = msj.type.doc;
        // default reduce false if not set
        if (options.reduce == null && doc.views[view].reduce) {
            options.reduce = false;
        }
        response = couch.getView(design, view, options);
        break;
    }

    return isSuccess(response) ? response.result : emptyMsj;
}));
list.pull("chaise.database.list.picker", "dbName");
list.depends("chaise.database.list.picker");
list.pull("chaise.document.list.options.submitter", "options");
list.depends("chaise.document.list.options.submitter");
list.pull("chaise.document.list.type.picker", "type");
list.depends("chaise.document.list.type.picker");
list.pull("chaise.host.list.picker", "host");
list.depends("chaise.document.detail.updater"); // refetch when document is updated
list.depends("chaise.document.remove.remover"); // refetch when document is removed
list.packMe = false;
