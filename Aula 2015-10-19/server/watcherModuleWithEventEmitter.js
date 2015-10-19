"use strict";


let fs = require("fs");
var EventEmitter = require('events');


function MyEventEmitter() {
    EventEmitter.call(this);

    var oldOn = this.on;

    this.on = function(event, cb) {
        console.log("my on called");

        //var innerCb = function() {
        //    cb.apply(null, arguments);
        //}
        oldOn.call(this, event, cb);
        console.log("oldOn called");



        return cb;
    };

    this.unregister = function(listener) {
        this.removeListener('change', listener);
    }
}

MyEventEmitter.prototype = new EventEmitter();



const objectThatRepresentsTheModule = function(filename) {
    fs.watch(filename, OnFileChanged);

    var ee = new MyEventEmitter();

    return ee;

    // Callbacks
    function OnFileChanged(event, file) {
        var objResult = new Message(filename,'changed');

        var msg = objResult;
        console.log(msg);
        console.log("Event " + event + " file: " + file);

        ee.emit("change", msg);

    }
};

function Message(filename, kind) {
    this.filename =  filename;
    this.kind =  kind;
    this.timestamp = Date.now();
};

objectThatRepresentsTheModule.Message = Message;


module.exports = objectThatRepresentsTheModule;



