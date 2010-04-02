var form = msjs.publish($(<form>
    <a href="#">edit</a>
    <input type="submit" value="save"/>
    <input type="reset" value="cancel"/>
    <span/>
    <textarea class="editable" readonly="true" tabindex="-1" autocomplete="off"/>
</form>));

var isSuccess = msjs.require("chaise.couch.issuccess");
var toPrettyJSON = msjs.require("chaise.document.toprettyjson");
var renderer = msjs(function(msj) {
    var doc = msj.doc;
    if (doc != (void 0)) {
        if (doc && msj.updated && isSuccess(msj.updated)) {
            doc._rev = msj.updated.result.rev;
        }
        doc ? textarea[0].value = toPrettyJSON(doc) : textarea.text("");
    }
});
renderer.pull("chaise.document.info", "doc");
renderer.pull("chaise.document.updater", "updated");
renderer.depends("chaise.document.info");
renderer.depends("chaise.document.updater");

var textarea = form.find("textarea");
form.find("a").click(function(){
    textarea.removeAttr("readonly");
    textarea.removeAttr("tabindex");
    textarea.focus();
    form.addClass("editing");
    return false;
});
var submitter = msjs.require("chaise.document.submitter");
var updater = msjs.require("chaise.document.updater");
var status = form.find("span");
var reset = function() {
    status.text("");
    form.removeClass("editing");
    textarea.attr("readonly", "true");
    textarea.attr("tabindex", "-1");
};
form.bind("reset", reset);
form.submit(function(){
    try {
        var doc = eval("(" + textarea[0].value + ")");
        submitter.update(doc);
        textarea[0].value = toPrettyJSON(doc);
        reset();
    } catch (e) {
        status.text("bad json");
    }
    return false;
});
textarea.keypress(function(event) {
    if (event.shiftKey && event.keyCode == "13") {
        form.submit();      
        return false;
    }
});

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(form[0]);
dom.addCss(cssId, {
    width: "100%",
    border: "1px solid #A7A7A7",
    borderSpacing: "0"
});
dom.addCss(cssId + " thead", {
    backgroundColor: "#DADADA"
});
dom.addCss(cssId + " th," +
           cssId + " td", {
    padding: "2px 10px"
});
dom.addCss(cssId + ".editing", {
    display: "block"
});
dom.addCss(cssId + " textarea", {
    width: "100%",
    height: "300px"
});
dom.addCss(cssId + " textarea:active", {
    "outline": "0"
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
