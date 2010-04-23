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
    <a href="#" class="add">Add host</a>
    <form>
        <input name="host" autocomplete="off"/>
        <input type="submit" value="Add host"/>
        <input type="reset" value="Cancel"/>
    </form>
</div>));

var form = el.find("form");
var hostInput = form.find("input[name=host]"); 
el.find("a.add").click(function() {
    el.addClass("adding");
    hostInput.focus();
    return false;                       
});
var reset = function() {
    el.removeClass("adding");
    hostInput[0].value = "";
    return false;
};
form.bind("reset", reset);
var adder = msjs.require("chaise.host.add.submitter");
form.submit(function() {
    adder(hostInput[0].value);
    return reset();                
});
hostInput.keypress(function(event) {
    // escape
    if (event.keyCode == "27") {
        form[0].reset();
    }
});


var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId + " form," +
           cssId + ".adding a.add", {
    display: "none"
});
dom.addCss(cssId + ".adding form", {
    display: "block"
});

