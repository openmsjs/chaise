var el = msjs.publish($(<div>
    <a name="all" href="#">All documents</a>
    <a name="design" href="#">Design documents</a>
</div>));
var picker = msjs.require("chaise.document.list.type.picker");
var dom = msjs.require("msjs.dom");
el.click(function(event) {
    var target = dom.getTargetFromEvent(event);    
    if (target.nodeName == "A") {
        picker.update(target.name || $(target).data("view"));
    }
    return false;
});

var selector = msjs(function(msj) {
    el.find(".selected").removeClass("selected");
    switch (msj.selected) {
        case "all": 
        case "design":
            el.find("[name='" + msj.selected + "']").addClass("selected");
            break;
        default:
            var views = el.find("a.view");
            $.each(views.children(), function(view) {
                msjs.log(view);                      
            });
            break;
    }
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