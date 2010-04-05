var el = msjs.publish($(<div>
    <a href="#" class="add">initialize</a>
    <form>
        <input name="package" autocomplete="off"/>
        <input type="submit" value="initialize"/>
        <input type="reset" value="cancel"/>
    </form>
</div>));

var form = el.find("form");
var packageName = form.find("input[name='package']"); 
el.find("a").click(function() {
    el.addClass("loading");
    packageName.focus();
    return false;                       
});
var reset = function() {
    el.removeClass("loading");
    packageName[0].value = "";
    return false;
};
form.bind("reset", reset);
var submitter = msjs.require("chaise.database.load.submitter");
form.submit(function() {
    submitter.update(packageName[0].value);
    return reset();                
});
packageName.keypress(function(event) {
    // escape
    if (event.keyCode == "27") {
        form[0].reset();
    }
});



var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId + " form," +
           cssId + ".loading a", {
    display: "none"
});
dom.addCss(cssId + ".loading form", {
    display: "block"
});
