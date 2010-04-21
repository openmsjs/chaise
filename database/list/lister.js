var server = msjs.require("chaise.couch.server");
var picker = msjs.require("chaise.host.list.picker");
var isSuccess = msjs.require("chaise.couch.issuccess");
msjs.publish(msjs(function() {
    var host = picker();
    if (!host) return [];

    var list = [];
    var couch = new server(host);
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
}).setPack(false)
.depends(picker,
         "chaise.database.create.creator", 
         "chaise.database.remove.remover",
         "chaise.database.import.importer"));
