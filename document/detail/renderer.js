var form = msjs.publish($(<form>
    <a href="#">Edit</a>
    <input type="submit" value="Save"/>
    <input type="reset" value="Cancel"/>
    <span/>
    <pre/>
</form>));

var textarea = form.find("pre");
var toPrettyJSON = msjs.require("chaise.document.toprettyjson");
var startEdit = function(rollback) {
    textarea.data("rollback", rollback);
    textarea.attr("contenteditable", "true");
    setTimeout(function() { 
        textarea.focus();
    }, 500);
    form.addClass("editing");
};
var info = msjs.require("chaise.document.detail.info");
var updater = msjs.require("chaise.document.detail.updater");
var isSuccess = msjs.require("chaise.couch.issuccess");
var renderer = msjs(function() {
    var doc = info();
    if (doc != (void 0)) {

        if (updater.isUpdated()) {
            var response = updater();
            if (isSuccess(response)) {
                var updatedDoc = response.result;
                msjs.log(updatedDoc);
                if (doc._id) {
                    if (doc._id == updatedDoc.id)  {
                        doc._rev = updatedDoc.rev;
                    }
                } else if (updatedDoc.rev.indexOf("1-") == 0) {
                    doc._id = updatedDoc.id;
                    doc._rev = updatedDoc.rev;
                }
            } else {
                alert(doc._id
                      ? "Problems updating doc " + doc._id
                      : "Problems creating new doc");
            }
        }

        if (doc) {
            textarea.text(toPrettyJSON(doc));
            if (!doc._id) startEdit("");
        } else { 
            textarea.text("");
        }
    }
}).depends(info, updater);

var picker = msjs.require("chaise.document.list.picker");
var shower = msjs(function() {
    form.css("display", picker() ? "" : "none");
}).depends(picker);


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
    if (!picker().id) picker(null);
};
form.bind("reset", reset);
form.submit(function(){
    try {
        var doc = eval("(" + textarea.text().split('\n').join(" ") + ")");
        submitter(doc);
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
