var picker = msjs.publish(msjs(function() {
    return "all"; // default
}));
picker.depends("chaise.database.list.picker");
