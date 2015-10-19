
function Message(filename, kind) {
    this.filename =  filename;
    this.kind =  kind;
    this.timestamp = Date.now();
    this.foo = "SLB1";
};


Message.prototype.foo = "SLB";


var m1 = new Message("abc", "def");
var m2 = {fileneme: "abc", kind: "def"};

var m3 = new Object();
m3.filename = "abc";
m3.kind = "def";

var a = [];
var a1 = new Array();

console.log(m1.constructor);
console.log(m2.constructor);
console.log(m3.constructor);
console.log(a.constructor);
console.log(a1.constructor);
console.log(Message.constructor);

Message.constructor = Object;
console.log(Message.constructor);

console.log(m1.foo);

var str = "Benfica";
var str1 = "Benfica";

String.prototype.enclose = function(delimetr) {
    return delimetr + this + delimetr;
};

var str = str.enclose("##"); // ##Benfica##

str.enclose = function(){

}

str.enclose();

str1.enclose();
console.log(str);



