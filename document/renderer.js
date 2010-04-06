var el = msjs.publish($(<div/>)
  .append(msjs.require("chaise.document.create.renderer"))
  .append(msjs.require("chaise.document.list.renderer"))
  .append(msjs.require("chaise.document.detail.renderer"))
);

var shower = msjs(function(msj) {
    el.css("display", msj.database ? "" : "none");
});
shower.push("chaise.database.list.picker", "database");
