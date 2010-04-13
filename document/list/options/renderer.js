var el = msjs.publish($(<div>
    <a href="#" class="toggle">Search views</a>
    <form>
        <div>By:
            <label><input name="type" type="radio" value="key" checked="true" autocomplete="off"> Key</input></label>
            <label><input name="type" type="radio" value="range" autocomplete="off"> Key range</input></label>
        </div>

        <div class="key">
            <label>Key: <input name="key" class="long"/></label>
        </div>

        <div class="range">
            <label><span>Startkey: </span><input name="startkey" class="long"/></label><br/>
            <label><span>Endkey: </span><input name="endkey" class="long"/></label>
            <label><input name="inclusive_end" type="checkbox" autocomplete="off"> Inclusive end</input></label><br/>
            <label><span>Startkey docid:</span><input name="startkey_docid" class="long"/></label><br/>
            <label><span>Endkey docid:</span><input name="endkey_docid" class="long"/></label>
        </div>

        <input type="submit" value="Search"/>
        <input type="reset" value="Reset"/>
    </form>
</div>));

var searchLink = el.find("a[class=toggle]");
searchLink.click(function() {
    if (el.hasClass("searching")) {
        el.removeClass("searching");
        searchLink.text("Show search views");
    } else {
        el.addClass("searching");
        searchLink.text("Hide search views");
    }
    return false;
});

var form = el.find("form");
el.find("input[name=type]").click(function() {
    if (this.value == "range") {
        el.addClass("range-enabled");
    } else {
        el.removeClass("range-enabled");
    }
});
el.find("input[name=reduce]").click(function() {
    if (this.checked) {
        el.addClass("reduce-enabled");
    } else {
        el.removeClass("reduce-enabled");
    }
});

var submitter = msjs.require("chaise.document.list.options.submitter");
var toJS = function(key) {
    try {
        return eval("(" + key + ")");
    } catch (e) {
        msjs.log('bad key', key);
        return;
    }
};
el.submit(function() {
    var values = {};

    var key = $("input[name=key]").val();
    var startkey = $("input[name=startkey]").val();
    var endkey = $("input[name=endkey]").val();
    var startkey_docid = $("input[name=startkey_docid]").val();
    var endkey_docid = $("input[name=endkey_docid]").val();

    if (key) key = toJS(key);
    if (startkey) startkey = toJS(startkey);
    if (endkey) key = toJS(endkey);
    if (startkey_docid) key = toJS(startkey_docid);
    if (endkey_docid) key = toJS(endkey_docid);

    var inclusiveEnd = !!$("[name=inclusiveEnd]:checked").val();
    var descending = !!$("[name=descending]:checked").val();
    var reduce = !!$("[name=reduce]:checked").val();
    var grouping = $("[name=level]").val();

    switch ($("input[name=type]:checked").val()) {
        case "key": 
            if (key) values.key = key;
            break;
        case "range": 
            if (startkey) values.startkey = startkey;
            if (endkey) values.endkey = endkey;
            if (startkey_docid) values.startkey_docid = startkey_docid;
            if (endkey_docid) values.endkey_docid = endkey_docid;
            if (inclusiveEnd) values.inclusive_end = true;
            break;
    }

    if (el.hasClass("send-reduce")) {
        values.reduce = reduce;
        if (grouping == "exact") {
            values.group = true;
        } else if (grouping != "none") {
            values.group_level = Number(grouping);
        }
    }

    submitter.update(values);

    return false;
});

var shower = msjs(function(msj) {
    el.removeClass("send-reduce");
    var isView = msj.type !== "all" && msj.type != "design";
    if (isView) {
        el.css("display", "");
        var view = msj.type.view;
        var doc = msj.type.doc;
        if (doc.views[view].reduce) {
            el.addClass("send-reduce");
        }
    } else {
        el.css("display", "none");
    }
});
shower.push("chaise.document.list.type.picker", "type");

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    margin: "10px 0px"
});
dom.addCss(cssId + " form", {
    border: "1px solid #CACACA",
    padding: "10px",
    width: "600px",
    display: "none"
});
dom.addCss(cssId + ".searching form", {
    display: "block"
});
dom.addCss(cssId + " div", {
    marginBottom: "10px"
});
dom.addCss(cssId + " div:last-child", {
    marginBottom: "0px"
});
dom.addCss(cssId + " label", {
    marginRight: "20px"
});
dom.addCss(cssId + " .grouping," +
           cssId + ".range-enabled .key," +
           cssId + " .range", {
    display: "none"
});
dom.addCss(cssId + ".reduce-enabled .grouping", {
    display: "inline"
});
dom.addCss(cssId + ".range-enabled .range", {
    display: "block"
});
dom.addCss(cssId + " input.number", {
    textAlign: "right",
    width: "30px"
});
dom.addCss(cssId + " .range span", {
    cssFloat: "left",
    textAlign: "right",
    marginRight: "5px",
    width: "100px"
});
dom.addCss(cssId + " .reduce", {
    display: "none"
});
dom.addCss(cssId + ".send-reduce .reduce", {
    display: "block"
});
dom.addCss(cssId + " input.long", {
    width: "320px"
});
dom.addCss(cssId + " input[name=key].long", {
    width: "550px"
});
