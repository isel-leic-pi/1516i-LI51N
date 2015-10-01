"use strict";

(function() {

    var Object = null;

    function sayHello(message) {
        if (message) {
            console.log("Hello " + message);
            return message;
        }
        return undefined;
    }


    //console.log(sayHello("SLB", 10, 20, 30));
    //console.log(sayHello());


    showAllArguments();
    showAllArguments("SLB", 35, 10.5);
    showAllArguments("Jonas", 17, 8, "golos");

    function showAllArguments() {
        console.log("--------version 0-----------");
        for (var i = 0; i < arguments.length; ++i) {
            console.log("Arguments[" + i + "] = " + arguments[i]);
        }
    }


    function showAllArguments() {
        console.log("--------version 1-----------");
        console.log(x);

        for (var i = 0; i < arguments.length; ++i) {
            console.log(`Arguments[${i}] = ${arguments[i]}`);
        }

        let x = 10;
        console.log(x);
    }

    var x;
    showAllArguments();
    showAllArguments("SLB", 35, 10.5);
    showAllArguments("Jonas", 17, 8, "golos");


    //function sum(x, y) {
    //    return x + y;
    //}
    //
    //sum(sum(2,3), sum(4,5));
    //sum(7, 8);

})();