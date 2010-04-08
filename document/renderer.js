var el = msjs.publish($(<div/>)
  .append(msjs.require("chaise.document.create.renderer"))
  .append(msjs.require("chaise.document.list.type.renderer"))
  .append(msjs.require("chaise.document.view.renderer"))
  .append(msjs.require("chaise.document.list.renderer"))
  .append(msjs.require("chaise.document.detail.renderer")
          .css(msjs.require("chaise.sectioncss")))
          .css("display", "none")
);

var shower = msjs(function(msj) {
    el.css("display", msj.database ? "block" : "none");
});
shower.push("chaise.database.list.picker", "database");
