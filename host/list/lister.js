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
var add = msjs.require("chaise.host.add.submitter");
var remove = ("chaise.host.remove.submitter");
var lister = msjs.publish(msjs(function() {
    var hosts = getHosts();
    if (add.isUpdated()) {
        hosts.push(add());
    } else if (remove.isUpdated()) {
        hosts.splice(hosts.indexOf(remove()), 1);
    }
    cookies.set("hosts", msjs.toJSON(hosts), -1);
    return hosts;
}).depends(add, remove));

lister.onLoad = function() {
    this.update(getHosts());
};
