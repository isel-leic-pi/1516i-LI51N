
var o = {
    f1: 5,
    f2: "abc",
    f3: function(a) { return "Hello " + a},
    f4: { a: "SLB"},
    f5: [1, "SLB", {}, function() {}, []]
};


var n1 = 5;
console.log(n1.toString());
var n = new Number(5);

var str = new String("Benfica");
var f = new Function("a", "b", "return a*b");
console.log(f(2,3));






