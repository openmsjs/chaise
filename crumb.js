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

var el = msjs.publish($(<div>
    <span/><a target="_blank">go to url</a>
</div>));

var span = el.find("span");
var link = el.find("a");

var hostPicker = msjs.require("chaise.host.list.picker");
var databasePicker = msjs.require("chaise.database.list.picker");
var documentPicker = msjs.require("chaise.document.list.picker");
var shower = msjs(function() {
    var url = "";

    var host = hostPicker();
    if (host) url += "http://" + host;

    var database = databasePicker();
    if (database) url += "/" + database;


    var document = documentPicker();
    if (document) url += "/" + (document.id || "(new document)");

    span.text(url + " ");
    link.attr("href", url);

    el.css("visibility", url ? "visible" : "hidden");

}).depends(hostPicker, databasePicker, documentPicker);

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    marginTop: "10px"
});
dom.addCss(cssId + " span", {
    fontSize: "15px",
    fontWeight: "bold"
});
dom.addCss(cssId + " a", {
    fontSize: "10px"
});
