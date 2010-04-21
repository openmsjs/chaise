var el = msjs.publish($(<div>
    <a class="toggle" href="#">Hide hosts</a>
    <div/>
</div>));

var content = el.children("div")
    .append(msjs.require("chaise.host.add.renderer"))
    .append(msjs.require("chaise.host.list.renderer"))
    .css("marginTop", "5px");

el.children("a.toggle").click(function() {
    var show = content.css("display") == "none";
    content.animate({height: "toggle", marginTop: "toggle"}, 250);
    $(this).text(show ? "Hide hosts" : "Show hosts");
    return false;
});

