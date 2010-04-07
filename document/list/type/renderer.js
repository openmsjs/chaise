var el = msjs.publish($(<div>
    <a name="all" href="#">All documents</a>
    <a name="design" href="#">Design documents</a>
</div>));
var picker = msjs.require("chaise.document.list.type.picker");
var dom = msjs.require("msjs.dom");
el.find("a[name]").click(function() {
    picker.update(this.name);
    return false;
});

var shower = msjs(function(msj) {
    el.css("display", msj.list.rows.length ? "" : "none");
});
shower.push("chaise.document.list.lister", "list");

var designDocs = msjs(function(msj) {
    el.find(".design").remove();
    $.each(msj.docs, function(i, doc){
        var designName = doc._id.substring(8);
        var design = $("<div>" + designName + ": [<span/>]</div>")
                         .addClass("design")
                         .appendTo(el);
        var inner = design.find("span");

        for (var view in doc.views) {
            $("<a href=\"#\">" + view + "</a>")
                .addClass("view")
                .appendTo(inner)
                .data("design", designName)
                .click(function() {
                    picker.update({design: designName, view: $(this).text(), doc: doc});
                    return false;
                });
        }
    });
});
designDocs.push("chaise.document.list.type.designdocs", "docs");

var selector = msjs(function(msj) {
    el.find(".selected").removeClass("selected");
    var selected = null;
    switch (msj.selected) {
        case "all": 
        case "design":
            selected = el.find("[name='" + msj.selected + "']");
            break;
        default:
            var views = el.find("a.view");
            $.each(views, function(i, view) {
                var design = $(view).data("design");
                if (msj.selected.design == design &&
                    msj.selected.view == $(view).text()) {
                    selected = $(view);
                    return false;
                }
            });
            break;
    }
    if (selected) selected.addClass("selected");
});
selector.push(picker, "selected");


var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    display: "inline",
    marginLeft: "10px"
});
dom.addCss(cssId + " div", {
    display: "inline"
});
dom.addCss(cssId + " a", {
    marginRight: "10px",
    color: "#3F000E"
});
dom.addCss(cssId + " a:last-child", {
    marginRight: "0px"
});
dom.addCss(cssId + " a.selected", {
    fontWeight: "bold"
});