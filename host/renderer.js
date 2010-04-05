var el = msjs.publish($(<div/>));
el.append(msjs.require("chaise.host.add.renderer"))
  .append(msjs.require("chaise.host.list.renderer"));
