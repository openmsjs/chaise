var server = msjs.require("chaise.couch.server");
var picker = msjs.require("chaise.host.list.picker");
var submitter = msjs.require("chaise.database.remove.submitter");
msjs.publish(msjs(function() {
    (new server(picker())).getDatabase(submitter()).remove();
}).setPack(false).depends(submitter));
