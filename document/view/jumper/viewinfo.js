var host = msjs.require("chaise.host.list.picker");
var dbName = msjs.require("chaise.database.list.picker");
var pageSizeSelector = msjs.require("chaise.document.list.pagesize.selector");
var reduceOpts = msjs.require("chaise.document.view.reduce.submitter");
var typePicker = msjs.require("chaise.document.list.type.picker");
var key = msjs.require("chaise.document.view.jumper.selector");
var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var page = msjs.publish(msjs(function(msj) {
    var db = new couchServer(host()).getDatabase(dbName());
    var options = {key: key()};
    if (reduceOpts()) options.reduce = false;
    var type = typePicker();
    var response = db.getView(type.designName, type.viewName, options);
    if (isSuccess(response)) {
        return response.result;
    }
}).setPack(false).depends(key));
