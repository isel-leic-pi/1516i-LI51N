"use strict";

let fs = require("fs");


const objectThatRepresentsTheModule = function(filename) {
    fs.watch(filename, OnFileChanged);
    var clients = {};
    var counter = 0;

    return {
        on : function(event, cb) {
            if(event != 'change') {
                throw "Invalid event";
            }

            clients[counter] = cb;
            return counter++;
        },

        unregister: function(idRegister) {
            delete clients[idRegister];
        }
    };


    // Callbacks
    function OnFileChanged(event, file) {
        var objResult = new Message(filename,'changed');

        var msg = objResult;
        console.log(msg);
        console.log("Event " + event + " file: " + file);

        Object.keys(clients).forEach(SendMessageToClient);

        function SendMessageToClient(k) {
            clients[k](msg);
            console.log("Notifying client with id " + k);
        }
    }
};

function Message(filename, kind) {
    this.filename =  filename;
    this.kind =  kind;
    this.timestamp = Date.now();
};


objectThatRepresentsTheModule.Message = Message;


module.exports = {
    register: objectThatRepresentsTheModule,
    Message: message
};



