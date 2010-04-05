var el = msjs.publish($(<a href="#">new document</a>));
var picker = msjs.require("chaise.document.picker");
el.click(function() {
    picker.update({doc: {}});
    return false;
});
