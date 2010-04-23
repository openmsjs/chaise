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
    <table>
        <thead>
            <tr>
                <th class="remover">Delete?</th>
                <th class="name">Name</th>
                <th>Size</th>
                <th>Document count</th>
                <th>Update seq</th>
            </tr>
        </thead>
        <tbody/>
    </table>
    <div class="status"/>
</div>));

var tbody = el.find("tbody");
var status = el.find(".status");
var lister = msjs.require("chaise.database.list.lister");
var picker = msjs.require("chaise.database.list.picker");
var submitter = msjs.require("chaise.database.remove.submitter");
var renderer = msjs(function() {
    tbody.children().remove();
    var list = lister();
    if (list.length) {
        el.removeClass("no-results");
        status.text("").css("color", "");
    } else {
        el.addClass("no-results");
        status.text("No databases").css("color", "#FF0000");
    }
    $.each(list, function(i, info) {
        var row = $("<tr>" +
          "<td class=\"remover\"/>" +
          "<td class=\"name\"/>" +
          "<td>" + info.disk_size + "</td>" +
          "<td>" + info.doc_count + "</td>" +
          "<td>" + info.update_seq + "</td>" +
          "</tr>").appendTo(tbody).data("database", info.db_name);

        if (i % 2 == 0) row.addClass("odd");

        if (picker() == info.db_name) {
            row.addClass("selected");
        }

        $("<a href=\"#\" tabindex=\"-1\">Delete</a>")
            .appendTo(row.find("td.remover"))
            .click(function() {
                submitter(info.db_name);
                if (row.hasClass("selected")) {
                    picker(null);
                }
                return false;
            });

        $("<a href=\"\">" + info.db_name + "</a>")
            .appendTo(row.find("td.name"))
            .click(function() {
                picker(info.db_name);
                return false;
            });
    });
}).depends(lister);

var selector = msjs(function() {
    tbody.find(".selected").removeClass("selected");
    $.each(tbody.children(), function(i, row) {
        if (picker() == $(row).data("database")) {
            $(row).addClass("selected");
            return false;
        }
    });
}).depends(picker);

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId + ".no-results table", {
    display: "none"
});
dom.addCss(cssId + " th," +
           cssId + " td", {
    textAlign: "right"
});
dom.addCss(cssId + " .remover," + 
           cssId + " .name", {
    textAlign: "left"
});
dom.addCss(cssId + " a.remover", {
    marginLeft: "5px"
});
