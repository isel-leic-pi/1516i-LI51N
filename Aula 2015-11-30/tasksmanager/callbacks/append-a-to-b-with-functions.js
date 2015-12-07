var fs = require('fs');

function append_some_a_to_b(callback) {
    fs.open(__dirname + '/a.txt', 'r', readA);


    function readA(err, aFd) {
        if (err) {
            return callback(err);
        }
        var buffer = new Buffer(10);


        fs.read(aFd, buffer, 0, buffer.length, 0, close(aFd, openB));
    }


    function openB(err) {
        if (err) {
            return callback(err);
        }
        fs.open(__dirname + '/b.txt', 'a', getBStats);
    }



    function getBStats(err, bFd) {
        if (err) {
            return callback(err);
        }

        fs.fstat(bFd, writeB(bFd));
    }


    function writeB(bFd) {
        return (err, bStats) => {
            if (err) {
                return callback(err);
            }
            fs.write(bFd, buffer, 0, buffer.length, bStats.size, close(bFd, callback);
        }
    }

    function close(fd, cb) {
        return (err) => {
            if (err) {
                return cb(err);
            }
            fs.close(fd, cb);
        }
    }

}


console.log('starting...'); append_some_a_to_b(function(err) {
    if (err) { throw err;
    }
    console.log('done'); });
