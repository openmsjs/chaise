/*
 * Copyright (c) 2010 Sharegrove Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

var beautify = msjs.require("chaise.document.beautify");
var funcToStr = msjs.require("chaise.document.functostr");
var strToFunc = function(func) {
    if (typeof(func) == "function") {
        return func;
    }
    try {
        return eval("(" + func + ")");
    } catch (e) {}

    throw "bad function";
}
msjs.publish(function(editor) {
    var doc;
    var text = "";
    editor.contents().each(function(i, content) {
        if (content.nodeName == "#text") {
            text += content.data;
        } else if (content.nodeName == "BR") {
            text += "\n";
        }
    });

    try {
        doc = eval("(" + text + ")");
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

            editor.text(beautify(doc));

            return updateDoc;
        } catch (e) {
            throw e;
        }
    } else {
        throw "view requires a map function";
    }
});
