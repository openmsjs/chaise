var dom = msjs.require("msjs.dom");
var hosts = [
    "localhost:5984",
//     "localhost:5000"
];

$(<div>
    <table id="hosts">
        <thead>
            <tr><th>host</th></tr>
        </thead>
        <tbody/>
    </table>

    <table id="databases">
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
</div>).appendTo("body");

var hostsBody = $("body").find("#hosts tbody"); // workaround
var databasesBody = $("body").find("#databases tbody");
var hostPicker = msjs(function(){
    return hosts[0];
});
hostPicker.packMe = true;
$.each(hosts, function(i, host) {
    $("<tr><td>" + host + "</td></tr>").appendTo(hostsBody).data("host", host);
});

// couldn't put click handler in each. hostPicker isn't packed unless
// specified this way
hostsBody.find("tr").click(function() {
    hostPicker.update($(this).data("host"));
});


var dbList = msjs(function(msj) {
    var couch = new (msjs.require("chaise.couch.server"))(msj.host);
    var list = [];
    $.each(couch.getDatabaseList(), function(i, dbName) {
        var db = couch.getDatabase(dbName);
        list.push(db.getInfo());
    });
    return list;
});
dbList.push(hostPicker, "host");
dbList.packMe = false;

var dbUpdate = msjs();
var update = function() {
    dbUpdate.update($(this).data("info"));
}
var dbListRenderer = msjs(function(msj) {
    var tbody = $("body").find("#databases tbody"); //workaround
    $.each(msj.dbList, function(i, info) {
        $("<tr>" +
            "<td class=\"name\">" + info.db_name + "</td>" +
            "<td>" + info.disk_size + "</td>" +
            "<td>" + info.doc_count + "</td>" +
            "<td>" + info.update_seq + "</td>" +
        "</tr>").appendTo(tbody).data("info", info);
    });
    tbody.find("tr").click(update);
});
dbListRenderer.push(dbList, "dbList");

var listener = msjs(function(msj) {
    msjs.log(msj);
});
listener.push(dbUpdate, "dbUpdate");
listener.packMe=false;


dom.addCss("table", {
    border: "1px solid #A7A7A7",
    borderSpacing: "0"
});
dom.addCss("table#databases", {
    width: "100%"
});
dom.addCss("tbody", {
    cursor: "pointer"
});
dom.addCss("thead", {
    backgroundColor: "#DADADA"
});
dom.addCss("th, td", {
    padding: "2px 10px"
});
dom.addCss("#databases th, #databases td", {
    textAlign: "right"
});
dom.addCss("#databases th:first-child, #databases td:first-child", {
    textAlign: "left"
});
dom.addCss(".check", {
    textAlign: "left",
    width: "20px"
});
