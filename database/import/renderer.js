var el = msjs.publish($(<div>
    <a href="#" title="Import file with CouchDB views and data">Import</a>
    <form>
        <input name="package" autocomplete="off"/>
        <input type="submit" value="Import"/>
        <input type="reset" value="Cancel"/>
    </form>
</div>));

var form = el.find("form");
var packageName = form.find("input[name='package']"); 
el.find("a").click(function() {
    el.addClass("importing");
    packageName.focus();
    return false;                       
});
var reset = function() {
    el.removeClass("importing");
    packageName[0].value = "";
    return false;
};
form.bind("reset", reset);
var submitter = msjs.require("chaise.database.import.submitter");
form.submit(function() {
    submitter(packageName[0].value);
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
           cssId + ".importing a", {
    display: "none"
});
dom.addCss(cssId + ".importing form", {
    display: "block"
});
