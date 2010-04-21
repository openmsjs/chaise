var server = msjs.require("chaise.couch.server");
var submitter = msjs.require("chaise.database.create.submitter");
var picker = msjs.require("chaise.host.list.picker");
msjs.publish(msjs(function(msj) {
    return new server(picker()).getDatabase(submitter()).create();
}).depends(submitter).setPack(false));
