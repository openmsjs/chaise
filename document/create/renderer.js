var el = msjs.publish($(<a href="#">new document</a>));
var picker = msjs.require("chaise.document.list.picker");
el.click(function() {
    picker.update({});
    return false;
});