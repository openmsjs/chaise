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

var header = $(<div/>)
    .append(msjs.require("chaise.document.list.pagesize.renderer"))
    .append(msjs.require("chaise.document.list.pager.jumperrenderer"))
    .append(msjs.require("chaise.document.list.jumper.renderer"))
    .append(msjs.require("chaise.document.view.jumper.renderer"))
    .append(msjs.require("chaise.document.view.renderer"));

var dom = msjs.require("msjs.dom");
var headerCssId = dom.getCssId(header[0]);
dom.addCss(headerCssId, {
    margin: "10px 0px",
    minHeight: "20px"
});


var el = msjs.publish($(<div>
    <a class="toggle" href="#">Hide documents</a>
    <div/>
</div>));
var content = el.children("div")
    .append(msjs.require("chaise.document.create.renderer"))
    .append(msjs.require("chaise.document.list.type.renderer"))
    .append(msjs.require("chaise.document.view.reduce.renderer"))
    .append(header)
    .append(msjs.require("chaise.document.list.pager.renderer").find(".top"))
    .append(msjs.require("chaise.document.list.renderer"))
    .append(msjs.require("chaise.document.list.pager.renderer").find(".bottom"))
    .css("marginTop", "5px");
el.append(msjs.require("chaise.document.detail.renderer")
          .css(msjs.require("chaise.sectioncss")))
          .css("display", "none");

var toggle = el.children("a.toggle").click(function() {
    var show = content.css("display") == "none";
    content.animate({height: "toggle", marginTop: "toggle"}, "fast");
    $(this).text(show ? "Hide documents" : "Show documents");
    return false;
});


var picker = msjs.require("chaise.database.list.picker");
msjs(function() {
    var database = picker();
    el.css("display", database ? "block" : "none");
    if (database && content.css("display") == "none") toggle.click();
}).depends(picker);
