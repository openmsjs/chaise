var el = msjs.publish($(<div/>));
el.append(msjs.require("chaise.document.new.renderer"))
  .append(msjs.require("chaise.document.list.renderer"))
  .append(msjs.require("chaise.document.detail.renderer"));