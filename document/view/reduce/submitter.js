var submitter = msjs.publish(msjs(function(msj) {
    return msj.picked.viewDoc && msj.picked.viewDoc.reduce ? {} : null;
}));
submitter.depends("chaise.database.list.picker");
submitter.pull(submitter.depends("chaise.document.list.type.picker"), "picked");
