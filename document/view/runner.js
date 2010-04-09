var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var emptyMsj = {offset: 0, rows: []};
var runner = msjs.publish(msjs(function(msj) {
    var db = new couchServer(msj.host).getDatabase(msj.dbName);
    var response = db.runTemporaryView(msj.view);
    if (isSuccess(response)) {
        return response.result;
    } 
    return emptyMsj;
}));
runner.packMe = false;
runner.push("chaise.document.view.submitter", "view");
runner.pull("chaise.database.list.picker", "dbName");
runner.pull("chaise.host.list.picker", "host");
