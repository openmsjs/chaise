var el = msjs.publish($(<a href="#">New document</a>));
var picker = msjs.require("chaise.document.list.picker");
el.click(function() {
    picker.update({});
    return false;
});
