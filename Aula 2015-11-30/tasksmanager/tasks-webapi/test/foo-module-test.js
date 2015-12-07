var o = require("./fooModule");

console.log(o.count);


var o1 = require("./fooModule");

console.log(o1.count);

console.log(o1 === o)
