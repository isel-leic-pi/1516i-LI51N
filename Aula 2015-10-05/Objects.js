var oLiteral = { }; // JavaScript Object Notation (JSON)


var oObject = new Object();

console.log(oObject.a);

oObject.a = "SLB";
console.log(oObject.a);

console.log(oObject["a"]);


function showMembers(o) {
    console.log("-----------------------")
    for(var k in o) {
        console.log("key=" + k + "; value = " + o[k]);
    }
}


showMembers(console);

showMembers(oObject);

delete oObject.a;

showMembers(oObject);


function foo() {
    return "SLB";
}

obj = {
    foo: "bar",
    [ "prop_" + foo() ]: 42
};
//obj[ "prop_" + foo() ] = 42;

showMembers(obj);

var f = function f3(p1) {
    console.log(p1);
    console.log(obj.bar);
    console.log(f3.p1);
};



f(10);
obj.bar = "bar";
f(20);
f.p1 = "Benfica35!";
f(10);

var f1 = f;
f1(30);
f = null;
f1(40);
f3 = null;
f1(40);











