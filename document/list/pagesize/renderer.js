var el = msjs.publish($(<div>
    <span>Rows per page: </span>
    <a name="10" class="button" href="#">10</a>
    <a name="25" class="button" href="#">25</a>
    <a name="50" class="button" href="#">50</a>
    <a name="100" class="button" href="#">100</a>
</div>));

var selector = msjs.require("chaise.document.list.pagesize.selector");
el.find("a").click(function() {
    selector.update(Number(this.name));
    return false;
});
var renderer = msjs(function(msj) {
    el.find(".selected").removeClass("selected");
    el.find("a[name=" + msj.pageSize + "]").addClass("selected");
});
renderer.push(selector, "pageSize");

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId + " a", {
    marginRight: "5px"
});
