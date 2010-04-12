var el = msjs.publish($(<form>
    <label>Goto page: <input name="page" autocomplete="off"/></label>
</form>));
var selector = msjs.require("chaise.document.list.pager.selector");
var renderer = msjs(function(msj) {
    var showCount = 8;
    var lastPage = Math.ceil(msj.list.total_rows/msj.pageSize);
    var currentPage = selector.getMsj();
    var startPage = currentPage - showCount;
    if (startPage < 1) startPage = 1;
    var endPage   = currentPage + showCount - 1;
    if (lastPage < endPage) endPage = lastPage;

    if (startPage == endPage) {
        el.css("display", "none");
        return;
    }

    el.css("display", "");

    var input = el.find("input");
    el.unbind("submit");
    el.submit(function() {
        var page = Number($(this).find("input").val());
        if (isNaN(page)) {
            input.val("");
            return;
        }
        if (page < 1) {
            page = 1;
        } else if (page > lastPage) {
            page = lastPage;
        }
        input.val("");
        selector.update(page);
        return false;
    });
});
renderer.push("chaise.document.list.lister", "list");
renderer.pull("chaise.document.list.pagesize.selector", "pageSize");

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
// dom.addCss(cssId, {
//     display: "inline",
//     marginLeft: "10px"
// });
dom.addCss(cssId + " input", {
    textAlign: "right",
    width: "50px"
});
