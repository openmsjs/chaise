var form = msjs.publish($(<form>
    <a href="#">edit</a>
    <input type="submit" value="save"/>
    <input type="reset" value="cancel"/>
    <span/>
    <textarea class="editable" readonly="true" tabindex="-1"/>
</form>));

var toJSON = msjs.require("chaise.document.tojson");
var renderer = msjs(function(msj) {
    if (msj.doc != (void 0)) {
        msj.doc ? textarea.text(toJSON(msj.doc)) : textarea.text("");
    }
});
renderer.push("chaise.document.info", "doc");

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
        var doc = toJSON(eval("(" + textarea[0].value + ")"));
        submitter.update(doc);
        textarea[0].value = doc;
        reset();
    } catch (e) {
        status.text("bad json");
    }
    return false;
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
