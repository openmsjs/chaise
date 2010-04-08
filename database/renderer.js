var el = msjs.publish($(<div/>).css("display", "none"));
var createRenderer = msjs.require("chaise.database.create.renderer");
var loadRenderer = msjs.require("chaise.database.import.renderer");
el.append(createRenderer)
  .append(loadRenderer)
  .append(msjs.require("chaise.database.list.renderer"));

var shower = msjs(function(msj) {
    el.css("display", msj.host ? "block" : "none");
});
shower.push("chaise.host.list.picker", "host");

var dom = msjs.require("msjs.dom");
dom.addCss(dom.getCssId(createRenderer[0]) + "," +
           dom.getCssId(loadRenderer[0]), {
    display: "inline",
    marginRight: "10px"
});

