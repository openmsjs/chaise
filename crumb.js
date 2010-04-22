var el = msjs.publish($(<div>
    <span/><a target="_blank">go to url</a>
</div>));

var span = el.find("span");
var link = el.find("a");

var hostPicker = msjs.require("chaise.host.list.picker");
var databasePicker = msjs.require("chaise.database.list.picker");
var documentPicker = msjs.require("chaise.document.list.picker");
var shower = msjs(function() {
    var url = "";

    var host = hostPicker();
    if (host) url += "http://" + host;

    var database = databasePicker();
    if (database) url += "/" + database;


    var document = documentPicker();
    if (document) url += "/" + (document.id || "(new document)");

    span.text(url + " ");
    link.attr("href", url);

    el.css("visibility", url ? "visible" : "hidden");

}).depends(hostPicker, databasePicker, documentPicker);

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    marginTop: "10px"
});
dom.addCss(cssId + " span", {
    fontSize: "15px",
    fontWeight: "bold"
});
dom.addCss(cssId + " a", {
    fontSize: "10px"
});
