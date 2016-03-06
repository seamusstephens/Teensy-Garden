var server = require("./server");
var router = require("./route");
var requestHandlers = require("./requestHandlers");

var debug = true;

var handle = {}
handle["/"] = requestHandlers.sendInterface;
handle["/interface"] = requestHandlers.sendInterface;

server.start(router.route,handle,debug);