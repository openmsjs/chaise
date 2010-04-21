var el = msjs.publish($(<div>
    <a href="#">Create database</a>
    <form>
        <input name="db" autocomplete="off"/>
        <input type="submit" value="Create database"/>
        <input type="reset" value="Cancel"/>
    </form>
</div>));

var form = el.find("form");
var dbInput = form.find("input[name='db']"); 
el.find("a").click(function() {
    el.addClass("adding");
    dbInput.focus();
    return false;                       
});
var reset = function() {
    el.removeClass("adding");
    dbInput[0].value = "";
    return false;
};
form.bind("reset", reset);
var submitter = msjs.require("chaise.database.create.submitter");
form.submit(function() {
    submitter(dbInput[0].value);
    return reset();                
});
dbInput.keypress(function(event) {
    // escape
    if (event.keyCode == "27") {
        form[0].reset();
    }
});


var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId + " form," +
           cssId + ".adding a", {
    display: "none"
});
dom.addCss(cssId + ".adding form", {
    display: "inline"
});
