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
var reduceOpts = msjs.require("chaise.document.view.reduce.submitter");
var picked = msjs.require("chaise.document.list.type.picker");
var pageSize = msjs.require("chaise.document.list.pagesize.selector");
var page = msjs.require("chaise.document.list.pager.selector");
var descending = msjs.require("chaise.document.list.descending");
var host = msjs.require("chaise.host.list.picker");
var isSuccess = msjs.require("chaise.couch.issuccess");
var emptyMsj = {offset: 0, rows: []};
msjs.publish(msjs(function() {
    var dbName = dbPicker();
    if (!dbName) return emptyMsj;

    var couch = new server(host()).getDatabase(dbName);
    var options = {
        skip: (page()-1) * pageSize(),
        limit: pageSize(),
        descending: descending()
    };

    var opts = reduceOpts();
    if (opts) {
        if (opts.reduce) {
            options.reduce = true;
            if (opts.group) {
                options.group = true;
            } else if (opts.group_level) {
                options.group_level = opts.group_level;
            }
        } else {
            options.reduce = false;
        }
    }

    var response;
    var listType = picked();
    switch (listType.type){
        case "allDocs":
            response = couch.getAllDocuments(options);
            break;
        case "allDesignDocs":
            options.startkey = options.descending ? "_design0" : "_design/";
            options.endkey = options.descending ? "_design/" : "_design0";
            response = couch.getAllDocuments(options);
            break;
        case "view":
            if (listType.isTempView) {
                response = couch.runTemporaryView(listType.viewDoc, options);
            } else {
                response = couch.getView(listType.designName, listType.viewName, options);
            }
            break;
    }

    return isSuccess(response) ? response.result : emptyMsj;
}).setPack(false).depends(
    dbPicker, reduceOpts, picked, pageSize, page, descending,
    "chaise.document.detail.updater", // refetch when document is updated
    "chaise.document.remove.remover"  // refetch when document is removed
));
