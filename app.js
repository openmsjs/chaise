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

msjs.require("chaise.css");

$(<title>Chaise</title>).appendTo(document.head);
msjs.require("chaise.header").appendTo("body");
var css = msjs.require("chaise.sectioncss");
var el = $(<div/>)
    .append(msjs.require("chaise.crumb"))
    .append(msjs.require("chaise.host.renderer").css(css))
    .append(msjs.require("chaise.database.renderer").css(css))
    .append(msjs.require("chaise.document.renderer").css(css))
    .appendTo("body");

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "50px",
    minWidth: "500px",
    maxWidth: "800px"
});
