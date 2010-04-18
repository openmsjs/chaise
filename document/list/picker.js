var picker = msjs.publish(msjs(function(msj) {
    if (msj.jumpDoc) return msj.jumpDoc;
    return null;
}));
picker.push("chaise.document.list.jumper.selector", "jumpDoc");
picker.depends("chaise.database.list.picker");
picker.depends("chaise.document.list.type.picker");
