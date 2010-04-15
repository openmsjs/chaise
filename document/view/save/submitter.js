var submitter = msjs.publish(msjs());
var el = msjs.require("chaise.document.view.element");

var initializer = msjs(function(msj) {
    saveForm.find("[name=designName]").val(msj.type.design);
    saveForm.find("[name=viewName]").val(msj.type.view);
    saveForm.data("viewInfo", msj.type);
});
initializer.push("chaise.document.list.type.picker", "type");

var cancelSave = msjs.require("chaise.document.view.save.cancelsave");
var saveLink = el.find("a.save");
saveLink.click(function(){
    if (el.hasClass("saving")) {
        cancelSave();
    } else {
        el.addClass("saving");
        saveLink.text("Cancel save");
    }
    return false;
});

var saveForm = el.find("form");
var status = el.find("span.status");
var textarea = el.find("pre");
var validateCode = msjs.require("chaise.document.view.validatecode");
saveForm.submit(function() {
    var design = $.trim(saveForm.find("[name=designName]").val());
    var view = $.trim(saveForm.find("[name=viewName]").val());
    if (design && view) {
        try {
            var validatedDoc = validateCode(textarea);
            if (validatedDoc) {
                submitter.update({design: design,
                                  view: view, 
                                  doc: validatedDoc});
            }
        } catch (e) {
            status.text(e);
        }

    }
});
