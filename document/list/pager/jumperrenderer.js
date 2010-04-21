var el = msjs.publish($(<form>
    <label><a href="#" class="toggle">Jump to page</a> <input name="page" autocomplete="off"/></label>
</form>));

var input = el.find("input");
var toggle = el.find(".toggle");
toggle.click(function() {
    if (el.hasClass("jumping")) {
        el.removeClass("jumping");
    } else {
        el.addClass("jumping");
        input.focus();
    }
    return false;
});
input.keydown(function(event) {
    if (event.keyCode == 27) toggle.click();
});

var page = msjs.require("chaise.document.list.pager.selector");
el.submit(function() {
    var page = Number(input.val());
    if (isNaN(page)) {
        input.val("");
        return;
    }
    var lastPage = el.data("lastPage");
    if (page < 1) {
        page = 1;
    } else if (page > lastPage) {
        page = lastPage;
    }
    input.val("");
    page.update(page);
    el.removeClass("jumping");
    return false;
});

var list = msjs.require("chaise.document.list.lister");
var pageSize = msjs.require("chaise.document.list.pagesize.selector");
var renderer = msjs(function() {
    var showCount = 8;
    var lastPage = Math.ceil(list().total_rows/pageSize());
    var currentPage = page();
    var startPage = currentPage - showCount;
    if (startPage < 1) startPage = 1;
    var endPage   = currentPage + showCount - 1;
    if (lastPage < endPage) endPage = lastPage;
    el.data("lastPage", lastPage);

    el.css("display", startPage == endPage ? "none" : "");
}).depends(list);

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    display: "inline",
    marginRight: "5px"
});
dom.addCss(cssId + ".jumping input", {
    display: "inline"
});
dom.addCss(cssId + " input", {
    textAlign: "right",
    width: "50px",
    display: "none"
});
