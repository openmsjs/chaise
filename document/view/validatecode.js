var toPrettyJSON = msjs.require("chaise.document.toprettyjson");
var funcToStr = function(func, type) {
    if (typeof(func) == "function") {
        return func.toString();
    }
    var testFunc;
    try {
        testFunc = eval("(" + func + ")");
    } catch (e) {}

    if (typeof(testFunc) != "function") {
        throw "bad function";
    }

    return func;
};
var strToFunc = function(func) {
    if (typeof(func) == "function") {
        return func;
    }
    try {
        return eval("(" + func + ")");
    } catch (e) {}

    throw "bad function";
}
msjs.publish(function(textArea) {
    var doc;
    try {
        doc = eval("(" + textArea.text().split('\n').join(" ") + ")");
    } catch (e) {
        throw "bad json";
    }

    if (doc.map) {
        try {
            var updateDoc = {};

            updateDoc.map = funcToStr(doc.map, "map");
            if (doc.reduce) updateDoc.reduce = funcToStr(doc.reduce, "reduce");   
            doc.map = strToFunc(doc.map);
            if (doc.reduce) doc.reduce = strToFunc(doc.reduce);
            textArea.text(toPrettyJSON(doc));

            return updateDoc;
        } catch (e) {
            throw e;
        }
    } else {
        throw "view requires a map function";
    }
});
