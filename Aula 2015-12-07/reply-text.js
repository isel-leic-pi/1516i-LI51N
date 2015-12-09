const debug = require("debug")("reply-text");

//const submodule = require("./submodule");



function replyText(text) { 
	return function(req, res, next) {
		//submodule("calling submodule with %s", text);
		debug("query: %j", req.query);
		debug("body: %j", req.body);
		setTimeout(function() {
			debug("reply-text called")
			res.end(text);
			next();	
		}, 0);
	};
}
module.exports = replyText;