var el = msjs.publish($(<div>
    <a href="#">Jump</a>
    <form>
        <label>Jump to page: <input name="page" autocomplete="off"/></label>
    </form>
</div>));
var selector = msjs.require("chaise.document.list.pager.selector");

var form = el.find("form");
var input = form.find("input");

el.find("a").click(function() {
    el.addClass("jumping");
    input.focus();
    return false;
});

input.keydown(function(event) {
    if (event.keyCode == 27) {
        el.removeClass("jumping");
        this.blur();
    }
});
form.submit(function() {
    var page = Number(input.val());
    if (isNaN(page)) {
        input.val("");
        return;
    }
    var lastPage = form.data("lastPage");
    if (page < 1) {
        page = 1;
    } else if (page > lastPage) {
        page = lastPage;
    }
    input.val("");
    selector.update(page);
    el.removeClass("jumping");
    return false;
});

var renderer = msjs(function(msj) {
    var showCount = 8;
    var lastPage = Math.ceil(msj.list.total_rows/msj.pageSize);
    var currentPage = selector.getMsj();
    var startPage = currentPage - showCount;
    if (startPage < 1) startPage = 1;
    var endPage   = currentPage + showCount - 1;
    if (lastPage < endPage) endPage = lastPage;
    form.data("lastPage", lastPage);

    el.css("display", startPage == endPage ? "none" : "");
});
renderer.push("chaise.document.list.lister", "list");
renderer.pull("chaise.document.list.pagesize.selector", "pageSize");

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    display: "inline",
    marginRight: "10px"
});
dom.addCss(cssId + ".jumping a", {
    display: "none"
});
dom.addCss(cssId + " form", {
    display: "none"
});
dom.addCss(cssId + ".jumping form", {
    display: "inline"
});
dom.addCss(cssId + " input", {
    textAlign: "right",
    width: "50px"
});
