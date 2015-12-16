function append_some_a_to_b(callback) {
    var aFd, bFd,
    buffer = new Buffer(10);
    cascade([
        function open_a(next) {
            fs.open(__dirname + '/a.txt', 'r', next);
        },
        function read_from_a(fd, next) {
            aFd = fd;
            fs.read(aFd, buffer, 0, buffer.length, 0, next);
        },
        function close_a(bytesRead, buf, next) {
            fs.close(aFd, next);
        },
        function open_b(next) {
            fs.open(__dirname + '/b.txt', 'a', next);
        },
        function stat_b(fd, next) {
            bFd = fd;
            fs.fstat(bFd, next);
        },
        function write_b(bStats, next) {
            fs.write(bFd, buffer, 0, buffer.length, bStats.size, next);
        },
        function close_b(bytesWritten, buf, next) {
            fs.close(bFd, next);
        }
    ], callback);
};

console.log('starting...');
append_some_a_to_b(function done(err) {
    if (err) {
        throw err;
    }
    console.log('done');
});
