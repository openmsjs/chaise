var cookies = msjs.require("chaise.host.list.cookies");
var list = msjs.require("chaise.host.list.lister");
var selector = msjs.publish(msjs(function(msj) {
    return cookies.get("defaultHost") || list()[0] || null;
}).depends(list));

msjs(function(msj) {
    var defaultHost = selector();
    if (defaultHost) cookies.set("defaultHost", defaultHost, -1);
}).depends(selector);
