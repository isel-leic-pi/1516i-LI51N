
var clp = require("../clp");



var args = ["node", "football-data.js", "-leagues", "Primeira Liga 2015/2016,PD", "-generate", "teams,fixtures,leagueTable"];



//let usageString = config.getUsage();


module.exports = module.exports = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    shouldCreateAConfigObjectWithNoErrors: function (test) {
        var config = clp.parse({ switchPrefix: "-", multiValueDelimiter: ","}, args);
        console.log(config);

        test.ok(config);
        //test.ifError(config.hasErrors());
        test.deepEqual(config, {
            leagues: ["Primeira Liga 2015/2016", "PD"],
            generate: ["teams","fixtures","leagueTable"]

        }, "Objects not equal");

        test.done();
    },
};





