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
    <div class="pager top"/>
    <div class="pager bottom"/>
</div>));

var topEl = el.find(".top");
var bottomEl = el.find(".bottom");
var lister = msjs.require("chaise.document.list.lister");
var sizeSelector = msjs.require("chaise.document.list.pagesize.selector");
msjs(function(msj) {
    var list = lister();
    var pageSize = sizeSelector();
    makePageLinks(topEl, list, pageSize);
    makePageLinks(bottomEl, list, pageSize);
}).depends(lister);

var typePicker = msjs.require("chaise.document.list.type.picker");
var pageSelector = msjs.require("chaise.document.list.pager.selector");
var makePageLinks = function(el, list, pageSize) {
    el.children().remove();

    if (!list.total_rows) return;

    if (typePicker().type == "allDesignDocs") {
        // TODO: don't render pages for now
        // think of a different to display design documents
        return; 
    }

    var showCount = 8;
    var lastPage = Math.ceil(list.total_rows/pageSize);
    var currentPage = pageSelector();
    var startPage = currentPage - showCount;
    if (startPage < 1) startPage = 1;
    var endPage   = currentPage + showCount - 1;
    if (lastPage < endPage) endPage = lastPage;

    if (startPage == endPage) return;

    var previous;
    if (currentPage > 1) {
        previous = $("<a href=\"#\">Previous</a>")
            .appendTo(el)
            .click(function() {
                pageSelector(currentPage-1);
                return false;
            });
    } else {
        previous = $("<span>Previous</span>").css("color", "#CACACA").appendTo(el);
    }

    var next;
    if (currentPage < endPage) {
        next = $("<a href=\"#\">Next</a>")
            .appendTo(el)
            .click(function() {
                pageSelector(currentPage+1);
                return false;
            });
    } else {
        next = $("<span>Next</span>").css("color", "#CACACA").appendTo(el);
    }

    var css = {marginRight: "5px"};
    previous.css(css);
    next.css(css);

    for (var page=startPage; page <= endPage; page++) {
        var link = $("<a href=\"#\">" + page + "</a>")
            .appendTo(el)
            .addClass("button")
            .click(function() {
                 if (!$(this).hasClass("selected")) {
                     pageSelector(Number($(this).text()));
                     return false;
                 }
             });
        if (page == currentPage) link.addClass("selected"); 
    }

};

var dom = msjs.require("msjs.dom");
dom.addCss(".pager", {
    margin: "5px 0px 10px 0px",
    fontFamily: "monospace"
});
