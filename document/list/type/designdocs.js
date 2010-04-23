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

var couchServer = msjs.require("chaise.couch.server");
var isSuccess = msjs.require("chaise.couch.issuccess");
var dbName = msjs.require("chaise.database.list.picker");
var hostPicker = msjs.require("chaise.host.list.picker");
msjs.publish(msjs(function(msj) {
    var host = hostPicker();
    if (!host) return;

    var db = new couchServer(host).getDatabase(dbName());
    var response = db.getAllDocuments({startkey: "_design/",
                                      endkey: "_design0",
                                      include_docs: true});
    if (isSuccess(response)) {
        return msjs.map(response.result.rows, function(row) {
            return row.doc;
        });
    }
}).setPack(false).depends(dbName, "chaise.document.view.saver"));
