var el = msjs.publish($(<div>
    <span/>
    <table>
        <thead>
            <tr><th>host</th></tr>
        </thead>
        <tbody/>
    </table>
</div>));

var status = el.find("span");
var picker = msjs.require("chaise.host.list.picker");
var remover = msjs.require("chaise.host.remove.submitter");
var tbody = el.find("tbody");
var renderer = msjs(function(msj) {
    tbody.children().remove();

    if (msj.list.length) {
        el.removeClass("no-results");
        status.text("").css("color", "");
    } else {
        el.addClass("no-results");
        status.text("no hosts").css("color", "teal");
    }

    $.each(msj.list, function(i, host) {
        var row = $("<tr><td></td></tr>").data("host", host).appendTo(tbody);
        var cell = row.find("td");
        $("<a href=\"#\">" + host + "</a>")
            .appendTo(cell)
            .click(function() {
                picker.update(host);
                return false;
            });
        $("<a href=\"#\" class=\"remover\" tabindex=\"-1\">delete</a>")
            .appendTo(cell)
            .click(function() {
                remover.update(host);
                return false;
            });
    });

    return true;
});
renderer.push("chaise.host.list.lister", "list");

var selector = msjs(function(msj) {
    tbody.find(".selected").removeClass("selected");
    $.each(tbody.children(), function(i, row) {
        if (msj.picked == $(row).data("host")) {
            $(row).addClass("selected");
            return false;
        }
    });
});
selector.push(picker, "picked");
selector.depends(renderer);

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId + " table", {
    border: "1px solid #A7A7A7",
    borderSpacing: "0",
    width: "100%"
});
dom.addCss(cssId + " thead", {
    backgroundColor: "#DADADA"
});
dom.addCss(cssId + " th," +
           cssId + " td", {
    textAlign: "left",
    padding: "2px 10px"
});
dom.addCss(cssId + ".no-results table", {
    display: "none"
});
dom.addCss(cssId + " a.remover", {
    marginLeft: "5px"
});
dom.addCss(cssId + " .selected", {
    backgroundColor: "#EFEFC2"
});
