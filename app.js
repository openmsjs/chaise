msjs.require("chaise.css");

msjs.require("chaise.header").appendTo("body");
var el = $(<div/>)
    .append(msjs.require("chaise.host.renderer"))
    .append(msjs.require("chaise.database.renderer"))
    .append(msjs.require("chaise.document.renderer"))
    .appendTo("body");

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    margin: "10px"    
});
