var el = msjs.publish($(<div>
    <table>
        <thead>
            <tr>
                <th>_id</th>
                <th>_rev</th>
            </tr>
        </thead>
        <tbody/>
    </table>
    <div class="status"/>
</div>));

var tbody = el.find("tbody");
var status = el.find(".status");
var picker = msjs.require("chaise.document.list.picker");
var remover = msjs.require("chaise.document.remove.submitter");
var renderer = msjs(function(msj) {
    tbody.children().remove();
    if (msj.list.rows.length) {
        el.removeClass("no-results");
        status.text("").css("color", "");
    } else {
        el.addClass("no-results");
        status.text("no documents").css("color", "teal");
    }
    $.each(msj.list.rows, function(i, doc) {
        var row = $("<tr><td></td><td>" + doc.value.rev + "</td></tr>")
            .appendTo(tbody)
            .data("docId", doc.key);

        var cell = row.find("td:first-child");
        $("<a href=\"#\">" + doc.key + "</a>")
            .appendTo(cell)
            .click(function() {
                picker.update(doc);
                return false;
            });
        $("<a href=\"#\" class=\"remover\" tabindex=\"-1\">Delete</a>")
            .appendTo(cell)
            .click(function() {
                remover.update({_id: doc.id, _rev: doc.value.rev});
                return false;
            });
    });

    return true;
});
renderer.push("chaise.document.list.lister", "list");

var selector = msjs(function(msj) {
    tbody.find(".selected").removeClass("selected");
    if (msj.picked) {
        $.each(tbody.children(), function(i, row) {
            if (msj.picked.id == $(row).data("docId")) {
                $(row).addClass("selected");
                return false;
            }
        });
    }
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
