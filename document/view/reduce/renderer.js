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
    <label><input name="reduce" type="checkbox" autocomplete="off"> Reduce</input></label>
    <label class="grouping">Group level:
        <select>
          <option value="none">none</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="exact">exact</option>
        </select>
    </label>
</form>));


var submitter = msjs.require("chaise.document.view.reduce.submitter");
var reduce = el.find("input").click(function() {
    if (this.checked) {
        el.addClass("reduce-enabled");
        submitter({reduce: true});
    } else {
        el.removeClass("reduce-enabled");
        submitter({});
    }
});

var grouping = el.find("select").change(function() {
    var options = {reduce: true};
    var val = $(this).val();
    if (val != "none") {
        if (val == "exact") {
            options.group = true;
        } else if (val > 0) {
            options.group_level = Number(val);
        }
    }
    submitter(options);
});

var shower = msjs(function() {
    el.removeClass("has-reduce");
    el.removeClass("reduce-enabled");
    reduce[0].checked = false;
    var options = submitter();
    if (options) {
        el.css("display", "");
        if (options.reduce) {
            reduce[0].checked = true;
            el.addClass("has-reduce");
            el.addClass("reduce-enabled");

            if (options.group) {
               grouping.find("[value=exact]")[0].selected = true;
            } else if (options.group_level) {
               grouping.find("[value=" +options.group_level + "]")[0].selected = true;
            } else {
               grouping.find("[value=none]")[0].selected = true;
            }
        }
    } else {
        el.css("display", "none");
    }

}).depends(submitter);

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    display: "inline"
});
dom.addCss(cssId + " .grouping", {
    display: "none"
});
dom.addCss(cssId + ".reduce-enabled .grouping", {
    display: "inline"
});
dom.addCss(cssId + ".has-reduce .reduce", {
    display: "block"
});
dom.addCss(cssId + " label", {
    marginRight: "10px",
    cssFloat: "right"
});
