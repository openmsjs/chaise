var dom = msjs.require("msjs.dom");
dom.addCss("*", {
    margin: "0px",
    padding: "0px"
});

dom.addCss("a", {
    textDecoration: "none",
    color: "#02007F"
});
dom.addCss("a:hover", {
    textDecoration: "underline"
});

dom.addCss("thead", {
    backgroundColor: "black"
});
dom.addCss("table", {
    width: "100%",
    border: "1px solid black",
    borderSpacing: "0"
});
dom.addCss("th,td", {
    textAlign: "left",
    padding: "2px 10px"
});
dom.addCss("th", {
    color: "white"
});
dom.addCss(".selected", {
    backgroundColor: "#EAEAEA"
});
