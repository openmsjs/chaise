var el = msjs.publish($(<div>
    <a href="#" class="save toggle">Save as</a>
    <form>
        <label>Design document: _design/<input name="designName"/></label>
        <label>View name: <input name="viewName"/></label>
        <input type="submit" value="Save"/>
        <input type="reset" value="Cancel"/>
    </form>
</div>));

var saveLink = el.find("a.save");
saveLink.click(function(){
    if (el.hasClass("saving")) {
        el.removeClass("saving");
    } else {
        el.addClass("saving");
    }
    return false;
});

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    display: "inline"
});
dom.addCss(cssId + " form," +
           cssId + ".saving a.save", {
    display: "none"
});
dom.addCss(cssId + ".saving form," +
           cssId + " form label", {
    display: "block"
});
