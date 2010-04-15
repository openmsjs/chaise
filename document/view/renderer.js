var el = msjs.publish(msjs.require("chaise.document.view.element"));

var showLink = el.find("a.show");
var editLink = el.find("a.edit");
var runLink = el.find("a.run");
var textarea = el.find("pre");
var isSuccess = msjs.require("chaise.couch.issuccess");
var toPrettyJSON = msjs.require("chaise.document.toprettyjson");
var startEdit = function(rollback) {
    textarea.data("rollback", rollback);
    textarea.attr("contenteditable", "true");
    setTimeout(function() { 
        textarea.focus();
    }, 500);
    el.addClass("editing");
};

var renderer = msjs(function(msj) {
    var type = msj.type;
    var view;
    if (type.view) {
        var viewName = type.view;
        var designDoc = type.doc;
        view = designDoc.views[viewName];
    }

    if (view) {
        view.map = eval("(" + view.map + ")");
        if (view.reduce) view.reduce = eval("(" + view.reduce + ")"); 
        textarea.text(toPrettyJSON(view));
        el.css("display", "");
    } else { 
        el.css("display", "none");
        textarea.text("");
    }
});
renderer.push("chaise.document.list.type.picker", "type");

editLink.click(function(){
    if (el.hasClass("editing")) {
        reset();
    } else {
        el.addClass("editing");
        editLink.text("Cancel edit");
        startEdit(textarea.text());
    }
    return false;
});
showLink.click(function(){
    if (el.hasClass("showing")) {
        el.removeClass("showing");
        showLink.text("Show code");
        reset();
    } else {
        el.addClass("showing");
        showLink.text("Hide code");    
    }
    return false;
});

var status = el.find("span");
var stopEdit = function() {
    textarea.removeAttr("contenteditable");
    textarea.blur();
    status.text("");
    el.removeClass("editing");
    editLink.text("Edit");
};
var reset = function() {
    var rollback = textarea.data("rollback");
    textarea.text(rollback);
    stopEdit();    
};
var submitter = msjs.require("chaise.document.view.submitter");
var validateCode = msjs.require("chaise.document.view.validatecode");
runLink.click(function(){
    try {
        var validatedDoc = validateCode(textarea);
        if (validatedDoc) submitter.update(validatedDoc);
    } catch (e) {
        status.text(e);
    }
    return false;
});
textarea.keypress(function(event) {
    if (event.keyCode == "27") {
        reset();
        return false;
    } else if (event.shiftKey && event.keyCode == "13") {
        runLink.click();      
        return false;
    } 
});


var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    display: "inline"
});
dom.addCss(cssId + " pre", {
    border: "2px solid #CACACA",
    padding: "2px",
    outline: "none",
    whiteSpace: "pre-wrap",       /* css-3 */
    overflowX: "auto",
    display: "none",
    color: "#6A6A6A"
});
dom.addCss(cssId + " a", {
    marginRight: "5px"
});
dom.addCss(cssId + " a.edit," +
           cssId + " a.run", {
    display: "none"
});
dom.addCss(cssId + ".showing a.edit," +
           cssId + ".showing a.run", {
    display: "inline"
});
dom.addCss(cssId + ".showing pre", {
    display: "block"
});
dom.addCss(cssId + ".editing pre", {
    display: "block",
    borderColor: "#8A8279 #DED6CA #DED6CA #8A8279",
    color: "black"
});
dom.addCss(cssId + " span", {
    display: "block",
    color: "red",
    fontWeight: "bold"
});
