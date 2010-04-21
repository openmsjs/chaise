var picker = msjs.require("chaise.document.list.picker");
msjs.publish($(<a href="#">New document</a>).click(function() {
    picker({});
    return false;
}));

