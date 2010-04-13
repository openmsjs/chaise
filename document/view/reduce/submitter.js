var submitter = msjs.publish(msjs(function(msj) {
    var isView = msj.type !== "all" && msj.type != "design";
    if (isView) {
        var view = msj.type.view;
        var doc = msj.type.doc;
        if (doc.views[view].reduce) {
            return {};
        }
    }
    return null;
}));
submitter.depends("chaise.database.list.picker");
submitter.pull(submitter.depends("chaise.document.list.type.picker"), "type");
