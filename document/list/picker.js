var jumpDoc = msjs.require("chaise.document.list.jumper.selector");
var jumpView = msjs.require("chaise.document.view.jumper.view");
msjs.publish(msjs(function(msj) {
    if (jumpDoc.isUpdated()) return jumpDoc();
    if (jumpView.isUpdated()) return jumpView();
    return null;
}).depends(jumpDoc, jumpView, "chaise.database.list.picker",
     "chaise.document.list.type.picker"));
