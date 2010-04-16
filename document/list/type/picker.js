var picker = msjs.publish(msjs(function(msj) {
    if (msj.tempView) {
        var view = this.getMsj();
        view.viewDoc = msj.tempView;
        view.isTempView = true;
        return view;
    }
    return { type: "allDocs" }; // default
}));
picker.depends("chaise.database.list.picker");
picker.push("chaise.document.view.runner", "tempView");
