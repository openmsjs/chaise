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
    <a href="#" class="toggle"/>
    <a name="10"  class="button" href="#">10</a>
    <a name="25"  class="button" href="#">25</a>
    <a name="50"  class="button" href="#">50</a>
    <a name="100" class="button" href="#">100</a>
</div>));

el.find("a.toggle").click(function() {
    if (el.hasClass("editing")) {
        el.removeClass("editing");
    } else {
        el.addClass("editing");
    }
    return false;
});

var sizeSelector = msjs.require("chaise.document.list.pagesize.selector");
el.find("a.button").click(function() {
    sizeSelector(Number(this.name));
    el.removeClass("editing");
    return false;
});
msjs(function(msj) {
    var pageSize = sizeSelector();
    el.find(".selected").removeClass("selected");
    el.find("a[name=" + pageSize + "]").addClass("selected");
    el.find("a.toggle").text("Rows: " + pageSize);
}).depends(sizeSelector);


var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    display: "inline"
});
dom.addCss(cssId + " .button", {
    display: "none"
});
dom.addCss(cssId + ".editing .button", {
    display: "inline"
});
dom.addCss(cssId + " a", {
    marginRight: "5px"
});