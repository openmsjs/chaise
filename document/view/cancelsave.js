var el = msjs.require("chaise.document.view.element");
var saveLink = el.find("a.save");
var status = el.find("span.status");
msjs.publish(function() {
    el.removeClass("saving");
    saveLink.text("Save as");
    status.text("");
});
