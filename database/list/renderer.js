var el = msjs.publish($(<div>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Document count</th>
                <th>Update seq</th>
            </tr>
        </thead>
        <tbody/>
        <tfoot>
            <tr>
                <th colspan="4"><a href="#">(Collapsed) Show all</a></th>
            </tr>
        </tfoot>
    </table>
    <div class="status"/>
</div>));

var tbody = el.find("tbody");
var status = el.find(".status");
var picker = msjs.require("chaise.database.list.picker");
var remover = msjs.require("chaise.database.remove.submitter");
var renderer = msjs(function(msj) {
    tbody.children().remove();
    if (msj.list.length) {
        el.removeClass("no-results");
        status.text("").css("color", "");
    } else {
        el.addClass("no-results");
        status.text("No databases").css("color", "#FF0000");
    }
    $.each(msj.list, function(i, info) {
        var row = $("<tr>" +
          "<td></td>" +
          "<td>" + info.disk_size + "</td>" +
          "<td>" + info.doc_count + "</td>" +
          "<td>" + info.update_seq + "</td>" +
          "</tr>").appendTo(tbody).data("database", info.db_name);

        if (i % 2 == 0) row.addClass("odd");

        var cell = row.find("td:first-child");

        if (msj.picked == info.db_name) {
            row.addClass("selected");
        }

        $("<a href=\"\">" + info.db_name + "</a>")
            .appendTo(cell)
            .click(function() {
                picker.update(info.db_name);
                collapse(row);
                return false;
            });
        $("<a href=\"#\" class=\"remover\" tabindex=\"-1\">Delete</a>")
            .appendTo(cell)
            .click(function() {
                remover.update(info.db_name);
                if (row.hasClass("selected")) {
                    picker.update(null);
                }
                return false;
            });
    });
});
renderer.push("chaise.database.list.lister", "list");
renderer.pull(picker, "picked");

var selector = msjs(function(msj) {
    tbody.find(".selected").removeClass("selected");
    $.each(tbody.children(), function(i, row) {
        if (msj.picked == $(row).data("database")) {
            $(row).addClass("selected");
            return false;
        }
    });
});
selector.push(picker, "picked");

var collapse = function(row){
    var scrollTop = Math.max(0, (row.position().top + tbody.scrollTop() - 20));
    tbody.animate({height : 60, 
                   scrollTop : scrollTop
                  }, "fast", function(){
                    el.addClass("collapsed");
                  });

};

var expand = function(){
    tbody.css("height", "auto");
    var height = tbody.height();
    tbody.height(60);
    tbody.animate({height : height, 
                   scrollTop : "0px"
                  }, "fast", function(){
                    el.removeClass("collapsed");
                    el.css("height", "auto");
                  });
}

var tfoot = el.find("tfoot");
tfoot.find("a").click(function(){
    expand();
});

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);

dom.addCss(tbody, {
    display : "block",
    overflow: "hidden !important",
    position: "relative"

});

dom.addCss(cssId, "tfoot", {
    display : "none"
});

dom.addCss(cssId + ".collapsed", "tfoot", {
    display : "table-row-group",
    backgroundColor : "gray"
});

dom.addCss(cssId + ".collapsed", "tfoot", "a", {
    color : "white"
});

dom.addCss(cssId + ".no-results table", {
    display: "none"
});
dom.addCss(cssId + " th," +
           cssId + " td", {
    textAlign: "right"
});
dom.addCss(cssId + " th:first-child," + 
           cssId + " td:first-child", {
    textAlign: "left"
});
dom.addCss(cssId + " a.remover", {
    marginLeft: "5px"
});
