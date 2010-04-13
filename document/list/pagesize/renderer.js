var el = msjs.publish($(<div>
    <a class="open">
        <span/> (change)
    </a>
    <div class="edit">
        <a href="#" class="close">Rows (close): </a>
        <a name="10"  class="button" href="#">10</a>
        <a name="25"  class="button" href="#">25</a>
        <a name="50"  class="button" href="#">50</a>
        <a name="100" class="button" href="#">100</a>
    </div>
</div>));

var selector = msjs.require("chaise.document.list.pagesize.selector");
el.find("a.open").click(function() {
    el.addClass("editing");
    return false;
});
el.find("a.close").click(function() {
    el.removeClass("editing");
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
    el.find("a.open span").text("Rows: " + msj.pageSize);
});
renderer.push(selector, "pageSize");

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
// // dom.addCss(cssId, {
// //     display: "inline",
// //     margin: "10px 0px"
// });
dom.addCss(cssId + " a.open", {
    cursor: "pointer"
});
dom.addCss(cssId + " a.open span", {
    fontWeight: "bold"
});

dom.addCss(cssId + ".editing .open," +
           cssId + " .edit", {
    display: "none"
});
dom.addCss(cssId + " .open," +
           cssId + ".editing .edit", {
    display: "inline"
});
dom.addCss(cssId + " a", {
    marginRight: "5px"
});
