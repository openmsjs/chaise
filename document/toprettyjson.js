var toPrettyJSON = msjs.publish(function(value, indent) { 
    if (!indent) indent = "";
    var newIndent = indent + "    ";

    switch (typeof value) {
        case 'string':
            return '"' + value.split("\"").join("\\\"") + '"';

        case 'number':
            return (isFinite(value) ? String(value) : 'null');

        case 'boolean':
        case 'null':
            return String(value);

        case 'function':
            return value.toString().split("\n").join(" \n" + indent);

        case 'object':
            if (!value) return 'null';

            var partial = [];
            if (typeof value.length === 'number' &&
                !(value.propertyIsEnumerable('length'))) {

                for (var i = 0; i < value.length; i++) {
                    partial[i] = (toPrettyJSON(value[i], indent) || 'null');
                }

                return partial.length === 0 ? '[]' : '[\n' + newIndent + partial.join(',\n' + newIndent) + '\n'+indent + ']';
            }

            for (var k in value) {
                var v = toPrettyJSON(value[k], newIndent);
                if (v) {
                    partial.push('"' + jsonEscape(k) + '"' + ': ' + v);
                }
            }
            return partial.length === 0 ? '{}' : '{\n' + newIndent + partial.join(', \n' + newIndent) + '\n' + indent + '}';
    }
});

var jsonMeta = {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"' : '\\"',
    '\\': '\\\\'
};
var jsonEscape = function (string) {
    var jsonEscapeable = /[-"\\\x00-\x1f\x7f-\x9f]/g;
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
