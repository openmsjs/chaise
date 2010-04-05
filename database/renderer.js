var el = msjs.publish($(<div/>));
el.append(msjs.require("chaise.database.createrenderer"))
  .append(msjs.require("chaise.database.listrenderer"));