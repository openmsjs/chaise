var tempView = msjs.require("chaise.document.view.runner");
msjs.publish(msjs(function() {
    var temp = tempView.ifUpdated();
    if (temp) {
        var view = this();
        view.viewDoc = temp;
        view.isTempView = true;
        return view;
    }
    return { type: "allDocs" }; // default
}).depends(tempView, "chaise.database.list.picker"));
