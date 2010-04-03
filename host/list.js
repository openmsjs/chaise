var getHosts = msjs.require("chaise.host.gethosts");
var list = msjs.publish(msjs(function() {
    return getHosts();
}));
list.depends("chaise.host.updater");
list.onLoad = function() {
    this.update(getHosts());
};
