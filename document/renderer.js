var header = $(<div/>)
    .append(msjs.require("chaise.document.list.pagesize.renderer"))
    .append(msjs.require("chaise.document.list.pager.jumperrenderer"))
    .append(msjs.require("chaise.document.list.jumper.renderer"))
    .append(msjs.require("chaise.document.view.jumper.renderer"))
    .append(msjs.require("chaise.document.view.renderer"));

var dom = msjs.require("msjs.dom");
var headerCssId = dom.getCssId(header[0]);
dom.addCss(headerCssId, {
    margin: "10px 0px",
    minHeight: "20px"
});


var el = msjs.publish($(<div>
    <a class="toggle" href="#">Hide document list</a>
    <div/>
</div>));
var content = el.children("div")
    .append(msjs.require("chaise.document.create.renderer"))
    .append(msjs.require("chaise.document.list.type.renderer"))
  //  .append(msjs.require("chaise.document.list.options.renderer"))
    .append(msjs.require("chaise.document.view.reduce.renderer"))
    .append(header)
    .append(msjs.require("chaise.document.list.pager.renderer").find(".top"))
    .append(msjs.require("chaise.document.list.renderer"))
    .append(msjs.require("chaise.document.list.pager.renderer").find(".bottom"))
    .css("marginTop", "5px");
el.append(msjs.require("chaise.document.detail.renderer")
          .css(msjs.require("chaise.sectioncss")))
          .css("display", "none");

el.children("a.toggle").click(function() {
    var show = content.css("display") == "none";
    content.animate({height: "toggle", marginTop: "toggle"}, 250);
    $(this).text(show ? "Hide document list" : "Show document list");
});


var shower = msjs(function(msj) {
    el.css("display", msj.database ? "block" : "none");
});
shower.push("chaise.database.list.picker", "database");

