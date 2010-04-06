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
        status.text("no documents").css("color", "teal");
    }
    $.each(msj.list, function(i, info) {
        var row = $("<tr>" +
          "<td></td>" +
          "<td>" + info.disk_size + "</td>" +
          "<td>" + info.doc_count + "</td>" +
          "<td>" + info.update_seq + "</td>" +
          "</tr>").appendTo(tbody).data("database", info.db_name);

        var cell = row.find("td:first-child");

        if (msj.picked == info.db_name) {
            row.addClass("selected");
        }

        $("<a href=\"\">" + info.db_name + "</a>")
            .appendTo(cell)
            .click(function() {
                picker.update(info.db_name);
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

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
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
