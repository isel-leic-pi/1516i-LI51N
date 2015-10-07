

function showMembers(o) {
    console.log("-----------------------")
    for(var k in o) {
        console.log("key=" + k + "; value = " + o[k]);
    }
}


var a = [1,2,3,4,5];

console.log(a.length);

console.log(a[0]);

a["€"] = 10;

a.foo = "foo";

a["100"] = 20;

console.log(a.length);
showMembers(a);

a.length = 0;

showMembers(a);

a.length = 3;
showMembers(a);

a[2000] = 10;
console.log(a.length)
showMembers(a);


console.log(Object);