var el = msjs.publish($(<div/>));
var createRenderer = msjs.require("chaise.database.create.renderer");
//var loadRenderer = msjs.require("chaise.database.load.renderer");
el.append(createRenderer)
//  .append(loadRenderer)
  .append(msjs.require("chaise.database.list.renderer"));

// var dom = msjs.require("msjs.dom");
// dom.addCss(dom.getCssId(createRenderer[0]) + "," +
//            dom.getCssId(loadRenderer[0]), {
//     display: "inline",
//     marginRight: "5px"
// });
