var el = msjs.publish($(<div>
    <a href="#" class="show toggle">Show code</a>
    <a href="#" class="edit toggle">Edit code</a>
    <form class="edit-controls">
        <input type="submit" value="Run"/>
        <input type="reset" value="Cancel"/>
    </form>
    <span/>
    <pre/>
</div>));
msjs.require("chaise.document.view.reduce.renderer").insertBefore(el.find("span"));

var showLink = el.find("a.show");
var form = el.find("form.edit-controls");
var textarea = el.find("pre");
var isSuccess = msjs.require("chaise.couch.issuccess");
var toPrettyJSON = msjs.require("chaise.document.toprettyjson");
var show = function(){
    el.addClass("showing");
    showLink.text("Hide code");    
};
var hide = function() {
    el.removeClass("showing");
    showLink.text("Show code");
    if (el.hasClass("editing")) {
        stopEdit();
    }
};
var startEdit = function(rollback) {
    show();
    textarea.data("rollback", rollback);
    textarea.attr("contenteditable", "true");
    setTimeout(function() { 
        textarea.focus();
    }, 500);
    el.addClass("editing");
};

var renderer = msjs(function(msj) {
    var doc = msj.info;
//     if (doc && msj.updated && isSuccess(msj.updated)) {
//         doc._id = msj.updated.result.id;
//         doc._rev = msj.updated.result.rev;
//     }
    if (doc) {
        doc.map = eval("(" + doc.map + ")");
        if (doc.reduce) doc.reduce = eval("(" + doc.reduce + ")"); 
        textarea.text(toPrettyJSON(doc));
        el.css("display", "");
    } else { 
        el.css("display", "none");
        textarea.text("");
    }
});
renderer.push("chaise.document.view.info", "info");

el.find("a.show").click(function(){
    if (el.hasClass("showing")) {
        hide();
    } else {
        show();
    }
    return false;
});

el.find("a.edit").click(function(){
    startEdit(textarea.text());
    return false;
});
var status = el.find("span");
var stopEdit = function() {
    textarea.removeAttr("contenteditable");
    status.text("");
    el.removeClass("editing");
    textarea.blur();
};
var reset = function() {
    var rollback = textarea.data("rollback");
    textarea.text(rollback);
    //if (!rollback) el.css("display", "none");
    stopEdit();    
};
el.bind("reset", reset);
var submitter = msjs.require("chaise.document.view.submitter");
var funcToStr = function(func, type) {
    if (typeof(func) == "function") {
        return func.toString();
    }
    var testFunc;
    try {
        testFunc = eval("(" + func + ")");
    } catch (e) {}

    if (typeof(testFunc) != "function") {
        throw "bad function";
    }

    return func;
};
var strToFunc = function(func) {
    if (typeof(func) == "function") {
        return func;
    }
    try {
        return eval("(" + func + ")");
    } catch (e) {}

    throw "bad function";
}
form.submit(function(){
    var doc;
    try {
        doc = eval("(" + textarea.text().split('\n').join(" ") + ")");
    } catch (e) {
        status.text("bad json");
    }

    if (doc.map) {
        try {
            var updateDoc = {};
            updateDoc.map = funcToStr(doc.map, "map");
            if (doc.reduce) updateDoc.reduce = funcToStr(doc.reduce, "reduce");   

            submitter.update(updateDoc);

            doc.map = strToFunc(doc.map);
            if (doc.reduce) doc.reduce = strToFunc(doc.reduce);
            textarea.text(toPrettyJSON(doc));
        } catch (e) {
            status.text(e);
        }
    } else {
        status.text("view requires a map function");
    }
    return false;
});
textarea.keypress(function(event) {
    if (event.keyCode == "27") {
        form[0].reset();
        return false;
    } else if (event.shiftKey && event.keyCode == "13") {
        form.submit();      
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
dom.addCss(cssId + ".showing pre", {
    display: "block"
});
dom.addCss(cssId + " .editing pre", {
    display: "block",
    borderColor: "#8A8279 #DED6CA #DED6CA #8A8279",
    color: "black"
});
dom.addCss(cssId + " a.edit," +
           cssId + ".editing.showing a.edit", {
    display: "none"
});
dom.addCss(cssId + ".showing a.edit", {
    display: "inline"
});
dom.addCss(cssId + " form.edit-controls", {
    display: "none"
});
dom.addCss(cssId + ".editing form.edit-controls," +
           cssId + " input", {
    display: "inline"
});
dom.addCss(cssId + " span", {
    display: "block",
    color: "red",
    fontWeight: "bold"
});
dom.addCss(cssId + " a", {
    marginRight: "5px"
});
