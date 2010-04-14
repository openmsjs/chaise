var el = msjs.publish($(<div>
    <a href="#" class="toggle"/>
    <a name="10"  class="button" href="#">10</a>
    <a name="25"  class="button" href="#">25</a>
    <a name="50"  class="button" href="#">50</a>
    <a name="100" class="button" href="#">100</a>
</div>));

var selector = msjs.require("chaise.document.list.pagesize.selector");
el.find("a.toggle").click(function() {
    if (el.hasClass("editing")) {
        el.removeClass("editing");
    } else {
        el.addClass("editing");
    }
    return false;
});
el.find("a.button").click(function() {
    selector.update(Number(this.name));
    el.removeClass("editing");
    return false;
});
var renderer = msjs(function(msj) {
    el.find(".selected").removeClass("selected");
    el.find("a[name=" + msj.pageSize + "]").addClass("selected");
    el.find("a.toggle").text("Rows: " + msj.pageSize);
});
renderer.push(selector, "pageSize");

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    display: "inline"
});
dom.addCss(cssId + " .button", {
    display: "none"
});
dom.addCss(cssId + ".editing .button", {
    display: "inline"
});
dom.addCss(cssId + " a", {
    marginRight: "5px"
});