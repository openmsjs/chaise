var el = msjs.publish($(<pre>
</pre>));

var toJSON = msjs.require("chaise.document.tojson");
var renderer = msjs(function(msj) {
    msj.doc ? el.text(toJSON(msj.doc)) : el.text("");
});
renderer.push("chaise.document.info", "doc");

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    width: "100%",
    border: "1px solid #A7A7A7",
    borderSpacing: "0"
});
dom.addCss(cssId + " thead", {
    backgroundColor: "#DADADA"
});
dom.addCss(cssId + " th," +
           cssId + " td", {
    padding: "2px 10px"
});
