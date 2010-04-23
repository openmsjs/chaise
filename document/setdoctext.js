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