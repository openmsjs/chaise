var el = msjs.publish($(<table>
    <thead>
        <tr>
            <th>name</th>
            <th>size</th>
            <th>document count</th>
            <th>update seq</th>
        </tr>
    </thead>
    <tbody/>
</table>));

var picker = msjs.require("chaise.dblist.picker");
var renderer = msjs(function(msj) {
    var tbody = el.find("tbody");
    tbody.children().remove();
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
renderer.push("chaise.dblist.list", "list");

var handleClick = function() {
    picker.update($(this).data("info"));
}

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    width: "100%",
    border: "1px solid #A7A7A7",
    borderSpacing: "0"
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
