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
    <a name="allDocs" href="#">All documents</a>
    <a name="allDesignDocs" href="#">Design documents</a>
    <div class="views"/>
</div>));

var picker = msjs.require("chaise.document.list.type.picker");
var dom = msjs.require("msjs.dom");
el.find("a[name]").addClass("button").click(function() {
    picker({type: this.name});
    return false;
});

var views = el.find(".views");
var docs = msjs.require("chaise.document.list.type.designdocs");
msjs(function() {
    views.find(".design").remove();
    $.each(docs(), function(i, doc){
        var designName = doc._id.substring(8);
        var design = $("<div><span>" + designName + "</span>: <span/></div>")
                         .addClass("design")
                         .appendTo(views);
        design.find("span").css({fontWeight: "bold"});

        for (var view in doc.views) {
            $("<a href=\"#\">" + view + "</a>")
                .addClass("view button")
                .appendTo(design)
                .data("design", designName)
                .click(function() {
                    var viewName = $(this).text();
                    picker({type: "view",
                            designName: designName,
                            viewName: viewName,
                            viewDoc: doc.views[viewName]});
                    return false;
                });
        }
    });
}).depends(docs);


msjs(function(msj) {
    el.find(".selected").removeClass("selected");
    var picked = picker();
    if (!picked) return;
    var selected = null;
    switch (picked.type) {
        case "allDocs": 
        case "allDesignDocs":
            selected = el.find("[name=" + picked.type + "]");
            break;
        case "view":
            var views = el.find("a.view");
            $.each(views, function(i, view) {
                var designName = $(view).data("design");
                if (picked.designName == designName &&
                    picked.viewName == $(view).text()) {
                    selected = $(view);
                    return false;
                }
            });
            break;
    }
    if (selected) selected.addClass("selected");
}).depends(picker);


var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
//     padding: "10px 5px",
//     margin: "5px 0px",
//     backgroundColor: "#EFEFEF",
//     border: "1px solid #4A4A4A"
    lineHeight: "2.5em"
})
dom.addCss(cssId + " .views" , {
    display: "inline"
});
dom.addCss(cssId + " div.design", {
    display: "inline"
});
dom.addCss(cssId + " a.button", {
    marginRight: "3px"
});
dom.addCss(cssId + " a.button:hover", {
    textDecoration: "none"
});
