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
var submitter = msjs.require("chaise.database.import.submitter");
var picker = msjs.require("chaise.host.list.picker");
var isSuccess = msjs.require("chaise.couch.issuccess");
var importer = msjs.publish(msjs(function() {
    var dbParam = "_all"; // do all for now
    var couchData = msjs.require(submitter());
    var dbNames = (function() {
        var dbNames = null;
        if (dbParam == "_all") {
            dbNames = [];
            for (var dbName in couchData) dbNames.push(dbName);
        } else if (dbParam) {
            dbNames = dbParam.split(",");
        }
        return dbNames;
    })();

    var reset = false; // only allow reload for now
    var couch = new server(picker());
    jQuery.each(dbNames, function(i, dbName) {
        var db = couch.getDatabase(dbName);

        var response = db.getInfo();
        var created = reset;
        if (reset) {
            if (isSuccess(response)) db.remove();
            db.create();
        } else {
            if (!isSuccess(response)) {
                db.create();
                created = true;
            }
        }

        if (couchData[dbName].views) {
            jQuery.each(couchData[dbName].views, function(i, view) {
                db.writeDocument(view);
            });
        }

        if (created) {
            if (couchData[dbName].docs) {
                jQuery.each(couchData[dbName].docs, function(i, doc) {
                    db.writeDocument(doc);
                });
            }
        }
    });

    return true;
}).setPack(false).depends(submitter));
