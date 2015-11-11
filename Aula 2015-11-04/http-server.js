"use strict"
const PORT = 1234;
const http = require("http");

const http_listeners = require("./http-listeners");

var server = http.createServer(http_listeners.processRequest);



server.listen(PORT, function () {
   console.log("Server listening on port " + PORT);
});











