var hostPicker = msjs.require("chaise.host.list.picker");
var dbPicker = msjs.require("chaise.database.list.picker");
var pageSizeSelector = msjs.require("chaise.document.list.pagesize.selector");
var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var doc = msjs.require("chaise.document.list.jumper.selector");
var updatedDoc = msjs.require("chaise.document.detail.updateddoc");
msjs.publish(msjs(function(msj) {
    var host = hostPicker.getMsj();
    var dbName = dbPicker.getMsj();
    var db = new couchServer(host).getDatabase(dbName);
    var updated = updatedDoc.ifUpdated();
    var options = {key: updated ? updated.id : doc().id};
    var response = db.getAllDocuments(options);
    if (isSuccess(response)) {
        var pageSize = pageSizeSelector.getMsj();
        var page = Math.floor(response.result.offset / pageSize) + 1;
        return page;
    }
}).setPack(false).depends(doc,updatedDoc));
