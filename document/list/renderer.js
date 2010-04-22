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
var toPrettyJSON = msjs.require("chaise.document.toprettyjson");
var listPicker = msjs.require("chaise.document.list.picker");
var descending = msjs.require("chaise.document.list.descending");
var submitter = msjs.require("chaise.document.remove.submitter");
var lister = msjs.require("chaise.document.list.lister");
var typePicker = msjs.require("chaise.document.list.type.picker");
var emptyList = {rows:[]};
var reduceOpts = msjs.require("chaise.document.view.reduce.submitter");
var renderer = msjs(function() {
    thead.children().remove();
    tbody.children().remove();

    var list = lister.ifUpdated() || emptyList;
    if (list.rows.length) {
        el.removeClass("no-results");
        status.text("").css("color", "");
    } else {
        el.addClass("no-results");
        status.text("No documents").css("color", "#FF0000");
    }

    var picked = typePicker();
    if (!picked) return;

    var isView = picked.type == "view";
    var ropts = reduceOpts();
    var hasKeys = !ropts || !ropts.reduce || ropts.group || !!ropts.group_level;
    $.each(list.rows, function(i, doc) {
        var row = $("<tr/>").appendTo(tbody).data("doc", doc);
        if (i % 2 == 0) row.addClass("odd");

        if (doc.id) {
            $("<a href=\"#\" tabindex=\"-1\">Delete</a>")
                .appendTo($("<td class=\"remover\"/>").appendTo(row))
                .click(function() {
                    submitter({_id: doc.id, _rev: doc.value.rev});
                    return false;
                });
        }

        if (!isView) {
            var num = i+list.offset+1;
            if (descending()) num = list.total_rows - num + 1;
            row.append("<td class=\"count\">" + num + "</td>");
        }

        if (doc.id) {
            var cell = $("<td/>").appendTo(row);
            var key  = (isView ? (doc.key ? toPrettyJSON(doc.key) : "undefined") : doc.id);
            $("<a href=\"#\">" + key + "<a>")
                .appendTo(cell)
                .click(function() {
                    listPicker(doc);
                    return false;
                });
            if (isView) {
                $("<br/><span>id: " + doc.id + "</span>")
                    .appendTo(cell)
                    .css({color: "#8A8A8A"});
            }
        } else if (hasKeys) { // reduce with group level
            var key  = doc.key ? toPrettyJSON(doc.key) : "undefined";
            $("<a href=\"#\">" + key + "<a>")
                .appendTo($("<td/>").appendTo(row))
                .click(function() {
                    listPicker(doc);
                    return false;
                });
        }
        row.append("<td>" + (isView ? toPrettyJSON(doc.value) : doc.value.rev) + "</td>");
    });

    var arrow = descending() ? "&darr;" : "&uarr;";
    if (isView) {
        if (hasKeys) {
            $("<tr><th class=\"remover\">Delete?</th><th>key <span class=\"arrow\">" + arrow + "<span></th><th>value</th></tr>").appendTo(thead);
        } else {
            $("<tr><th>value</th></tr>").appendTo(thead);
        }
    } else {
        $("<tr><th class=\"remover\">Delete?</th><th class=\"count\">#/" + list.total_rows + "</th><th>_id <span class=\"arrow\">" + arrow + "</span></th><th>_rev</th></tr>").appendTo(thead);
    }

    thead.unbind("click").click(function() {
        descending(!descending());
    });

    return true;
}).depends(lister);


//selector
msjs(function() {
    tbody.find(".selected").removeClass("selected");
    var picked = listPicker();
    if (picked) {
        $.each(tbody.children(), function(i, row) {
            var doc = $(row).data("doc");
            if (picked.id == doc.id &&
                msjs.toJSON(picked.key) == msjs.toJSON(doc.key)) {
                $(row).addClass("selected");
                return false;
            }
        });
    }
}).depends(renderer, listPicker);

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
