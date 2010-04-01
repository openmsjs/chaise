var el = msjs.require("chaise.database.element");

var list = msjs(function(msj) {
    var couch = new (msjs.require("chaise.couch.server"))(msj.host);
    var list = [];
    $.each(couch.getDatabaseList(), function(i, dbName) {
        var db = couch.getDatabase(dbName);
        list.push(db.getInfo());
    });
    return list;
});
list.push("chaise.host.picker", "host");
list.packMe = false;

var picker = msjs.publish(msjs());
var listRenderer = msjs(function(msj) {
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
listRenderer.push(list, "list");

var handleClick = function() {
    picker.update($(this).data("info"));
}
