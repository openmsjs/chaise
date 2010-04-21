var typePicker = msjs.require("chaise.document.list.type.picker");
msjs.publish(msjs(function(msj) {
    var picked = typePicker();
    return picked.viewDoc && picked.viewDoc.reduce ? {} : null;
}).depends(typePicker, "chaise.database.list.picker"));
