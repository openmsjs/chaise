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

var tempView = msjs.require("chaise.document.view.runner");
msjs.publish(msjs(function() {
    var temp = tempView.ifUpdated();
    if (temp) {
        var view = this();
        view.viewDoc = temp;
        view.isTempView = true;
        return view;
    }
    return { type: "allDocs" }; // default
}).depends(tempView, "chaise.database.list.picker"));
