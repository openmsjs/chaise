var el = msjs.publish($(<div>
    <table>
        <thead/>
        <tbody/>
    </table>
    <div class="status"/>
</div>));

var thead = el.find("thead");
var tbody = el.find("tbody");
var status = el.find(".status");
var picker = msjs.require("chaise.document.list.picker");
var remover = msjs.require("chaise.document.remove.submitter");
var toPrettyJSON = msjs.require("chaise.document.detail.toprettyjson");
var renderer = msjs(function(msj) {
    thead.children().remove();
    tbody.children().remove();
    if (msj.list.rows.length) {
        el.removeClass("no-results");
        status.text("").css("color", "");
    } else {
        el.addClass("no-results");
        status.text("no documents").css("color", "teal");
    }

    var isView = msj.type != "all" && msj.type != "design";
    var reduced = false;
    $.each(msj.list.rows, function(i, doc) {
        var row = $("<tr><td>" + (isView ? toPrettyJSON(doc.value) : doc.value.rev) + "</td></tr>")
            .appendTo(tbody)
            .data("doc", doc);

        if (doc.id) {
            var cell = $("<td/>").insertBefore(row.children()[0]);
            $("<a href=\"#\">" + (isView ? toPrettyJSON(doc.key) : doc.id) + "<a>")
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
            if (isView) {
                $("<br/><span>id: " + doc.id + "</span>")
                    .appendTo(cell)
                    .css({color: "#8A8A8A"});
            }
        } else {
            reduced = true;
        }
    });

    if (isView) {
        if (reduced) {
            $("<tr><th>value</th></tr>").appendTo(thead);
        } else {
            $("<tr><th>key</th><th>value</th></tr>").appendTo(thead);
        }
    } else {
        $("<tr><th>_id</th><th>_rev</th></tr>").appendTo(thead);
    }

    return true;
});
renderer.push("chaise.document.list.lister", "list");
renderer.pull("chaise.document.list.type.picker", "type");

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
