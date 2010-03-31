var jsonRequest = msjs.require("msjs.jsonrequest");
var server = msjs.publish(function(host) {
    this.url = "http://" + host;
});

// server level
server.prototype.getInfo = function() {
    return jsonRequest.get(this.url + "/").result;
};

server.prototype.getConfiguration = function() {
    return jsonRequest.get(this.url + "/_config").result;
};

server.prototype.getStats = function() {
    return jsonRequest.get(this.url + "/_stats").result;
};

server.prototype.getActiveTasks = function() {
    return jsonRequest.get(this.url + "/_active_tasks").result;
};

server.prototype.getDatabaseList = function() {
    return jsonRequest.get(this.url + "/_all_dbs").result;
};

server.prototype.replicate = function(source, target) {
    var content = msjs.toJSON({source: source, target: target});
    return jsonRequest.post(this.url + "/_replicate", content).result;
};


server.prototype.getDatabase = function(dbName) {
    return new (msjs.require("chaise.couch.database"))(this.url + "/" + escape(dbName));
}