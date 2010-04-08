var el = msjs.publish($(<div>
    <a href="#" class="show">Show code</a>
    <a href="#" class="edit">Edit code</a>
    <span/>
    <form>
        <input type="submit" value="Run"/>
        <input type="reset" value="Cancel"/>
    </form>
    <pre/>
</div>));

var showLink = el.find("a.show");
var form = el.find("form");
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
// var submitter = msjs.require("chaise.document.detail.submitter");
form.submit(function(){
    try {
        var doc = eval("(" + textarea.text().split('\n').join(" ") + ")");
        //submitter.update(doc);
        textarea.text(toPrettyJSON(doc));
        stopEdit();
    } catch (e) {
        status.text("bad json");
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
dom.addCss(cssId + " pre", {
    border: "2px solid #CACACA",
    padding: "2px",
    margin: "0px",
    outline: "none",
    whiteSpace: "pre-wrap",       /* css-3 */
    overflowX: "auto",
    display: "none"
});
dom.addCss(cssId + ".showing pre", {
    display: "block"
});
dom.addCss(cssId + ".editing pre", {
    display: "block",
    borderColor: "#8A8279 #DED6CA #DED6CA #8A8279"
});
dom.addCss(cssId + ".editing a.edit", {
    display: "none"
});
dom.addCss(cssId + " form", {
    display: "inline"
});
dom.addCss(cssId + " input", {
    visibility: "hidden"
});
dom.addCss(cssId + ".editing input", {
    visibility: "visible"
});
dom.addCss(cssId + " span", {
    color: "red",
    fontWeight: "bold"
});
dom.addCss(cssId + " a", {
    marginRight: "5px"
});