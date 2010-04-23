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

var el = msjs.publish(msjs.require("chaise.document.view.element"));

var showLink = el.find("a.show");
showLink.click(function(){
    if (el.hasClass("showing")) {
        el.removeClass("showing");
        showLink.text("Show code");
        stopEdit();
    } else {
        el.addClass("showing");
        showLink.text("Hide code");    
    }
    return false;
});

var editor = el.find(".editor");
var setDocText = msjs.require("chaise.document.setdoctext");
var picker = msjs.require("chaise.document.list.type.picker");
var initializer = msjs(function() {
    var picked = picker();
    var viewDoc = picked.viewDoc;
    editor.text("");
    if (viewDoc) {
        if (!picked.isTempView) stopEdit(true);

        if (viewDoc.map)    viewDoc.map = eval("(" + viewDoc.map + ")");
        if (viewDoc.reduce) viewDoc.reduce = eval("(" + viewDoc.reduce + ")"); 

        setDocText(viewDoc, editor);
    }

    el.css("display", viewDoc ? "" : "none");
}).depends(picker);


var startEdit = function(rollback) {
    editor.data("rollback", editor.contents().clone());
    editor.attr("contenteditable", "true");
    editor.focus();

    editLink.text("Cancel edit");

    editor.keypress(function(event) {
        if (event.keyCode == "27") {
            stopEdit();
            return false;
        } 
    });

    el.addClass("editing");
};

var cancelSave = msjs.require("chaise.document.view.cancelsave");
var stopEdit = function(ignoreRollback) {
    if (!el.hasClass("editing")) return;

    el.removeClass("editing");

    editor.unbind("keypress");

    if (!ignoreRollback && editor.data("rollback")) {
        editor.text("");
        $.each(editor.data("rollback"), function(i, content) {
            editor.append(content);
        });
    }

    editLink.text("Edit");

    editor.blur();
    editor.removeAttr("contenteditable");

    cancelSave();
    status.text("");
};


var status = el.find("span.status");
var editLink = el.find("a.edit");
editLink.click(function(){
    if (el.hasClass("editing")) {
        stopEdit();
    } else {
        startEdit();
    }
    return false;
});


var saver = msjs.require("chaise.document.view.saver");
msjs(function(msj) {
    status.text(saver().status);
}).depends(saver); 


var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    display: "inline"
});
dom.addCss(cssId + " a", {
    marginRight: "5px"
});

dom.addCss(cssId + " .editor", {
    border: "2px solid #CACACA",
    padding: "2px",
    outline: "none",
    whiteSpace: "pre-wrap",       /* css-3 */
    overflowX: "auto",
    display: "none",
    color: "#6A6A6A"
});

dom.addCss(cssId + " a.edit," +
           cssId + " a.run," +
           cssId + " a.save", {
    display: "none"
});
dom.addCss(cssId + ".showing a.edit," +
           cssId + ".editing a.run," + 
           cssId + ".editing a.save", {
    display: "inline"
});
dom.addCss(cssId + ".showing .editor", {
    display: "block"
});
dom.addCss(cssId + ".editing .editor", {
    display: "block",
    borderColor: "#8A8279 #DED6CA #DED6CA #8A8279",
    color: "black"
});
dom.addCss(cssId + " span.status", {
    display: "block",
    color: "red",
    fontWeight: "bold"
});


dom.addCss(cssId + " table", {
    border: "none",
    width: "400px",
    padding: "10px 0px"
});
dom.addCss(cssId + " th", {
    color: "#4A4A4A",
    textAlign: "right"
});
dom.addCss(cssId + " form", {
    display: "none",
    backgroundColor: "#FAFAFA",
    border: "1px solid #CACACA",
    borderBottom: "0px"
});
dom.addCss(cssId + ".saving form", {
    display: "block"
});
