msjs.publish(function(func, type) {
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
});
