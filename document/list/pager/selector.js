var selector = msjs.publish(msjs(function(msj) {
    if (msj.documentPage) return msj.documentPage;
    if (msj.viewPage) return msj.viewPage;
    return 1;
}));
selector.depends("chaise.database.list.picker");
selector.depends("chaise.document.list.pagesize.selector");
selector.depends("chaise.document.list.type.picker");
selector.push("chaise.document.list.jumper.page", "documentPage");
selector.push("chaise.document.view.jumper.page", "viewPage");
