var cookies = msjs.require("chaise.host.cookies");
var getHosts = msjs.require("chaise.host.gethosts");
var adder = msjs.publish(msjs(function(msj) {
    var hosts = getHosts();
    hosts.push(msj.host);
    cookies.set("hosts", msjs.toJSON(hosts), -1);
    return true;
}));
adder.push("chaise.host.submitter", "host");