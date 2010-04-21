var defaultHost = msjs.require("chaise.host.list.default");
msjs.publish(msjs(function(){
    return defaultHost() || null;
}).depends(defaultHost,
           "chaise.host.list.lister",
           "chaise.host.remove.submitter"));
