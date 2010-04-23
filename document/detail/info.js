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

var server = msjs.require("chaise.couch.server");
var dbPicker = msjs.require("chaise.database.list.picker");
var hostPicker = msjs.require("chaise.host.list.picker");
var isSuccess = msjs.require("chaise.couch.issuccess");
var docPicker = msjs.require("chaise.document.list.picker");
var docUpdater = msjs.require("chaise.document.detail.updateddoc");
msjs.publish(msjs(function() {
    var host = hostPicker();
    var dbName = dbPicker();
    if (!host) return;
    if (!dbName) return;

    var db = new server(host).getDatabase(dbName);
    var docId = null;
    var info = docPicker.ifUpdated();
    var updated = docUpdater.ifUpdated();
    if (info) {
        docId = info.id;
    } else if (updated) {
        docId = updated.id;
    } else {
        return;
    }
 
    if (docId) {
        var response = db.getDocument(docId);
        if (!isSuccess(response)) return null;
        return response.result;
    } else {
        return {};
    }
}).setPack(false).depends(docPicker, docUpdater));

