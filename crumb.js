var el = msjs.publish($(<div>
    <a class="url" target="_blank"/>
    <div class="toggles">
        <a class="host toggle" href="#">Hide hosts</a>
        <a class="database toggle" href="#">Hide databases</a>
    </div>
</div>));

var urlLink = el.find(".url");
var hostToggle = el.find(".host");
var databaseToggle = el.find(".database");

var hostRenderer = msjs.require("chaise.host.renderer");
var databaseRenderer = msjs.require("chaise.database.renderer");
var documentRenderer = msjs.require("chaise.document.renderer");
el.find("a.toggle").click(function() {
    var link = $(this);
    if (link.hasClass("host")) {
        var show = hostRenderer.css("display") == "none";
        hostRenderer.animate({height: "toggle", marginTop: "toggle"}, 250);
        hostToggle.text(show ? "Hide hosts" : "Show hosts");
    } else if (link.hasClass("database")) {
        var show = databaseRenderer.css("display") == "none";
        databaseRenderer.animate({height: "toggle", marginTop: "toggle"}, 250);
        databaseToggle.text(show ? "Hide databases" : "Show databases");
    }
    return false;
});

var hostPicker = msjs.require("chaise.host.list.picker");
var databasePicker = msjs.require("chaise.database.list.picker");
var documentPicker = msjs.require("chaise.document.list.picker");
var shower = msjs(function() {
    var url = "";

    var host = hostPicker.getMsj();
    if (host) url += "http://" + host;

    var database = databasePicker.getMsj();
    if (database) url += "/" + database;


    var document = documentPicker.getMsj();
    if (document) url += "/" + document.id;

    urlLink.attr("href", url);
    urlLink.text(url);
});
shower.depends(hostPicker);
shower.depends(databasePicker);
shower.depends(documentPicker);

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    marginTop: "10px"
});
dom.addCss(cssId + " a.url", {
    fontSize: "15px",
    fontWeight: "bold"
});
dom.addCss(cssId  + " .toggles", {
    marginTop: "5px"
});
dom.addCss(cssId  + " a.toggle", {
    marginRight: "10px"
});
