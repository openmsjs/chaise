var el = msjs.publish($(<div>
    <table>
        <thead/>
        <tbody class="list"/>
    </table>
    <div class="status"/>
</div>));

var thead = el.find("thead");
var tbody = el.find("tbody.list");
var status = el.find(".status");
var picker = msjs.require("chaise.document.list.picker");
var remover = msjs.require("chaise.document.remove.submitter");
var toPrettyJSON = msjs.require("chaise.document.toprettyjson");
var descending = msjs.require("chaise.document.list.descending");
var renderer = msjs(function(msj) {
    thead.children().remove();
    tbody.children().remove();
    var list = msj.list;
    if (list.rows.length) {
        el.removeClass("no-results");
        status.text("").css("color", "");
    } else {
        el.addClass("no-results");
        status.text("No documents").css("color", "#FF0000");
    }

    if (!msj.picked) return;

    var isView = msj.picked.type == "view";
    var hasKeys = false;
    $.each(list.rows, function(i, doc) {
        var row = $("<tr/>").appendTo(tbody).data("doc", doc);
        if (i % 2 == 0) row.addClass("odd");

        if (doc.key) hasKeys = true;

        if (!isView) {
            var num = i+list.offset+1;
            if (msj.descending) num = list.total_rows - num + 1;
            row.append("<td class=\"count\">" + num + "</td>");
        }

        if (doc.key) {
            var cell = $("<td/>").appendTo(row);
            $("<a href=\"#\">" + (isView ? toPrettyJSON(doc.key) : doc.id) + "<a>")
                .appendTo(cell)
                .click(function() {
                    picker.update(doc);
                    return false;
                });
        }

        if (doc.id) {
            $("<a href=\"#\" class=\"remover\" tabindex=\"-1\">Delete</a>")
                .appendTo(cell)
                .click(function() {
                    remover.update({_id: doc.id, _rev: doc.value.rev});
                    return false;
                });
            if (isView) {
                $("<br/><span>id: " + doc.id + "</span>")
                    .appendTo(cell)
                    .css({color: "#8A8A8A"});
            }
        }

        row.append("<td>" + (isView ? toPrettyJSON(doc.value) : doc.value.rev) + "</td>");
    });

    var arrow = msj.descending ? "&darr;" : "&uarr;";
    if (isView) {
        if (hasKeys) {
            $("<tr><th>key <span class=\"arrow\">" + arrow + "<span></th><th>value</th></tr>").appendTo(thead);
        } else {
            $("<tr><th>value</th></tr>").appendTo(thead);
        }
    } else {
        $("<tr><th class=\"count\">#/" + list.total_rows + "</th><th>_id <span class=\"arrow\">" + arrow + "</span></th><th>_rev</th></tr>").appendTo(thead);
    }

    thead.unbind("click").click(function() {
        descending.update(!msj.descending);
    });

    return true;
});
renderer.push("chaise.document.list.lister", "list");
renderer.pull("chaise.document.list.type.picker", "picked");
renderer.pull(descending, "descending");

var selector = msjs(function(msj) {
    tbody.find(".selected").removeClass("selected");
    if (msj.picked) {
        $.each(tbody.children(), function(i, row) {
            var doc = $(row).data("doc");
            if (msj.picked.id == doc.id &&
                msj.picked.key == doc.key) {
                $(row).addClass("selected");
                return false;
            }
        });
    }
});
selector.pull(selector.depends(picker), "picked");
selector.depends(renderer);

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId + ".no-results table", {
    display: "none"
});
dom.addCss(cssId + " a.remover", {
    marginLeft: "5px"
});
dom.addCss(cssId + " thead .arrow", {
    color: "yellow",
    fontWeight: "bold"
});
dom.addCss(cssId + " thead", {
    cursor: "pointer"
});
dom.addCss(cssId + " .count", {
    textAlign: "center"
});
