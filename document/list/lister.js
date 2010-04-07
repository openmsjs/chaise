var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var emptyMsj = {offset: 0, rows: []};
var list = msjs.publish(msjs(function(msj) {
    if (msj.dbName) {
        var couch = new couchServer(msj.host).getDatabase(msj.dbName);
        var response;
        switch (msj.type){
        case "all":
            response = couch.getAllDocuments({skip: 0, limit: 30});
            break;
        case "design":
            response = couch.getAllDocuments({startkey: "_design/",
                                              endkey: "_design0",
                                              skip: 0, limit: 30});
            break;
        default: // design object
            var design = msj.type.design;
            var view = msj.type.view;
            var doc = msj.type.doc;
            var queryMap;
            if (doc.views[view].reduce) {
                queryMap = {reduce: false, descending: true};
            }
            response = couch.getView(design, view, queryMap);
            break;
        }
        if (isSuccess(response)) return response.result;
    }
    return emptyMsj;
}));
list.pull("chaise.database.list.picker", "dbName");
list.depends("chaise.database.list.picker");
list.pull("chaise.document.list.type.picker", "type");
list.depends("chaise.document.list.type.picker");
list.pull("chaise.host.list.picker", "host");
list.depends("chaise.document.detail.updater"); // refetch when document is updated
list.depends("chaise.document.remove.remover"); // refetch when document is removed
list.packMe = false;
