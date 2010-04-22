var jumpDoc = msjs.require("chaise.document.list.jumper.selector");
var jumpView = msjs.require("chaise.document.view.jumper.view");
var updatedDoc = msjs.require("chaise.document.detail.updateddoc");
msjs.publish(msjs(function() {
    return jumpDoc.ifUpdated() || jumpView.ifUpdated() || updatedDoc.ifUpdated() || null;
}).depends(jumpDoc, jumpView, updatedDoc, "chaise.database.list.picker",
     "chaise.document.list.type.picker"));
