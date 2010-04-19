var el = msjs.publish($(<div>
    <span/>
    <table>
        <thead>
            <tr><th>Host</th><th></th></tr>
        </thead>
        <tbody/>
    </table>
</div>));

var status = el.find("span");
var picker = msjs.require("chaise.host.list.picker");
var defaultSelector = msjs.require("chaise.host.list.default");
var remover = msjs.require("chaise.host.remove.submitter");
var tbody = el.find("tbody");
var renderer = msjs(function(msj) {
    tbody.children().remove();

    if (msj.list.length) {
        el.removeClass("no-results");
        status.text("").css("color", "");
    } else {
        el.addClass("no-results");
        status.text("No hosts").css("color", "#FF0000");
    }

    var defaultHost = defaultSelector.getMsj();
    $.each(msj.list, function(i, host) {
        var row = $("<tr/>").data("host", host).appendTo(tbody);
        if (i % 2 == 0) row.addClass("odd");

        var cell = $("<td/>").appendTo(row);
        $("<a href=\"#\">" + host + "</a>")
            .appendTo(cell)
            .click(function() {
                picker.update(host);
                return false;
            });
        $("<a href=\"#\" class=\"remover\" tabindex=\"-1\">Delete</a>")
            .appendTo(cell)
            .click(function() {
                remover.update(host);
                return false;
            });

        var defaultCell = $("<td/>").appendTo(row);
        
        if (!defaultHost && i == 0 || defaultHost == host) {
            $("<span>default</span>").appendTo(defaultCell);
        } else {
            $("<a href=\"#\">Set as default</a>")
                .appendTo(defaultCell)
                .click(function() {
                    defaultSelector.update(host);
                    return false;
                });
        }
    });

    return true;
});
renderer.pull(renderer.depends("chaise.host.list.lister"), "list");
renderer.depends(defaultSelector);

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
dom.addCss(cssId + ".no-results table", {
    display: "none"
});
dom.addCss(cssId + " a.remover", {
    marginLeft: "5px"
});
