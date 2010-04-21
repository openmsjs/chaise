var tempView = msjs.require("chaise.document.view.runner");
msjs.publish(msjs(function() {
    if (tempView.isUpdated()) {
        var view = this();
        view.viewDoc = tempView();
        view.isTempView = true;
        return view;
    }
    return { type: "allDocs" }; // default
}).depends(tempView, "chaise.database.list.picker"));
