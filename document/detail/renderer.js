var form = msjs.publish($(<form>
    <a href="#">edit</a>
    <input type="submit" value="save"/>
    <input type="reset" value="cancel"/>
    <span/>
    <pre/>
</form>));

var textarea = form.find("pre");
var isSuccess = msjs.require("chaise.couch.issuccess");
var toPrettyJSON = msjs.require("chaise.document.detail.toprettyjson");
var startEdit = function(rollback) {
    textarea.data("rollback", rollback);
    textarea.attr("contenteditable", "true");
    setTimeout(function() { 
        textarea.focus();
    }, 500);
    form.addClass("editing");
};
var renderer = msjs(function(msj) {
    var doc = msj.info;
    if (doc != (void 0)) {
        if (doc && msj.updated && isSuccess(msj.updated)) {
            doc._id = msj.updated.result.id;
            doc._rev = msj.updated.result.rev;
        }
        if (doc) {
            textarea.text(toPrettyJSON(doc));
            if (!doc._id) startEdit("");
        } else { 
            textarea.text("");
        }
    }
});
renderer.push("chaise.document.detail.info", "info");

var shower = msjs(function(msj) {
    form.css("display", msj.picked ? "" : "none");
});
shower.push("chaise.document.list.picker", "picked");


form.find("a").click(function(){
    startEdit(textarea.text());
    return false;
});
var submitter = msjs.require("chaise.document.detail.submitter");
var status = form.find("span");
var stopEdit = function() {
    textarea.removeAttr("contenteditable");
    status.text("");
    form.removeClass("editing");
    textarea.blur();
};
var reset = function() {
    var rollback = textarea.data("rollback");
    textarea.text(rollback);
    if (!rollback) form.css("display", "none");
    stopEdit();    
};
form.bind("reset", reset);
form.submit(function(){
    try {
        var doc = eval("(" + textarea.text().split('\n').join(" ") + ")");
        submitter.update(doc);
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
var cssId = dom.getCssId(form[0]);
dom.addCss(cssId + " pre", {
    border: "2px solid #CACACA",
    padding: "2px",
    margin: "0px",
    outline: "none",
    whiteSpace: "pre-wrap",       /* css-3 */
    overflowX: "auto"
});
dom.addCss(cssId + ".editing pre", {
    borderColor: "#8A8279 #DED6CA #DED6CA #8A8279"
});
dom.addCss(cssId + ".editing a", {
    display: "none"
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
