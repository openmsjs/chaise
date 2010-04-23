var updater = msjs.require("chaise.document.detail.updater");
var isSuccess = msjs.require("chaise.couch.issuccess");
msjs.publish(msjs(function() {
    var updatedResponse = updater();
    if (isSuccess(updatedResponse)) {
        var updatedResult = updatedResponse.result;
        updatedResult.key = updatedResult.id;
        return updatedResult;
    }
}).depends(updater));