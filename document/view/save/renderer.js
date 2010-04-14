var el = msjs.publish($(<div>
    <a href="#" class="save toggle">Save as</a>
    <form>
        <table><tbody>
            <tr><th>Design document:</th><td>_design/<input name="designName"/></td></tr>
            <tr>
                <th>View name:</th>
                <td>
                    <input name="viewName"/>
                    <input type="submit" value="Save"/>
                </td>
            </tr>
        </tbody></table>
    </form>
</div>));

var saveLink = el.find("a.save");
var cancelLink = el.find("canc.save");
var form = el.find("form");
saveLink.click(function(){
    if (el.hasClass("saving")) {
        el.removeClass("saving");
        saveLink.text("Save as");
    } else {
        el.addClass("saving");
        saveLink.text("Cancel save");
    }
    return false;
});

var renderer = msjs(function(msj) {
    if (!msj.type.design) return;
    form.find("[name=designName]").val(msj.type.design);
    form.find("[name=viewName]").val(msj.type.view);
    form.data("viewInfo", msj.type);
});
renderer.push("chaise.document.list.type.picker", "type");


var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    display: "inline"
});
dom.addCss(cssId + " table", {
    border: "none",
    width: "400px",
    padding: "10px 0px"
});
dom.addCss(cssId + " th", {
    color: "#4A4A4A",
    textAlign: "right"
});
dom.addCss(cssId + " form", {
    display: "none",
    backgroundColor: "#FAFAFA",
    border: "1px solid #CACACA",
    borderBottom: "0px"
});
dom.addCss(cssId + ".saving form", {
    display: "block"
});
