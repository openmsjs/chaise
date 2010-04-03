var el = msjs.publish($(<div>
    <div class="create">
        <a href="#">create database</a>
        <form>
            <input name="db" autocomplete="off"/>
            <input type="submit" value="create"/>
            <input type="reset" value="cancel"/>
        </form>
    </div>
    <table>
        <thead>
            <tr>
                <th>name</th>
                <th>size</th>
                <th>document count</th>
                <th>update seq</th>
            </tr>
        </thead>
        <tbody/>
    </table>
    <div class="status"/>
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
var submitter = msjs.require("chaise.database.submitter");
form.submit(function() {
    submitter.update(dbInput[0].value);
    return reset();                
});
dbInput.keypress(function(event) {
    // escape
    if (event.keyCode == "27") {
        form[0].reset();
    }
});

var status = el.find(".status");
var renderer = msjs(function(msj) {
    var tbody = el.find("tbody");
    tbody.children().remove();
    if (msj.list.length) {
        el.removeClass("no-result");
        status.text("").css("color", "");
    } else {
        el.addClass("no-result");
        status.text("no documents").css("color", "teal");
    }
    $.each(msj.list, function(i, info) {
        $("<tr>" +
          "<td class=\"name\">" + info.db_name + "</td>" +
          "<td>" + info.disk_size + "</td>" +
          "<td>" + info.doc_count + "</td>" +
          "<td>" + info.update_seq + "</td>" +
          "</tr>").appendTo(tbody).data("info", info);
    });
    tbody.find("tr").click(handleClick);
});
renderer.push("chaise.database.list", "list");

var picker = msjs.require("chaise.database.picker");
var handleClick = function() {
    picker.update($(this).data("info"));
}



var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId + " table", {
    width: "100%",
    border: "1px solid #A7A7A7",
    borderSpacing: "0"
});
dom.addCss(cssId + ".no-result table", {
    display: "none"
});
dom.addCss(cssId + " thead", {
    backgroundColor: "#DADADA"
});
dom.addCss(cssId + " th," +
           cssId + " td", {
    padding: "2px 10px",
    textAlign: "right"
});
dom.addCss(cssId + " th:first-child," + 
           cssId + " td:first-child", {
    textAlign: "left"
});

dom.addCss(cssId + " .create form," +
           cssId + ".adding .create a", {
    display: "none"
});
dom.addCss(cssId + ".adding .create form", {
    position: "absolute"               
});
dom.addCss(cssId + ".adding  .create form," +
           cssId + " .create a", {
    display: "block"
});
dom.addCss(cssId + " .create", {
    height: "20px",
    overflow: "hidden"
});
dom.addCss(cssId + " .create", {
    height: "20px"
});
