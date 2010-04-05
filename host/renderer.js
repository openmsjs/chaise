var el = msjs.publish($(<div/>));
el.append(msjs.require("chaise.host.addrenderer"))
  .append(msjs.require("chaise.host.listrenderer"));
