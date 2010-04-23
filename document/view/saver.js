/*
 * Copyright (c) 2010 Sharegrove Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

var el = msjs.require("chaise.document.view.element");
var saveForm = el.find("form");
var picker = msjs.require("chaise.document.list.type.picker");
msjs(function() {
    var picked = picker();
    saveForm.find("[name=designName]").val(picked.designName);
    saveForm.find("[name=viewName]").val(picked.viewName);
}).depends(picker);


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

var textarea = el.find(".editor");
var validateCode = msjs.require("chaise.document.view.validatecode");
var submitter = msjs();
saveForm.submit(function() {
    var design = $.trim(saveForm.find("[name=designName]").val());
    var view = $.trim(saveForm.find("[name=viewName]").val());
    if (design && view) {
        try {
            var validatedDoc = validateCode(textarea);
            if (validatedDoc) {
                submitter({design: design,
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
var dbName = msjs.require("chaise.database.list.picker");
var host = msjs.require("chaise.host.list.picker");
msjs.publish(msjs(function(msj) {
    var db = new couchServer(host()).getDatabase(dbName());

    var updated = submitter();
    var designId = "_design/" + updated.design;
    var response = db.getDocument(designId);
    var designDoc;
    if (isSuccess(response)) {
        designDoc = response.result;
        var assigned = false;
        for (var k in designDoc.views) {
            if (k == updated.view) {
                designDoc.views[k] = updated.doc;
                assigned = true;
                break;
            }
        }
        if (!assigned) {
            designDoc.views[updated.view] = updated.doc;
        }
    } else {
        var views = {};
        views[updated.view] = updated.doc;
        designDoc = { _id: designId, views: views };        
    }

    response = db.writeDocument(designDoc);
    if (!isSuccess(response)) {
        msjs.log("Problems writing design document", response);
        return {ok: false, status: "Problems writing design document."};
    }

    return {ok: true, status: "Successfully saved!"} ;
}).setPack(false).depends(submitter));
