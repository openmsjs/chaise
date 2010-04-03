var cookies = msjs.require("chaise.host.cookies");
var getHosts = msjs.require("chaise.host.gethosts");
var updater = msjs.publish(msjs(function(msj) {
    var hosts = getHosts();
    var updateHost = msj.update.host;
    switch (msj.update.type) {
        case "add":
            hosts.push(updateHost);
            break;
        case "remove":
            hosts.splice(hosts.indexOf(updateHost), 1);
            break;
    }
    cookies.set("hosts", msjs.toJSON(hosts), -1);
    return true;
}));
updater.push("chaise.host.submitter", "update");