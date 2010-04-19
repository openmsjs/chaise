var picker = msjs.publish(msjs(function(msj){
    // load the first host by default
    return msj.defaultHost || null;
}));
picker.push("chaise.host.list.lister", "list");
picker.depends("chaise.host.remove.submitter");
picker.pull(picker.depends("chaise.host.list.default"), "defaultHost");
