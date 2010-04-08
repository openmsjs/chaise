var el = msjs.publish($(<form>
    <div>
        <label>Skip: <input name="skip" class="number" value="0"/></label>
        <label>Limit: <input name="limit" class="number" value="10"/></label>
        <label><input name="descending" type="checkbox"> Descending</input></label>
    </div>

    <div class="view-options">
        <div>By:
            <label><input name="type" type="radio" value="key" checked="true"> Key</input></label>
            <label><input name="type" type="radio" value="range"> Key range</input></label>
        </div>

        <div class="key">
            <label>Key: <input name="key" class="long"/></label>
        </div>

        <div class="range">
            <label><span>Startkey: </span><input name="startkey" class="long"/></label><br/>
            <label><span>Endkey: </span><input name="endkey" class="long"/></label>
            <label><input name="inclusive_end" type="checkbox"> Inclusive end</input></label><br/>
            <label><span>Startkey docid:</span><input name="startkey_docid" class="long"/></label><br/>
            <label><span>Endkey docid:</span><input name="endkey_docid" class="long"/></label>
        </div>

        <div class="reduce">
            <label><input name="reduce" type="checkbox"> Reduce</input></label>
            <label class="grouping">Group level:
                <select name="level">
                  <option>none</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>exact</option>
                </select>
            </label>
        </div>
    </div>

    <input type="submit" value="Search"/>
    <input type="reset" value="Reset"/>
</form>));

el.find("input[name='type']").click(function() {
    if (this.value == "range") {
        el.addClass("range-enabled");
    } else {
        el.removeClass("range-enabled");
    }
});
el.find("input[name='reduce']").click(function() {
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
    var skip = Number($("[name=skip]").val()) || 0;
    var limit = Number($("[name=limit]").val()) || 10;
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

    if (skip >= 0) values.skip = skip;
    if (limit >=0) values.limit = limit;
    if (descending) values.descending = true;

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

var viewOpts = el.find(".view-options");
var shower = msjs(function(msj) {
    var isView = msj.type !== "all" && msj.type != "design";
    if (isView) {
        viewOpts.css("display", "");
        var view = msj.type.view;
        var doc = msj.type.doc;
        if (doc.views[view].reduce) {
            el.addClass("send-reduce");
        }
    } else {
        viewOpts.css("display", "none");
        el.removeClass("send-reduce");
    }
});
shower.push("chaise.document.list.type.picker", "type");

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    border: "1px solid black",
    padding: "10px",
    width: "600px",
    margin: "15px auto"
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
