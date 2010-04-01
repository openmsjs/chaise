var hosts = [ "localhost:5984", "localhost:5000" ];
var picker = msjs.publish(msjs(function(){
    // load the first host by default
    return hosts[0];
}));

var el = msjs.require("chaise.host.element");
var listRenderer = msjs(function(msj) {
    var tbody = el.find("tbody");
    tbody.children().remove();

    $.each(hosts, function(i, host) {
        $("<tr><td>" + host + "</td></tr>")
            .appendTo(tbody)
            .data("host", host);
    });
    tbody.find("tr").click(handleClick);
});

var handleClick = function() {
    picker.update($(this).data("host"));
};
