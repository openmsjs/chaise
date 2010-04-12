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
    options.skip = (msj.page-1) * msj.pageSize;
    options.limit = msj.pageSize;
    options.descending = msj.descending;

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

        if (!options.reduce && options.group_level != null){
            delete options.group_level;
        }

        response = couch.getView(design, view, options);
        break;
    }

    return isSuccess(response) ? response.result : emptyMsj;
}));
list.pull(list.depends("chaise.database.list.picker"), "dbName");
list.pull(list.depends("chaise.document.list.options.submitter"), "options");
list.pull(list.depends("chaise.document.list.type.picker"), "type");
list.pull(list.depends("chaise.document.list.pagesize.selector"), "pageSize");
list.pull(list.depends("chaise.document.list.pager.selector"), "page");
list.pull(list.depends("chaise.document.list.descending"), "descending");
list.pull("chaise.host.list.picker", "host");
list.depends("chaise.document.detail.updater"); // refetch when document is updated
list.depends("chaise.document.remove.remover"); // refetch when document is removed
list.packMe = false;
