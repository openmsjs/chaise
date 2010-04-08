var isSuccess = msjs.require("chaise.couch.issuccess");
var importer = msjs.publish(msjs(function(msj) {
    var dbParam = "_all"; // do all for now
    var couchData = msjs.require(msj.packageName);
    var dbNames = (function() {
        var dbNames = null;
        if (dbParam == "_all") {
            dbNames = [];
            for (var dbName in couchData) dbNames.push(dbName);
        } else if (dbParam) {
            dbNames = dbParam.split(",");
        }
        return dbNames;
    })();

    var reset = false; // only allow reload for now
    var couch = new (msjs.require("chaise.couch.server"))(msj.host);
    jQuery.each(dbNames, function(i, dbName) {
        var db = couch.getDatabase(dbName);

        var response = db.getInfo();
        var created = reset;
        if (reset) {
            if (isSuccess(response)) db.remove();
            db.create();
        } else {
            if (!isSuccess(response)) {
                db.create();
                created = true;
            }
        }

        if (couchData[dbName].views) {
            jQuery.each(couchData[dbName].views, function(i, view) {
                db.writeDocument(view);
            });
        }

        if (created) {
            if (couchData[dbName].docs) {
                jQuery.each(couchData[dbName].docs, function(i, doc) {
                    db.writeDocument(doc);
                });
            }
        }
    });

    return true;
}));
importer.packMe = false;
importer.push("chaise.database.import.submitter", "packageName");
importer.pull("chaise.host.list.picker", "host");
