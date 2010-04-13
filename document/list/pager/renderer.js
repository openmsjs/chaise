var el = msjs.publish($(<div>
    <div class="pager top"/>
    <div class="pager bottom"/>
</div>));

var topEl = el.find(".top");
var bottomEl = el.find(".bottom");
var renderer = msjs(function(msj) {
    makePageLinks(topEl, msj.list, msj.pageSize);
    makePageLinks(bottomEl, msj.list, msj.pageSize);
});
renderer.push("chaise.document.list.lister", "list");
renderer.pull("chaise.document.list.pagesize.selector", "pageSize");
renderer.pull("chaise.document.list.pager.selector", "currentPage");

var selector = msjs.require("chaise.document.list.pager.selector");
var makePageLinks = function(el, list, pageSize) {
    el.children().remove();

    var showCount = 8;
    var lastPage = Math.ceil(list.total_rows/pageSize);
    var currentPage = selector.getMsj();
    var startPage = currentPage - showCount;
    if (startPage < 1) startPage = 1;
    var endPage   = currentPage + showCount - 1;
    if (lastPage < endPage) endPage = lastPage;

    if (startPage == endPage) return;

    var previous;
    if (currentPage > 1) {
        previous = $("<a href=\"#\">Previous</a>")
            .appendTo(el)
            .click(function() {
                selector.update(currentPage-1);
                return false;
            });
    } else {
        previous = $("<span>Previous</span>").css("color", "#CACACA").appendTo(el);
    }

    var next;
    if (currentPage < endPage) {
        next = $("<a href=\"#\">Next</a>")
            .appendTo(el)
            .click(function() {
                selector.update(currentPage+1);
                return false;
            });
    } else {
        next = $("<span>Next</span>").css("color", "#CACACA").appendTo(el);
    }

    var css = {marginRight: "5px"};
    previous.css(css);
    next.css(css);

    for (var page=startPage; page <= endPage; page++) {
        var link = $("<a href=\"#\">" + page + "</a>")
            .appendTo(el)
            .addClass("button")
            .click(function() {
                 if (!$(this).hasClass("selected")) {
                     selector.update(Number($(this).text()));
                     return false;
                 }
             });
        if (page == currentPage) link.addClass("selected"); 
    }

};

var dom = msjs.require("msjs.dom");
dom.addCss(".pager", {
    margin: "5px 0px 10px 0px",
    fontFamily: "monospace"
});
