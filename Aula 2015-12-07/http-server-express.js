
const http = require("http");
const express = require("express");
const path = require('path');
const replyText = require("./reply-text");
const requestTime = require("./req-time");
const bodyParser = require('body-parser');
const writeHeader = require("./write-header");
const debug = require("debug")("batatas");

const app = express();

const server = http.createServer(app);


app.use(requestTime.start());
app.use("/public", express.static(path.join(__dirname, 'files')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(writeHeader('X-Powered-By', 'Node'));

app.use((req, rsp, next) => {
  console.log("SLB for ever!!!!")
});
app.use(replyText("Hello"));
app.use(requestTime.end());

server.on("listening", listeningConnections);
server.listen(3000);


function listeningConnections() {
  const address = server.address();
  debug("opened server on %j", address);
}

