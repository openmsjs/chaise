var cookies = msjs.require("chaise.host.list.cookies");
var selector = msjs.publish(msjs(function(msj) {
    return cookies.get("defaultHost") || msj.list[0] || null;
}));
selector.pull(selector.depends("chaise.host.list.lister"), "list");

var setter = msjs(function(msj) {
    cookies.set("defaultHost", msj.selected, -1);
});
setter.push(selector, "selected");
