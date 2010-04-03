var el = msjs.publish($(<div>
    <div class="create">
        <a href="#" class="add">add host</a>
        <form>
            <input name="host" autocomplete="off"/>
            <input type="submit" value="add host"/>
            <input type="reset" value="cancel"/>
        </form>
        <span/>
    </div>
    <table>
        <thead>
            <tr><th>host</th></tr>
        </thead>
        <tbody/>
    </table>
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
var submitter = msjs.require("chaise.host.submitter");
form.submit(function() {
    submitter.update({type: "add", host: hostInput[0].value});
    return reset();                
});
hostInput.keypress(function(event) {
    // escape
    if (event.keyCode == "27") {
        form[0].reset();
    }
});

var status = el.find("span");
var picker = msjs.require("chaise.host.picker");
var renderer = msjs(function(msj) {
    var tbody = el.find("tbody");
    tbody.children().remove();

    if (msj.list.length) {
        el.removeClass("no-results");
        status.text("").css("color", "");
    } else {
        el.addClass("no-results");
        status.text("no hosts").css("color", "teal");
    }

    $.each(msj.list, function(i, host) {
        var cell = $("<tr><td></td></tr>").appendTo(tbody).find("td");
        $("<a href=\"\">" + host + "</a>")
            .appendTo(cell)
            .click(function() {
                picker.update(host);
                return false;
            });
        $("<a href=\"#\" class=\"control\">delete</a>")
            .appendTo(cell)
            .click(function() {
                submitter.update({type: "remove", host: host});
                return false;
            });
    });
});
renderer.push("chaise.host.list", "list");

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId + " table", {
    border: "1px solid #A7A7A7",
    borderSpacing: "0",
    width: "100%"
});
dom.addCss(cssId + " thead", {
    backgroundColor: "#DADADA"
});
dom.addCss(cssId + " th," +
           cssId + " td", {
    textAlign: "left",
    padding: "2px 10px"
});
dom.addCss(cssId + ".no-results table", {
    display: "none"
});

dom.addCss(cssId + " .create form", {
    display: "none"
});
dom.addCss(cssId + ".adding .create form", {
    display: "block"
});
dom.addCss(cssId + " a.add", {
    display: "block"
});
dom.addCss(cssId + ".adding a.add", {
    display: "none"
});
dom.addCss(cssId + " a.control", {
    marginLeft: "5px"
});
