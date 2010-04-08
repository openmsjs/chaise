var el = msjs.publish($(<div>
    <div class="documents">
        <span>[Documents] </span>
        <a name="all" href="#">All</a>
        <a name="design" href="#">Design</a>
    </div>
    <div class="views">
        <span>[Views] </span>
    </div>
</div>));
el.append(msjs.require("chaise.document.list.options.renderer"));

var picker = msjs.require("chaise.document.list.type.picker");
var dom = msjs.require("msjs.dom");
el.find("a[name]").addClass("button").click(function() {
    picker.update(this.name);
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
    padding: "10px",
    margin: "5px 0px",
    backgroundColor: "#DDDDDD",
    "-moz-border-radius": "20px",
    "-webkit-border-radius": "20px"

})
dom.addCss(cssId + " .views" , {
    marginTop: "10px"
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
