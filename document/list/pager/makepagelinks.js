var selector = msjs.require("chaise.document.list.pager.selector");
msjs.publish(function(el, list, pageSize) {
    el.children().remove();

    var nums = [];
    var lastPage = Math.ceil(list.total_rows/pageSize);

    var currentPage = selector.getMsj();
    var startPage = currentPage - 10;
    if (startPage < 1) startPage = 1;

    var endPage = currentPage + 10;
    if (lastPage < endPage) endPage = lastPage;

    if (currentPage > 1) {
        $("<a href=\"#\">previous</a>")
            .appendTo(el)
            .click(function() {
                selector.update(startPage-1);
                return false;
            });
    }

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

    if (currentPage < endPage) {
        $("<a href=\"#\">next</a>")
            .appendTo(el)
            .click(function() {
                selector.update(currentPage+1);
                return false;
            });
    }

});
