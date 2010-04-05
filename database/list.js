var isSuccess = msjs.require("chaise.couch.issuccess");
var list = msjs.publish(msjs(function(msj) {
    var couch = new (msjs.require("chaise.couch.server"))(msj.host);
    var response = couch.getDatabaseList();       
    var list = [];
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
list.pull("chaise.host.picker", "host");
list.depends("chaise.host.picker");
list.depends("chaise.database.create");
list.packMe = false;