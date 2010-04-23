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
    <a class="toggle" href="#">Hide databases</a>
    <div/>
</div>).css("display", "none"));
var createRenderer = msjs.require("chaise.database.create.renderer");
var loadRenderer = msjs.require("chaise.database.import.renderer");
var content = el.children("div")
    .append(createRenderer)
//    .append(loadRenderer)
    .append(msjs.require("chaise.database.list.renderer"))
    .css("marginTop", "5px");

var hostPicker = msjs.require("chaise.host.list.picker");
var shower = msjs(function() {
    var host = hostPicker();
    el.css("display", host ? "block" : "none");
    if (host && content.css("display") == "none") toggle.click();
}).depends(hostPicker);

var toggle = el.children("a.toggle").click(function() {
    var show = content.css("display") == "none";
    content.animate({height: "toggle", marginTop: "toggle"}, "fast");
    $(this).text(show ? "Hide databases" : "Show databases");
    return false;
});


var dom = msjs.require("msjs.dom");
dom.addCss(dom.getCssId(createRenderer[0]) + "," +
           dom.getCssId(loadRenderer[0]), {
    display: "inline",
    marginRight: "10px"
});

