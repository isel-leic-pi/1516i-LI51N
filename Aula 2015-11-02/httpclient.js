"use strict"

const http = require("http");



const method = process.argv[2] || "GET"
const path = process.argv[3] || "";
const doc = process.argv[4] || "";
const headers = method !== "GET" ? {'Content-type': 'application/json'} : undefined;

const options = {
    host: "127.0.0.1",
    port: 5984,
    path: path,
    method: method,
    headers: headers
};



console.log("doc: " + doc);
console.log("options: " + JSON.stringify(options));

var req = http.request(options, processResponse);


function processResponse(rsp) {
    console.log("STATUS: " + rsp.statusCode);
    console.log("STATUS MESSAGE: " + rsp.statusMessage);
    console.log("HEADERS: " + JSON.stringify(rsp.headers));

    rsp.on("data", processData);

    function processData(buffer) {
        console.log(buffer.toString());
    }

}

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

if(method !== "GET") {
    req.write(doc);
}

req.end();
