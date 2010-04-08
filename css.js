var dom = msjs.require("msjs.dom");
dom.addCss("*", {
    margin: "0px",
    padding: "0px"
});

dom.addCss("body", {
    fontFamily: "\"Lucida Grande\",Tahoma,Verdana,Arial,Sans-Serif",
    fontSize: "12px",
    overflowY: "scroll"
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
dom.addCss("tr.selected", {
    backgroundColor: "#FFE59F !important"
});
dom.addCss("tr.odd", {
    backgroundColor: "#EFEFEF"
});
dom.addCss(".button", {
    "-moz-border-radius": "12px",
    "-webkit-border-radius": "12px",
    display: "inline",
    padding:"3px 5px",
    color: "#3F000E"
});
dom.addCss(".button.selected", {
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#3F000E"
});
dom.addCss(".button:hover", {
    color: "white",
    backgroundColor: "#AF576B"
});
