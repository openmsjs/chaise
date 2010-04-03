var picker = msjs.require("chaise.host.picker");
var el = msjs.publish($(<table>
    <thead>
        <tr><th>host</th></tr>
    </thead>
    <tbody/>
</table>));

var renderer = msjs(function(msj) {
    var tbody = el.find("tbody");
    tbody.children().remove();

    $.each(msj.list, function(i, host) {
        $("<tr><td>" + host + "</td></tr>")
            .appendTo(tbody)
            .data("host", host);
    });
    tbody.find("tr").click(handleClick);
});
renderer.push("chaise.host.list", "list");

var handleClick = function() {
    picker.update($(this).data("host"));
};

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
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

