/// <reference path="typings/node/node.d.ts" />

"use strict";

// Preparing phase

const net = require('net');

var PORT = 3001;


if(process.argv.length <= 2) {
    console.log("ERROR you must provide a filename!");
    process.exit(0);
}
const filename = process.argv[2];


const myWatcherModule = require('./watcherModule');
const Message = myWatcherModule.Message;
const myWatcher = myWatcherModule(filename);


// Initialization Phase
net.createServer(OnClientConnected)
    .listen(PORT, ReportListening);


// Callback phase

function OnClientConnected(socket) {
    console.log("Client connected");

    socket.write(JSON.stringify(new myWatcherModule.Message(filename, 'listening')) + '\n');
    //socket.write("Olá Glorioso amigo\r\n");
    var regId = myWatcher.on('change', msg => socket.write(JSON.stringify(msg) +'\n'));

    socket.on('close', () => {
        console.log("Subscriber disconnected.");
        myWatcher.unregister(regId);
    })
}


function ReportListening(e)  {
    console.log("Listening on port " + PORT + "...")
}