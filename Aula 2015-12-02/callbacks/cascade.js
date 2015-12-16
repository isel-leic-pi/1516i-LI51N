
module.exports.cascade = function (callbacks, callback) {
    // clone the array
    var functions = callbacks.slice(0);

    function processNext(err) {
        if (err) {
            return callback(err);
        }

        console.log(arguments);

        // Clone the object arguments elements to an array
        var args = Array.prototype.slice.call(arguments);
        var func = functions.shift();
        if (func) {
            // remove first argument containing the error
            args.shift();
        } else {
            func = callback;
        }
        args.push(processNext);
        func.apply(this, args);
    }

    processNext.call(this);
}


module.exports.paralel = function (callbacks, callback) {
    var results = [];

    function processResult(idx) {
        return function (err, result) {
            if (err) {
                callback(err);
            }
            results[idx] = result;
            if (results.length = callback.length) {
                callback(null, result);
            }

        }
    }

    for(let i = 0; i < callbacks.length) {
        callback[i].call(this, processResult(i));
    }

}


cascade([functionA, functionB], end)



function functionA() {


}




function functionB() {


}


function end(err) {


}