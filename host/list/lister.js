var cookies = msjs.require("chaise.host.list.cookies");
var getHosts = function() {
    var cookie = cookies.get("hosts");
    var hosts = [];
    if (cookie) {
        try {
            var hostsEval = eval("(" + cookie + ")");
            if ($.isArray(hostsEval)) hosts = hostsEval;
        } catch (e) {
        }
    }
    return hosts;
};
var list = msjs.publish(msjs(function() {
    var hosts = getHosts();
    if (msj.add) {
        hosts.push(msj.add);
    } else if (msj.remove) {
        hosts.splice(hosts.indexOf(msj.remove), 1);
    }
    cookies.set("hosts", msjs.toJSON(hosts), -1);
    return hosts;
}));
list.push("chaise.host.add.submitter", "add");
list.push("chaise.host.remove.submitter", "remove");
list.onLoad = function() {
    this.update(getHosts());
};
