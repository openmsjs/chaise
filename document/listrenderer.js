var el = msjs.publish($(<table>
    <thead>
        <tr>
            <th>#</th>
            <th>key</th>
            <th>value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <a class="new-document" href="#">new document</a>
            </td>
        </tr>
    </tbody>
</table>));

var picker = msjs.require("chaise.document.picker");
var renderer = msjs(function(msj) {
    var tbody = el.find("tbody");
    tbody.children("tr:not(:first)").remove();

    $.each(msj.list.rows, function(i, doc) {
        $("<tr>" +
          "<td>" + (i+msj.list.offset) + "</td>" +
          "<td>" + doc.key + "</td>" +
          "<td>" + msjs.toJSON(doc.value) + "</td>" +
          "</tr>").appendTo(tbody).data("doc", doc);
    });
    tbody.find("tr:not(:first)").click(handleClick);
});
renderer.push("chaise.document.list", "list");

el.find("a.new-document").click(function(){
    picker.update({doc: {}});
    return false;
});


var handleClick = function() {
    picker.update($(this).data("doc"));
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
    padding: "2px 10px"
});
