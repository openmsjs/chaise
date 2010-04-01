var couchRequest = msjs.require("chaise.couch.request");
var server = msjs.publish(function(host) {
    this.url = "http://" + host;
});

// server level
server.prototype.getInfo = function() {
    return couchRequest.get(this.url + "/");
};

server.prototype.getConfiguration = function() {
    return couchRequest.get(this.url + "/_config");
};

server.prototype.getStats = function() {
    return couchRequest.get(this.url + "/_stats");
};

server.prototype.getActiveTasks = function() {
    return couchRequest.get(this.url + "/_active_tasks");
};

server.prototype.getDatabaseList = function() {
    return couchRequest.get(this.url + "/_all_dbs");
};

server.prototype.replicate = function(source, target) {
    var content = msjs.toJSON({source: source, target: target});
    return couchRequest.post(this.url + "/_replicate", content);
};


server.prototype.getDatabase = function(dbName) {
    return new (msjs.require("chaise.couch.database"))(this.url + "/" + escape(dbName));
}