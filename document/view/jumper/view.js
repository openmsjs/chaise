var viewInfo = msjs.require("chaise.document.view.jumper.viewinfo");
msjs.publish(msjs(function() {
    return viewInfo().rows[0];
}).depends(viewInfo));
