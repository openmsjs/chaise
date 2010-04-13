var selector = msjs.publish(msjs(function() {
    return 1;
}));
selector.depends("chaise.database.list.picker");
selector.depends("chaise.document.list.pagesize.selector");
selector.depends("chaise.document.list.type.picker");
