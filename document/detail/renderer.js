var form = msjs.publish($(<form>
    <a href="#">Edit</a>
    <input type="submit" value="Save"/>
    <input type="reset" value="Cancel"/>
    <span/>
    <pre/>
</form>));

var editor = form.find("pre");
var startEdit = function(rollback) {
    editor.data("rollback", editor.contents().clone());
    editor.attr("contenteditable", "true");
    editor.focus();
    form.addClass("editing");
};
var info = msjs.require("chaise.document.detail.info");
var updater = msjs.require("chaise.document.detail.updater");
var isSuccess = msjs.require("chaise.couch.issuccess");
var setDocText = msjs.require("chaise.document.setdoctext");
var renderer = msjs(function() {
    var doc = info();
    if (doc != (void 0)) {

        var response = updater.ifUpdated();
        if (response) {
            if (isSuccess(response)) {
                var updatedDoc = response.result;
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

        editor.text("");
        if (doc) {
            setDocText(doc, editor);
            if (!doc._id) startEdit("");
        }
    }
}).depends(info, updater);

var picker = msjs.require("chaise.document.list.picker");
var shower = msjs(function() {
    form.css("display", picker() ? "" : "none");
}).depends(picker);


form.find("a").click(function(){
    startEdit(editor.text());
    return false;
});
var submitter = msjs.require("chaise.document.detail.submitter");
var status = form.find("span");
var rollback = function() {
    if (editor.data("rollback")) {
        editor.text("");
        $.each(editor.data("rollback"), function(i, content) {
            editor.append(content);
        });
        return true;
    }
    return false;
};
var stopEdit = function() {
    if (!form.hasClass("editing")) return;
    form.removeClass("editing");

    rollback();

    editor.blur();
    editor.removeAttr("contenteditable");

    status.text("");
};
var reset = function() {
    if (!rollback()) form.css("display", "none");
    stopEdit();    
    if (!picker().id) picker(null);
};
form.bind("reset", reset);
var beautify = msjs.require("chaise.document.beautify");
var funcToStr = msjs.require("chaise.document.functostr");
form.submit(function(){
    try {
        var doc = eval("(" + editor.text().split('\n').join(" ") + ")");
        if (doc._id && doc._id.indexOf("_design/") == 0 && doc.views)  {
            for (var k in doc.views) {
                var view = doc.views[k];
                if (view.map) view.map = funcToStr(view.map);
                if (view.reduce) view.reduce = funcToStr(view.reduce);
            }
        }

        submitter(doc);

        editor.text("");
        $.each(beautify(doc).split("\n"), function(i, line) {
            editor.append(document.createTextNode(line)).append($("<br/>"));
        });
        stopEdit();
    } catch (e) {
        status.text("bad json");
        msjs.log("bad json:", e);
    }
    return false;
});
editor.keypress(function(event) {
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
