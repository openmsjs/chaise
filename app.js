msjs.require("chaise.css");

$(<title>Chaise</title>).appendTo(document.head);
msjs.require("chaise.header").appendTo("body");
var css = msjs.require("chaise.sectioncss");
var el = $(<div/>)
    .append(msjs.require("chaise.host.renderer").css(css))
    .append(msjs.require("chaise.database.renderer").css(css))
    .append(msjs.require("chaise.document.renderer").css(css))
    .appendTo("body");

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    marginLeft: "auto",
    marginRight: "auto",
    minWidth: "500px",
    maxWidth: "800px"
});
