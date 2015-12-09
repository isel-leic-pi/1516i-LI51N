const debug = require("debug")("write-header");

function writeHeader(name, value) { 
	return function(req, res, next) {
		debug("writing header %s=%s", name, value)
		res.setHeader(name, value);
		next(); 
	};
}
module.exports = writeHeader;