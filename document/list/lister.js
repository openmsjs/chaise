var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var emptyMsj = {offset: 0, rows: []};
var cleanGroupingOpts = function(options) {
    if (options.reduce != null) delete options.reduce;
    if (options.group != null) delete options.group;
    if (options.group_level != null) delete options.group_level;
}
var list = msjs.publish(msjs(function(msj) {
    if (!msj.dbName) return emptyMsj;

    var couch = new couchServer(msj.host).getDatabase(msj.dbName);
    var options = msj.options;
    if (options.skip < 0) {
        options.skip = 0;        
    }
    if (options.limit == null || options.limit < 0) {
        options.limit = 10;
    } else if (100 < options.limit) {
        options.limit = 100;
    }

    var response;
    switch (msj.type){
    case "all":
        cleanGroupingOpts(options);
        response = couch.getAllDocuments(options);
        break;
    case "design":
        cleanGroupingOpts(options);
        options.startkey = "_design/";
        options.endkey = "_design0";
        response = couch.getAllDocuments(options);
        break;
    default: // design object
        var design = msj.type.design;
        var view = msj.type.view;
        var doc = msj.type.doc;
        if (doc.views[view].reduce) {
            // default reduce false if not set
            if (options.reduce == null) options.reduce = false;
        } else {
            cleanGroupingOpts(options);
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
