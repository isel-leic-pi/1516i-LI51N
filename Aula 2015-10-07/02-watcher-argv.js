

const
    fs = require('fs'),
    filename = process.argv[2];
if (!filename) {
    throw Error("A file to watch must be specified!");
}

var countEvents = 0;
fs.watch(filename, function (event, file) {

    console.log("File " + filename + " just changed!");
    console.log("Event " + event + " file: " + file);
    //console.log("typeof Event " + typeof event);
    console.log("--------- count : " + ++countEvents + "-------------------");

});
console.log("Now watching " + filename + " for changes...");

