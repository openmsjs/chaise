var el = msjs.require("chaise.document.view.element");
var saveForm = el.find("form");
var initializer = msjs(function(msj) {
    saveForm.find("[name=designName]").val(msj.picked.designName);
    saveForm.find("[name=viewName]").val(msj.picked.viewName);
});
initializer.push("chaise.document.list.type.picker", "picked");

var cancelSave = msjs.require("chaise.document.view.cancelsave");
var saveLink = el.find("a.save");
var status = el.find("span.status");
saveLink.click(function(){
    if (el.hasClass("saving")) {
        cancelSave();
    } else {
        el.addClass("saving");
        saveLink.text("Cancel save");
        status.text("");
    }
    return false;
});

var textarea = el.find("pre");
var validateCode = msjs.require("chaise.document.view.validatecode");
var submitter = msjs();
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
            cancelSave();
        } catch (e) {
            status.text(e);
        }

    }
});

var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var saver = msjs.publish(msjs(function(msj) {
    var db = new couchServer(msj.host).getDatabase(msj.dbName);

    var designId = "_design/" + msj.update.design;
    var response = db.getDocument(designId);
    var designDoc;
    if (isSuccess(response)) {
        designDoc = response.result;
        var assigned = false;
        for (var k in designDoc.views) {
            if (k == msj.update.view) {
                designDoc.views[k] = msj.update.doc;
                assigned = true;
                break;
            }
        }
        if (!assigned) {
            designDoc.views[msj.update.view] = msj.update.doc;
        }
    } else {
        var views = {};
        views[msj.update.view] = msj.update.doc;
        designDoc = { _id: designId, views: views };        
    }

    response = db.writeDocument(designDoc);
    if (!isSuccess(response)) {
        msjs.log("Problems writing design document", response);
        return {ok: false, status: "Problems writing design document."};
    }

    return {ok: true, status: "Successfully saved!"} ;
}));
saver.packMe = false;
saver.push(submitter, "update");
saver.pull("chaise.database.list.picker", "dbName");
saver.pull("chaise.host.list.picker", "host");
