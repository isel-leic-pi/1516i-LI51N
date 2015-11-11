
module.exports = {
    setUp: function (callback) {
        this.foo = 'bar';
        console.log("setUp called");
        callback();
    },
    tearDown: function (callback) {
        // clean up
        console.log("tearDown called");
        callback();
    },
    test1: function (test) {
        console.log("test1")
        test.expect(1);
        test.equals(this.foo, 'bar');
        test.done();
    },
    test2: function (test) {
        console.log("test2")
        test.expect(0);
        test.done();
    }
};