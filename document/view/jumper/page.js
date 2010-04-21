var pageSize = msjs.require("chaise.document.list.pagesize.selector");
var viewInfo = msjs.require("chaise.document.view.jumper.viewinfo");
msjs.publish(msjs(function() {
    return Math.floor(viewInfo().offset / pageSize()) + 1;
}).depends(viewInfo));
