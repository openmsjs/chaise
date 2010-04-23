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
    <a href="#" title="Import file with CouchDB views and data">Import</a>
    <form>
        <input name="package" autocomplete="off"/>
        <input type="submit" value="Import"/>
        <input type="reset" value="Cancel"/>
    </form>
</div>));

var form = el.find("form");
var packageName = form.find("input[name='package']"); 
el.find("a").click(function() {
    el.addClass("importing");
    packageName.focus();
    return false;                       
});
var reset = function() {
    el.removeClass("importing");
    packageName[0].value = "";
    return false;
};
form.bind("reset", reset);
var submitter = msjs.require("chaise.database.import.submitter");
form.submit(function() {
    submitter(packageName[0].value);
    return reset();                
});
packageName.keypress(function(event) {
    // escape
    if (event.keyCode == "27") {
        form[0].reset();
    }
});



var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId + " form," +
           cssId + ".importing a", {
    display: "none"
});
dom.addCss(cssId + ".importing form", {
    display: "block"
});
