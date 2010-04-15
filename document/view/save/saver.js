// var isSuccess = msjs.require("chaise.couch.issuccess");
// var couchServer = msjs.require("chaise.couch.server");
var saver = msjs.publish(msjs(function(msj) {
    msjs.log('xxx here', msj);
//    var db = new couchServer(msj.host).getDatabase(msj.dbName);

    msjs.log('view', msj.updateView);
//     var options = msj.options;
//     if (options.skip < 0) {
//         options.skip = 0;        
//     }
//     if (options.limit == null || options.limit < 0) {
//         options.limit = 10;
//     } else if (100 < options.limit) {
//         options.limit = 100;
//     }

//     var response = db.runTemporaryView(msj.view, options);
//     if (isSuccess(response)) {
//         return response.result;
//     } 
//     return emptyMsj;
}));
//saver.packMe = false;
saver.push("chaise.document.view.save.submitter", "updateView");
saver.pull("chaise.database.list.picker", "dbName");
saver.pull("chaise.host.list.picker", "host");
