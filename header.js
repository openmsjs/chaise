var header = msjs.publish($(<div>
    <div class="logo">
        <span class="main">Chaise</span><span class="byline"> kick your feet up</span>
    </div>
    <div class="control">
        <a name="unlock" href="#" title="display host, database and document delete links">unlock</a>
    </div>
</div>));

$(header.find("[name='unlock']"))
    .click(function() {
        var body = $(document.body);
        var className = "unlocked";
        if (body.hasClass(className)) {
            body.removeClass(className);
            $(this).text("unlock");
        } else {
            body.addClass(className);
            $(this).text("lock");
        }
    });


var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(header[0]);
dom.addCss(cssId, {
    backgroundColor: "black",
    color: "white",
    padding: "10px"
});

dom.addCss(cssId + " .logo", {
    cssFloat: "left"
});
dom.addCss(cssId + " .logo .main", {
    fontWeight: "bold",
    fontSize: "25px"
});
dom.addCss(cssId + " .logo .byline", {
    color: "red",
    verticalAlign: "bottom",
    fontSize: "12px"
});
dom.addCss(cssId + " .control", {
    textAlign: "right"
});
dom.addCss(cssId + " .control a", {
    textDecoration: "none",
    color: "white"
});
dom.addCss(cssId + " .control a:hover", {
    textDecoration: "underline"
});
dom.addCss("a.remover", {
    display: "none"
});
dom.addCss(".unlocked a.remover", {
    display: "inline"
});
