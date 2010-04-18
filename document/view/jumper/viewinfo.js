var hostPicker = msjs.require("chaise.host.list.picker");
var dbPicker = msjs.require("chaise.database.list.picker");
var pageSizeSelector = msjs.require("chaise.document.list.pagesize.selector");
var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var page = msjs.publish(msjs(function(msj) {
    var host = hostPicker.getMsj();
    var dbName = dbPicker.getMsj();
    var db = new couchServer(host).getDatabase(dbName);
    var options = {key: msj.key};
    if (msj.reduceOpts) options.reduce = false;
    var response = db.getView(msj.type.designName, msj.type.viewName, options);
    if (isSuccess(response)) {
        return response.result;
    }
}));
page.packMe = false;
page.push("chaise.document.view.jumper.selector", "key");
page.pull("chaise.document.view.reduce.submitter", "reduceOpts");
page.pull("chaise.document.list.type.picker", "type");
