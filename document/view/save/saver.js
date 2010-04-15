// Do this after to avoid adding handlers to save renderer
var saveRenderer = msjs.require("chaise.document.view.save.renderer");
saveRenderer.insertBefore(el.find("span"));

//var saver = msjs.require("chaise.document.view.save.saver");
var doSave = msjs(function() {
    var updateDoc = run();
    if (updateDoc) {
        
    }
});
doSave.push("chaise.document.view.save.submitter", "save");

var saveCssId = dom.getCssId(saveRenderer[0]);
dom.addCss(saveCssId, {
    display: "none"
});
dom.addCss(cssId + ".editing " + saveCssId, {
    display: "inline"
});
dom.addCss(cssId + " " + saveCssId, {
    display: "none"
});
