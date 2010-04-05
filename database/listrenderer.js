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
        $("<tr>" +
          "<td class=\"name\">" + info.db_name + "</td>" +
          "<td>" + info.disk_size + "</td>" +
          "<td>" + info.doc_count + "</td>" +
          "<td>" + info.update_seq + "</td>" +
          "</tr>").appendTo(tbody).data("info", info);
    });
    tbody.find("tr").click(handleClick);
});
renderer.push("chaise.database.list", "list");

var picker = msjs.require("chaise.database.picker");
var handleClick = function() {
    picker.update($(this).data("info"));
}


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
