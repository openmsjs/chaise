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

var el = msjs.publish($(<form>
    <label><a href="#" class="toggle">Jump to key</a> <input name="key"/></label>
</form>));

var input = el.find("input");
var toggle = el.find(".toggle");
toggle.click(function() {
    if (el.hasClass("jumping")) {
        el.removeClass("jumping");
    } else {
        el.addClass("jumping");
        input.focus();
    }
    return false;
});
input.keydown(function(event) {
    if (event.keyCode == 27) toggle.click();
});
var selector = msjs.require("chaise.document.view.jumper.selector");
el.submit(function() {
    var key = eval("(" + input.val() + ")");
    input.val("");
    selector(key);
    el.removeClass("jumping");
    return false;
});

var picker = msjs.require("chaise.document.list.type.picker");
var reduce = msjs.require("chaise.document.view.reduce.submitter");
var shower = msjs(function() {
    var reduced = reduce();
    var isReduced = reduced != null && reduced.reduce;
    el.css("display", picker().type == "view" && !isReduced ? "" : "none");
}).depends(picker, reduce);


var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    display: "inline",
    marginRight: "5px"
});
dom.addCss(cssId + ".jumping input", {
    display: "inline"
});
dom.addCss(cssId + " input", {
    width: "150px",
    display: "none"
});
