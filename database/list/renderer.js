var el = msjs.publish($(<div>
    <table>
        <thead>
            <tr>
                <th>name</th>
                <th>size</th>
                <th>document count</th>
                <th>update seq</th>
            </tr>
        </thead>
        <tbody/>
    </table>
    <div class="status"/>
</div>));

var status = el.find(".status");
var picker = msjs.require("chaise.database.list.picker");
var remover = msjs.require("chaise.database.remove.submitter");
var renderer = msjs(function(msj) {
    var tbody = el.find("tbody");
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
          "</tr>").appendTo(tbody);

        var cell = row.find("td:first-child");
        $("<a href=\"\">" + info.db_name + "</a>")
            .appendTo(cell)
            .click(function() {
                picker.update(info.db_name);
                return false;
            });
        $("<a href=\"#\" class=\"control\" tabindex=\"-1\">delete</a>")
            .appendTo(cell)
            .click(function() {
                remover.update(info.db_name);
                return false;
            });
    });
});
renderer.push("chaise.database.list.lister", "list");


var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId + " table", {
    width: "100%",
    border: "1px solid #A7A7A7",
    borderSpacing: "0"
});
dom.addCss(cssId + ".no-results table", {
    display: "none"
});
dom.addCss(cssId + " thead", {
    backgroundColor: "#DADADA"
});
dom.addCss(cssId + " th," +
           cssId + " td", {
    padding: "2px 10px",
    textAlign: "right"
});
dom.addCss(cssId + " th:first-child," + 
           cssId + " td:first-child", {
    textAlign: "left"
});
dom.addCss(cssId + " a.control", {
    marginLeft: "5px"
});
