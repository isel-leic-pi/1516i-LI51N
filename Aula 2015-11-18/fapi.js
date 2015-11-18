/**
 * Created by lfalcao on 18/11/15.
 */

var config = require("./config.json").fapi;
var http = require("http");


function Options() {
    this.hostname = config.hostname;
    this.port = 80
    this.method = 'GET'
    this.path = config.path
}

function request(options, body, cb) {
    console.log("Request to: " + JSON.stringify(options));
    const req = http.request(options, );

    if(body) req.write(body);
    req.end();
    req.on('error', e => console.log('ERROR on request:\n' + e.message));
}



/**
 * Gets all league objects for the given league names or caption
 * @param leagueNames the leagues name or carption array
 */
function getLeagues(leagueNames, cb) {
    http.request(new Options(), null , processLeagues);

    var body = "";

    function processLeagues(res) {
        res.on("data", function(chunk) {
            body += chunk;
        });

        res.on("end", function(chunk) {
            cb(null, JSON.parse(body))
        });
    }

}


function Fapi() {
    this.getLeagues =  getLeagues
};

Fapi.prototype.foo = function() {}

module.exports = new Fapi();