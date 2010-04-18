var pageSizeSelector = msjs.require("chaise.document.list.pagesize.selector");
var page = msjs.publish(msjs(function(msj) {
    var pageSize = pageSizeSelector.getMsj();
    return Math.floor(msj.viewInfo.offset / pageSize) + 1;
}));
page.push("chaise.document.view.jumper.viewinfo", "viewInfo");
