var picker = msjs.publish(msjs(function(msj){
    // load the first host by default
    return msj.list[0] || null;
}));
picker.push("chaise.host.list.lister", "list");
picker.depends("chaise.host.remove.submitter");
