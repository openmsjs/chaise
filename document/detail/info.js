var server = msjs.require("chaise.couch.server");
var dbPicker = msjs.require("chaise.database.list.picker");
var hostPicker = msjs.require("chaise.host.list.picker");
var isSuccess = msjs.require("chaise.couch.issuccess");
var docPicker = msjs.require("chaise.document.list.picker");
var docUpdater = msjs.require("chaise.document.detail.updateddoc");
msjs.publish(msjs(function() {
    var host = hostPicker();
    var dbName = dbPicker();
    if (!host) return;
    if (!dbName) return;

    var db = new server(host).getDatabase(dbName);
    var docId = null;
    var info = docPicker.ifUpdated();
    var updated = docUpdater.ifUpdated();
    if (info) {
        docId = info.id;
    } else if (updated) {
        docId = updated.id;
    } else {
        return;
    }
 
    if (docId) {
        var response = db.getDocument(docId);
        if (!isSuccess(response)) return null;
        return response.result;
    } else {
        return {};
    }
}).setPack(false).depends(docPicker, docUpdater));

