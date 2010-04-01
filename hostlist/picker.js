var picker = msjs.publish(msjs(function(msj){
    // load the first host by default
    return msj.list[0];
}));
picker.push("chaise.hostlist.list", "list");
