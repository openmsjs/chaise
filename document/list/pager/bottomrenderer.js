var el = msjs.publish($(<div/>));
var makePageLinks = msjs.require("chaise.document.list.pager.makepagelinks");
var renderer = msjs(function(msj) {
    makePageLinks(el, msj.list, msj.pageSize, msj.currentPage);
});
renderer.push("chaise.document.list.lister", "list");
renderer.pull("chaise.document.list.pagesize.selector", "pageSize");
renderer.pull("chaise.document.list.pager.selector", "currentPage");

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    margin: "5px 0px 10px 0px"
});
