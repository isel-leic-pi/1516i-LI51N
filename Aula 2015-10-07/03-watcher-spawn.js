"use strict";

const
    fs = require('fs'),
    spawn = require('child_process').spawn,
    filename = process.argv[2];

if (!filename) {
    throw Error("A file to watch must be specified!");
}

fs.watch(filename, function (event, file) {
    console.log("Event " + event + " file: " + file);
    let ls = spawn('ls', ['-lh', filename]);
    ls.stdout.pipe(process.stdout);
});
console.log("Now watching " + filename + " for changes...");



