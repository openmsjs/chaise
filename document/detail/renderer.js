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
var startEdit = function() {
    textarea.data("rollback", textarea.text());
    textarea.attr("contenteditable", "true");
    setTimeout(function() { 
        textarea.focus();
    }, 500);
    form.addClass("editing");
}
var renderer = msjs(function(msj) {
    var doc = msj.info;
msjs.log('doc', doc)
    if (doc != (void 0)) {
        if (doc && msj.updated && isSuccess(msj.updated)) {
            doc._id = msj.updated.result.id;
            doc._rev = msj.updated.result.rev;
        }
        if (doc) {
            textarea.text(toPrettyJSON(doc));
            if (!doc._id) startEdit();                
        } else { 
            textarea.text("");
        }
    }
});
renderer.push("chaise.document.detail.info", "info");

form.find("a").click(function(){
    startEdit();
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
    textarea.text(textarea.data("rollback"));
    stopEdit();    
};
form.bind("reset", reset);
form.submit(function(){
    try {
        var doc = eval("(" + textarea.text() + ")");
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
dom.addCss(cssId + ".editing", {
    display: "block"
});
dom.addCss(cssId + " pre", {
    border: "1px solid #CACACA",
    margin: "0px",
    outline: "none",
    whiteSpace: "pre-wrap",       /* css-3 */
    overflowX: "auto"
});
dom.addCss(cssId + ".editing a", {
    display: "none"
});
dom.addCss(cssId + " input", {
    display: "none"
});
dom.addCss(cssId + ".editing input", {
    display: "inline"
});
dom.addCss(cssId + " span", {
    color: "red",
    fontWeight: "bold"
});
