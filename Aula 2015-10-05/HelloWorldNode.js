
function showMembers(o) {
    console.log("-----------------------")
    for(var k in o) {
        console.log("key=" + k + "; value = " + o[k]);
    }
}


//showMembers(global);


for(var i = 2; i < process.argv.length; ++i) {
    console.log(process.argv[i]);
}

process.argv.filter((e, idx) => idx > 2).forEach(console.log);

var fs = require("fs");

var file = "global.txt"


var cnt = 0;
fs.watch(file, function(event, filename) {
    console.log(event + " " + filename);
    if(cnt++ == 3) {
        process.exit(-1);
    }
});



console.log("Listening for changes in file " + file);





