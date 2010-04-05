var el = msjs.publish($(<div/>));
el.append(msjs.require("chaise.document.newrenderer"))
  .append(msjs.require("chaise.document.listrenderer"))
  .append(msjs.require("chaise.document.detailrenderer"));