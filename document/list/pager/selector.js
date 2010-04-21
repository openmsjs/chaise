var documentPage = msjs.require("chaise.document.list.jumper.page");
var viewPage = msjs.require("chaise.document.view.jumper.page");
msjs.publish(msjs(function() {
    if (documentPage.isUpdated()) return documentPage();
    if (viewPage.isUpdated()) return viewPage();
    return 1;
}).depends(documentPage, viewPage,
    "chaise.database.list.picker", 
    "chaise.document.list.pagesize.selector",
    "chaise.document.list.type.picker"));
