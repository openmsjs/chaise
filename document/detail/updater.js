var hostPicker = msjs.require("chaise.host.list.picker");
var dbPicker = msjs.require("chaise.database.list.picker");
var server = msjs.require("chaise.couch.server");
var submitter = msjs.require("chaise.document.detail.submitter");
msjs.publish(msjs(function(msj){
    (new server(hostPicker())).getDatabase(dbPicker()).writeDocument(submitter());
}).setPack(false).depends(submitter));
