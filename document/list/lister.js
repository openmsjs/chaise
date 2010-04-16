var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var emptyMsj = {offset: 0, rows: []};
var list = msjs.publish(msjs(function(msj) {
    if (!msj.dbName) return emptyMsj;

    var couch = new couchServer(msj.host).getDatabase(msj.dbName);
    var options = {
        skip: (msj.page-1) * msj.pageSize,
        limit: msj.pageSize,
        descending: msj.descending
    };

    if (msj.reduceOpts) {
        if (msj.reduceOpts.reduce) {
            options.reduce = true;
            if (msj.reduceOpts.group) {
                options.group = true;
            } else if (msj.reduceOpts.group_level) {
                options.group_level = msj.reduceOpts.group_level;
            }
        } else {
            options.reduce = false;
        }
    }

    var response;
    switch (msj.picked.type){
        case "allDocs":
            response = couch.getAllDocuments(options);
            break;
        case "allDesignDocs":
            options.startkey = options.descending ? "_design0" : "_design/";
            options.endkey = options.descending ? "_design/" : "_design0";
            response = couch.getAllDocuments(options);
            break;
        case "view":
            if (msj.picked.isTempView) {
                response = couch.runTemporaryView(msj.picked.viewDoc, options);
            } else {
                response = couch.getView(msj.picked.designName, msj.picked.viewName, options);
            }
            break;
    }

    return isSuccess(response) ? response.result : emptyMsj;
}));
list.pull(list.depends("chaise.database.list.picker"), "dbName");
list.pull(list.depends("chaise.document.view.reduce.submitter"), "reduceOpts");
list.pull(list.depends("chaise.document.list.type.picker"), "picked");
list.pull(list.depends("chaise.document.list.pagesize.selector"), "pageSize");
list.pull(list.depends("chaise.document.list.pager.selector"), "page");
list.pull(list.depends("chaise.document.list.descending"), "descending");
list.pull("chaise.host.list.picker", "host");
list.depends("chaise.document.detail.updater"); // refetch when document is updated
list.depends("chaise.document.remove.remover"); // refetch when document is removed
list.packMe = false;
