var picker = msjs.publish(msjs(function(msj) {
    if (msj.jumpDoc) return msj.jumpDoc;
    if (msj.jumpView) return msj.jumpView;
    return null;
}));
picker.push("chaise.document.list.jumper.selector", "jumpDoc");
picker.push("chaise.document.view.jumper.view", "jumpView");
picker.depends("chaise.database.list.picker");
picker.depends("chaise.document.list.type.picker");
