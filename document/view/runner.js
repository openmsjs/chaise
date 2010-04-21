var runner = msjs.publish(msjs());

var el = msjs.require("chaise.document.view.element");
var runLink = el.find("a.run");
var status = el.find("span.status");
var textarea = el.find(".editor");
var validateCode = msjs.require("chaise.document.view.validatecode");
runLink.click(function(){
    try {
        var validatedDoc = validateCode(textarea);
        if (validatedDoc) runner(validatedDoc);
    } catch (e) {
        status.text(e);
    }
    return false;
});
