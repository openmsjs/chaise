var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var emptyMsj = {offset: 0, rows: []};
var cleanGroupingOpts = function(options) {
    if (options.reduce != null) delete options.reduce;
    if (options.group != null) delete options.group;
    if (options.group_level != null) delete options.group_level;
}
var runner = msjs.publish(msjs(function(msj) {
    var db = new couchServer(msj.host).getDatabase(msj.dbName);

    var options = msj.options;
    if (options.skip < 0) {
        options.skip = 0;        
    }
    if (options.limit == null || options.limit < 0) {
        options.limit = 10;
    } else if (100 < options.limit) {
        options.limit = 100;
    }

    var response = db.runTemporaryView(msj.view, options);
    if (isSuccess(response)) {
        return response.result;
    } 
    return emptyMsj;
}));
runner.packMe = false;
runner.pull("chaise.document.list.options.submitter", "options");
runner.push("chaise.document.view.submitter", "view");
runner.pull("chaise.database.list.picker", "dbName");
runner.pull("chaise.host.list.picker", "host");
