var documentPage = msjs.require("chaise.document.list.jumper.page");
var viewPage = msjs.require("chaise.document.view.jumper.page");
msjs.publish(msjs(function() {
    return documentPage.ifUpdated() || viewPage.ifUpdated() || 1;
}).depends(documentPage, viewPage,
    "chaise.database.list.picker", 
    "chaise.document.list.pagesize.selector",
    "chaise.document.list.type.picker"));
