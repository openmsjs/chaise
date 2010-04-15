var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var saver = msjs.publish(msjs(function(msj) {
    var db = new couchServer(msj.host).getDatabase(msj.dbName);

    var designId = "_design/" + msj.update.design;
    var response = db.getDocument(designId);
    var designDoc;
    if (isSuccess(response)) {
        designDoc = response.result;
        var assigned = false;
        for (var k in designDoc.views) {
            if (k == msj.update.view) {
                designDoc.views[k] = msj.update.doc;
                assigned = true;
                break;
            }
        }
        if (!assigned) {
            designDocs.views[msj.update.view] = msj.update.doc;
        }
    } else {
        var views = {};
        views[msj.update.view] = msj.update.doc;
        designDoc = { _id: designId, views: views };        
    }

    response = db.writeDocument(designDoc);
    if (!isSuccess(response)) {
        msjs.log("Problems writing design document", response);
        return {ok: false, status: "Problems writing design document."};
    }

    return {ok: true, status: "Successfully saved!"} ;
}));
saver.packMe = false;
saver.push("chaise.document.view.save.submitter", "update");
saver.pull("chaise.database.list.picker", "dbName");
saver.pull("chaise.host.list.picker", "host");
