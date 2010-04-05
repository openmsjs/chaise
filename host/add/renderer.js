var el = msjs.publish($(<div>
    <a href="#" class="add">add host</a>
    <form>
        <input name="host" autocomplete="off"/>
        <input type="submit" value="add host"/>
        <input type="reset" value="cancel"/>
    </form>
</div>));

var form = el.find("form");
var hostInput = form.find("input[name='host']"); 
el.find("a").click(function() {
    el.addClass("adding");
    hostInput.focus();
    return false;                       
});
var reset = function() {
    el.removeClass("adding");
    hostInput[0].value = "";
    return false;
};
form.bind("reset", reset);
var adder = msjs.require("chaise.host.add.submitter");
form.submit(function() {
    adder.update(hostInput[0].value);
    return reset();                
});
hostInput.keypress(function(event) {
    // escape
    if (event.keyCode == "27") {
        form[0].reset();
    }
});


var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId + " form," +
           cssId + ".adding a.add", {
    display: "none"
});
dom.addCss(cssId + ".adding form", {
    display: "block"
});

