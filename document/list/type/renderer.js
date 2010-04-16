var el = msjs.publish($(<div>
    <a name="allDocs" href="#">All documents</a>
    <a name="allDesignDocs" href="#">Design documents</a>
    <div class="views"/>
</div>));

var picker = msjs.require("chaise.document.list.type.picker");
var dom = msjs.require("msjs.dom");
el.find("a[name]").addClass("button").click(function() {
    picker.update({type: this.name});
    return false;
});

var views = el.find(".views");
var designDocs = msjs(function(msj) {
    views.find(".design").remove();
    $.each(msj.docs, function(i, doc){
        var designName = doc._id.substring(8);
        var design = $("<div><span>" + designName + "</span>: <span/></div>")
                         .addClass("design")
                         .appendTo(views);
        design.find("span").css({fontWeight: "bold"});

        for (var view in doc.views) {
            $("<a href=\"#\">" + view + "</a>")
                .addClass("view button")
                .appendTo(design)
                .data("design", designName)
                .click(function() {
                    var viewName = $(this).text();
                    picker.update({type: "view",
                                   designName: designName,
                                   viewName: viewName,
                                   viewDoc: doc.views[viewName]});
                    return false;
                });
        }
    });
});
designDocs.push("chaise.document.list.type.designdocs", "docs");

var selector = msjs(function(msj) {
    el.find(".selected").removeClass("selected");
    if (!msj.picked) return;
    var selected = null;
    switch (msj.picked.type) {
        case "allDocs": 
        case "allDesignDocs":
            selected = el.find("[name=" + msj.picked.type + "]");
            break;
        case "view":
            var views = el.find("a.view");
            $.each(views, function(i, view) {
                var designName = $(view).data("design");
                if (msj.picked.designName == designName &&
                    msj.picked.viewName == $(view).text()) {
                    selected = $(view);
                    return false;
                }
            });
            break;
    }
    if (selected) selected.addClass("selected");
});
selector.push(picker, "picked");


var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
//     padding: "10px 5px",
//     margin: "5px 0px",
//     backgroundColor: "#EFEFEF",
//     border: "1px solid #4A4A4A"
    lineHeight: "2.5em"
})
dom.addCss(cssId + " .views" , {
    display: "inline"
});
dom.addCss(cssId + " div.design", {
    display: "inline"
});
dom.addCss(cssId + " a.button", {
    marginRight: "3px"
});
dom.addCss(cssId + " a.button:hover", {
    textDecoration: "none"
});
