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

var runner = msjs.publish(msjs());

var el = msjs.require("chaise.document.view.element");
var runLink = el.find("a.run");
var status = el.find("span.status");
var textarea = el.find(".editor");
var validateCode = msjs.require("chaise.document.view.validatecode");
runLink.click(function(){
    try {
        var validatedDoc = validateCode(textarea);
        if (validatedDoc) runner(validatedDoc);
    } catch (e) {
        status.text(e);
    }
    return false;
});
