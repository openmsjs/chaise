var el = msjs.publish($(<table>
    <thead>
        <tr><th>host</th></tr>
    </thead>
    <tbody/>
</table>));

var dom = msjs.require("msjs.dom");
var cssId = dom.getCssId(el[0]);
dom.addCss(cssId, {
    border: "1px solid #A7A7A7",
    borderSpacing: "0"
});
dom.addCss(cssId + " thead", {
    backgroundColor: "#DADADA"
});
dom.addCss(cssId + " th," +
           cssId + " td", {
    padding: "2px 10px"
});
