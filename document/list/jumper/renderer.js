var el = msjs.publish($(<form>
    <label><a href="#" class="toggle">Jump to document</a> <input name="docId" autocomplete="off"/></label>
</form>));

var input = el.find("input");
var toggle = el.find(".toggle");
toggle.click(function() {
    if (el.hasClass("jumping")) {
        el.removeClass("jumping");
    } else {
        el.addClass("jumping");
        input.focus();
    }
    return false;
});
input.keydown(function(event) {
    if (event.keyCode == 27) toggle.click();
});
var selector = msjs.require("chaise.document.list.jumper.selector");
el.submit(function() {
    var docId = input.val();
    input.val("");
    selector.update({id: docId, key: docId});
    el.removeClass("jumping");
    return false;
});

var picker = msjs.require("chaise.document.list.type.picker");
var shower = msjs(function() {
    el.css("display", picker.getMsj().type == "view" ? "none" : "");
});
shower.depends(picker);

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    display: "inline",
    marginRight: "5px"
});
dom.addCss(cssId + ".jumping input", {
    display: "inline"
});
dom.addCss(cssId + " input", {
    width: "150px",
    display: "none"
});
