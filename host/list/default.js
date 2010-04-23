var cookies = msjs.require("chaise.host.list.cookies");
var list = msjs.require("chaise.host.list.lister");
var selector = msjs.publish(msjs(function(msj) {
    var defaultHost = cookies.get("defaultHost");
    var hostList = list();
    return hostList.indexOf(defaultHost) != -1 ? defaultHost : hostList[0];
}).depends(list, "chaise.host.remove.submitter"));

msjs(function(msj) {
    var defaultHost = selector();
    if (defaultHost) cookies.set("defaultHost", defaultHost, -1);
}).depends(selector);
