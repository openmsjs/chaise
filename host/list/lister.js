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

var cookies = msjs.require("chaise.host.list.cookies");
var getHosts = function() {
    var cookie = cookies.get("hosts");
    var hosts = null;
    if (cookie) {
        try {
            var hostsEval = eval("(" + cookie + ")");
            if ($.isArray(hostsEval)) hosts = hostsEval;
        } catch (e) {
        }
    }
    return hosts && hosts.length ? hosts : ["localhost:5984"];
};
var add = msjs.require("chaise.host.add.submitter");
var remove = msjs.require("chaise.host.remove.submitter");
var lister = msjs.publish(msjs(function() {
    var hosts = getHosts();
    var addedHost = add.ifUpdated();
    if (addedHost) {
        hosts.push(addedHost);
    } else {
        hosts.splice(hosts.indexOf(remove()), 1);
    }
    cookies.set("hosts", msjs.toJSON(hosts), -1);
    return hosts;
}).depends(add, remove));

lister.onLoad = function() {
    this(getHosts());
};
