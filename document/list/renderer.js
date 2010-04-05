var el = msjs.publish($(<div>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>key</th>
                <th>value</th>
            </tr>
        </thead>
        <tbody/>
    </table>
    <div class="status"/>
</div>));

var status = el.find(".status");
var picker = msjs.require("chaise.document.list.picker");
var renderer = msjs(function(msj) {
    var tbody = el.find("tbody");
    tbody.children().remove();
    if (msj.list.rows.length) {
        el.removeClass("no-results");
        status.text("").css("color", "");
    } else {
        el.addClass("no-results");
        status.text("no documents").css("color", "teal");
    }
    $.each(msj.list.rows, function(i, doc) {
        $("<tr>" +
          "<td>" + (i+msj.list.offset+1) + "</td>" +
          "<td>" + doc.key + "</td>" +
          "<td>" + msjs.toJSON(doc.value) + "</td>" +
          "</tr>").appendTo(tbody).click(function() {
            picker.update(doc);
        });
    });
});
renderer.push("chaise.document.list.lister", "list");

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
    padding: "2px 10px"
});
