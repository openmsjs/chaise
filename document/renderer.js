var el = msjs.publish($(<pre>
</pre>));

var renderer = msjs(function(msj) {
    msj.doc ? el.text(toJSON(msj.doc)) : el.text("");
});
renderer.push("chaise.document.info", "doc");

var toJSON = function(value, indent) { 
    if (!indent) indent = "";
    var newIndent = indent + "    ";

    switch (typeof value) {
        case 'string':
            return '"' + value + '"';

        case 'number':
            return (isFinite(value) ? String(value) : 'null');

        case 'boolean':
        case 'null':
            return String(value);

        case 'object':
            if (!value) return 'null';

            var partial = [];
            if (typeof value.length === 'number' &&
                !(value.propertyIsEnumerable('length'))) {

                for (var i = 0; i < value.length; i++) {
                    partial[i] = (toJSON(value[i], indent) || 'null');
                }

                return partial.length === 0 ? '[]' : '[\n' + newIndent + partial.join(',\n' + newIndent) + '\n'+indent + ']';
            }

            for (var k in value) {
                var v = toJSON(value[k], newIndent);
                if (v) {
                    partial.push('"' + jsonEscape(k) + '"' + ':' + v);
                }
            }
            return partial.length === 0 ? '{}' : '{\n' + newIndent + partial.join(',\n' + newIndent) + '\n' + indent + '}';
    }
}

var jsonMeta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
};
var jsonEscapeable = /[-"\\\x00-\x1f\x7f-\x9f]/g;
var jsonEscape = function (string) {
    return jsonEscapeable.test(string)
        ? string.replace(jsonEscapeable, function (a) {
            var c = jsonMeta[a];
            if (typeof c === 'string') {
                return c;
            }
            c = a.charCodeAt();
            return '\\u00' + Math.floor(c / 16).toString(16) +
                                       (c % 16).toString(16);
          })
        : string;
}

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    width: "100%",
    border: "1px solid #A7A7A7",
    borderSpacing: "0"
});
dom.addCss(cssId + " thead", {
    backgroundColor: "#DADADA"
});
dom.addCss(cssId + " th," +
           cssId + " td", {
    padding: "2px 10px"
});
