var couchServer = msjs.require("chaise.couch.server");
var isSuccess = msjs.require("chaise.couch.issuccess");
var hostPicker = msjs.require("chaise.host.list.picker");
var list = msjs.publish(msjs(function() {
    var host = hostPicker.getMsj();
    if (!host) return [];

    var list = [];
    var couch = new couchServer(host);
    var response = couch.getDatabaseList();       
    if (isSuccess(response)) {
        $.each(response.result, function(i, dbName) {
            var db = couch.getDatabase(dbName);
            var response = db.getInfo();
            if (isSuccess(response)) {
                list.push(response.result);
            }
        });
    }
    return list;
}));
list.depends(hostPicker);
list.depends("chaise.database.create.creator");
list.depends("chaise.database.remove.remover");
list.depends("chaise.database.import.importer");
list.packMe = false;
