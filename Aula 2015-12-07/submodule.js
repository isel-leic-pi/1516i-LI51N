const debug = require("debug")("reply-text:submodule");


module.exports = function(text) {
	debug("submodule called with %s", text);
}