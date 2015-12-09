const debug = require("debug")("request-time");


module.exports.start = function () { 
	return function(req, res, next) {
		debug("request-time called")
		console.time("request-timer")
		next();
	};
};

module.exports.end = function () { 
	return function(req, res, next) {
		console.timeEnd("request-timer")
	};
};