var cookies = msjs.require("chaise.host.cookies");
msjs.publish(function() {
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
});
