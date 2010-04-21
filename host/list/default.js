var cookies = msjs.require("chaise.host.list.cookies");
var list = msjs.require("chaise.host.list.lister");
var selector = msjs.publish(msjs(function(msj) {
    return cookies.get("defaultHost") || list()[0] || null;
}).depends(list));

msjs(function(msj) {
    cookies.set("defaultHost", selector(), -1);
}).depends(selector);
