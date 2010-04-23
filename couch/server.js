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

var couchRequest = msjs.require("chaise.couch.request");
var server = msjs.publish(function(host) {
    this.url = "http://" + host;
});

// server level
server.prototype.getInfo = function() {
    return couchRequest.get(this.url + "/");
};

server.prototype.getConfiguration = function() {
    return couchRequest.get(this.url + "/_config");
};

server.prototype.getStats = function() {
    return couchRequest.get(this.url + "/_stats");
};

server.prototype.getActiveTasks = function() {
    return couchRequest.get(this.url + "/_active_tasks");
};

server.prototype.getDatabaseList = function() {
    return couchRequest.get(this.url + "/_all_dbs");
};

server.prototype.replicate = function(source, target) {
    var content = msjs.toJSON({source: source, target: target});
    return couchRequest.post(this.url + "/_replicate", content);
};

server.prototype.getUuids = function(count) {
    if (isNaN(count) || count <= 0) count = 1;
    return couchRequest.get(this.url + "/_uuids?count=" + count);
};

server.prototype.getDatabase = function(dbName) {
    return new (msjs.require("chaise.couch.database"))(dbName, this);
};
