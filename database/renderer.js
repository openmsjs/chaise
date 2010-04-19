var el = msjs.publish($(<div>
    <a class="toggle" href="#">Hide databases</a>
    <div/>
</div>).css("display", "none"));
var createRenderer = msjs.require("chaise.database.create.renderer");
var loadRenderer = msjs.require("chaise.database.import.renderer");
var content = el.children("div")
    .append(createRenderer)
    .append(loadRenderer)
    .append(msjs.require("chaise.database.list.renderer"))
    .css("marginTop", "5px");

var shower = msjs(function(msj) {
    el.css("display", msj.host ? "block" : "none");
    if (msj.host && content.css("display") == "none") toggle.click();
});
shower.push("chaise.host.list.picker", "host");

var toggle = el.children("a.toggle").click(function() {
    var show = content.css("display") == "none";
    content.animate({height: "toggle", marginTop: "toggle"}, "fast");
    $(this).text(show ? "Hide databases" : "Show databases");
});


var dom = msjs.require("msjs.dom");
dom.addCss(dom.getCssId(createRenderer[0]) + "," +
           dom.getCssId(loadRenderer[0]), {
    display: "inline",
    marginRight: "10px"
});

