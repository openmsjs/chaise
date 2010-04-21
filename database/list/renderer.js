var el = msjs.publish($(<div>
    <table>
        <thead>
            <tr>
                <th class="remover">Delete?</th>
                <th class="name">Name</th>
                <th>Size</th>
                <th>Document count</th>
                <th>Update seq</th>
            </tr>
        </thead>
        <tbody/>
    </table>
    <div class="status"/>
</div>));

var tbody = el.find("tbody");
var status = el.find(".status");
var lister = msjs.require("chaise.database.list.lister");
var picker = msjs.require("chaise.database.list.picker");
var submitter = msjs.require("chaise.database.remove.submitter");
var renderer = msjs(function() {
    tbody.children().remove();
    var list = lister();
    if (list.length) {
        el.removeClass("no-results");
        status.text("").css("color", "");
    } else {
        el.addClass("no-results");
        status.text("No databases").css("color", "#FF0000");
    }
    $.each(list, function(i, info) {
        var row = $("<tr>" +
          "<td class=\"remover\"/>" +
          "<td class=\"name\"/>" +
          "<td>" + info.disk_size + "</td>" +
          "<td>" + info.doc_count + "</td>" +
          "<td>" + info.update_seq + "</td>" +
          "</tr>").appendTo(tbody).data("database", info.db_name);

        if (i % 2 == 0) row.addClass("odd");

        if (picker() == info.db_name) {
            row.addClass("selected");
        }

        $("<a href=\"#\" tabindex=\"-1\">Delete</a>")
            .appendTo(row.find("td.remover"))
            .click(function() {
                submitter(info.db_name);
                if (row.hasClass("selected")) {
                    picker(null);
                }
                return false;
            });

        $("<a href=\"\">" + info.db_name + "</a>")
            .appendTo(row.find("td.name"))
            .click(function() {
                picker(info.db_name);
                return false;
            });
    });
}).depends(lister);

var selector = msjs(function() {
    tbody.find(".selected").removeClass("selected");
    $.each(tbody.children(), function(i, row) {
        if (picker() == $(row).data("database")) {
            $(row).addClass("selected");
            return false;
        }
    });
}).depends(picker);

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId + ".no-results table", {
    display: "none"
});
dom.addCss(cssId + " th," +
           cssId + " td", {
    textAlign: "right"
});
dom.addCss(cssId + " .remover," + 
           cssId + " .name", {
    textAlign: "left"
});
dom.addCss(cssId + " a.remover", {
    marginLeft: "5px"
});
