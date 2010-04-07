var el = msjs.publish($(<form>
    <div>By:
        <label><input name="type" type="radio" value="key" checked="true"> key</input></label>
        <label><input name="type" type="radio" value="keyRange"> key range</input></label>
        <label><input name="type" type="radio" value="idRange"> id range</input></label>
    </div>

    <div class="key">
        <label>key: <input name="key"/></label>
    </div>

    <div class="range">
        <label><span class="start"/><input name="start"/></label><br/>
        <label><span class="end"/><input name="end"/></label>
        <label><input name="inclusive_end" type="checkbox"> inclusive end</input></label>
    </div>

    <div>
        <label>skip: <input name="skip" class="number" value="0"/></label>
        <label>limit: <input name="limit" class="number" value="30"/></label>
        <label><input name="descending" type="checkbox"> descending</input></label>
    </div>

    <div class="reduce">
        <label><input name="reduce" type="checkbox"> reduce</input></label>
        <label class="grouping">group level:
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

    <div>
        <input type="submit" value="go"/>
        <input type="reset" value="reset"/>
    </div>
</form>));

var startLabel = el.find(".range span.start");
var endLabel = el.find(".range span.end");
el.find("input[name='type']").click(function() {
    if (this.value == "keyRange") {
        startLabel.text("start key: ");
        endLabel.text("end key: ");
        el.addClass("range-enabled");
    } else if (this.value == "idRange") {
        startLabel.text("start id: ");
        endLabel.text("end id: ");
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
el.submit(function() {
    var values = {};

    var key = $("input[name=key]").val();
    var start = $("input[name=start]").val();
    var end = $("input[name=end]").val();
    var inclusiveEnd = !!$("[name=inclusiveEnd]:checked").val();
    var descending = !!$("[name=descending]:checked").val();
    var skip = Number($("[name=skip]").val()) || 0;
    var limit = Number($("[name=limit]").val()) || 30;
    var reduce = !!$("[name=reduce]:checked").val();
    var grouping = $("[name=level]").val();

    switch ($("input[name=type]:checked").val()) {
        case "key": 
            if (key) values.key = key;
            break;
        case "keyRange": 
            if (start) values.startkey = start;
            if (end) values.endkey = end;
            if (inclusiveEnd) values.inclusive_end = true;
            break;
        case "idRange":
            if (start) values.startkey_docid = startkey_docid;
            if (end) values.endkey_docid = endkey_docid;
            if (inclusiveEnd) values.inclusive_end = true;
            break;
    }

    if (skip >= 0) values.skip = skip;
    if (limit >=0) values.limit = limit;
    if (descending) values.descending = true;

    if (reduce) {
        values.reduce = true;
        if (grouping == "exact") {
            values.group = true;
        } else if (grouping != "none") {
            values.group_level = Number(grouping);
        }
    }

    submitter.update(values);

    return false;
});

// var shower = msjs(function(msj) {
//     el.css("display", msj.picked == "all" || msj.picked == "design" ? "none" : "");
// });
// shower.push("chaise.document.list.type.picker", "picked");

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    border: "1px solid black",
    padding: "5px",
    width: "450px"
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
    width: "65px"
});
