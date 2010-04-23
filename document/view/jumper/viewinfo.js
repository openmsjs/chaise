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

var host = msjs.require("chaise.host.list.picker");
var dbName = msjs.require("chaise.database.list.picker");
var pageSizeSelector = msjs.require("chaise.document.list.pagesize.selector");
var reduceOpts = msjs.require("chaise.document.view.reduce.submitter");
var typePicker = msjs.require("chaise.document.list.type.picker");
var key = msjs.require("chaise.document.view.jumper.selector");
var isSuccess = msjs.require("chaise.couch.issuccess");
var couchServer = msjs.require("chaise.couch.server");
var page = msjs.publish(msjs(function(msj) {
    var db = new couchServer(host()).getDatabase(dbName());
    var options = {key: key()};
    if (reduceOpts()) options.reduce = false;
    var type = typePicker();
    var response = db.getView(type.designName, type.viewName, options);
    if (isSuccess(response)) {
        return response.result;
    }
}).setPack(false).depends(key));
