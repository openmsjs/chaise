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
var toPrettyJSON = msjs.require("chaise.document.toprettyjson");
var initializer = msjs(function(msj) {
    var viewDoc = msj.picked.viewDoc;
    editor.text("");
    if (viewDoc) {
        if (!msj.picked.isTempView) stopEdit(true);
        viewDoc.map = eval("(" + viewDoc.map + ")");
        if (viewDoc.reduce) viewDoc.reduce = eval("(" + viewDoc.reduce + ")"); 
        
        $.each(toPrettyJSON(viewDoc).split("\n"), function(i, line) {
            editor.append(document.createTextNode(line)).append($("<br/>"));
        });
    }

    el.css("display", viewDoc ? "" : "none");
});
initializer.push("chaise.document.list.type.picker", "picked");


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
var saveHandler = msjs(function(msj) {
    status.text(msj.response.status);
}); 
saveHandler.push(saver, "response");


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
