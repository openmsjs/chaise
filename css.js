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
    color: "#3A3A3A"
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
    padding: "3px 5px",
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

dom.addCss("a.toggle", {
    border: "1px solid #CACACA",
    color: "#6A6A6A",
    padding: "0px 3px"
});
dom.addCss("a.toggle:hover", {
    backgroundColor: "black",
    color: "white",
    textDecoration: "none"
});
