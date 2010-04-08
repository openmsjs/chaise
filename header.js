var header = msjs.publish($(<div>
    <div class="logo">
        <a class="main" href="http://github.com/openmsjs/chaise" target="_blank">Chaise</a>
        <span class="byline"> kick your feet up</span>
    </div>
    <div class="control">
        <a name="unlock" href="#" title="Display host, database and document delete controls">Allow delete</a>
    </div>
</div>));

$(header.find("[name='unlock']"))
    .click(function() {
        var body = $(document.body);
        var className = "unlocked";
        if (body.hasClass(className)) {
            body.removeClass(className);
            $(this).text("Allow deletes");
        } else {
            body.addClass(className);
            $(this).text("Disallow delete");
        }
    });


var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(header[0]);
dom.addCss(cssId, {
    backgroundColor: "black",
    padding: "10px"
});

dom.addCss(cssId + " .logo", {
    cssFloat: "left"
});
dom.addCss(cssId + " .logo .main", {
    color: "white",
    fontWeight: "bold",
    fontSize: "25px"
});

dom.addCss(cssId + " .logo .byline", {
    color: "#FFE59F",
    verticalAlign: "bottom",
    fontSize: "12px"
});
dom.addCss(cssId + " .control", {
    textAlign: "right"
});
dom.addCss(cssId + " .control a", {
    color: "white"
});
dom.addCss("a.remover", {
    display: "none"
});
dom.addCss(".unlocked a.remover", {
    display: "inline"
});
