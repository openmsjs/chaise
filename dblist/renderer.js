var el = msjs.publish($(<table>
    <thead>
        <tr>
            <th>name</th>
            <th>size</th>
            <th>document count</th>
            <th>update seq</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <div class="create">
                    <a href="#">new</a>
                    <form>
                        <input name="db" autocomplete="off"/>
                        <input type="submit" value="create"/>
                        <input type="reset" value="cancel"/>
                    </form>
                </div>
            </td>
        </tr>
    </tbody>
</table>));

var form = el.find("form");
var dbInput = form.find("input[name='db']"); 
el.find("a").click(function() {
    el.addClass("creating");
    dbInput.focus();
    return false;                       
});
var reset = function() {
    el.removeClass("creating");
    dbInput[0].value = "";
    return false;
};
form.bind("reset", reset);
var submitter = msjs.require("chaise.dblist.submitter");
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

var renderer = msjs(function(msj) {
    var tbody = el.find("tbody");
    tbody.children("tr:not(:first)").remove();
    $.each(msj.list, function(i, info) {
        $("<tr>" +
          "<td class=\"name\">" + info.db_name + "</td>" +
          "<td>" + info.disk_size + "</td>" +
          "<td>" + info.doc_count + "</td>" +
          "<td>" + info.update_seq + "</td>" +
          "</tr>").appendTo(tbody).data("info", info);
    });
    tbody.find("tr:not(:first)").click(handleClick);
});
renderer.push("chaise.dblist.list", "list");

var picker = msjs.require("chaise.dblist.picker");
var handleClick = function() {
    picker.update($(this).data("info"));
}

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    width: "100%",
    border: "1px solid #A7A7A7",
    borderSpacing: "0"
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
           cssId + ".creating .create a", {
    display: "none"
});
dom.addCss(cssId + ".creating .create form", {
    position: "absolute"               
});
dom.addCss(cssId + ".creating .create form," +
           cssId + " .create a", {
    display: "block"
});
dom.addCss(cssId + " .create", {
    height: "20px"
});
dom.addCss(cssId + " .create", {
    height: "20px"
});
