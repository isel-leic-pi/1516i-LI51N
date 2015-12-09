
const http = require("http");
const replyText = require("./reply-text");
const writeHeader = require("./write-header");
const debug = require("debug")("batatas");

const server = http.createServer();

debug("Starting server");

server.on("request", replyText("Hello"));
server.on("request", writeHeader('X-Powered-By', 'Node'));

server.on("listening", listeningConnections);
server.listen(3000);


function listeningConnections() {
  const address = server.address();
  debug("opened server on %j", address);
}

