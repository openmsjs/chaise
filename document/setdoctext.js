var beautify = msjs.require("chaise.document.beautify");
msjs.publish(function(doc, textarea) {
    if (doc._id && doc._id.indexOf("_design/") == 0 && doc.views)  {
        for (var k in doc.views) {
            var view = doc.views[k];
            if (view.map) view.map = eval("(" + view.map + ")");
            if (view.reduce) view.reduce = eval("(" + view.reduce + ")"); 
        }
    }

    $.each(beautify(doc).split("\n"), function(i, line) {
        textarea.append(document.createTextNode(line)).append($("<br/>"));
    });
});